import {
  trackCheckoutConfigError,
  trackCheckoutError,
  trackCheckoutRedirectStarted,
  trackStartStripeCheckout,
} from './analytics'
import { getIntegrationStatus, integrations } from './integrations'
import { type PlanKey, planLabels } from './planCheckout'
import { getTrafficAttribution } from './trafficAttribution'

type CheckoutSessionResponse = {
  error?: string
  url?: string
}

function createCheckoutAttemptId() {
  try {
    return window.crypto.randomUUID()
  } catch {
    return `checkout_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
  }
}

export async function startCheckout(planKey: PlanKey) {
  const integrationStatus = getIntegrationStatus()

  if (!integrations.checkoutEnabled || !integrationStatus.checkoutConfigured) {
    const message = 'La contratación online no está configurada todavía.'
    trackCheckoutConfigError({ message, planKey, planName: planLabels[planKey] })
    trackCheckoutError({ message, planKey, planName: planLabels[planKey] })
    throw new Error(message)
  }

  if (!integrationStatus.legalReady) {
    const message =
      'No se puede activar la contratación real hasta completar los textos legales.'
    trackCheckoutConfigError({ message, planKey, planName: planLabels[planKey] })
    trackCheckoutError({ message, planKey, planName: planLabels[planKey] })
    throw new Error(message)
  }

  const attribution = getTrafficAttribution()
  const checkoutAttemptId = createCheckoutAttemptId()

  try {
    trackStartStripeCheckout({
      checkoutAttemptId,
      planKey,
      planName: planLabels[planKey],
    })

    const response = await fetch(integrations.checkoutApiUrl, {
      body: JSON.stringify({
        attribution,
        checkoutAttemptId,
        current_path: attribution.current_path,
        landing_page: attribution.landing_page,
        planKey,
        referrer: attribution.referrer,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    const payload = (await response.json()) as CheckoutSessionResponse

    if (!response.ok || !payload.url) {
      throw new Error(
        payload.error || 'No se pudo iniciar el checkout. Inténtalo de nuevo.',
      )
    }

    trackCheckoutRedirectStarted({
      checkoutAttemptId,
      planKey,
      planName: planLabels[planKey],
    })

    window.location.href = payload.url
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'No se pudo iniciar el checkout. Inténtalo de nuevo.'

    trackCheckoutError({
      checkoutAttemptId,
      message,
      planKey,
      planName: planLabels[planKey],
    })
    throw new Error(message, { cause: error })
  }
}
