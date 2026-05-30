import { AlertTriangle } from 'lucide-react'

import type { LegalPageKey } from '../data/legal'
import { getLegalIntro, getVisibleLegalSections, legalPages } from '../data/legal'
import { createBreadcrumbStructuredData } from '../data/structuredData'
import { getIntegrationStatus, integrations } from '../lib/integrations'
import { SEOHead } from '../components/common/SEOHead'
import { StructuredData } from '../components/common/StructuredData'
import { Badge, Card, Container, Section } from '../components/ui'

type LegalPageProps = {
  page: LegalPageKey
}

function createSectionId(title: string) {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const legalSeo: Record<
  LegalPageKey,
  { canonicalPath: string; description: string; title: string }
> = {
  cookies: {
    canonicalPath: '/cookies',
    description:
      'Información sobre cookies de VetKathia pendiente de revisión profesional.',
    title: 'Política de cookies | VetKathia',
  },
  legalNotice: {
    canonicalPath: '/aviso-legal',
    description:
      'Aviso legal de VetKathia pendiente de revisión profesional.',
    title: 'Aviso legal | VetKathia',
  },
  privacy: {
    canonicalPath: '/privacidad',
    description:
      'Política de privacidad de VetKathia pendiente de revisión profesional.',
    title: 'Política de privacidad | VetKathia',
  },
  terms: {
    canonicalPath: '/condiciones',
    description:
      'Condiciones del servicio de VetKathia pendientes de revisión profesional.',
    title: 'Condiciones del servicio | VetKathia',
  },
}

export function LegalPage({ page }: LegalPageProps) {
  const content = legalPages[page]
  const seo = legalSeo[page]
  const legalContentReady = integrations.legalContentReady
  const integrationStatus = getIntegrationStatus()
  const visibleSections = getVisibleLegalSections(page, legalContentReady)
  const showProductionLegalWarning = import.meta.env.PROD && !legalContentReady
  const showLegalReadinessWarning =
    legalContentReady && !integrationStatus.legalReadiness.ready

  return (
    <>
      <SEOHead
        canonicalPath={seo.canonicalPath}
        description={seo.description}
        noindex
        title={seo.title}
      />
      <StructuredData
        data={createBreadcrumbStructuredData([
          { name: 'Inicio', path: '/' },
          { name: content.title, path: seo.canonicalPath },
        ])}
      />

      <Section className="pb-8 pt-10 sm:pt-14 lg:pt-18">
        <Container size="md">
          <Badge tone="soft">Información legal</Badge>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-vetkathia-text sm:text-5xl lg:text-6xl">
            {content.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-vetkathia-muted">
            {getLegalIntro(page, legalContentReady)}
          </p>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container size="md">
          {showProductionLegalWarning ? (
            <Card className="mb-6 border-vetkathia-primary" tone="highlight">
              <div className="flex gap-3">
                <AlertTriangle
                  className="mt-1 h-5 w-5 shrink-0 text-vetkathia-primary-dark"
                  aria-hidden="true"
                />
                <div>
                  <h2 className="font-sans text-xl font-semibold leading-tight text-vetkathia-text">
                    Sitio no listo para publicación
                  </h2>
                  <p className="mt-3 leading-7 text-vetkathia-muted">
                    Esta página legal contiene información pendiente de
                    completar. No publiques la web en producción hasta revisar
                    responsable, contacto, tratamiento de datos, cookies,
                    condiciones del servicio, fiscalidad y cobros.
                  </p>
                  <p className="mt-3 leading-7 text-vetkathia-muted">
                    No se han incluido datos inventados como NIF, domicilio,
                    empresa o responsable legal.
                  </p>
                </div>
              </div>
            </Card>
          ) : null}

          {!legalContentReady ? (
            <Card tone="warm">
              <div className="flex gap-3">
                <AlertTriangle
                  className="mt-1 h-5 w-5 shrink-0 text-vetkathia-primary-dark"
                  aria-hidden="true"
                />
                <p className="leading-7 text-vetkathia-text">
                  Pendiente de completar tras revisión profesional.
                </p>
              </div>
            </Card>
          ) : null}

          {showLegalReadinessWarning ? (
            <Card className="mt-6 border-vetkathia-primary/60" tone="warm">
              <div className="flex gap-3">
                <AlertTriangle
                  className="mt-1 h-5 w-5 shrink-0 text-vetkathia-primary-dark"
                  aria-hidden="true"
                />
                <p className="leading-7 text-vetkathia-text">
                  La contratación real sigue bloqueada hasta completar
                  responsable, privacidad, contacto legal y condiciones de
                  cancelación/reembolso.
                </p>
              </div>
            </Card>
          ) : null}

          <div className="mt-6 grid gap-4">
            {visibleSections.map((section) => (
              <Card
                className="scroll-mt-28 shadow-none"
                id={createSectionId(section.title)}
                key={section.title}
              >
                <h2 className="font-sans text-xl font-semibold leading-tight text-vetkathia-text">
                  {section.title}
                </h2>
                <p className="mt-3 leading-7 text-vetkathia-muted">
                  {section.content}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
