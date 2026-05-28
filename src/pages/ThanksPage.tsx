import { AlertTriangle, ArrowRight, CheckCircle2, FileText } from 'lucide-react'

import { createBreadcrumbStructuredData } from '../data/structuredData'
import { trackCTAClick } from '../lib/analytics'
import { SEOHead } from '../components/common/SEOHead'
import { StructuredData } from '../components/common/StructuredData'
import { Badge, Button, Card, Container, Section } from '../components/ui'

const nextSteps = [
  'Revisaré los datos enviados según el plan elegido.',
  'Prepararé la valoración, pauta o seguimiento que corresponda al servicio contratado.',
  'Si el caso necesita atención clínica previa, te lo diré con claridad.',
]

export function ThanksPage() {
  return (
    <>
      <SEOHead
        canonicalPath="/gracias"
        description="Cuestionario recibido en VetKathia. Revisaré la información enviada según el plan elegido."
        noindex
        title="Cuestionario recibido | VetKathia"
      />
      <StructuredData
        data={createBreadcrumbStructuredData([
          { name: 'Inicio', path: '/' },
          { name: 'Gracias', path: '/gracias' },
        ])}
      />

      <Section className="pt-10 sm:pt-14 lg:pt-18">
        <Container size="md">
          <Card className="text-center" tone="highlight">
            <Badge tone="soft">Cuestionario enviado</Badge>
            <CheckCircle2
              className="mx-auto mt-7 h-12 w-12 text-vetkathia-primary"
              aria-hidden="true"
            />
            <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-semibold leading-tight text-vetkathia-text sm:text-5xl lg:text-6xl">
              Cuestionario recibido
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-vetkathia-muted">
              Gracias por completar la información de tu perro o gato. Revisaré
              el caso según el plan elegido.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                onClick={() => trackCTAClick('Volver al inicio', 'gracias')}
                to="/"
                variant="outline"
              >
                Volver al inicio
              </Button>
              <Button
                onClick={() => trackCTAClick('Ver planes', 'gracias')}
                rightIcon={<ArrowRight className="h-5 w-5" aria-hidden="true" />}
                to="/planes"
              >
                Ver planes
              </Button>
            </div>
          </Card>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card>
            <h2 className="font-sans text-2xl font-semibold leading-tight text-vetkathia-text">
              Qué ocurre ahora
            </h2>
            <div className="mt-6 grid gap-4">
              {nextSteps.map((step, index) => (
                <div className="flex gap-3" key={step}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-vetkathia-surface text-sm font-semibold text-vetkathia-primary-dark">
                    {index + 1}
                  </span>
                  <p className="pt-1 leading-7 text-vetkathia-muted">{step}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-6">
            <Card tone="warm">
              <div className="flex gap-3">
                <AlertTriangle
                  className="mt-1 h-5 w-5 shrink-0 text-vetkathia-primary-dark"
                  aria-hidden="true"
                />
                <p className="leading-7 text-vetkathia-text">
                  Si tu animal presenta síntomas graves, no esperes mi
                  respuesta: contacta con tu veterinario habitual o con un
                  servicio de urgencias.
                </p>
              </div>
            </Card>

            <Card>
              <FileText
                className="h-6 w-6 text-vetkathia-primary"
                aria-hidden="true"
              />
              <h2 className="mt-4 font-sans text-xl font-semibold leading-tight text-vetkathia-text">
                Guía senior en preparación
              </h2>
              <p className="mt-3 leading-7 text-vetkathia-muted">
                Estoy preparando una guía gratuita para tutores de perros y
                gatos senior. Cuando esté lista, podrá añadirse una captación
                específica.
              </p>
              <Button
                className="mt-5"
                href="/#guia-senior"
                onClick={() => trackCTAClick('Ver guía senior', 'gracias')}
                variant="outline"
              >
                Ver estado de la guía
              </Button>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  )
}
