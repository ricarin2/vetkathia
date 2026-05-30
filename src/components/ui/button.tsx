import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router'

import { cn } from '../../lib/cn'

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  children: ReactNode
  className?: string
  fullWidth?: boolean
  href?: string
  isLoading?: boolean
  leftIcon?: ReactNode
  onClick?: (event: MouseEvent<HTMLElement>) => void
  rel?: string
  rightIcon?: ReactNode
  size?: ButtonSize
  target?: string
  to?: string
  variant?: ButtonVariant
}

type VetKathiaButtonVariant = Exclude<ButtonVariant, 'default'>

const variantClasses: Record<VetKathiaButtonVariant, string> = {
  primary:
    'bg-vetkathia-primary text-white shadow-[0_18px_40px_rgba(232,62,115,0.24)] hover:bg-vetkathia-primary-dark hover:shadow-[0_20px_48px_rgba(190,24,93,0.26)]',
  secondary:
    'bg-[#FFFDFB] text-vetkathia-text ring-1 ring-vetkathia-border/55 hover:bg-vetkathia-surface hover:shadow-card',
  outline:
    'border border-vetkathia-border/70 bg-white text-vetkathia-text hover:border-vetkathia-primary/55 hover:bg-vetkathia-background hover:text-vetkathia-primary-dark hover:shadow-card',
  ghost:
    'bg-transparent text-vetkathia-text hover:bg-vetkathia-surface hover:text-vetkathia-primary-dark',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-4 py-2 text-sm',
  md: 'min-h-12 px-5 py-3 text-base',
  lg: 'min-h-14 px-7 py-4 text-base sm:text-lg',
}

export function Button({
  children,
  className,
  disabled,
  fullWidth = false,
  href,
  isLoading = false,
  leftIcon,
  onClick,
  rel,
  rightIcon,
  size = 'md',
  target,
  to,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading
  const resolvedVariant: VetKathiaButtonVariant =
    variant === 'default' ? 'primary' : variant
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,border-color,box-shadow,color,transform] duration-[360ms] ease-out motion-reduce:transition-none',
    'hover:-translate-y-0.5 active:translate-y-px motion-reduce:hover:translate-y-0',
    'cursor-pointer focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-vetkathia-primary-dark/60',
    'disabled:pointer-events-none disabled:opacity-55',
    isDisabled && 'pointer-events-none opacity-55',
    fullWidth && 'w-full',
    variantClasses[resolvedVariant],
    sizeClasses[size],
    className,
  )
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (isDisabled) {
      event.preventDefault()
      return
    }

    onClick?.(event)
  }
  const content = (
    <>
      {isLoading ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading ? rightIcon : null}
    </>
  )

  if (to) {
    return (
      <Link
        aria-busy={isLoading || undefined}
        aria-disabled={isDisabled || undefined}
        className={classes}
        onClick={handleClick}
        tabIndex={isDisabled ? -1 : undefined}
        to={to}
      >
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        aria-busy={isLoading || undefined}
        aria-disabled={isDisabled || undefined}
        className={classes}
        href={isDisabled ? undefined : href}
        onClick={handleClick}
        rel={rel}
        target={target}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      aria-busy={isLoading || undefined}
      className={classes}
      disabled={isDisabled}
      onClick={handleClick}
      type={type}
      {...props}
    >
      {content}
    </button>
  )
}
