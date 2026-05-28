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

export type PlanCheckoutLink = {
  href: string
  provider: PlanCheckoutProvider
}

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
  calendlyValuationUrl?: string
  stripeValuationPaymentUrl?: string
  planCheckoutLinks?: {
    valuation: PlanCheckoutLink
    personalized: PlanCheckoutLink
    accompaniment: PlanCheckoutLink
  }
} = {
  name: 'VetKathia',
  tagline: 'Nutrición natural veterinaria para perros y gatos',
  description:
    'Nutrición natural veterinaria online para perros y gatos, con valoración nutricional, planes personalizados y acompañamiento opcional.',
  contact: {
    email: '',
    fallback:
      'El contacto se gestiona desde el plan elegido y el cuestionario inicial.',
  },
  calendlyValuationUrl: '',
  stripeValuationPaymentUrl: '',
  planCheckoutLinks: {
    accompaniment: {
      href: '',
      provider: 'stripe',
    },
    personalized: {
      href: '',
      provider: 'stripe',
    },
    valuation: {
      href: '',
      provider: 'stripe',
    },
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
