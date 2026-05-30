export function scrollToHashTarget(hash: string) {
  if (typeof window === 'undefined') return false

  const rawId = hash.startsWith('#') ? hash.slice(1) : hash
  if (!rawId) return false

  const id = (() => {
    try {
      return decodeURIComponent(rawId)
    } catch {
      return rawId
    }
  })()

  const target = document.getElementById(id)
  if (!target) return false

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  target.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start',
  })

  return true
}
