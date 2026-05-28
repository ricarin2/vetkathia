import type { IncomingMessage, ServerResponse } from 'node:http'
import Stripe from 'stripe'

type FulfilledCheckout = {
  customerEmail: null | string
  planKey: string
  sessionId: string
}

type JsonValue =
  | JsonValue[]
  | boolean
  | null
  | number
  | string
  | { [key: string]: JsonValue }

export const config = {
  api: {
    bodyParser: false,
  },
}

const fulfilledSessionIds = new Set<string>()

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

async function readRawBody(req: IncomingMessage) {
  const chunks: Buffer[] = []

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  return Buffer.concat(chunks)
}

async function fulfillCheckoutSession(session: Stripe.Checkout.Session) {
  const fulfillment: FulfilledCheckout = {
    customerEmail: session.customer_details?.email ?? null,
    planKey: session.metadata?.planKey ?? '',
    sessionId: session.id,
  }

  // Prepared integration point:
  // - send an internal email,
  // - write to a future database,
  // - connect a CRM,
  // while keeping clinical questionnaire data outside Stripe.
  if (process.env.NODE_ENV !== 'production') {
    console.info('Stripe checkout fulfilled', fulfillment)
  } else {
    console.info('Stripe checkout fulfilled', {
      planKey: fulfillment.planKey,
      sessionId: fulfillment.sessionId,
    })
  }
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Método no permitido.' })
    return
  }

  const stripeSecretKey = getEnv('STRIPE_SECRET_KEY')
  const webhookSecret = getEnv('STRIPE_WEBHOOK_SECRET')

  if (!stripeSecretKey || !webhookSecret) {
    sendJson(res, 500, { error: 'Webhook no configurado.' })
    return
  }

  const signature = req.headers['stripe-signature']

  if (typeof signature !== 'string') {
    sendJson(res, 400, { error: 'Firma de Stripe ausente.' })
    return
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2026-04-22.dahlia',
  })
  const rawBody = await readRawBody(req)
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch {
    sendJson(res, 400, { error: 'Firma de Stripe inválida.' })
    return
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    if (!fulfilledSessionIds.has(session.id)) {
      fulfilledSessionIds.add(session.id)
      await fulfillCheckoutSession(session)
    }
  }

  sendJson(res, 200, { received: true })
}
