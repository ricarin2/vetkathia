import { getIntegrationStatus } from './integrations'

export type PlanKey = 'valuation' | 'personalized' | 'accompaniment'

export const planLabels: Record<PlanKey, string> = {
  accompaniment: 'Plan con Acompañamiento',
  personalized: 'Plan Personalizado',
  valuation: 'Valoración Nutricional',
}

export const planCtaLabels: Record<PlanKey, string> = {
  accompaniment: 'Contratar acompañamiento',
  personalized: 'Contratar plan personalizado',
  valuation: 'Contratar valoración',
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

export function isCheckoutConfigured() {
  return getIntegrationStatus().canAcceptPayments
}
