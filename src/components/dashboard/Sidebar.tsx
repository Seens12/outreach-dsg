'use client'

import { useState } from 'react'
import { useAppStore, viewMeta, type ViewId } from '@/lib/store'
import {

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
  MessageSquare,
  Plus,
  Search,
  MoreHorizontal,
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

const DEFAULT_COLLAPSED = new Set(['Администрирование'])

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

// Demo chat list for Chat mode
const chatList = [
  { id: '1', title: 'Анализ Яндекс', preview: 'Рекомендую обращаться к...', time: '12:45', active: false },
  { id: '2', title: 'Письмо для TechCorp', preview: 'Тема: Автоматизация outreach...', time: '11:30', active: false },
  { id: '3', title: 'Стратегия IT-компаний', preview: '1. Сегментация аудитории...', time: 'Вчера', active: false },
  { id: '4', title: 'Новая кампания B2B', preview: 'Создать outreach-кампанию...', time: 'Вчера', active: true },
  { id: '5', title: 'Лиды DataFlow Inc.', preview: 'Новый лид добавлен в CRM', time: '2 дня', active: false },
  { id: '6', title: 'Шаблон приветствия', preview: 'Уважаемый [Имя], заметил...', time: '3 дня', active: false },
]

export function Sidebar() {
  const { view, mode, setView, sidebarOpen, toggleSidebar } = useAppStore()
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set(DEFAULT_COLLAPSED))
  const isChat = mode === 'chat'

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
        sidebarOpen ? 'w-[232px]' : 'w-[52px]'
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#e8e8e8] h-[52px]">
        <div className="flex items-center gap-2.5">
          <div className="w-[26px] h-[26px] bg-[#0d0d0d] rounded-[7px] flex items-center justify-center flex-shrink-0">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          {sidebarOpen && (
            <span className="text-sm font-semibold tracking-[-0.02em] whitespace-nowrap">OutreachAI</span>
          )}
        </div>
        {sidebarOpen && (
          <span className="text-[10px] font-semibold tracking-[0.04em] uppercase px-2 py-0.5 rounded-full bg-[#0d0d0d] text-white">
            PRO
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2.5 overflow-y-auto custom-scroll">
        {isChat ? (
          /* ── Chat Mode: Chat List ── */
          <div className="px-2">
            {/* New chat button */}
            {sidebarOpen ? (
              <button
                onClick={() => toast.success('Новый чат')}
                className="w-full flex items-center gap-2 px-2 py-2 rounded-lg border border-dashed border-[#d4d4d4] text-[12.5px] text-[#737373] hover:bg-[#f5f5f5] hover:border-[#a8a8a8] transition-colors cursor-pointer mb-3"
              >
                <Plus className="w-3.5 h-3.5" />
                Новый чат
              </button>
            ) : (
              <button
                onClick={() => toast.success('Новый чат')}
                className="w-full flex items-center justify-center py-2 rounded-lg cursor-pointer text-[#737373] hover:bg-[#0d0d0d] hover:text-white transition-all duration-[160ms] mb-1"
                title="Новый чат"
              >
                <Plus className="w-4 h-4" strokeWidth={1.8} />
              </button>
            )}

            {/* Search */}
            {sidebarOpen ? (
              <div className="flex items-center gap-2 bg-white border border-[#e8e8e8] rounded-lg px-2.5 py-1.5 mb-3">
                <Search className="w-3 h-3 text-[#a8a8a8]" />
                <input
                  type="text"
                  placeholder="Поиск чатов..."
                  className="bg-transparent text-[12px] outline-none placeholder:text-[#a3a3a3] w-full"
                />
              </div>
            ) : (
              <button
                className="w-full flex items-center justify-center py-2 rounded-lg cursor-pointer text-[#737373] hover:bg-[#0d0d0d] hover:text-white transition-all duration-[160ms] mb-1"
                title="Поиск чатов"
              >
                <Search className="w-4 h-4" strokeWidth={1.8} />
              </button>
            )}

            {/* Separator: visually separate actions from chat list */}
            <div className={cn('border-t border-[#e8e8e8]', sidebarOpen ? 'my-2.5' : 'mx-3 my-2')} />

            {/* Chat items */}
            {chatList.map((chat) => (
              <button
                key={chat.id}
                className={cn(
                  'w-full flex rounded-lg cursor-pointer transition-all duration-[160ms] mb-[2px] text-left',
                  sidebarOpen ? 'items-start gap-2 px-2 py-2' : 'items-center justify-center py-1.5',
                  chat.active
                    ? 'bg-[#0d0d0d] text-white'
                    : 'text-[#525252] hover:bg-[#0d0d0d] hover:text-white',
                )}
              >
                <MessageSquare className={cn('w-4 h-4 shrink-0', sidebarOpen && 'mt-0.5', chat.active ? 'text-white' : 'text-[#a8a8a8]')} />
                {sidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-medium truncate">{chat.title}</div>
                    <div className={cn('text-[11px] truncate mt-0.5', chat.active ? 'text-white/60' : 'text-[#a3a3a3]')}>
                      {chat.preview}
                    </div>
                  </div>
                )}
                {sidebarOpen && (
                  <span className={cn('text-[10px] shrink-0 mt-0.5', chat.active ? 'text-white/50' : 'text-[#a3a3a3]')}>
                    {chat.time}
                  </span>
                )}
              </button>
            ))}
          </div>
        ) : (
          /* ── Expanded Mode: Nav Groups ── */
          <div className="px-2">
            {navGroups.map((group) => {
              const isCollapsed = collapsed.has(group.label)
              return (
                <div key={group.label} className="mb-3">
                  {sidebarOpen ? (
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
                          isCollapsed && '-rotate-90',
                        )}
                      />
                    </button>
                  ) : (
                    /* Collapsed: show first icon of group as section icon */
                    <button
                      onClick={() => toggleGroup(group.label)}
                      className="w-full flex items-center justify-center py-1.5 mb-1 cursor-pointer group/label"
                      title={group.label}
                    >
                      {(() => {
                        const FirstIcon = group.items[0].icon
                        return <FirstIcon className="w-4 h-4 text-[#737373] group-hover/label:text-[#525252] transition-colors" strokeWidth={1.8} />
                      })()}
                    </button>
                  )}
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
                      isCollapsed && sidebarOpen ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100',
                      !sidebarOpen && isCollapsed && 'max-h-0 opacity-0',
                    )}
                  >
                    {group.items.map((item) => {
                      const Icon = item.icon
                      const isActive = view === item.id
                      return sidebarOpen ? (
                        <button
                          key={item.id}
                          onClick={() => setView(item.id)}
                          aria-current={isActive ? 'page' : undefined}
                          className={cn(
                            'w-full flex items-center gap-2 pl-4 pr-2 py-1.5 rounded-lg cursor-pointer text-[13px] font-medium whitespace-nowrap transition-all duration-[160ms] mb-[1px]',
                            isActive
                              ? 'bg-[#0d0d0d] text-white'
                              : 'text-[#525252] hover:bg-[#0d0d0d] hover:text-white',
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
                                isActive ? 'bg-white/20 text-white' : 'bg-[#e8e8e8] text-[#525252]',
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                          {!item.badge && isActive && (
                            <span className="min-w-[18px] h-[18px] flex items-center justify-center ml-auto">
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            </span>
                          )}
                        </button>
                      ) : (
                        /* Collapsed sidebar: icon-only button */
                        <button
                          key={item.id}
                          onClick={() => setView(item.id)}
                          title={viewMeta[item.id].title}
                          aria-current={isActive ? 'page' : undefined}
                          className={cn(
                            'w-full flex items-center justify-center py-1.5 rounded-lg cursor-pointer transition-all duration-[160ms] mb-[1px] relative',
                            isActive
                              ? 'bg-[#0d0d0d] text-white'
                              : 'text-[#525252] hover:bg-[#0d0d0d] hover:text-white',
                          )}
                        >
                          <Icon
                            className="w-[15px] h-[15px] flex-shrink-0"
                            strokeWidth={1.8}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {item.badge && !isActive && (
                            <span className="absolute top-1 right-1 text-[9px] font-bold min-w-[14px] h-[14px] px-0.5 flex items-center justify-center rounded-full bg-[#e8e8e8] text-[#525252]">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </nav>

      {/* Credits bar — only in Chat mode */}
      {isChat && (
        <div className="border-t border-[#e8e8e8]">
          {sidebarOpen ? (
            <div className="px-3 py-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-[4px] bg-[#0d0d0d] flex items-center justify-center">
                    <Zap className="w-2 h-2 text-white" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#525252] uppercase tracking-[0.04em]">AI кредиты</span>
                </div>
                <button
                  onClick={() => { setView('billing'); toast.success('Управление кредитами') }}
                  className="text-[10.5px] font-medium text-[#0d0d0d] hover:underline cursor-pointer"
                >
                  Пополнить
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-[#f0f0f0] overflow-hidden">
                  <div className="h-full rounded-full bg-[#0d0d0d]" style={{ width: '37%' }} />
                </div>
                <span className="text-[11px] font-semibold text-[#171717] shrink-0">3 700</span>
                <span className="text-[10px] text-[#a3a3a3] shrink-0">/ 10 000</span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => { setView('billing'); toast.success('Управление кредитами') }}
              className="w-full flex items-center justify-center py-2 cursor-pointer text-[#737373] hover:bg-[#0d0d0d] hover:text-white transition-all duration-[160ms]"
              title="AI кредиты: 3 700 / 10 000"
            >
              <Zap className="w-4 h-4" strokeWidth={1.8} />
            </button>
          )}
        </div>
      )}

      {/* User */}
      <div className="border-t border-[#e8e8e8] px-2 py-2.5">
        {sidebarOpen ? (
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
              <DropdownMenuItem onClick={() => toast.info('Выход из аккаунта')} className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-[13px] text-[#be123c] focus:bg-[#fef2f2] focus:text-[#be123c]">
                <LogOut className="w-[14px] h-[14px]" strokeWidth={1.8} />
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button className="w-full flex items-center justify-center py-1.5 cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-[#0d0d0d] text-white text-[10.5px] font-bold flex items-center justify-center">
              АК
            </div>
          </button>
        )}
      </div>
    </aside>
  )
}
