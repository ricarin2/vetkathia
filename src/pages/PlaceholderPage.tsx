import { Button, Container, Section, SectionHeading } from '../components/ui'

type PlaceholderPageProps = {
  title: string
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <Section>
      <Container size="sm">
        <SectionHeading eyebrow="Próxima fase" title={title}>
          <p>
            Esta página queda preparada dentro del router. El contenido final se
            completará cuando se definan sus textos y necesidades concretas.
          </p>
        </SectionHeading>
        <Button className="mt-8" to="/">
          Volver al inicio
        </Button>
      </Container>
    </Section>
  )
}
