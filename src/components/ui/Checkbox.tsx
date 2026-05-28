import type { InputHTMLAttributes, ReactNode } from 'react'
import { useId } from 'react'

import { cn } from '../../lib/cn'

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  error?: string
  helpText?: string
  label: ReactNode
  wrapperClassName?: string
}

export function Checkbox({
  className,
  disabled,
  error,
  helpText,
  id,
  label,
  required,
  wrapperClassName,
  ...props
}: CheckboxProps) {
  const generatedId = useId()
  const checkboxId = id ?? generatedId
  const helpId = helpText ? `${checkboxId}-help` : undefined
  const errorId = error ? `${checkboxId}-error` : undefined
  const describedBy = [helpId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn('space-y-2', wrapperClassName)}>
      <div className="flex min-h-12 items-start gap-3 rounded-2xl border border-vetkathia-border/70 bg-white/72 px-3 py-3 transition-[background-color,border-color] duration-[450ms] ease-out hover:border-vetkathia-primary/45 hover:bg-white motion-reduce:transition-none">
        <input
          aria-describedby={describedBy}
          aria-invalid={Boolean(error)}
          className={cn(
            'mt-1 h-6 w-6 rounded border-vetkathia-border text-vetkathia-primary accent-vetkathia-primary',
            'focus:outline-none focus:ring-4 focus:ring-vetkathia-primary-dark/25',
            'disabled:cursor-not-allowed disabled:opacity-60',
            className,
          )}
          disabled={disabled}
          id={checkboxId}
          required={required}
          type="checkbox"
          {...props}
        />
        <label className="text-sm leading-6 text-vetkathia-text" htmlFor={checkboxId}>
          {label}
          {required ? <span className="text-vetkathia-primary-dark"> *</span> : null}
        </label>
      </div>
      {helpText ? (
        <p className="pl-8 text-sm leading-6 text-vetkathia-muted" id={helpId}>
          {helpText}
        </p>
      ) : null}
      {error ? (
        <p className="pl-8 text-sm font-medium leading-6 text-vetkathia-primary-dark" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  )
}
