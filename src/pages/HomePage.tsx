import {
  ArrowRight,
  ClipboardList,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

import { aboutTrustPillars, kathiaProfile } from '../data/about'
import {
  homeFaq,
  trustBenefits,
} from '../data/home'
import { createHomeStructuredData } from '../data/structuredData'
import { StructuredData } from '../components/common/StructuredData'
import { HeroPremium } from '../components/sections/HeroPremium'
import { PricingSection } from '../components/sections/PricingSection'
import { TestimonialsSection } from '../components/sections/TestimonialsSection'
import { useGsapReveal } from '../hooks/useGsapReveal'
import {
  trackCTAClick,
  trackFAQOpen,
  trackViewHome,
} from '../lib/analytics'
import { scrollToHashTarget } from '../lib/scrollToHashTarget'
import {
  Accordion,
  Button,
  Container,
  Section,
  SectionHeading,
} from '../components/ui'
import { SEOHead } from '../components/common/SEOHead'

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
      className="w-full rounded-[1.35rem] bg-[linear-gradient(145deg,rgba(255,253,251,0.96),rgba(255,245,240,0.72))] p-5 shadow-[0_18px_46px_rgba(59,39,36,0.055)] ring-1 ring-vetkathia-border/28"
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

const visibleHomeFaqIds = [
  'no-se-plan',
  'pago-web',
  'cantidades',
  'veterinario',
  'gatos',
]

const visibleHomeFaqBase = visibleHomeFaqIds
  .map((id) => homeFaq.find((item) => item.id === id))
  .filter(Boolean) as typeof homeFaq

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

  useEffect(() => {
    trackViewHome()
  }, [])

  const visibleHomeFaq = visibleHomeFaqBase

  return (
    <>
      <SEOHead
        canonicalPath="/"
        description="Planes online de nutrición natural veterinaria para perros y gatos. Elige valoración, plan personalizado o acompañamiento y completa el cuestionario después de contratar."
        title="Nutrición natural veterinaria online | VetKathia"
      />
      <StructuredData
        data={createHomeStructuredData(
          visibleHomeFaq.map((item) => ({
            answer: item.content,
            question: item.title,
          })),
        )}
      />

      <HeroPremium id="nutricion" />

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
                  Mejorar su alimentación debería darte tranquilidad, no más
                  dudas.
                </h2>
                <p className="mt-5 max-w-lg text-base leading-7 text-vetkathia-muted sm:text-lg sm:leading-8">
                  Entre pienso, croquetas o alimento seco, BARF, comida
                  cocinada, suplementos y recetas de internet, es normal no
                  saber por dónde empezar. Aquí no se cambia por moda: primero
                  reviso su caso y después defino un plan de alimentación
                  seguro, realista y aplicable en casa.
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
              Trabajo con perros y gatos que necesitan mejorar su alimentación:
              digestiones sensibles, sobrepeso, etapa senior, alergias o
              patologías ya diagnosticadas. En gatos, además, la estrategia se
              plantea desde sus necesidades como especie.
            </p>
            <p className="mt-3 text-base leading-7 text-vetkathia-muted sm:text-lg sm:leading-8">
              Según el caso, puede tener sentido comida cocinada, alimentación
              mixta, BARF, natural comercial o una transición gradual desde lo
              que ya come.
            </p>
          </div>
          <figure className="overflow-hidden rounded-[1.7rem] bg-white/72 shadow-[0_18px_46px_rgba(59,39,36,0.045)] ring-1 ring-vetkathia-border/24">
            <img
              alt="Cuenco de comida natural para perro y gato con ingredientes frescos"
              className="aspect-[4/3] w-full bg-vetkathia-surface object-cover object-[50%_34%]"
              loading="lazy"
              src="/images/vetkathia-natural-food-bowl.jpg"
            />
            <figcaption className="px-5 py-4 sm:px-6 sm:py-5">
              <p className="font-sans text-lg font-black leading-tight text-vetkathia-text sm:text-xl">
                Una estrategia distinta para cada animal.
              </p>
            </figcaption>
          </figure>
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
                eyebrow="Sobre mí"
                size="sm"
                title="Nutricionista veterinaria para perros y gatos."
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
                    className="border-l border-vetkathia-border/70 py-1 pl-4"
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
          <div className="group relative overflow-hidden rounded-[1.8rem] bg-white/72 px-5 py-8 text-center shadow-[0_18px_48px_rgba(59,39,36,0.055)] ring-1 ring-white/75 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_56px_rgba(59,39,36,0.08)] sm:px-8 lg:px-10">
            <div
              className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(255,245,240,0.58))]"
              aria-hidden="true"
            />
            <Link
              aria-label="Ver planes y contratar"
              className="absolute inset-0 z-10 rounded-[1.8rem] focus:outline-none focus:ring-4 focus:ring-vetkathia-primary-dark/25"
              onClick={() => {
                trackCTAClick('Ver planes y contratar', 'home final card')
                window.setTimeout(() => scrollToHashTarget('planes'), 0)
              }}
              to="/#planes"
            />
            <div className="pointer-events-none relative z-20">
              <h2 className="mx-auto max-w-3xl font-sans text-2xl font-black leading-tight text-vetkathia-text sm:text-3xl">
                ¿Quieres saber qué plan de alimentación encaja mejor con tu
                perro o gato?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-vetkathia-muted sm:text-lg sm:leading-8">
                Elige el plan nutricional que mejor se adapta a lo que
                necesitas ahora. Después completarás el pago seguro, rellenarás
                el cuestionario inicial y podrás reservar tu cita online.
              </p>
              <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-6 text-vetkathia-primary-dark">
                Servicio online de nutrición veterinaria. No es un servicio de
                urgencias.
              </p>
              <Button
                className="pointer-events-auto mt-7"
                onClick={() => {
                  trackCTAClick('Ver planes y contratar', 'home final')
                  window.setTimeout(() => scrollToHashTarget('planes'), 0)
                }}
                rightIcon={
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                }
                size="lg"
                to="/#planes"
              >
                Ver planes y contratar
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
