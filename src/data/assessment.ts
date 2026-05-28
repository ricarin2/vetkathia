export const currentFoodOptions = [
  'Pienso',
  'Lata/húmeda',
  'Natural comercial',
  'Cocinada casera',
  'BARF',
  'Mixta',
  'Otra',
]

export const mainReasonOptions = [
  'Quiero mejorar su alimentación',
  'Es senior',
  'Tiene digestiones sensibles',
  'Tiene una patología',
  'Quiero pasar a comida natural',
  'Tiene sobrepeso',
  'Ha perdido músculo',
  'Tengo dudas con cantidades',
  'Otro',
]

export const objectiveOptions = [
  'Valoración inicial',
  'Plan personalizado',
  'Plan con acompañamiento',
]

export const symptomOptions = [
  'Vómitos',
  'Diarreas',
  'Estreñimiento',
  'Picores',
  'Dolor o movilidad',
  'Cambios de apetito',
  'Cambios de peso',
  'Más sed u orina',
  'Ninguno relevante',
]

export const nextSteps = [
  'Eliges el plan.',
  'Pagas o reservas.',
  'Rellenas el cuestionario.',
  'Recibes valoración, pauta o seguimiento según corresponda.',
]

export const caseConcernToMainReason: Record<string, string> = {
  digestion: 'Tiene digestiones sensibles',
  'gato-selectivo': 'Otro',
  'no-se-por-donde-empezar': 'Quiero mejorar su alimentación',
  'problema-de-salud': 'Tiene una patología',
  senior: 'Es senior',
  transicion: 'Quiero pasar a comida natural',
}
