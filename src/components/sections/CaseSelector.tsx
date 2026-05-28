import { ArrowRight, Cat, Dog, HelpCircle } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../ui'

const speciesOptions = [
  { icon: Dog, label: 'Perro', value: 'perro' },
  { icon: Cat, label: 'Gato', value: 'gato' },
]

const concernOptions = [
  { label: 'Senior', value: 'senior' },
  { label: 'Digestión', value: 'digestion' },
  { label: 'Transición', value: 'transicion' },
  { label: 'Gato selectivo', value: 'gato-selectivo' },
  { label: 'Problema de salud', value: 'problema-de-salud' },
  { label: 'No sé por dónde empezar', value: 'no-se-por-donde-empezar' },
]

type CaseSelectorProps = {
  onSelect?: (label: string) => void
}

export function CaseSelector({ onSelect }: CaseSelectorProps) {
  const [selectedSpecies, setSelectedSpecies] = useState(speciesOptions[0])
  const [selectedConcern, setSelectedConcern] = useState(concernOptions[0])

  return (
    <div className="mt-5 rounded-[1.5rem] border border-vetkathia-border/85 bg-white/82 p-3 shadow-card backdrop-blur">
      <div className="flex flex-col gap-1 px-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-vetkathia-primary-dark">
            Empieza por su caso
          </p>
          <p className="mt-1 text-sm leading-5 text-vetkathia-muted">
            Marca lo básico y elige el plan desde precios.
          </p>
        </div>
        <span className="hidden text-xs font-semibold text-vetkathia-muted sm:block">
          Primero elige plan
        </span>
      </div>

      <div className="mt-4 grid gap-2 lg:grid-cols-[0.68fr_1fr_auto]">
        <div
          className="grid grid-cols-2 gap-2"
          role="radiogroup"
          aria-label="Especie"
        >
          {speciesOptions.map((option) => {
            const Icon = option.icon
            const isSelected = selectedSpecies.value === option.value

            return (
              <button
                aria-checked={isSelected}
                className={`flex min-h-11 items-center justify-center gap-2 rounded-full border px-3 py-2 text-left transition-[background-color,border-color,box-shadow,transform] duration-[360ms] ease-out hover:-translate-y-0.5 hover:shadow-card focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-vetkathia-primary-dark/55 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                  isSelected
                    ? 'border-vetkathia-primary bg-vetkathia-surface shadow-card'
                    : 'border-vetkathia-border bg-vetkathia-background/78 hover:border-vetkathia-primary/45 hover:bg-white'
                }`}
                key={option.value}
                onClick={() => setSelectedSpecies(option)}
                role="radio"
                type="button"
              >
                <Icon
                  className="h-4 w-4 shrink-0 text-vetkathia-primary-dark"
                  aria-hidden="true"
                />
                <span className="font-sans text-sm font-semibold leading-tight text-vetkathia-text">
                  {option.label}
                </span>
              </button>
            )
          })}
        </div>

        <label className="relative flex min-h-11 items-center gap-2 rounded-full border border-vetkathia-border bg-vetkathia-background/78 px-4 py-2 text-sm font-semibold text-vetkathia-text focus-within:outline focus-within:outline-3 focus-within:outline-offset-3 focus-within:outline-vetkathia-primary-dark/55">
          <HelpCircle
            className="h-4 w-4 shrink-0 text-vetkathia-primary-dark"
            aria-hidden="true"
          />
          <span className="sr-only">Qué te preocupa más</span>
          <select
            className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-sm font-semibold text-vetkathia-text outline-none"
            onChange={(event) => {
              const option = concernOptions.find(
                (item) => item.value === event.target.value,
              )
              if (option) setSelectedConcern(option)
            }}
            value={selectedConcern.value}
          >
            {concernOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 text-vetkathia-muted">
            ▾
          </span>
        </label>

        <Button
          className="min-h-11 px-5 py-2.5"
          fullWidth
          onClick={() =>
            onSelect?.(`${selectedSpecies.label}: ${selectedConcern.label}`)
          }
          rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
          to="/#planes"
        >
          Ver planes
        </Button>
      </div>
    </div>
  )
}
