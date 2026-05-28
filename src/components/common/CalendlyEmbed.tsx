import { CalendarClock, ExternalLink } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import {
  trackCalendlyError,
  trackCalendlyEventScheduled,
  trackCalendlyOpen,
  trackCalendlyView,
} from '../../lib/analytics'
import { readSessionStorage, writeSessionStorage } from '../../lib/browserStorage'
import { cn } from '../../lib/cn'
import {
  type CalendlyEmbedMode,
  getIntegrationStatus,
  integrations,
} from '../../lib/integrations'
import { type PlanKey, planLabels } from '../../lib/planCheckout'
import { getTrafficAttribution } from '../../lib/trafficAttribution'
import { Badge, Button, Card } from '../ui'

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: CalendlyWidgetOptions) => void
      initPopupWidget: (options: CalendlyWidgetOptions) => void
    }
  }
}

type CalendlyWidgetOptions = {
  parentElement?: HTMLElement | null
  prefill?: {
    email?: string
    name?: string
  }
  url: string
  utm?: Record<string, string>
}

type CalendlyEmbedProps = {
  className?: string
  email?: string
  mode?: CalendlyEmbedMode
  name?: string
  planKey: PlanKey
}

const calendlyScriptSrc = 'https://assets.calendly.com/assets/external/widget.js'
const calendlyStylesheetHref =
  'https://assets.calendly.com/assets/external/widget.css'
const contactNameStorageKey = 'vetkathia_contact_name'
const contactEmailStorageKey = 'vetkathia_contact_email'

function getStoredContactValue(key: string) {
  return readSessionStorage(key)
}

function resolveContactValue(value: string | undefined, storageKey: string) {
  return value?.trim() || getStoredContactValue(storageKey)
}

function loadCalendlyAssets() {
  if (typeof window === 'undefined') return Promise.resolve()

  if (!document.querySelector(`link[href="${calendlyStylesheetHref}"]`)) {
    const stylesheet = document.createElement('link')
    stylesheet.href = calendlyStylesheetHref
    stylesheet.rel = 'stylesheet'
    document.head.appendChild(stylesheet)
  }

  if (window.Calendly) return Promise.resolve()

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src="${calendlyScriptSrc}"]`,
  )

  if (existingScript) {
    return new Promise<void>((resolve, reject) => {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(), { once: true })
    })
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.async = true
    script.src = calendlyScriptSrc
    script.addEventListener('load', () => resolve(), { once: true })
    script.addEventListener('error', () => reject(), { once: true })
    document.body.appendChild(script)
  })
}

function calendlyEventMatches(event: MessageEvent) {
  return (
    /^https:\/\/([a-z0-9-]+\.)*calendly\.com$/i.test(event.origin) &&
    typeof event.data === 'object' &&
    event.data !== null &&
    'event' in event.data &&
    typeof event.data.event === 'string' &&
    event.data.event.startsWith('calendly.')
  )
}

function buildCalendlyUrl(
  url: string,
  options: CalendlyWidgetOptions,
  urlParams: Record<string, string>,
) {
  try {
    const calendlyUrl = new URL(url)

    if (options.prefill?.name) {
      calendlyUrl.searchParams.set('name', options.prefill.name)
    }

    if (options.prefill?.email) {
      calendlyUrl.searchParams.set('email', options.prefill.email)
    }

    Object.entries(urlParams).forEach(([key, value]) => {
      if (value) calendlyUrl.searchParams.set(key, value)
    })

    return calendlyUrl.toString()
  } catch {
    return url
  }
}

export function CalendlyEmbed({
  className,
  email,
  mode = integrations.calendlyEmbedMode,
  name,
  planKey,
}: CalendlyEmbedProps) {
  const inlineContainerRef = useRef<HTMLDivElement | null>(null)
  const hasTrackedInlineOpen = useRef(false)
  const [scriptReady, setScriptReady] = useState(false)
  const [hasScriptError, setHasScriptError] = useState(false)
  const integrationStatus = getIntegrationStatus()
  const calendlyConfigured =
    integrationStatus.calendlyConfiguredByPlan[planKey]
  const calendlyUrl = calendlyConfigured ? integrations.calendlyUrls[planKey] : ''
  const planName = planLabels[planKey]
  const contactName = resolveContactValue(name, contactNameStorageKey)
  const contactEmail = resolveContactValue(email, contactEmailStorageKey)
  const attribution = useMemo(() => getTrafficAttribution(), [])
  const calendlyUrlParams = useMemo(
    () => {
      const allowedKeys = [
        'fbclid',
        'gbraid',
        'gclid',
        'msclkid',
        'ttclid',
        'wbraid',
      ]

      return Object.fromEntries(
        Object.entries(attribution).filter(([key, value]) => {
          const isAllowedKey =
            key.startsWith('utm_') || allowedKeys.includes(key)

          return isAllowedKey && Boolean(value)
        }),
      ) as Record<string, string>
    },
    [attribution],
  )
  const calendlyWidgetUtm = useMemo(
    () => ({
      utmCampaign: attribution.utm_campaign,
      utmContent: attribution.utm_content,
      utmMedium: attribution.utm_medium,
      utmSource: attribution.utm_source,
      utmTerm: attribution.utm_term,
    }),
    [attribution],
  )
  const calendlyOptions = useMemo(
    () => ({
      prefill: {
        email: contactEmail || undefined,
        name: contactName || undefined,
      },
      url: calendlyUrl,
      utm: calendlyWidgetUtm,
    }),
    [calendlyUrl, calendlyWidgetUtm, contactEmail, contactName],
  )
  const externalUrl = buildCalendlyUrl(
    calendlyUrl,
    calendlyOptions,
    calendlyUrlParams,
  )

  useEffect(() => {
    if (!calendlyUrl) return

    trackCalendlyView({ mode, planKey, planName })
  }, [calendlyUrl, mode, planKey, planName])

  useEffect(() => {
    if (!calendlyUrl || mode === 'link') return

    let isMounted = true

    loadCalendlyAssets()
      .then(() => {
        if (!isMounted) return
        setScriptReady(true)
      })
      .catch(() => {
        if (!isMounted) return
        setHasScriptError(true)
        trackCalendlyError({
          message: 'No se pudo cargar el script de Calendly.',
          mode,
          planKey,
          planName,
        })
      })

    return () => {
      isMounted = false
    }
  }, [calendlyUrl, mode, planKey, planName])

  useEffect(() => {
    if (!calendlyUrl) return undefined

    const handleCalendlyMessage = (event: MessageEvent) => {
      if (!calendlyEventMatches(event)) return

      if (event.data.event === 'calendly.event_scheduled') {
        writeSessionStorage('vetkathia_calendly_scheduled', 'true')

        trackCalendlyEventScheduled({ planKey, planName })
      }
    }

    window.addEventListener('message', handleCalendlyMessage)

    return () => {
      window.removeEventListener('message', handleCalendlyMessage)
    }
  }, [calendlyUrl, planKey, planName])

  useEffect(() => {
    if (
      !calendlyUrl ||
      mode !== 'inline' ||
      !scriptReady ||
      !inlineContainerRef.current ||
      !window.Calendly
    ) {
      return
    }

    inlineContainerRef.current.innerHTML = ''
    window.Calendly.initInlineWidget({
      ...calendlyOptions,
      parentElement: inlineContainerRef.current,
    })

    if (!hasTrackedInlineOpen.current) {
      hasTrackedInlineOpen.current = true
      trackCalendlyOpen({ mode: 'inline', planKey, planName })
    }
  }, [calendlyOptions, calendlyUrl, mode, planKey, planName, scriptReady])

  const openPopup = () => {
    trackCalendlyOpen({ mode, planKey, planName })

    if (!window.Calendly) {
      window.location.href = externalUrl
      return
    }

    window.Calendly.initPopupWidget(calendlyOptions)
  }

  if (!calendlyUrl) {
    return (
      <Card className={cn('bg-white/90 shadow-none ring-1 ring-vetkathia-border/45', className)}>
        <CalendlyHeader />
        <p className="mt-5 rounded-3xl border border-dashed border-vetkathia-border bg-vetkathia-surface/70 px-4 py-3 text-sm leading-6 text-vetkathia-muted">
          La agenda online no está configurada para este plan.
        </p>
      </Card>
    )
  }

  return (
    <Card className={cn('bg-white/90 shadow-none ring-1 ring-vetkathia-border/45', className)}>
      <CalendlyHeader />
      <p className="mt-4 text-sm leading-6 text-vetkathia-muted">
        Elige el horario que mejor encaje. Antes de la consulta, completa
        también el cuestionario nutricional.
      </p>

      {mode === 'inline' ? (
        <>
          <div className="mt-5 md:hidden">
            <Button
              fullWidth
              onClick={openPopup}
              variant="outline"
            >
              Abrir agenda
            </Button>
          </div>
          <div
            className="mt-5 hidden min-h-[680px] overflow-hidden rounded-3xl border border-vetkathia-border bg-white md:block"
            ref={inlineContainerRef}
          />
        </>
      ) : null}

      {mode === 'popup' ? (
        <Button
          className="mt-5"
          fullWidth
          onClick={openPopup}
          variant="outline"
        >
          Abrir agenda
        </Button>
      ) : null}

      {mode === 'link' || hasScriptError ? (
        <Button
          className="mt-5"
          fullWidth
          href={externalUrl}
          onClick={() => trackCalendlyOpen({ mode: 'link', planKey, planName })}
          rel="noreferrer"
          rightIcon={<ExternalLink className="h-4 w-4" aria-hidden="true" />}
          target="_blank"
          variant="outline"
        >
          Abrir agenda en Calendly
        </Button>
      ) : null}
    </Card>
  )
}

function CalendlyHeader() {
  return (
    <div className="flex items-start gap-4">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-vetkathia-border bg-vetkathia-surface text-vetkathia-primary-dark">
        <CalendarClock className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <Badge tone="soft">Agenda</Badge>
        <h2 className="mt-4 font-sans text-xl font-semibold leading-tight text-vetkathia-text">
          Reserva tu cita online
        </h2>
      </div>
    </div>
  )
}
