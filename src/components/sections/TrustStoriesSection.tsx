import { MessageCircle, ShieldCheck, Sparkles } from 'lucide-react'

import { Card, Container, Section, SectionHeading } from '../ui'

const storyPrinciples = [
  {
    description:
      'Solo aparecerán experiencias reales, compartidas con permiso y sin alterar el contexto.',
    icon: ShieldCheck,
    title: 'Experiencias verificadas',
  },
  {
    description:
      'No se publicarán promesas médicas ni resultados garantizados como argumento de venta.',
    icon: MessageCircle,
    title: 'Lenguaje responsable',
  },
  {
    description:
      'La confianza se construye explicando el proceso, no presionando para decidir rápido.',
    icon: Sparkles,
    title: 'Conversión tranquila',
  },
]

export function TrustStoriesSection() {
  return (
    <Section className="overflow-hidden" tone="white">
      <Container>
        <div className="relative">
          <div
            className="absolute -left-8 top-12 h-36 w-36 rounded-full bg-vetkathia-surface/80 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -right-8 bottom-8 h-40 w-40 rounded-full bg-vetkathia-background/80 blur-3xl"
            aria-hidden="true"
          />
          <Card className="relative overflow-hidden border-vetkathia-border/85 bg-white/90 p-5 shadow-soft sm:p-7 lg:p-8">
            <div
              className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-vetkathia-surface/85 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-end">
              <SectionHeading
                eyebrow="Experiencias reales"
                title="Confianza con contexto y permiso."
              >
                <p>
                  Cuando haya reseñas verificadas de familias VetKathia,
                  aparecerán aquí con permiso y con contexto. Hasta entonces,
                  la confianza se apoya en explicar bien el proceso.
                </p>
              </SectionHeading>

              <div className="grid gap-3 sm:grid-cols-3">
                {storyPrinciples.map((item) => {
                  const Icon = item.icon

                  return (
                    <div
                      className="rounded-[1.35rem] border border-vetkathia-border/75 bg-vetkathia-background/70 p-4"
                      key={item.title}
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-vetkathia-border bg-white text-vetkathia-primary-dark">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 font-sans text-base font-semibold leading-tight text-vetkathia-text">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-vetkathia-muted">
                        {item.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  )
}
