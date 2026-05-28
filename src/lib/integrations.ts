export type CheckoutMode = 'checkout_sessions'
export type CalendlyEmbedMode = 'inline' | 'link' | 'popup'
export type IntegrationPlanKey = 'valuation' | 'personalized' | 'accompaniment'

const readBooleanFlag = (
  value: string | boolean | undefined,
  fallback = false,
) => {
  if (value === true || value === 'true') {
    return true
  }

  if (value === false || value === 'false') {
    return false
  }

  return fallback
}

const readCheckoutMode = (
  value: string | undefined,
): CheckoutMode => {
  if (value && value !== 'checkout_sessions') {
    return 'checkout_sessions'
  }
  return 'checkout_sessions'
}

const readCalendlyEmbedMode = (
  value: string | undefined,
): CalendlyEmbedMode => {
  if (value === 'popup' || value === 'link') {
    return value
  }

  return 'inline'
}

const calendlyUrls: Record<IntegrationPlanKey, string> = {
  accompaniment: import.meta.env.VITE_CALENDLY_URL_ACCOMPANIMENT ?? '',
  personalized: import.meta.env.VITE_CALENDLY_URL_PERSONALIZED ?? '',
  valuation: import.meta.env.VITE_CALENDLY_URL_VALUATION ?? '',
}
const checkoutApiUrl =
  import.meta.env.VITE_CHECKOUT_API_URL ?? '/api/create-checkout-session'
const checkoutMode = readCheckoutMode(import.meta.env.VITE_CHECKOUT_MODE)

export const integrations = {
  analyticsEnabled: import.meta.env.VITE_ANALYTICS_ENABLED === 'true',
  calendlyEnabled: readBooleanFlag(
    import.meta.env.VITE_CALENDLY_ENABLED,
    Object.values(calendlyUrls).some(Boolean),
  ),
  calendlyUrl:
    import.meta.env.VITE_CALENDLY_URL ??
    import.meta.env.VITE_CALENDLY_URL_VALUATION ??
    '',
  calendlyUrls,
  calendlyEmbedMode: readCalendlyEmbedMode(
    import.meta.env.VITE_CALENDLY_EMBED_MODE,
  ),
  checkoutApiUrl,
  checkoutEnabled: readBooleanFlag(import.meta.env.VITE_CHECKOUT_ENABLED),
  checkoutMode,
  formEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT ?? '',
  legalContentReady: readBooleanFlag(import.meta.env.VITE_LEGAL_CONTENT_READY),
  requirePaymentBeforeForm: readBooleanFlag(
    import.meta.env.VITE_REQUIRE_PAYMENT_BEFORE_FORM,
  ),
  siteUrl: import.meta.env.VITE_SITE_URL ?? '',
  stripeConfigured: readBooleanFlag(import.meta.env.VITE_STRIPE_CONFIGURED),
}

export function getIntegrationStatus() {
  const calendlyConfiguredByPlan = {
    accompaniment:
      integrations.calendlyEnabled &&
      Boolean(integrations.calendlyUrls.accompaniment.trim()),
    personalized:
      integrations.calendlyEnabled &&
      Boolean(integrations.calendlyUrls.personalized.trim()),
    valuation:
      integrations.calendlyEnabled &&
      Boolean(integrations.calendlyUrls.valuation.trim()),
  } satisfies Record<IntegrationPlanKey, boolean>
  const stripeConfigured =
    integrations.stripeConfigured &&
    integrations.checkoutMode === 'checkout_sessions' &&
    Boolean(integrations.checkoutApiUrl.trim())
  const checkoutConfigured = integrations.checkoutEnabled && stripeConfigured
  const formConfigured = Boolean(integrations.formEndpoint.trim())
  const legalReady = integrations.legalContentReady

  return {
    calendlyConfiguredByPlan,
    canAcceptPayments: checkoutConfigured && legalReady,
    canAcceptQuestionnaires: formConfigured || import.meta.env.DEV,
    checkoutConfigured,
    checkoutMode: integrations.checkoutMode,
    formConfigured,
    legalReady,
    stripeConfigured,
  }
}
