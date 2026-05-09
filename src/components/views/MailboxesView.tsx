'use client'

import { Plus, AlertCircle, Check } from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type MailboxStatus = 'active' | 'warming' | 'paused'

interface Mailbox {
  id: string
  email: string
  provider: string
  status: MailboxStatus
  warmupDone: boolean
  warmupLabel: string
  spamRate: number
  sentToday: number
  limitPerDay: number
}

// ---------------------------------------------------------------------------
// Demo data (from template)
// ---------------------------------------------------------------------------

const mailboxes: Mailbox[] = [
  {
    id: '1',
    email: 'hello@outreach1.ru',
    provider: 'Яндекс Почта',
    status: 'active',
    warmupDone: true,
    warmupLabel: 'Прогрет',
    spamRate: 0.04,
    sentToday: 38,
    limitPerDay: 50,
  },
  {
    id: '2',
    email: 'sales@outreach1.ru',
    provider: 'Яндекс Почта',
    status: 'active',
    warmupDone: true,
    warmupLabel: 'Прогрет',
    spamRate: 0.02,
    sentToday: 42,
    limitPerDay: 50,
  },
  {
    id: '3',
    email: 'outreach@outreach1.ru',
    provider: 'Gmail',
    status: 'warming',
    warmupDone: false,
    warmupLabel: 'День 14 из 21',
    spamRate: 0.31,
    sentToday: 12,
    limitPerDay: 15,
  },
  {
    id: '4',
    email: 'info@outreach2.ru',
    provider: 'Exchange',
    status: 'paused',
    warmupDone: true,
    warmupLabel: 'Прогрет',
    spamRate: 0.92,
    sentToday: 0,
    limitPerDay: 40,
  },
]

// ---------------------------------------------------------------------------
// Configs
// ---------------------------------------------------------------------------

const statusConfig: Record<MailboxStatus, { label: string; className: string }> = {
  active: { label: 'Активен', className: 'bg-[#f5f5f5] text-[#404040]' },
  warming: { label: 'Прогрев', className: 'bg-[#f5f5f5] text-[#525252]' },
  paused: { label: 'Пауза', className: 'bg-[#f5f5f5] text-[#404040]' },
}

function spamRateColor(rate: number): string {
  if (rate <= 0.1) return 'color:#404040;font-weight:600'
  if (rate <= 0.5) return 'color:#737373;font-weight:600'
  return 'color:#404040;font-weight:600'
}

function spamRateClass(rate: number): string {
  if (rate <= 0.1) return 'text-[#404040] font-semibold'
  if (rate <= 0.5) return 'text-[#737373] font-semibold'
  return 'text-[#404040] font-semibold'
}

function warmingClass(mb: Mailbox): string {
  if (mb.warmupDone) return 'text-[12px] text-[#404040] font-semibold'
  return 'text-[12px] text-[#737373]'
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MailboxesView() {
  return (
    <div className="p-6 overflow-y-auto h-full custom-scroll flex flex-col gap-5">
      {/* Header */}
      <PageHeader title="Почтовые ящики" description="Ящики подключены с ваших доменов">
        <Button
          onClick={() => toast.success('Подключение ящика')}
          className="gap-2 bg-[#0d0d0d] text-white hover:bg-[#262626]"
        >
          <Plus className="h-4 w-4" />
          Подключить ящик
        </Button>
      </PageHeader>

      {/* Table */}
      <div className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-[#e8e8e8]">
              <th className="text-left px-4 py-3 text-[12px] font-medium text-[#737373]">
                Email
              </th>
              <th className="text-left px-4 py-3 text-[12px] font-medium text-[#737373]">
                Провайдер
              </th>
              <th className="text-left px-4 py-3 text-[12px] font-medium text-[#737373]">
                Статус
              </th>
              <th className="text-left px-4 py-3 text-[12px] font-medium text-[#737373]">
                Прогрев
              </th>
              <th className="text-left px-4 py-3 text-[12px] font-medium text-[#737373]">
                Spam rate
              </th>
              <th className="text-left px-4 py-3 text-[12px] font-medium text-[#737373]">
                Отправлено сегодня
              </th>
              <th className="text-left px-4 py-3 text-[12px] font-medium text-[#737373]">
                Лимит/день
              </th>
            </tr>
          </thead>
          <tbody>
            {mailboxes.map((mb) => {
              const st = statusConfig[mb.status]
              return (
                <tr
                  key={mb.id}
                  className="border-b border-[#f5f5f5] last:border-b-0 hover:bg-[#fafafa] transition-colors cursor-pointer"
                  onClick={() => toast.info('Настройки ящика ' + mb.email)}
                >
                  <td className="px-4 py-3 font-mono text-[12.5px] text-[#171717]">
                    {mb.email}
                  </td>
                  <td className="px-4 py-3 text-[#525252]">{mb.provider}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-[2px] rounded-[6px] text-[11px] font-medium ${st.className}`}
                    >
                      {st.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={warmingClass(mb)}>
                      {mb.warmupDone && (
                        <Check className="inline w-3 h-3 mr-0.5 -mt-[1px]" />
                      )}
                      {mb.warmupLabel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={spamRateClass(mb.spamRate)}>
                      {mb.spamRate}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#171717]">{mb.sentToday}</td>
                  <td className="px-4 py-3 text-[#171717]">{mb.limitPerDay}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Warning alert */}
      <div className="bg-white border border-[#e8e8e8] rounded-[10px] p-4 flex gap-3 items-start">
        <AlertCircle className="w-[15px] h-[15px] text-[#b91c1c] shrink-0 mt-0.5" />
        <div className="text-[13px] text-[#404040] leading-[1.5]">
          Ящик <strong>info@outreach2.ru</strong> приостановлен автоматически: spam rate 0.92%
          (порог 0.5%). Рекомендации: проверить список получателей, снизить дневной лимит.{' '}
          <span
            className="text-[#b91c1c] font-semibold cursor-pointer hover:underline"
            onClick={() => toast.info('Агент анализирует проблему')}
          >
            Попросить агента разобраться →
          </span>
        </div>
      </div>
    </div>
  )
}
