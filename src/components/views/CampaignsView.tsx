'use client'

import { useState } from 'react'
import {
  Send,
  Eye,
  MessageSquare,
  TrendingUp,
  Users,
  Calendar,
  Plus,
  MoreHorizontal,
  Clock,
  BarChart3,
} from 'lucide-react'

type CampaignStatus = 'active' | 'draft' | 'completed'
type FilterKey = 'all' | 'active' | 'draft' | 'completed'

interface Campaign {
  id: number
  name: string
  status: CampaignStatus
  sent: number
  opened: number
  replied: number
  conversion: number
  progress: number
  startDate: string
  endDate: string
  audience: number
}

const campaigns: Campaign[] = [
  {
    id: 1,
    name: 'B2B SaaS Q4',
    status: 'active',
    sent: 1240,
    opened: 680,
    replied: 142,
    conversion: 11.4,
    progress: 68,
    startDate: '15 нояб 2024',
    endDate: '31 дек 2024',
    audience: 1820,
  },
  {
    id: 2,
    name: 'Enterprise Outreach',
    status: 'active',
    sent: 860,
    opened: 510,
    replied: 98,
    conversion: 11.6,
    progress: 42,
    startDate: '1 дек 2024',
    endDate: '15 янв 2025',
    audience: 2040,
  },
  {
    id: 3,
    name: 'Re-engagement',
    status: 'draft',
    sent: 0,
    opened: 0,
    replied: 0,
    conversion: 0,
    progress: 0,
    startDate: '10 янв 2025',
    endDate: '28 фев 2025',
    audience: 3100,
  },
  {
    id: 4,
    name: 'Product Launch',
    status: 'completed',
    sent: 2500,
    opened: 1420,
    replied: 310,
    conversion: 12.4,
    progress: 100,
    startDate: '1 сен 2024',
    endDate: '30 нояб 2024',
    audience: 2500,
  },
]

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'active', label: 'Активные' },
  { key: 'draft', label: 'Черновики' },
  { key: 'completed', label: 'Завершённые' },
]

const statusConfig: Record<
  CampaignStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  active: {
    label: 'Активная',
    bg: 'bg-[#f0fdf4]',
    text: 'text-[#16a34a]',
    dot: 'bg-[#16a34a]',
  },
  draft: {
    label: 'Черновик',
    bg: 'bg-[#f5f5f5]',
    text: 'text-[#737373]',
    dot: 'bg-[#a3a3a3]',
  },
  completed: {
    label: 'Завершена',
    bg: 'bg-[#eff6ff]',
    text: 'text-[#2563eb]',
    dot: 'bg-[#2563eb]',
  },
}

export default function CampaignsView() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  const filtered =
    activeFilter === 'all'
      ? campaigns
      : campaigns.filter((c) => c.status === activeFilter)

  return (
    <div className="flex flex-col gap-6 text-[13.5px] text-[#171717] font-[family-name:var(--font-geist-sans)] p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
          Кампании
        </h1>
        <p className="text-[13.5px] text-[#737373] mt-1">
          Управление вашими email-кампаниями
        </p>
      </div>

      {/* Filter row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                activeFilter === f.key
                  ? 'bg-[#0d0d0d] text-white'
                  : 'bg-[#f5f5f5] text-[#525252] hover:bg-[#e8e8e8]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button className="inline-flex items-center gap-2 bg-[#0d0d0d] text-white px-4 py-2 rounded-[8px] text-[13px] font-medium hover:bg-[#262626] transition-colors">
          <Plus className="size-4" />
          Новая кампания
        </button>
      </div>

      {/* Campaign cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((campaign) => {
          const status = statusConfig[campaign.status]
          return (
            <div
              key={campaign.id}
              className="border border-[#e8e8e8] rounded-[10px] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)] transition-shadow"
            >
              {/* Top row: name + status + actions */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-[14.5px] font-semibold text-[#0d0d0d]">
                    {campaign.name}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-medium ${status.bg} ${status.text}`}
                  >
                    <span className={`size-1.5 rounded-full ${status.dot}`} />
                    {status.label}
                  </span>
                </div>
                <button className="p-1 rounded-md text-[#a3a3a3] hover:text-[#525252] hover:bg-[#f5f5f5] transition-colors">
                  <MoreHorizontal className="size-4" />
                </button>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center size-7 rounded-[7px] bg-[#f5f5f5]">
                    <Send className="size-3.5 text-[#525252]" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#a3a3a3]">
                      Отправлено
                    </p>
                    <p className="text-[14px] font-semibold text-[#0d0d0d]">
                      {campaign.sent.toLocaleString('ru-RU')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center size-7 rounded-[7px] bg-[#f5f5f5]">
                    <Eye className="size-3.5 text-[#525252]" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#a3a3a3]">Открыто</p>
                    <p className="text-[14px] font-semibold text-[#0d0d0d]">
                      {campaign.opened.toLocaleString('ru-RU')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center size-7 rounded-[7px] bg-[#f5f5f5]">
                    <MessageSquare className="size-3.5 text-[#525252]" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#a3a3a3]">Ответы</p>
                    <p className="text-[14px] font-semibold text-[#0d0d0d]">
                      {campaign.replied.toLocaleString('ru-RU')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center size-7 rounded-[7px] bg-[#f5f5f5]">
                    <TrendingUp className="size-3.5 text-[#525252]" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#a3a3a3]">Конверсия</p>
                    <p className="text-[14px] font-semibold text-[#0d0d0d]">
                      {campaign.conversion}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-[3px] bg-[#f5f5f5] rounded-full mb-4 overflow-hidden">
                <div
                  className="h-full bg-[#0d0d0d] rounded-full transition-all"
                  style={{ width: `${campaign.progress}%` }}
                />
              </div>

              {/* Meta row */}
              <div className="flex items-center justify-between text-[12px] text-[#a3a3a3]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3" />
                  <span>
                    {campaign.startDate} — {campaign.endDate}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="size-3" />
                  <span>
                    {campaign.audience.toLocaleString('ru-RU')} получателей
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-[#a3a3a3]">
          <BarChart3 className="size-10 mb-3 text-[#d4d4d4]" />
          <p className="text-[14px] font-medium">Нет кампаний</p>
          <p className="text-[12px] mt-1">
            В этой категории пока нет кампаний
          </p>
        </div>
      )}
    </div>
  )
}
