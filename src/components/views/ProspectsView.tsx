'use client'

import { useState } from 'react'
import {
  Search,
  Upload,
  Mail,
  Phone,
  MoreHorizontal,
  Linkedin,
  Globe,
  UserPlus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ContactSource = 'HH.ru' | 'LinkedIn' | 'Ручной импорт'

interface Contact {
  id: string
  name: string
  initials: string
  position: string
  company: string
  source: ContactSource
  email: string
  tags: string[]
}

// ---------------------------------------------------------------------------
// Demo data
// ---------------------------------------------------------------------------

const contacts: Contact[] = [
  { id: '1', name: 'Алексей Иванов', initials: 'АИ', position: 'CTO', company: 'Яндекс', source: 'HH.ru', email: 'a.ivanov@yandex.ru', tags: ['B2B', 'SaaS'] },
  { id: '2', name: 'Мария Кузнецова', initials: 'МК', position: 'Head of Marketing', company: 'Сбер', source: 'LinkedIn', email: 'm.kuznetsova@sber.ru', tags: ['Финтех', 'Enterprise'] },
  { id: '3', name: 'Сергей Попов', initials: 'СП', position: 'VP Engineering', company: 'VK Tech', source: 'LinkedIn', email: 's.popov@vk.com', tags: ['Social', 'AI'] },
  { id: '4', name: 'Екатерина Фёдорова', initials: 'ЕФ', position: 'Product Manager', company: 'Тинькофф', source: 'HH.ru', email: 'e.fedorova@tinkoff.ru', tags: ['Финтех', 'Мобайл'] },
  { id: '5', name: 'Андрей Белов', initials: 'АБ', position: 'CEO', company: 'Ozon Tech', source: 'Ручной импорт', email: 'a.belov@ozon.ru', tags: ['E-commerce', 'Startup'] },
  { id: '6', name: 'Наталья Смирнова', initials: 'НС', position: 'HR Director', company: 'Mail.ru Group', source: 'LinkedIn', email: 'n.smirnova@corp.mail.ru', tags: ['Enterprise', 'Talent'] },
  { id: '7', name: 'Павел Егоров', initials: 'ПЕ', position: 'Tech Lead', company: 'Касперский', source: 'HH.ru', email: 'p.egorov@kaspersky.com', tags: ['Security', 'B2B'] },
  { id: '8', name: 'Ирина Лебедева', initials: 'ИЛ', position: 'Sales Director', company: '2ГИС', source: 'Ручной импорт', email: 'i.lebedeva@2gis.ru', tags: ['Geo', 'Enterprise'] },
  { id: '9', name: 'Роман Зайцев', initials: 'РЗ', position: 'CIO', company: 'МТС Digital', source: 'LinkedIn', email: 'r.zaytsev@mts.ru', tags: ['Telecom', 'AI'] },
]

// ---------------------------------------------------------------------------
// Source helpers
// ---------------------------------------------------------------------------

const sourceConfig: Record<ContactSource, { color: string; bg: string; icon: React.ElementType }> = {
  'HH.ru': { color: 'text-[#dc2626]', bg: 'bg-[#dc2626]/10', icon: Globe },
  'LinkedIn': { color: 'text-[#2563eb]', bg: 'bg-[#2563eb]/10', icon: Linkedin },
  'Ручной импорт': { color: 'text-[#16a34a]', bg: 'bg-[#16a34a]/10', icon: UserPlus },
}

const filters: string[] = ['Все', 'HH.ru', 'LinkedIn', 'Ручной импорт']

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProspectsView() {
  const [activeFilter, setActiveFilter] = useState('Все')
  const [search, setSearch] = useState('')

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[18px] font-bold tracking-[-0.02em] text-[#171717]">
          Контакты
        </h1>
        <p className="text-[13px] text-[#737373] font-medium mt-1">
          База потенциальных клиентов
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="relative w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#a8a8a8]" />
          <Input
            placeholder="Поиск контактов..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-[36px] text-[13px] bg-[#fafafa] border-[#e8e8e8] rounded-[8px] focus-visible:ring-[#2563eb]/20 focus-visible:border-[#2563eb]/40"
          />
        </div>

        <Button className="h-[36px] text-[13px] font-medium rounded-[8px] bg-[#0d0d0d] hover:bg-[#262626] text-white gap-2">
          <Upload className="w-4 h-4" />
          Импорт контактов
        </Button>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 mb-5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={cn(
              'h-[32px] px-3 rounded-full text-[12.5px] font-medium transition-all duration-150 cursor-pointer border',
              activeFilter === f
                ? 'bg-[#0d0d0d] text-white border-[#0d0d0d]'
                : 'bg-white text-[#525252] border-[#e8e8e8] hover:bg-[#f5f5f5] hover:text-[#171717]'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Contact cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {contacts.map((contact) => {
          const cfg = sourceConfig[contact.source]
          const SourceIcon = cfg.icon
          return (
            <div
              key={contact.id}
              className="border border-[#e8e8e8] rounded-[10px] bg-white p-5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow duration-200"
            >
              {/* Top row: avatar + name + actions */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0d0d0d] text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0">
                    {contact.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-[#171717] leading-tight">
                      {contact.name}
                    </div>
                    <div className="text-[12px] text-[#a8a8a8] mt-0.5">
                      {contact.position}
                    </div>
                  </div>
                </div>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#a8a8a8] hover:bg-[#f5f5f5] hover:text-[#171717] transition-colors duration-150 cursor-pointer">
                  <MoreHorizontal className="w-[14px] h-[14px]" />
                </button>
              </div>

              {/* Company */}
              <div className="text-[12.5px] text-[#525252] mb-3">
                {contact.company}
              </div>

              {/* Source tag */}
              <div className="mb-3">
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 px-2.5 py-[3px] rounded-full text-[11.5px] font-semibold',
                    cfg.color,
                    cfg.bg
                  )}
                >
                  <SourceIcon className="w-3 h-3" />
                  {contact.source}
                </span>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-1.5 flex-wrap mb-4">
                {contact.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-[2px] rounded-md bg-[#f5f5f5] text-[11px] font-medium text-[#737373]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-[#f0f0f0]">
                <button className="flex-1 h-[32px] flex items-center justify-center gap-1.5 rounded-[7px] text-[12px] font-medium text-[#525252] bg-[#fafafa] hover:bg-[#f0f0f0] transition-colors duration-150 cursor-pointer">
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </button>
                <button className="flex-1 h-[32px] flex items-center justify-center gap-1.5 rounded-[7px] text-[12px] font-medium text-[#525252] bg-[#fafafa] hover:bg-[#f0f0f0] transition-colors duration-150 cursor-pointer">
                  <Phone className="w-3.5 h-3.5" />
                  Позвонить
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
