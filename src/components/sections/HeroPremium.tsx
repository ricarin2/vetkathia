import {
  ClipboardCheck,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { type ComponentType } from 'react'

import { cn } from '@/lib/utils'

const trustItems = [
  {
    description: 'Se revisan salud, edad y alimentación actual.',
    icon: Stethoscope,
    label: 'Criterio veterinario',
  },
  {
    description: 'Una pauta adaptada a su caso, no una receta estándar.',
    icon: ClipboardCheck,
    label: 'Dieta personalizada',
  },
  {
    description: 'Cada etapa se valora de forma distinta.',
    icon: HeartPulse,
    label: 'Todas las edades',
  },
  {
    description: 'Cambios graduales y aplicables en casa.',
    icon: ShieldCheck,
    label: 'Transición segura',
  },
]

const heroImageSources = {
  // Cuando exista el asset final, usar: '/images/hero-pets-nutrition.png'
  current: '/images/vetkathia-hero-pets.jpg',
  mobile: '/images/vetkathia-hero-pets-800.jpg',
  tablet: '/images/vetkathia-hero-pets-1200.jpg',
}

type MotionProps = Record<string, unknown>
type MotionVariants = Record<string, MotionProps>

const MotionDiv = motion.div as ComponentType<MotionProps>
const MotionH1 = motion.h1 as ComponentType<MotionProps>
const MotionP = motion.p as ComponentType<MotionProps>

const textVariants: MotionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.04,
    },
    y: 0,
  },
}

const itemVariants: MotionVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    transition: { duration: 0.44, ease: [0.22, 1, 0.36, 1] },
    y: 0,
  },
}

const photoVariants: MotionVariants = {
  hidden: { opacity: 0, scale: 0.985, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] },
    y: 0,
  },
}

type HeroPremiumProps = {
  className?: string
  id?: string
}

export function HeroPremium({
  className,
  id,
}: HeroPremiumProps) {
  const shouldReduceMotion = useReducedMotion()
  const shouldUseDecorativeMotion =
    !shouldReduceMotion &&
    typeof window !== 'undefined' &&
    window.matchMedia('(min-width: 768px)').matches
  const motionProps = shouldReduceMotion
    ? { initial: false }
    : { animate: 'visible', initial: 'hidden' }

  return (
    <section
      id={id}
      className={cn(
        'relative isolate overflow-hidden bg-vetkathia-background px-4 pb-9 pt-5 sm:px-6 sm:pb-12 sm:pt-10 lg:px-8 lg:py-14',
        className,
      )}
    >
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_10%_10%,rgba(232,62,115,0.12),transparent_30%),radial-gradient(ellipse_at_84%_20%,rgba(255,255,255,0.96),transparent_34%),linear-gradient(180deg,#FFF9F6_0%,#FFF1F5_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-24 rounded-t-[60%] bg-white/70"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-7xl min-w-0 items-center gap-5 sm:gap-7 lg:grid-cols-[0.96fr_1.04fr] lg:gap-12 xl:gap-14">
        <MotionDiv
          className="order-1 min-w-0 max-w-3xl"
          variants={textVariants}
          {...motionProps}
        >
          <MotionDiv
            className="inline-flex rounded-full border border-vetkathia-border/70 bg-white/80 px-3.5 py-2 text-xs font-semibold text-vetkathia-primary-dark shadow-card sm:px-4 sm:text-sm"
            variants={itemVariants}
          >
            Nutrición veterinaria online
          </MotionDiv>

          <MotionH1
            className="hero-display-font mt-4 max-w-3xl break-words text-[2rem] font-black leading-[1.05] tracking-normal text-vetkathia-text min-[390px]:text-[2.16rem] sm:text-5xl lg:text-[3.55rem] lg:leading-[1.03] xl:text-[3.85rem]"
            variants={itemVariants}
          >
            Nutrición natural veterinaria para{' '}
            <span className="hero-highlight-glow">
              perros y gatos
            </span>
          </MotionH1>

          <MotionP
            className="mt-4 max-w-2xl text-[0.95rem] font-medium leading-7 text-vetkathia-text/85 sm:mt-5 sm:text-lg sm:leading-8"
            variants={itemVariants}
          >
            Reviso qué come ahora tu perro o gato, su salud, digestión, edad y
            rutina para ayudarte a elegir un plan de alimentación natural
            seguro, realista y aplicable. Puede ser cocinado, mixto, BARF,
            natural comercial o una transición gradual desde su alimentación
            actual.
          </MotionP>

          <MotionP
            className="mt-3 text-sm font-semibold leading-6 text-vetkathia-primary-dark"
            variants={itemVariants}
          >
            Servicio online en español · Pago seguro · Cita online · No
            sustituye urgencias veterinarias
          </MotionP>
        </MotionDiv>

        <MotionDiv
          className="order-2 min-w-0"
          variants={photoVariants}
          {...motionProps}
        >
          <div className="relative mx-auto max-w-xl lg:max-w-none">
            <div
              className="absolute -inset-4 rounded-[2.8rem] bg-white/54 blur-2xl"
              aria-hidden="true"
            />
            {shouldUseDecorativeMotion ? (
              <MotionDiv
                animate={{ opacity: [0.2, 0.32, 0.2] }}
                className="absolute -inset-5 rounded-[3rem] bg-[radial-gradient(circle_at_50%_42%,rgba(232,62,115,0.18),transparent_55%)]"
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              />
            ) : (
              <div
                className="absolute -inset-5 rounded-[3rem] bg-[radial-gradient(circle_at_50%_42%,rgba(232,62,115,0.14),transparent_55%)]"
                aria-hidden="true"
              />
            )}
            <div className="relative overflow-hidden rounded-[1.7rem] bg-white/82 p-1.5 shadow-soft ring-1 ring-white/80 sm:rounded-[2.7rem] sm:p-2">
              <div className="relative h-[14.5rem] overflow-hidden rounded-[1.25rem] bg-vetkathia-surface min-[390px]:h-[15.5rem] sm:h-[22rem] sm:rounded-[2.1rem] lg:h-[26rem] xl:h-[28rem]">
                <picture>
                  <source
                    media="(max-width: 640px)"
                    srcSet={heroImageSources.mobile}
                  />
                  <source
                    media="(max-width: 1024px)"
                    srcSet={heroImageSources.tablet}
                  />
                  <img
                    alt="Perros y gatos juntos en una escena cálida de nutrición natural veterinaria"
                    className="h-full w-full object-cover object-[50%_47%]"
                    decoding="async"
                    fetchPriority="high"
                    height="1200"
                    loading="eager"
                    src={heroImageSources.current}
                    width="1600"
                  />
                </picture>
                <div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,249,246,0.08)_0%,rgba(255,249,246,0)_56%,rgba(59,39,36,0.08)_100%)]"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
      <MotionDiv
        className="mx-auto mt-5 max-w-7xl rounded-[1.45rem] border border-vetkathia-border/40 bg-[linear-gradient(135deg,rgba(255,249,246,0.92),rgba(255,241,245,0.7))] p-2.5 shadow-[0_18px_46px_rgba(59,39,36,0.055)] ring-1 ring-white/80 sm:mt-7 sm:rounded-[1.65rem] sm:p-3 lg:mt-8"
        variants={itemVariants}
        {...motionProps}
      >
        <div className="mb-2 flex flex-col gap-1 px-1.5 sm:mb-3 sm:flex-row sm:items-end sm:justify-between sm:px-2">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-vetkathia-primary-dark">
            Cómo se decide la pauta
          </p>
          <p className="max-w-2xl text-sm font-semibold leading-6 text-vetkathia-muted">
            La valoración no parte de una dieta de moda, sino del caso real de
            tu perro o gato.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5 lg:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon

            return (
              <div
                className="flex items-start gap-2.5 rounded-[1rem] bg-white/68 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.74)] sm:rounded-[1.15rem] sm:px-3.5 sm:py-3.5"
                key={item.label}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-vetkathia-surface text-vetkathia-primary-dark shadow-[0_8px_18px_rgba(232,62,115,0.07)]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-black leading-5 text-vetkathia-text">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs font-medium leading-5 text-vetkathia-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </MotionDiv>
    </section>
  )
}
