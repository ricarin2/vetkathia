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

const pending = 'Pendiente de completar tras revisión profesional.'

export const legalPages: Record<LegalPageKey, LegalPageContent> = {
  legalNotice: {
    intro:
      'Información legal básica pendiente de completar antes de publicar la web en producción.',
    sections: [
      { content: pending, title: 'Responsable' },
      { content: pending, title: 'Finalidad' },
      { content: pending, title: 'Legitimación' },
      { content: pending, title: 'Destinatarios' },
      { content: pending, title: 'Derechos' },
      { content: pending, title: 'Contacto' },
    ],
    title: 'Aviso legal',
  },
  privacy: {
    intro:
      'Política de privacidad pendiente de revisión profesional, especialmente antes de activar formularios reales o herramientas externas.',
    sections: [
      { content: pending, title: 'Responsable' },
      { content: pending, title: 'Finalidad' },
      { content: pending, title: 'Legitimación' },
      { content: pending, title: 'Destinatarios' },
      { content: pending, title: 'Derechos' },
      { content: pending, title: 'Contacto' },
    ],
    title: 'Privacidad',
  },
  cookies: {
    intro:
      'Política de cookies pendiente de revisar cuando se definan las herramientas de analítica, formularios o integraciones.',
    sections: [
      { content: pending, title: 'Responsable' },
      { content: pending, title: 'Cookies utilizadas' },
      { content: pending, title: 'Finalidad' },
      { content: pending, title: 'Legitimación' },
      { content: pending, title: 'Destinatarios' },
      { content: pending, title: 'Derechos' },
      { content: pending, title: 'Contacto' },
    ],
    title: 'Cookies',
  },
  terms: {
    intro:
      'Condiciones del servicio pendientes de revisar antes de aceptar solicitudes definitivas, pagos o contratación online.',
    sections: [
      { content: pending, title: 'Responsable' },
      { content: pending, title: 'Condiciones del servicio' },
      { content: pending, title: 'Finalidad' },
      { content: pending, title: 'Legitimación' },
      { content: pending, title: 'Destinatarios' },
      { content: pending, title: 'Derechos' },
      { content: pending, title: 'Contacto' },
    ],
    title: 'Condiciones',
  },
}
