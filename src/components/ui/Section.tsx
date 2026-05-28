import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

import { cn } from '../../lib/cn'

type SectionTone = 'default' | 'surface' | 'white' | 'cream' | 'none'
type SectionSpacing = 'tight' | 'compact' | 'normal'

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
  className?: string
  divider?: boolean
  spacing?: SectionSpacing
  tone?: SectionTone
}

const toneClasses: Record<SectionTone, string> = {
  default: 'bg-vetkathia-background',
  surface: 'bg-vetkathia-surface',
  white: 'bg-white',
  cream: 'bg-[#FFFDFB]',
  none: '',
}

const spacingClasses: Record<SectionSpacing, string> = {
  tight: 'py-8 sm:py-10 lg:py-12',
  compact: 'py-10 sm:py-14 lg:py-16',
  normal: 'py-14 sm:py-20 lg:py-24',
}

export function Section({
  children,
  className,
  divider = false,
  spacing = 'normal',
  tone = 'default',
  ...props
}: SectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return true

    return (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    )
  })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return

        setIsVisible(true)
        observer.disconnect()
      },
      { rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative transition-[opacity,transform] duration-[500ms] ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100',
        spacingClasses[spacing],
        divider && 'border-t border-vetkathia-border/30',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-1.5 opacity-0',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}
