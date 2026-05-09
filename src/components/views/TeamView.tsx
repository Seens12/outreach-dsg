'use client'

import { useState } from 'react'
import {
  Search,
  UserPlus,
  Mail,
  MoreHorizontal,
  Megaphone,
  Send,
  TrendingUp,
  Users,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/shared/EmptyState'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type MemberRole = 'Администратор' | 'Менеджер' | 'Специалист' | 'Аналитик'

interface TeamMember {
  id: string
  name: string
  initials: string
  email: string
  role: MemberRole
  online: boolean
  campaigns: number
  sent: number
  conversion: string
}

// ---------------------------------------------------------------------------
// Demo data
// ---------------------------------------------------------------------------

const members: TeamMember[] = [
  { id: '1', name: 'Алексей Козлов', initials: 'АК', email: 'a.kozlov@outreachai.ru', role: 'Администратор', online: true, campaigns: 12, sent: 342, conversion: '14.2%' },
  { id: '2', name: 'Виктория Новикова', initials: 'ВН', email: 'v.novikova@outreachai.ru', role: 'Менеджер', online: true, campaigns: 8, sent: 215, conversion: '11.8%' },
  { id: '3', name: 'Дмитрий Волков', initials: 'ДВ', email: 'd.volkov@outreachai.ru', role: 'Менеджер', online: false, campaigns: 6, sent: 178, conversion: '9.5%' },
  { id: '4', name: 'Анна Соколова', initials: 'АС', email: 'a.sokolova@outreachai.ru', role: 'Специалист', online: true, campaigns: 4, sent: 92, conversion: '16.3%' },
  { id: '5', name: 'Михаил Фролов', initials: 'МФ', email: 'm.frolov@outreachai.ru', role: 'Аналитик', online: false, campaigns: 3, sent: 56, conversion: '8.7%' },
  { id: '6', name: 'Елена Краснова', initials: 'ЕК', email: 'e.krasnova@outreachai.ru', role: 'Специалист', online: true, campaigns: 5, sent: 124, conversion: '12.1%' },
]

// ---------------------------------------------------------------------------
// Role helpers
// ---------------------------------------------------------------------------

const roleConfig: Record<MemberRole, { color: string; bg: string }> = {
  'Администратор': { color: 'text-[#2563eb]', bg: 'bg-[#2563eb]/10' },
  'Менеджер': { color: 'text-[#16a34a]', bg: 'bg-[#16a34a]/10' },
  'Специалист': { color: 'text-[#d97706]', bg: 'bg-[#d97706]/10' },
  'Аналитик': { color: 'text-[#737373]', bg: 'bg-[#e8e8e8]' },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TeamView() {
  const [search, setSearch] = useState('')

  const filteredMembers = members.filter((member) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      member.name.toLowerCase().includes(q) ||
      member.email.toLowerCase().includes(q) ||
      member.role.toLowerCase().includes(q)
    )
  })

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
          Команда
        </h1>
        <p className="text-[13px] text-[#737373] font-medium mt-1">
          Управление участниками команды
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="relative w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#a8a8a8]" />
          <Input
            placeholder="Поиск участников..."
            aria-label="Поиск"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-[36px] text-[13px] bg-[#fafafa] border-[#e8e8e8] rounded-[8px] focus-visible:ring-[#2563eb]/20 focus-visible:border-[#2563eb]/40"
          />
        </div>

        <Button onClick={() => toast.success('Приглашение отправлено')} className="h-[36px] text-[13px] font-medium rounded-[8px] bg-[#0d0d0d] hover:bg-[#262626] text-white gap-2">
          <UserPlus className="w-4 h-4" />
          Пригласить
        </Button>
      </div>

      {/* Team cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredMembers.length === 0 ? (
          <div className="col-span-full">
            <EmptyState
              icon={Users}
              title="Нет участников"
              description={search ? `По запросу «${search}» ничего не найдено` : 'Пригласите первого участника'}
            />
          </div>
        ) : (
        <>
        {filteredMembers.map((member) => {
          const roleCfg = roleConfig[member.role]
          return (
            <div
              key={member.id}
              className="border border-[#e8e8e8] rounded-[10px] bg-white p-5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow duration-200"
            >
              {/* Avatar + name + status */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#0d0d0d] text-white text-[14px] font-bold flex items-center justify-center flex-shrink-0">
                      {member.initials}
                    </div>
                    {/* Online / offline dot */}
                    <div
                      className={cn(
                        'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white',
                        member.online ? 'bg-[#16a34a]' : 'bg-[#d4d4d4]'
                      )}
                    />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-[#171717] leading-tight">
                      {member.name}
                    </div>
                    <div className="text-[12px] text-[#737373] mt-0.5">
                      {member.email}
                    </div>
                  </div>
                </div>
                <button aria-label="Действия" className="w-7 h-7 flex items-center justify-center rounded-lg text-[#a8a8a8] hover:bg-[#f5f5f5] hover:text-[#171717] transition-colors duration-150 cursor-pointer">
                  <MoreHorizontal className="w-[14px] h-[14px]" />
                </button>
              </div>

              {/* Role badge */}
              <div className="mb-4">
                <span
                  className={cn(
                    'inline-flex items-center px-2.5 py-[3px] rounded-full text-[12px] font-semibold',
                    roleCfg.color,
                    roleCfg.bg
                  )}
                >
                  {member.role}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 py-3 border-t border-[#f0f0f0]">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Megaphone className="w-3.5 h-3.5 text-[#a8a8a8]" />
                  </div>
                  <div className="text-[15px] font-bold text-[#171717] leading-none">
                    {member.campaigns}
                  </div>
                  <div className="text-[10.5px] text-[#737373] mt-1">
                    кампании
                  </div>
                </div>
                <div className="text-center border-x border-[#f0f0f0]">
                  <div className="flex items-center justify-center mb-1">
                    <Send className="w-3.5 h-3.5 text-[#a8a8a8]" />
                  </div>
                  <div className="text-[15px] font-bold text-[#171717] leading-none">
                    {member.sent}
                  </div>
                  <div className="text-[10.5px] text-[#737373] mt-1">
                    отправлено
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[#a8a8a8]" />
                  </div>
                  <div className="text-[15px] font-bold text-[#171717] leading-none">
                    {member.conversion}
                  </div>
                  <div className="text-[10.5px] text-[#737373] mt-1">
                    конверсия
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-[#f0f0f0]">
                <button className="w-full h-[32px] flex items-center justify-center gap-1.5 rounded-[7px] text-[12px] font-medium text-[#525252] bg-[#fafafa] hover:bg-[#f0f0f0] transition-colors duration-150 cursor-pointer">
                  <Mail className="w-3.5 h-3.5" />
                  Написать
                </button>
              </div>
            </div>
          )
        })}
        </>
        )}
      </div>
    </div>
  )
}
