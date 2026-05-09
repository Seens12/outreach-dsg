'use client'

import { useState } from 'react'
import {
  Upload,
  FileText,
  BookOpen,
  Clock,
  Eye,
  FileCheck,
  FileQuestion,
  Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FilterPills } from '@/components/shared/FilterPills'
import { toast } from 'sonner'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type DocType = 'Кейс' | 'Плейбук' | 'FAQ' | 'Возражения' | 'Ценности' | 'Цены'
type DocStatus = 'Активен' | 'Устарел' | 'Черновик'

interface Document {
  id: string
  name: string
  type: DocType
  industry: string
  status: DocStatus
  updated: string
}

// ---------------------------------------------------------------------------
// Demo data
// ---------------------------------------------------------------------------

const categoryOptions = [
  { key: 'all', label: 'Все' },
  { key: 'Цены', label: 'Цены (2)' },
  { key: 'Кейсы', label: 'Кейсы (2)' },
  { key: 'Возражения', label: 'Возражения (3)' },
  { key: 'FAQ', label: 'FAQ (2)' },
  { key: 'Ценности', label: 'Ценности (1)' },
] as const

type CategoryKey = (typeof categoryOptions)[number]['key']

const documents: Document[] = [
  { id: '1', name: 'Кейс: АгроХолдинг', type: 'Кейс', industry: 'Агро', status: 'Устарел', updated: '12 янв 2025' },
  { id: '2', name: 'Кейс: ИнноСофт', type: 'Кейс', industry: 'IT', status: 'Активен', updated: '18 янв 2025' },
  { id: '3', name: 'Плейбук: Кампания для ритейла', type: 'Плейбук', industry: 'Ритейл', status: 'Черновик', updated: '20 янв 2025' },
  { id: '4', name: 'Обработка: "Слишком дорого"', type: 'Возражения', industry: 'Все', status: 'Активен', updated: '15 янв 2025' },
  { id: '5', name: 'Обработка: "У нас уже есть CRM"', type: 'Возражения', industry: 'Все', status: 'Активен', updated: '14 янв 2025' },
  { id: '6', name: 'Обработка: "Нам не интересно"', type: 'Возражения', industry: 'Все', status: 'Черновик', updated: '21 янв 2025' },
  { id: '7', name: 'Прайс-лист 2025', type: 'Цены', industry: 'Все', status: 'Активен', updated: '10 янв 2025' },
  { id: '8', name: 'Сравнение тарифов', type: 'Цены', industry: 'Все', status: 'Активен', updated: '10 янв 2025' },
  { id: '9', name: 'FAQ: Частые вопросы клиентов', type: 'FAQ', industry: 'Все', status: 'Активен', updated: '16 янв 2025' },
  { id: '10', name: 'FAQ: Технические вопросы', type: 'FAQ', industry: 'IT', status: 'Устарел', updated: '5 янв 2025' },
  { id: '11', name: 'Ключевые ценности продукта', type: 'Ценности', industry: 'Все', status: 'Активен', updated: '8 янв 2025' },
  { id: '12', name: 'Кейс: МедТехПро', type: 'Кейс', industry: 'Медицина', status: 'Черновик', updated: '22 янв 2025' },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const statusStyles: Record<DocStatus, string> = {
  'Активен': 'bg-[#f5f5f5] text-[#404040]',
  'Устарел': 'bg-[#f5f5f5] text-[#a3a3a3]',
  'Черновик': 'bg-[#f5f5f5] text-[#525252]',
}

const typeIcons: Record<DocType, typeof FileText> = {
  'Кейс': BookOpen,
  'Плейбук': FileText,
  'FAQ': FileQuestion,
  'Возражения': FileCheck,
  'Ценности': FileText,
  'Цены': FileText,
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function KnowledgeBaseView() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all')

  const filtered = documents.filter((d) => {
    if (activeCategory === 'all') return true
    return d.type === activeCategory
  })

  return (
    <div className="p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
            Управление документами для AI-агента
          </h1>
          <p className="text-[13px] text-[#737373] mt-1">
            Загружайте и управляйте документами, которые AI использует для ответов
          </p>
        </div>
        <Button
          onClick={() => toast.success('Файл загружен')}
          className="gap-2 bg-[#0d0d0d] text-white hover:bg-[#262626]"
        >
          <Upload className="h-4 w-4" />
          Загрузить документ
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Документов', value: '12', icon: FileText },
          { label: 'Активных', value: '8', icon: FileCheck },
          { label: 'Покрытие', value: '52%', icon: Eye },
          { label: 'Пробелов', value: '4', icon: FileQuestion },
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
                <span className="text-[13px] text-[#737373] font-medium">{s.label}</span>
              </div>
              <div className="text-[24px] font-semibold text-[#0d0d0d] tracking-tight">
                {s.value}
              </div>
            </div>
          )
        })}
      </div>

      {/* Category filter pills */}
      <div className="mb-5">
        <FilterPills
          options={categoryOptions}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* Document table */}
      <div className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#e8e8e8]">
                {['Название', 'Тип', 'Отрасль', 'Статус', 'Обновлено'].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-[12px] font-semibold text-[#737373] uppercase tracking-[0.04em]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f5f5]">
              {filtered.map((doc) => {
                const TypeIcon = typeIcons[doc.type]
                return (
                  <tr
                    key={doc.id}
                    className="hover:bg-[#fafafa] transition-colors cursor-pointer"
                    onClick={() => toast.info(`Открыт документ: ${doc.name}`)}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-[#fafafa] shrink-0">
                          <TypeIcon className="w-4 h-4 text-[#525252]" />
                        </div>
                        <span className="text-[13px] font-medium text-[#171717]">
                          {doc.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[13px] text-[#525252]">{doc.type}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[13px] text-[#737373]">{doc.industry}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-[3px] rounded-[6px] text-[11.5px] font-medium ${statusStyles[doc.status]}`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5 text-[13px] text-[#737373]">
                        <Clock className="w-3.5 h-3.5 text-[#a3a3a3]" />
                        {doc.updated}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
