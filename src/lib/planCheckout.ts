import { siteConfig } from '../data/site'

export type PlanKey = 'valuation' | 'personalized' | 'accompaniment'

type PlanCheckoutTarget =
  | {
      href: string
      isExternal: boolean
      to?: never
    }
  | {
      href?: never
      isExternal: false
      to: string
    }

export const planLabels: Record<PlanKey, string> = {
  accompaniment: 'Plan con Acompañamiento',
  personalized: 'Plan Personalizado',
  valuation: 'Valoración Nutricional',
}

export const planCtaLabels: Record<PlanKey, string> = {
  accompaniment: 'Contratar acompañamiento',
  personalized: 'Contratar plan personalizado',
  valuation: 'Reservar valoración',
}

const planKeysByName: Record<string, PlanKey> = {
  'Plan con Acompañamiento': 'accompaniment',
  'Plan Personalizado': 'personalized',
  'Valoración Nutricional': 'valuation',
}

export function getPlanKeyFromName(planName: string): PlanKey {
  return planKeysByName[planName] ?? 'valuation'
}

export function getSelectedPlan(searchPlan: string | null): PlanKey | null {
  if (
    searchPlan === 'valuation' ||
    searchPlan === 'personalized' ||
    searchPlan === 'accompaniment'
  ) {
    return searchPlan
  }

  return null
}

export function getPlanCheckoutTarget(planKey: PlanKey): PlanCheckoutTarget {
  const checkoutLink = siteConfig.planCheckoutLinks?.[planKey]
  const href = checkoutLink?.href.trim()

  if (href) {
    return {
      href,
      isExternal: href.startsWith('http'),
    } as PlanCheckoutTarget
  }

  return {
    isExternal: false,
    to: `/solicitar-valoracion?plan=${planKey}`,
  }
}
