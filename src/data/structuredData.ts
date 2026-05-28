const fallbackSiteUrl = 'https://vetkathia.com'
const siteUrl = (
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? fallbackSiteUrl
).replace(/\/$/, '')
const organizationId = `${siteUrl}/#vetkathia`

export const vetKathiaServiceStructuredData = {
  '@context': 'https://schema.org',
  '@id': organizationId,
  '@type': 'ProfessionalService',
  areaServed: {
    '@type': 'Place',
    name: 'España y países hispanohablantes',
  },
  description:
    'Nutrición natural veterinaria para perros y gatos con pautas personalizadas.',
  name: 'VetKathia',
  serviceType: 'Nutrición veterinaria online',
  url: `${siteUrl}/`,
}

export const kathiaPersonStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  jobTitle: 'Veterinaria',
  name: 'Kathia',
  url: `${siteUrl}/sobre-mi`,
  worksFor: {
    '@id': organizationId,
    '@type': 'Organization',
    name: 'VetKathia',
  },
}

export const homeOfferCatalogStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  itemListElement: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Valoración Nutricional',
        provider: {
          '@id': organizationId,
          '@type': 'Organization',
          name: 'VetKathia',
        },
        serviceType: 'Valoración nutricional online',
      },
      name: 'Valoración Nutricional',
      price: '59',
      priceCurrency: 'EUR',
      url: `${siteUrl}/planes`,
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Plan Personalizado',
        provider: {
          '@id': organizationId,
          '@type': 'Organization',
          name: 'VetKathia',
        },
        serviceType: 'Plan nutricional personalizado',
      },
      name: 'Plan Personalizado',
      price: '89',
      priceCurrency: 'EUR',
      url: `${siteUrl}/planes`,
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Plan con Acompañamiento',
        provider: {
          '@id': organizationId,
          '@type': 'Organization',
          name: 'VetKathia',
        },
        serviceType: 'Plan nutricional con acompañamiento',
      },
      name: 'Plan con Acompañamiento',
      price: '129',
      priceCurrency: 'EUR',
      url: `${siteUrl}/planes`,
    },
  ],
  name: 'Planes de nutrición VetKathia',
  url: `${siteUrl}/planes`,
}

type BreadcrumbItem = {
  name: string
  path: string
}

export function createBreadcrumbStructuredData(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      item: `${siteUrl}${item.path}`,
      name: item.name,
      position: index + 1,
    })),
  }
}

type FaqStructuredDataItem = {
  answer: string
  question: string
}

export function createFaqStructuredData(items: FaqStructuredDataItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
      name: item.question,
    })),
  }
}
