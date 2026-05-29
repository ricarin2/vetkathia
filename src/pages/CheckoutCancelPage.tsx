import { ArrowLeft, RotateCcw } from 'lucide-react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router'

import { SEOHead } from '../components/common/SEOHead'
import { Badge, Button, Card, Container, Section } from '../components/ui'
import {
  trackCheckoutCancelPageView,
  trackCTAClick,
} from '../lib/analytics'
import {
  getSelectedPlan,
  isCheckoutConfigured,
  planLabels,
} from '../lib/planCheckout'

export function CheckoutCancelPage() {
  const [searchParams] = useSearchParams()
  const selectedPlan = getSelectedPlan(searchParams.get('plan'))
  const selectedPlanLabel = selectedPlan ? planLabels[selectedPlan] : ''
  const checkoutConfigured = isCheckoutConfigured()

  useEffect(() => {
    trackCheckoutCancelPageView({
      planKey: selectedPlan ?? undefined,
      planName: selectedPlanLabel || undefined,
    })
  }, [selectedPlan, selectedPlanLabel])

  return (
    <>
      <SEOHead
        canonicalPath="/pago-cancelado"
        description="Página de continuación cuando el pago online de VetKathia no se completa."
        noindex
        title="Pago no completado | VetKathia"
      />

      <Section className="pb-10 pt-10 sm:pt-14 lg:pt-18">
        <Container size="md">
          <Card className="text-center shadow-soft">
            <Badge tone="soft">Checkout</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-vetkathia-text sm:text-5xl">
              Pago no completado
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-vetkathia-muted">
              El pago no se ha completado. Puedes volver a elegir plan o
              intentarlo de nuevo.
            </p>
            {selectedPlan && !checkoutConfigured ? (
              <p className="mx-auto mt-5 max-w-xl rounded-2xl border border-vetkathia-border bg-vetkathia-surface/70 px-4 py-3 text-sm font-semibold leading-6 text-vetkathia-primary-dark">
                La contratación online no está configurada todavía.
              </p>
            ) : null}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Button
                leftIcon={<ArrowLeft className="h-5 w-5" aria-hidden="true" />}
                onClick={() => trackCTAClick('Volver a planes', 'checkout cancel')}
                to="/planes"
                variant="outline"
              >
                Volver a planes
              </Button>
              <Button
                disabled={Boolean(selectedPlan) && !checkoutConfigured}
                leftIcon={<RotateCcw className="h-5 w-5" aria-hidden="true" />}
                onClick={() =>
                  trackCTAClick('Intentarlo de nuevo', 'checkout cancel')
                }
                to={selectedPlan ? `/contratar?plan=${selectedPlan}` : '/planes'}
              >
                Intentarlo de nuevo
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  )
}
