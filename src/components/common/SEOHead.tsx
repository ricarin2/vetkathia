import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'

type SEOHeadProps = {
  canonicalPath: string
  description: string
  noindex?: boolean
  ogImage?: string
  ogImageAlt?: string
  ogImageHeight?: number
  ogImageWidth?: number
  ogType?: string
  title: string
}

const defaultOgImage = '/images/vetkathia-hero-pets-1200.jpg'
const defaultOgImageAlt =
  'Perro y gato junto a una pauta de nutrición natural veterinaria VetKathia'
const defaultOgImageHeight = 900
const defaultOgImageWidth = 1200
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
  ogImageHeight = defaultOgImageHeight,
  ogImageWidth = defaultOgImageWidth,
  ogType = 'website',
  title,
}: SEOHeadProps) {
  const canonicalUrl = toAbsoluteUrl(canonicalPath)
  const imageUrl = toAbsoluteUrl(ogImage)
  const robotsContent = noindex ? 'noindex,follow' : 'index,follow'

  useEffect(() => {
    document
      .querySelector('meta[data-vetkathia-fallback-description]')
      ?.remove()
  }, [])

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
      <meta property="og:image:width" content={String(ogImageWidth)} />
      <meta property="og:image:height" content={String(ogImageHeight)} />
      <meta property="og:site_name" content="VetKathia" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={ogImageAlt} />
    </Helmet>
  )
}
