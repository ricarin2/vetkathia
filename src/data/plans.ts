export const plans = [
  {
    bestFor:
      'Quieres una primera lectura profesional antes de invertir en una pauta completa.',
    cta: 'Contratar valoración nutricional',
    description: 'Para quien quiere claridad antes de cambiar nada.',
    includes: [
      'Cuestionario nutricional',
      'Consulta online',
      'Revisión de la alimentación actual',
      'Orientación profesional',
    ],
    name: 'Valoración Nutricional',
    notIncludes: ['Menú completo', 'Cantidades detalladas', 'Seguimiento'],
    price: '59 €',
  },
  {
    bestFor:
      'Quieres una pauta con cantidades, transición y recomendaciones que puedas aplicar.',
    cta: 'Contratar plan personalizado',
    description: 'Para quien quiere una pauta completa y aplicable.',
    includes: [
      'Todo lo anterior',
      'Plan nutricional individual',
      'Cantidades y pautas',
      'Guía de transición',
      'Recomendaciones prácticas',
    ],
    isRecommended: true,
    name: 'Plan Personalizado',
    notIncludes: ['Seguimiento ampliado', 'Canal de dudas definido'],
    price: '89 €',
  },
  {
    bestFor:
      'Quieres aplicar el cambio con más seguridad y tener un marco claro para ajustes.',
    cta: 'Contratar acompañamiento',
    description: 'Para quien quiere aplicar el cambio con más seguridad.',
    includes: [
      'Todo lo anterior',
      'Revisión posterior',
      'Ajustes del plan',
      'Seguimiento ampliado',
      'Canal de dudas definido',
    ],
    name: 'Plan con Acompañamiento',
    price: '129 €',
  },
]

export const plansFaq = [
  {
    content:
      'Sí. La valoración nutricional está pensada para entender el punto de partida y decidir con más claridad antes de cambiar la alimentación.',
    id: 'valoracion',
    title: '¿Puedo empezar solo con valoración?',
  },
  {
    content:
      'El plan personalizado y el plan con acompañamiento incluyen cantidades y pautas claras. La valoración inicial no incluye un menú completo ni cantidades detalladas.',
    id: 'cantidades',
    title: '¿El plan incluye cantidades?',
  },
  {
    content:
      'Primero se revisa el caso. Si la patología requiere atención clínica previa o coordinación con tu veterinario habitual, se indicará con claridad.',
    id: 'patologia',
    title: '¿Qué pasa si mi animal tiene una patología?',
  },
  {
    content:
      'Sí, en el plan con acompañamiento. El plan personalizado incluye la pauta, y el seguimiento ampliado queda reservado para el plan superior.',
    id: 'seguimiento',
    title: '¿Hay seguimiento?',
  },
  {
    content:
      'El plazo se confirma según el caso y el plan elegido. La idea es que sepas qué esperar antes de empezar.',
    id: 'entrega',
    title: '¿Cuánto tarda la entrega?',
  },
  {
    content:
      'Sí. La consulta es online para revisar la información, resolver dudas y orientar la pauta de forma práctica.',
    id: 'online',
    title: '¿La consulta es online?',
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
