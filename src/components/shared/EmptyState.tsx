'use client'

import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-[#a3a3a3]">
      <Icon className="w-10 h-10 mb-3 text-[#d4d4d4]" />
      <p className="text-[14px] font-medium text-[#525252]">{title}</p>
      {description && <p className="text-[12.5px] mt-1">{description}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 inline-flex items-center gap-1.5 bg-[#0d0d0d] text-white px-4 py-2 rounded-[8px] text-[13px] font-medium hover:bg-[#262626] transition-colors cursor-pointer"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
