export type TestimonialCase = {
  id: string
  petName: string
  species: 'perro' | 'gato'
  ageLabel?: string
  caseType: string
  shortQuote: string
  guardianLabel: string
  context: string
  approach: string
  observedChange: string
  photoSrc?: string
  photoAlt?: string
  hasConsent: boolean
  consentNotes?: string
  isDemo?: boolean
}

export const testimonialCases: TestimonialCase[] = [
  {
    approach:
      'Se revisó alimentación actual, tolerancia digestiva, rutina y recomendaciones clínicas previas.',
    caseType: 'Digestión sensible / caso pancreático',
    consentNotes:
      'Caso de estructura interna. No publicar hasta contar con permiso explícito de la familia.',
    context:
      'Su familia quería adaptar la alimentación con más seguridad por antecedentes digestivos.',
    guardianLabel: 'Familia de Thor',
    hasConsent: false,
    id: 'thor',
    observedChange:
      'La familia reportó mejor comprensión de la pauta y una transición más ordenada.',
    petName: 'Thor',
    shortQuote: 'Nos ayudó a entender cómo avanzar sin improvisar.',
    species: 'perro',
    ageLabel: 'Senior',
  },
  {
    approach:
      'Se ordenó la transición por fases y se revisaron tolerancia digestiva, rutina y cantidades orientativas.',
    caseType: 'Transición segura',
    consentNotes: 'Caso demo para visualizar diseño. Sustituir por caso real con permiso.',
    context:
      'Caso de ejemplo para mostrar cómo se explicaría una transición alimentaria.',
    guardianLabel: 'Formato demo',
    hasConsent: false,
    id: 'demo-luna',
    isDemo: true,
    observedChange:
      'Se muestra cómo podría explicarse una transición más ordenada.',
    petName: 'Luna',
    shortQuote: 'Ahora sabemos por dónde empezar sin improvisar.',
    species: 'perro',
    ageLabel: 'Adulto',
  },
  {
    approach:
      'Se planteó una pauta con foco en especie, hábitos de ingesta y necesidades propias del gato.',
    caseType: 'Gato / pauta individual',
    consentNotes: 'Caso demo para visualizar diseño. Sustituir por caso real con permiso.',
    context:
      'Caso de ejemplo para mostrar cómo se explicaría una pauta pensada para gato.',
    guardianLabel: 'Formato demo',
    hasConsent: false,
    id: 'demo-milo',
    isDemo: true,
    observedChange:
      'Se muestra cómo podría explicarse mayor claridad sobre cantidades y transición.',
    petName: 'Milo',
    shortQuote: 'Entendimos mejor qué necesita un gato.',
    species: 'gato',
    ageLabel: 'Adulto',
  },
  {
    approach:
      'Se revisaron edad, rutina, alimentación actual y margen de cambios realista para casa.',
    caseType: 'Senior / revisión de pauta',
    consentNotes: 'Caso demo para visualizar diseño. Sustituir por caso real con permiso.',
    context:
      'Caso de ejemplo para mostrar cómo se explicaría una revisión en etapa senior.',
    guardianLabel: 'Formato demo',
    hasConsent: false,
    id: 'demo-nala',
    isDemo: true,
    observedChange:
      'Se muestra cómo podría explicarse una pauta adaptada a la rutina.',
    petName: 'Nala',
    shortQuote: 'Una forma clara de revisar su alimentación.',
    species: 'perro',
    ageLabel: 'Senior',
  },
]

export const publicTestimonialCases = testimonialCases.filter(
  (testimonialCase) => testimonialCase.hasConsent,
)

export const demoTestimonialCases = testimonialCases.filter(
  (testimonialCase) => testimonialCase.isDemo,
)

const demoCasesFlag = import.meta.env.VITE_SHOW_DEMO_CASES
const shouldShowDemoCases =
  import.meta.env.DEV && demoCasesFlag !== 'false'

export const hasPublicTestimonialCases = publicTestimonialCases.length > 0
export const hasDemoTestimonialCases =
  !hasPublicTestimonialCases && shouldShowDemoCases && demoTestimonialCases.length > 0

export const displayTestimonialCases = hasPublicTestimonialCases
  ? publicTestimonialCases
  : shouldShowDemoCases
    ? demoTestimonialCases
    : []

export const homeTestimonialCases = displayTestimonialCases.slice(0, 3)
