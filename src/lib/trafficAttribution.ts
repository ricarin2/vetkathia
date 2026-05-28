const attributionStorageKey = 'vetkathia_attribution'

export const utmParamKeys = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const

type UtmParamKey = (typeof utmParamKeys)[number]

export type TrafficAttribution = Record<UtmParamKey, string> & {
  current_path: string
  landing_page: string
  referrer: string
}

const emptyUtmParams = utmParamKeys.reduce(
  (params, key) => ({
    ...params,
    [key]: '',
  }),
  {} as Record<UtmParamKey, string>,
)

const emptyAttribution: TrafficAttribution = {
  ...emptyUtmParams,
  current_path: '',
  landing_page: '',
  referrer: '',
}

export function readQueryParams(search = ''): Record<UtmParamKey, string> {
  const params = new URLSearchParams(search)

  return utmParamKeys.reduce(
    (values, key) => ({
      ...values,
      [key]: params.get(key)?.trim() ?? '',
    }),
    {} as Record<UtmParamKey, string>,
  )
}

function getCurrentPath() {
  return `${window.location.pathname}${window.location.search}`
}

function getCurrentUrl() {
  return `${window.location.origin}${window.location.pathname}${window.location.search}`
}

function hasAnyUtm(values: Record<UtmParamKey, string>) {
  return Object.values(values).some(Boolean)
}

function readStoredAttribution() {
  try {
    const storedValue = window.sessionStorage.getItem(attributionStorageKey)
    if (!storedValue) return null

    return JSON.parse(storedValue) as Partial<TrafficAttribution>
  } catch {
    return null
  }
}

function storeAttribution(values: TrafficAttribution) {
  try {
    window.sessionStorage.setItem(attributionStorageKey, JSON.stringify(values))
  } catch {
    // Attribution should never block the form if storage is unavailable.
  }
}

export function getTrafficAttribution(): TrafficAttribution {
  if (typeof window === 'undefined') return emptyAttribution

  const queryParams = readQueryParams(window.location.search)
  const storedAttribution = readStoredAttribution()
  const shouldRefreshUtm = hasAnyUtm(queryParams)
  const attribution: TrafficAttribution = {
    ...emptyAttribution,
    ...storedAttribution,
    ...(shouldRefreshUtm ? queryParams : {}),
    current_path: getCurrentPath(),
    landing_page: shouldRefreshUtm
      ? getCurrentUrl()
      : storedAttribution?.landing_page || getCurrentUrl(),
    referrer: shouldRefreshUtm
      ? document.referrer || ''
      : storedAttribution?.referrer || document.referrer || '',
  }

  if (!storedAttribution || shouldRefreshUtm) {
    storeAttribution(attribution)
  }

  return attribution
}
