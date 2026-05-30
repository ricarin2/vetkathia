export type LegalPageKey = 'legalNotice' | 'privacy' | 'cookies' | 'terms'

export type LegalSection = {
  content: string
  title: string
}

export type LegalPageContent = {
  intro: string
  sections: LegalSection[]
  title: string
}

const missing = (field: string) => `[COMPLETAR: ${field}]`
const placeholderMarker = '[COMPLETAR:'
const internalOnlySectionTitles = new Set(['Datos pendientes de confirmación'])

const responsible = [
  `Responsable del sitio y de los servicios: ${missing('nombre completo o razón profesional responsable')}.`,
  `Identificación fiscal: ${missing('NIF/CIF si procede')}.`,
  `Domicilio o dirección profesional a efectos legales: ${missing('domicilio profesional si debe publicarse')}.`,
  `Contacto legal y de privacidad: ${missing('email de contacto legal')}.`,
].join(' ')

const healthLimits =
  'VetKathia presta servicios de orientación nutricional veterinaria online. No sustituye urgencias veterinarias, diagnóstico clínico presencial, pruebas, tratamiento ni el seguimiento del veterinario habitual en casos clínicos complejos o con síntomas activos.'

export const legalPages: Record<LegalPageKey, LegalPageContent> = {
  legalNotice: {
    intro:
      'Información legal editable de VetKathia. Completa los marcadores indicados antes de activar contratación o formularios reales en producción.',
    sections: [
      {
        content: responsible,
        title: 'Responsable',
      },
      {
        content:
          'Este sitio informa y permite contratar servicios online de nutrición natural veterinaria para perros y gatos. Los servicios disponibles son valoración nutricional, plan personalizado y plan con acompañamiento.',
        title: 'Actividad del sitio',
      },
      {
        content:
          'Los contenidos de la web tienen finalidad informativa y comercial. No deben interpretarse como diagnóstico individual, tratamiento médico ni indicación para retrasar atención veterinaria urgente.',
        title: 'Uso de la información',
      },
      {
        content: healthLimits,
        title: 'Limitación sanitaria',
      },
      {
        content:
          'Si tu perro o gato presenta síntomas graves, empeoramiento rápido, dolor intenso, vómitos repetidos, diarrea intensa, dificultad respiratoria, sangrado, convulsiones o decaimiento marcado, contacta con tu veterinario habitual o con un servicio de urgencias.',
        title: 'No urgencias veterinarias',
      },
      {
        content:
          'No se publican en esta versión datos no confirmados como colegio profesional, fiscalidad, NIF, domicilio fiscal o datos empresariales. Deben añadirse solo tras revisión profesional y confirmación documental.',
        title: 'Datos pendientes de confirmación',
      },
    ],
    title: 'Aviso legal',
  },
  privacy: {
    intro:
      'Política de privacidad editable para formularios, contratación online y agenda. Completa los marcadores antes de tratar solicitudes reales en producción.',
    sections: [
      {
        content: responsible,
        title: 'Responsable del tratamiento',
      },
      {
        content:
          'Los datos se tratan para gestionar la contratación online, preparar el servicio contratado, responder comunicaciones, recibir el cuestionario nutricional, coordinar la cita online y cumplir obligaciones administrativas o legales si aplican.',
        title: 'Finalidad del tratamiento',
      },
      {
        content:
          'La base jurídica puede incluir la ejecución del servicio contratado, la aplicación de medidas precontractuales, el consentimiento de la persona usuaria y el cumplimiento de obligaciones legales. Revisa esta base con asesoramiento profesional antes de publicar.',
        title: 'Base jurídica',
      },
      {
        content:
          'El cuestionario puede incluir información de salud del animal. Esa información se usa para preparar el servicio contratado y no debe enviarse a Stripe ni a Calendly. No incluyas información clínica de personas.',
        title: 'Datos del animal y salud',
      },
      {
        content:
          `Pueden intervenir proveedores tecnológicos necesarios para prestar el servicio, como Stripe para pagos, Calendly para agenda, proveedor de formularios o backend propio, hosting, email y analítica si se activa. Lista concreta de proveedores: ${missing('proveedores reales y enlaces a sus condiciones')}.`,
        title: 'Destinatarios y proveedores',
      },
      {
        content:
          `Algunos proveedores pueden tratar datos fuera del Espacio Económico Europeo, según su configuración y contratos. Revisar transferencias internacionales y garantías aplicables: ${missing('detalle de transferencias internacionales si aplican')}.`,
        title: 'Transferencias internacionales',
      },
      {
        content:
          `Los datos se conservarán durante el tiempo necesario para gestionar el servicio, posibles responsabilidades y obligaciones legales. Plazos concretos: ${missing('plazos de conservación definidos con asesoría')}.`,
        title: 'Plazo de conservación',
      },
      {
        content:
          `Puedes solicitar acceso, rectificación, supresión, oposición, limitación y portabilidad cuando proceda escribiendo a ${missing('email de privacidad')}. También puedes reclamar ante la autoridad de control competente si corresponde.`,
        title: 'Derechos',
      },
      {
        content:
          'Si se activa analítica, píxeles publicitarios o herramientas de medición, deben documentarse en la política de cookies y configurarse conforme a la normativa aplicable.',
        title: 'Cookies y analítica',
      },
    ],
    title: 'Privacidad',
  },
  cookies: {
    intro:
      'Política de cookies editable. Completa herramientas reales antes de activar analítica, píxeles o cookies no técnicas.',
    sections: [
      {
        content: responsible,
        title: 'Responsable',
      },
      {
        content:
          'La web puede usar cookies técnicas necesarias para su funcionamiento. Si se activan cookies de analítica, publicidad, vídeo, redes sociales o medición, deberán describirse con nombre, proveedor, finalidad y duración.',
        title: 'Cookies utilizadas',
      },
      {
        content:
          `Herramientas previstas o activas: ${missing('Google Analytics, Meta Pixel, TikTok Pixel, Calendly, Stripe u otras si aplican')}. No declares herramientas que no estén realmente instaladas.`,
        title: 'Herramientas y proveedores',
      },
      {
        content:
          'Las cookies pueden usarse para funcionamiento técnico, seguridad, medición agregada, atribución de campañas o mejora de la experiencia, siempre según la configuración real y el consentimiento requerido.',
        title: 'Finalidad',
      },
      {
        content:
          `Indica cómo puede la persona usuaria aceptar, rechazar o configurar cookies cuando se implemente el banner o gestor correspondiente: ${missing('mecanismo de gestión de consentimiento')}.`,
        title: 'Gestión del consentimiento',
      },
      {
        content:
          'Si se usan proveedores con tratamiento internacional de datos, deben revisarse sus garantías y documentarse en privacidad y cookies.',
        title: 'Transferencias internacionales',
      },
    ],
    title: 'Cookies',
  },
  terms: {
    intro:
      'Condiciones de contratación editables para servicios online de nutrición veterinaria. Completa los marcadores antes de aceptar pagos reales en producción.',
    sections: [
      {
        content: responsible,
        title: 'Responsable',
      },
      {
        content:
          'VetKathia ofrece servicios online de nutrición natural veterinaria para perros y gatos: Valoración Nutricional, Plan Personalizado y Plan con Acompañamiento. Cada plan incluye lo indicado en la página de planes vigente en el momento de contratar.',
        title: 'Condiciones de contratación',
      },
      {
        content:
          'El flujo de contratación es: elegir plan, aceptar condiciones, pagar mediante Stripe, completar el cuestionario nutricional y reservar cita online con Calendly cuando la agenda esté configurada para el plan correspondiente.',
        title: 'Proceso de contratación',
      },
      {
        content:
          'El pago se gestiona mediante Stripe. VetKathia no almacena datos de tarjeta. La contratación no debe activarse en producción si estas condiciones, privacidad y cookies no están revisadas y completadas.',
        title: 'Pago seguro',
      },
      {
        content:
          `Puedes cancelar o cambiar la cita siguiendo las opciones disponibles en Calendly. Política de cambios, plazos mínimos y condiciones: ${missing('política real de cancelación y cambios')}.`,
        title: 'Política de cancelación y cambios',
      },
      {
        content:
          `Política de reembolso: ${missing('definir si procede reembolso, supuestos, plazos y exclusiones antes de activar pagos reales')}.`,
        title: 'Política de reembolso',
      },
      {
        content:
          'La información de salud del animal facilitada en el cuestionario se usará para preparar el servicio contratado. Si el caso requiere atención clínica previa, pruebas o seguimiento presencial, VetKathia podrá indicarlo antes de ajustar la alimentación.',
        title: 'Cuestionario nutricional',
      },
      {
        content: healthLimits,
        title: 'Limitación sanitaria',
      },
      {
        content:
          'Este servicio no atiende urgencias. Ante síntomas graves o empeoramiento, contacta con un servicio veterinario de urgencias o con tu veterinario habitual.',
        title: 'No urgencias veterinarias',
      },
      {
        content:
          'En animales con patologías, medicación, síntomas activos o casos complejos, el seguimiento con el veterinario habitual puede ser imprescindible. VetKathia no sustituye ese seguimiento.',
        title: 'No sustitución del veterinario habitual',
      },
    ],
    title: 'Condiciones',
  },
}

const publishedLegalIntros: Record<LegalPageKey, string> = {
  cookies:
    'Información sobre cookies y herramientas técnicas utilizadas por VetKathia.',
  legalNotice:
    'Información legal de VetKathia y límites de uso de la web.',
  privacy:
    'Información sobre el tratamiento de datos en formularios, contratación online y agenda.',
  terms:
    'Condiciones aplicables a la contratación online de servicios VetKathia.',
}

function hasPlaceholder(value: string) {
  return value.includes(placeholderMarker)
}

function findSection(page: LegalPageKey, title: string) {
  return legalPages[page].sections.find((section) => section.title === title)
}

function pageHasPlaceholders(page: LegalPageKey) {
  const content = legalPages[page]

  return (
    hasPlaceholder(content.intro) ||
    content.sections.some((section) => hasPlaceholder(section.content))
  )
}

function sectionIsCompleted(page: LegalPageKey, title: string) {
  const section = findSection(page, title)

  return Boolean(section && !hasPlaceholder(section.content))
}

export function getLegalIntro(
  page: LegalPageKey,
  legalContentReady: boolean,
) {
  return legalContentReady ? publishedLegalIntros[page] : legalPages[page].intro
}

export function getVisibleLegalSections(
  page: LegalPageKey,
  legalContentReady: boolean,
) {
  const sections = legalPages[page].sections

  if (!legalContentReady) return sections

  return sections.filter(
    (section) =>
      !internalOnlySectionTitles.has(section.title) &&
      !hasPlaceholder(section.content),
  )
}

export function hasLegalPlaceholders() {
  return (Object.keys(legalPages) as LegalPageKey[]).some(pageHasPlaceholders)
}

export function getLegalReadinessStatus(contactEmail = '') {
  const contactConfigured = Boolean(contactEmail.trim())
  const responsibleConfigured =
    sectionIsCompleted('legalNotice', 'Responsable') &&
    sectionIsCompleted('privacy', 'Responsable del tratamiento') &&
    sectionIsCompleted('terms', 'Responsable')
  const privacyConfigured = !pageHasPlaceholders('privacy')
  const cancellationRefundConfigured =
    sectionIsCompleted('terms', 'Política de cancelación y cambios') &&
    sectionIsCompleted('terms', 'Política de reembolso')
  const legalPlaceholdersResolved = !hasLegalPlaceholders()
  const ready =
    contactConfigured &&
    responsibleConfigured &&
    privacyConfigured &&
    cancellationRefundConfigured &&
    legalPlaceholdersResolved
  const missingItems = [
    !contactConfigured ? 'contacto legal' : '',
    !responsibleConfigured ? 'responsable' : '',
    !privacyConfigured ? 'privacidad' : '',
    !cancellationRefundConfigured ? 'cancelación y reembolso' : '',
    !legalPlaceholdersResolved ? 'marcadores legales pendientes' : '',
  ].filter(Boolean)

  return {
    cancellationRefundConfigured,
    contactConfigured,
    legalPlaceholdersResolved,
    missingItems,
    privacyConfigured,
    ready,
    responsibleConfigured,
  }
}
