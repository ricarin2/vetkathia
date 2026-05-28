export const integrations = {
  analyticsEnabled: import.meta.env.VITE_ANALYTICS_ENABLED === 'true',
  calendlyUrl: import.meta.env.VITE_CALENDLY_URL ?? '',
  formEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT ?? '',
}
