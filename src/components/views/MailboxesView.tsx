'use client'

import { useState } from 'react'
import {
  Plus,
  Mail,
  Zap,
  FileText,
  Pause,
  Play,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Send,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type MailboxStatus = 'healthy' | 'warming' | 'issues'

interface Mailbox {
  id: string
  email: string
  userName: string
  status: MailboxStatus
  provider: string
  warmupDay: number
  warmupTotal: number
  warmupDone: boolean
  sentToday: number
  sentMax: number
  spamRate: number
  bounceRate: number
  weeklyBars: number[]
  paused: boolean
}

// ---------------------------------------------------------------------------
// Demo data
// ---------------------------------------------------------------------------

const mailboxes: Mailbox[] = [
  {
    id: '1',
    email: 'outreach@techcorp.ru',
    userName: 'Алексей Петров',
    status: 'healthy',
    provider: 'Яндекс',
    warmupDay: 21,
    warmupTotal: 21,
    warmupDone: true,
    sentToday: 28,
    sentMax: 40,
    spamRate: 2,
    bounceRate: 1,
    weeklyBars: [18, 22, 25, 20, 28, 30, 28],
    paused: false,
  },
  {
    id: '2',
    email: 'sales@prospect.ru',
    userName: 'Мария Иванова',
    status: 'healthy',
    provider: 'Gmail',
    warmupDay: 21,
    warmupTotal: 21,
    warmupDone: true,
    sentToday: 35,
    sentMax: 50,
    spamRate: 3,
    bounceRate: 1,
    weeklyBars: [30, 32, 28, 35, 38, 33, 35],
    paused: false,
  },
  {
    id: '3',
    email: 'connect@sender.io',
    userName: 'Дмитрий Смирнов',
    status: 'warming',
    provider: 'Яндекс',
    warmupDay: 18,
    warmupTotal: 21,
    warmupDone: false,
    sentToday: 12,
    sentMax: 15,
    spamRate: 5,
    bounceRate: 2,
    weeklyBars: [5, 7, 8, 9, 10, 11, 12],
    paused: false,
  },
  {
    id: '4',
    email: 'demo@example.com',
    userName: 'Елена Козлова',
    status: 'issues',
    provider: 'Gmail',
    warmupDay: 14,
    warmupTotal: 21,
    warmupDone: false,
    sentToday: 5,
    sentMax: 20,
    spamRate: 12,
    bounceRate: 8,
    weeklyBars: [15, 12, 8, 6, 4, 5, 5],
    paused: true,
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const statusConfig: Record<MailboxStatus, { label: string; className: string }> = {
  healthy: { label: 'Здоров', className: 'bg-[#f5f5f5] text-[#404040]' },
  warming: { label: 'Разогрев', className: 'bg-[#f5f5f5] text-[#525252]' },
  issues: { label: 'Проблема', className: 'bg-[#f5f5f5] text-[#a3a3a3]' },
}

function MiniBarChart({ bars }: { bars: number[] }) {
  const max = Math.max(...bars)
  return (
    <div className="flex items-end gap-[2px] h-8">
      {bars.map((v, i) => (
        <div
          key={i}
          className="spark-bar flex-1 bg-[#171717] rounded-[2px] opacity-20 last:opacity-50"
          style={{ height: `${Math.max(4, (v / max) * 100)}%` }}
        />
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MailboxesView() {
  const [data, setData] = useState<Mailbox[]>(mailboxes)

  const togglePause = (id: string) => {
    setData((prev) =>
      prev.map((m) => (m.id === id ? { ...m, paused: !m.paused } : m))
    )
    const mb = data.find((m) => m.id === id)
    if (mb) {
      toast.success(mb.paused ? `${mb.email}: возобновлён` : `${mb.email}: приостановлен`)
    }
  }

  return (
    <div className="p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
            Почтовые ящики
          </h1>
          <p className="text-[13px] text-[#737373] mt-1">
            Мониторинг и управление почтовыми ящиками
          </p>
        </div>
        <Button
          onClick={() => toast.success('Ящик подключён')}
          className="gap-2 bg-[#0d0d0d] text-white hover:bg-[#262626]"
        >
          <Plus className="h-4 w-4" />
          Подключить ящик
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Ящиков', value: '4', icon: Mail },
          { label: 'Здоровых', value: '2', icon: CheckCircle2 },
          { label: 'На разогреве', value: '2', icon: Zap },
          { label: 'Отправлено сегодня', value: '93', icon: Send },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.label}
              className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-[#fafafa]">
                  <Icon className="w-4 h-4 text-[#525252]" />
                </div>
                <span className="text-[12.5px] text-[#737373] font-medium">{s.label}</span>
              </div>
              <div className="text-[24px] font-semibold text-[#0d0d0d] tracking-tight">
                {s.value}
              </div>
            </div>
          )
        })}
      </div>

      {/* Mailbox cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {data.map((mb) => {
          const st = statusConfig[mb.status]
          const warmupPct = Math.round((mb.warmupDay / mb.warmupTotal) * 100)
          const sendPct = Math.round((mb.sentToday / mb.sentMax) * 100)

          return (
            <div
              key={mb.id}
              className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card p-5"
            >
              {/* Top row: email + provider + status */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#fafafa] shrink-0">
                    <Mail className="w-4 h-4 text-[#525252]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-[#171717] truncate">
                      {mb.email}
                    </div>
                    <div className="text-[12px] text-[#a3a3a3]">
                      {mb.userName} &middot; {mb.provider}
                    </div>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-[2px] rounded-[6px] text-[11px] font-medium shrink-0 ${st.className}`}
                >
                  {st.label}
                </span>
              </div>

              {/* Warmup progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[12px] text-[#737373] font-medium">
                    Прогрев: День {mb.warmupDay} из {mb.warmupTotal}
                    {mb.warmupDone && ' — Завершён'}
                  </span>
                  <span className="text-[12px] text-[#525252] font-semibold">{warmupPct}%</span>
                </div>
                <Progress
                  value={warmupPct}
                  className={`h-1.5 rounded-full [&>div]:${mb.warmupDone ? 'bg-[#404040]' : 'bg-[#737373]'}`}
                />
              </div>

              {/* Sending stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <div className="text-[11px] text-[#a3a3a3] mb-0.5">Отправлено</div>
                  <div className="text-[14px] font-semibold text-[#0d0d0d]">
                    {mb.sentToday}/{mb.sentMax}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-[#a3a3a3] mb-0.5">Spam rate</div>
                  <div className={`text-[14px] font-semibold ${mb.spamRate > 5 ? 'text-[#a3a3a3]' : 'text-[#0d0d0d]'}`}>
                    {mb.spamRate}%
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-[#a3a3a3] mb-0.5">Bounce</div>
                  <div className={`text-[14px] font-semibold ${mb.bounceRate > 5 ? 'text-[#a3a3a3]' : 'text-[#0d0d0d]'}`}>
                    {mb.bounceRate}%
                  </div>
                </div>
              </div>

              {/* Mini chart: volume over 7 days */}
              <div className="mb-4">
                <div className="text-[11px] text-[#a3a3a3] mb-2">Объём за 7 дней</div>
                <MiniBarChart bars={mb.weeklyBars} />
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-[#f5f5f5]">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-[12px] border-[#e8e8e8]"
                  onClick={() => toast.info('Тестовое письмо отправлено для ' + mb.email)}
                >
                  <Zap className="h-3 w-3" />
                  Тест
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-[12px] border-[#e8e8e8]"
                  onClick={() => toast.info('Логи для ' + mb.email)}
                >
                  <FileText className="h-3 w-3" />
                  Логи
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-1.5 text-[12px] border-[#e8e8e8] ${mb.paused ? 'text-[#525252]' : 'text-[#a3a3a3]'}`}
                  onClick={() => togglePause(mb.id)}
                >
                  {mb.paused ? (
                    <>
                      <Play className="h-3 w-3" />
                      Продолжить
                    </>
                  ) : (
                    <>
                      <Pause className="h-3 w-3" />
                      Пауза
                    </>
                  )}
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
