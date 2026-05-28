import type { AssessmentFormValues } from './assessmentSchema'
import { getIntegrationStatus, integrations } from './integrations'

const submitDelayMs = 650

export async function submitAssessment(values: AssessmentFormValues) {
  const integrationStatus = getIntegrationStatus()
  const endpoint = integrations.formEndpoint

  if (!integrationStatus.formConfigured) {
    if (!import.meta.env.DEV) {
      throw new Error(
        'El formulario no está configurado para recibir cuestionarios.',
      )
    }

    await new Promise((resolve) => window.setTimeout(resolve, submitDelayMs))
    return
  }

  const response = await fetch(endpoint, {
    body: JSON.stringify({
      ...values,
      submittedAt: new Date().toISOString(),
      source: 'VetKathia web',
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('No se pudo enviar el cuestionario.')
  }
}
