'use client'

import { useState } from 'react'
import { useAppStore, viewMeta } from '@/lib/store'
import {
  PanelLeft,
  Search,
  Bell,
  Settings,
  ChevronRight,
  Bot,
  LayoutGrid,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export function Topbar() {
  const { view, mode, setMode, setView, toggleSidebar } = useAppStore()
  const meta = viewMeta[view]
  const isChat = mode === 'chat'
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="h-[52px] border-b border-[#e8e8e8] flex items-center px-[18px] gap-2.5 flex-shrink-0 bg-white z-30">
      {/* Left */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSidebar}
          aria-label="Свернуть меню"
          className="w-[30px] h-[30px] flex items-center justify-center rounded-lg border-none bg-transparent cursor-pointer text-[#737373] hover:bg-[#0d0d0d] hover:text-white transition-all duration-[160ms]"
        >
          <PanelLeft className="w-[15px] h-[15px]" strokeWidth={1.8} strokeLinecap="round" />
        </button>
        {!isChat && (
          <div className="flex items-center gap-1.5 text-[12.5px]">
            <span className="text-[#737373]">OutreachAI</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#d1d1d1]" />
            <span className="font-semibold text-[#171717]">{meta?.title}</span>
          </div>
        )}
        {isChat && (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#0d0d0d] flex items-center justify-center">
              <Bot className="w-3 h-3 text-white" />
            </div>
            <span className="text-[13px] font-semibold text-[#171717]">AI Ассистент</span>
          </div>
        )}
      </div>

      {/* Center — Mode Switcher */}
      <div className="flex-1 flex justify-center">
        <div className="flex items-center bg-[#f5f5f5] rounded-full p-[3px] gap-[2px]">
          <button
            onClick={() => setMode('chat')}
            className={cn(
              'flex items-center gap-1.5 px-3.5 py-[5px] rounded-full border-none cursor-pointer text-[12px] font-medium font-[inherit] whitespace-nowrap transition-all duration-[160ms]',
              isChat
                ? 'bg-white text-[#171717] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] font-semibold'
                : 'bg-transparent text-[#737373] hover:text-[#171717]'
            )}
          >
            <Bot className="w-3 h-3" strokeWidth={2} />
            Чат
          </button>
          <button
            onClick={() => setMode('expanded')}
            className={cn(
              'flex items-center gap-1.5 px-3.5 py-[5px] rounded-full border-none cursor-pointer text-[12px] font-medium font-[inherit] whitespace-nowrap transition-all duration-[160ms]',
              !isChat
                ? 'bg-white text-[#171717] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] font-semibold'
                : 'bg-transparent text-[#737373] hover:text-[#171717]'
            )}
          >
            <LayoutGrid className="w-3 h-3" strokeWidth={2} />
            Расширенный
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        <div className="flex items-center bg-[#f5f5f5] rounded-full px-3 py-1.5 gap-2 w-[120px] sm:w-[180px] md:w-[240px]">
          <Search className="w-3 h-3 text-[#a8a8a8]" strokeWidth={2} />
          <input
            type="text"
            placeholder="Поиск..."
            aria-label="Поиск"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                toast.info('Поиск: ' + searchQuery)
              }
            }}
            className="bg-transparent border-none outline-none text-[12px] font-medium text-[#171717] placeholder-[#737373] w-full font-[inherit]"
          />
        </div>
        <button onClick={() => setView('notifications')} aria-label="Уведомления" className="w-[30px] h-[30px] flex items-center justify-center rounded-lg border-none bg-transparent cursor-pointer text-[#a8a8a8] hover:bg-[#0d0d0d] hover:text-white transition-all duration-[160ms] relative">
          <Bell className="w-[15px] h-[15px]" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          <div className="absolute top-[5px] right-[5px] w-[7px] h-[7px] bg-[#dc2626] rounded-full border-[1.5px] border-white" />
        </button>
        <button onClick={() => setView('settings')} aria-label="Настройки" className="w-[30px] h-[30px] flex items-center justify-center rounded-lg border-none bg-transparent cursor-pointer text-[#a8a8a8] hover:bg-[#0d0d0d] hover:text-white transition-all duration-[160ms]">
          <Settings className="w-[15px] h-[15px]" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </button>
      </div>
    </header>
  )
}
