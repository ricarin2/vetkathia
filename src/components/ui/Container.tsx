import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '../../lib/cn'

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  className?: string
  size?: ContainerSize
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
}

export function Container({
  children,
  className,
  size = 'lg',
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full px-5 sm:px-8 lg:px-10', sizeClasses[size], className)}
      {...props}
    >
      {children}
    </div>
  )
}
