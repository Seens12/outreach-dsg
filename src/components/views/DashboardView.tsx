'use client'

import {
  TrendingUp,
  TrendingDown,
  Mail,
  MailOpen,
  MessageSquare,
  Target,
  AlertTriangle,
  Clock,
  Send,
  Flame,
  ArrowUpRight,
  ChevronRight,
  User,
} from 'lucide-react'

// ── Demo Data ───────────────────────────────────────────────

const metrics = [
  {
    label: 'Отправлено',
    value: '1 247',
    trend: null,
    bars: [40, 55, 38, 62, 48, 70, 55, 80, 65, 90, 72, 85],
  },
  {
    label: 'Открыто',
    value: '68.3%',
    trend: 'up' as const,
    trendValue: '+4.2%',
    bars: [50, 58, 52, 60, 55, 63, 58, 67, 62, 68, 65, 70],
  },
  {
    label: 'Ответы',
    value: '12.4%',
    trend: 'up' as const,
    trendValue: '+1.8%',
    bars: [30, 35, 28, 40, 38, 42, 36, 45, 40, 48, 43, 50],
  },
  {
    label: 'Лиды',
    value: '156',
    trend: 'up' as const,
    trendValue: '+23',
    bars: [20, 28, 24, 35, 30, 38, 32, 42, 38, 48, 44, 52],
  },
]

const attentionItems = [
  {
    id: 1,
    text: '3 кампании ожидают подтверждения отправки',
    action: 'Перейти',
  },
  {
    id: 2,
    text: 'Домен outreach.io истекает через 5 дней',
    action: 'Обновить',
  },
]

const activityItems = [
  {
    id: 1,
    type: 'sent' as const,
    text: 'Отправлено 47 писем из кампании "IT Directors Q4"',
    time: '2 мин назад',
  },
  {
    id: 2,
    type: 'replied' as const,
    text: 'Алексей Петров (TechCorp) ответил на письмо',
    time: '15 мин назад',
  },
  {
    id: 3,
    type: 'hot' as const,
    text: 'Новый горячий лид: Мария Иванова, DataFlow Inc.',
    time: '32 мин назад',
  },
  {
    id: 4,
    type: 'warn' as const,
    text: 'Откликаемость кампании "Startup Q4" ниже 5%',
    time: '1 ч назад',
  },
  {
    id: 5,
    type: 'info' as const,
    text: 'Автоматический follow-up запущен для 12 контактов',
    time: '2 ч назад',
  },
  {
    id: 6,
    type: 'sent' as const,
    text: 'Шаблон "Cold Intro v3" обновлён и сохранён',
    time: '3 ч назад',
  },
]

const hotLeads = [
  { id: 1, initials: 'АП', name: 'Алексей Петров', company: 'TechCorp', status: 'warm' as const },
  { id: 2, initials: 'МИ', name: 'Мария Иванова', company: 'DataFlow Inc.', status: 'hot' as const },
  { id: 3, initials: 'ДК', name: 'Дмитрий Козлов', company: 'CloudBase', status: 'warm' as const },
  { id: 4, initials: 'ЕС', name: 'Елена Смирнова', company: 'ScaleUp Labs', status: 'new' as const },
  { id: 5, initials: 'ИВ', name: 'Игорь Волков', company: 'DevStack', status: 'hot' as const },
]

// ── Helpers ─────────────────────────────────────────────────

const dotColor: Record<string, string> = {
  sent: 'bg-[#2563eb]',
  replied: 'bg-[#16a34a]',
  hot: 'bg-[#dc2626]',
  warn: 'bg-[#d97706]',
  info: 'bg-[#a3a3a3]',
}

const statusConfig: Record<string, { label: string; className: string }> = {
  hot: { label: 'Горячий', className: 'bg-[#fef2f2] text-[#dc2626] border-[#fecaca]' },
  warm: { label: 'Тёплый', className: 'bg-[#fffbeb] text-[#d97706] border-[#fde68a]' },
  new: { label: 'Новый', className: 'bg-[#f0f9ff] text-[#2563eb] border-[#bfdbfe]' },
}

const iconMap: Record<string, React.ElementType> = {
  'Отправлено': Send,
  'Открыто': MailOpen,
  'Ответы': MessageSquare,
  'Лиды': Target,
}

// ── Subcomponents ───────────────────────────────────────────

function SparkBars({ bars }: { bars: number[] }) {
  const max = Math.max(...bars)
  return (
    <div className="flex items-end gap-[3px] h-6 mt-3">
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

// ── Main Component ──────────────────────────────────────────

export default function DashboardView() {
  return (
    <div className="flex flex-col gap-6 p-6 text-[13.5px] text-[#171717] overflow-y-auto h-full custom-scroll">
      {/* ── Page Header ──────────────────────────────────── */}
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
          Обзор
        </h1>
        <p className="text-[#737373] mt-1">
          Ключевые метрики вашей outreach-активности
        </p>
      </div>

      {/* ── Metric Cards ─────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = iconMap[m.label]
          return (
            <div
              key={m.label}
              className="border border-[#e8e8e8] rounded-[10px] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-[#fafafa]">
                    <Icon className="w-4 h-4 text-[#525252]" />
                  </div>
                  <span className="text-[#737373] font-medium">{m.label}</span>
                </div>
                {m.trend && (
                  <div
                    className={`flex items-center gap-0.5 text-[12px] font-medium px-1.5 py-0.5 rounded-[6px] ${
                      m.trend === 'up'
                        ? 'bg-[#f0fdf4] text-[#16a34a]'
                        : 'bg-[#fef2f2] text-[#dc2626]'
                    }`}
                  >
                    {m.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {m.trendValue}
                  </div>
                )}
              </div>
              <div className="text-[26px] font-semibold text-[#0d0d0d] mt-3 tracking-tight">
                {m.value}
              </div>
              <SparkBars bars={m.bars} />
            </div>
          )
        })}
      </div>

      {/* ── Attention Bar ────────────────────────────────── */}
      <div className="flex items-center gap-4 bg-[#fffbeb] border border-[#fde68a] rounded-[10px] p-4">
        <div className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#fef3c7] shrink-0">
          <AlertTriangle className="w-[18px] h-[18px] text-[#d97706]" />
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <span className="text-[13px] font-semibold text-[#92400e]">
            Требуется внимание
          </span>
          <div className="flex items-center gap-4 flex-wrap">
            {attentionItems.map((item) => (
              <div key={item.id} className="flex items-center gap-1.5 text-[12.5px] text-[#a16207]">
                <span>{item.text}</span>
                <button className="inline-flex items-center gap-0.5 font-medium text-[#b45309] hover:underline underline-offset-2">
                  {item.action}
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Two-Column Grid ──────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4">
        {/* Activity Feed */}
        <div className="border border-[#e8e8e8] rounded-[10px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8e8e8]">
            <h2 className="text-[14px] font-semibold text-[#0d0d0d]">
              Последняя активность
            </h2>
            <button className="text-[12px] text-[#737373] hover:text-[#171717] transition-colors font-medium">
              Все записи
            </button>
          </div>
          <div className="divide-y divide-[#f5f5f5]">
            {activityItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 px-5 py-3.5 hover:bg-[#fafafa] transition-colors"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-[6px] shrink-0 ${dotColor[item.type]}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-[#404040] leading-[1.4]">
                    {item.text}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-[11.5px] text-[#a3a3a3]">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hot Leads */}
        <div className="border border-[#e8e8e8] rounded-[10px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8e8e8]">
            <div className="flex items-center gap-2">
              <h2 className="text-[14px] font-semibold text-[#0d0d0d]">
                Горячие лиды
              </h2>
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 rounded-full bg-[#0d0d0d] text-white text-[11px] font-semibold px-1.5">
                5
              </span>
            </div>
            <button className="text-[12px] text-[#737373] hover:text-[#171717] transition-colors font-medium">
              Все лиды
            </button>
          </div>
          <div className="divide-y divide-[#f5f5f5]">
            {hotLeads.map((lead) => {
              const st = statusConfig[lead.status]
              return (
                <div
                  key={lead.id}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#fafafa] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f5f5f5] text-[#525252] text-[12px] font-semibold shrink-0 border border-[#e8e8e8]">
                    {lead.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-medium text-[#171717] truncate">
                        {lead.name}
                      </span>
                      <span className="text-[12px] text-[#a3a3a3] truncate">
                        {lead.company}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-medium px-2 py-[3px] rounded-[6px] border shrink-0 ${st.className}`}
                  >
                    {st.label}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#a3a3a3] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
