import { plans } from './plans'
import { siteConfig } from './site'

const fallbackSiteUrl = 'https://vetkathia.com'
const siteUrl = (
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? fallbackSiteUrl
).replace(/\/$/, '')

const schemaContext = 'https://schema.org'

const ids = {
  kathia: `${siteUrl}/#kathia`,
  serviceAcompanamiento: `${siteUrl}/#service-acompanamiento`,
  servicePlanPersonalizado: `${siteUrl}/#service-plan-personalizado`,
  serviceValoracion: `${siteUrl}/#service-valoracion`,
  vetkathia: `${siteUrl}/#vetkathia`,
  website: `${siteUrl}/#website`,
}

type StructuredDataNode = Record<string, unknown>

type BreadcrumbItem = {
  name: string
  path: string
}

type FaqStructuredDataItem = {
  answer: string
  question: string
}

type PageStructuredDataConfig = {
  breadcrumb?: BreadcrumbItem[]
  description: string
  faqItems?: FaqStructuredDataItem[]
  name: string
  path: string
  primaryEntityId?: string
}

type PlanStructuredDataDefinition = {
  key: 'valuation' | 'personalized' | 'accompaniment'
  offerId: string
  planIndex: number
  serviceId: string
  serviceType: string
}

const areaServed = {
  '@type': 'Place',
  name: 'España y países hispanohablantes',
}

const socialProfileUrls = (siteConfig.socialLinks ?? [])
  .filter((link) =>
    ['Instagram', 'TikTok', 'Facebook'].includes(link.label),
  )
  .map((link) => link.href)
  .filter((href) => href.startsWith('https://'))

const planDefinitions: PlanStructuredDataDefinition[] = [
  {
    key: 'valuation',
    offerId: `${ids.serviceValoracion}-offer`,
    planIndex: 0,
    serviceId: ids.serviceValoracion,
    serviceType: 'Valoración nutricional online',
  },
  {
    key: 'personalized',
    offerId: `${ids.servicePlanPersonalizado}-offer`,
    planIndex: 1,
    serviceId: ids.servicePlanPersonalizado,
    serviceType: 'Plan nutricional personalizado online',
  },
  {
    key: 'accompaniment',
    offerId: `${ids.serviceAcompanamiento}-offer`,
    planIndex: 2,
    serviceId: ids.serviceAcompanamiento,
    serviceType: 'Plan nutricional online con acompañamiento',
  },
]

function absoluteUrl(path: string) {
  if (path === '/') {
    return `${siteUrl}/`
  }

  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

function fragmentUrl(path: string, fragment: string) {
  return path === '/'
    ? `${siteUrl}/#${fragment}`
    : `${absoluteUrl(path)}#${fragment}`
}

function createGraph(nodes: StructuredDataNode[]) {
  return {
    '@context': schemaContext,
    '@graph': nodes,
  }
}

function withContext(node: StructuredDataNode) {
  return {
    '@context': schemaContext,
    ...node,
  }
}

function getPlanPrice(planIndex: number) {
  return plans[planIndex].price.replace(/[^\d,.]/g, '').replace(',', '.')
}

function getPlanDescription(planIndex: number) {
  const plan = plans[planIndex]

  return `${plan.description} ${plan.bestFor}`
}

const websiteNode = {
  '@id': ids.website,
  '@type': 'WebSite',
  description:
    'Web comercial de VetKathia para contratar online servicios de nutrición natural veterinaria para perros y gatos.',
  inLanguage: 'es-ES',
  name: 'VetKathia',
  publisher: {
    '@id': ids.vetkathia,
  },
  url: absoluteUrl('/'),
}

const vetKathiaNode = {
  '@id': ids.vetkathia,
  '@type': 'ProfessionalService',
  areaServed,
  description:
    'Servicio online de nutrición natural veterinaria para perros y gatos con valoración, planes personalizados y acompañamiento contratables online.',
  founder: {
    '@id': ids.kathia,
  },
  makesOffer: planDefinitions.map((plan) => ({
    '@id': plan.offerId,
  })),
  name: 'VetKathia',
  sameAs: socialProfileUrls,
  serviceType: 'Nutrición veterinaria online',
  url: absoluteUrl('/'),
}

const kathiaPersonNode = {
  '@id': ids.kathia,
  '@type': 'Person',
  jobTitle: 'Veterinaria',
  name: 'Kathia',
  url: absoluteUrl('/sobre-mi'),
  worksFor: {
    '@id': ids.vetkathia,
  },
}

function createPlanNodes() {
  return planDefinitions.flatMap((definition) => {
    const plan = plans[definition.planIndex]

    return [
      {
        '@id': definition.serviceId,
        '@type': 'Service',
        areaServed,
        availableChannel: {
          '@type': 'ServiceChannel',
          availableLanguage: 'es-ES',
          serviceUrl: absoluteUrl(`/contratar?plan=${definition.key}`),
        },
        description: getPlanDescription(definition.planIndex),
        name: plan.name,
        offers: {
          '@id': definition.offerId,
        },
        provider: {
          '@id': ids.vetkathia,
        },
        serviceType: definition.serviceType,
        url: absoluteUrl('/planes'),
      },
      {
        '@id': definition.offerId,
        '@type': 'Offer',
        availability: 'https://schema.org/OnlineOnly',
        itemOffered: {
          '@id': definition.serviceId,
        },
        name: plan.name,
        price: getPlanPrice(definition.planIndex),
        priceCurrency: 'EUR',
        seller: {
          '@id': ids.vetkathia,
        },
        url: absoluteUrl(`/contratar?plan=${definition.key}`),
      },
    ]
  })
}

function createWebPageNode({
  description,
  name,
  path,
  primaryEntityId = ids.vetkathia,
}: PageStructuredDataConfig) {
  return {
    '@id': fragmentUrl(path, 'webpage'),
    '@type': 'WebPage',
    about: {
      '@id': primaryEntityId,
    },
    description,
    inLanguage: 'es-ES',
    isPartOf: {
      '@id': ids.website,
    },
    mainEntity: {
      '@id': primaryEntityId,
    },
    name,
    url: absoluteUrl(path),
  }
}

function createBreadcrumbNode(items: BreadcrumbItem[]) {
  const lastItem = items.at(-1)

  return {
    '@id': lastItem
      ? fragmentUrl(lastItem.path, 'breadcrumb')
      : `${siteUrl}/#breadcrumb`,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      item: absoluteUrl(item.path),
      name: item.name,
      position: index + 1,
    })),
  }
}

function createFaqNode(items: FaqStructuredDataItem[], path: string) {
  return {
    '@id': fragmentUrl(path, 'faq'),
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

function createPageGraph({
  breadcrumb,
  faqItems,
  ...page
}: PageStructuredDataConfig) {
  return createGraph([
    websiteNode,
    vetKathiaNode,
    kathiaPersonNode,
    createWebPageNode(page),
    ...createPlanNodes(),
    ...(breadcrumb ? [createBreadcrumbNode(breadcrumb)] : []),
    ...(faqItems && faqItems.length > 0
      ? [createFaqNode(faqItems, page.path)]
      : []),
  ])
}

export const vetKathiaServiceStructuredData = withContext(vetKathiaNode)
export const websiteStructuredData = withContext(websiteNode)
export const kathiaPersonStructuredData = withContext(kathiaPersonNode)
export const plansOfferCatalogStructuredData = createGraph(createPlanNodes())

export function createHomeStructuredData(
  faqItems?: FaqStructuredDataItem[],
) {
  return createPageGraph({
    description:
      'Valoración nutricional y planes personalizados para perros y gatos. Dieta cocinada, mixta, BARF o transición gradual con criterio veterinario.',
    faqItems,
    name: 'Nutrición natural veterinaria online | VetKathia',
    path: '/',
  })
}

export function createPlansStructuredData(
  faqItems?: FaqStructuredDataItem[],
) {
  return createPageGraph({
    breadcrumb: [
      { name: 'Inicio', path: '/' },
      { name: 'Planes', path: '/planes' },
    ],
    description:
      'Contrata online valoración nutricional, plan personalizado o acompañamiento para mejorar la alimentación de tu perro o gato sin improvisar.',
    faqItems,
    name: 'Planes de nutrición natural para perros y gatos | VetKathia',
    path: '/planes',
    primaryEntityId: ids.vetkathia,
  })
}

export function createFaqPageStructuredData(
  faqItems: FaqStructuredDataItem[],
) {
  return createPageGraph({
    breadcrumb: [
      { name: 'Inicio', path: '/' },
      { name: 'FAQ', path: '/faq' },
    ],
    description:
      'Respuestas sobre dieta cocinada, BARF, alimentación mixta, gatos, seniors, transición segura y planes nutricionales online.',
    faqItems,
    name: 'FAQ sobre nutrición natural para perros y gatos | VetKathia',
    path: '/faq',
    primaryEntityId: fragmentUrl('/faq', 'faq'),
  })
}

export function createAboutPageStructuredData() {
  return createPageGraph({
    breadcrumb: [
      { name: 'Inicio', path: '/' },
      { name: 'Sobre mí', path: '/sobre-mi' },
    ],
    description:
      'Conoce a Kathia y su enfoque veterinario: nutrición natural para perros y gatos sin radicalismos, con pautas adaptadas a cada caso.',
    name: 'Kathia, veterinaria de nutrición natural | VetKathia',
    path: '/sobre-mi',
    primaryEntityId: ids.kathia,
  })
}

export function createBreadcrumbStructuredData(items: BreadcrumbItem[]) {
  return withContext(createBreadcrumbNode(items))
}

export function createFaqStructuredData(items: FaqStructuredDataItem[]) {
  return withContext(createFaqNode(items, '/faq'))
}
