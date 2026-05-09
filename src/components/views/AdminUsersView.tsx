'use client'

import { useState } from 'react'
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  MoreHorizontal,
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
import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'

interface User {
  name: string
  email: string
  tenant: string
  role: 'admin' | 'user'
  status: 'active' | 'inactive'
  lastLogin: string
}

const users: User[] = [
  { name: 'Алексей Козлов', email: 'alexey@techcorp.ru', tenant: 'TechCorp Solutions', role: 'admin', status: 'active', lastLogin: 'Сегодня, 14:32' },
  { name: 'Марина Светлова', email: 'marina@techcorp.ru', tenant: 'TechCorp Solutions', role: 'user', status: 'active', lastLogin: 'Сегодня, 11:15' },
  { name: 'Дмитрий Петров', email: 'dmitry@dataflow.io', tenant: 'DataFlow Inc.', role: 'admin', status: 'active', lastLogin: 'Вчера, 18:40' },
  { name: 'Елена Иванова', email: 'elena@dataflow.io', tenant: 'DataFlow Inc.', role: 'user', status: 'active', lastLogin: 'Вчера, 16:20' },
  { name: 'Олег Смирнов', email: 'oleg@cloudsync.com', tenant: 'CloudSync Technologies', role: 'admin', status: 'active', lastLogin: '15.06.2024' },
  { name: 'Анна Козлова', email: 'anna@brightstar.io', tenant: 'BrightStar Startup', role: 'user', status: 'inactive', lastLogin: '01.05.2024' },
]

const roleConfig = {
  admin: { label: 'Admin', className: 'bg-[#faf5ff] text-[#7c3aed] border-[#e9d5ff]' },
  user: { label: 'User', className: 'bg-[#f5f5f5] text-[#737373] border-[#e8e8e8]' },
}

export default function AdminUsersView() {
  const [search, setSearch] = useState('')
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const [userList, setUserList] = useState(users)

  const userToDelete = userList.find((u) => u.email === confirmId)

  const filteredUsers = userList.filter((u) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.tenant.toLowerCase().includes(q)
    )
  })

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scroll">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#e8e8e8]">
        <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
          Пользователи
        </h1>
        <p className="text-sm text-[#737373] mt-0.5">
          Все пользователи системы
        </p>
      </div>

      <div className="flex-1 p-6 space-y-4">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a8a8a8]" />
            <input
              type="text"
              placeholder="Поиск пользователей..."
              aria-label="Поиск"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#e8e8e8] bg-white text-sm outline-none focus:border-[#737373] transition-colors placeholder:text-[#737373] text-[#171717]"
            />
          </div>
          <Button onClick={() => toast.success('Пользователь добавлен')} className="h-9 rounded-[10px] bg-[#0d0d0d] hover:bg-[#262626] text-white text-[13px] gap-2">
            <Plus className="w-4 h-4" />
            Добавить пользователя
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#fafafa] hover:bg-[#fafafa] border-b border-[#e8e8e8]">
                <TableHead className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                  Имя
                </TableHead>
                <TableHead className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                  Email
                </TableHead>
                <TableHead className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                  Тенант
                </TableHead>
                <TableHead className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                  Роль
                </TableHead>
                <TableHead className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                  Статус
                </TableHead>
                <TableHead className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                  Последний вход
                </TableHead>
                <TableHead className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373] text-right">
                  Действия
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((u) => {
                const cfg = roleConfig[u.role]
                return (
                  <TableRow
                    key={u.email}
                    className="border-b border-[#e8e8e8] last:border-b-0"
                  >
                    <TableCell className="text-[13px] font-medium text-[#171717]">
                      {u.name}
                    </TableCell>
                    <TableCell className="text-[13px] text-[#525252]">
                      {u.email}
                    </TableCell>
                    <TableCell className="text-[13px] text-[#525252]">
                      {u.tenant}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cfg.className}
                      >
                        {cfg.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            u.status === 'active'
                              ? 'bg-[#0d0d0d]'
                              : 'bg-[#d4d4d4]'
                          }`}
                        />
                        <span
                          className={`text-[13px] ${
                            u.status === 'active'
                              ? 'text-[#525252]'
                              : 'text-[#737373]'
                          }`}
                        >
                          {u.status === 'active' ? 'Активен' : 'Неактивен'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[13px] text-[#737373]">
                      {u.lastLogin}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Изменить"
                          className="h-8 w-8 text-[#a8a8a8] hover:text-[#171717]"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Удалить"
                          className="h-8 w-8 text-[#a8a8a8] hover:text-[#dc2626]"
                          onClick={() => setConfirmId(u.email)}
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

      <ConfirmDialog
        open={confirmId !== null}
        onOpenChange={(open) => !open && setConfirmId(null)}
        title="Удалить пользователя?"
        description={userToDelete ? `Пользователь «${userToDelete.name}» будет удалён безвозвратно.` : 'Пользователь будет удалён безвозвратно.'}
        confirmLabel="Удалить"
        onConfirm={() => {
          if (confirmId) {
            setUserList((prev) => prev.filter((u) => u.email !== confirmId))
            toast.success('Пользователь удалён')
            setConfirmId(null)
          }
        }}
      />
    </div>
  )
}
