'use client'

import { useState, useMemo } from 'react'
import { Search, Download, Plus, MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'
import { FilterPills } from '@/components/shared/FilterPills'

/* ── Types ─────────────────────────────────────────────── */

interface Lead {
  id: string
  name: string
  company: string
  position: string
  status: 'hot' | 'warm' | 'cold' | 'inwork'
  campaign: string
  date: string
}

type FilterKey = 'all' | 'hot' | 'warm' | 'inwork' | 'cold'

/* ── Demo Data ─────────────────────────────────────────── */

const allLeads: Lead[] = [
  { id: '1', name: 'Иван Петров', company: 'DataPro', position: 'CTO', status: 'hot', campaign: 'IT-Москва', date: '9 мая' },
  { id: '2', name: 'Мария Соколова', company: 'CloudBase', position: 'CEO', status: 'warm', campaign: 'IT-Москва', date: '9 мая' },
  { id: '3', name: 'Дмитрий Козлов', company: 'NovaSoft', position: 'VP Sales', status: 'hot', campaign: 'Финтех', date: '8 мая' },
  { id: '4', name: 'Анна Власова', company: 'TechCorp', position: 'Marketing Dir.', status: 'warm', campaign: 'IT-Москва', date: '8 мая' },
  { id: '5', name: 'Сергей Морозов', company: 'PixelForge', position: 'COO', status: 'cold', campaign: 'E-com', date: '7 мая' },
]

const filterOptions: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Все (248)' },
  { key: 'hot', label: '🔥 Горячие (3)' },
  { key: 'warm', label: 'Тёплые (28)' },
  { key: 'inwork', label: 'В работе' },
  { key: 'cold', label: 'Холодные' },
]

const statusConfig: Record<Lead['status'], { label: string; className: string }> = {
  hot: { label: 'Горячий', className: 'bg-[#f5f5f5] text-[#404040]' },
  warm: { label: 'Тёплый', className: 'bg-[#f5f5f5] text-[#525252]' },
  cold: { label: 'Холодный', className: 'bg-[#f5f5f5] text-[#a3a3a3]' },
  inwork: { label: 'В работе', className: 'bg-[#f5f5f5] text-[#525252]' },
}

const PAGE_SIZE = 5

/* ── Component ─────────────────────────────────────────── */

export default function LeadsView() {
  const setView = useAppStore((s) => s.setView)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterKey>('all')
  const [page, setPage] = useState(1)

  const filteredLeads = useMemo(() => {
    let list = allLeads

    // Filter by status pill
    if (filter !== 'all') {
      list = list.filter((l) => l.status === filter)
    }

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase().trim()
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q)
      )
    }

    return list
  }, [filter, search])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pagedLeads = filteredLeads.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  )

  const resetPage = () => setPage(1)

  return (
    <div className="p-6 overflow-y-auto h-full custom-scroll flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
          Лиды
        </h1>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a3a3] pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); resetPage() }}
              placeholder="Поиск…"
              aria-label="Поиск лидов"
              className="h-9 pl-9 pr-4 rounded-[8px] border border-[#e8e8e8] bg-white text-[13px] text-[#171717] placeholder:text-[#a3a3a3] focus:outline-none focus:border-[#0d0d0d] transition-colors w-56"
            />
          </div>
          {/* Export */}
          <button
            onClick={() => toast.success('Экспорт запущен')}
            className="flex items-center gap-2 h-9 px-4 rounded-[8px] border border-[#e8e8e8] bg-white text-[13px] font-medium text-[#525252] hover:bg-[#f5f5f5] hover:text-[#0d0d0d] transition-colors cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4" />
            Экспорт
          </button>
          {/* Add */}
          <button
            onClick={() => toast.success('Загрузка через агента')}
            className="flex items-center gap-2 h-9 px-4 rounded-[8px] bg-[#0d0d0d] text-[13px] font-medium text-white hover:bg-[#262626] transition-colors cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            Добавить
          </button>
        </div>
      </div>

      {/* Filter pills */}
      <FilterPills
        options={filterOptions}
        active={filter}
        onChange={(key) => { setFilter(key); resetPage() }}
      />

      {/* Table */}
      <div className="rounded-[10px] border border-[#e8e8e8] bg-white overflow-hidden shadow-card">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#fafafa]">
              <th className="w-9 px-3 py-2.5 text-left">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded border-[#d4d4d4] accent-[#0d0d0d] cursor-pointer"
                  aria-label="Выбрать всех"
                />
              </th>
              <th className="px-4 py-2.5 text-left text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                Имя
              </th>
              <th className="px-4 py-2.5 text-left text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                Компания
              </th>
              <th className="px-4 py-2.5 text-left text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                Должность
              </th>
              <th className="px-4 py-2.5 text-left text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                Статус
              </th>
              <th className="px-4 py-2.5 text-left text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                Кампания
              </th>
              <th className="px-4 py-2.5 text-left text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                Дата
              </th>
              <th className="w-8" />
            </tr>
          </thead>
          <tbody>
            {pagedLeads.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-[13px] text-[#a3a3a3]">
                  Лиды не найдены
                </td>
              </tr>
            ) : (
              pagedLeads.map((lead) => {
                const st = statusConfig[lead.status]
                return (
                  <tr
                    key={lead.id}
                    onClick={() => setView('inbox')}
                    className="border-b border-[#e8e8e8] last:border-b-0 hover:bg-[#fafafa] transition-colors cursor-pointer"
                  >
                    <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className="w-3.5 h-3.5 rounded border-[#d4d4d4] accent-[#0d0d0d] cursor-pointer"
                        aria-label={`Выбрать ${lead.name}`}
                      />
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#171717] font-semibold whitespace-nowrap">
                      {lead.name}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#171717] whitespace-nowrap">
                      {lead.company}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#737373] whitespace-nowrap">
                      {lead.position}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={cn(
                          'inline-block text-[12px] font-medium px-2.5 py-[3px] rounded-[6px]',
                          st.className
                        )}
                      >
                        {st.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-[#737373] whitespace-nowrap">
                      {lead.campaign}
                    </td>
                    <td className="px-4 py-3 text-[12px] text-[#a3a3a3] whitespace-nowrap">
                      {lead.date}
                    </td>
                    <td className="px-1 py-3">
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-[#a3a3a3] hover:bg-[#f5f5f5] hover:text-[#0d0d0d] transition-colors cursor-pointer"
                        aria-label="Действия"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-3.5 py-2.5 border-t border-[#e8e8e8] text-[12px] text-[#a3a3a3]">
          <span>
            {filteredLeads.length} из 248 лидов
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="w-8 h-7 flex items-center justify-center rounded-[6px] border border-[#e8e8e8] bg-white text-[12px] text-[#525252] hover:bg-[#f5f5f5] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  'w-8 h-7 flex items-center justify-center rounded-[6px] border border-[#e8e8e8] text-[12px] font-medium transition-colors cursor-pointer',
                  p === safePage
                    ? 'bg-[#0d0d0d] text-white border-[#0d0d0d]'
                    : 'bg-white text-[#525252] hover:bg-[#f5f5f5]'
                )}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="w-8 h-7 flex items-center justify-center rounded-[6px] border border-[#e8e8e8] bg-white text-[12px] text-[#525252] hover:bg-[#f5f5f5] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
