'use client'

import { useState } from 'react'
import {
  Search,
  UserPlus,
  MoreHorizontal,
  Mail,
  Users,
} from 'lucide-react'
import { toast } from 'sonner'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type MemberRole = 'Владелец' | 'Админ' | 'Менеджер' | 'Специалист'
type MemberStatus = 'online' | 'training' | 'offline'

interface TeamMember {
  id: string
  name: string
  email: string
  role: MemberRole
  status: MemberStatus
  lastActivity: string
  actions: number
}

// ---------------------------------------------------------------------------
// Demo data — 8 rows
// ---------------------------------------------------------------------------

const members: TeamMember[] = [
  { id: '1', name: 'Алексей Смирнов', email: 'a.smirnov@outreachai.ru', role: 'Владелец', status: 'online', lastActivity: 'Сейчас', actions: 142 },
  { id: '2', name: 'Мария Иванова', email: 'm.ivanova@outreachai.ru', role: 'Админ', status: 'online', lastActivity: '2 мин назад', actions: 98 },
  { id: '3', name: 'Дмитрий Козлов', email: 'd.kozlov@outreachai.ru', role: 'Менеджер', status: 'online', lastActivity: '15 мин назад', actions: 234 },
  { id: '4', name: 'Елена Смирнова', email: 'e.smirnova@outreachai.ru', role: 'Менеджер', status: 'training', lastActivity: '1 час назад', actions: 56 },
  { id: '5', name: 'Олег Новиков', email: 'o.novikov@outreachai.ru', role: 'Специалист', status: 'online', lastActivity: '5 мин назад', actions: 312 },
  { id: '6', name: 'Анна Волкова', email: 'a.volkova@outreachai.ru', role: 'Специалист', status: 'training', lastActivity: '30 мин назад', actions: 87 },
  { id: '7', name: 'Павел Егоров', email: 'p.egorov@outreachai.ru', role: 'Менеджер', status: 'offline', lastActivity: '2 часа назад', actions: 156 },
  { id: '8', name: 'Ольга Фёдорова', email: 'o.fedorova@outreachai.ru', role: 'Админ', status: 'offline', lastActivity: '5 часов назад', actions: 201 },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const roleConfig: Record<MemberRole, { className: string }> = {
  'Владелец': { className: 'bg-[#f5f5f5] text-[#404040]' },
  'Админ': { className: 'bg-[#f5f5f5] text-[#404040]' },
  'Менеджер': { className: 'bg-[#f5f5f5] text-[#525252]' },
  'Специалист': { className: 'bg-[#f5f5f5] text-[#737373]' },
}

const statusConfig: Record<MemberStatus, { label: string; dotClass: string }> = {
  online: { label: 'Онлайн', dotClass: 'bg-[#0d0d0d]' },
  training: { label: 'Обучение', dotClass: 'bg-[#737373]' },
  offline: { label: 'Оффлайн', dotClass: 'bg-[#a3a3a3]' },
}

const roleFilters = ['Все роли', 'Владелец', 'Админ', 'Менеджер', 'Специалист']

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TeamView() {
  const [roleFilter, setRoleFilter] = useState('Все роли')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = members.filter((m) => {
    if (roleFilter !== 'Все роли' && m.role !== roleFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q)
      )
    }
    return true
  })

  const onlineCount = members.filter((m) => m.status === 'online').length
  const trainingCount = members.filter((m) => m.status === 'training').length
  const totalActions = members.reduce((sum, m) => sum + m.actions, 0)

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(filtered.map((m) => m.id)))
    }
  }

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
          Команда
        </h1>
        <div className="flex items-center gap-3 mt-2 text-[13px] text-[#737373] font-medium">
          <span>Всего <span className="text-[#171717] font-semibold">{members.length}</span></span>
          <span className="w-1 h-1 rounded-full bg-[#e8e8e8]" />
          <span>Online <span className="text-[#0d0d0d] font-semibold">{onlineCount}</span></span>
          <span className="w-1 h-1 rounded-full bg-[#e8e8e8]" />
          <span>На обучении <span className="text-[#737373] font-semibold">{trainingCount}</span></span>
          <span className="w-1 h-1 rounded-full bg-[#e8e8e8]" />
          <span>Задач <span className="text-[#171717] font-semibold">{totalActions.toLocaleString('ru-RU')}</span></span>
        </div>
      </div>

      {/* Actions + Filters */}
      <div className="flex items-center gap-4 mb-5 flex-wrap">
        <Button
          onClick={() => toast.success('Приглашение отправлено')}
          className="h-[36px] text-[13px] font-medium rounded-[8px] bg-[#0d0d0d] hover:bg-[#262626] text-white gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Добавить участника
        </Button>

        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger
            size="sm"
            className="h-[32px] text-[12.5px] font-medium border-[#e8e8e8] rounded-[8px] bg-white w-[150px]"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {roleFilters.map((r) => (
              <SelectItem key={r} value={r} className="text-[13px]">
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative w-[220px] ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#a3a3a3]" />
          <Input
            placeholder="Поиск участников..."
            aria-label="Поиск"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-[32px] text-[12.5px] bg-[#fafafa] border-[#e8e8e8] rounded-[8px]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-[#e8e8e8] hover:bg-transparent bg-[#fafafa]">
              <TableHead className="w-[40px] pl-4">
                <Checkbox
                  checked={selected.size === filtered.length && filtered.length > 0}
                  onCheckedChange={toggleAll}
                  className="border-[#d4d4d4] data-[state=checked]:bg-[#0d0d0d] data-[state=checked]:border-[#0d0d0d]"
                />
              </TableHead>
              <TableHead className="text-[12px] font-semibold text-[#525252] uppercase tracking-wide">Имя</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#525252] uppercase tracking-wide">Email</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#525252] uppercase tracking-wide">Роль</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#525252] uppercase tracking-wide">Статус</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#525252] uppercase tracking-wide">Последняя активность</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#525252] uppercase tracking-wide text-right">Действий</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((m) => {
              const role = roleConfig[m.role]
              const status = statusConfig[m.status]
              return (
                <TableRow key={m.id} className="border-[#f5f5f5] hover:bg-[#fafafa] cursor-pointer group">
                  <TableCell className="pl-4">
                    <Checkbox
                      checked={selected.has(m.id)}
                      onCheckedChange={() => toggleOne(m.id)}
                      className="border-[#d4d4d4] data-[state=checked]:bg-[#0d0d0d] data-[state=checked]:border-[#0d0d0d]"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0d0d0d] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                        {m.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="text-[13px] font-medium text-[#171717]">{m.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-[13px] text-[#525252]">{m.email}</span>
                  </TableCell>
                  <TableCell>
                    <span className={cn('inline-flex items-center px-2.5 py-[3px] rounded-full text-[11.5px] font-semibold', role.className)}>
                      {m.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={cn('w-2 h-2 rounded-full shrink-0', status.dotClass)} />
                      <span className="text-[13px] text-[#525252]">{status.label}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-[13px] text-[#737373]">{m.lastActivity}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-[13px] font-semibold text-[#171717]">{m.actions}</span>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 text-[12.5px] text-[#737373]">
        <span>Показано {filtered.length} из {members.length}</span>
        {selected.size > 0 && (
          <span className="font-medium text-[#171717]">
            Выбрано: {selected.size}
          </span>
        )}
      </div>
    </div>
  )
}
