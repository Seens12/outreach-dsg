'use client'

import { useState } from 'react'
import {
  Send,
  Mail,
  MailOpen,
  Reply,
  Phone,
  Users,
  StickyNote,
  Calendar,
  Clock,
  Filter,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/shared/EmptyState'

type ActivityType =
  | 'email_sent'
  | 'email_opened'
  | 'reply_received'
  | 'call_scheduled'
  | 'meeting_completed'
  | 'note_added'

interface ActivityItem {
  id: string
  type: ActivityType
  description: string
  boldParts?: string
  timestamp: string
  contactName?: string
}

const activityTypeConfig: Record<
  ActivityType,
  { icon: typeof Send; color: string; bgColor: string; label: string }
> = {
  email_sent: {
    icon: Send,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    label: 'Отправлено',
  },
  email_opened: {
    icon: MailOpen,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    label: 'Открыто',
  },
  reply_received: {
    icon: Reply,
    color: 'text-[#2563eb]',
    bgColor: 'bg-blue-50',
    label: 'Ответ',
  },
  call_scheduled: {
    icon: Phone,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    label: 'Звонок',
  },
  meeting_completed: {
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    label: 'Встреча',
  },
  note_added: {
    icon: StickyNote,
    color: 'text-[#525252]',
    bgColor: 'bg-[#fafafa]',
    label: 'Заметка',
  },
}

const filterPills = [
  { key: 'all', label: 'Все' },
  { key: 'sent', label: 'Отправленные' },
  { key: 'received', label: 'Полученные' },
  { key: 'calls', label: 'Звонки' },
] as const

type FilterKey = (typeof filterPills)[number]['key']

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'email_sent',
    description:
      'Отправлено письмо Алексею Петрову по шаблону "Первый контакт IT-лиды"',
    boldParts: 'Алексею Петрову',
    timestamp: '5 мин назад',
    contactName: 'Алексей Петров',
  },
  {
    id: '2',
    type: 'email_opened',
    description: 'Мария Иванова открыла письмо "Оптимизация инфраструктуры"',
    boldParts: 'Мария Иванова',
    timestamp: '12 мин назад',
    contactName: 'Мария Иванова',
  },
  {
    id: '3',
    type: 'reply_received',
    description: 'Получен ответ от Дмитрия Смирнова на follow-up письмо',
    boldParts: 'ответ от Дмитрия Смирнова',
    timestamp: '35 мин назад',
    contactName: 'Дмитрий Смирнов',
  },
  {
    id: '4',
    type: 'call_scheduled',
    description: 'Запланирован звонок с Еленой Козловой на завтра 10:00',
    boldParts: 'звонок с Еленой Козловой',
    timestamp: '1 час назад',
    contactName: 'Елена Козлова',
  },
  {
    id: '5',
    type: 'meeting_completed',
    description: 'Завершена встреча с Олегом Новиковым по интеграции',
    boldParts: 'встреча с Олегом Новиковым',
    timestamp: '2 часа назад',
    contactName: 'Олег Новиков',
  },
  {
    id: '6',
    type: 'note_added',
    description: 'Добавлена заметка к контакту Анна Волкова: "Заинтересована в демо"',
    boldParts: 'Анна Волкова',
    timestamp: '3 часа назад',
    contactName: 'Анна Волкова',
  },
  {
    id: '7',
    type: 'email_sent',
    description: 'Отправлено письмо Ивану Соколову по шаблону "Реактивация контакта"',
    boldParts: 'Ивану Соколову',
    timestamp: '3 часа назад',
    contactName: 'Иван Соколов',
  },
  {
    id: '8',
    type: 'email_opened',
    description: 'Наталья Морозова открыла письмо 3 раза',
    boldParts: 'Наталья Морозова',
    timestamp: '4 часа назад',
    contactName: 'Наталья Морозова',
  },
  {
    id: '9',
    type: 'reply_received',
    description: 'Получен положительный ответ от Сергея Лебедева',
    boldParts: 'ответ от Сергея Лебедева',
    timestamp: '5 часов назад',
    contactName: 'Сергей Лебедев',
  },
  {
    id: '10',
    type: 'call_scheduled',
    description: 'Запланирован звонок с Викторией Зайцевой на 22 янв',
    boldParts: 'звонок с Викторией Зайцевой',
    timestamp: '6 часов назад',
    contactName: 'Виктория Зайцева',
  },
]

function renderDescription(item: ActivityItem) {
  if (!item.boldParts) return item.description

  const parts = item.description.split(item.boldParts)
  return (
    <>
      {parts[0]}
      <span className="font-semibold text-[#0d0d0d]">{item.boldParts}</span>
      {parts[1]}
    </>
  )
}

export default function ActivityView() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  const filteredActivities = activities.filter((item) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'sent') return item.type === 'email_sent'
    if (activeFilter === 'received')
      return (
        item.type === 'email_opened' ||
        item.type === 'reply_received'
      )
    if (activeFilter === 'calls') return item.type === 'call_scheduled'
    return true
  })

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">Активность</h1>
        <p className="text-[13px] text-[#737373]">История всех действий</p>
      </div>

      {/* Filter row */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {filterPills.map((pill) => (
            <button
              key={pill.key}
              onClick={() => setActiveFilter(pill.key)}
              className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
                activeFilter === pill.key
                  ? 'bg-[#0d0d0d] text-white'
                  : 'bg-[#fafafa] text-[#525252] hover:bg-[#f0f0f0]'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Date range indicator */}
        <div className="flex items-center gap-2 rounded-lg bg-[#fafafa] px-3 py-2 text-[13px] text-[#525252]">
          <Calendar className="h-3.5 w-3.5 text-[#a3a3a3]" />
          <span>15 янв — 20 янв 2025</span>
        </div>
      </div>

      {/* Activity timeline */}
      <div className="rounded-[10px] border border-[#e8e8e8] bg-white p-5">
        <div className="relative flex flex-col">
          {filteredActivities.length === 0 ? (
            <EmptyState
              icon={Activity}
              title="Нет активности"
              description="Нет записей для выбранного фильтра"
            />
          ) : (
          <>
          {filteredActivities.map((item, idx) => {
            const config = activityTypeConfig[item.type]
            const Icon = config.icon
            const isLast = idx === filteredActivities.length - 1

            return (
              <div
                key={item.id}
                className="flex gap-4"
              >
                {/* Timeline column */}
                <div className="flex flex-col items-center">
                  {/* Icon */}
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.bgColor}`}
                  >
                    <Icon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  {/* Connector line */}
                  {!isLast && (
                    <div className="w-px flex-1 bg-[#f0f0f0]" />
                  )}
                </div>

                {/* Content */}
                <div className={`flex flex-1 flex-col gap-1 pb-6 ${isLast ? 'pb-0' : ''}`}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <p className="flex-1 text-[13px] leading-relaxed text-[#525252]">
                      {renderDescription(item)}
                    </p>
                    <div className="flex items-center gap-2 shrink-0 sm:flex-row-reverse">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${config.bgColor} ${config.color}`}
                      >
                        {config.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[12px] text-[#a3a3a3]">
                    <Clock className="h-3 w-3" />
                    {item.timestamp}
                  </div>
                </div>
              </div>
            )
          })}
          </>
          )}
        </div>
      </div>
    </div>
  )
}
