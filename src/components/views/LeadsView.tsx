'use client'

import { useState } from 'react'
import {
  Download,
  ChevronDown,
  Flame,
  Clock,
  Mail,
  Phone,
  Eye,
  MoreHorizontal,
  MapPin,
  Building2,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

/* ── Types ─────────────────────────────────────────────── */

interface Lead {
  id: string
  name: string
  initials: string
  company: string
  role: string
  confidence: number
  status: 'hot' | 'warm' | 'cold'
  quote: string
  tags: string[]
  lastActivity: string
}

/* ── Demo Data ─────────────────────────────────────────── */

const leads: Lead[] = [
  {
    id: '1',
    name: 'Елена Морозова',
    initials: 'ЕМ',
    company: 'ДиджиталГрупп',
    role: 'Директор по маркетингу',
    confidence: 95,
    status: 'hot',
    quote: 'Нам очень интересно ваше решение, хотели бы обсудить условия сотрудничества',
    tags: ['Готов к сделке', 'IT', 'Москва'],
    lastActivity: '15 мин назад',
  },
  {
    id: '2',
    name: 'Иван Петров',
    initials: 'ИП',
    company: 'ТехноКорп',
    role: 'CTO',
    confidence: 92,
    status: 'hot',
    quote: 'Давайте запланируем демо на следующей неделе',
    tags: ['Готов к сделке', 'Разработка ПО', 'Санкт-Петербург'],
    lastActivity: '32 мин назад',
  },
  {
    id: '3',
    name: 'Ольга Новикова',
    initials: 'ОН',
    company: 'ФинТех Про',
    role: 'Руководитель отдела продаж',
    confidence: 91,
    status: 'hot',
    quote: 'Можете прислать коммерческое предложение на 50 лицензий?',
    tags: ['Готов к сделке', 'Финтех', 'Казань'],
    lastActivity: '1 ч назад',
  },
  {
    id: '4',
    name: 'Мария Сидорова',
    initials: 'МС',
    company: 'ИнноСофт',
    role: 'CEO',
    confidence: 88,
    status: 'warm',
    quote: 'Спасибо за информацию, обсудим с командой и вернёмся',
    tags: ['SaaS', 'IT-консалтинг', 'Москва'],
    lastActivity: '2 ч назад',
  },
  {
    id: '5',
    name: 'Дмитрий Козлов',
    initials: 'ДК',
    company: 'CloudBase',
    role: 'VP of Engineering',
    confidence: 76,
    status: 'warm',
    quote: 'Интересный продукт, но нам нужно сравнить с конкурентами',
    tags: ['Облака', 'Инфраструктура', 'Новосибирск'],
    lastActivity: '3 ч назад',
  },
  {
    id: '6',
    name: 'Анна Волкова',
    initials: 'АВ',
    company: 'РитейлПлюс',
    role: 'Директор по развитию',
    confidence: 64,
    status: 'cold',
    quote: 'Сейчас не в приоритете, но сохраните контакты на будущее',
    tags: ['E-commerce', 'Ритейл', 'Екатеринбург'],
    lastActivity: '1 день назад',
  },
  {
    id: '7',
    name: 'Сергей Лебедев',
    initials: 'СЛ',
    company: 'МедТех Инновации',
    role: 'Коммерческий директор',
    confidence: 58,
    status: 'cold',
    quote: 'Отправьте материалы на почту, изучим при возможности',
    tags: ['Healthcare', 'B2B', 'Воронеж'],
    lastActivity: '2 дня назад',
  },
  {
    id: '8',
    name: 'Татьяна Иванова',
    initials: 'ТИ',
    company: 'АгроСервис',
    role: 'IT-директор',
    confidence: 42,
    status: 'cold',
    quote: 'Спасибо, мы уже используем аналогичное решение',
    tags: ['Агро', 'Enterprise', 'Краснодар'],
    lastActivity: '4 дня назад',
  },
]

const campaignFilters = [
  { label: 'Все кампании', count: 192 },
  { label: 'IT Directors Q4', count: 47 },
  { label: 'FinTech Outreach', count: 38 },
  { label: 'Startup Pipeline', count: 29 },
]

const confidenceLevels = ['Все', '80%+', '60%+', '40%+', '<40%']

const statusConfig: Record<string, { label: string; className: string }> = {
  hot: { label: 'Горячий', className: 'bg-[#f5f5f5] text-[#404040]' },
  warm: { label: 'Тёплый', className: 'bg-[#f5f5f5] text-[#525252]' },
  cold: { label: 'Холодный', className: 'bg-[#f5f5f5] text-[#a3a3a3]' },
}

const statusDot: Record<string, string> = {
  hot: 'bg-[#404040]',
  warm: 'bg-[#737373]',
  cold: 'bg-[#a3a3a3]',
}

/* ── Component ─────────────────────────────────────────── */

export default function LeadsView() {
  const [campaign, setCampaign] = useState('Все кампании')
  const [confidence, setConfidence] = useState('Все')

  return (
    <div className="flex flex-col gap-5 p-6 text-[13.5px] text-[#171717] overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
            Воронка лидов
          </h1>
          <p className="text-[13px] text-[#737373] mt-1">
            Управление лидами из кампаний холодных рассылок
          </p>
        </div>
        <button
          onClick={() => toast.success('Экспорт CSV запущен')}
          className="flex items-center gap-2 h-9 px-4 rounded-[8px] border border-[#e8e8e8] bg-white text-[13px] font-medium text-[#525252] hover:bg-[#f5f5f5] hover:text-[#0d0d0d] transition-colors cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" />
          Экспорт CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex gap-1.5">
          {campaignFilters.map((f) => (
            <button
              key={f.label}
              onClick={() => setCampaign(f.label)}
              className={cn(
                'h-8 px-3 rounded-full text-[12.5px] font-medium transition-colors cursor-pointer border',
                campaign === f.label
                  ? 'bg-[#0d0d0d] text-white border-[#0d0d0d]'
                  : 'bg-white text-[#525252] border-[#e8e8e8] hover:bg-[#f5f5f5]'
              )}
            >
              {f.label}
              {campaign === f.label && (
                <span className="ml-1.5 text-[11px] opacity-70">{f.count}</span>
              )}
            </button>
          ))}
        </div>

        <div className="relative">
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[#a3a3a3] pointer-events-none" />
          <select
            value={confidence}
            onChange={(e) => setConfidence(e.target.value)}
            className="appearance-none h-8 pl-3 pr-8 rounded-[8px] border border-[#e8e8e8] bg-white text-[12.5px] font-medium text-[#525252] cursor-pointer focus:outline-none focus:border-[#0d0d0d]"
          >
            {confidenceLevels.map((l) => (
              <option key={l} value={l}>{l === 'Все' ? 'Confidence' : l}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 text-[12.5px] text-[#737373] flex-wrap">
        <span className="font-semibold text-[#0d0d0d]">192 Всего лидов</span>
        <span className="text-[#e8e8e8]">|</span>
        <span>8 (4.2%) <span className="text-[#404040] font-medium">Горячих</span></span>
        <span>23 (12.0%) <span className="text-[#525252] font-medium">Тёплых</span></span>
        <span className="text-[#e8e8e8]">|</span>
        <span>16.1% <span className="font-medium text-[#0d0d0d]">Конверсия</span></span>
      </div>

      {/* Lead Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {leads.map((lead) => {
          const st = statusConfig[lead.status]
          return (
            <div
              key={lead.id}
              className="rounded-[10px] border border-[#e8e8e8] bg-white p-5 shadow-card hover:border-[#d4d4d4] transition-colors"
            >
              {/* Top: avatar + info + status */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-full text-[13px] font-semibold shrink-0',
                      lead.status === 'hot' ? 'bg-[#0d0d0d] text-white' : 'bg-[#f5f5f5] text-[#525252] border border-[#e8e8e8]'
                    )}>
                      {lead.initials}
                    </div>
                    {lead.status === 'hot' && (
                      <div className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-[#0d0d0d]">
                        <Flame className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-[#0d0d0d]">{lead.name}</div>
                    <div className="text-[12px] text-[#737373]">{lead.company} &middot; {lead.role}</div>
                  </div>
                </div>
                <span className={cn('text-[11px] font-medium px-2.5 py-1 rounded-[6px] shrink-0', st.className)}>
                  {st.label}
                </span>
              </div>

              {/* Quote */}
              <p className="text-[12.5px] text-[#525252] italic leading-[1.5] mb-3 border-l-2 border-[#e8e8e8] pl-3">
                &ldquo;{lead.quote}&rdquo;
              </p>

              {/* Confidence bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11.5px] text-[#a3a3a3] font-medium">Confidence</span>
                  <span className="text-[12px] font-semibold text-[#0d0d0d]">{lead.confidence}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#f5f5f5] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#0d0d0d] transition-all"
                    style={{ width: `${lead.confidence}%`, opacity: 0.3 + (lead.confidence / 100) * 0.7 }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-1.5 flex-wrap mb-3">
                {lead.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2 py-[3px] rounded-[5px] bg-[#f5f5f5] text-[#525252]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer: time + actions */}
              <div className="flex items-center justify-between pt-3 border-t border-[#f5f5f5]">
                <div className="flex items-center gap-1 text-[11.5px] text-[#a3a3a3]">
                  <Clock className="w-3 h-3" />
                  {lead.lastActivity}
                </div>
                <div className="flex items-center gap-0.5">
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#a3a3a3] hover:bg-[#f5f5f5] hover:text-[#0d0d0d] transition-colors cursor-pointer">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#a3a3a3] hover:bg-[#f5f5f5] hover:text-[#0d0d0d] transition-colors cursor-pointer">
                    <Mail className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#a3a3a3] hover:bg-[#f5f5f5] hover:text-[#0d0d0d] transition-colors cursor-pointer">
                    <Phone className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#a3a3a3] hover:bg-[#f5f5f5] hover:text-[#0d0d0d] transition-colors cursor-pointer">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
