import { ArrowRight, HelpCircle } from 'lucide-react'

import { faqItems } from '../data/faq'
import { createFaqPageStructuredData } from '../data/structuredData'
import { trackCTAClick, trackFAQOpen } from '../lib/analytics'
import { SEOHead } from '../components/common/SEOHead'
import { StructuredData } from '../components/common/StructuredData'
import {
  Accordion,
  Badge,
  Button,
  Card,
  Container,
  Section,
  SectionHeading,
} from '../components/ui'

export function FaqPage() {
  return (
    <>
      <SEOHead
        canonicalPath="/faq"
        description="Respuestas sobre dieta cocinada, BARF, alimentación mixta, gatos, seniors, transición segura, pago online y límites del servicio veterinario."
        title="FAQ sobre nutrición natural para perros y gatos | VetKathia"
      />
      <StructuredData
        data={createFaqPageStructuredData(
          faqItems.map((item) => ({
            answer: item.content,
            question: item.title,
          })),
        )}
      />

      <Section className="pb-8 pt-10 sm:pt-14 lg:pt-18">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge tone="soft">Dudas frecuentes</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-vetkathia-text sm:text-5xl lg:text-6xl">
              Preguntas frecuentes sobre nutrición natural veterinaria para
              perros y gatos
            </h1>
            <p className="mt-6 text-lg leading-8 text-vetkathia-muted">
              Respuestas claras antes de elegir un plan, pagar de forma segura
              y completar el cuestionario nutricional.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <Accordion
            className="mx-auto max-w-4xl"
            defaultOpenFirst
            items={faqItems}
            onItemOpen={(item) => trackFAQOpen(item.title)}
          />
        </Container>
      </Section>

      <Section tone="surface">
        <Container size="md">
          <Card className="text-center" tone="highlight">
            <HelpCircle
              className="mx-auto h-8 w-8 text-vetkathia-primary"
              aria-hidden="true"
            />
            <SectionHeading
              align="center"
              className="mt-5"
              title="¿Sigues con dudas sobre su caso?"
            >
              <p>
                Si buscas orientación inicial, empieza por la Valoración
                Nutricional. Después completarás el pago seguro con Stripe,
                rellenarás el cuestionario y reservarás tu cita online.
              </p>
            </SectionHeading>
            <Button
              className="mt-8"
              onClick={() =>
                trackCTAClick('Ver planes', 'faq final')
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
