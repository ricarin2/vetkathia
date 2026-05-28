import { CalendlyEmbed } from './CalendlyEmbed'
import { type PlanKey } from '../../lib/planCheckout'

export function CalendlyPlaceholder({
  planKey = 'valuation',
}: {
  calendlyUrl?: string
  planKey?: PlanKey
}) {
  return <CalendlyEmbed mode="link" planKey={planKey} />
}
