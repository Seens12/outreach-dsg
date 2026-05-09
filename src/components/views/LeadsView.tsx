'use client'

import { useState } from 'react'
import {
  Search,
  Plus,
  MoreHorizontal,
  Mail,
  Phone,
  Eye,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type LeadStatus = 'Новый' | 'В работе' | 'Квалифицированный' | 'Завершённый'
type LeadSource = 'HH.ru' | 'LinkedIn' | 'Холодный контакт' | 'Реферал' | 'Веб-сайт'

interface Lead {
  id: string
  name: string
  initials: string
  company: string
  status: LeadStatus
  source: LeadSource
  lastContact: string
}

// ---------------------------------------------------------------------------
// Demo data
// ---------------------------------------------------------------------------

const leads: Lead[] = [
  { id: '1', name: 'Дмитрий Петров', initials: 'ДП', company: 'Яндекс', status: 'Новый', source: 'HH.ru', lastContact: '2 часа назад' },
  { id: '2', name: 'Анна Сидорова', initials: 'АС', company: 'Сбер', status: 'В работе', source: 'LinkedIn', lastContact: 'Вчера' },
  { id: '3', name: 'Максим Козлов', initials: 'МК', company: 'VK Tech', status: 'Квалифицированный', source: 'Реферал', lastContact: '3 дня назад' },
  { id: '4', name: 'Елена Волкова', initials: 'ЕВ', company: 'Тинькофф', status: 'Новый', source: 'Веб-сайт', lastContact: '1 день назад' },
  { id: '5', name: 'Артём Новиков', initials: 'АН', company: 'Ozon Tech', status: 'В работе', source: 'Холодный контакт', lastContact: '5 часов назад' },
  { id: '6', name: 'Ольга Морозова', initials: 'ОМ', company: 'Mail.ru Group', status: 'Завершённый', source: 'LinkedIn', lastContact: '1 неделю назад' },
  { id: '7', name: 'Иван Соколов', initials: 'ИС', company: 'Касперский', status: 'Квалифицированный', source: 'HH.ru', lastContact: '2 дня назад' },
  { id: '8', name: 'Мария Лебедева', initials: 'МЛ', company: '2ГИС', status: 'В работе', source: 'Реферал', lastContact: '4 часа назад' },
]

// ---------------------------------------------------------------------------
// Status / source helpers
// ---------------------------------------------------------------------------

const statusConfig: Record<LeadStatus, { color: string; bg: string }> = {
  'Новый': { color: 'text-[#2563eb]', bg: 'bg-[#2563eb]/10' },
  'В работе': { color: 'text-[#d97706]', bg: 'bg-[#d97706]/10' },
  'Квалифицированный': { color: 'text-[#16a34a]', bg: 'bg-[#16a34a]/10' },
  'Завершённый': { color: 'text-[#737373]', bg: 'bg-[#e8e8e8]' },
}

const filters: Array<{ label: string; count?: number }> = [
  { label: 'Все', count: 8 },
  { label: 'Новые', count: 2 },
  { label: 'В работе', count: 3 },
  { label: 'Квалифицированные', count: 2 },
  { label: 'Завершённые', count: 1 },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LeadsView() {
  const [activeFilter, setActiveFilter] = useState('Все')
  const [search, setSearch] = useState('')

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[18px] font-bold tracking-[-0.02em] text-[#171717]">
          Лиды
        </h1>
        <p className="text-[13px] text-[#737373] font-medium mt-1">
          Управление вашими лидами и сделками
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="relative w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#a8a8a8]" />
          <Input
            placeholder="Поиск лидов..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-[36px] text-[13px] bg-[#fafafa] border-[#e8e8e8] rounded-[8px] focus-visible:ring-[#2563eb]/20 focus-visible:border-[#2563eb]/40"
          />
        </div>

        <Button className="h-[36px] text-[13px] font-medium rounded-[8px] bg-[#0d0d0d] hover:bg-[#262626] text-white gap-2">
          <Plus className="w-4 h-4" />
          Добавить лид
        </Button>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 mb-5">
        {filters.map((f) => (
          <button
            key={f.label}
            onClick={() => setActiveFilter(f.label)}
            className={cn(
              'h-[32px] px-3 rounded-full text-[12.5px] font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer border',
              activeFilter === f.label
                ? 'bg-[#0d0d0d] text-white border-[#0d0d0d]'
                : 'bg-white text-[#525252] border-[#e8e8e8] hover:bg-[#f5f5f5] hover:text-[#171717]'
            )}
          >
            {f.label}
            {f.count !== undefined && (
              <span
                className={cn(
                  'text-[11px] font-semibold px-1.5 py-0.5 rounded-full leading-none',
                  activeFilter === f.label
                    ? 'bg-white/20 text-white'
                    : 'bg-[#f5f5f5] text-[#737373]'
                )}
              >
                {f.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="border border-[#e8e8e8] rounded-[10px] bg-white overflow-hidden">
        <table className="w-full text-[13px] font-medium">
          <thead>
            <tr className="border-b border-[#e8e8e8] bg-[#fafafa]">
              <th className="w-10 pl-4 pr-2 py-3">
                <Checkbox className="rounded-[4px]" />
              </th>
              <th className="text-left py-3 px-3 text-[12px] font-semibold text-[#737373] uppercase tracking-[0.04em]">
                Имя
              </th>
              <th className="text-left py-3 px-3 text-[12px] font-semibold text-[#737373] uppercase tracking-[0.04em]">
                Статус
              </th>
              <th className="text-left py-3 px-3 text-[12px] font-semibold text-[#737373] uppercase tracking-[0.04em]">
                Источник
              </th>
              <th className="text-left py-3 px-3 text-[12px] font-semibold text-[#737373] uppercase tracking-[0.04em]">
                Последний контакт
              </th>
              <th className="text-right py-3 px-4 text-[12px] font-semibold text-[#737373] uppercase tracking-[0.04em]">
                Действия
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, idx) => {
              const cfg = statusConfig[lead.status]
              return (
                <tr
                  key={lead.id}
                  className={cn(
                    'border-b border-[#e8e8e8] last:border-b-0 transition-colors duration-100',
                    'hover:bg-[#fafafa]'
                  )}
                >
                  <td className="pl-4 pr-2 py-3">
                    <Checkbox className="rounded-[4px]" />
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0d0d0d] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                        {lead.initials}
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-[#171717] leading-tight">
                          {lead.name}
                        </div>
                        <div className="text-[12px] text-[#a8a8a8]">
                          {lead.company}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={cn(
                        'inline-flex items-center px-2.5 py-[3px] rounded-full text-[12px] font-semibold',
                        cfg.color,
                        cfg.bg
                      )}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#525252]">
                    {lead.source}
                  </td>
                  <td className="py-3 px-3 text-[#737373]">
                    {lead.lastContact}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#a8a8a8] hover:bg-[#f5f5f5] hover:text-[#171717] transition-colors duration-150 cursor-pointer">
                        <Eye className="w-[14px] h-[14px]" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#a8a8a8] hover:bg-[#f5f5f5] hover:text-[#171717] transition-colors duration-150 cursor-pointer">
                        <Mail className="w-[14px] h-[14px]" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#a8a8a8] hover:bg-[#f5f5f5] hover:text-[#171717] transition-colors duration-150 cursor-pointer">
                        <Phone className="w-[14px] h-[14px]" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#a8a8a8] hover:bg-[#f5f5f5] hover:text-[#171717] transition-colors duration-150 cursor-pointer">
                        <MoreHorizontal className="w-[14px] h-[14px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
