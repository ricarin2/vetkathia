import { ArrowRight, CheckCircle2 } from 'lucide-react'

import { aboutBlocks, aboutTrustPillars, visibleAboutCredentials } from '../data/about'
import { createBreadcrumbStructuredData } from '../data/structuredData'
import { trackCTAClick } from '../lib/analytics'
import { SEOHead } from '../components/common/SEOHead'
import { StructuredData } from '../components/common/StructuredData'
import { AboutEditorialVisual } from '../components/sections/AboutEditorialVisual'
import { Badge, Button, Card, Container, Section } from '../components/ui'

export function AboutPage() {
  return (
    <>
      <SEOHead
        canonicalPath="/sobre-mi"
        description="Conoce a Kathia y su enfoque veterinario: nutrición natural para perros y gatos sin radicalismos, con pautas adaptadas a cada caso."
        title="Kathia, veterinaria de nutrición natural para perros y gatos | VetKathia"
      />
      <StructuredData
        data={createBreadcrumbStructuredData([
          { name: 'Inicio', path: '/' },
          { name: 'Sobre mí', path: '/sobre-mi' },
        ])}
      />

      <Section className="pb-8 pt-10 sm:pt-14 lg:pt-18">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Badge tone="soft">VetKathia</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-vetkathia-text sm:text-5xl lg:text-6xl">
              Sobre mí
            </h1>
            <p className="mt-6 text-xl leading-9 text-vetkathia-muted">
              Soy Kathia, veterinaria enfocada en nutrición natural para perros
              y gatos. Mi trabajo es ayudarte a tomar decisiones alimentarias
              con criterio, sin radicalismos y con una pauta adaptada a la edad,
              salud y rutina de tu animal.
            </p>
            {visibleAboutCredentials.length > 0 ? (
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {visibleAboutCredentials.map((credential) => (
                  <div
                    className="rounded-[1.25rem] border border-vetkathia-border bg-white/74 px-4 py-3 shadow-card"
                    key={credential.label}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-vetkathia-primary-dark">
                      {credential.label}
                    </p>
                    <p className="mt-1 font-sans text-base font-semibold text-vetkathia-text">
                      {credential.value}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href="#enfoque"
                onClick={() =>
                  trackCTAClick('Conocer mi enfoque', 'sobre mi hero')
                }
                size="lg"
                variant="outline"
              >
                Conocer mi enfoque
              </Button>
              <Button
                onClick={() =>
                  trackCTAClick('Elegir plan', 'sobre mi hero')
                }
                rightIcon={<ArrowRight className="h-5 w-5" aria-hidden="true" />}
                size="lg"
                to="/#planes"
              >
                Elegir plan
              </Button>
            </div>
          </div>

          <AboutEditorialVisual />
        </Container>
      </Section>

      <Section className="pt-0" id="enfoque">
        <Container>
          <div className="mb-8 grid gap-3 md:grid-cols-4">
            {aboutTrustPillars.map((pillar) => (
              <Card className="p-5" key={pillar.title}>
                <h2 className="font-sans text-lg font-semibold leading-tight text-vetkathia-text">
                  {pillar.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-vetkathia-muted">
                  {pillar.text}
                </p>
              </Card>
            ))}
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {aboutBlocks.map((block) => (
              <Card key={block.title}>
                <h2 className="font-sans text-2xl font-semibold leading-tight text-vetkathia-text">
                  {block.title}
                </h2>
                <div className="mt-6 grid gap-4">
                  {block.items.map((item) => (
                    <div className="flex gap-3" key={item}>
                      <CheckCircle2
                        className="mt-1 h-5 w-5 shrink-0 text-vetkathia-primary"
                        aria-hidden="true"
                      />
                      <p className="leading-7 text-vetkathia-muted">{item}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container size="md">
          <Card className="text-center" tone="highlight">
            <h2 className="mx-auto max-w-2xl text-4xl font-semibold leading-tight text-vetkathia-text sm:text-5xl">
              ¿Quieres revisar su alimentación con criterio?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-vetkathia-muted">
              Elige el plan que encaja mejor y después completa el cuestionario
              inicial para revisar el caso con contexto.
            </p>
            <Button
              className="mt-8"
              onClick={() =>
                trackCTAClick('Ver planes', 'sobre mi final')
              }
              rightIcon={<ArrowRight className="h-5 w-5" aria-hidden="true" />}
              size="lg"
              to="/#planes"
            >
              Ver planes
            </Button>
          </Card>
        </Container>
      </Section>
    </>
  )
}
