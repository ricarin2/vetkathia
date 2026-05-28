import { Helmet } from 'react-helmet-async'

type SEOHeadProps = {
  canonicalPath: string
  description: string
  noindex?: boolean
  ogImage?: string
  ogImageAlt?: string
  ogType?: string
  title: string
}

const defaultOgImage = '/images/vetkathia-hero-pets-1200.jpg'
const defaultOgImageAlt =
  'Perro y gato junto a una pauta de nutrición natural veterinaria VetKathia'
const fallbackSiteUrl = 'https://vetkathia.com'

function getSiteUrl() {
  const envSiteUrl = import.meta.env.VITE_SITE_URL as string | undefined

  if (envSiteUrl) return envSiteUrl.replace(/\/$/, '')

  return fallbackSiteUrl
}

function toAbsoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl

  return new URL(pathOrUrl, `${getSiteUrl()}/`).toString()
}

export function SEOHead({
  canonicalPath,
  description,
  noindex = false,
  ogImage = defaultOgImage,
  ogImageAlt = defaultOgImageAlt,
  ogType = 'website',
  title,
}: SEOHeadProps) {
  const canonicalUrl = toAbsoluteUrl(canonicalPath)
  const imageUrl = toAbsoluteUrl(ogImage)
  const robotsContent = noindex ? 'noindex,follow' : 'index,follow'

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:site_name" content="VetKathia" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={ogImageAlt} />
    </Helmet>
  )
}
