import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '../../lib/cn'

type BadgeTone = 'default' | 'primary' | 'soft'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
  className?: string
  tone?: BadgeTone
}

const toneClasses: Record<BadgeTone, string> = {
  default: 'border-vetkathia-border/65 bg-white text-vetkathia-text',
  primary: 'border-vetkathia-primary-dark bg-vetkathia-primary-dark text-white',
  soft: 'border-vetkathia-border/55 bg-[#FFFDFB] text-vetkathia-primary-dark',
}

export function Badge({
  children,
  className,
  tone = 'default',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex min-h-8 items-center rounded-full border px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.12em]',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
