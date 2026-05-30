import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'

import { Footer } from './Footer'
import { Header } from './Header'
import { MobileStickyCTA } from './MobileStickyCTA'
import { scrollToHashTarget } from '../../lib/scrollToHashTarget'

export function MainLayout() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) return

    const frame = window.requestAnimationFrame(() => {
      scrollToHashTarget(hash)
    })
    const timeout = window.setTimeout(() => {
      scrollToHashTarget(hash)
    }, 80)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timeout)
    }
  }, [hash, pathname])

  return (
    <div className="flex min-h-dvh flex-col bg-vetkathia-background text-vetkathia-text">
      <Header />
      <main className="flex-1" id="main-content">
        <Outlet />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  )
}
