'use client'

import { cn } from '@/lib/utils'

interface FilterPillsProps<T extends string> {
  options: { key: T; label: string }[]
  active: T
  onChange: (key: T) => void
  className?: string
}

export function FilterPills<T extends string>({ options, active, onChange, className }: FilterPillsProps<T>) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className={cn(
            'px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors cursor-pointer',
            active === opt.key
              ? 'bg-[#0d0d0d] text-white anim-scale-in'
              : 'bg-[#f5f5f5] text-[#525252] hover:bg-[#e8e8e8]'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
