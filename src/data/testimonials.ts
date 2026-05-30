export type TestimonialCase = {
  id: string
  petName: string
  species: 'perro' | 'gato'
  ageLabel?: string
  caseType: string
  shortQuote: string
  homeQuote?: string
  quoteMode?: 'literal' | 'summary'
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
      'Se revisó la alimentación de partida y se planteó una alternativa nutricional más tolerable para su caso.',
    caseType: 'Digestión sensible',
    consentNotes:
      'Permiso aportado por la familia para publicar la historia.',
    context:
      'Su familia buscaba una alternativa porque no toleraba bien distintos piensos.',
    guardianLabel: 'Liz J. · Tutora de Tirma',
    hasConsent: true,
    homeQuote:
      'Ahora la noto más activa, hace bien sus caquitas y estoy muy contenta.',
    id: 'tirma',
    observedChange:
      'Su familia indicó más actividad, mejores heces y mayor bienestar percibido.',
    photoAlt: 'Tirma, perra pastor alemán compartida por su familia',
    photoSrc: '/images/cases/tirma.png',
    petName: 'Tirma',
    quoteMode: 'literal',
    shortQuote:
      'A mi perro, una pastor alemán de 3 años, no le sentaba bien ningún pienso. Siempre terminaba por tener el estómago flojo, daba igual el pienso. Me recomendaron probar con una nutricionista canina y aquí estoy muy contenta. La perra ahora la noto más activa, hace bien sus caquitas y contenta estoy yo.',
    species: 'perro',
    ageLabel: '3 años',
  },
  {
    approach:
      'Se revisó la alimentación previa y se trabajó una dieta cocinada adaptada al caso.',
    caseType: 'Diarreas recurrentes',
    consentNotes:
      'Permiso aportado por la familia. Se publica como resumen porque el texto original menciona otro nombre profesional.',
    context:
      'Caso con problemas digestivos asociados a distintos piensos antes de revisar la alimentación.',
    guardianLabel: 'Alberto A. · Tutor de Thunder',
    hasConsent: true,
    homeQuote:
      'Con la dieta cocinada, su familia refirió una mejora clara de las diarreas.',
    id: 'thunder',
    observedChange:
      'Su familia refirió una mejora clara de las diarreas tras empezar la dieta cocinada.',
    photoAlt: 'Thunder, perro compartido por su familia',
    photoSrc: '/images/cases/thunder.png',
    petName: 'Thunder',
    quoteMode: 'summary',
    shortQuote:
      'La familia de Thunder estaba preocupada por diarreas recurrentes asociadas a distintos piensos. Tras revisar la alimentación y aplicar una dieta cocinada, refirió una mejora clara.',
    species: 'perro',
  },
  {
    approach:
      'Se ofreció orientación nutricional para que la familia pudiera tomar decisiones con más seguridad.',
    caseType: 'Orientación nutricional',
    consentNotes:
      'Permiso aportado por la familia. Se publica como resumen porque el texto original menciona otro nombre profesional.',
    context:
      'Familia que buscaba orientación profesional para mejorar la alimentación.',
    guardianLabel: 'Francisco R. · Tutor de Kenzo',
    hasConsent: true,
    homeQuote:
      'Confiamos en sus conocimientos de nutrición canina y quedamos muy satisfechos.',
    id: 'kenzo',
    observedChange:
      'Su familia expresó satisfacción con la orientación nutricional recibida.',
    photoAlt: 'Kenzo, perro compartido por su familia',
    photoSrc: '/images/cases/kenzo.png',
    petName: 'Kenzo',
    quoteMode: 'summary',
    shortQuote:
      'La familia de Kenzo buscaba orientación nutricional y destacó la confianza en los conocimientos de nutrición canina y la satisfacción con el acompañamiento.',
    species: 'perro',
  },
  {
    approach:
      'Se acompañó la aplicación de cambios alimentarios de forma gradual y revisable.',
    caseType: 'Aplicación del cambio',
    consentNotes:
      'Permiso aportado por la familia para publicar la historia.',
    context:
      'Perrita en proceso de aplicar cambios en su alimentación.',
    guardianLabel: 'Sara F. · Tutora de Roma',
    hasConsent: true,
    homeQuote:
      'Estamos poniendo todo en práctica y ha mejorado sus heces; se ve mucho mejor.',
    id: 'roma',
    observedChange:
      'Su familia indicó mejoría de las heces y mejor aspecto general durante la aplicación.',
    photoAlt: 'Roma, perrita compartida por su familia',
    photoSrc: '/images/cases/roma.png',
    petName: 'Roma',
    quoteMode: 'literal',
    shortQuote:
      'Estamos poniendo todo en práctica y la perrita ha mejorado sus heces y se ve mucho mejor.',
    species: 'perro',
  },
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
      'La familia reportó mejor comprensión del plan y una transición más ordenada.',
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
      'Se planteó un plan con foco en especie, hábitos de ingesta y necesidades propias del gato.',
    caseType: 'Gato / plan individual',
    consentNotes: 'Caso demo para visualizar diseño. Sustituir por caso real con permiso.',
    context:
      'Caso de ejemplo para mostrar cómo se explicaría un plan pensado para gato.',
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
    caseType: 'Senior / revisión del plan',
    consentNotes: 'Caso demo para visualizar diseño. Sustituir por caso real con permiso.',
    context:
      'Caso de ejemplo para mostrar cómo se explicaría una revisión en etapa senior.',
    guardianLabel: 'Formato demo',
    hasConsent: false,
    id: 'demo-nala',
    isDemo: true,
    observedChange:
      'Se muestra cómo podría explicarse un plan adaptado a la rutina.',
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
  import.meta.env.DEV && demoCasesFlag === 'true'

export const hasPublicTestimonialCases = publicTestimonialCases.length > 0
export const hasDemoTestimonialCases =
  !hasPublicTestimonialCases && shouldShowDemoCases && demoTestimonialCases.length > 0

export const displayTestimonialCases = hasPublicTestimonialCases
  ? publicTestimonialCases
  : shouldShowDemoCases
    ? demoTestimonialCases
    : []

export const homeTestimonialCases = displayTestimonialCases.slice(0, 4)
