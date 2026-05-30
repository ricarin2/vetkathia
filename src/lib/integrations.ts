import { getLegalReadinessStatus } from '../data/legal'

export type CheckoutMode = 'payment_links' | 'checkout_sessions'
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
  if (value === 'checkout_sessions') {
    return 'checkout_sessions'
  }

  return 'payment_links'
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
const stripePaymentLinks: Record<IntegrationPlanKey, string> = {
  accompaniment: import.meta.env.VITE_STRIPE_PAYMENT_LINK_ACCOMPANIMENT ?? '',
  personalized: import.meta.env.VITE_STRIPE_PAYMENT_LINK_PERSONALIZED ?? '',
  valuation: import.meta.env.VITE_STRIPE_PAYMENT_LINK_VALUATION ?? '',
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
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL ?? 'vetkathia@gmail.com',
  formEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT ?? '',
  legalContentReady: readBooleanFlag(import.meta.env.VITE_LEGAL_CONTENT_READY),
  requirePaymentBeforeForm: readBooleanFlag(
    import.meta.env.VITE_REQUIRE_PAYMENT_BEFORE_FORM,
  ),
  siteUrl: import.meta.env.VITE_SITE_URL ?? '',
  stripeConfigured: readBooleanFlag(import.meta.env.VITE_STRIPE_CONFIGURED),
  stripePaymentLinks,
  youtubeUrl: import.meta.env.VITE_YOUTUBE_URL ?? '',
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
  const paymentLinksConfiguredByPlan = {
    accompaniment: Boolean(integrations.stripePaymentLinks.accompaniment.trim()),
    personalized: Boolean(integrations.stripePaymentLinks.personalized.trim()),
    valuation: Boolean(integrations.stripePaymentLinks.valuation.trim()),
  } satisfies Record<IntegrationPlanKey, boolean>
  const paymentLinksConfigured = Object.values(
    paymentLinksConfiguredByPlan,
  ).every(Boolean)
  const stripeConfigured =
    integrations.checkoutMode === 'payment_links'
      ? paymentLinksConfigured
      : integrations.stripeConfigured &&
        Boolean(integrations.checkoutApiUrl.trim())
  const checkoutConfigured = integrations.checkoutEnabled && stripeConfigured
  const formConfigured = Boolean(integrations.formEndpoint.trim())
  const legalReadiness = getLegalReadinessStatus(integrations.contactEmail)
  const legalReady = integrations.legalContentReady && legalReadiness.ready
  const legalBlockMessage = !integrations.legalContentReady
    ? 'No se puede activar la contratación real hasta completar los textos legales.'
    : 'No se puede activar la contratación real hasta completar responsable, privacidad, contacto legal y condiciones de cancelación/reembolso.'

  return {
    calendlyConfiguredByPlan,
    canAcceptPayments: checkoutConfigured && legalReady,
    canAcceptQuestionnaires: formConfigured || import.meta.env.DEV,
    checkoutConfigured,
    checkoutMode: integrations.checkoutMode,
    contactConfigured: legalReadiness.contactConfigured,
    formConfigured,
    legalBlockMessage,
    legalContentReady: integrations.legalContentReady,
    legalReadiness,
    legalReady,
    paymentLinksConfiguredByPlan,
    stripeConfigured,
  }
}
