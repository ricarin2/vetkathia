import { useMemo, useState } from 'react'
import { ArrowRight, HeartPulse, PawPrint, ShieldCheck } from 'lucide-react'

import {
  displayTestimonialCases,
  hasDemoTestimonialCases,
  hasPublicTestimonialCases,
  type TestimonialCase,
} from '../data/testimonials'
import { trackCTAClick } from '../lib/analytics'
import { SEOHead } from '../components/common/SEOHead'
import { Button, Container, Section, SectionHeading } from '../components/ui'

type CaseFilter = 'todos' | TestimonialCase['species']

const filterOptions: Array<{ label: string; value: CaseFilter }> = [
  { label: 'Todos', value: 'todos' },
  { label: 'Perros', value: 'perro' },
  { label: 'Gatos', value: 'gato' },
]

export function CasesPage() {
  const [activeFilter, setActiveFilter] = useState<CaseFilter>('todos')
  const hasCases = displayTestimonialCases.length > 0
  const filteredCases = useMemo(() => {
    if (activeFilter === 'todos') return displayTestimonialCases

    return displayTestimonialCases.filter(
      (testimonialCase) => testimonialCase.species === activeFilter,
    )
  }, [activeFilter])
  const isDemoMode = hasDemoTestimonialCases && !hasPublicTestimonialCases

  return (
    <>
      <SEOHead
        canonicalPath="/casos"
        description={
          isDemoMode
            ? 'Ejemplos visuales para validar el formato de casos de VetKathia antes de publicar historias reales con permiso.'
            : 'Casos reales compartidos con permiso por familias que revisaron la alimentación de su perro o gato con criterio veterinario.'
        }
        title={isDemoMode ? 'Casos demo | VetKathia' : 'Casos reales | VetKathia'}
      />

      <Section spacing="compact" tone="cream">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <SectionHeading
              align="center"
              eyebrow={isDemoMode ? 'Demo visual' : 'Casos reales'}
              title={
                isDemoMode
                  ? 'Ejemplos visuales de casos'
                  : 'Casos reales'
              }
              variant="landing"
            >
              <p>
                {isDemoMode
                  ? 'Ejemplos visuales para revisar el diseño de casos. Sustituir por historias reales cuando haya permiso explícito de las familias.'
                  : 'Historias compartidas con permiso por familias que querían mejorar la alimentación de su perro o gato. Cada caso se valora de forma individual y no supone una promesa de resultado.'}
              </p>
            </SectionHeading>
          </div>
        </Container>
      </Section>

      <Section spacing="compact" tone="white">
        <Container>
          {hasCases ? (
            <>
              {isDemoMode ? (
                <p className="mx-auto mb-6 max-w-3xl rounded-2xl bg-vetkathia-surface/72 px-4 py-3 text-center text-sm font-semibold leading-6 text-vetkathia-primary-dark ring-1 ring-vetkathia-border/30">
                  Ejemplos visuales para validar el formato. Sustituir por historias reales con permiso de las familias.
                </p>
              ) : null}

              <div className="flex flex-wrap justify-center gap-2">
                {filterOptions.map((option) => {
                  const isActive = activeFilter === option.value

                  return (
                    <button
                      className={`min-h-10 rounded-full px-4 text-sm font-bold transition-[background-color,border-color,color] duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-vetkathia-primary-dark/60 ${
                        isActive
                          ? 'bg-vetkathia-primary text-white'
                          : 'border border-vetkathia-border bg-white text-vetkathia-text hover:border-vetkathia-primary hover:bg-vetkathia-background'
                      }`}
                      key={option.value}
                      onClick={() => setActiveFilter(option.value)}
                      type="button"
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {filteredCases.map((testimonialCase) => (
                  <CaseCard
                    key={testimonialCase.id}
                    testimonialCase={testimonialCase}
                  />
                ))}
              </div>
            </>
          ) : (
            <EmptyCases />
          )}
        </Container>
      </Section>

      <Section spacing="compact" tone="surface">
        <Container size="md">
          <div className="rounded-[1.7rem] bg-white/72 px-5 py-8 text-center shadow-[0_18px_48px_rgba(59,39,36,0.055)] ring-1 ring-white/75 sm:px-8">
            <ShieldCheck
              className="mx-auto h-8 w-8 text-vetkathia-primary-dark"
              aria-hidden="true"
            />
            <h2 className="mt-4 font-sans text-2xl font-black leading-tight text-vetkathia-text sm:text-3xl">
              ¿Quieres revisar su caso con calma?
            </h2>
	            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-vetkathia-muted">
	              Elige un plan y después completa el cuestionario inicial. La
	              revisión manual se realiza según el servicio contratado.
	            </p>
	            <Button
              className="mt-7"
              onClick={() =>
	                trackCTAClick('Ver planes', 'casos final')
	              }
	              rightIcon={<ArrowRight className="h-5 w-5" aria-hidden="true" />}
	              to="/#planes"
	            >
	              Ver planes
	            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}

function EmptyCases() {
  return (
    <div className="mx-auto max-w-3xl rounded-[1.7rem] border border-vetkathia-border/35 bg-[#FFFDFB] px-5 py-9 text-center shadow-[0_16px_42px_rgba(59,39,36,0.045)] sm:px-8">
      <div
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-vetkathia-surface text-vetkathia-primary-dark ring-1 ring-vetkathia-border/40"
        aria-hidden="true"
      >
        <PawPrint className="h-7 w-7" />
      </div>
      <h2 className="mt-5 font-sans text-2xl font-black leading-tight text-vetkathia-text">
        Pronto añadiremos casos reales con permiso de las familias.
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-vetkathia-muted sm:text-base sm:leading-7">
        No publicamos nombres, fotos ni historias sin consentimiento explícito.
        Mientras tanto, puedes elegir un plan para revisar el contexto de tu
        perro o gato dentro del servicio contratado.
      </p>
      <p className="mx-auto mt-4 max-w-2xl text-xs leading-5 text-vetkathia-muted sm:text-sm sm:leading-6">
        Los casos se publican con permiso de las familias. Cada animal es
        distinto y los resultados pueden variar. Este servicio no sustituye
        urgencias ni seguimiento clínico habitual.
      </p>
    </div>
  )
}

function CaseCard({
  testimonialCase,
}: {
  testimonialCase: TestimonialCase
}) {
  const speciesLabel =
    testimonialCase.species === 'gato' ? 'Gato' : 'Perro'

  return (
    <article className="flex h-full flex-col rounded-[1.55rem] border border-vetkathia-border/42 bg-white p-5 shadow-[0_16px_42px_rgba(59,39,36,0.05)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-vetkathia-primary-dark">
            {speciesLabel} · {testimonialCase.caseType}
          </p>
          {testimonialCase.isDemo ? (
            <span className="mt-2 inline-flex rounded-full bg-vetkathia-surface px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-vetkathia-primary-dark ring-1 ring-vetkathia-border/35">
              Demo visual
            </span>
          ) : null}
          <h3 className="mt-2 font-sans text-xl font-black leading-tight text-vetkathia-text">
            {testimonialCase.petName}
            {testimonialCase.ageLabel ? (
              <span className="font-semibold text-vetkathia-muted">
                {' '}
                · {testimonialCase.ageLabel}
              </span>
            ) : null}
          </h3>
        </div>
        <CaseVisual testimonialCase={testimonialCase} />
      </div>

      <blockquote className="mt-5 border-l-2 border-vetkathia-primary/30 pl-4 text-base font-semibold leading-7 text-vetkathia-text">
        “{testimonialCase.shortQuote}”
      </blockquote>
      <p className="mt-2 text-sm font-semibold text-vetkathia-primary-dark">
        {testimonialCase.guardianLabel}
      </p>

      <div className="mt-5 grid gap-4 text-sm leading-6 text-vetkathia-muted">
        <CaseDetail label="Contexto" text={testimonialCase.context} />
        <CaseDetail label="Enfoque" text={testimonialCase.approach} />
        <CaseDetail
          label="Observado por su familia"
          text={testimonialCase.observedChange}
        />
      </div>

      <p className="mt-auto pt-5 text-xs leading-5 text-vetkathia-muted">
        {testimonialCase.isDemo
          ? 'Caso de ejemplo para visualizar diseño. Sustituir por caso real con consentimiento.'
          : 'Caso individual. No sustituye seguimiento veterinario.'}
      </p>
    </article>
  )
}

function CaseDetail({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-vetkathia-text">
        {label}
      </p>
      <p className="mt-1">{text}</p>
    </div>
  )
}

function CaseVisual({
  testimonialCase,
}: {
  testimonialCase: TestimonialCase
}) {
  if (testimonialCase.photoSrc) {
    return (
      <img
        className="h-16 w-16 shrink-0 rounded-3xl object-cover ring-1 ring-vetkathia-border/40"
        src={testimonialCase.photoSrc}
        alt={
          testimonialCase.photoAlt ??
          (testimonialCase.isDemo
            ? `${testimonialCase.petName}, ejemplo visual de caso`
            : `${testimonialCase.petName}, caso real compartido con permiso`)
        }
      />
    )
  }

  return (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-vetkathia-surface/76 text-vetkathia-primary-dark ring-1 ring-vetkathia-border/40"
      aria-hidden="true"
    >
      <HeartPulse className="h-7 w-7" />
    </div>
  )
}
