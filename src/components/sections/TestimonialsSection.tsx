import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight, HeartPulse, PawPrint } from 'lucide-react'

import {
  hasDemoTestimonialCases,
  homeTestimonialCases,
  type TestimonialCase,
} from '../../data/testimonials'
import { cn } from '../../lib/cn'
import { trackCTAClick } from '../../lib/analytics'
import { Button, Container, Section, SectionHeading } from '../ui'

const cardVariants: Variants = {
  hover: {
    boxShadow: '0 22px 56px rgba(59,39,36,0.085)',
    scale: 1.01,
    y: -4,
  },
  rest: {
    boxShadow: '0 14px 34px rgba(59,39,36,0.052)',
    scale: 1,
    y: 0,
  },
}

const visualVariants: Variants = {
  hover: {
    rotate: 3,
    scale: 1.05,
  },
  rest: {
    rotate: 0,
    scale: 1,
  },
}

export function TestimonialsSection() {
  if (homeTestimonialCases.length === 0) return null

  return (
    <Section
      id="casos"
      className="overflow-hidden bg-[linear-gradient(180deg,#FFF1F5_0%,#FFF9F6_100%)]"
      spacing="compact"
      tone="surface"
    >
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.86fr)_auto] lg:items-end">
            <SectionHeading
              eyebrow={hasDemoTestimonialCases ? 'Demo visual' : 'Casos reales'}
              size="sm"
              title={
                hasDemoTestimonialCases
                  ? 'Ejemplos de cómo se verán los casos.'
                  : 'Casos compartidos con permiso.'
              }
              variant="landing"
            >
              <p>
                {hasDemoTestimonialCases
                  ? 'Ejemplos visuales para validar el formato. Sustituir por historias reales con permiso de las familias.'
                  : 'Historias publicadas con permiso. Cada caso se valora de forma individual y no supone una promesa de resultado.'}
              </p>
            </SectionHeading>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button
                className="sm:w-auto"
                fullWidth
                onClick={() => trackCTAClick('Ver casos', 'home casos')}
                rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                size="sm"
                to="/casos"
                variant="outline"
              >
                Ver casos
              </Button>
            </div>
          </div>

          <p className="mt-5 text-xs font-semibold leading-5 text-vetkathia-primary-dark/78 lg:hidden">
            Desliza para ver más
          </p>

          <div className="-mx-4 mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {homeTestimonialCases.map((testimonialCase) => (
              <TestimonialPreviewCard
                className="min-w-[84vw] snap-start sm:min-w-[21rem]"
                key={testimonialCase.id}
                testimonialCase={testimonialCase}
              />
            ))}
          </div>

          <div className="mt-7 hidden items-stretch gap-4 lg:grid lg:grid-cols-3">
            {homeTestimonialCases.map((testimonialCase) => (
              <TestimonialPreviewCard
                key={testimonialCase.id}
                testimonialCase={testimonialCase}
              />
            ))}
          </div>

          <p className="mt-4 max-w-4xl text-xs leading-5 text-vetkathia-muted sm:text-sm sm:leading-6">
            {hasDemoTestimonialCases
              ? 'Estos casos son contenido demo para visualizar el diseño. No son testimonios reales publicados.'
              : 'Los casos se publican con permiso de las familias. Cada animal es distinto y los resultados pueden variar. Este servicio no sustituye urgencias ni seguimiento clínico habitual.'}
          </p>
        </div>
      </Container>
    </Section>
  )
}

function TestimonialPreviewCard({
  className,
  featured = false,
  testimonialCase,
}: {
  className?: string
  featured?: boolean
  testimonialCase: TestimonialCase
}) {
  const reduceMotion = useReducedMotion()
  const enableHoverMotion =
    !reduceMotion &&
    typeof window !== 'undefined' &&
    window.matchMedia('(min-width: 1024px)').matches
  const speciesLabel = testimonialCase.species === 'gato' ? 'Gato' : 'Perro'
  const tags = getCaseTags(testimonialCase, speciesLabel)

  return (
    <motion.article
      animate="rest"
      className={cn(
        'group flex h-full flex-col rounded-[1.35rem] border border-white/72 bg-white/86 p-4 ring-1 ring-vetkathia-border/18 backdrop-blur transition-[border-color,box-shadow] duration-300 hover:border-vetkathia-primary/28 hover:ring-vetkathia-primary/18 lg:min-h-[19rem] lg:p-5',
        className,
      )}
      initial="rest"
      transition={{ damping: 24, stiffness: 260, type: 'spring' }}
      variants={enableHoverMotion ? cardVariants : undefined}
      whileHover={enableHoverMotion ? 'hover' : undefined}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.15em] text-vetkathia-primary-dark">
            {speciesLabel} · {testimonialCase.caseType}
          </p>
          <h3
            className={cn(
              'mt-2 font-sans font-black leading-tight text-vetkathia-text',
              featured ? 'text-2xl' : 'text-xl',
            )}
          >
            {testimonialCase.petName}
            {testimonialCase.ageLabel ? (
              <span className="font-semibold text-vetkathia-muted">
                {' '}
                · {testimonialCase.ageLabel}
              </span>
            ) : null}
          </h3>
        </div>
        <CaseVisual
          featured={featured}
          enableHoverMotion={enableHoverMotion}
          testimonialCase={testimonialCase}
        />
      </div>

      {testimonialCase.isDemo ? (
        <span className="mt-4 inline-flex w-fit rounded-full bg-vetkathia-surface px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-vetkathia-primary-dark ring-1 ring-vetkathia-border/35">
          Demo visual
        </span>
      ) : null}

      <blockquote
        className={cn(
          'mt-4 border-l-2 border-vetkathia-primary/30 pl-4 font-semibold leading-7 text-vetkathia-text',
          featured ? 'text-lg' : 'text-base',
        )}
      >
        “{testimonialCase.shortQuote}”
      </blockquote>

      <p className="mt-3 line-clamp-1 text-sm leading-6 text-vetkathia-muted">
        {testimonialCase.context}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            className="rounded-full bg-[#FFFDFB]/82 px-2.5 py-1 text-xs font-bold text-vetkathia-text ring-1 ring-vetkathia-border/24"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-5">
        <Button
          onClick={() => trackCTAClick('Ver caso', 'home caso card')}
          rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
          size="sm"
          to="/casos"
          variant="ghost"
        >
          Ver caso
        </Button>
      </div>
    </motion.article>
  )
}

function getCaseTags(testimonialCase: TestimonialCase, speciesLabel: string) {
  const primaryCaseType = testimonialCase.caseType.split('/')[0]?.trim()

  return [
    speciesLabel,
    testimonialCase.ageLabel,
    primaryCaseType,
  ].filter(Boolean).slice(0, 3) as string[]
}

function CaseVisual({
  enableHoverMotion,
  featured,
  testimonialCase,
}: {
  enableHoverMotion: boolean
  featured: boolean
  testimonialCase: TestimonialCase
}) {
  if (testimonialCase.photoSrc) {
    return (
      <motion.img
        className={cn(
          'shrink-0 rounded-3xl object-cover ring-1 ring-vetkathia-border/40',
          featured ? 'h-20 w-20' : 'h-16 w-16',
        )}
        src={testimonialCase.photoSrc}
        alt={
          testimonialCase.photoAlt ??
          (testimonialCase.isDemo
            ? `${testimonialCase.petName}, ejemplo visual de caso`
            : `${testimonialCase.petName}, caso real compartido con permiso`)
        }
        transition={{ damping: 18, stiffness: 260, type: 'spring' }}
        variants={enableHoverMotion ? visualVariants : undefined}
      />
    )
  }

  return (
    <motion.div
      className={cn(
        'relative flex shrink-0 items-center justify-center rounded-3xl bg-vetkathia-surface/76 text-vetkathia-primary-dark ring-1 ring-vetkathia-border/40',
        featured ? 'h-20 w-20' : 'h-16 w-16',
      )}
      transition={{ damping: 18, stiffness: 260, type: 'spring' }}
      variants={enableHoverMotion ? visualVariants : undefined}
      aria-hidden="true"
    >
      <PawPrint className={featured ? 'h-8 w-8' : 'h-7 w-7'} />
      <HeartPulse className="absolute bottom-3 right-3 h-4 w-4 text-vetkathia-primary/70" />
    </motion.div>
  )
}
