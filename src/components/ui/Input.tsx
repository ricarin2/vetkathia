import type { InputHTMLAttributes } from 'react'
import { useId } from 'react'

import { cn } from '../../lib/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
  helpText?: string
  label?: string
  wrapperClassName?: string
}

export function Input({
  className,
  disabled,
  error,
  helpText,
  id,
  label,
  required,
  wrapperClassName,
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const helpId = helpText ? `${inputId}-help` : undefined
  const errorId = error ? `${inputId}-error` : undefined
  const describedBy = [helpId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn('space-y-2', wrapperClassName)}>
      {label ? (
        <label
          className="block text-sm font-semibold text-vetkathia-text"
          htmlFor={inputId}
        >
          {label}
          {required ? <span className="text-vetkathia-primary-dark"> *</span> : null}
        </label>
      ) : null}
      <input
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
        className={cn(
          'min-h-12 w-full rounded-2xl border bg-white px-4 py-3 text-base text-vetkathia-text shadow-sm transition-[background-color,border-color,box-shadow,color] duration-[450ms] ease-out',
          'placeholder:text-vetkathia-muted/70',
          'focus:border-vetkathia-primary-dark focus:outline-none focus:ring-4 focus:ring-vetkathia-primary-dark/25',
          'disabled:cursor-not-allowed disabled:bg-vetkathia-surface disabled:text-vetkathia-muted disabled:opacity-70',
          error ? 'border-vetkathia-primary-dark' : 'border-vetkathia-border',
          className,
        )}
        disabled={disabled}
        id={inputId}
        required={required}
        {...props}
      />
      {helpText ? (
        <p className="text-sm leading-6 text-vetkathia-muted" id={helpId}>
          {helpText}
        </p>
      ) : null}
      {error ? (
        <p className="text-sm font-medium leading-6 text-vetkathia-primary-dark" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  )
}
