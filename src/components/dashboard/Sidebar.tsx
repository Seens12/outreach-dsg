'use client'

import { useState } from 'react'
import { useAppStore, viewMeta, type ViewId } from '@/lib/store'
import {
  Bot,
  LayoutDashboard,
  Megaphone,
  Inbox,
  Users,
  Contact,
  UserCog,
  BookOpen,
  Mail,
  Globe,
  FileText,
  Calendar,
  Activity,
  BarChart3,
  FileBarChart,
  Webhook,
  Database,
  FlaskConical,
  Bell,
  CreditCard,
  Shield,
  Settings,
  HelpCircle,
  ChevronDown,
  Zap,
  User,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

interface NavGroup {
  label: string
  items: { id: ViewId; icon: React.ElementType; badge?: number }[]
}

const COLLAPSIBLE_LABELS = new Set(['Настройка', 'Аккаунт'])

const navGroups: NavGroup[] = [
  {
    label: 'Основное',
    items: [
      { id: 'dashboard', icon: LayoutDashboard },
      { id: 'campaigns', icon: Megaphone, badge: 3 },
      { id: 'inbox', icon: Inbox, badge: 12 },
      { id: 'leads', icon: Users },
      { id: 'prospects', icon: Contact },
    ],
  },
  {
    label: 'Ресурсы',
    items: [
      { id: 'team', icon: UserCog },
      { id: 'knowledge-base', icon: BookOpen },
    ],
  },
  {
    label: 'Настройка',
    items: [
      { id: 'mailboxes', icon: Mail },
      { id: 'domains', icon: Globe },
      { id: 'templates', icon: FileText },
    ],
  },
  {
    label: 'Отслеживание',
    items: [
      { id: 'calendar', icon: Calendar },
      { id: 'activity', icon: Activity },
    ],
  },
  {
    label: 'Аналитика',
    items: [
      { id: 'analytics', icon: BarChart3 },
      { id: 'reports', icon: FileBarChart },
    ],
  },
  {
    label: 'Интеграции',
    items: [
      { id: 'webhooks', icon: Webhook },
      { id: 'crm', icon: Database },
      { id: 'ab-testing', icon: FlaskConical },
    ],
  },
  {
    label: 'Аккаунт',
    items: [
      { id: 'notifications', icon: Bell },
      { id: 'billing', icon: CreditCard },
      { id: 'security', icon: Shield },
      { id: 'settings', icon: Settings },
    ],
  },
  {
    label: 'Поддержка',
    items: [
      { id: 'help', icon: HelpCircle },
    ],
  },
  {
    label: 'Администрирование',
    items: [
      { id: 'admin', icon: Shield },
      { id: 'admin-tenants', icon: Database },
      { id: 'admin-users', icon: Users },
      { id: 'admin-system', icon: Settings },
      { id: 'admin-logs', icon: Activity },
      { id: 'admin-billing', icon: CreditCard },
    ],
  },
]

export function Sidebar() {
  const { view, mode, setView, setMode, sidebarOpen, toggleSidebar } = useAppStore()
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())

  const toggleGroup = (label: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(label)) {
        next.delete(label)
      } else {
        next.add(label)
      }
      return next
    })
  }

  return (
    <aside
      className={cn(
        'flex flex-col bg-[#fafafa] border-r border-[#e8e8e8] flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden z-40',
        sidebarOpen ? 'w-[232px]' : 'w-0 opacity-0 pointer-events-none'
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#e8e8e8]">
        <div className="flex items-center gap-2.5">
          <div className="w-[26px] h-[26px] bg-[#0d0d0d] rounded-[7px] flex items-center justify-center flex-shrink-0">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold tracking-[-0.02em] whitespace-nowrap">OutreachAI</span>
        </div>
        <span className="text-[10px] font-semibold tracking-[0.04em] uppercase px-2 py-0.5 rounded-full bg-[#0d0d0d] text-white">
          PRO
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2.5 px-2 overflow-y-auto custom-scroll">
        {navGroups.map((group) => {
          const isCollapsible = COLLAPSIBLE_LABELS.has(group.label)
          const isCollapsed = collapsed.has(group.label)
          return (
          <div key={group.label} className="mb-4">
            {isCollapsible ? (
              <button
                onClick={() => toggleGroup(group.label)}
                className="w-full flex items-center justify-between px-2 mb-1 cursor-pointer group/label"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#737373] group-hover/label:text-[#525252] transition-colors">
                  {group.label}
                </span>
                <ChevronDown
                  className={cn(
                    'w-3 h-3 text-[#737373] transition-transform duration-300',
                    isCollapsed && '-rotate-90'
                  )}
                />
              </button>
            ) : (
              <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#737373] px-2 mb-1">
                {group.label}
              </div>
            )}
            <div
              className={cn(
                'overflow-hidden transition-all duration-300',
                isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'
              )}
            >
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = mode === 'expanded' && view === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setView(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'w-full flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-[13px] font-medium whitespace-nowrap transition-all duration-[160ms] mb-[1px] relative',
                      isActive
                        ? 'bg-[#0d0d0d] text-white'
                        : 'text-[#525252] hover:bg-[#0d0d0d] hover:text-white'
                    )}
                  >
                    <Icon
                      className="w-[15px] h-[15px] flex-shrink-0"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <span className="flex-1 text-left">{viewMeta[item.id].title}</span>
                    {item.badge && (
                      <span
                        className={cn(
                          'text-[10.5px] font-semibold min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full',
                          isActive ? 'bg-white/20 text-white' : 'bg-[#e8e8e8] text-[#525252]'
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                    {!item.badge && isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a] ml-auto" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
          )
        })}
      </nav>

      {/* User */}
      <div className="border-t border-[#e8e8e8] px-3 py-2.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="w-full flex items-center gap-2 px-1.5 py-1.5 rounded-lg hover:bg-[#0d0d0d] hover:text-white transition-all duration-[160ms] group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-[#0d0d0d] text-white text-[10.5px] font-bold flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-[#0d0d0d] transition-colors">
                АК
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="text-[12.5px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                  Алексей Козлов
                </div>
                <div className="text-[11px] text-[#737373] group-hover:text-white/60 transition-colors">Pro план</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#a8a8a8] group-hover:text-white/60 transition-colors" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px] rounded-[10px] border-[#e8e8e8] bg-white p-1" side="top" align="start">
            <div className="px-2 py-1.5">
              <div className="text-[12.5px] font-semibold text-[#171717]">Алексей Козлов</div>
              <div className="text-[11px] text-[#737373]">alexey@company.ru</div>
            </div>
            <DropdownMenuSeparator className="bg-[#e8e8e8]" />
            <DropdownMenuItem onClick={() => setView('settings')} className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-[13px] text-[#404040] focus:bg-[#f5f5f5] focus:text-[#171717]">
              <User className="w-[14px] h-[14px]" strokeWidth={1.8} />
              Профиль
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setView('security')} className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-[13px] text-[#404040] focus:bg-[#f5f5f5] focus:text-[#171717]">
              <Shield className="w-[14px] h-[14px]" strokeWidth={1.8} />
              Безопасность
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setView('billing')} className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-[13px] text-[#404040] focus:bg-[#f5f5f5] focus:text-[#171717]">
              <CreditCard className="w-[14px] h-[14px]" strokeWidth={1.8} />
              Биллинг
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setView('settings')} className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-[13px] text-[#404040] focus:bg-[#f5f5f5] focus:text-[#171717]">
              <Settings className="w-[14px] h-[14px]" strokeWidth={1.8} />
              Настройки
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#e8e8e8]" />
            <DropdownMenuItem onClick={() => toast.info('Выход из аккаунта')} className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-[13px] text-[#dc2626] focus:bg-[#fef2f2] focus:text-[#dc2626]">
              <LogOut className="w-[14px] h-[14px]" strokeWidth={1.8} />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}
