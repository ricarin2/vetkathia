import {
  ClipboardCheck,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from 'lucide-react'

import { Card } from '@/components/ui'
import { visibleAboutCredentials } from '@/data/about'

export function AboutEditorialVisual() {
  return (
    <Card className="relative overflow-hidden p-3 sm:p-4" tone="highlight">
      <div
        className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-vetkathia-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative grid gap-3">
        <div className="relative overflow-hidden rounded-[1.65rem] border border-vetkathia-border bg-[linear-gradient(145deg,#FFF9F6_0%,#FFF5F0_54%,#FFFFFF_100%)] p-5 sm:p-6">
          <div
            className="absolute inset-x-8 top-8 h-44 rounded-full bg-white/62 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full border border-vetkathia-border/80 bg-white/48"
            aria-hidden="true"
          />
          <div
            className="absolute right-8 top-10 h-20 w-20 rounded-full border border-vetkathia-border/80 bg-vetkathia-surface shadow-card"
            aria-hidden="true"
          />
          <div className="relative grid min-h-[20rem] content-between gap-6">
            <div className="max-w-[17rem] rounded-[1.35rem] border border-vetkathia-border/80 bg-white/88 p-4 shadow-card backdrop-blur">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-vetkathia-surface text-vetkathia-primary-dark">
                <Stethoscope className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-vetkathia-primary-dark">
                Marca personal veterinaria
              </p>
              <p className="mt-2 text-sm leading-6 text-vetkathia-muted">
                Criterio profesional, comunicación clara y recomendaciones
                adaptadas a cada perro o gato.
              </p>
            </div>

            <div className="ml-auto w-[88%] rounded-[1.5rem] border border-vetkathia-border bg-white/90 p-4 shadow-soft backdrop-blur sm:w-[76%]">
              <Sparkles
                className="h-6 w-6 text-vetkathia-primary"
                aria-hidden="true"
              />
              <p className="mt-3 font-sans text-2xl font-semibold leading-8 text-vetkathia-text">
                Nutrición natural con criterio profesional.
              </p>
              {visibleAboutCredentials.length > 0 ? (
                <div className="mt-4 grid gap-2">
                  {visibleAboutCredentials.map((credential) => (
                    <div
                      className="rounded-2xl border border-vetkathia-border/70 bg-vetkathia-background/70 px-3 py-2"
                      key={credential.label}
                    >
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-vetkathia-primary-dark">
                        {credential.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold leading-5 text-vetkathia-text">
                        {credential.value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <TrustMiniCard
            icon={Stethoscope}
            text="Decisiones basadas en especie, salud, edad y rutina."
            title="Criterio veterinario"
          />
          <TrustMiniCard
            icon={ShieldCheck}
            text="Sin modas absolutas ni recetas universales."
            title="Sin radicalismos"
          />
          <TrustMiniCard
            icon={ClipboardCheck}
            text="Pautas explicadas con claridad y límites del servicio visibles."
            title="Acompañamiento claro"
          />
          <TrustMiniCard
            icon={HeartHandshake}
            text="Primero se revisa el contexto; después se decide el camino."
            title="Decisión guiada"
          />
        </div>
      </div>
    </Card>
  )
}

function TrustMiniCard({
  icon: Icon,
  text,
  title,
}: {
  icon: typeof Stethoscope
  text: string
  title: string
}) {
  return (
    <div className="rounded-[1.35rem] border border-vetkathia-border bg-white/86 p-4 shadow-card">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-vetkathia-surface text-vetkathia-primary-dark">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="mt-3 font-sans text-base font-semibold leading-tight text-vetkathia-text">
        {title}
      </p>
      <p className="mt-2 text-sm leading-6 text-vetkathia-muted">{text}</p>
    </div>
  )
}
