import type { AssessmentFormValues } from './assessmentSchema'
import { integrations } from './integrations'

const submitDelayMs = 650

export async function submitAssessment(values: AssessmentFormValues) {
  const endpoint = integrations.formEndpoint

  if (!endpoint) {
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
