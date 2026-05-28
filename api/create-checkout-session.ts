import type { IncomingMessage, ServerResponse } from 'node:http'
import Stripe from 'stripe'

type PlanKey = 'valuation' | 'personalized' | 'accompaniment'

type AttributionPayload = Partial<
  Record<
    | 'fbclid'
    | 'first_touch_landing_page'
    | 'first_touch_referrer'
    | 'first_touch_timestamp'
    | 'gbraid'
    | 'gclid'
    | 'landing_page'
    | 'last_touch_landing_page'
    | 'last_touch_timestamp'
    | 'msclkid'
    | 'referrer'
    | 'ttclid'
    | 'utm_campaign'
    | 'utm_content'
    | 'utm_id'
    | 'utm_medium'
    | 'utm_source'
    | 'utm_term'
    | 'wbraid',
    string
  >
>

type CheckoutRequestBody = {
  attribution?: AttributionPayload
  checkoutAttemptId?: string
  current_path?: string
  landing_page?: string
  planKey?: string
  referrer?: string
}

type JsonValue =
  | JsonValue[]
  | boolean
  | null
  | number
  | string
  | { [key: string]: JsonValue }

type RequestWithBody = IncomingMessage & {
  body?: unknown
}

const planConfig: Record<
  PlanKey,
  { envPriceKey: string; name: string }
> = {
  accompaniment: {
    envPriceKey: 'STRIPE_PRICE_ACCOMPANIMENT',
    name: 'Plan con Acompañamiento',
  },
  personalized: {
    envPriceKey: 'STRIPE_PRICE_PERSONALIZED',
    name: 'Plan Personalizado',
  },
  valuation: {
    envPriceKey: 'STRIPE_PRICE_VALUATION',
    name: 'Valoración Nutricional',
  },
}

const metadataKeys = [
  'fbclid',
  'gbraid',
  'gclid',
  'msclkid',
  'ttclid',
  'utm_campaign',
  'utm_content',
  'utm_id',
  'utm_medium',
  'utm_source',
  'utm_term',
  'wbraid',
] as const

function sendJson(
  res: ServerResponse,
  statusCode: number,
  payload: JsonValue,
) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
  })
  res.end(JSON.stringify(payload))
}

function getEnv(name: string) {
  return process.env[name]?.trim() ?? ''
}

function getSiteUrl() {
  return getEnv('SITE_URL') || getEnv('VITE_SITE_URL')
}

function isLegalContentReady() {
  return (
    getEnv('LEGAL_CONTENT_READY') === 'true' ||
    getEnv('VITE_LEGAL_CONTENT_READY') === 'true'
  )
}

function isCheckoutEnabled() {
  return (
    getEnv('CHECKOUT_ENABLED') === 'true' ||
    getEnv('VITE_CHECKOUT_ENABLED') === 'true'
  )
}

function isPlanKey(value: string | undefined): value is PlanKey {
  return (
    value === 'valuation' ||
    value === 'personalized' ||
    value === 'accompaniment'
  )
}

function sanitizeMetadataValue(value: unknown) {
  if (typeof value !== 'string') return undefined

  const trimmedValue = value.trim()
  if (!trimmedValue) return undefined

  return trimmedValue.slice(0, 500)
}

async function readRequestBody(req: RequestWithBody) {
  if (req.body && typeof req.body === 'object') {
    return req.body as CheckoutRequestBody
  }

  const chunks: Buffer[] = []

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  const rawBody = Buffer.concat(chunks).toString('utf8')
  if (!rawBody) return {}

  return JSON.parse(rawBody) as CheckoutRequestBody
}

function buildMetadata(
  planKey: PlanKey,
  body: CheckoutRequestBody,
): Stripe.MetadataParam {
  const metadata: Stripe.MetadataParam = {
    planKey,
    planName: planConfig[planKey].name,
  }

  for (const key of metadataKeys) {
    const value = sanitizeMetadataValue(body.attribution?.[key])
    if (value) metadata[key] = value
  }

  const landingPage = sanitizeMetadataValue(body.landing_page)
  const referrer = sanitizeMetadataValue(body.referrer)
  const checkoutAttemptId = sanitizeMetadataValue(body.checkoutAttemptId)

  if (landingPage) metadata.landing_page = landingPage
  if (referrer) metadata.referrer = referrer
  if (checkoutAttemptId) metadata.checkoutAttemptId = checkoutAttemptId

  return metadata
}

export default async function handler(
  req: RequestWithBody,
  res: ServerResponse,
) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Método no permitido.' })
    return
  }

  const stripeSecretKey = getEnv('STRIPE_SECRET_KEY')
  const siteUrl = getSiteUrl()

  if (!isCheckoutEnabled()) {
    sendJson(res, 503, {
      error: 'La contratación online no está configurada todavía.',
    })
    return
  }

  if (process.env.NODE_ENV === 'production' && !isLegalContentReady()) {
    sendJson(res, 500, {
      error:
        'Checkout bloqueado. Completa y revisa las páginas legales antes de aceptar pagos reales.',
    })
    return
  }

  if (!stripeSecretKey || !siteUrl) {
    sendJson(res, 500, {
      error:
        'Checkout no configurado. Faltan variables de entorno del servidor.',
    })
    return
  }

  let body: CheckoutRequestBody

  try {
    body = await readRequestBody(req)
  } catch {
    sendJson(res, 400, { error: 'Solicitud inválida.' })
    return
  }

  if (!isPlanKey(body.planKey)) {
    sendJson(res, 400, { error: 'Plan no válido.' })
    return
  }

  const plan = planConfig[body.planKey]
  const priceId = getEnv(plan.envPriceKey)

  if (!priceId) {
    sendJson(res, 500, {
      error: 'Checkout no configurado para este plan.',
    })
    return
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2026-04-22.dahlia',
  })
  const baseUrl = siteUrl.replace(/\/$/, '')

  try {
    const session = await stripe.checkout.sessions.create({
      cancel_url: `${baseUrl}/pago-cancelado?plan=${body.planKey}`,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: buildMetadata(body.planKey, body),
      mode: 'payment',
      success_url: `${baseUrl}/pago-completado?session_id={CHECKOUT_SESSION_ID}&plan=${body.planKey}`,
    })

    if (!session.url) {
      sendJson(res, 500, { error: 'Stripe no devolvió URL de checkout.' })
      return
    }

    sendJson(res, 200, { url: session.url })
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error)
    }

    sendJson(res, 500, {
      error: 'No se pudo iniciar el checkout. Inténtalo de nuevo.',
    })
  }
}
