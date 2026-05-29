import {
  CheckCircle2,
  ClipboardList,
  FileText,
  HeartPulse,
  MessageCircle,
  RefreshCw,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

import { homePlans } from '../../data/home'
import { trackCTAClick, trackPlanClick } from '../../lib/analytics'
import { getIntegrationStatus } from '../../lib/integrations'
import {
  getPlanKeyFromName,
  isCheckoutConfigured,
  type PlanKey,
} from '../../lib/planCheckout'
import { Badge, Button, Container, Section, SectionHeading } from '../ui'

type PlanVisualKind = 'review' | 'plan' | 'followup'

type PlanVisualConfig = {
  accent: string
  Icon: LucideIcon
  kind: PlanVisualKind
  SecondaryIcon: LucideIcon
}

const usefulForAreas = [
  'gatos',
  'seniors',
  'digestión sensible',
  'transición segura',
  'dudas sobre cantidades',
]

const planStartSteps = [
  'Elige el plan',
  'Paga o reserva',
  'Completa el cuestionario',
  'Recibe valoración, pauta o seguimiento',
]

const homePlanCtaLabels: Record<PlanKey, string> = {
  accompaniment: 'Contratar acompañamiento',
  personalized: 'Contratar plan personalizado',
  valuation: 'Reservar valoración',
}

const planDecisionCopy = {
  accompaniment: {
    idealIf: 'Quieres aplicar cambios con revisión posterior y ajustes.',
    visibleIncludes: [
      'Todo lo anterior',
      'Revisión posterior',
      'Ajustes del plan',
    ],
  },
  personalized: {
    idealIf: 'Quieres una pauta completa con cantidades y transición.',
    visibleIncludes: [
      'Plan individual',
      'Cantidades y pautas',
      'Guía de transición',
    ],
  },
  valuation: {
    idealIf:
      'Quieres una primera orientación profesional antes de cambiar la alimentación.',
    visibleIncludes: [
      'Cuestionario nutricional',
      'Revisión del caso',
      'Orientación profesional',
    ],
  },
} satisfies Record<
  PlanKey,
  {
    idealIf: string
    visibleIncludes: string[]
  }
>

const visualConfigs: PlanVisualConfig[] = [
  {
    accent: 'bg-vetkathia-accent/18',
    Icon: ClipboardList,
    kind: 'review',
    SecondaryIcon: FileText,
  },
  {
    accent: 'bg-vetkathia-primary/16',
    Icon: Sparkles,
    kind: 'plan',
    SecondaryIcon: CheckCircle2,
  },
  {
    accent: 'bg-vetkathia-surface',
    Icon: RefreshCw,
    kind: 'followup',
    SecondaryIcon: MessageCircle,
  },
]

const cardVariants: Variants = {
  hover: {
    boxShadow: '0 22px 60px rgba(59,39,36,0.095)',
    scale: 1.012,
    y: -4,
  },
  rest: {
    boxShadow: '0 14px 34px rgba(59,39,36,0.06)',
    scale: 1,
    y: 0,
  },
}

const visualVariants: Variants = {
  hover: {
    rotate: -3,
    scale: 1.06,
  },
  rest: {
    rotate: 0,
    scale: 1,
  },
}

export function PricingSection() {
  const reduceMotion = useReducedMotion()
  const checkoutConfigured = isCheckoutConfigured()
  const integrationStatus = getIntegrationStatus()
  const calendlyConfiguredForAllPlans = Object.values(
    integrationStatus.calendlyConfiguredByPlan,
  ).every(Boolean)
  const funnelMicrocopy =
    checkoutConfigured && calendlyConfiguredForAllPlans
      ? 'Pago seguro con Stripe · Reserva online con Calendly'
      : 'Pago/reserva antes de iniciar · Cuestionario posterior · Revisión manual del caso'

  return (
    <Section
      id="planes"
      className="overflow-hidden"
      data-hide-mobile-sticky
      spacing="compact"
      tone="surface"
    >
      <Container size="xl">
        <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <SectionHeading
            className="max-w-4xl"
            eyebrow="Planes"
            size="md"
            title="Planes de nutrición natural veterinaria"
            variant="landing"
          >
            <p>
              Elige el plan que encaja mejor. Después completarás el
              cuestionario inicial para revisar el caso con contexto.
            </p>
            <p className="mt-3 text-sm font-bold leading-6 text-vetkathia-primary-dark">
              {funnelMicrocopy}
            </p>
            <p className="mt-2 text-sm font-medium leading-6 text-vetkathia-muted">
              <span className="font-bold text-vetkathia-text">
                Especial foco:
              </span>{' '}
              {usefulForAreas.join(' · ')}
            </p>
          </SectionHeading>
          <div className="hidden lg:block">
            <Button
              className="border-vetkathia-primary/30 text-vetkathia-primary-dark hover:bg-white/82 lg:w-auto"
              onClick={() =>
                trackCTAClick('Comparar planes', 'home planes')
              }
              size="sm"
              to="/planes"
              variant="outline"
            >
              Comparar planes
            </Button>
          </div>
        </div>

        <div className="relative mt-7 grid items-stretch gap-4 sm:mt-8 lg:mt-9 lg:grid-cols-3 lg:gap-5">
          {homePlans.map((plan, index) => {
            const visual = visualConfigs[index] ?? visualConfigs[0]
            const planKey = getPlanKeyFromName(plan.name)
            const decisionCopy = planDecisionCopy[planKey]
            const additionalPlanDetails = plan.includes.filter(
              (item) => !decisionCopy.visibleIncludes.includes(item),
            )

            return (
              <motion.article
                animate="rest"
                className={`group relative flex h-full flex-col overflow-hidden rounded-[1.45rem] border bg-white/92 ring-1 ring-white/75 lg:min-h-[31rem] ${
                  plan.isRecommended
                    ? 'border-vetkathia-primary/45 shadow-soft ring-vetkathia-primary/10'
                    : 'border-vetkathia-border/58 shadow-card'
                }`}
                data-plan-card
                initial="rest"
                key={plan.name}
                transition={{ damping: 24, stiffness: 260, type: 'spring' }}
                variants={reduceMotion ? undefined : cardVariants}
                whileHover={reduceMotion ? undefined : 'hover'}
              >
                <div
                  className={`h-1 ${
                    plan.isRecommended
                      ? 'bg-vetkathia-primary'
                      : 'bg-vetkathia-border/40'
                  }`}
                  aria-hidden="true"
                />

                <div className="flex h-full flex-col p-4 sm:p-5 lg:p-5 xl:p-6">
                  <div className="grid grid-cols-[1fr_auto] gap-4 lg:min-h-[4.25rem]">
                    <div className="min-w-0">
                      <div className="flex min-h-8 flex-wrap items-center gap-2">
                        <span className="inline-flex rounded-full bg-vetkathia-surface/72 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-vetkathia-primary-dark ring-1 ring-vetkathia-border/40">
                          {plan.label}
                        </span>
                        {plan.isRecommended ? (
                          <Badge
                            className="shrink-0 border-vetkathia-primary/35 bg-vetkathia-primary/10 text-vetkathia-primary-dark shadow-none"
                            tone="soft"
                          >
                            Más recomendado
                          </Badge>
                        ) : null}
                      </div>
                    </div>
                    <PlanVisual
                      config={visual}
                      isRecommended={Boolean(plan.isRecommended)}
                      reduceMotion={Boolean(reduceMotion)}
                    />
                  </div>

                  <div className="mt-3 sm:mt-4 lg:min-h-[6.5rem]">
                    <h3 className="font-sans text-xl font-black leading-tight text-vetkathia-text sm:text-[1.4rem]">
                      {plan.name}
                    </h3>
                    <div className="mt-2.5 flex items-end gap-2">
                      <p className="font-sans text-[2.55rem] font-semibold leading-[0.9] tracking-normal text-vetkathia-primary-dark sm:text-[2.85rem]">
                        {plan.price.replace(' €', '')}
                      </p>
                      <span className="pb-1.5 text-lg font-semibold text-vetkathia-primary-dark">
                        €
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 border-t border-vetkathia-border/24 pt-4 lg:min-h-[6.2rem]">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-vetkathia-primary-dark">
                      Ideal si...
                    </p>
                    <p className="mt-2 text-sm leading-6 text-vetkathia-muted">
                      {decisionCopy.idealIf}
                    </p>
                  </div>

                  <div className="mt-4 lg:min-h-[6.4rem]">
                    <p className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.12em] text-vetkathia-text">
                      Qué recibes
                    </p>
                    <ul className="mt-3 grid gap-2.5">
                      {decisionCopy.visibleIncludes.map((item) => (
                        <li className="flex gap-3" key={item}>
                          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-vetkathia-surface/72 text-vetkathia-primary-dark ring-1 ring-vetkathia-border/40">
                            <CheckCircle2
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                          </span>
                          <span className="text-sm leading-6 text-vetkathia-muted">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <details className="mt-3 text-sm text-vetkathia-muted">
                    <summary className="cursor-pointer list-none text-sm font-semibold text-vetkathia-primary-dark underline decoration-vetkathia-border/70 underline-offset-4 transition-colors duration-200 hover:text-vetkathia-primary">
                      Ver detalles
                    </summary>
                    <div className="mt-3 grid gap-2 border-t border-vetkathia-border/24 pt-3">
                      <p className="leading-6">{plan.description}</p>
                      {additionalPlanDetails.map((item) => (
                        <p className="flex gap-2 leading-6" key={item}>
                          <CheckCircle2
                            className="mt-1 h-4 w-4 shrink-0 text-vetkathia-primary-dark"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </p>
                      ))}
                    </div>
                  </details>

                  <div className="mt-auto pt-5">
                    {import.meta.env.DEV && !checkoutConfigured ? (
                      <p className="mb-3 rounded-2xl border border-vetkathia-border bg-vetkathia-surface/70 px-3 py-2 text-sm font-semibold leading-5 text-vetkathia-primary-dark">
                        La contratación online no está configurada todavía.
                      </p>
                    ) : null}
                    <Button
                      className={`min-h-12 whitespace-normal px-4 text-center text-sm leading-5 sm:text-[0.95rem] ${
                        plan.isRecommended
                          ? ''
                          : 'border-vetkathia-primary/40 text-vetkathia-primary-dark hover:bg-vetkathia-surface/80'
                      }`}
                      fullWidth
                      onClick={() => trackPlanClick(plan.name)}
                      to={`/contratar?plan=${planKey}`}
                      variant={plan.isRecommended ? 'primary' : 'outline'}
                    >
                      {homePlanCtaLabels[planKey]}
                    </Button>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        <div
          id="como-funciona"
          className="mt-5 scroll-mt-28 rounded-[1.35rem] border border-white/70 bg-white/70 px-4 py-4 shadow-[0_16px_42px_rgba(59,39,36,0.038)] ring-1 ring-vetkathia-border/16 backdrop-blur sm:mt-6 sm:px-5 lg:mt-7 lg:grid lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-7 lg:px-5 lg:py-4"
        >
          <div>
            <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-vetkathia-primary-dark">
              Después de elegir tu plan
            </p>
            <h3 className="mt-2 font-sans text-[1.35rem] font-black leading-tight text-vetkathia-text sm:text-2xl">
              Así empieza el servicio
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-vetkathia-muted">
              El pago o la reserva confirma el inicio del servicio. Después
              completas el cuestionario inicial para revisar el caso con
              contexto.
            </p>
            <p className="mt-2 max-w-2xl text-xs font-semibold leading-5 text-vetkathia-primary-dark/82">
              Servicio no urgente. No sustituye urgencias veterinarias ni
              seguimiento clínico habitual cuando el caso lo requiere.
            </p>
          </div>

          <ol className="mt-4 grid grid-cols-2 gap-2 lg:mt-0 lg:grid-cols-4 lg:gap-2.5">
            {planStartSteps.map((step, index) => (
              <li
                className="flex min-h-[4rem] items-center gap-2.5 rounded-2xl bg-[#FFFDFB]/74 px-2.5 py-2.5 ring-1 ring-vetkathia-border/18 lg:min-h-[5rem] lg:flex-col lg:items-start lg:justify-center"
                key={step}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-vetkathia-primary-dark shadow-[0_8px_18px_rgba(59,39,36,0.04)] ring-1 ring-vetkathia-border/38">
                  {index + 1}
                </span>
                <p className="text-xs font-semibold leading-5 text-vetkathia-text sm:text-sm">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}

function PlanVisual({
  config,
  isRecommended,
  reduceMotion,
}: {
  config: PlanVisualConfig
  isRecommended: boolean
  reduceMotion: boolean
}) {
  const { Icon, SecondaryIcon } = config

  return (
    <motion.div
      className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
      transition={{ damping: 18, stiffness: 260, type: 'spring' }}
      variants={reduceMotion ? undefined : visualVariants}
      aria-hidden="true"
    >
      <div
        className={`absolute inset-1 rounded-[2rem] ${config.accent} shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]`}
      />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_34%_26%,rgba(255,255,255,0.96),rgba(255,249,246,0.58)_48%,rgba(255,241,245,0.62))] ring-1 ring-vetkathia-border/34" />
      <div className="absolute left-1.5 top-2.5 h-9 w-8 rotate-[-8deg] rounded-[0.8rem] bg-white/86 shadow-[0_10px_20px_rgba(59,39,36,0.055)] ring-1 ring-vetkathia-border/28 sm:h-10 sm:w-9 lg:left-2.5 lg:top-3 lg:h-12 lg:w-10">
        <span className="absolute left-2 top-2 h-1.5 w-4 rounded-full bg-vetkathia-primary/24" />
        <span className="absolute left-2 top-5 h-1 w-5 rounded-full bg-vetkathia-muted/16" />
        <span className="absolute left-2 top-7 h-1 w-4 rounded-full bg-vetkathia-muted/14" />
      </div>
      <div
        className={`absolute right-1 top-1.5 flex h-8 w-8 items-center justify-center rounded-2xl bg-white text-vetkathia-primary-dark shadow-[0_12px_24px_rgba(59,39,36,0.07)] ring-1 ${
          isRecommended
            ? 'ring-vetkathia-primary/32'
            : 'ring-vetkathia-border/34'
        } sm:h-9 sm:w-9 lg:right-2 lg:top-2.5 lg:h-10 lg:w-10`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="absolute bottom-1.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-vetkathia-background text-vetkathia-primary-dark ring-1 ring-vetkathia-border/34 sm:h-7 sm:w-7 lg:bottom-2.5 lg:right-3">
        <SecondaryIcon className="h-3.5 w-3.5" />
      </div>
      {config.kind === 'followup' ? (
        <HeartPulse className="absolute bottom-2.5 left-2.5 h-4 w-4 text-vetkathia-primary/70" />
      ) : null}
    </motion.div>
  )
}
