import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  HelpCircle,
  MinusCircle,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react'
import { useEffect, useRef } from 'react'

import { plans, plansFaq } from '../data/plans'
import { useGsapReveal } from '../hooks/useGsapReveal'
import {
  trackCTAClick,
  trackFAQOpen,
  trackPlanClick,
  trackViewPlans,
} from '../lib/analytics'
import { cn } from '../lib/cn'
import {
  getPlanKeyFromName,
  isCheckoutConfigured,
  planCtaLabels,
} from '../lib/planCheckout'
import { createPlansStructuredData } from '../data/structuredData'
import { StructuredData } from '../components/common/StructuredData'
import {
  Accordion,
  Badge,
  Button,
  Card,
  Container,
  Section,
  SectionHeading,
} from '../components/ui'
import { SEOHead } from '../components/common/SEOHead'

const confidencePoints = [
  {
    description: 'La opción depende de especie, edad, salud, rutina y objetivo.',
    icon: Stethoscope,
    title: 'Criterio veterinario',
  },
  {
    description: 'El pago seguro con Stripe confirma el inicio del servicio.',
    icon: ShieldCheck,
    title: 'Pago seguro antes de iniciar',
  },
  {
    description: 'Después completas el cuestionario nutricional del plan elegido.',
    icon: ClipboardList,
    title: 'Cuestionario y cita',
  },
]

const comparisonRows = [
  {
    acomp: true,
    label: 'Consulta online',
    personal: true,
    valoracion: true,
  },
  {
    acomp: true,
    label: 'Revisión de alimentación actual',
    personal: true,
    valoracion: true,
  },
  {
    acomp: true,
    label: 'Plan nutricional individual',
    personal: true,
    valoracion: false,
  },
  {
    acomp: true,
    label: 'Cantidades y pautas',
    personal: true,
    valoracion: false,
  },
  {
    acomp: true,
    label: 'Guía de transición',
    personal: true,
    valoracion: false,
  },
  {
    acomp: true,
    label: 'Revisión posterior',
    personal: false,
    valoracion: false,
  },
  {
    acomp: true,
    label: 'Seguimiento ampliado',
    personal: false,
    valoracion: false,
  },
]

export function PlansPage() {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const planCardsRef = useRef<HTMLDivElement | null>(null)
  const checkoutConfigured = isCheckoutConfigured()

  useEffect(() => {
    trackViewPlans()
  }, [])

  useGsapReveal(heroRef, {
    delay: 0.04,
    duration: 0.55,
    rootMargin: '0px',
    stagger: 0.05,
    y: 12,
  })
  useGsapReveal(planCardsRef, { duration: 0.55, stagger: 0.05, y: 12 })

  return (
    <>
      <SEOHead
        canonicalPath="/planes"
        description="Contrata valoración nutricional, plan personalizado o acompañamiento online para mejorar la alimentación de tu perro o gato sin improvisar."
        title="Planes de nutrición natural para perros y gatos | VetKathia"
      />
      <StructuredData
        data={createPlansStructuredData(
          plansFaq.map((item) => ({
            answer: item.content,
            question: item.title,
          })),
        )}
      />

      <Section className="pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pb-10 lg:pt-18">
        <Container>
          <div className="mx-auto max-w-3xl text-center" ref={heroRef}>
            <Badge tone="soft">Planes VetKathia</Badge>
            <h1
              className="mt-5 text-4xl font-semibold leading-tight text-vetkathia-text sm:text-5xl lg:text-6xl"
              data-reveal
            >
              Planes de nutrición natural veterinaria para perros y gatos
            </h1>
            <p className="mt-6 text-lg leading-8 text-vetkathia-muted" data-reveal>
              Elige el nivel de ayuda que necesitas y contrata online. Después
              completarás el cuestionario y podrás reservar tu cita.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-vetkathia-muted" data-reveal>
              Pago seguro con Stripe. Reserva tu cita online. Servicio
              veterinario no urgente. No promete curar enfermedades ni
              sustituye urgencias veterinarias.
            </p>
            <Button
              className="mt-7"
              onClick={() =>
                trackCTAClick('Ir a planes', 'planes hero')
              }
              href="#planes"
              variant="outline"
            >
              Ir a planes
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="py-6 sm:py-8" tone="white">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {confidencePoints.map((point) => {
              const Icon = point.icon

              return (
                <Card
                  className="border-vetkathia-border/80 bg-white/82 shadow-none ring-1 ring-vetkathia-border/35"
                  key={point.title}
                >
                  <Icon
                    className="h-6 w-6 text-vetkathia-primary"
                    aria-hidden="true"
                  />
                  <h2 className="mt-4 font-sans text-xl font-semibold leading-tight text-vetkathia-text">
                    {point.title}
                  </h2>
                  <p className="mt-2 leading-7 text-vetkathia-muted">
                    {point.description}
                  </p>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      <Section className="pt-8 sm:pt-10 lg:pt-12" id="planes">
        <Container>
          <Card className="mb-8 grid gap-4 border-vetkathia-border/80 bg-white/86 shadow-card sm:grid-cols-[auto_1fr_auto] sm:items-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-vetkathia-surface text-vetkathia-primary-dark ring-1 ring-vetkathia-border">
              <HelpCircle className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
	              <h2 className="font-sans text-xl font-semibold leading-tight text-vetkathia-text">
	                Si tienes dudas, empieza por valoración.
	              </h2>
	              <p className="mt-2 leading-7 text-vetkathia-muted">
	                La Valoración Nutricional es el punto de entrada más sencillo
	                cuando necesitas orientación inicial antes de una pauta
	                completa.
	              </p>
            </div>
            <Button
              disabled={!checkoutConfigured}
	              onClick={() =>
	                trackPlanClick('Valoración Nutricional')
	              }
              to="/contratar?plan=valuation"
	              variant="outline"
	            >
	              {checkoutConfigured
                  ? 'Contratar valoración nutricional'
                  : 'No configurado'}
	            </Button>
          </Card>

          <div
            className="grid gap-5 lg:grid-cols-3 lg:items-stretch"
            ref={planCardsRef}
          >
            {plans.map((plan) => (
              <Card
                className={cn(
                  'flex h-full flex-col',
                  plan.isRecommended &&
                    'relative border-vetkathia-primary/60 bg-white shadow-soft ring-1 ring-vetkathia-primary/15',
                )}
                data-plan-card
                data-reveal
                interactive
                key={plan.name}
                tone={plan.isRecommended ? 'highlight' : 'default'}
              >
                {plan.isRecommended ? (
                  <Badge className="mb-4 w-fit" tone="soft">
                    Más recomendado
                  </Badge>
                ) : null}

                <div>
                  <h2 className="font-sans text-2xl font-semibold leading-tight text-vetkathia-text sm:text-[1.7rem]">
                    {plan.name}
                  </h2>
                  <p className="mt-4 font-sans text-[2.9rem] font-semibold leading-none tracking-normal text-vetkathia-primary-dark sm:text-[3.3rem]">
                    {plan.price}
                  </p>
                  <p className="mt-4 min-h-14 leading-7 text-vetkathia-muted">
                    {plan.description}
                  </p>
                  <div className="mt-5 rounded-3xl border border-vetkathia-border bg-vetkathia-surface/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-vetkathia-primary-dark">
                      Te encaja si…
                    </p>
                    <p className="mt-2 text-sm leading-6 text-vetkathia-muted">
                      {plan.bestFor}
                    </p>
                  </div>
                </div>

                <div className="mt-7">
                  <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-vetkathia-text">
                    Qué recibes
                  </h3>
                  <ul className="mt-4 grid gap-3">
                    {plan.includes.map((item) => (
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

	                <div className="mt-7 rounded-2xl border border-vetkathia-border bg-white/76 px-4 py-3 text-sm font-semibold leading-6 text-vetkathia-primary-dark">
	                  Pago seguro con Stripe · Cuestionario nutricional · Reserva
                    tu cita online
	                </div>

                {plan.notIncludes ? (
                  <div className="mt-7 rounded-3xl bg-vetkathia-surface p-5">
                    <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-vetkathia-text">
                      No incluye
                    </h3>
                    <ul className="mt-4 grid gap-3">
                      {plan.notIncludes.map((item) => (
                        <li className="flex gap-3" key={item}>
                          <MinusCircle
                            className="mt-0.5 h-5 w-5 shrink-0 text-vetkathia-muted"
                            aria-hidden="true"
                          />
                          <span className="leading-6 text-vetkathia-muted">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {!checkoutConfigured ? (
                    <p className="mt-5 rounded-2xl border border-vetkathia-border bg-vetkathia-surface/70 px-4 py-3 text-sm font-semibold leading-6 text-vetkathia-primary-dark">
                      La contratación online no está configurada todavía.
                    </p>
                ) : null}

                <Button
                  className="mt-auto pt-3"
                  disabled={!checkoutConfigured}
	                  fullWidth
                  onClick={() => trackPlanClick(plan.name)}
	                  rightIcon={<ArrowRight className="h-5 w-5" aria-hidden="true" />}
                  to={`/contratar?plan=${getPlanKeyFromName(plan.name)}`}
	                  variant={plan.isRecommended ? 'primary' : 'outline'}
	                >
	                  {checkoutConfigured
                    ? planCtaLabels[getPlanKeyFromName(plan.name)]
                    : 'No configurado'}
	                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-8 sm:pt-10" tone="white">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Comparativa"
            title="Compara lo esencial antes de elegir"
          >
            <p>
	              La valoración orienta el punto de partida. Los planes completos
	              añaden pauta, cantidades y, si lo necesitas, seguimiento.
            </p>
          </SectionHeading>

          <div className="mt-8 grid gap-4 md:hidden">
            {plans.map((plan, planIndex) => (
              <Card
                className="border-vetkathia-border/80 bg-white/90 shadow-card"
                key={plan.name}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-sans text-lg font-semibold leading-tight text-vetkathia-text">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-vetkathia-primary-dark">
                      {plan.price}
                    </p>
                  </div>
                  {plan.isRecommended ? (
                    <Badge className="shrink-0" tone="soft">
                      Recomendado
                    </Badge>
                  ) : null}
                </div>
                <div className="mt-5 grid gap-3">
                  {comparisonRows.map((row) => {
                    const enabled =
                      planIndex === 0
                        ? row.valoracion
                        : planIndex === 1
                          ? row.personal
                          : row.acomp

                    return (
                      <div
                        className="flex items-center justify-between gap-3 rounded-2xl border border-vetkathia-border bg-vetkathia-background/72 px-3 py-2"
                        key={row.label}
                      >
                        <span className="text-sm font-medium leading-5 text-vetkathia-muted">
                          {row.label}
                        </span>
                        <span
                          className={cn(
                            'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
                            enabled
                              ? 'bg-vetkathia-surface text-vetkathia-primary-dark'
                              : 'bg-white text-vetkathia-muted',
                          )}
                        >
                          {enabled ? (
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                          ) : (
                            <MinusCircle className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                          {enabled ? 'Sí' : 'No'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-10 hidden overflow-hidden border-vetkathia-border/80 bg-white/92 p-0 shadow-soft md:block">
            <div className="overflow-x-auto">
              <table className="min-w-[720px] w-full border-collapse text-left">
                <caption className="sr-only">
                  Comparativa de planes de nutrición VetKathia
                </caption>
                <thead>
                  <tr className="border-b border-vetkathia-border bg-vetkathia-surface/70">
                    <th
                      className="px-5 py-4 font-sans text-sm font-semibold uppercase tracking-[0.12em] text-vetkathia-muted"
                      scope="col"
                    >
                      Incluye
                    </th>
                    <th
                      className="px-5 py-4 font-sans text-sm font-semibold text-vetkathia-text"
                      scope="col"
                    >
                      Valoración
                    </th>
                    <th
                      className="px-5 py-4 font-sans text-sm font-semibold text-vetkathia-primary-dark"
                      scope="col"
                    >
                      Plan personalizado
                    </th>
                    <th
                      className="px-5 py-4 font-sans text-sm font-semibold text-vetkathia-text"
                      scope="col"
                    >
                      Acompañamiento
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr
                      className="border-b border-vetkathia-border/70 last:border-b-0"
                      key={row.label}
                    >
                      <th
                        className="px-5 py-4 font-sans text-sm font-semibold text-vetkathia-text"
                        scope="row"
                      >
                        {row.label}
                      </th>
                      <ComparisonCell enabled={row.valoracion} />
                      <ComparisonCell enabled={row.personal} />
                      <ComparisonCell enabled={row.acomp} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <Card className="grid gap-8 overflow-hidden bg-white/94 shadow-soft lg:grid-cols-[0.75fr_1.25fr] lg:items-center" tone="highlight">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-vetkathia-surface text-vetkathia-primary">
              <HelpCircle className="h-8 w-8" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-4xl font-semibold leading-tight text-vetkathia-text sm:text-5xl">
                ¿No sabes cuál elegir?
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-vetkathia-muted">
	                Si necesitas orientación inicial, empieza por la Valoración
	                Nutricional. Después completarás el cuestionario nutricional
                  y podrás reservar tu cita online.
	              </p>
	              <Button
                  disabled={!checkoutConfigured}
	                className="mt-7"
	                onClick={() =>
	                  trackPlanClick('Valoración Nutricional')
	                }
	                size="lg"
                  to="/contratar?plan=valuation"
	              >
	                {checkoutConfigured
                    ? 'Contratar valoración nutricional'
                    : 'No configurado'}
	              </Button>
            </div>
          </Card>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            align="center"
            eyebrow="FAQ"
            title="Preguntas frecuentes sobre los planes"
          />
          <Accordion
            className="mx-auto mt-10 max-w-4xl"
            defaultOpenFirst
            items={plansFaq}
            onItemOpen={(item) => trackFAQOpen(item.title)}
          />
        </Container>
      </Section>
    </>
  )
}

function ComparisonCell({ enabled }: { enabled: boolean }) {
  return (
    <td className="px-5 py-4">
      {enabled ? (
        <span className="inline-flex items-center gap-2 rounded-full bg-vetkathia-surface px-3 py-1.5 text-sm font-semibold text-vetkathia-primary-dark">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          Sí
        </span>
      ) : (
        <span className="inline-flex items-center gap-2 rounded-full bg-vetkathia-background px-3 py-1.5 text-sm font-semibold text-vetkathia-muted">
          <MinusCircle className="h-4 w-4" aria-hidden="true" />
          No
        </span>
      )}
    </td>
  )
}
