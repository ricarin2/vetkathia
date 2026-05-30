import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'

import { Footer } from './Footer'
import { Header } from './Header'
import { MobileStickyCTA } from './MobileStickyCTA'
import { scrollToHashTarget } from '../../lib/scrollToHashTarget'

export function MainLayout() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        scrollToHashTarget(hash)
        return
      }

      window.scrollTo({
        left: 0,
        top: 0,
      })
    })
    const timeout = window.setTimeout(() => {
      if (hash) {
        scrollToHashTarget(hash)
      }
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
