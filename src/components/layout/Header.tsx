import { HeartPulse } from 'lucide-react'
import { Link } from 'react-router'

import { mainNavigation, siteConfig } from '../../data/site'
import { trackCTAClick } from '../../lib/analytics'
import { scrollToHashTarget } from '../../lib/scrollToHashTarget'
import { Button, Container } from '../ui'
import { MobileNav } from './MobileNav'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-vetkathia-border/18 bg-[linear-gradient(180deg,rgba(255,249,246,0.96),rgba(255,249,246,0.86))] shadow-[0_8px_22px_rgba(59,39,36,0.022)] backdrop-blur-xl">
      <Container className="relative flex min-h-16 items-center justify-between gap-2 py-2.5 sm:min-h-[4.75rem] sm:gap-4">
        <Link
          className="flex min-w-0 items-center gap-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-vetkathia-primary-dark/25 sm:gap-3"
          to="/"
        >
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/70 bg-vetkathia-primary text-white shadow-card sm:h-10 sm:w-10">
            <HeartPulse className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block font-serif text-xl font-semibold leading-none text-vetkathia-text sm:text-2xl">
              {siteConfig.name}
            </span>
            <span className="mt-1 hidden text-xs font-medium text-vetkathia-muted sm:block">
              Nutrición natural veterinaria
            </span>
          </span>
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-1 rounded-full border border-vetkathia-border/80 bg-white/72 p-1 shadow-[0_12px_30px_rgba(59,39,36,0.035)] lg:flex"
        >
          {mainNavigation.map((item) => (
            <Link
              className="rounded-full px-4 py-2 text-sm font-semibold text-vetkathia-muted transition-[background-color,color] duration-[360ms] ease-out hover:bg-vetkathia-surface hover:text-vetkathia-text focus:outline-none focus:ring-4 focus:ring-vetkathia-primary-dark/25"
              key={item.href}
              onClick={() => {
                if (item.href === '/#planes') {
                  trackCTAClick('Planes', 'header nav')
                  window.setTimeout(() => scrollToHashTarget('planes'), 0)
                }
              }}
              to={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            onClick={() => {
              trackCTAClick('Elegir plan', 'header desktop')
              window.setTimeout(() => scrollToHashTarget('planes'), 0)
            }}
            size="sm"
            to="/#planes"
          >
            Elegir plan
          </Button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
          <Button
            className="px-3"
            onClick={() => {
              trackCTAClick('Planes', 'header mobile')
              window.setTimeout(() => scrollToHashTarget('planes'), 0)
            }}
            size="sm"
            to="/#planes"
          >
            Planes
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
