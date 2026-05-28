import { getTrafficAttribution } from './trafficAttribution'
import { type PlanKey } from './planCheckout'

export type AnalyticsPayload = Record<
  string,
  boolean | number | string | undefined
>

const planAnalytics: Record<PlanKey, { planName: string; price: number }> = {
  accompaniment: {
    planName: 'Plan con Acompañamiento',
    price: 129,
  },
  personalized: {
    planName: 'Plan Personalizado',
    price: 89,
  },
  valuation: {
    planName: 'Valoración Nutricional',
    price: 59,
  },
}

const planKeysByName: Record<string, PlanKey> = {
  'Plan con Acompañamiento': 'accompaniment',
  'Plan Personalizado': 'personalized',
  'Valoración Nutricional': 'valuation',
}

const sensitivePayloadKeys = new Set([
  'additionalComments',
  'age',
  'breed',
  'cityCountry',
  'currentFood',
  'diagnosticConditions',
  'email',
  'mainReason',
  'medication',
  'name',
  'neutered',
  'objective',
  'petName',
  'phone',
  'recentBloodwork',
  'species',
  'symptoms',
  'weight',
])

function sanitizeAnalyticsPayload(payload: AnalyticsPayload) {
  return Object.fromEntries(
    Object.entries(payload).filter(([key, value]) => {
      if (sensitivePayloadKeys.has(key)) return false

      return value !== undefined
    }),
  ) as AnalyticsPayload
}

function resolvePlanPayload(payload: AnalyticsPayload) {
  const planKey =
    typeof payload.planKey === 'string'
      ? payload.planKey
      : typeof payload.selectedPlan === 'string'
        ? payload.selectedPlan
        : typeof payload.checkoutPlan === 'string'
          ? payload.checkoutPlan
          : undefined
  const normalizedPlanKey =
    planKey === 'valuation' ||
    planKey === 'personalized' ||
    planKey === 'accompaniment'
      ? planKey
      : typeof payload.planName === 'string'
        ? planKeysByName[payload.planName]
        : undefined

  if (!normalizedPlanKey) return {}

  return {
    planKey: normalizedPlanKey,
    ...planAnalytics[normalizedPlanKey],
  }
}

function buildAnalyticsPayload(payload: AnalyticsPayload = {}) {
  const attribution = getTrafficAttribution()
  const sanitizedPayload = sanitizeAnalyticsPayload(payload)
  const planPayload = resolvePlanPayload(sanitizedPayload)

  return {
    ...attribution,
    ...planPayload,
    ...sanitizedPayload,
  }
}

function emitAnalyticsEvent(eventName: string, payload: AnalyticsPayload = {}) {
  const eventPayload = buildAnalyticsPayload(payload)

  if (import.meta.env.DEV) {
    console.log('[analytics]', eventName, eventPayload)
  }

  // Future adapters can be connected here without changing page components.
  // Gate real providers with `integrations.analyticsEnabled` when they are added:
  // window.plausible?.(eventName, { props: eventPayload })
  // window.gtag?.('event', eventName, eventPayload)
  // window.posthog?.capture(eventName, eventPayload)
}

export function trackViewHome(payload: AnalyticsPayload = {}) {
  emitAnalyticsEvent('view_home', payload)
}

export function trackViewPlans(payload: AnalyticsPayload = {}) {
  emitAnalyticsEvent('view_plans', payload)
}

export function trackCTAClick(label: string, location: string) {
  emitAnalyticsEvent('cta_click', { label, location })
}

export function trackFormStart(payload: AnalyticsPayload = {}) {
  emitAnalyticsEvent('questionnaire_start', payload)
}

export function trackFormSubmit(payload: AnalyticsPayload = {}) {
  emitAnalyticsEvent('questionnaire_submit_success', payload)
}

export function trackQuestionnaireView(payload: AnalyticsPayload = {}) {
  emitAnalyticsEvent('questionnaire_view', payload)
}

export function trackQuestionnaireStepCompleted(
  payload: AnalyticsPayload = {},
) {
  emitAnalyticsEvent('questionnaire_step_completed', payload)
}

export function trackQuestionnaireSubmitSuccess(
  payload: AnalyticsPayload = {},
) {
  emitAnalyticsEvent('questionnaire_submit_success', payload)
}

export function trackQuestionnaireSubmitError(
  payload: AnalyticsPayload = {},
) {
  emitAnalyticsEvent('questionnaire_submit_error', payload)
}

export function trackPlanClick(
  planName: string,
  payload: AnalyticsPayload = {},
) {
  emitAnalyticsEvent('plan_cta_click', { planName, ...payload })
}

export function trackCheckoutRedirectStarted(payload: AnalyticsPayload = {}) {
  emitAnalyticsEvent('checkout_redirect_started', payload)
}

export function trackCheckoutError(payload: AnalyticsPayload = {}) {
  emitAnalyticsEvent('checkout_error', payload)
}

export function trackCheckoutConfigError(payload: AnalyticsPayload = {}) {
  emitAnalyticsEvent('checkout_config_error', payload)
}

export function trackCheckoutIntentView(payload: AnalyticsPayload = {}) {
  emitAnalyticsEvent('view_checkout_intent', payload)
}

export function trackCheckoutTermsAccepted(payload: AnalyticsPayload = {}) {
  emitAnalyticsEvent('accept_checkout_terms', payload)
}

export function trackStartStripeCheckout(payload: AnalyticsPayload = {}) {
  emitAnalyticsEvent('start_stripe_checkout', payload)
}

export function trackCheckoutSuccessPageView(
  payload: AnalyticsPayload = {},
) {
  emitAnalyticsEvent('checkout_success_page_view', payload)
}

export function trackCheckoutCancelPageView(payload: AnalyticsPayload = {}) {
  emitAnalyticsEvent('checkout_cancel_page_view', payload)
}

export function trackCalendlyClick(payload: AnalyticsPayload = {}) {
  emitAnalyticsEvent('calendly_click', payload)
}

export function trackCalendlyView(payload: AnalyticsPayload = {}) {
  emitAnalyticsEvent('calendly_view', payload)
}

export function trackCalendlyOpen(payload: AnalyticsPayload = {}) {
  emitAnalyticsEvent('calendly_open', payload)
}

export function trackCalendlyEventScheduled(payload: AnalyticsPayload = {}) {
  emitAnalyticsEvent('calendly_event_scheduled', payload)
}

export function trackCalendlyError(payload: AnalyticsPayload = {}) {
  emitAnalyticsEvent('calendly_error', payload)
}

export function trackThankYouView(payload: AnalyticsPayload = {}) {
  emitAnalyticsEvent('thank_you_view', payload)
}

export function trackLeadMagnetClick() {
  emitAnalyticsEvent('lead_magnet_click')
}

export function trackFAQOpen(question: string) {
  emitAnalyticsEvent('faq_open', { question })
}
