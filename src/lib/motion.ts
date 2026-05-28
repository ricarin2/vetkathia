import { useReducedMotion } from 'framer-motion'

export const premiumMotionTransition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
} as const

export const premiumHeroMotion = {
  animate: { opacity: 1, y: 0 },
  initial: { opacity: 0, y: 10 },
  transition: premiumMotionTransition,
} as const

export function usePremiumMotionEnabled() {
  return !useReducedMotion()
}
