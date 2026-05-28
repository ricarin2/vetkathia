import {
  Activity,
  ClipboardList,
  HelpCircle,
  Stethoscope,
} from 'lucide-react'

import { Container, Section, SectionHeading } from '../ui'

const riskCards = [
  {
    description:
      'Pueden afectar la tolerancia digestiva si no se plantean de forma gradual.',
    icon: Activity,
    title: 'Cambios demasiado rápidos',
  },
  {
    description:
      'Una receta con ingredientes sanos no siempre cubre todos los nutrientes.',
    icon: ClipboardList,
    title: 'Pautas incompletas',
  },
  {
    description:
      'En seniors, gatos o animales con patologías, no conviene improvisar.',
    icon: Stethoscope,
    title: 'Casos sensibles',
  },
  {
    description:
      'Entre redes, recetas y opiniones opuestas, cuesta saber qué aplicar en casa.',
    icon: HelpCircle,
    title: 'Demasiada información',
  },
]

export function RiskSection() {
  return (
    <Section className="overflow-hidden bg-white" tone="white">
      <Container>
        <div className="relative mx-auto max-w-6xl">
          <div
            className="absolute -left-12 top-10 h-44 w-44 rounded-full bg-vetkathia-background/70 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -right-12 bottom-0 h-44 w-44 rounded-full bg-vetkathia-surface/45 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionHeading
              eyebrow="Antes de cambiar, revisa"
              title="Errores frecuentes que podemos evitar."
              variant="landing"
            >
              <p>
                No se trata de asustar ni de frenar el cambio. Se trata de
                evitar transiciones bruscas, dietas incompletas o decisiones
                poco adecuadas en perros y gatos sensibles.
              </p>
            </SectionHeading>

            <div className="border-y border-vetkathia-border/32">
              {riskCards.map((item, index) => {
                const Icon = item.icon

                return (
                  <div
                    className="grid gap-4 border-b border-vetkathia-border/28 py-5 last:border-b-0 sm:grid-cols-[4.25rem_1fr] sm:gap-5"
                    key={item.title}
                  >
                    <div className="flex items-center gap-3 sm:block">
                      <span className="text-xs font-extrabold tracking-[0.18em] text-vetkathia-primary-dark/60">
                        0{index + 1}
                      </span>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-vetkathia-background text-vetkathia-primary-dark ring-1 ring-vetkathia-border/28 sm:mt-4">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </div>
                    <div>
                      <h3 className="font-sans text-xl font-black leading-tight text-vetkathia-text">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-vetkathia-muted sm:text-base sm:leading-7">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
