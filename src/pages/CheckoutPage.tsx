import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileText,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router'

import { SEOHead } from '../components/common/SEOHead'
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Container,
  Section,
} from '../components/ui'
import { plans } from '../data/plans'
import {
  trackCheckoutConfigError,
  trackCheckoutIntentView,
  trackCheckoutTermsAccepted,
  trackCTAClick,
  trackPlanClick,
} from '../lib/analytics'
import { startCheckout } from '../lib/checkout'
import {
  getPlanKeyFromName,
  getSelectedPlan,
  isCheckoutConfigured,
  planCtaLabels,
  planLabels,
} from '../lib/planCheckout'
import { getIntegrationStatus, integrations } from '../lib/integrations'

type TermsState = {
  clinicalReview: boolean
  privacy: boolean
  serviceTerms: boolean
  urgency: boolean
}

const initialTermsState: TermsState = {
  clinicalReview: false,
  privacy: false,
  serviceTerms: false,
  urgency: false,
}

const checkoutFlow = [
  {
    Icon: CreditCard,
    label: 'Pago seguro con Stripe',
  },
  {
    Icon: ClipboardList,
    label: 'Cuestionario nutricional',
  },
  {
    Icon: CalendarClock,
    label: 'Reserva tu cita online',
  },
  {
    Icon: Stethoscope,
    label: 'Revisión profesional del caso',
  },
]

export function CheckoutPage() {
  const [searchParams] = useSearchParams()
  const selectedPlan = getSelectedPlan(searchParams.get('plan'))
  const selectedPlanDetails = useMemo(
    () =>
      selectedPlan
        ? plans.find((plan) => getPlanKeyFromName(plan.name) === selectedPlan)
        : undefined,
    [selectedPlan],
  )
  const integrationStatus = getIntegrationStatus()
  const checkoutConfigured = isCheckoutConfigured()
  const stripeConfigurationPending =
    integrations.checkoutEnabled && !integrationStatus.stripeConfigured
  const legalConfigurationPending =
    integrations.checkoutEnabled && !integrationStatus.legalReady
  const legalBlockMessage = integrationStatus.legalBlockMessage
  const [checkoutError, setCheckoutError] = useState('')
  const [termsError, setTermsError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [terms, setTerms] = useState<TermsState>(initialTermsState)
  const hasTrackedTermsAccepted = useRef(false)
  const allTermsAccepted = Object.values(terms).every(Boolean)

  useEffect(() => {
    trackCheckoutIntentView({
      planKey: selectedPlan ?? undefined,
      planName: selectedPlan ? planLabels[selectedPlan] : undefined,
    })
  }, [selectedPlan])

  useEffect(() => {
    if (!selectedPlan || checkoutConfigured) return

    trackCheckoutConfigError({
      message: legalConfigurationPending
        ? legalBlockMessage
        : 'La contratación online no está configurada todavía.',
      planKey: selectedPlan,
      planName: planLabels[selectedPlan],
    })
  }, [checkoutConfigured, legalBlockMessage, legalConfigurationPending, selectedPlan])

  useEffect(() => {
    if (!allTermsAccepted || !selectedPlan || hasTrackedTermsAccepted.current) {
      return
    }

    hasTrackedTermsAccepted.current = true
    trackCheckoutTermsAccepted({
      planKey: selectedPlan,
      planName: planLabels[selectedPlan],
    })
  }, [allTermsAccepted, selectedPlan])

  const handleTermChange = (key: keyof TermsState, checked: boolean) => {
    setTerms((currentTerms) => ({
      ...currentTerms,
      [key]: checked,
    }))
    setTermsError('')
  }

  const handleStartCheckout = async () => {
    if (!selectedPlan) return

    if (legalConfigurationPending) {
      setTermsError(legalBlockMessage)
      return
    }

    if (!allTermsAccepted) {
      setTermsError(
        'Debes aceptar las condiciones antes de continuar con el pago.',
      )
      return
    }

    setCheckoutError('')
    setIsLoading(true)
    trackPlanClick(planLabels[selectedPlan])

    try {
      await startCheckout(selectedPlan)
    } catch (error) {
      setCheckoutError(
        error instanceof Error
          ? error.message
          : 'No se pudo iniciar el checkout. Inténtalo de nuevo.',
      )
      setIsLoading(false)
    }
  }

  return (
    <>
      <SEOHead
        canonicalPath="/contratar"
        description="Confirma tu plan de nutrición veterinaria antes de iniciar el pago seguro con Stripe."
        noindex
        title="Contratar servicio de nutrición | VetKathia"
      />

      <Section className="pb-10 pt-10 sm:pt-14 lg:pt-18">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge tone="soft">Contratación online</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-vetkathia-text sm:text-5xl lg:text-6xl">
              Confirma tu plan antes del pago
            </h1>
            <p className="mt-6 text-lg leading-8 text-vetkathia-muted">
              Revisa qué incluye el servicio, acepta las condiciones y continúa
              al pago seguro con Stripe.
            </p>
          </div>

          {!selectedPlan || !selectedPlanDetails ? (
            <InvalidPlanState />
          ) : (
            <div className="mt-9 grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:items-start">
              <div className="grid gap-5">
                <Card className="border-vetkathia-border/80 bg-white/94 shadow-soft">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-vetkathia-primary-dark">
                        Plan elegido
                      </p>
                      <h2 className="mt-2 font-sans text-3xl font-semibold leading-tight text-vetkathia-text">
                        {selectedPlanDetails.name}
                      </h2>
                      <p className="mt-3 leading-7 text-vetkathia-muted">
                        {selectedPlanDetails.description}
                      </p>
                    </div>
                    <p className="font-sans text-5xl font-semibold leading-none text-vetkathia-primary-dark">
                      {selectedPlanDetails.price}
                    </p>
                  </div>

                  <div className="mt-6 rounded-3xl border border-vetkathia-border bg-vetkathia-surface/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-vetkathia-primary-dark">
                      Para quién es
                    </p>
                    <p className="mt-2 leading-7 text-vetkathia-muted">
                      {selectedPlanDetails.bestFor}
                    </p>
                  </div>

                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <div>
                      <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-vetkathia-text">
                        Qué incluye
                      </h3>
                      <ul className="mt-4 grid gap-3">
                        {selectedPlanDetails.includes.map((item) => (
                          <li className="flex gap-3" key={item}>
                            <CheckCircle2
                              className="mt-0.5 h-5 w-5 shrink-0 text-vetkathia-primary"
                              aria-hidden="true"
                            />
                            <span className="leading-6 text-vetkathia-muted">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-vetkathia-text">
                        Qué no incluye
                      </h3>
                      {selectedPlanDetails.notIncludes ? (
                        <ul className="mt-4 grid gap-3">
                          {selectedPlanDetails.notIncludes.map((item) => (
                            <li className="flex gap-3" key={item}>
                              <span
                                className="mt-2 h-2 w-2 shrink-0 rounded-full bg-vetkathia-border"
                                aria-hidden="true"
                              />
                              <span className="leading-6 text-vetkathia-muted">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-4 leading-7 text-vetkathia-muted">
                          No se detallan exclusiones adicionales para este plan.
                        </p>
                      )}
                    </div>
                  </div>
                </Card>

                <Card className="border-vetkathia-border/80 bg-white/90 shadow-card">
                  <h2 className="font-sans text-2xl font-semibold leading-tight text-vetkathia-text">
                    Qué pasa después del pago
                  </h2>
                  <ol className="mt-5 grid gap-3 sm:grid-cols-2">
                    {checkoutFlow.map(({ Icon, label }, index) => (
                      <li
                        className="flex gap-3 rounded-2xl border border-vetkathia-border bg-vetkathia-background/70 px-4 py-3"
                        key={label}
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-vetkathia-primary-dark ring-1 ring-vetkathia-border">
                          {index + 1}
                        </span>
                        <div>
                          <Icon
                            className="mb-1 h-4 w-4 text-vetkathia-primary"
                            aria-hidden="true"
                          />
                          <p className="text-sm font-semibold leading-6 text-vetkathia-text">
                            {label}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </Card>

                <Card className="border-vetkathia-primary/30 bg-vetkathia-surface/80 shadow-none">
                  <div className="flex gap-3">
                    <AlertTriangle
                      className="mt-1 h-5 w-5 shrink-0 text-vetkathia-primary-dark"
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-6 text-vetkathia-text">
                      Este servicio no sustituye urgencias veterinarias,
                      diagnóstico clínico presencial ni seguimiento del
                      veterinario habitual en casos complejos. Si tu perro o
                      gato presenta síntomas graves, contacta con un servicio
                      veterinario de urgencias.
                    </p>
                  </div>
                </Card>
              </div>

              <aside className="grid gap-5">
                <Card className="border-vetkathia-primary/35 bg-white/94 shadow-soft" tone="highlight">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-vetkathia-border bg-vetkathia-surface text-vetkathia-primary-dark">
                    <FileText className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 font-sans text-2xl font-semibold leading-tight text-vetkathia-text">
                    Condiciones antes de continuar
                  </h2>
                  <p className="mt-3 leading-7 text-vetkathia-muted">
                    El checkout se abrirá en Stripe. No se introducen datos de
                    tarjeta dentro de VetKathia.
                  </p>

                  <div className="mt-5 grid gap-3">
                    <Checkbox
                      checked={terms.serviceTerms}
                      label={
                        <>
                          Acepto las{' '}
                          <Link
                            className="font-semibold text-vetkathia-primary-dark underline-offset-4 hover:underline"
                            to="/condiciones"
                          >
                            condiciones del servicio
                          </Link>
                          .
                        </>
                      }
                      onChange={(event) =>
                        handleTermChange('serviceTerms', event.target.checked)
                      }
                      required
                    />
                    <Checkbox
                      checked={terms.privacy}
                      label={
                        <>
                          Acepto la{' '}
                          <Link
                            className="font-semibold text-vetkathia-primary-dark underline-offset-4 hover:underline"
                            to="/privacidad"
                          >
                            política de privacidad
                          </Link>
                          .
                        </>
                      }
                      onChange={(event) =>
                        handleTermChange('privacy', event.target.checked)
                      }
                      required
                    />
                    <Checkbox
                      checked={terms.urgency}
                      label={
                        <>
                          Entiendo el{' '}
                          <Link
                            className="font-semibold text-vetkathia-primary-dark underline-offset-4 hover:underline"
                            to="/condiciones#no-urgencias-veterinarias"
                          >
                            aviso de urgencias
                          </Link>{' '}
                          y que este servicio no sustituye urgencias
                          veterinarias.
                        </>
                      }
                      onChange={(event) =>
                        handleTermChange('urgency', event.target.checked)
                      }
                      required
                    />
                    <Checkbox
                      checked={terms.clinicalReview}
                      label="Entiendo que, si el caso requiere atención clínica previa, VetKathia podrá indicarlo antes de ajustar la alimentación."
                      onChange={(event) =>
                        handleTermChange(
                          'clinicalReview',
                          event.target.checked,
                        )
                      }
                      required
                    />
                  </div>

                  {termsError ? (
                    <p className="mt-4 rounded-2xl border border-vetkathia-primary/30 bg-vetkathia-surface px-4 py-3 text-sm font-semibold leading-6 text-vetkathia-primary-dark">
                      {termsError}
                    </p>
                  ) : null}

                  {stripeConfigurationPending || !integrations.checkoutEnabled ? (
                    <p className="mt-4 rounded-2xl border border-vetkathia-primary/30 bg-vetkathia-surface px-4 py-3 text-sm font-semibold leading-6 text-vetkathia-primary-dark">
                      La contratación online no está configurada todavía.
                    </p>
                  ) : null}

                  {legalConfigurationPending ? (
                    <p className="mt-4 rounded-2xl border border-vetkathia-primary/30 bg-vetkathia-surface px-4 py-3 text-sm font-semibold leading-6 text-vetkathia-primary-dark">
                      {legalBlockMessage}
                    </p>
                  ) : null}

                  {checkoutError ? (
                    <p className="mt-4 rounded-2xl border border-vetkathia-primary/30 bg-vetkathia-surface px-4 py-3 text-sm font-semibold leading-6 text-vetkathia-primary-dark">
                      {checkoutError}
                    </p>
                  ) : null}

                  <Button
                    className="mt-6"
                    disabled={!checkoutConfigured || isLoading}
                    fullWidth
                    isLoading={isLoading}
                    leftIcon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />}
                    onClick={handleStartCheckout}
                    size="lg"
                  >
                    Pagar con Stripe y continuar
                  </Button>
                  <Button
                    className="mt-3"
                    fullWidth
                    onClick={() => trackCTAClick('Cambiar plan', 'contratar')}
                    to="/planes"
                    variant="outline"
                  >
                    Cambiar plan
                  </Button>
                </Card>
              </aside>
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}

function InvalidPlanState() {
  return (
    <Card className="mx-auto mt-9 max-w-3xl text-center shadow-soft" tone="highlight">
      <Badge tone="soft">Primero elige un plan</Badge>
      <h2 className="mx-auto mt-5 max-w-2xl font-sans text-3xl font-black leading-tight text-vetkathia-text sm:text-4xl">
        No hay un plan válido seleccionado
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-vetkathia-muted sm:text-lg sm:leading-8">
        Elige uno de los servicios para revisar precio, condiciones y siguientes
        pasos antes del pago.
      </p>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        {plans.map((plan) => {
          const planKey = getPlanKeyFromName(plan.name)

          return (
            <Button
              key={plan.name}
              onClick={() => trackCTAClick(plan.cta, 'contratar sin plan')}
              size="sm"
              to={`/contratar?plan=${planKey}`}
              variant={plan.isRecommended ? 'primary' : 'outline'}
            >
              {plan.price} · {planCtaLabels[planKey]}
            </Button>
          )
        })}
      </div>
      <Button
        className="mt-4"
        onClick={() => trackCTAClick('Volver a planes', 'contratar sin plan')}
        to="/planes"
        variant="ghost"
      >
        Ver todos los planes
      </Button>
    </Card>
  )
}
