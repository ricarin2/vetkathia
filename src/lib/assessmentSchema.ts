import type { FieldErrors, Resolver } from 'react-hook-form'
import { z } from 'zod'

const requiredText = (message: string) => z.string().trim().min(1, message)

export const assessmentSchema = z.object({
  additionalComments: z.string().trim().optional(),
  age: requiredText('Indica la edad aproximada.'),
  cityCountry: requiredText('Indica tu país o ciudad.'),
  current_path: z.string().trim().optional(),
  currentFood: requiredText('Selecciona la alimentación actual.'),
  diagnosticConditions: z.string().trim().optional(),
  email: z
    .string()
    .trim()
    .min(1, 'Indica tu email.')
    .email('Introduce un email válido.'),
  mainReason: requiredText('Selecciona el motivo principal.'),
  landing_page: z.string().trim().optional(),
  medication: z.string().trim().optional(),
  objective: requiredText('Selecciona el objetivo del cuestionario.'),
  petName: requiredText('Indica el nombre del animal.'),
  phone: requiredText('Indica tu teléfono.').min(
    6,
    'Introduce un teléfono válido.',
  ),
  privacyAccepted: z.boolean().refine((value) => value, {
    message: 'Debes aceptar la política de privacidad.',
  }),
  recentBloodwork: z.string().trim().optional(),
  referrer: z.string().trim().optional(),
  selectedPlan: z.string().trim().optional(),
  breed: z.string().trim().optional(),
  neutered: z.string().trim().optional(),
  name: requiredText('Indica tu nombre.'),
  species: requiredText('Selecciona si es perro o gato.'),
  symptoms: z.array(z.string()).optional(),
  urgencyAccepted: z.boolean().refine((value) => value, {
    message: 'Debes confirmar que entiendes el aviso de urgencias.',
  }),
  utm_campaign: z.string().trim().optional(),
  utm_content: z.string().trim().optional(),
  utm_medium: z.string().trim().optional(),
  utm_source: z.string().trim().optional(),
  utm_term: z.string().trim().optional(),
  weight: requiredText('Indica el peso aproximado.'),
})

export type AssessmentFormValues = z.infer<typeof assessmentSchema>

export const assessmentResolver: Resolver<AssessmentFormValues> = async (
  values,
  _context,
  options,
) => {
  const result = assessmentSchema.safeParse(values)

  if (result.success) {
    return {
      errors: {},
      values: result.data,
    }
  }

  const validatedFields = options.names?.length
    ? new Set<string>(options.names)
    : null
  const fieldErrors = result.error.flatten().fieldErrors
  const filteredErrors = Object.entries(fieldErrors).filter(
    ([field]) => !validatedFields || validatedFields.has(field),
  )
  const errors = Object.fromEntries(
    filteredErrors.map(([field, messages]) => [
      field,
      {
        message: messages?.[0],
        type: 'validation',
      },
    ]),
  ) as FieldErrors<AssessmentFormValues>

  return {
    errors,
    values: filteredErrors.length ? {} : values,
  }
}
