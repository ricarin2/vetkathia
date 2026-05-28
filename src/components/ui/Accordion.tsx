import { ChevronDown } from 'lucide-react'
import { useState, type ReactNode } from 'react'

import { cn } from '../../lib/cn'

export type AccordionItem = {
  content: ReactNode
  id: string
  title: string
}

type AccordionProps = {
  className?: string
  defaultOpenFirst?: boolean
  items: AccordionItem[]
  onItemOpen?: (item: AccordionItem) => void
}

export function Accordion({
  className,
  defaultOpenFirst = false,
  items,
  onItemOpen,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(
    () => new Set(defaultOpenFirst && items[0] ? [items[0].id] : []),
  )

  const toggleItem = (item: AccordionItem) => {
    setOpenItems((current) => {
      const next = new Set(current)

      if (next.has(item.id)) {
        next.delete(item.id)
      } else {
        next.add(item.id)
        onItemOpen?.(item)
      }

      return next
    })
  }

  return (
    <div className={cn('space-y-2 sm:space-y-2.5', className)}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id)
        const panelId = `accordion-panel-${item.id}`

        return (
          <div
            className={cn(
              'rounded-[1.35rem] border border-vetkathia-border/58 bg-white/92 px-4 py-2.5 shadow-[0_12px_30px_rgba(59,39,36,0.035)] transition-[background-color,border-color,box-shadow] duration-[380ms] ease-out hover:border-vetkathia-primary/38 hover:bg-white sm:px-5 sm:py-3',
              isOpen && 'border-vetkathia-primary/45 bg-white shadow-card',
            )}
            key={item.id}
          >
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-4 rounded-[1rem] text-left text-base font-semibold leading-6 text-vetkathia-text focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-vetkathia-primary-dark/60 sm:text-lg"
              onClick={() => toggleItem(item)}
              type="button"
            >
              <span className="pr-2">{item.title}</span>
              <span
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-vetkathia-border/70 bg-vetkathia-surface/72 text-vetkathia-primary-dark transition-[background-color,border-color] duration-[380ms] ease-out',
                  isOpen && 'border-vetkathia-primary/60 bg-white',
                )}
              >
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-[380ms] ease-out motion-reduce:transition-none',
                    isOpen && 'rotate-180',
                  )}
                  aria-hidden="true"
                />
              </span>
            </button>
            <div
              className={cn(
                'grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity,margin] duration-[380ms] ease-out motion-reduce:transition-none',
                isOpen && 'mt-2.5 grid-rows-[1fr] opacity-100',
              )}
              id={panelId}
            >
              <div className="overflow-hidden border-t border-vetkathia-border/45 pt-3">
                <div className="text-sm leading-7 text-vetkathia-muted sm:text-base">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
