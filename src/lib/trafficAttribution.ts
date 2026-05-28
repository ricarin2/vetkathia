const firstTouchStorageKey = 'vetkathia_first_touch_attribution'
const lastTouchStorageKey = 'vetkathia_last_touch_attribution'

export const utmParamKeys = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
] as const

export const clickIdParamKeys = [
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'ttclid',
  'msclkid',
] as const

export const attributionParamKeys = [
  ...utmParamKeys,
  ...clickIdParamKeys,
] as const

type UtmParamKey = (typeof utmParamKeys)[number]
type ClickIdParamKey = (typeof clickIdParamKeys)[number]
export type AttributionParamKey = UtmParamKey | ClickIdParamKey

export type TrafficAttribution = Record<AttributionParamKey, string> & {
  current_path: string
  first_touch_landing_page: string
  first_touch_referrer: string
  first_touch_timestamp: string
  landing_page: string
  last_touch_landing_page: string
  last_touch_timestamp: string
  referrer: string
}

type StoredFirstTouchAttribution = Partial<
  Pick<
    TrafficAttribution,
    'first_touch_landing_page' | 'first_touch_referrer' | 'first_touch_timestamp'
  > &
    Record<AttributionParamKey, string>
>

type StoredLastTouchAttribution = Partial<
  Pick<
    TrafficAttribution,
    'last_touch_landing_page' | 'last_touch_timestamp' | 'landing_page' | 'referrer'
  > &
    Record<AttributionParamKey, string>
>

const emptyAttributionParams = attributionParamKeys.reduce(
  (params, key) => ({
    ...params,
    [key]: '',
  }),
  {} as Record<AttributionParamKey, string>,
)

const emptyAttribution: TrafficAttribution = {
  ...emptyAttributionParams,
  current_path: '',
  first_touch_landing_page: '',
  first_touch_referrer: '',
  first_touch_timestamp: '',
  landing_page: '',
  last_touch_landing_page: '',
  last_touch_timestamp: '',
  referrer: '',
}

export function readQueryParams(
  search = '',
): Record<AttributionParamKey, string> {
  const params = new URLSearchParams(search)

  return attributionParamKeys.reduce(
    (values, key) => ({
      ...values,
      [key]: params.get(key)?.trim() ?? '',
    }),
    {} as Record<AttributionParamKey, string>,
  )
}

function getCurrentPath() {
  return `${window.location.pathname}${window.location.search}`
}

function getCurrentUrl() {
  return `${window.location.origin}${window.location.pathname}${window.location.search}`
}

function hasAnyAttributionParam(values: Record<AttributionParamKey, string>) {
  return Object.values(values).some(Boolean)
}

function readStorage<T>(storage: Storage | undefined, key: string) {
  try {
    const storedValue = storage?.getItem(key)
    if (!storedValue) return null

    return JSON.parse(storedValue) as Partial<T>
  } catch {
    return null
  }
}

function writeStorage(storage: Storage | undefined, key: string, value: unknown) {
  try {
    storage?.setItem(key, JSON.stringify(value))
  } catch {
    // Attribution should never block conversion flows if storage is unavailable.
  }
}

function resolveFirstTouch(
  queryParams: Record<AttributionParamKey, string>,
  landingPage: string,
  referrer: string,
  timestamp: string,
) {
  const storedFirstTouch = readStorage<StoredFirstTouchAttribution>(
    window.localStorage,
    firstTouchStorageKey,
  )

  if (storedFirstTouch?.first_touch_timestamp) {
    return storedFirstTouch
  }

  const firstTouch: StoredFirstTouchAttribution = {
    ...emptyAttributionParams,
    ...queryParams,
    first_touch_landing_page: landingPage,
    first_touch_referrer: referrer,
    first_touch_timestamp: timestamp,
  }

  writeStorage(window.localStorage, firstTouchStorageKey, firstTouch)

  return firstTouch
}

function resolveLastTouch(
  queryParams: Record<AttributionParamKey, string>,
  landingPage: string,
  referrer: string,
  timestamp: string,
) {
  const storedLastTouch = readStorage<StoredLastTouchAttribution>(
    window.sessionStorage,
    lastTouchStorageKey,
  )
  const shouldRefreshAttribution =
    !storedLastTouch || hasAnyAttributionParam(queryParams)

  const lastTouch: StoredLastTouchAttribution = {
    ...emptyAttributionParams,
    ...storedLastTouch,
    ...(shouldRefreshAttribution ? queryParams : {}),
    landing_page: shouldRefreshAttribution
      ? landingPage
      : storedLastTouch?.landing_page || landingPage,
    last_touch_landing_page: shouldRefreshAttribution
      ? landingPage
      : storedLastTouch?.last_touch_landing_page || landingPage,
    last_touch_timestamp: shouldRefreshAttribution
      ? timestamp
      : storedLastTouch?.last_touch_timestamp || timestamp,
    referrer: shouldRefreshAttribution
      ? referrer
      : storedLastTouch?.referrer || referrer,
  }

  if (shouldRefreshAttribution) {
    writeStorage(window.sessionStorage, lastTouchStorageKey, lastTouch)
  }

  return lastTouch
}

export function getTrafficAttribution(): TrafficAttribution {
  if (typeof window === 'undefined') return emptyAttribution

  const landingPage = getCurrentUrl()
  const referrer = document.referrer || ''
  const timestamp = new Date().toISOString()
  const queryParams = readQueryParams(window.location.search)
  const firstTouch = resolveFirstTouch(
    queryParams,
    landingPage,
    referrer,
    timestamp,
  )
  const lastTouch = resolveLastTouch(queryParams, landingPage, referrer, timestamp)

  return {
    ...emptyAttribution,
    ...firstTouch,
    ...lastTouch,
    current_path: getCurrentPath(),
    first_touch_landing_page:
      firstTouch.first_touch_landing_page || landingPage,
    first_touch_referrer: firstTouch.first_touch_referrer || referrer,
    first_touch_timestamp: firstTouch.first_touch_timestamp || timestamp,
    landing_page: lastTouch.landing_page || landingPage,
    last_touch_landing_page: lastTouch.last_touch_landing_page || landingPage,
    last_touch_timestamp: lastTouch.last_touch_timestamp || timestamp,
    referrer: lastTouch.referrer || referrer,
  }
}
