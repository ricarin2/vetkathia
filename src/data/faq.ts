export type FaqItem = {
  content: string
  id: string
  title: string
}

export type FaqCategory = {
  id: string
  title: string
  description: string
  items: FaqItem[]
}

export const faqCategories: FaqCategory[] = [
  {
    description: 'Dudas habituales antes de decidir si VetKathia encaja con tu caso.',
    id: 'antes-de-contratar',
    items: [
      {
        content:
          'Si buscas orientación inicial, empieza por la Valoración Nutricional. Si necesitas un plan de alimentación completo con cantidades y transición, elige el Plan Personalizado. Si quieres revisión posterior y ajustes, elige Acompañamiento.',
        id: 'no-se-plan',
        title: '¿Qué plan elijo si tengo dudas?',
      },
      {
        content:
          'El servicio es online y está pensado para personas hispanohablantes. Los precios se muestran en euros; según tu país, tu banco o método de pago puede aplicar conversión de divisa.',
        id: 'pais-hispanohablante',
        title: '¿Puedo contratar desde cualquier país?',
      },
      {
        content:
          'Sí. Puedes contratar aunque tu perro o gato coma pienso, croquetas, concentrado o alimento seco. La idea es revisar el punto de partida y valorar si conviene mejorar cantidades, rutina, composición, transición o tipo de dieta sin hacer cambios bruscos.',
        id: 'sigue-con-pienso',
        title:
          '¿Puedo contratar si mi perro o gato come pienso, croquetas, concentrado o alimento seco?',
      },
      {
        content:
          'No. VetKathia no es solo BARF. Trabajo nutrición natural veterinaria con opciones como dieta cocinada, mixta, BARF, natural comercial o una mejora gradual de lo que ya come tu perro o gato.',
        id: 'solo-barf',
        title: '¿VetKathia es solo BARF?',
      },
      {
        content:
          'Sí. Puedes pedir ayuda para un gato. Los gatos tienen necesidades nutricionales propias y no deben tratarse como perros pequeños; por eso el plan de alimentación debe adaptarse a su especie, edad, salud, digestión y rutina.',
        id: 'gatos',
        title: '¿También trabajas con gatos?',
      },
      {
        content:
          'Sí. Puede ser adecuado para perros o gatos senior, especialmente si quieres revisar digestión, peso, apetito, rutina, tipo de dieta o transición. En animales mayores conviene actuar con prudencia y revisar el contexto veterinario.',
        id: 'seniors',
        title: '¿Es adecuado para perros o gatos senior?',
      },
    ],
    title: 'Antes de contratar',
  },
  {
    description: 'Qué incluye cada opción y qué puedes esperar de cada plan.',
    id: 'planes-entregables',
    items: [
      {
        content:
          'La Valoración Nutricional sirve para revisar la alimentación actual y orientarte sobre si conviene cambiar y por dónde empezar. El Plan Personalizado añade un plan de alimentación individual con cantidades, transición y recomendaciones prácticas. El Acompañamiento suma revisión posterior y ajustes del plan para aplicar los cambios con más apoyo.',
        id: 'diferencia-planes',
        title:
          '¿Qué diferencia hay entre valoración, plan personalizado y acompañamiento?',
      },
      {
        content:
          'No. La valoración nutricional orienta el punto de partida, revisa la alimentación actual y ayuda a decidir por dónde empezar. No incluye un plan completo ni cantidades detalladas.',
        id: 'valoracion-cantidades',
        title: '¿La valoración incluye cantidades?',
      },
      {
        content:
          'Sí. El Plan Personalizado incluye un plan de alimentación individual, cantidades, guía de transición y recomendaciones prácticas para aplicar en casa.',
        id: 'cantidades',
        title: '¿Recibiré cantidades y recomendaciones claras?',
      },
      {
        content:
          'El Plan Personalizado incluye la pauta completa, cantidades y transición. La revisión posterior y los ajustes quedan dentro del Plan con Acompañamiento.',
        id: 'seguimiento-personalizado',
        title: '¿El plan personalizado incluye seguimiento?',
      },
      {
        content:
          'Si necesitas resolver dudas durante la aplicación y revisar ajustes, el plan más adecuado es el Plan con Acompañamiento. La valoración y el plan personalizado tienen un alcance más concreto.',
        id: 'dudas-despues-plan',
        title: '¿Puedo resolver dudas después de recibir el plan?',
      },
    ],
    title: 'Planes y entregables',
  },
  {
    description: 'Qué ocurre después del pago y qué información se necesita.',
    id: 'despues-del-pago',
    items: [
      {
        content:
          'Eliges un plan, completas el pago seguro con Stripe, rellenas el cuestionario nutricional y reservas tu cita online con Calendly cuando la agenda está configurada para el plan correspondiente. Después preparo la valoración, el plan de alimentación o el acompañamiento contratado.',
        id: 'contratacion-online',
        title: '¿Cómo funciona la contratación online?',
      },
      {
        content:
          'Sí. Primero eliges plan y completas el pago. Después rellenas el cuestionario inicial. No se revisa el caso gratis antes de contratar.',
        id: 'pago-web',
        title: '¿Se paga antes de completar el cuestionario?',
      },
      {
        content:
          'Después de pagar continúas con el cuestionario nutricional y, cuando corresponda, con la reserva de la cita online. Esa información me ayuda a preparar la consulta o revisión con contexto.',
        id: 'despues-de-pagar',
        title: '¿Qué ocurre después de pagar?',
      },
      {
        content:
          'Necesitarás tus datos de contacto, datos básicos del animal, alimentación actual, objetivo, rutina y cualquier información de salud relevante. Si hay diagnósticos, medicación, síntomas, analíticas o análisis recientes, puedes indicarlo para revisar el caso con más contexto.',
        id: 'cuestionario-info',
        title: '¿Qué información necesito para el cuestionario?',
      },
      {
        content:
          'El plazo depende del caso y del plan elegido. Se confirma dentro del proceso para que sepas qué esperar antes de avanzar con la preparación del servicio.',
        id: 'plazo',
        title: '¿Cuánto tarda la entrega?',
      },
      {
        content:
          'Si quieres revisar más de un animal, lo ideal es contratar el servicio pensando en cada caso por separado, porque especie, edad, salud, rutina y alimentación pueden cambiar mucho entre animales.',
        id: 'mas-de-un-animal',
        title: '¿Puedo contratar para más de un perro o gato?',
      },
    ],
    title: 'Proceso después del pago',
  },
  {
    description: 'Alcance veterinario, prudencia clínica y situaciones no adecuadas.',
    id: 'patologias-limites',
    items: [
      {
        content:
          'Puedo ayudarte a revisar la alimentación desde un enfoque nutricional, pero si hay síntomas activos, diagnóstico o empeoramiento, el seguimiento con tu veterinario habitual es imprescindible. Puede ser necesario priorizar atención clínica, pruebas o coordinación veterinaria antes de ajustar la alimentación.',
        id: 'patologias',
        title: '¿Qué pasa si mi animal tiene una patología diagnosticada?',
      },
      {
        content:
          'No. Este servicio no sustituye a tu veterinario habitual, especialmente si hay patologías, medicación, pruebas pendientes o síntomas activos. El objetivo es aportar orientación nutricional dentro de límites claros.',
        id: 'veterinario-habitual',
        title: '¿Esto sustituye a mi veterinario habitual?',
      },
      {
        content:
          'No. La nutrición natural no promete curar enfermedades ni ofrece garantías de resultado médico. Puede ayudar a revisar y adaptar la alimentación con criterio, pero no sustituye diagnóstico, tratamiento ni seguimiento clínico cuando hacen falta.',
        id: 'cura-enfermedades',
        title: '¿La nutrición natural cura enfermedades?',
      },
      {
        content:
          'No es adecuado como primera vía si hay urgencias, empeoramiento rápido, dolor intenso, vómitos repetidos, dificultad respiratoria, sangrado, convulsiones, anorexia marcada o cualquier síntoma que requiera exploración presencial.',
        id: 'casos-no-adecuados',
        title: '¿Qué casos no son adecuados para este servicio online?',
      },
      {
        content:
          'Si es una urgencia, no esperes a una consulta de nutrición. Contacta con tu veterinario habitual o con un servicio veterinario de urgencias.',
        id: 'urgencias',
        title: '¿Qué hago si es una urgencia?',
      },
    ],
    title: 'Patologías y límites del servicio',
  },
  {
    description: 'Pago, cita, cambios y tratamiento básico de datos.',
    id: 'citas-datos',
    items: [
      {
        content:
          'El pago se gestiona mediante Stripe. VetKathia no almacena los datos de tu tarjeta. Si la contratación online no está configurada en algún momento, la web debe indicarlo de forma clara antes de continuar.',
        id: 'tarjeta-stripe',
        title: '¿VetKathia guarda los datos de mi tarjeta?',
      },
      {
        content:
          'La cita online se reserva con Calendly cuando la agenda esté configurada para el plan correspondiente. Normalmente se hace después del pago, junto con el cuestionario nutricional.',
        id: 'reserva-cita',
        title: '¿Cuándo reservo la cita?',
      },
      {
        content:
          'Puedes cambiar o cancelar la cita siguiendo las opciones disponibles en la confirmación de Calendly. Si necesitas moverla, lo ideal es hacerlo con la mayor antelación posible para liberar ese horario.',
        id: 'cancelar-cita',
        title: '¿Puedo cambiar o cancelar mi cita?',
      },
      {
        content:
          'Los datos de contacto y la información del cuestionario se usan para preparar el servicio contratado. VetKathia no envía datos clínicos a Stripe ni a Calendly; el cuestionario debe gestionarse mediante el formulario o backend configurado para ese fin.',
        id: 'datos',
        title: '¿Cómo se tratan mis datos?',
      },
    ],
    title: 'Citas, cambios y datos',
  },
]

export const faqItems = faqCategories.flatMap((category) => category.items)
