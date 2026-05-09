'use client'

import {
  DollarSign,
  CreditCard,
  Pencil,
  Trash2,
  Plus,
  TrendingUp,
  Users,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table'

interface Plan {
  name: string
  price: string
  users: string
  features: string[]
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: '$29/мес',
    users: 'до 5 пользователей',
    features: ['1 000 писем/мес', '3 ящика', 'Базовая аналитика'],
  },
  {
    name: 'Professional',
    price: '$99/мес',
    users: 'до 20 пользователей',
    features: ['10 000 писем/мес', '10 ящиков', 'AI-ассистент', 'CRM интеграция'],
  },
  {
    name: 'Enterprise',
    price: '$249/мес',
    users: 'Без ограничений',
    features: ['Неограниченные письма', 'Неограниченные ящики', 'Приоритетная поддержка', 'Custom интеграции'],
  },
]

interface Payment {
  tenant: string
  amount: string
  date: string
  status: 'paid' | 'pending' | 'failed'
  invoice: string
}

const payments: Payment[] = [
  { tenant: 'TechCorp Solutions', amount: '$299', date: '01.06.2024', status: 'paid', invoice: 'INV-2024-001' },
  { tenant: 'DataFlow Inc.', amount: '$79', date: '01.06.2024', status: 'paid', invoice: 'INV-2024-002' },
  { tenant: 'CloudSync Technologies', amount: '$29', date: '15.06.2024', status: 'pending', invoice: 'INV-2024-003' },
  { tenant: 'MarketingPro Agency', amount: '$79', date: '01.06.2024', status: 'paid', invoice: 'INV-2024-004' },
  { tenant: 'BrightStar Startup', amount: '$29', date: '01.06.2024', status: 'failed', invoice: 'INV-2024-005' },
]

const paymentStatusConfig = {
  paid: { label: 'Оплачен', className: 'bg-[#f5f5f5] text-[#404040] border-[#e8e8e8]', icon: CheckCircle },
  pending: { label: 'Ожидает', className: 'bg-[#f5f5f5] text-[#525252] border-[#e8e8e8]', icon: Clock },
  failed: { label: 'Ошибка', className: 'bg-[#f5f5f5] text-[#404040] border-[#e8e8e8]', icon: XCircle },
}

export default function AdminBillingView() {
  const [planList, setPlanList] = useState<Plan[]>(plans)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const planToDelete = planList.find((p) => p.name === confirmId)

  const handleDelete = (name: string) => {
    setPlanList((prev) => prev.filter((p) => p.name !== name))
  }
  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scroll">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#e8e8e8]">
        <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
          Биллинг (админ)
        </h1>
        <p className="text-sm text-[#737373] mt-0.5">
          Управление тарифами и платежами
        </p>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {/* Revenue stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-[10px] border border-[#e8e8e8] bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] text-[#737373]">
                Месячная выручка (MRR)
              </span>
              <div className="w-9 h-9 rounded-[8px] bg-[#fafafa] flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-[#16a34a]" />
              </div>
            </div>
            <div className="text-2xl font-semibold text-[#171717]">
              $4 127
            </div>
            <div className="text-[12px] text-[#16a34a] mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12.5% к прошлому месяцу
            </div>
          </div>
          <div className="rounded-[10px] border border-[#e8e8e8] bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] text-[#737373]">
                Активные подписки
              </span>
              <div className="w-9 h-9 rounded-[8px] bg-[#fafafa] flex items-center justify-center">
                <Users className="w-4 h-4 text-[#2563eb]" />
              </div>
            </div>
            <div className="text-2xl font-semibold text-[#171717]">21</div>
            <div className="text-[12px] text-[#737373] mt-1">
              из 24 тенантов
            </div>
          </div>
        </div>

        {/* Plans management */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[#171717]">
              Тарифные планы
            </h2>
            <Button onClick={() => toast.success('План добавлен')}
              size="sm"
              className="rounded-[10px] bg-[#0d0d0d] hover:bg-[#262626] text-white text-[13px] gap-2"
            >
              <Plus className="w-3.5 h-3.5" />
              Добавить план
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {planList.map((plan) => (
              <div
                key={plan.name}
                className="rounded-[10px] border border-[#e8e8e8] bg-white p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-[#171717]">
                    {plan.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Изменить"
                      className="h-7 w-7 text-[#a8a8a8] hover:text-[#171717]"
                    >
                      <Pencil className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Удалить"
                      className="h-7 w-7 text-[#a8a8a8] hover:text-[#dc2626]"
                      onClick={() => setConfirmId(plan.name)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="text-lg font-semibold text-[#171717] mb-1">
                  {plan.price}
                </div>
                <div className="text-[12px] text-[#737373] mb-4">
                  {plan.users}
                </div>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-[13px] text-[#525252]"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-[#16a34a] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Recent payments */}
        <div>
          <h2 className="text-sm font-semibold text-[#171717] mb-3">
            Последние платежи
          </h2>
          <div className="rounded-[10px] border border-[#e8e8e8] bg-white overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#fafafa] hover:bg-[#fafafa] border-b border-[#e8e8e8]">
                  <TableHead className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                    Тенант
                  </TableHead>
                  <TableHead className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                    Сумма
                  </TableHead>
                  <TableHead className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                    Дата
                  </TableHead>
                  <TableHead className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373]">
                    Статус
                  </TableHead>
                  <TableHead className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737373] text-right">
                    Инвойс
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((p) => {
                  const cfg = paymentStatusConfig[p.status]
                  const StatusIcon = cfg.icon
                  return (
                    <TableRow
                      key={p.invoice}
                      className="border-b border-[#e8e8e8] last:border-b-0"
                    >
                      <TableCell className="text-[13px] font-medium text-[#171717]">
                        {p.tenant}
                      </TableCell>
                      <TableCell className="text-[13px] text-[#171717] font-medium">
                        {p.amount}
                      </TableCell>
                      <TableCell className="text-[13px] text-[#737373]">
                        {p.date}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cfg.className}
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {cfg.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="inline-flex items-center gap-1 text-[13px] text-[#2563eb] hover:text-[#1d4ed8] cursor-pointer transition-colors">
                          <FileText className="w-3.5 h-3.5" />
                          {p.invoice}
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmId !== null}
        onOpenChange={(open) => !open && setConfirmId(null)}
        title="Удалить план?"
        description={planToDelete ? `Тарифный план «${planToDelete.name}» будет удалён безвозвратно.` : 'Тарифный план будет удалён безвозвратно.'}
        confirmLabel="Удалить"
        onConfirm={() => {
          if (confirmId) {
            handleDelete(confirmId)
            toast.success('План удалён')
            setConfirmId(null)
          }
        }}
      />
    </div>
  )
}
