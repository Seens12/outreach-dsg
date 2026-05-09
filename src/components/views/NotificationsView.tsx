'use client'

import { useState } from 'react'
import {
  User,
  AlertTriangle,
  CalendarClock,
  Mail,
  Bell,
  CheckCheck,
  MessageSquare,
  ShieldCheck,
  Zap,
  TrendingUp,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type NotificationType = 'user' | 'alert' | 'calendar' | 'mail' | 'system'
type NotificationPriority = 'high' | 'medium' | 'low'

interface Notification {
  id: string
  type: NotificationType
  title: string
  description: string
  time: string
  priority: NotificationPriority
  unread: boolean
}

// ---------------------------------------------------------------------------
// Demo data — 8 items
// ---------------------------------------------------------------------------

const notifications: Notification[] = [
  {
    id: '1',
    type: 'mail',
    title: 'Новый ответ от Алексея Петрова',
    description: 'Алексей Петров из ТехноСтарт ответил на ваше письмо. Конфиденциальность: 92%.',
    time: '5 мин назад',
    priority: 'high',
    unread: true,
  },
  {
    id: '2',
    type: 'alert',
    title: 'Spam rate превышает порог',
    description: 'Кампания "SaaS Q4" достигла spam rate 0.5%. Рекомендуется приостановить рассылку.',
    time: '15 мин назад',
    priority: 'high',
    unread: true,
  },
  {
    id: '3',
    type: 'user',
    title: 'Новый участник команды',
    description: 'Ольга Фёдорова приняла приглашение и присоединилась к команде.',
    time: '1 час назад',
    priority: 'medium',
    unread: true,
  },
  {
    id: '4',
    type: 'calendar',
    title: 'Напоминание о демо-звонке',
    description: 'Демо для FinBridge запланировано на сегодня в 15:00 по Москве.',
    time: '2 часа назад',
    priority: 'high',
    unread: true,
  },
  {
    id: '5',
    type: 'system',
    title: 'AI обучение завершено',
    description: 'Модель обучения обновлена. Точность ответов увеличена на 3.2%.',
    time: '3 часа назад',
    priority: 'medium',
    unread: true,
  },
  {
    id: '6',
    type: 'mail',
    title: 'Bounce: не удалось доставить письмо',
    description: 'Письмо d.kozlov@finbridge.ru отклонено сервером получателя.',
    time: '4 часа назад',
    priority: 'high',
    unread: true,
  },
  {
    id: '7',
    type: 'alert',
    title: 'Новый горячий лид',
    description: 'Роман Зайцев из Касперский проявил высокий интерес к продукту.',
    time: '5 часов назад',
    priority: 'medium',
    unread: false,
  },
  {
    id: '8',
    type: 'user',
    title: 'Роль обновлена',
    description: 'Анна Волкова переведена из роли "Специалист" в "Менеджер".',
    time: 'Вчера',
    priority: 'low',
    unread: false,
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const typeConfig: Record<NotificationType, { icon: React.ElementType; bgClass: string }> = {
  user: { icon: User, bgClass: 'bg-[#f5f5f5]' },
  alert: { icon: AlertTriangle, bgClass: 'bg-[#f5f5f5]' },
  calendar: { icon: CalendarClock, bgClass: 'bg-[#f5f5f5]' },
  mail: { icon: Mail, bgClass: 'bg-[#f5f5f5]' },
  system: { icon: Zap, bgClass: 'bg-[#f5f5f5]' },
}

const priorityConfig: Record<NotificationPriority, { label: string; className: string }> = {
  high: { label: 'Высокий', className: 'bg-[#f5f5f5] text-[#404040]' },
  medium: { label: 'Средний', className: 'bg-[#f5f5f5] text-[#525252]' },
  low: { label: 'Низкий', className: 'bg-[#f5f5f5] text-[#a3a3a3]' },
}

type FilterTab = 'unread' | 'mentions' | 'system'

const filterTabs: { key: FilterTab; label: string }[] = [
  { key: 'unread', label: 'Непрочитанные' },
  { key: 'mentions', label: 'Упоминания' },
  { key: 'system', label: 'Системные' },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NotificationsView() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('unread')
  const [items, setItems] = useState<Notification[]>(notifications)

  const unreadCount = items.filter((n) => n.unread).length
  const todayCount = 6
  const weekCount = 16
  const totalCount = 20

  const filtered = items.filter((item) => {
    if (activeFilter === 'unread') return item.unread
    if (activeFilter === 'mentions') return item.type === 'user' || item.type === 'mail'
    if (activeFilter === 'system') return item.type === 'system' || item.type === 'alert'
    return true
  })

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })))
    toast.success('Все уведомления отмечены как прочитанные')
  }

  return (
    <div className="p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#0d0d0d]" />
            <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
              Центр уведомлений
            </h1>
          </div>
          <div className="flex items-center gap-3 mt-2 text-[13px] text-[#737373] font-medium">
            <span>Непрочитанные <span className="text-[#171717] font-semibold">{unreadCount}</span></span>
            <span className="w-1 h-1 rounded-full bg-[#e8e8e8]" />
            <span>Сегодня <span className="text-[#171717] font-semibold">{todayCount}</span></span>
            <span className="w-1 h-1 rounded-full bg-[#e8e8e8]" />
            <span>На этой неделе <span className="text-[#525252] font-semibold">{weekCount}</span></span>
            <span className="w-1 h-1 rounded-full bg-[#e8e8e8]" />
            <span>Все <span className="text-[#737373] font-semibold">{totalCount}</span></span>
          </div>
        </div>
        <Button
          onClick={markAllRead}
          variant="outline"
          className="h-[36px] text-[13px] font-medium rounded-[8px] border-[#e8e8e8] text-[#525252] hover:bg-[#f5f5f5] gap-2"
        >
          <CheckCheck className="w-4 h-4" />
          Отметить все как прочитанные
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-5">
        {filterTabs.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={cn(
              'h-[32px] px-3 rounded-full text-[12.5px] font-medium transition-all duration-150 cursor-pointer border',
              activeFilter === f.key
                ? 'bg-[#0d0d0d] text-white border-[#0d0d0d]'
                : 'bg-white text-[#525252] border-[#e8e8e8] hover:bg-[#f5f5f5] hover:text-[#171717]'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#a3a3a3]">
            <Bell className="w-8 h-8 text-[#e8e8e8] mb-2" />
            <p className="text-[13px]">Нет уведомлений</p>
          </div>
        ) : (
          filtered.map((item) => {
            const type = typeConfig[item.type]
            const priority = priorityConfig[item.priority]
            const TypeIcon = type.icon
            return (
              <div
                key={item.id}
                className={cn(
                  'rounded-[10px] border bg-white shadow-card p-4 transition-all duration-150',
                  item.unread ? 'border-[#e8e8e8]' : 'border-[#f5f5f5]'
                )}
              >
                <div className="flex items-start gap-3.5">
                  {/* Icon */}
                  <div className={cn(
                    'flex items-center justify-center w-9 h-9 rounded-[8px] shrink-0 mt-0.5',
                    type.bgClass
                  )}>
                    <TypeIcon className="w-4 h-4 text-[#525252]" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {item.unread && (
                        <span className="w-[6px] h-[6px] rounded-full bg-[#0d0d0d] shrink-0" />
                      )}
                      <h3 className={cn(
                        'text-[13.5px] truncate',
                        item.unread ? 'font-semibold text-[#0d0d0d]' : 'font-medium text-[#525252]'
                      )}>
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[12.5px] text-[#737373] leading-relaxed mb-2">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-[11.5px] text-[#a3a3a3]">{item.time}</span>
                      <span className={cn(
                        'inline-flex items-center px-2 py-[2px] rounded-full text-[10.5px] font-semibold',
                        priority.className
                      )}>
                        {priority.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
