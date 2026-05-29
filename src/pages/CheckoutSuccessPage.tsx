import {
  ArrowLeft,
  AlertTriangle,
  CalendarClock,
  CheckCircle,
  CheckCircle2,
  ClipboardList,
  RotateCcw,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

import { CalendlyEmbed } from '../components/common/CalendlyEmbed'
import { SEOHead } from '../components/common/SEOHead'
import { Badge, Button, Card, Container, Section } from '../components/ui'
import {
  trackCheckoutSuccessPageView,
  trackCTAClick,
} from '../lib/analytics'
import { writeSessionStorage } from '../lib/browserStorage'
import { integrations } from '../lib/integrations'
import { getSelectedPlan, planLabels } from '../lib/planCheckout'

type CheckoutSessionStatus = {
  id: string
  metadata?: {
    planKey?: string
  }
  payment_status: null | string
  status: null | string
}

type VerificationState = 'idle' | 'loading' | 'paid' | 'unverified'

type CheckoutSessionVerification = {
  sessionId: string
  state: Extract<VerificationState, 'paid' | 'unverified'>
}

const checkoutSessionApiUrl =
  import.meta.env.VITE_CHECKOUT_SESSION_API_URL ?? '/api/checkout-session'

export function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams()
  const selectedPlan = getSelectedPlan(searchParams.get('plan'))
  const sessionId = searchParams.get('session_id')?.trim() ?? ''
  const usesPaymentLinks = integrations.checkoutMode === 'payment_links'
  const [checkoutSessionVerification, setCheckoutSessionVerification] =
    useState<CheckoutSessionVerification | null>(null)
  const canContinueAfterPayment = Boolean(
    selectedPlan && (sessionId || usesPaymentLinks),
  )
  const selectedPlanLabel = selectedPlan ? planLabels[selectedPlan] : ''
  const verificationState: VerificationState = sessionId
    ? checkoutSessionVerification?.sessionId === sessionId
      ? checkoutSessionVerification.state
      : 'loading'
    : usesPaymentLinks
      ? 'unverified'
      : 'idle'
  const isPaymentVerified = verificationState === 'paid'
  const successHeading = !canContinueAfterPayment
    ? 'No se ha podido identificar el pago'
    : isPaymentVerified
      ? 'Pago confirmado'
      : verificationState === 'loading'
        ? 'Comprobando el pago'
        : 'Pago finalizado en Stripe'
  const successCopy = !canContinueAfterPayment
    ? 'Si acabas de completar el pago en Stripe, vuelve desde la pantalla de confirmación o contacta con VetKathia con el recibo de Stripe. Esta página necesita el plan contratado para continuar el onboarding.'
    : isPaymentVerified
      ? 'Stripe ha confirmado el pago. Para preparar el servicio, completa el cuestionario nutricional y reserva tu cita online.'
      : verificationState === 'loading'
        ? 'Estoy comprobando el estado del pago en Stripe. Puedes continuar con el cuestionario mientras se completa la verificación.'
        : 'Stripe te ha redirigido a VetKathia. No se ha podido verificar automáticamente el estado del pago en esta página, así que continúa con el cuestionario y reserva tu cita sin asumir confirmación operativa aquí.'
  const questionnairePath =
    canContinueAfterPayment && selectedPlan
      ? `/solicitar-valoracion?plan=${selectedPlan}${
          sessionId ? `&session_id=${encodeURIComponent(sessionId)}` : ''
        }&source=checkout_success`
      : '/planes'
  const calendlyUrl = selectedPlan ? integrations.calendlyUrls[selectedPlan] : ''

  useEffect(() => {
    if (sessionId && verificationState === 'loading') return

    if (selectedPlan && (usesPaymentLinks || isPaymentVerified)) {
      writeSessionStorage('vetkathia_paid_plan', selectedPlan)
    }

    if (sessionId) {
      writeSessionStorage('vetkathia_checkout_session_id', sessionId)
    }

    trackCheckoutSuccessPageView({
      checkoutMode: integrations.checkoutMode,
      hasCheckoutSession: Boolean(sessionId),
      paymentVerified: isPaymentVerified,
      planKey: selectedPlan ?? undefined,
      planName: selectedPlanLabel || undefined,
      sessionId: sessionId || undefined,
    })
  }, [
    isPaymentVerified,
    selectedPlan,
    selectedPlanLabel,
    sessionId,
    usesPaymentLinks,
    verificationState,
  ])

  useEffect(() => {
    if (!sessionId) return undefined

    let isMounted = true
    const params = new URLSearchParams({ session_id: sessionId })

    fetch(`${checkoutSessionApiUrl}?${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo verificar la sesión.')
        }

        return response.json() as Promise<CheckoutSessionStatus>
      })
      .then((payload) => {
        if (!isMounted) return

        const sessionPlanKey = getSelectedPlan(payload.metadata?.planKey ?? null)
        const planMatches =
          !sessionPlanKey || !selectedPlan || sessionPlanKey === selectedPlan

        setCheckoutSessionVerification({
          sessionId,
          state:
            payload.payment_status === 'paid' && planMatches
              ? 'paid'
              : 'unverified',
        })
      })
      .catch(() => {
        if (isMounted) {
          setCheckoutSessionVerification({
            sessionId,
            state: 'unverified',
          })
        }
      })

    return () => {
      isMounted = false
    }
  }, [selectedPlan, sessionId, usesPaymentLinks])

  return (
    <>
      <SEOHead
        canonicalPath="/pago-completado"
        description="Página de continuación tras el pago online de un servicio VetKathia."
        noindex
        title="Pago finalizado | VetKathia"
      />

      <Section className="pb-10 pt-10 sm:pt-14 lg:pt-18">
        <Container size="md">
          <Card className="text-center shadow-soft" tone="highlight">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-vetkathia-surface text-vetkathia-primary-dark ring-1 ring-vetkathia-border">
              {isPaymentVerified ? (
                <CheckCircle className="h-8 w-8" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
              )}
            </span>
            <Badge className="mt-5" tone="soft">
              Contratación online
            </Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-vetkathia-text sm:text-5xl">
              {successHeading}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-vetkathia-muted">
              {successCopy}
            </p>
            {canContinueAfterPayment ? (
              <p className="mx-auto mt-4 max-w-xl rounded-2xl border border-vetkathia-border bg-white/76 px-4 py-3 text-sm font-semibold leading-6 text-vetkathia-primary-dark">
                Plan contratado: {selectedPlanLabel}
              </p>
            ) : (
              <p className="mx-auto mt-4 max-w-xl rounded-2xl border border-vetkathia-border bg-white/76 px-4 py-3 text-sm font-semibold leading-6 text-vetkathia-primary-dark">
                No se ha recibido el plan contratado en la URL. Para evitar
                falsos éxitos, vuelve a planes o reintenta la contratación.
              </p>
            )}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {canContinueAfterPayment ? (
                <>
                  <Button
                    leftIcon={<ClipboardList className="h-5 w-5" aria-hidden="true" />}
                    onClick={() =>
                      trackCTAClick(
                        'Completar cuestionario nutricional',
                        'checkout success',
                      )
                    }
                    to={questionnairePath}
                  >
                    Completar cuestionario nutricional
                  </Button>
                  <Button
                    disabled={!calendlyUrl}
                    href="#reservar-cita"
                    leftIcon={
                      <CalendarClock className="h-5 w-5" aria-hidden="true" />
                    }
                    onClick={() =>
                      trackCTAClick('Reservar cita online', 'checkout success')
                    }
                    variant="outline"
                  >
                    Reservar cita online
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    leftIcon={<ArrowLeft className="h-5 w-5" aria-hidden="true" />}
                    onClick={() =>
                      trackCTAClick('Volver a planes', 'checkout success sin sesión')
                    }
                    to="/planes"
                    variant="outline"
                  >
                    Volver a planes
                  </Button>
                  <Button
                    leftIcon={<RotateCcw className="h-5 w-5" aria-hidden="true" />}
                    onClick={() =>
                      trackCTAClick('Intentarlo de nuevo', 'checkout success sin sesión')
                    }
                    to={selectedPlan ? `/contratar?plan=${selectedPlan}` : '/planes'}
                  >
                    Intentarlo de nuevo
                  </Button>
                </>
              )}
            </div>

            {canContinueAfterPayment ? (
              <div className="mx-auto mt-6 flex max-w-2xl gap-3 rounded-3xl border border-vetkathia-border bg-white/76 px-4 py-3 text-left text-sm leading-6 text-vetkathia-muted">
                <AlertTriangle
                  className="mt-0.5 h-5 w-5 shrink-0 text-vetkathia-primary-dark"
                  aria-hidden="true"
                />
                <p>
                  Si tu animal presenta síntomas graves, no esperes a la
                  consulta: contacta con urgencias veterinarias.
                </p>
              </div>
            ) : null}
          </Card>

          {canContinueAfterPayment && selectedPlan && calendlyUrl ? (
            <div id="reservar-cita">
              <CalendlyEmbed className="mt-6" planKey={selectedPlan} />
            </div>
          ) : canContinueAfterPayment && selectedPlan ? (
            <Card className="mt-6 bg-white/90 shadow-none ring-1 ring-vetkathia-border/45">
              <h2 className="font-sans text-xl font-semibold leading-tight text-vetkathia-text">
                Reserva tu cita online
              </h2>
              <p className="mt-4 text-sm leading-6 text-vetkathia-muted">
                La agenda online no está configurada para este plan.
              </p>
            </Card>
          ) : null}
        </Container>
      </Section>
    </>
  )
}
