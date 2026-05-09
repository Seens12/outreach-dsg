'use client'

import { useState } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  FileText,
  Mail,
  MessageSquare,
  CalendarDays,
  BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { EmptyState } from '@/components/shared/EmptyState'

type Category = 'cold' | 'follow-up' | 'meeting'

interface Template {
  id: string
  name: string
  subject: string
  category: Category
  usages: number
  replies: number
  lastModified: string
}

const categoryLabels: Record<Category, string> = {
  cold: 'Холодные',
  'follow-up': 'Follow-up',
  meeting: 'Встречи',
}

const categoryColors: Record<Category, string> = {
  cold: 'bg-blue-50 text-blue-700',
  'follow-up': 'bg-green-50 text-green-700',
  meeting: 'bg-amber-50 text-amber-700',
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Первый контакт IT-лиды',
    subject: 'Оптимизация инфраструктуры для {company}',
    category: 'cold',
    usages: 142,
    replies: 23,
    lastModified: '10 янв 2025',
  },
  {
    id: '2',
    name: 'Follow-up после демо',
    subject: 'Вопросы по нашему демо для {company}',
    category: 'follow-up',
    usages: 87,
    replies: 34,
    lastModified: '8 янв 2025',
  },
  {
    id: '3',
    name: 'Приглашение на встречу',
    subject: 'Обсуждение интеграции с {company}',
    category: 'meeting',
    usages: 56,
    replies: 41,
    lastModified: '5 янв 2025',
  },
  {
    id: '4',
    name: 'Реактивация контакта',
    subject: 'Новое решение для {company}',
    category: 'cold',
    usages: 203,
    replies: 18,
    lastModified: '2 янв 2025',
  },
]

const filterPills = [
  { key: 'all', label: 'Все' },
  { key: 'cold', label: 'Холодные' },
  { key: 'follow-up', label: 'Follow-up' },
  { key: 'meeting', label: 'Встречи' },
] as const

type FilterKey = (typeof filterPills)[number]['key']

function TemplateCard({ template }: { template: Template }) {
  const replyRate =
    template.usages > 0
      ? ((template.replies / template.usages) * 100).toFixed(0)
      : '0'

  return (
    <div className="flex flex-col gap-3 rounded-[10px] border border-[#e8e8e8] bg-white p-5">
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#a3a3a3]" />
          <h3 className="text-sm font-semibold text-[#0d0d0d]">
            {template.name}
          </h3>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${categoryColors[template.category]}`}
        >
          {categoryLabels[template.category]}
        </span>
      </div>

      {/* Subject preview */}
      <p className="line-clamp-2 text-[13px] leading-relaxed text-[#525252]">
        {template.subject}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-4 border-t border-[#f5f5f5] pt-3 text-[12px] text-[#a3a3a3]">
        <div className="flex items-center gap-1">
          <Mail className="h-3 w-3" />
          <span>{template.usages} использований</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className="h-3 w-3" />
          <span>{template.replies} ответов ({replyRate}%)</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-[#f5f5f5] pt-3">
        <span className="text-[11px] text-[#a3a3a3]">
          Изменен {template.lastModified}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 px-2 text-[12px] text-[#525252]"
          >
            <Pencil className="h-3 w-3" />
            Ред.
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 px-2 text-[12px] text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function TemplatesView() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  const filteredTemplates =
    activeFilter === 'all'
      ? templates
      : templates.filter((t) => t.category === activeFilter)

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">Шаблоны</h1>
          <p className="text-[13px] text-[#737373]">
            Управление email-шаблонами
          </p>
        </div>
        <Button onClick={() => toast.success('Шаблон создан')} className="gap-2 bg-[#0d0d0d] text-white hover:bg-[#262626]">
          <Plus className="h-4 w-4" />
          Создать шаблон
        </Button>
      </div>

      {/* Filter pills */}
      <div className="mb-6 flex items-center gap-2">
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

      {/* Template grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredTemplates.length === 0 ? (
          <div className="col-span-full">
            <EmptyState
              icon={FileText}
              title="Нет шаблонов"
              description="Нет шаблонов в этой категории"
            />
          </div>
        ) : (
        <>
        {filteredTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}

        {/* Create new dashed card */}
        <button className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-[10px] border-2 border-dashed border-[#e0e0e0] bg-white transition-colors hover:border-[#2563eb] hover:bg-blue-50/30">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fafafa]">
            <Plus className="h-5 w-5 text-[#a3a3a3]" />
          </div>
          <span className="text-[13px] font-medium text-[#a3a3a3]">
            Создать шаблон
          </span>
        </button>
        </>
        )}
      </div>
    </div>
  )
}
