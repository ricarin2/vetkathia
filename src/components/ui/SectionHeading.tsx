import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '../../lib/cn'

type SectionHeadingProps = HTMLAttributes<HTMLDivElement> & {
  align?: 'left' | 'center'
  children?: ReactNode
  className?: string
  eyebrow?: string
  size?: 'sm' | 'md' | 'lg'
  title: string
  variant?: 'landing' | 'editorial'
}

const headingSizeClasses = {
  editorial: {
    lg: 'font-serif text-[1.95rem] font-semibold sm:text-4xl lg:text-[3rem]',
    md: 'font-serif text-[1.85rem] font-semibold sm:text-3xl lg:text-[2.5rem]',
    sm: 'font-serif text-[1.55rem] font-semibold sm:text-2xl lg:text-[2rem]',
  },
  landing: {
    lg: 'font-sans text-[2rem] font-black sm:text-4xl lg:text-[3rem]',
    md: 'font-sans text-[1.8rem] font-black sm:text-3xl lg:text-[2.45rem]',
    sm: 'font-sans text-[1.55rem] font-black sm:text-2xl lg:text-[2rem]',
  },
}

const bodySizeClasses = {
  lg: 'mt-4 text-base leading-7 text-vetkathia-muted sm:text-lg sm:leading-8',
  md: 'mt-4 text-base leading-7 text-vetkathia-muted',
  sm: 'mt-3 text-sm leading-6 text-vetkathia-muted sm:text-base sm:leading-7',
}

export function SectionHeading({
  align = 'left',
  children,
  className,
  eyebrow,
  size = 'lg',
  title,
  variant = 'landing',
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
      {...props}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-vetkathia-primary-dark sm:text-sm">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          'leading-tight text-vetkathia-text',
          headingSizeClasses[variant][size],
        )}
      >
        {title}
      </h2>
      {children ? (
        <div
          className={cn(
            bodySizeClasses[size],
            align === 'center' && 'mx-auto max-w-2xl',
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  )
}
