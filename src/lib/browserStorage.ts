export function readSessionStorage(key: string) {
  if (typeof window === 'undefined') return ''

  try {
    return window.sessionStorage.getItem(key)?.trim() ?? ''
  } catch {
    return ''
  }
}

export function writeSessionStorage(key: string, value: string) {
  if (typeof window === 'undefined') return

  try {
    window.sessionStorage.setItem(key, value)
  } catch {
    // Storage should never block checkout, Calendly or questionnaire flows.
  }
}
