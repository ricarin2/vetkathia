import { ArrowLeft, ClipboardList } from 'lucide-react'

import { SEOHead } from '../components/common/SEOHead'
import { Badge, Button, Card, Container, Section } from '../components/ui'
import { trackCTAClick } from '../lib/analytics'

export function NotFoundPage() {
  return (
    <>
      <SEOHead
        canonicalPath="/404"
        description="Página no encontrada en VetKathia."
        noindex
        title="Página no encontrada | VetKathia"
      />

      <Section className="pb-10 pt-10 sm:pt-14 lg:pt-18" tone="surface">
        <Container size="md">
          <Card className="text-center shadow-soft" tone="highlight">
            <Badge tone="soft">404</Badge>
            <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-semibold leading-tight text-vetkathia-text sm:text-5xl lg:text-6xl">
              Página no encontrada
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-vetkathia-muted">
              La página que buscas no existe o se ha movido.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Button
                leftIcon={<ArrowLeft className="h-5 w-5" aria-hidden="true" />}
                onClick={() => trackCTAClick('Volver al inicio', '404')}
                to="/"
                variant="outline"
              >
                Volver al inicio
              </Button>
              <Button
                leftIcon={
                  <ClipboardList className="h-5 w-5" aria-hidden="true" />
                }
                onClick={() => trackCTAClick('Ver planes', '404')}
                to="/#planes"
              >
                Ver planes
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  )
}
