import type { IncomingMessage, ServerResponse } from 'node:http'
import Stripe from 'stripe'

type JsonValue =
  | JsonValue[]
  | boolean
  | null
  | number
  | string
  | { [key: string]: JsonValue }

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

function getRequestUrl(req: IncomingMessage) {
  return new URL(req.url ?? '', 'http://localhost')
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  if (req.method !== 'GET') {
    sendJson(res, 405, { error: 'Método no permitido.' })
    return
  }

  const stripeSecretKey = getEnv('STRIPE_SECRET_KEY')

  if (!stripeSecretKey) {
    sendJson(res, 500, {
      error: 'Consulta de checkout no configurada.',
    })
    return
  }

  const sessionId = getRequestUrl(req).searchParams.get('session_id')?.trim()

  if (!sessionId) {
    sendJson(res, 400, { error: 'Falta session_id.' })
    return
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2026-04-22.dahlia',
  })

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const planKey = session.metadata?.planKey
    const metadata: Record<string, string> = {}

    if (typeof planKey === 'string' && planKey) {
      metadata.planKey = planKey
    }

    sendJson(res, 200, {
      id: session.id,
      metadata,
      payment_status: session.payment_status ?? null,
      status: session.status ?? null,
    })
  } catch {
    sendJson(res, 404, {
      error: 'No se pudo recuperar la sesión de checkout.',
    })
  }
}
