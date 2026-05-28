import {
  type CheckoutMode,
  integrations,
} from '../lib/integrations'

export type SiteSocialLink = {
  label: 'Instagram' | 'TikTok' | 'YouTube' | 'Facebook' | 'Email'
  href: string
}

export type SiteNewsletter = {
  enabled: boolean
  title: string
  description: string
  placeholder: string
  providerUrl?: string
  leadMagnetLabel?: string
}

export type PlanCheckoutProvider = 'stripe' | 'calendly'

export type PlanKey = 'valuation' | 'personalized' | 'accompaniment'

export type PlanCheckoutLink = {
  apiUrl: string
  provider: PlanCheckoutProvider
}

export type PlanLinkMap = Record<PlanKey, string>

export const siteConfig: {
  name: string
  tagline: string
  description: string
  contact: {
    email: string
    fallback: string
  }
  socialLinks?: SiteSocialLink[]
  newsletter?: SiteNewsletter
  checkoutEnabled: boolean
  checkoutMode: CheckoutMode
  legalContentReady: boolean
  calendlyEnabled: boolean
  calendlyValuationUrl?: string
  planCheckoutLinks: Record<PlanKey, PlanCheckoutLink>
  planCalendlyLinks: PlanLinkMap
} = {
  name: 'VetKathia',
  tagline: 'Nutrición natural veterinaria para perros y gatos',
  description:
    'Nutrición natural veterinaria online para perros y gatos, con valoración nutricional, planes personalizados y acompañamiento opcional.',
  contact: {
    email: '',
    fallback:
      'El contacto se gestiona desde el plan elegido y el cuestionario nutricional.',
  },
  calendlyEnabled: integrations.calendlyEnabled,
  calendlyValuationUrl: integrations.calendlyUrls.valuation,
  checkoutEnabled: integrations.checkoutEnabled,
  checkoutMode: integrations.checkoutMode,
  legalContentReady: integrations.legalContentReady,
  planCheckoutLinks: {
    accompaniment: {
      apiUrl: integrations.checkoutApiUrl,
      provider: 'stripe',
    },
    personalized: {
      apiUrl: integrations.checkoutApiUrl,
      provider: 'stripe',
    },
    valuation: {
      apiUrl: integrations.checkoutApiUrl,
      provider: 'stripe',
    },
  },
  planCalendlyLinks: {
    accompaniment: integrations.calendlyUrls.accompaniment,
    personalized: integrations.calendlyUrls.personalized,
    valuation: integrations.calendlyUrls.valuation,
  },
  socialLinks: [
    {
      href: 'https://www.instagram.com/vetkathia/',
      label: 'Instagram',
    },
    {
      href: 'https://www.tiktok.com/@vetkathia',
      label: 'TikTok',
    },
    {
      href: 'https://www.facebook.com/vetkathia',
      label: 'Facebook',
    },
  ],
  newsletter: {
    description:
      'Contenido práctico sobre transición segura, gatos, seniors y digestión sensible.',
    enabled: false,
    leadMagnetLabel: 'Ver planes',
    placeholder: 'Tu email',
    title: 'Recibe consejos para mejorar su alimentación sin improvisar',
  },
}

export const mainNavigation = [
  { href: '/#nutricion', label: 'Nutrición' },
  { href: '/#como-funciona', label: 'Cómo funciona' },
  { href: '/planes', label: 'Planes' },
  { href: '/sobre-mi', label: 'Sobre mí' },
  { href: '/faq', label: 'FAQ' },
]

export const legalNavigation = [
  { href: '/aviso-legal', label: 'Aviso legal' },
  { href: '/privacidad', label: 'Privacidad' },
  { href: '/cookies', label: 'Cookies' },
  { href: '/condiciones', label: 'Condiciones' },
]

export const socialLinks = siteConfig.socialLinks ?? []
