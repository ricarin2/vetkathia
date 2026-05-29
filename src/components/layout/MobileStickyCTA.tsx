import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

import { trackCTAClick } from '../../lib/analytics'
import { Button } from '../ui'

const SCROLL_THRESHOLD = 420
const STICKY_CTA_SPACE = '5.25rem'

export function MobileStickyCTA() {
  const { pathname } = useLocation()
  const [isNearFooter, setIsNearFooter] = useState(false)
  const [plansReachState, setPlansReachState] = useState({
    hasReachedPlans: false,
    pathname,
  })
  const [isVisible, setIsVisible] = useState(false)
  const hasReachedPlans =
    plansReachState.pathname === pathname && plansReachState.hasReachedPlans
  const shouldHide =
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/contratar') ||
    pathname.startsWith('/pago-cancelado') ||
    pathname.startsWith('/pago-completado') ||
    pathname.startsWith('/solicitar-valoracion') ||
    pathname.startsWith('/gracias')

  useEffect(() => {
    if (shouldHide) {
      document.body.style.paddingBottom = ''
      return
    }

    const updateVisibility = () => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches
      const footer = document.querySelector('footer')
      const hero = document.getElementById('nutricion')
      const plans = document.getElementById('planes')
      const footerTop = footer?.getBoundingClientRect().top ?? Infinity
      const nearFooter = footerTop < window.innerHeight - 12
      const plansTop = plans?.getBoundingClientRect().top ?? Infinity
      const reachedPlans = plansTop < window.innerHeight * 0.72
      const hasLeftHero = hero
        ? hero.getBoundingClientRect().bottom < 72
        : window.scrollY > SCROLL_THRESHOLD
      const isReadingProtectedContent = [
        ...document.querySelectorAll<HTMLElement>('[data-hide-mobile-sticky]'),
      ].some((element) => {
        const rect = element.getBoundingClientRect()

        return rect.top < window.innerHeight - 72 && rect.bottom > 72
      })

      if (reachedPlans) {
        setPlansReachState((state) =>
          state.pathname === pathname && state.hasReachedPlans
            ? state
            : { hasReachedPlans: true, pathname },
        )
      }

      setIsNearFooter(nearFooter)
      setIsVisible(
        isMobile &&
          hasLeftHero &&
          !hasReachedPlans &&
          !reachedPlans &&
          !nearFooter &&
          !isReadingProtectedContent,
      )
    }

    const animationFrame = window.requestAnimationFrame(updateVisibility)
    window.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', updateVisibility)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
      document.body.style.paddingBottom = ''
    }
  }, [hasReachedPlans, shouldHide, pathname])

  useEffect(() => {
    if (shouldHide || hasReachedPlans || isNearFooter || !isVisible) {
      document.body.style.paddingBottom = ''
      return
    }

    document.body.style.paddingBottom = STICKY_CTA_SPACE

    return () => {
      document.body.style.paddingBottom = ''
    }
  }, [hasReachedPlans, isNearFooter, isVisible, shouldHide])

  if (shouldHide) return null

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-vetkathia-border/35 bg-vetkathia-background/88 px-4 pb-[calc(0.65rem+env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-12px_30px_rgba(59,39,36,0.065)] backdrop-blur md:hidden ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-full opacity-0'
      } transition-[opacity,transform] duration-[450ms] ease-out motion-reduce:transition-none`}
      aria-hidden={!isVisible}
      inert={!isVisible}
    >
      <Button
        fullWidth
        onClick={() =>
          trackCTAClick('Elegir plan', 'mobile sticky cta')
        }
        size="sm"
        to="/#planes"
      >
        Elegir plan
      </Button>
    </div>
  )
}
