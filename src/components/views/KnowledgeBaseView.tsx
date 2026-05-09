'use client'

import { useState } from 'react'
import {
  Globe,
  DollarSign,
  BookOpen,
  HelpCircle,
  FileText,
  Plus,
  Upload,
  FileCheck,
  FileQuestion,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FilterPills } from '@/components/shared/FilterPills'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SourceType = 'web' | 'price' | 'cases' | 'faq' | 'scripts'
type SourceStatus = 'Активен' | 'Устаревает' | 'Черновик'

interface KnowledgeSource {
  id: string
  name: string
  type: SourceType
  meta: string
  status: SourceStatus
  ttl: string
  ttlColor: string
}

// ---------------------------------------------------------------------------
// Demo data
// ---------------------------------------------------------------------------

type CategoryKey = 'all' | 'web' | 'price' | 'cases' | 'faq' | 'scripts'

const categoryOptions: { key: CategoryKey; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'web', label: 'Веб-источники (1)' },
  { key: 'price', label: 'Цены (1)' },
  { key: 'cases', label: 'Кейсы (1)' },
  { key: 'faq', label: 'FAQ (1)' },
  { key: 'scripts', label: 'Скрипты (1)' },
]

const sources: KnowledgeSource[] = [
  {
    id: '1',
    name: 'Сайт компании',
    type: 'web',
    meta: '23 страницы · Обновлено 3 мая',
    status: 'Активен',
    ttl: 'TTL: нет',
    ttlColor: 'text-[#a3a3a3]',
  },
  {
    id: '2',
    name: 'Прайс-лист',
    type: 'price',
    meta: 'Версия 2.1 · Действителен до 1 сент',
    status: 'Активен',
    ttl: 'TTL: 115 дней',
    ttlColor: 'text-[#a16207]',
  },
  {
    id: '3',
    name: 'Кейсы клиентов',
    type: 'cases',
    meta: '8 кейсов · 4 отрасли',
    status: 'Активен',
    ttl: 'TTL: нет',
    ttlColor: 'text-[#a3a3a3]',
  },
  {
    id: '4',
    name: 'FAQ — возражения',
    type: 'faq',
    meta: '47 вопросов и ответов',
    status: 'Активен',
    ttl: 'TTL: нет',
    ttlColor: 'text-[#a3a3a3]',
  },
  {
    id: '5',
    name: 'Скрипты продаж',
    type: 'scripts',
    meta: 'Версия 1.3 · Нужно обновить',
    status: 'Устаревает',
    ttl: 'TTL: 7 дней',
    ttlColor: 'text-[#be123c]',
  },
  {
    id: '6',
    name: 'Кейс: АгроХолдинг',
    type: 'cases',
    meta: '12 страниц · Обновлено 12 янв',
    status: 'Черновик',
    ttl: 'TTL: нет',
    ttlColor: 'text-[#a3a3a3]',
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const statusStyles: Record<SourceStatus, string> = {
  'Активен': 'bg-[#f5f5f5] text-[#404040]',
  'Устаревает': 'bg-[#f5f5f5] text-[#a3a3a3]',
  'Черновик': 'bg-[#f5f5f5] text-[#525252]',
}

const typeConfig: Record<SourceType, { icon: typeof Globe; iconBg: string; iconColor: string }> = {
  web: { icon: Globe, iconBg: 'bg-[#dbeafe]', iconColor: 'text-[#3b82f6]' },
  price: { icon: DollarSign, iconBg: 'bg-[#fafafa]', iconColor: 'text-[#a16207]' },
  cases: { icon: BookOpen, iconBg: 'bg-[#dcfce7]', iconColor: 'text-[#15803d]' },
  faq: { icon: HelpCircle, iconBg: 'bg-[#ede9fe]', iconColor: 'text-[#7c3aed]' },
  scripts: { icon: FileText, iconBg: 'bg-[#fce7f3]', iconColor: 'text-[#be123c]' },
}

const coverageTopics = [
  { name: 'Дорого / не хватает бюджета', pct: 90 },
  { name: 'Уже есть поставщик', pct: 80 },
  { name: 'Не сейчас', pct: 60 },
  { name: 'Безопасность данных', pct: 30 },
  { name: 'Интеграция с 1С', pct: 0 },
]

function coverageColor(pct: number): string {
  if (pct >= 75) return 'bg-[#bbf7d0]'
  if (pct >= 50) return 'bg-[#fde68a]'
  return 'bg-[#fecdd3]'
}

function coveragePctColor(pct: number): string {
  if (pct >= 75) return 'text-[#15803d]'
  if (pct >= 50) return 'text-[#a16207]'
  if (pct > 0) return 'text-[#be123c]'
  return 'text-[#be123c]'
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function KnowledgeBaseView() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all')

  const filtered = sources.filter((s) => {
    if (activeCategory === 'all') return true
    return s.type === activeCategory
  })

  return (
    <div className="p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
            База знаний
          </h1>
          <p className="text-[13px] text-[#737373] mt-1">
            Обучайте агента на данных вашей компании
          </p>
        </div>
        <Button
          onClick={() => toast.success('Добавление источника')}
          className="gap-2 bg-[#0d0d0d] text-white hover:bg-[#262626]"
        >
          <Plus className="h-4 w-4" />
          Добавить
        </Button>
      </div>

      {/* Readiness section */}
      <div className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card p-5 mb-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-[15px] font-semibold text-[#0d0d0d]">Готовность агента</div>
            <div className="text-[12.5px] text-[#737373] mt-1">
              Агент может обработать 68% входящих самостоятельно
            </div>
          </div>
          <div className="text-[22px] font-bold text-[#a16207]">68%</div>
        </div>

        {/* Main coverage bar */}
        <div className="w-full h-2 bg-[#fafafa] rounded-full overflow-hidden mb-4">
          <div
            className="h-full rounded-full bg-[#a16207] transition-all duration-500"
            style={{ width: '68%' }}
          />
        </div>

        {/* Topics */}
        <div className="text-[11.5px] text-[#737373] mb-2.5">Покрытие возражений:</div>
        <div className="space-y-2">
          {coverageTopics.map((topic) => (
            <div key={topic.name} className="flex items-center gap-3">
              <span className="text-[12.5px] text-[#404040] w-[200px] shrink-0 truncate">
                {topic.name}
              </span>
              <div className="flex-1 h-1.5 bg-[#fafafa] rounded-full overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-500', coverageColor(topic.pct))}
                  style={{ width: `${Math.max(topic.pct, 0)}%` }}
                />
              </div>
              <span
                className={cn('text-[12px] font-semibold w-[36px] text-right shrink-0', coveragePctColor(topic.pct))}
              >
                {topic.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Category filter pills */}
      <div className="mb-5">
        <FilterPills
          options={categoryOptions}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((source) => {
          const cfg = typeConfig[source.type]
          const TypeIcon = cfg.icon
          return (
            <div
              key={source.id}
              className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card p-4 hover:border-[#d4d4d4] transition-colors cursor-pointer group"
              onClick={() => toast.info(`Открыт: ${source.name}`)}
            >
              {/* Icon */}
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-[10px] mb-3 transition-colors',
                  cfg.iconBg
                )}
              >
                <TypeIcon className={cn('w-5 h-5', cfg.iconColor)} />
              </div>

              {/* Name */}
              <div className="text-[13.5px] font-semibold text-[#0d0d0d] mb-1">
                {source.name}
              </div>

              {/* Meta */}
              <div className="text-[12px] text-[#737373] mb-3">
                {source.meta}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'inline-flex items-center px-2.5 py-[3px] rounded-[6px] text-[11.5px] font-medium',
                    statusStyles[source.status]
                  )}
                >
                  {source.status}
                </span>
                <span className={cn('text-[11px]', source.ttlColor)}>
                  {source.ttl}
                </span>
              </div>
            </div>
          )
        })}

        {/* Add source dashed card */}
        <div
          className="rounded-[10px] border-2 border-dashed border-[#e0e0e0] bg-[#fafafa] hover:bg-[#f5f5f5] hover:border-[#d0d0d0] transition-colors cursor-pointer flex flex-col items-center justify-center p-6 min-h-[140px]"
          onClick={() => toast.success('Добавление источника')}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-[10px] bg-[#f0f0f0] mb-3">
            <Plus className="w-5 h-5 text-[#a3a3a3]" />
          </div>
          <div className="text-[13.5px] font-medium text-[#737373] mb-1">
            Добавить источник
          </div>
          <div className="text-[12px] text-[#a3a3a3]">
            PDF, DOCX, URL, Notion
          </div>
        </div>
      </div>
    </div>
  )
}
