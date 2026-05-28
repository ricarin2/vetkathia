import {
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  FileText,
  MessageCircle,
  RefreshCw,
  Route,
} from 'lucide-react'

const processItems = [
  {
    icon: ClipboardList,
    label: 'Envías el caso',
    text: 'Compartes datos de salud, rutina y alimentación actual.',
  },
  {
    icon: FileText,
    label: 'Reviso la información',
    text: 'Ordeno el contexto y detecto qué conviene aclarar.',
  },
  {
    icon: Route,
    label: 'Te indico el mejor camino',
    text: 'Valoración, plan personalizado o acompañamiento.',
  },
  {
    icon: CalendarCheck,
    label: 'Recibes pauta o plan',
    text: 'Con recomendaciones claras y aplicables en casa.',
  },
  {
    icon: RefreshCw,
    label: 'Ajustamos si hay seguimiento',
    text: 'Revisamos evolución según el plan contratado.',
  },
]

export function DigitalProcessMockup() {
  return (
    <div className="relative">
      <div
        className="absolute -inset-5 rounded-[2.5rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.84),rgba(255,241,245,0.68))]"
        aria-hidden="true"
      />
      <div className="relative rounded-[2rem] border border-vetkathia-border bg-white/88 p-4 shadow-soft sm:p-5">
        <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-stretch">
          <div className="rounded-[1.65rem] border border-vetkathia-border bg-[linear-gradient(160deg,rgba(255,249,246,0.96),rgba(255,241,245,0.78))] p-4 shadow-card sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-vetkathia-primary-dark">
                  Valoración online
                </p>
                <h3 className="mt-2 font-sans text-2xl font-semibold leading-tight text-vetkathia-text">
                  De la duda al siguiente paso
                </h3>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-vetkathia-border bg-white text-vetkathia-primary-dark">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>

            <div
              className="mt-5 rounded-[1.45rem] border border-vetkathia-border bg-white/84 p-4"
              aria-label="Mockup de documento de valoración"
            >
              <div className="flex items-center justify-between gap-3 border-b border-vetkathia-border/75 pb-3">
                <p className="font-sans text-sm font-semibold text-vetkathia-text">
                  Resumen del caso
                </p>
                <span className="rounded-full bg-vetkathia-surface px-3 py-1 text-xs font-semibold text-vetkathia-primary-dark">
                  Online
                </span>
              </div>
              <div className="mt-4 grid gap-3" aria-hidden="true">
                <MockLine width="w-11/12" />
                <MockLine width="w-8/12" />
                <MockLine width="w-10/12" />
              </div>
              <div className="mt-5 grid gap-2">
                {['Edad y rutina', 'Alimentación actual', 'Objetivo'].map(
                  (item) => (
                    <div
                      className="flex items-center gap-2 rounded-full bg-vetkathia-background px-3 py-2"
                      key={item}
                    >
                      <CheckCircle2
                        className="h-4 w-4 text-vetkathia-primary-dark"
                        aria-hidden="true"
                      />
                      <span className="text-xs font-semibold text-vetkathia-text">
                        {item}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-vetkathia-muted">
              No es una app ni una respuesta automática: es una revisión online
              para decidir el camino más sensato.
            </p>
          </div>

          <div className="relative">
            <div
              className="absolute bottom-6 left-5 top-6 hidden w-px bg-vetkathia-border sm:block"
              aria-hidden="true"
            />
            <div className="grid gap-3">
              {processItems.map((item, index) => {
                const Icon = item.icon

                return (
                  <div
                    className="relative grid grid-cols-[auto_1fr] gap-3 rounded-[1.35rem] border border-vetkathia-border bg-vetkathia-background/78 p-4 transition-[border-color,box-shadow] duration-[450ms] ease-out hover:border-vetkathia-primary/45 hover:shadow-card motion-reduce:transition-none"
                    key={item.label}
                  >
                    <span className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-vetkathia-primary-dark ring-1 ring-vetkathia-border">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-sans text-base font-semibold text-vetkathia-text">
                          {item.label}
                        </p>
                        <span className="text-xs font-semibold text-vetkathia-muted">
                          0{index + 1}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-vetkathia-muted">
                        {item.text}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MockLine({ width }: { width: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-full bg-vetkathia-primary/70" />
      <span className={`${width} h-2.5 rounded-full bg-vetkathia-border`} />
    </span>
  )
}
