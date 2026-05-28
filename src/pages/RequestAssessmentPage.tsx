import {
  AlertTriangle,
  ClipboardList,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  PawPrint,
  ShieldCheck,
  Target,
  UserRound,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useMemo, useRef, useState, type ReactNode } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import type { FieldErrors, FieldPath } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import {
  caseConcernToMainReason,
  currentFoodOptions,
  mainReasonOptions,
  nextSteps,
  objectiveOptions,
  symptomOptions,
} from '../data/assessment'
import {
  assessmentResolver,
  type AssessmentFormValues,
} from '../lib/assessmentSchema'
import { trackCTAClick, trackFormStart, trackFormSubmit } from '../lib/analytics'
import { submitAssessment } from '../lib/submitAssessment'
import { getTrafficAttribution } from '../lib/trafficAttribution'
import { integrations } from '../lib/integrations'
import { getSelectedPlan, planLabels, type PlanKey } from '../lib/planCheckout'
import { createBreadcrumbStructuredData } from '../data/structuredData'
import { CalendlyPlaceholder } from '../components/common/CalendlyPlaceholder'
import { SEOHead } from '../components/common/SEOHead'
import { StructuredData } from '../components/common/StructuredData'
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Container,
  Input,
  Section,
  Select,
  Textarea,
} from '../components/ui'

const baseDefaultValues: AssessmentFormValues = {
  additionalComments: '',
  age: '',
  breed: '',
  cityCountry: '',
  currentFood: '',
  diagnosticConditions: '',
  email: '',
  mainReason: '',
  medication: '',
  name: '',
  neutered: '',
  objective: '',
  petName: '',
  phone: '',
  privacyAccepted: false,
  recentBloodwork: '',
  selectedPlan: '',
  species: '',
  symptoms: [],
  urgencyAccepted: false,
  weight: '',
}

type FormStep = {
  description: string
  fields: FieldPath<AssessmentFormValues>[]
  icon: LucideIcon
  title: string
}

const formSteps: FormStep[] = [
  {
    description: 'Datos básicos de contacto y del animal.',
    fields: [
      'name',
      'email',
      'phone',
      'cityCountry',
      'species',
      'petName',
      'age',
      'weight',
    ],
    icon: UserRound,
    title: 'Tutor y animal',
  },
  {
    description: 'Qué come ahora y qué te gustaría conseguir.',
    fields: ['currentFood', 'mainReason', 'objective'],
    icon: Target,
    title: 'Alimentación',
  },
  {
    description: 'Información opcional de salud, medicación y síntomas.',
    fields: [],
    icon: HeartPulse,
    title: 'Salud',
  },
  {
    description: 'Avisos veterinarios, privacidad y envío.',
    fields: ['privacyAccepted', 'urgencyAccepted'],
    icon: ShieldCheck,
    title: 'Enviar',
  },
]

const formFieldOrder: FieldPath<AssessmentFormValues>[] = formSteps.flatMap(
  (step) => step.fields,
)

function getCaseSelectorDefaults(searchParams: URLSearchParams) {
  const species = searchParams.get('especie')?.trim().toLowerCase()
  const concern = searchParams.get('preocupacion')?.trim() ?? ''

  return {
    mainReason: caseConcernToMainReason[concern] ?? '',
    species: species === 'perro' || species === 'gato' ? species : '',
  } satisfies Partial<AssessmentFormValues>
}

function getObjectiveForPlan(plan: PlanKey | null) {
  if (plan === 'valuation') return 'Valoración inicial'
  if (plan === 'personalized') return 'Plan personalizado'
  if (plan === 'accompaniment') return 'Plan con acompañamiento'

  return ''
}

function getStepIndexForField(field: string) {
  const stepIndex = formSteps.findIndex((step) =>
    step.fields.includes(field as FieldPath<AssessmentFormValues>),
  )

  return stepIndex >= 0 ? stepIndex : 0
}

function scrollAndFocusField(field: string) {
  window.setTimeout(() => {
    const fieldElement = document.querySelector<HTMLElement>(
      `[name="${field}"]`,
    )

    fieldElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    fieldElement?.focus({ preventScroll: true })
  }, 80)
}

export function RequestAssessmentPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const selectedPlan = getSelectedPlan(searchParams.get('plan'))
  const selectedPlanLabel = selectedPlan ? planLabels[selectedPlan] : ''
  const [currentStep, setCurrentStep] = useState(0)
  const currentFormStep = formSteps[currentStep]
  const hasTrackedFormStart = useRef(false)
  const attributionValues = useMemo(() => getTrafficAttribution(), [])
  const caseSelectorDefaults = useMemo(
    () => getCaseSelectorDefaults(searchParams),
    [searchParams],
  )
  const {
    clearErrors,
    formState: { errors, isSubmitting },
    getFieldState,
    handleSubmit,
    register,
    setError,
    trigger,
  } = useForm<AssessmentFormValues>({
    defaultValues: {
      ...baseDefaultValues,
      ...attributionValues,
      ...caseSelectorDefaults,
      objective: getObjectiveForPlan(selectedPlan),
      selectedPlan: selectedPlan ?? '',
    },
    resolver: assessmentResolver,
  })

  const handleFormStart = () => {
    if (hasTrackedFormStart.current) return

    hasTrackedFormStart.current = true
    trackFormStart(attributionValues)
  }

  const focusFirstStepError = (fields: FieldPath<AssessmentFormValues>[]) => {
    const firstInvalidField = fields.find((field) => getFieldState(field).invalid)

    if (firstInvalidField) scrollAndFocusField(firstInvalidField)
  }

  const handleNextStep = async () => {
    handleFormStart()

    if (!currentFormStep.fields.length) {
      setCurrentStep((step) => Math.min(step + 1, formSteps.length - 1))
      return
    }

    const isValid = await trigger(currentFormStep.fields, { shouldFocus: false })

    if (!isValid) {
      focusFirstStepError(currentFormStep.fields)
      return
    }

    clearErrors(currentFormStep.fields)
    setCurrentStep((step) => Math.min(step + 1, formSteps.length - 1))
  }

  const handlePreviousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 0))
  }

  const handleInvalidSubmit = (
    submitErrors: FieldErrors<AssessmentFormValues>,
  ) => {
    const firstInvalidField = formFieldOrder.find(
      (field) => submitErrors[field as keyof AssessmentFormValues],
    )

    if (!firstInvalidField) return

    setCurrentStep(getStepIndexForField(firstInvalidField))
    scrollAndFocusField(firstInvalidField)
  }

  const onSubmit = handleSubmit(async (values) => {
    try {
      await submitAssessment(values)
      trackFormSubmit({
        current_path: values.current_path,
        landing_page: values.landing_page,
        referrer: values.referrer,
        selectedPlan: values.selectedPlan,
        utm_campaign: values.utm_campaign,
        utm_content: values.utm_content,
        utm_medium: values.utm_medium,
        utm_source: values.utm_source,
        utm_term: values.utm_term,
      })
      navigate('/gracias')
    } catch {
      setError('root', {
        message:
          'No he podido enviar el cuestionario ahora mismo. Revisa tu conexión e inténtalo de nuevo.',
        type: 'submit',
      })
    }
  }, handleInvalidSubmit)

  return (
    <>
      <SEOHead
        canonicalPath="/solicitar-valoracion"
        description="Cuestionario inicial para revisar el caso de tu perro o gato según el plan de nutrición elegido."
        title="Cuestionario inicial | VetKathia"
      />
      <StructuredData
        data={createBreadcrumbStructuredData([
          { name: 'Inicio', path: '/' },
          {
            name: 'Cuestionario inicial',
            path: '/solicitar-valoracion',
          },
        ])}
      />

      <Section className="pb-8 pt-10 sm:pt-14 lg:pt-18">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge tone="soft">Cuestionario posterior</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-vetkathia-text sm:text-5xl lg:text-6xl">
              Cuestionario inicial
            </h1>
            <p className="mt-6 text-lg leading-8 text-vetkathia-muted">
              Completa la información necesaria para revisar el caso según el
              plan elegido.
            </p>
          </div>
        </Container>
      </Section>

      {!selectedPlan ? (
        <Section className="pt-0">
          <Container size="md">
            <Card className="text-center" tone="highlight">
              <Badge tone="soft">Primero elige un plan</Badge>
              <h2 className="mx-auto mt-5 max-w-2xl font-sans text-3xl font-black leading-tight text-vetkathia-text sm:text-4xl">
                Primero elige un plan
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-vetkathia-muted sm:text-lg sm:leading-8">
                Para revisar el caso, primero selecciona el servicio que quieres
                contratar. Después podrás completar el cuestionario inicial.
              </p>
              <Button
                className="mt-7"
                onClick={() =>
                  trackCTAClick('Ver planes y precios', 'cuestionario sin plan')
                }
                to="/#planes"
              >
                Ver planes y precios
              </Button>
            </Card>
          </Container>
        </Section>
      ) : (

	      <Section className="pt-0">
	        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(19rem,0.82fr)] lg:items-start">
	          <div className="grid gap-6">
	            <Card className="border-vetkathia-border/75 bg-white/84 shadow-card" tone="warm">
	              <p className="text-xs font-bold uppercase tracking-[0.14em] text-vetkathia-primary-dark">
	                Plan seleccionado
	              </p>
	              <h2 className="mt-2 font-sans text-2xl font-semibold leading-tight text-vetkathia-text">
	                {selectedPlanLabel}
	              </h2>
	              <p className="mt-4 text-lg leading-8 text-vetkathia-text">
	                Completa el cuestionario inicial para que pueda revisar el caso
	                según el plan elegido.
	              </p>
	              <p className="mt-3 leading-7 text-vetkathia-muted">
	                La revisión manual se realiza con el contexto de salud,
	                alimentación actual, rutina y objetivo que compartas aquí.
	              </p>
              <Button
                className="mt-5"
                href="#formulario-valoracion"
                onClick={() =>
                  trackCTAClick('Ir al formulario', 'cuestionario intro')
                }
                variant="outline"
              >
                Ir al formulario
              </Button>
            </Card>

            <Card className="border-vetkathia-border/80 bg-white/94 p-3 shadow-soft sm:p-5">
              <ProcessBar currentStep={currentStep} />
              <div className="mb-5 mt-4 rounded-[1.25rem] border border-vetkathia-border/70 bg-vetkathia-background/78 px-4 py-3">
                <p className="text-sm leading-6 text-vetkathia-muted">
                  No hace falta que tengas todos los datos perfectos. Si falta
                  algo, puedes indicarlo en comentarios. Ahora estás en:{' '}
                  <span className="font-semibold text-vetkathia-text">
                    {currentFormStep.title}
                  </span>
                  .
                </p>
              </div>

              <form
	                aria-label="Cuestionario inicial"
                className="space-y-4 sm:space-y-5"
                id="formulario-valoracion"
                noValidate
                onChangeCapture={handleFormStart}
                onFocusCapture={handleFormStart}
                onSubmit={onSubmit}
              >
                <input type="hidden" {...register('utm_source')} />
                <input type="hidden" {...register('utm_medium')} />
                <input type="hidden" {...register('utm_campaign')} />
                <input type="hidden" {...register('utm_content')} />
                <input type="hidden" {...register('utm_term')} />
                <input type="hidden" {...register('referrer')} />
	                <input type="hidden" {...register('landing_page')} />
	                <input type="hidden" {...register('current_path')} />
	                <input type="hidden" {...register('selectedPlan')} />

                {currentStep === 0 ? (
                  <>
                    <FormSection
                      description="Datos básicos para poder responderte y ubicar el caso."
                      icon={UserRound}
                      title="Tus datos"
                    >
                      <div className="grid gap-5 md:grid-cols-2">
                        <Input
                          autoComplete="name"
                          disabled={isSubmitting}
                          error={errors.name?.message}
                          label="Nombre"
                          required
                          {...register('name')}
                        />
                        <Input
                          autoComplete="email"
                          disabled={isSubmitting}
                          error={errors.email?.message}
                          label="Email"
                          required
                          type="email"
                          {...register('email')}
                        />
                        <Input
                          autoComplete="tel"
                          disabled={isSubmitting}
                          error={errors.phone?.message}
                          inputMode="tel"
                          label="Teléfono / WhatsApp"
                          required
                          type="tel"
                          {...register('phone')}
                        />
                        <Input
                          autoComplete="address-level2"
                          disabled={isSubmitting}
                          error={errors.cityCountry?.message}
                          label="País / ciudad"
                          required
                          {...register('cityCountry')}
                        />
                      </div>
                    </FormSection>

                    <FormSection
                      description="Si no tienes un dato exacto, puedes indicar una cifra aproximada."
                      icon={PawPrint}
                      title="Datos del animal"
                    >
                      <div className="grid gap-5 md:grid-cols-2">
                        <Select
                          disabled={isSubmitting}
                          error={errors.species?.message}
                          label="Especie"
                          required
                          {...register('species')}
                        >
                          <option value="">Selecciona una opción</option>
                          <option value="perro">Perro</option>
                          <option value="gato">Gato</option>
                        </Select>
                        <Input
                          disabled={isSubmitting}
                          error={errors.petName?.message}
                          label="Nombre del animal"
                          required
                          {...register('petName')}
                        />
                        <Input
                          disabled={isSubmitting}
                          error={errors.age?.message}
                          inputMode="decimal"
                          label="Edad aproximada"
                          required
                          {...register('age')}
                        />
                        <Input
                          disabled={isSubmitting}
                          error={errors.weight?.message}
                          inputMode="decimal"
                          label="Peso aproximado"
                          required
                          {...register('weight')}
                        />
                        <Input
                          disabled={isSubmitting}
                          label="Raza"
                          {...register('breed')}
                        />
                        <Select
                          disabled={isSubmitting}
                          label="Esterilizado"
                          {...register('neutered')}
                        >
                          <option value="">No especificado</option>
                          <option value="sí">Sí</option>
                          <option value="no">No</option>
                        </Select>
                      </div>
                    </FormSection>
                  </>
                ) : null}

                {currentStep === 1 ? (
	                  <FormSection
	                    description="El objetivo queda asociado al plan elegido. Puedes matizarlo con el motivo principal."
                    icon={Target}
                    title="Alimentación y objetivo"
                  >
                    <div className="grid gap-5 md:grid-cols-2">
                      <Select
                        disabled={isSubmitting}
                        error={errors.currentFood?.message}
                        label="Alimentación actual"
                        required
                        {...register('currentFood')}
                      >
                        <option value="">Selecciona una opción</option>
                        {currentFoodOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>
                      <Select
                        disabled={isSubmitting}
                        error={errors.mainReason?.message}
                        label="Motivo principal"
                        required
                        {...register('mainReason')}
                      >
                        <option value="">Selecciona una opción</option>
                        {mainReasonOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>
                      <Select
                        disabled={isSubmitting}
                        error={errors.objective?.message}
                        label="Qué te gustaría conseguir"
                        required
                        wrapperClassName="md:col-span-2"
                        {...register('objective')}
                      >
                        <option value="">Selecciona una opción</option>
                        {objectiveOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </FormSection>
                ) : null}

                {currentStep === 2 ? (
                  <FormSection
                    description="Campos opcionales. Si no aplica o no tienes esa información, puedes dejarlo vacío."
                    icon={HeartPulse}
                    title="Salud y síntomas"
                  >
                    <div className="grid gap-5 md:grid-cols-2">
                      <Textarea
                        disabled={isSubmitting}
                        label="Problemas de salud diagnosticados"
                        rows={4}
                        {...register('diagnosticConditions')}
                      />
                      <Textarea
                        disabled={isSubmitting}
                        label="Medicación"
                        rows={4}
                        {...register('medication')}
                      />
                      <Select
                        disabled={isSubmitting}
                        label="Analíticas recientes"
                        {...register('recentBloodwork')}
                      >
                        <option value="">No especificado</option>
                        <option value="sí">Sí</option>
                        <option value="no">No</option>
                      </Select>
                    </div>

                    <fieldset className="mt-6">
                      <legend className="text-sm font-semibold text-vetkathia-text">
                        Síntomas
                      </legend>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {symptomOptions.map((symptom) => (
                          <Checkbox
                            disabled={isSubmitting}
                            key={symptom}
                            label={symptom}
                            value={symptom}
                            {...register('symptoms')}
                          />
                        ))}
                      </div>
                    </fieldset>

                    <Textarea
                      disabled={isSubmitting}
                      label="Comentarios adicionales"
                      rows={5}
                      wrapperClassName="mt-6"
                      {...register('additionalComments')}
                    />
                  </FormSection>
                ) : null}

                {currentStep === 3 ? (
	                  <FormSection
	                    description="Revisión legal y aviso veterinario antes de enviar el cuestionario."
                    icon={ShieldCheck}
                    title="Consentimientos"
                  >
                    <div className="rounded-3xl border border-vetkathia-primary/30 bg-vetkathia-surface p-4 sm:p-5">
                      <div className="flex gap-3">
                        <AlertTriangle
                          className="mt-1 h-5 w-5 shrink-0 text-vetkathia-primary-dark"
                          aria-hidden="true"
                        />
                        <p className="text-sm leading-6 text-vetkathia-text">
                          Este formulario no sustituye una consulta veterinaria
                          urgente. Si tu animal está decaído, no come, vomita de
                          forma persistente, tiene diarrea intensa, dificultad
                          respiratoria o cualquier síntoma grave, contacta con
                          tu veterinario habitual o un servicio de urgencias.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-3xl border border-vetkathia-border bg-white/78 p-4">
                      <div className="flex gap-3">
                        <CreditCard
                          className="mt-0.5 h-5 w-5 shrink-0 text-vetkathia-primary-dark"
                          aria-hidden="true"
                        />
	                        <p className="text-sm leading-6 text-vetkathia-muted">
	                          Este cuestionario corresponde al plan seleccionado.
	                          La revisión manual empieza con la información que
	                          envías aquí.
	                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-4">
                      <Checkbox
                        disabled={isSubmitting}
                        error={errors.privacyAccepted?.message}
                        label={
                          <>
                            Acepto la{' '}
                            <Link
                              className="font-semibold text-vetkathia-primary-dark underline-offset-4 hover:underline"
                              to="/privacidad"
                            >
                              política de privacidad
                            </Link>
                            .
                          </>
                        }
                        required
                        {...register('privacyAccepted')}
                      />
                      <Checkbox
                        disabled={isSubmitting}
                        error={errors.urgencyAccepted?.message}
                        label="Entiendo que este formulario no sustituye una consulta veterinaria urgente."
                        required
                        {...register('urgencyAccepted')}
                      />
                    </div>
                  </FormSection>
                ) : null}

                {errors.root?.message ? (
                  <div className="rounded-2xl border border-vetkathia-primary/30 bg-vetkathia-surface px-4 py-3 text-sm font-medium text-vetkathia-primary-dark">
                    {errors.root.message}
                  </div>
                ) : null}

                <div className="flex flex-col-reverse gap-3 border-t border-vetkathia-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    disabled={currentStep === 0 || isSubmitting}
                    leftIcon={<ChevronLeft className="h-5 w-5" aria-hidden="true" />}
                    onClick={handlePreviousStep}
                    type="button"
                    variant="outline"
                  >
                    Volver
                  </Button>

                  {currentStep < formSteps.length - 1 ? (
                    <Button
                      className="sm:w-auto"
                      fullWidth
                      onClick={handleNextStep}
                      rightIcon={
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                      }
                      type="button"
                    >
                      Continuar
                    </Button>
                  ) : (
                    <Button
                      className="sm:w-auto"
                      fullWidth
                      isLoading={isSubmitting}
                      size="lg"
                      type="submit"
                    >
	                      Enviar cuestionario inicial
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          </div>

          <aside className="grid gap-4 lg:gap-5">
            <Card className="border-vetkathia-primary/35 bg-white/94 p-5 shadow-soft sm:p-6" tone="highlight">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-vetkathia-border bg-vetkathia-surface text-vetkathia-primary-dark">
                  <ClipboardList className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-vetkathia-primary-dark">
                    Guía del proceso
                  </p>
	                  <h2 className="mt-2 font-sans text-2xl font-semibold leading-tight text-vetkathia-text">
	                    Después de enviar
                  </h2>
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                {nextSteps.map((step, index) => (
                  <div
                    className="flex gap-3 rounded-[1.25rem] border border-vetkathia-border/70 bg-vetkathia-background/65 px-3 py-3"
                    key={step}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-vetkathia-primary-dark">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-vetkathia-muted">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-vetkathia-border/75 bg-white/90 shadow-card ring-1 ring-vetkathia-border/35">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-vetkathia-border bg-vetkathia-surface text-vetkathia-primary-dark">
                <CreditCard className="h-5 w-5" aria-hidden="true" />
              </span>
	              <h2 className="mt-4 font-sans text-xl font-semibold leading-tight text-vetkathia-text">
	                Revisión según plan
	              </h2>
	              <p className="mt-3 leading-7 text-vetkathia-muted">
	                Estás completando el cuestionario posterior a elegir{' '}
	                <span className="font-semibold text-vetkathia-text">
	                  {selectedPlanLabel}
	                </span>
	                . Si necesitas cambiarlo, vuelve a planes antes de enviarlo.
	              </p>
            </Card>

            {integrations.calendlyUrl ? <CalendlyPlaceholder /> : null}
          </aside>
        </Container>
      </Section>
      )}
    </>
  )
}

function ProcessBar({ currentStep }: { currentStep: number }) {
  return (
    <div
      aria-label="Progreso del cuestionario"
      className="rounded-[1.35rem] border border-vetkathia-border/75 bg-vetkathia-background/72 px-3 py-3 sm:px-4"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-vetkathia-text">
          Paso {currentStep + 1} de {formSteps.length}
        </p>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-vetkathia-primary-dark">
          {formSteps[currentStep].title}
        </p>
      </div>
      <div
        className="mb-4 h-2 overflow-hidden rounded-full bg-white ring-1 ring-vetkathia-border"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full bg-vetkathia-primary transition-[width] duration-[380ms] ease-out"
          style={{ width: `${((currentStep + 1) / formSteps.length) * 100}%` }}
        />
      </div>
      <ol className="grid grid-cols-4 gap-1.5">
        {formSteps.map((step, index) => {
          const isCurrent = index === currentStep
          const isComplete = index < currentStep

          return (
            <li
              className="flex flex-col items-center gap-2 text-center"
              key={step.title}
            >
              <span
                aria-current={isCurrent ? 'step' : undefined}
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${
                  isCurrent || isComplete
                    ? 'border-vetkathia-primary bg-vetkathia-primary text-white'
                    : 'border-vetkathia-border bg-white text-vetkathia-primary-dark'
                }`}
              >
                {index + 1}
              </span>
              <span className="text-[0.68rem] font-semibold leading-tight text-vetkathia-muted min-[390px]:text-xs">
                {step.title}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function FormSection({
  children,
  description,
  icon: Icon,
  title,
}: {
  children: ReactNode
  description: string
  icon: LucideIcon
  title: string
}) {
  return (
    <section className="rounded-[1.55rem] border border-vetkathia-border/70 bg-vetkathia-background/72 p-4 shadow-none ring-1 ring-white/75 sm:p-5">
      <div className="mb-5 flex gap-3.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-vetkathia-border bg-vetkathia-background text-vetkathia-primary-dark">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-sans text-xl font-semibold leading-tight text-vetkathia-text sm:text-2xl">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-vetkathia-muted sm:text-base sm:leading-7">
            {description}
          </p>
        </div>
      </div>
      {children}
    </section>
  )
}
