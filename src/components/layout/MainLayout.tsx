import { Outlet } from 'react-router'

import { Footer } from './Footer'
import { Header } from './Header'
import { MobileStickyCTA } from './MobileStickyCTA'

export function MainLayout() {
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
