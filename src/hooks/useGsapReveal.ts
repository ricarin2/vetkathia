import { useEffect, type RefObject } from 'react'
import { gsap } from 'gsap'

type UseGsapRevealOptions = {
  delay?: number
  duration?: number
  once?: boolean
  rootMargin?: string
  selector?: string
  stagger?: number
  y?: number
}

export function useGsapReveal(
  rootRef: RefObject<HTMLElement | null>,
  {
    delay = 0,
    duration = 0.48,
    once = true,
    rootMargin = '0px 0px -12% 0px',
    selector = '[data-reveal]',
    stagger = 0.04,
    y = 10,
  }: UseGsapRevealOptions = {},
) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const elements = gsap.utils.toArray<HTMLElement>(selector, root)
    if (elements.length === 0) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches

    if (prefersReducedMotion) {
      gsap.set(elements, { autoAlpha: 1, clearProps: 'transform' })
      return
    }

    const animationConfig = {
      delay,
      duration: isMobile ? Math.min(Math.max(duration, 0.36), 0.42) : duration,
      ease: 'power2.out',
      stagger: isMobile ? Math.min(stagger, 0.02) : stagger,
      y: isMobile ? Math.min(y, 4) : y,
    }

    gsap.set(elements, { autoAlpha: 0, y: animationConfig.y })

    const reveal = (targets: HTMLElement[]) => {
      gsap.to(targets, {
        autoAlpha: 1,
        clearProps: 'transform,opacity,visibility',
        delay: animationConfig.delay,
        duration: animationConfig.duration,
        ease: animationConfig.ease,
        overwrite: 'auto',
        stagger: animationConfig.stagger,
        y: 0,
      })
    }

    if (!('IntersectionObserver' in window)) {
      reveal(elements)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleTargets = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)

        if (visibleTargets.length === 0) return

        reveal(visibleTargets)

        if (once) {
          visibleTargets.forEach((target) => observer.unobserve(target))
        }
      },
      { rootMargin },
    )

    elements.forEach((element) => observer.observe(element))

    return () => {
      observer.disconnect()
      gsap.killTweensOf(elements)
    }
  }, [delay, duration, once, rootMargin, rootRef, selector, stagger, y])
}
