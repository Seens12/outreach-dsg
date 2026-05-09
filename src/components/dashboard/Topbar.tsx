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
  User,
  CreditCard,
  Shield,
  Mail,
  Clock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
                ? 'bg-white text-[#171717] shadow-card font-semibold'
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
                ? 'bg-white text-[#171717] shadow-card font-semibold'
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
        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button aria-label="Уведомления" className="w-[30px] h-[30px] flex items-center justify-center rounded-lg border-none bg-transparent cursor-pointer text-[#a8a8a8] hover:bg-[#0d0d0d] hover:text-white transition-all duration-[160ms] relative">
              <Bell className="w-[15px] h-[15px]" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
              <div className="absolute top-[5px] right-[5px] w-[7px] h-[7px] bg-[#dc2626] rounded-full border-[1.5px] border-white" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[280px] rounded-[10px] border-[#e8e8e8] bg-white p-1" side="bottom" align="end">
            <div className="px-2 py-1.5 mb-1">
              <span className="text-[12.5px] font-semibold text-[#171717]">Уведомления</span>
            </div>
            <div className="px-1">
              <button onClick={() => setView('notifications')} className="w-full flex items-start gap-2.5 px-2 py-2 rounded-lg hover:bg-[#f5f5f5] transition-colors cursor-pointer text-left">
                <div className="w-7 h-7 rounded-full bg-[#f5f5f5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-[#525252]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12.5px] font-medium text-[#171717]">Новое письмо от TechCorp</div>
                  <div className="text-[11px] text-[#a3a3a3] mt-0.5">2 мин назад</div>
                </div>
              </button>
              <button onClick={() => setView('notifications')} className="w-full flex items-start gap-2.5 px-2 py-2 rounded-lg hover:bg-[#f5f5f5] transition-colors cursor-pointer text-left">
                <div className="w-7 h-7 rounded-full bg-[#f5f5f5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bell className="w-3.5 h-3.5 text-[#525252]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12.5px] font-medium text-[#171717]">Кампания B2B SaaS завершена</div>
                  <div className="text-[11px] text-[#a3a3a3] mt-0.5">1 ч назад</div>
                </div>
              </button>
              <button onClick={() => setView('notifications')} className="w-full flex items-start gap-2.5 px-2 py-2 rounded-lg hover:bg-[#f5f5f5] transition-colors cursor-pointer text-left">
                <div className="w-7 h-7 rounded-full bg-[#f5f5f5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5 text-[#525252]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12.5px] font-medium text-[#171717]">Новый лид: DataFlow Inc.</div>
                  <div className="text-[11px] text-[#a3a3a3] mt-0.5">3 ч назад</div>
                </div>
              </button>
            </div>
            <DropdownMenuSeparator className="bg-[#e8e8e8]" />
            <DropdownMenuItem onClick={() => setView('notifications')} className="flex items-center justify-center px-2 py-1.5 rounded-lg cursor-pointer text-[12.5px] font-medium text-[#525252] focus:bg-[#f5f5f5] focus:text-[#171717]">
              Все уведомления
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button aria-label="Настройки" className="w-[30px] h-[30px] flex items-center justify-center rounded-lg border-none bg-transparent cursor-pointer text-[#a8a8a8] hover:bg-[#0d0d0d] hover:text-white transition-all duration-[160ms]">
              <Settings className="w-[15px] h-[15px]" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[180px] rounded-[10px] border-[#e8e8e8] bg-white p-1" side="bottom" align="end">
            <DropdownMenuItem onClick={() => setView('settings')} className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-[13px] text-[#404040] focus:bg-[#f5f5f5] focus:text-[#171717]">
              <Settings className="w-[14px] h-[14px]" strokeWidth={1.8} />
              Настройки
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setView('notifications')} className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-[13px] text-[#404040] focus:bg-[#f5f5f5] focus:text-[#171717]">
              <Bell className="w-[14px] h-[14px]" strokeWidth={1.8} />
              Уведомления
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setView('security')} className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-[13px] text-[#404040] focus:bg-[#f5f5f5] focus:text-[#171717]">
              <Shield className="w-[14px] h-[14px]" strokeWidth={1.8} />
              Безопасность
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setView('billing')} className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-[13px] text-[#404040] focus:bg-[#f5f5f5] focus:text-[#171717]">
              <CreditCard className="w-[14px] h-[14px]" strokeWidth={1.8} />
              Биллинг
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
