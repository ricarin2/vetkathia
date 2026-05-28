import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

import { mainNavigation } from '../../data/site'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
        return
      }

      if (event.key === 'Tab') {
        const focusableItems = menuRef.current?.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusableItems?.length) return

        const firstItem = focusableItems[0]
        const lastItem = focusableItems[focusableItems.length - 1]

        if (event.shiftKey && document.activeElement === firstItem) {
          event.preventDefault()
          lastItem.focus()
        } else if (!event.shiftKey && document.activeElement === lastItem) {
          event.preventDefault()
          firstItem.focus()
        }
      }
    }

    const firstLink = menuRef.current?.querySelector<HTMLAnchorElement>('a')
    firstLink?.focus()
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className="lg:hidden">
      <button
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Cerrar navegación' : 'Abrir navegación'}
        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-vetkathia-border bg-white/90 text-vetkathia-text shadow-card transition-[background-color,border-color,box-shadow] duration-[450ms] ease-out hover:bg-vetkathia-surface focus:outline-none focus:ring-4 focus:ring-vetkathia-primary-dark/25"
        onClick={() => setIsOpen((current) => !current)}
        ref={triggerRef}
        type="button"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen ? (
        <>
          <button
            aria-label="Cerrar menú móvil"
            className="fixed inset-0 z-40 cursor-default bg-vetkathia-text/18 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
            type="button"
          />
          <div
            className="fixed inset-x-4 top-[5.25rem] z-50 mx-auto max-w-sm rounded-[1.75rem] border border-vetkathia-border bg-white/96 p-4 shadow-soft"
            id="mobile-navigation"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navegación móvil"
          >
            <nav aria-label="Navegación móvil" className="grid gap-1">
              {mainNavigation.map((item) => (
                <Link
                  className="rounded-2xl px-4 py-3 text-base font-semibold text-vetkathia-text transition-[background-color,color] duration-[240ms] ease-out hover:bg-vetkathia-surface focus:outline-none focus:ring-4 focus:ring-vetkathia-primary-dark/25"
                  key={item.href}
                  onClick={() => setIsOpen(false)}
                  to={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      ) : null}
    </div>
  )
}
