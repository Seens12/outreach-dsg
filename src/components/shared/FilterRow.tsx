'use client'

import { useRef, useState, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Wraps filter pills in a single-row container with:
 * - overflow hidden (no wrapping)
 * - gradient fade on the right when content overflows
 * - chevron icon button to scroll right
 */
export function FilterRow({ children, className }: { children: React.ReactNode; className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkOverflow = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollRight(el.scrollWidth > el.clientWidth + 1)
  }

  useEffect(() => {
    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [children])

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' })
  }

  return (
    <div className={cn('relative group/frow', className)}>
      {/* Gradient mask + chevron — only when overflow */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center pointer-events-none">
          <div className="w-16 h-full bg-gradient-to-l from-white via-white/80 to-transparent" />
          <button
            onClick={scrollRight}
            className="pointer-events-auto flex items-center justify-center w-6 h-6 -ml-3 cursor-pointer transition-colors text-[#737373] hover:text-[#525252]"
            aria-label="Показать ещё"
          >
            <ChevronRight className="w-3 h-3" strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* Scrollable pills row */}
      <div
        ref={scrollRef}
        onScroll={checkOverflow}
        className="flex items-center gap-2 overflow-x-auto scrollbar-none"
      >
        {children}
      </div>
    </div>
  )
}
