'use client'

import { useState } from 'react'
import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table'

interface Tenant {
  name: string
  plan: string
  users: number
  status: 'active' | 'trial' | 'suspended'
  created: string
}

const tenants: Tenant[] = [
  { name: 'TechCorp Solutions', plan: 'Enterprise', users: 45, status: 'active', created: '12.03.2024' },
  { name: 'DataFlow Inc.', plan: 'Professional', users: 22, status: 'active', created: '28.01.2024' },
  { name: 'CloudSync Technologies', plan: 'Starter', users: 8, status: 'trial', created: '15.06.2024' },
  { name: 'MarketingPro Agency', plan: 'Professional', users: 15, status: 'active', created: '05.05.2024' },
  { name: 'BrightStar Startup', plan: 'Starter', users: 3, status: 'suspended', created: '20.02.2024' },
]

const statusConfig = {
  active: { label: 'Active', className: 'bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0]' },
  trial: { label: 'Trial', className: 'bg-[#eff6ff] text-[#2563eb] border-[#bfdbfe]' },
  suspended: { label: 'Suspended', className: 'bg-[#fef2f2] text-[#dc2626] border-[#fecaca]' },
}

export default function AdminTenantsView() {
  const [search, setSearch] = useState('')

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scroll">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#e8e8e8]">
        <h1 className="text-lg font-semibold text-[#171717]">Тенанты</h1>
        <p className="text-sm text-[#737373] mt-0.5">
          Управление клиентами
        </p>
      </div>

      <div className="flex-1 p-6 space-y-4">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a8a8a8]" />
            <input
              type="text"
              placeholder="Поиск тенантов..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#e8e8e8] bg-white text-sm outline-none focus:border-[#737373] transition-colors placeholder:text-[#a8a8a8] text-[#171717]"
            />
          </div>
          <Button className="h-9 rounded-[10px] bg-[#0d0d0d] hover:bg-[#262626] text-white text-[13px] gap-2">
            <Plus className="w-4 h-4" />
            Добавить тенант
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#fafafa] hover:bg-[#fafafa] border-b border-[#e8e8e8]">
                <TableHead className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                  Название
                </TableHead>
                <TableHead className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                  Тариф
                </TableHead>
                <TableHead className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                  Пользователи
                </TableHead>
                <TableHead className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                  Статус
                </TableHead>
                <TableHead className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                  Создан
                </TableHead>
                <TableHead className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373] text-right">
                  Действия
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((t) => {
                const cfg = statusConfig[t.status]
                return (
                  <TableRow
                    key={t.name}
                    className="border-b border-[#e8e8e8] last:border-b-0"
                  >
                    <TableCell className="text-[13px] font-medium text-[#171717]">
                      {t.name}
                    </TableCell>
                    <TableCell className="text-[13px] text-[#525252]">
                      {t.plan}
                    </TableCell>
                    <TableCell className="text-[13px] text-[#525252]">
                      {t.users}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cfg.className}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1" />
                        {cfg.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[13px] text-[#a8a8a8]">
                      {t.created}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-[#a8a8a8] hover:text-[#171717]"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-[#a8a8a8] hover:text-[#dc2626]"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
