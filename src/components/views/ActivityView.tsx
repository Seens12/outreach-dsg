'use client'

import { useState } from 'react'
import {
  Send,
  Bot,
  Flame,
  Users,
  Mail,
  Clock,
  Download,
  Radio,
  TrendingUp,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FilterPills } from '@/components/shared/FilterPills'
import { toast } from 'sonner'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ActionKind = 'sent' | 'ai-reply' | 'lead' | 'meeting' | 'received'

interface ActivityItem {
  id: string
  initials: string
  name: string
  company: string
  role: string
  action: ActionKind
  description: string
  timeAgo: string
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const actionConfig: Record<ActionKind, { label: string; dotColor: string; icon: typeof Send }> = {
  sent: { label: 'Отправлено', dotColor: 'bg-[#404040]', icon: Send },
  'ai-reply': { label: 'AI ответ', dotColor: 'bg-[#525252]', icon: Bot },
  lead: { label: 'Лид', dotColor: 'bg-[#0d0d0d]', icon: Flame },
  meeting: { label: 'Встреча', dotColor: 'bg-[#737373]', icon: Users },
  received: { label: 'Получено', dotColor: 'bg-[#a3a3a3]', icon: Mail },
}

const typeFilterOptions = [
  { key: 'all', label: 'Все типы' },
  { key: 'sent', label: 'Отправлено' },
  { key: 'received', label: 'Получено' },
  { key: 'ai-reply', label: 'AI ответы' },
  { key: 'lead', label: 'Лиды' },
  { key: 'meeting', label: 'Встречи' },
] as const

type FilterKey = (typeof typeFilterOptions)[number]['key']

const statusFilterOptions = [
  { key: 'all-status', label: 'Все статусы' },
  { key: 'success', label: 'Успешные' },
  { key: 'pending', label: 'Ожидающие' },
  { key: 'error', label: 'С ошибкой' },
] as const

type StatusFilterKey = (typeof statusFilterOptions)[number]['key']

// ---------------------------------------------------------------------------
// Demo data
// ---------------------------------------------------------------------------

const activities: ActivityItem[] = [
  {
    id: '1', initials: 'АП', name: 'Алексей Петров', company: 'TechCorp', role: 'CTO',
    action: 'sent', description: 'Отправлено письмо по шаблону "Первый контакт IT-лиды"', timeAgo: '5 мин назад',
  },
  {
    id: '2', initials: 'МИ', name: 'Мария Иванова', company: 'DataFlow Inc.', role: 'CPO',
    action: 'ai-reply', description: 'AI автоматически ответил на запрос о тарифах', timeAgo: '12 мин назад',
  },
  {
    id: '3', initials: 'ДК', name: 'Дмитрий Козлов', company: 'CloudBase', role: 'CEO',
    action: 'lead', description: 'Назначен горячим лидом — ответил на 3 письма подряд', timeAgo: '25 мин назад',
  },
  {
    id: '4', initials: 'ЕС', name: 'Елена Смирнова', company: 'ScaleUp Labs', role: 'VP Sales',
    action: 'received', description: 'Получен ответ на follow-up письмо', timeAgo: '40 мин назад',
  },
  {
    id: '5', initials: 'ИВ', name: 'Игорь Волков', company: 'DevStack', role: 'Директор',
    action: 'meeting', description: 'Запланирована демо-встреча на 22 января', timeAgo: '1 ч назад',
  },
  {
    id: '6', initials: 'НС', name: 'Наталья Соколова', company: 'MedTechPro', role: 'CMO',
    action: 'sent', description: 'Отправлено персонализированное письмо через AI', timeAgo: '1.5 ч назад',
  },
  {
    id: '7', initials: 'ОК', name: 'Олег Кузнецов', company: 'FinGroup', role: 'Head of IT',
    action: 'ai-reply', description: 'AI обработал вопрос об интеграции с CRM', timeAgo: '2 ч назад',
  },
  {
    id: '8', initials: 'АВ', name: 'Анна Волкова', company: 'RetailPlus', role: 'Commercial Dir.',
    action: 'received', description: 'Открыла письмо "Оптимизация продаж" 3 раза', timeAgo: '3 ч назад',
  },
  {
    id: '9', initials: 'СЛ', name: 'Сергей Лебедев', company: 'AgroTech', role: 'Директор',
    action: 'lead', description: 'Повышен до тёплого лида — запросил коммерческое предложение', timeAgo: '4 ч назад',
  },
  {
    id: '10', initials: 'ВЗ', name: 'Виктория Зайцева', company: 'EduPlatform', role: 'Product Owner',
    action: 'meeting', description: 'Завершена встреча по итогам пилотного проекта', timeAgo: '5 ч назад',
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ActivityView() {
  const [typeFilter, setTypeFilter] = useState<FilterKey>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilterKey>('all-status')

  const filtered = activities.filter((item) => {
    if (typeFilter !== 'all' && item.action !== typeFilter) return false
    return true
  })

  return (
    <div className="p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
              История активности
            </h1>
            <p className="text-[13px] text-[#737373] mt-1">
              Все действия и события в одном месте
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f5f5f5] text-[11px] font-medium text-[#525252] shrink-0">
            <Radio className="w-3 h-3" />
            Обновляется в реальном времени
          </span>
        </div>
        <Button
          onClick={() => toast.success('Экспорт запущен')}
          className="gap-2 bg-[#0d0d0d] text-white hover:bg-[#262626]"
        >
          <Download className="h-4 w-4" />
          Экспорт
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Событий сегодня', value: '10', icon: Clock },
          { label: 'AI автоответов', value: '2', icon: Bot },
          { label: 'Горячих лидов', value: '1', icon: Flame },
          { label: 'Ср. уверенность', value: '90%', icon: TrendingUp },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.label}
              className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-[#fafafa]">
                  <Icon className="w-4 h-4 text-[#525252]" />
                </div>
                <span className="text-[12.5px] text-[#737373] font-medium">{s.label}</span>
              </div>
              <div className="text-[24px] font-semibold text-[#0d0d0d] tracking-tight">
                {s.value}
              </div>
            </div>
          )
        })}
      </div>

      {/* Filter pills */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-5">
        <FilterPills options={typeFilterOptions} active={typeFilter} onChange={setTypeFilter} />
        <FilterPills options={statusFilterOptions} active={statusFilter} onChange={setStatusFilter} />
      </div>

      {/* Activity timeline */}
      <div className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card p-5">
        <div className="relative flex flex-col">
          {filtered.map((item, idx) => {
            const config = actionConfig[item.action]
            const isLast = idx === filtered.length - 1

            return (
              <div key={item.id} className="flex gap-4">
                {/* Timeline column */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-2.5 h-2.5 rounded-full shrink-0 mt-[6px] ${config.dotColor}`}
                  />
                  {!isLast && <div className="w-px flex-1 bg-[#f0f0f0] min-h-[12px]" />}
                </div>

                {/* Content */}
                <div className={`flex-1 flex flex-col gap-1 ${isLast ? 'pb-0' : 'pb-5'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Avatar */}
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#f5f5f5] text-[#525252] text-[11px] font-semibold shrink-0 border border-[#e8e8e8]">
                        {item.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[13px] font-semibold text-[#0d0d0d]">
                            {item.name}
                          </span>
                          <span className="text-[12px] text-[#a3a3a3]">
                            {item.company}
                          </span>
                          <span className="text-[12px] text-[#a3a3a3]">
                            &middot; {item.role}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-[2px] rounded-[6px] text-[11px] font-medium shrink-0 bg-[#f5f5f5] text-[#525252]`}
                    >
                      {config.label}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#737373] leading-relaxed mt-1">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-1 text-[12px] text-[#a3a3a3] mt-0.5">
                    <Clock className="w-3 h-3" />
                    {item.timeAgo}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
