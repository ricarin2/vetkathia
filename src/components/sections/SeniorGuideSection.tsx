import { BookOpen, HeartPulse } from 'lucide-react'

import { trackCTAClick } from '../../lib/analytics'
import { Badge, Button, Card, Container, Section } from '../ui'

export function SeniorGuideSection() {
  return (
    <Section id="guia-senior" tone="white">
      <Container>
        <Card
          className="relative overflow-hidden p-0 shadow-soft"
          tone="highlight"
        >
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(232,62,115,0.1),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.96),rgba(255,241,245,0.78))]"
            aria-hidden="true"
          />
          <div className="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:p-10">
            <div>
              <Badge tone="soft">Senior</Badge>
              <h2 className="mt-5 text-[2rem] font-semibold leading-tight text-vetkathia-text sm:text-5xl">
                Guía senior en preparación
              </h2>
	              <p className="mt-5 max-w-2xl text-base leading-7 text-vetkathia-muted sm:text-lg sm:leading-8">
	                Estoy preparando una guía gratuita para tutores de perros y
	                gatos senior. Mientras tanto, puedes empezar por la Valoración
	                Nutricional si quieres revisar su caso dentro del plan elegido.
	              </p>
              <Button
                className="mt-7 w-full sm:w-auto"
                onClick={() =>
                  trackCTAClick(
                    'Ver planes',
                    'home guia senior',
                  )
                }
                to="/#planes"
              >
                Ver planes
              </Button>
            </div>

            <div className="rounded-[1.75rem] border border-vetkathia-border bg-white/78 p-5 shadow-card">
              <BookOpen
                className="h-10 w-10 text-vetkathia-primary"
                aria-hidden="true"
              />
              <p className="mt-5 font-sans text-2xl font-semibold leading-8 text-vetkathia-text">
                No es solo la edad.
              </p>
              <p className="mt-3 leading-7 text-vetkathia-muted">
                En animales senior conviene mirar rutina, apetito, digestión,
                peso, masa muscular y cambios recientes antes de modificar la
                alimentación.
              </p>
              <div className="mt-5 flex gap-3 rounded-[1.35rem] border border-vetkathia-border bg-vetkathia-surface/80 p-4">
                <HeartPulse
                  className="mt-0.5 h-5 w-5 shrink-0 text-vetkathia-primary-dark"
                  aria-hidden="true"
                />
                <p className="text-sm leading-6 text-vetkathia-muted">
                  La guía será informativa; no sustituirá una valoración
                  veterinaria del caso.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </Section>
  )
}
