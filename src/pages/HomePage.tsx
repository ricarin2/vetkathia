import {
  ArrowRight,
  ClipboardList,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react'
import { useRef, useState } from 'react'

import { aboutTrustPillars, kathiaProfile } from '../data/about'
import {
  homeFaq,
  nutritionOptions,
  trustBenefits,
} from '../data/home'
import {
  createFaqStructuredData,
  homeOfferCatalogStructuredData,
  kathiaPersonStructuredData,
  vetKathiaServiceStructuredData,
} from '../data/structuredData'
import { StructuredData } from '../components/common/StructuredData'
import { HeroPremium } from '../components/sections/HeroPremium'
import { PricingSection } from '../components/sections/PricingSection'
import { TestimonialsSection } from '../components/sections/TestimonialsSection'
import { useGsapReveal } from '../hooks/useGsapReveal'
import {
  trackCTAClick,
  trackFAQOpen,
} from '../lib/analytics'
import {
  Accordion,
  Button,
  Container,
  Section,
  SectionHeading,
} from '../components/ui'
import { SEOHead } from '../components/common/SEOHead'

function DietStrategyVisual() {
  return (
    <div
      className="relative mx-auto h-28 w-32 shrink-0 sm:h-32 sm:w-36 md:mx-0"
      aria-hidden="true"
    >
      <div className="absolute bottom-2 left-0 h-16 w-20 rounded-[1.35rem] bg-white/82 shadow-[0_14px_34px_rgba(59,39,36,0.07)] ring-1 ring-vetkathia-border/22">
        <div className="absolute left-4 top-5 h-7 w-10 rounded-b-full rounded-t-[1rem] border border-vetkathia-primary/20 bg-vetkathia-background shadow-[inset_0_-6px_0_rgba(232,62,115,0.08)]" />
        <div className="absolute left-8 top-4 h-2 w-2 rounded-full bg-vetkathia-accent/38" />
        <div className="absolute left-11 top-6 h-1.5 w-1.5 rounded-full bg-vetkathia-primary/28" />
      </div>

      <div className="absolute right-0 top-0 h-24 w-20 rounded-[1.1rem] bg-white/90 p-3 shadow-[0_16px_36px_rgba(59,39,36,0.08)] ring-1 ring-vetkathia-border/22">
        <div className="mb-3 h-2 w-10 rounded-full bg-vetkathia-primary/24" />
        <div className="space-y-2">
          {[0, 1, 2].map((item) => (
            <div className="flex items-center gap-2" key={item}>
              <span className="h-1.5 w-1.5 rounded-full bg-vetkathia-primary/55" />
              <span className="h-1.5 flex-1 rounded-full bg-vetkathia-muted/18" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-1 right-5 h-8 w-4 rotate-[-18deg] rounded-full bg-vetkathia-accent/18" />
      <div className="absolute bottom-5 right-2 h-7 w-3 rotate-[28deg] rounded-full bg-vetkathia-primary/12" />
    </div>
  )
}


function KathiaProfileVisual() {
  const [photoSrc, setPhotoSrc] = useState(kathiaProfile.kathiaPhotoSrc ?? '')

  if (photoSrc) {
    return (
      <img
        className="aspect-[4/5] max-h-[22rem] w-full rounded-[1.45rem] object-cover object-center shadow-[0_18px_46px_rgba(59,39,36,0.08)] ring-1 ring-vetkathia-border/28 lg:max-h-none"
        src={photoSrc}
        alt={kathiaProfile.kathiaPhotoAlt || 'Kathia, veterinaria de VetKathia'}
        onError={() => setPhotoSrc('')}
      />
    )
  }

  return (
    <div
      className="w-full rounded-[1.35rem] bg-[linear-gradient(145deg,rgba(255,253,251,0.96),rgba(255,241,245,0.72))] p-5 shadow-[0_18px_46px_rgba(59,39,36,0.055)] ring-1 ring-vetkathia-border/28"
      aria-hidden="true"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/84 text-vetkathia-primary-dark shadow-[0_12px_28px_rgba(59,39,36,0.055)] ring-1 ring-vetkathia-border/36">
          <Stethoscope className="h-6 w-6" />
        </div>
        <div>
          <p className="font-sans text-xl font-black leading-tight text-vetkathia-text">
            Kathia
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-vetkathia-muted">
            Veterinaria enfocada en nutrición natural para perros y gatos.
          </p>
        </div>
      </div>
    </div>
  )
}

const aboutBadges = ['Veterinaria', 'Nutrición natural', 'Perros y gatos']

const visibleHomeFaqIds = new Set([
  'solo-barf',
  'gatos',
  'online',
  'cantidades',
  'veterinario',
  'no-se-plan',
  'pago-web',
])

const visibleHomeFaqBase = homeFaq.filter((item) => visibleHomeFaqIds.has(item.id))

const homeAboutPillarTitles = new Set([
  'Enfoque veterinario',
  'Sin radicalismos',
  'Límites del servicio',
])

const homeAboutPillars = aboutTrustPillars.filter((pillar) =>
  homeAboutPillarTitles.has(pillar.title),
)

function getHomeAboutPillarTitle(title: string) {
  return title === 'Límites del servicio' ? 'Límites claros' : title
}

export function HomePage() {
  const trustRef = useRef<HTMLDivElement | null>(null)

  useGsapReveal(trustRef, { duration: 0.55, stagger: 0.05, y: 12 })

  const visibleHomeFaq = visibleHomeFaqBase

  return (
    <>
      <SEOHead
        canonicalPath="/"
        description="Valoración nutricional online y planes personalizados para perros y gatos. Dieta cocinada, BARF o transición segura con criterio veterinario."
        title="Nutrición natural veterinaria para perros y gatos | VetKathia"
      />
      <StructuredData
        data={[
          vetKathiaServiceStructuredData,
          kathiaPersonStructuredData,
          homeOfferCatalogStructuredData,
          createFaqStructuredData(
            visibleHomeFaq.map((item) => ({
              answer: item.content,
              question: item.title,
            })),
          ),
        ]}
      />

      <HeroPremium
        id="nutricion"
        onPrimaryCtaClick={() =>
          trackCTAClick('Elegir plan', 'home hero')
        }
        onSecondaryCtaClick={() =>
          trackCTAClick('Ver planes y precios', 'home hero')
        }
      />

      <Section
        className="overflow-hidden py-12 sm:py-16 lg:py-20"
        data-hide-mobile-sticky
        tone="surface"
      >
        <Container>
          <div
            className="relative mx-auto max-w-6xl"
            ref={trustRef}
          >
            <div
              className="absolute -left-10 top-12 h-36 w-36 rounded-full bg-white/55 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-vetkathia-primary/8 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <div
                className="max-w-xl"
                data-reveal
              >
                <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-vetkathia-primary-dark">
                  Antes de cambiar su alimentación
                </p>
                <h2 className="mt-3 font-sans text-[2.05rem] font-black leading-[1.03] text-vetkathia-text sm:text-5xl lg:text-[3.35rem]">
                  Primero seguridad.
                  <span className="block text-vetkathia-primary-dark">
                    Después la pauta.
                  </span>
                </h2>
                <p className="mt-5 max-w-lg text-base leading-7 text-vetkathia-muted sm:text-lg sm:leading-8">
                  La alimentación no se cambia por moda. Primero revisamos qué
                  come ahora, su edad, salud, digestión y rutina. Después
                  elegimos una estrategia aplicable para su caso.
                </p>
              </div>

              <div className="relative lg:pt-5">
                <div
                  className="absolute left-0 right-0 top-11 hidden h-px bg-vetkathia-primary/22 lg:block"
                  aria-hidden="true"
                />
                <ol className="grid gap-5 lg:grid-cols-3 lg:gap-6">
                  {trustBenefits.map((benefit, index) => {
                    const icons = [ClipboardList, Stethoscope, ShieldCheck]
                    const Icon = icons[index]

                    return (
                      <li
                        className="relative grid grid-cols-[auto_1fr] gap-4 lg:block"
                        data-reveal
                        key={benefit.title}
                      >
                        <div
                          className="absolute left-5 top-11 h-[calc(100%+1.25rem)] w-px bg-vetkathia-primary/20 lg:hidden"
                          aria-hidden="true"
                        />
                        <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-vetkathia-primary-dark shadow-[0_10px_24px_rgba(59,39,36,0.055)] ring-1 ring-vetkathia-border/35 lg:h-12 lg:w-12">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div className="pb-2 lg:mt-5 lg:pb-0">
                          <p className="text-xs font-extrabold tracking-[0.2em] text-vetkathia-primary-dark/70">
                            0{index + 1}
                          </p>
                          <h3 className="mt-2 font-sans text-lg font-black leading-tight text-vetkathia-text sm:text-xl">
                            {benefit.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-vetkathia-muted">
                            {benefit.description}
                          </p>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="no-es-solo-barf"
        className="overflow-hidden bg-[linear-gradient(180deg,#FFFDFB_0%,#FFF9F6_100%)]"
        data-hide-mobile-sticky
        spacing="compact"
        tone="cream"
      >
        <Container className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center xl:grid-cols-[minmax(0,1fr)_26rem]">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-vetkathia-primary-dark">
              Depende del caso
            </p>
            <h2 className="mt-3 font-sans text-[1.85rem] font-black leading-[1.06] text-vetkathia-text sm:text-4xl lg:text-[2.7rem]">
              No hay una única dieta correcta.
            </h2>
            <p className="mt-4 text-base leading-7 text-vetkathia-muted sm:text-lg sm:leading-8">
              Puede ser una mejora gradual, comida cocinada, mixta, BARF o
              natural comercial. La pauta adecuada no es la más popular: es la
              que encaja con su salud, su digestión y tu rutina.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {nutritionOptions.map((option) => (
                <span
                  className="inline-flex min-h-9 items-center rounded-full bg-white/84 px-3.5 py-2 text-sm font-bold leading-none text-vetkathia-text ring-1 ring-vetkathia-border/35"
                  key={option}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[1.7rem] bg-white/66 p-5 shadow-[0_18px_46px_rgba(59,39,36,0.045)] ring-1 ring-vetkathia-border/24 sm:p-6">
            <div className="flex gap-5 sm:items-center lg:items-start">
              <div className="hidden shrink-0 sm:block">
                <DietStrategyVisual />
              </div>
              <div>
                <p className="font-sans text-lg font-black leading-tight text-vetkathia-text sm:text-xl">
                  Primero se valora el caso. Después se elige la estrategia.
                </p>
                <p className="mt-4 text-sm font-semibold leading-6 text-vetkathia-muted">
                  Edad · salud · digestión · alimentación actual · rutina
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <PricingSection />

      <Section
        id="sobre-mi"
        className="overflow-hidden bg-[#FFFDFB]"
        spacing="compact"
        tone="white"
      >
        <Container>
          <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[minmax(15rem,0.62fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
            <div className="hidden w-full max-w-sm lg:order-1 lg:block">
              <KathiaProfileVisual />
            </div>

            <div className="order-1 min-w-0 lg:order-2">
              <SectionHeading
                className="max-w-3xl"
                eyebrow="Sobre Kathia"
                size="sm"
                title="Veterinaria, nutrición natural y criterio realista."
                variant="landing"
              >
                <p>
                  Soy Kathia, veterinaria enfocada en nutrición natural para
                  perros y gatos. Mi trabajo es ayudarte a decidir qué cambio
                  alimentario tiene sentido para su caso, sin recetas
                  universales, sin mensajes extremos y sin improvisar.
                </p>
              </SectionHeading>

              {kathiaProfile.collegiateNumber ? (
                <p className="mt-4 inline-flex rounded-full bg-white/72 px-3.5 py-2 text-sm font-bold text-vetkathia-primary-dark ring-1 ring-vetkathia-border/32">
                  Veterinaria colegiada nº {kathiaProfile.collegiateNumber}
                </p>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-2">
                {aboutBadges.map((badge) => (
                  <span
                    className="rounded-full bg-vetkathia-surface/66 px-3.5 py-2 text-sm font-bold text-vetkathia-text ring-1 ring-vetkathia-border/24"
                    key={badge}
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="mx-auto mt-6 w-full max-w-[17rem] sm:max-w-xs lg:hidden">
                <KathiaProfileVisual />
              </div>

              <div className="mt-6 grid gap-3 lg:grid-cols-3">
                {homeAboutPillars.map((pillar) => (
                  <div
                    className="rounded-[1.25rem] bg-white/72 p-4 ring-1 ring-vetkathia-border/24"
                    key={pillar.title}
                  >
                    <p className="font-sans text-base font-black leading-tight text-vetkathia-text">
                      {getHomeAboutPillarTitle(pillar.title)}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-vetkathia-muted">
                      {pillar.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  className="sm:w-auto"
                  fullWidth
                  onClick={() =>
                    trackCTAClick('Conocer mi enfoque', 'home sobre mi')
                  }
                  to="/sobre-mi"
                  variant="outline"
                >
                  Conocer mi enfoque
                </Button>
                <Button
                  className="hidden sm:w-auto lg:inline-flex"
                  fullWidth
                  onClick={() =>
                    trackCTAClick('Ver planes', 'home sobre mi')
                  }
                  to="/#planes"
                >
                  Ver planes
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <TestimonialsSection />

      <Section id="faq" className="overflow-hidden" spacing="compact" tone="white">
        <Container size="md">
          <div className="relative">
            <SectionHeading
              align="center"
              eyebrow="FAQ"
              size="md"
              title="Dudas frecuentes, respuestas claras."
            >
              <p>Preguntas frecuentes antes de elegir plan</p>
            </SectionHeading>

            <div className="relative mt-7">
              <Accordion
                defaultOpenFirst
                items={visibleHomeFaq}
                onItemOpen={(item) => trackFAQOpen(item.title)}
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section
        className="overflow-hidden"
        data-hide-mobile-sticky
        spacing="compact"
        tone="surface"
      >
        <Container size="md">
          <div className="relative overflow-hidden rounded-[1.8rem] bg-white/72 px-5 py-8 text-center shadow-[0_18px_48px_rgba(59,39,36,0.055)] ring-1 ring-white/75 sm:px-8 lg:px-10">
            <div
              className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(255,241,245,0.58))]"
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-3xl font-sans text-2xl font-black leading-tight text-vetkathia-text sm:text-3xl">
                ¿Quieres saber qué pauta encaja mejor con su perro o gato?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-vetkathia-muted sm:text-lg sm:leading-8">
                Elige el plan que encaja mejor y después completa el
                cuestionario inicial. La revisión manual se realiza según el
                servicio contratado.
              </p>
              <Button
                className="mt-7"
                onClick={() =>
                  trackCTAClick(
                    'Elegir plan',
                    'home final',
                  )
                }
                rightIcon={
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                }
                size="lg"
                to="/#planes"
              >
                Elegir plan
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
