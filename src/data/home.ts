export const trustBenefits = [
  {
    description:
      'Alimentación actual, edad, salud, digestión, síntomas y rutina.',
    title: 'Reviso el caso',
  },
  {
    description:
      'Cocinada, mixta, BARF, natural comercial o mejora gradual si encaja.',
    title: 'Elegimos estrategia',
  },
  {
    description:
      'Una pauta clara, realista y aplicable sin improvisar.',
    title: 'Lo llevamos a casa',
  },
]

export const nutritionOptions = [
  'Mejora gradual',
  'Cocinada',
  'Mixta',
  'BARF',
  'Natural comercial',
]

export const guidedDecisionFactors = [
  'Edad',
  'Salud',
  'Digestión',
  'Rutina',
  'Alimentación actual',
  'Objetivo',
]

export const idealFor = [
  'Tienes un perro o un gato y quieres mejorar su alimentación.',
  'No sabes si su dieta actual cubre sus necesidades.',
  'Quieres pasar a comida cocinada, natural o BARF con criterio.',
  'Tu perro o gato tiene digestiones sensibles, sobrepeso o poca energía.',
  'Tienes un gato y quieres una pauta pensada para gatos, no adaptada desde un perro.',
  'Tienes un animal senior y quieres adaptar su alimentación.',
  'Buscas una pauta clara y acompañamiento profesional.',
]

export const idealForProfiles = [
  {
    description: 'Tienes dudas sobre cantidades, transición o tipo de dieta.',
    title: 'Quieres empezar con seguridad',
  },
  {
    description:
      'Digestiones delicadas, sobrepeso, poca energía o cambios que requieren calma.',
    title: 'Tu animal es senior o sensible',
  },
  {
    description:
      'La pauta debe pensarse para gatos, no adaptarse desde un perro.',
    title: 'Tienes un gato',
  },
  {
    description:
      'Recomendaciones claras para casa, según tu rutina real.',
    title: 'Buscas una pauta aplicable',
  },
]

export const methodSteps = [
  {
    description: 'Revisa precio, condiciones y qué incluye cada servicio.',
    title: 'Elige el plan',
  },
  {
    description: 'Stripe gestiona el pago seguro del plan.',
    title: 'Paga el plan de forma segura',
  },
  {
    description: 'Comparte alimentación, rutina, salud y objetivo.',
    title: 'Completa el cuestionario nutricional',
  },
  {
    description: 'Elige el horario que mejor encaje con Calendly.',
    title: 'Reserva tu cita online',
  },
  {
    description: 'Recibe valoración, pauta o seguimiento según el plan.',
    title: 'Recibe el servicio contratado',
  },
]

export const deliverables = [
  'Revisión del punto de partida y de la alimentación actual.',
  'Consulta online personalizada para resolver dudas.',
  'Recomendación del tipo de pauta que encaja mejor.',
  'Plan nutricional individual si eliges un plan completo.',
  'Seguimiento según plan.',
]

export const prePlanTrustCards = [
  {
    description:
      'Primero revisamos edad, salud, dieta actual, síntomas y rutina.',
    title: 'Sin cambios a ciegas',
  },
  {
    description:
      'La recomendación debe poder aplicarse en casa, sin complicaciones innecesarias.',
    title: 'Pautas realistas',
  },
  {
    description:
      'No se trata de seguir una moda, sino de elegir una estrategia segura para su caso.',
    title: 'Criterio veterinario',
  },
]

export const familyStoriesPlaceholder = {
  description:
    'Cuando tengamos reseñas verificadas, aparecerán aquí con permiso de las familias.',
  title: 'Experiencias reales',
}

export const homePlans = [
  {
    bestFor: 'Quieres una primera orientación profesional antes de cambiar la alimentación.',
    cta: 'Contratar valoración nutricional',
    description: 'Para saber si conviene cambiar y por dónde empezar.',
    includes: [
      'Cuestionario nutricional',
      'Consulta online',
      'Revisión de alimentación actual',
      'Orientación profesional',
    ],
    label: 'Para orientarte',
    name: 'Valoración Nutricional',
    price: '59 €',
  },
  {
    bestFor: 'Quieres una pauta completa con cantidades y transición.',
    cta: 'Contratar plan personalizado',
    description: 'Para tener cantidades, transición y una pauta completa.',
    includes: [
      'Plan nutricional individual',
      'Cantidades y pautas',
      'Guía de transición',
      'Recomendaciones prácticas',
    ],
    isRecommended: true,
    label: 'Para aplicar',
    name: 'Plan Personalizado',
    price: '89 €',
  },
  {
    bestFor: 'Quieres aplicar cambios con revisión posterior y ajustes.',
    cta: 'Contratar acompañamiento',
    description: 'Para aplicar cambios con revisión posterior y ajustes.',
    includes: [
      'Todo lo anterior',
      'Revisión posterior',
      'Ajustes del plan',
      'Seguimiento ampliado',
    ],
    label: 'Para acompañarte',
    name: 'Plan con Acompañamiento',
    price: '129 €',
  },
]

export const homeFaq = [
  {
    content:
      'No. BARF puede ser una opción en algunos casos, pero también trabajo con comida cocinada, comida natural comercial o transiciones progresivas.',
    id: 'solo-barf',
    title: '¿Es solo para BARF?',
  },
  {
    content:
      'Sí. Los gatos tienen necesidades nutricionales específicas. Tu gato no es un perro pequeño, así que su pauta debe plantearse con criterio propio.',
    id: 'gatos',
    title: '¿También trabajas con gatos?',
  },
  {
    content:
      'No. La prevención también importa. Antes de cambiar, revisa; no hace falta esperar a que aparezca un problema.',
    id: 'problema',
    title: '¿Mi perro o gato tiene que tener un problema?',
  },
  {
    content:
      'Sí. La consulta se realiza online para poder revisar el caso y orientar los siguientes pasos de forma clara.',
    id: 'online',
    title: '¿La consulta es online?',
  },
  {
    content:
      'En los planes que incluyen pauta personalizada, recibirás cantidades, recomendaciones prácticas y una guía de transición.',
    id: 'cantidades',
    title: '¿Recibiré cantidades y pautas claras?',
  },
  {
    content:
      'El plazo dependerá del caso y del plan elegido. Se confirmará antes de empezar para que sepas qué esperar.',
    id: 'plazo',
    title: '¿Cuánto tarda en entregarse el plan?',
  },
  {
    content:
      'No. Este servicio no sustituye una urgencia veterinaria ni el seguimiento clínico habitual, especialmente en casos complejos.',
    id: 'veterinario',
    title: '¿Esto sustituye a mi veterinario habitual?',
  },
  {
    content:
      'Si hay una patología, primero se revisa el contexto. En algunos casos será necesario coordinarse con tu veterinario habitual o resolver cuestiones clínicas antes de ajustar la alimentación.',
    id: 'patologia',
    title: '¿Qué pasa si mi animal tiene una patología?',
  },
  {
    content:
      'Si buscas orientación inicial, empieza por la Valoración Nutricional. Si necesitas una pauta completa con cantidades y transición, elige el Plan Personalizado. Si quieres revisión posterior y ajustes, elige Acompañamiento.',
    id: 'no-se-plan',
    title: '¿Qué plan elijo si tengo dudas?',
  },
  {
    content:
      'Sí. Para iniciar el servicio eliges un plan y completas el pago seguro con Stripe. Después rellenas el cuestionario nutricional y puedes reservar tu cita online con Calendly.',
    id: 'pago-web',
    title: '¿Se paga antes de empezar?',
  },
]
