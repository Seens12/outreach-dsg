'use client'

import { useAppStore, viewMeta } from '@/lib/store'
import {
  PanelLeft,
  Search,
  Bell,
  Settings,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function Topbar() {
  const { view, toggleSidebar } = useAppStore()
  const meta = viewMeta[view]

  return (
    <header className="h-[52px] border-b border-[#e8e8e8] flex items-center px-[18px] gap-2.5 flex-shrink-0 bg-white z-30">
      {/* Left */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSidebar}
          className="w-[30px] h-[30px] flex items-center justify-center rounded-lg border-none bg-transparent cursor-pointer text-[#737373] hover:bg-[#f5f5f5] hover:text-[#171717] transition-all duration-[160ms]"
        >
          <PanelLeft className="w-[15px] h-[15px]" strokeWidth={1.8} strokeLinecap="round" />
        </button>
        <div className="flex items-center gap-1.5 text-[12.5px]">
          <span className="text-[#a8a8a8]">OutreachAI</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#d1d1d1]" />
          <span className="font-semibold text-[#171717]">{meta?.title}</span>
        </div>
      </div>

      {/* Center */}
      <div className="flex-1 flex justify-center">
        <div className="flex items-center bg-[#f5f5f5] rounded-full px-4 py-1.5 gap-2 w-[240px]">
          <Search className="w-3.5 h-3.5 text-[#a8a8a8]" strokeWidth={2} />
          <input
            type="text"
            placeholder="Поиск..."
            className="bg-transparent border-none outline-none text-[12px] font-medium text-[#171717] placeholder-[#a8a8a8] w-full font-[inherit]"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        <button className="w-[30px] h-[30px] flex items-center justify-center rounded-lg border-none bg-transparent cursor-pointer text-[#a8a8a8] hover:bg-[#f5f5f5] hover:text-[#404040] transition-all duration-[160ms] relative">
          <Bell className="w-[15px] h-[15px]" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          <div className="absolute top-[5px] right-[5px] w-[7px] h-[7px] bg-[#dc2626] rounded-full border-[1.5px] border-white" />
        </button>
        <button className="w-[30px] h-[30px] flex items-center justify-center rounded-lg border-none bg-transparent cursor-pointer text-[#a8a8a8] hover:bg-[#f5f5f5] hover:text-[#404040] transition-all duration-[160ms]">
          <Settings className="w-[15px] h-[15px]" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </button>
      </div>
    </header>
  )
}
