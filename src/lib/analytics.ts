type AnalyticsPayload = Record<string, boolean | number | string | undefined>

function emitAnalyticsEvent(eventName: string, payload: AnalyticsPayload = {}) {
  if (import.meta.env.DEV) {
    console.log('[analytics]', eventName, payload)
  }

  // Future adapters can be connected here without changing page components.
  // Gate real providers with `integrations.analyticsEnabled` when they are added:
  // window.plausible?.(eventName, { props: payload })
  // window.gtag?.('event', eventName, payload)
  // window.posthog?.capture(eventName, payload)
}

export function trackCTAClick(label: string, location: string) {
  emitAnalyticsEvent('cta_click', { label, location })
}

export function trackFormStart(payload: AnalyticsPayload = {}) {
  emitAnalyticsEvent('form_start', payload)
}

export function trackFormSubmit(payload: AnalyticsPayload = {}) {
  emitAnalyticsEvent('form_submit', payload)
}

export function trackPlanClick(planName: string) {
  emitAnalyticsEvent('plan_click', { planName })
}

export function trackLeadMagnetClick() {
  emitAnalyticsEvent('lead_magnet_click')
}

export function trackFAQOpen(question: string) {
  emitAnalyticsEvent('faq_open', { question })
}
