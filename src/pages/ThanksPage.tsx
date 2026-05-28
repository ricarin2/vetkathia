import { AlertTriangle, CalendarClock, CheckCircle2 } from 'lucide-react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router'

import { CalendlyEmbed } from '../components/common/CalendlyEmbed'
import { trackCTAClick, trackThankYouView } from '../lib/analytics'
import { readSessionStorage } from '../lib/browserStorage'
import { integrations } from '../lib/integrations'
import { getSelectedPlan } from '../lib/planCheckout'
import { SEOHead } from '../components/common/SEOHead'
import { Badge, Button, Card, Container, Section } from '../components/ui'

const nextSteps = [
  'Revisaré la información enviada.',
  'Si falta algún dato, te lo pediré.',
  'Si hay signos que requieren atención presencial, te lo indicaré.',
]

function readCalendlyScheduled() {
  return readSessionStorage('vetkathia_calendly_scheduled') === 'true'
}

export function ThanksPage() {
  const [searchParams] = useSearchParams()
  const selectedPlan = getSelectedPlan(searchParams.get('plan'))
  const calendlyScheduled = readCalendlyScheduled()
  const calendlyUrl = selectedPlan ? integrations.calendlyUrls[selectedPlan] : ''
  const shouldShowCalendlyCta = Boolean(selectedPlan && !calendlyScheduled)

  useEffect(() => {
    trackThankYouView({
      calendlyScheduled,
      planKey: selectedPlan ?? undefined,
    })
  }, [calendlyScheduled, selectedPlan])

  return (
    <>
      <SEOHead
        canonicalPath="/gracias"
        description="Cuestionario recibido en VetKathia. Revisaré la información enviada para preparar el servicio contratado."
        noindex
        title="Cuestionario recibido | VetKathia"
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
              He recibido la información de tu perro o gato para preparar el
              servicio contratado.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                onClick={() => trackCTAClick('Volver al inicio', 'gracias')}
                to="/"
                variant="outline"
              >
                Volver al inicio
              </Button>
              {selectedPlan && shouldShowCalendlyCta && calendlyUrl ? (
                <Button
                  href="#reservar-cita"
                  leftIcon={
                    <CalendarClock className="h-5 w-5" aria-hidden="true" />
                  }
                  onClick={() =>
                    trackCTAClick('Reservar cita online', 'gracias')
                  }
                >
                  Reservar cita online
                </Button>
              ) : null}
              {!selectedPlan ? (
                <Button
                  onClick={() => trackCTAClick('Ver planes', 'gracias')}
                  to="/planes"
                >
                  Ver planes
                </Button>
              ) : null}
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
            {selectedPlan && shouldShowCalendlyCta && calendlyUrl ? (
              <div id="reservar-cita">
                <CalendlyEmbed planKey={selectedPlan} />
              </div>
            ) : selectedPlan && shouldShowCalendlyCta ? (
              <Card>
                <CalendarClock
                  className="h-6 w-6 text-vetkathia-primary"
                  aria-hidden="true"
                />
                <h2 className="mt-4 font-sans text-xl font-semibold leading-tight text-vetkathia-text">
                  Reserva tu cita online
                </h2>
                <p className="mt-3 leading-7 text-vetkathia-muted">
                  La agenda online no está configurada para este plan.
                </p>
                <Button className="mt-5" disabled fullWidth variant="outline">
                  Reservar cita online
                </Button>
              </Card>
            ) : null}

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
          </div>
        </Container>
      </Section>
    </>
  )
}
