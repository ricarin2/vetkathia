import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '../../lib/cn'

type CardTone = 'default' | 'warm' | 'highlight'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  className?: string
  interactive?: boolean
  tone?: CardTone
}

const toneClasses: Record<CardTone, string> = {
  default: 'border-vetkathia-border/90 bg-white',
  warm: 'border-vetkathia-border/90 bg-vetkathia-surface',
  highlight: 'border-vetkathia-primary bg-white shadow-soft',
}

export function Card({
  children,
  className,
  interactive = false,
  tone = 'default',
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[1.75rem] border p-5 shadow-card ring-1 ring-white/70 sm:p-6',
        interactive &&
          'transition-[border-color,box-shadow,transform] duration-[260ms] ease-out hover:-translate-y-0.5 hover:border-vetkathia-primary/45 hover:shadow-soft focus-within:border-vetkathia-primary/45 focus-within:shadow-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
