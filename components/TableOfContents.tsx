'use client'

import type { TocItem } from '@/lib/blog'
import { useActiveHeading } from '@/hooks/useActiveHeading'

export function TableOfContents({ items }: { items: TocItem[] }) {
  const topLevelItems = items.filter((item) => item.level === 2)
  const activeId = useActiveHeading(topLevelItems.map((item) => item.id))

  if (topLevelItems.length === 0) return null

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <div className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink-2">On this page</div>
      <ul className="mt-3 space-y-2 border-l border-line pl-4">
        {topLevelItems.map((item) => {
          const isActive = item.id === activeId
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block transition-colors ${
                  isActive ? 'font-medium text-signal' : 'text-ink-2 hover:text-ink'
                }`}
              >
                {item.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
