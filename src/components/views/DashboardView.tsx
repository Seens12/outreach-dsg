'use client'

import { useState } from 'react'
import {
  Megaphone,
  UserPlus,
  FileText,
  Globe,
  Settings,
  TrendingUp,
  Send,
  Mail,
  Target,
  MessageSquare,
  Bot,
  Clock,
  ChevronRight,
  AlertTriangle,
  Users,
  Flame,
  CalendarCheck,
  Sparkles,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { toast } from 'sonner'
import { FilterRow } from '@/components/shared/FilterRow'

/* ── Data ──────────────────────────────────────────────── */

const quickActions = [
  { label: 'Новая кампания', icon: Megaphone, view: 'campaigns' as const },
  { label: 'Добавить контакт', icon: UserPlus, view: 'prospects' as const },
  { label: 'Создать шаблон', icon: FileText, view: 'templates' as const },
  { label: 'Проверить DNS', icon: Globe, view: 'domains' as const },
  { label: 'Настроить CRM', icon: Settings, view: 'crm' as const },
]

const metrics = [
  { label: 'Активные кампании', value: '3', trend: '+12%', icon: Megaphone, iconBg: 'bg-[#dbeafe]', iconColor: 'text-[#3b82f6]' },
  { label: 'Всего контактов', value: '1 247', trend: '+17%', icon: Users, iconBg: 'bg-[#ede9fe]', iconColor: 'text-[#7c3aed]' },
  { label: 'Горячих лидов', value: '8', trend: '+60%', icon: Flame, iconBg: 'bg-[#fce7f3]', iconColor: 'text-[#e11d48]' },
  { label: 'AI-диалогов сегодня', value: '45', trend: '+8%', icon: Bot, iconBg: 'bg-[#cffafe]', iconColor: 'text-[#0891b2]' },
]

const aiWeekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const aiValues = [8, 12, 15, 18, 24, 6, 4]

const leadStatuses = [
  { label: 'Горячие', count: 8, color: '#fda4af' },
  { label: 'Тёплые', count: 23, color: '#fcd34d' },
  { label: 'Холодные', count: 87, color: '#93c5fd' },
  { label: 'Не определено', count: 74, color: '#d4d4d4' },
]

const activityFilters = ['Все', 'Отправлено', 'Получено', 'Лиды', 'AI', 'Встречи'] as const

const activityItems = [
  { id: 1, type: 'sent' as const, initials: 'КМ', name: 'Кирилл Морозов', company: 'DataPro', text: 'Отправлено письмо из кампании "Q4 Outreach"', time: '2 мин назад' },
  { id: 2, type: 'received' as const, initials: 'АП', name: 'Алексей Петров', company: 'TechCorp', text: 'Ответил на письмо с вопросом о тарифах', time: '8 мин назад' },
  { id: 3, type: 'lead' as const, initials: 'ЕМ', name: 'Елена Морозова', company: 'ДиджиталГрупп', text: 'Новый горячий лид — интерес к DEMO', time: '15 мин назад' },
  { id: 4, type: 'ai' as const, initials: '', name: '', company: '', text: 'AI ответил на 12 писем в кампании "IT Directors"', time: '23 мин назад' },
  { id: 5, type: 'meeting' as const, initials: 'ДК', name: 'Дмитрий Козлов', company: 'CloudBase', text: 'Назначена встреча на 14:00 завтра', time: '45 мин назад' },
  { id: 6, type: 'sent' as const, initials: 'СВ', name: 'Светлана Волкова', company: 'ScaleUp', text: 'Follow-up #2 отправлен из последовательности', time: '1 ч назад' },
  { id: 7, type: 'lead' as const, initials: 'ИП', name: 'Иван Петров', company: 'ТехноКорп', text: 'Лид переведён в "Горячий" после положительного ответа', time: '1.5 ч назад' },
  { id: 8, type: 'ai' as const, initials: '', name: '', company: '', text: 'AI создал 3 новых шаблона на основе успешных писем', time: '2 ч назад' },
  { id: 9, type: 'received' as const, initials: 'ОН', name: 'Ольга Новикова', company: 'ФинТех Про', text: 'Запросила коммерческое предложение', time: '2.5 ч назад' },
  { id: 10, type: 'meeting' as const, initials: 'МС', name: 'Мария Сидорова', company: 'ИнноСофт', text: 'Встреча завершена — договорённость о пилоте', time: '3 ч назад' },
]

const attentionItems = [
  { label: 'Неотвеченных писем', value: 5, color: '#525252' },
  { label: 'Кампании с низкой оценкой', value: 1, color: '#737373' },
  { label: 'Ящики с ошибками DNS', value: 2, color: '#525252' },
]

/* ── Helpers ───────────────────────────────────────────── */

const dotColor: Record<string, string> = {
  sent: 'bg-[#3b82f6]',
  received: 'bg-[#22c55e]',
  lead: 'bg-[#e11d48]',
  ai: 'bg-[#7c3aed]',
  meeting: 'bg-[#d97706]',
}

/* ── Component ─────────────────────────────────────────── */

export default function DashboardView() {
  const { setView } = useAppStore()
  const [aiPeriod, setAiPeriod] = useState('7')
  const [activityFilter, setActivityFilter] = useState<string>('Все')

  const filtered = activityFilter === 'Все'
    ? activityItems
    : activityItems.filter((i) => i.type === activityFilter)

  const maxAi = Math.max(...aiValues)

  return (
    <div className="flex flex-col gap-5 p-6 text-[13.5px] text-[#171717] overflow-y-auto h-full custom-scroll">
      {/* Greeting */}
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
          Доброе утро, Пользователь
        </h1>
        <p className="text-[13px] text-[#737373] mt-1">
          Professional &middot; Моя компания
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 flex-wrap">
        {quickActions.map((a) => (
          <button
            key={a.label}
            onClick={() => { setView(a.view); toast.success(`${a.label} — открыт`) }}
            className="flex items-center gap-2 h-9 px-4 rounded-[8px] border border-[#e8e8e8] bg-white text-[13px] font-medium text-[#525252] hover:bg-[#f5f5f5] hover:text-[#0d0d0d] transition-colors cursor-pointer"
          >
            <a.icon className="w-4 h-4" />
            {a.label}
          </button>
        ))}
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => {
          const Icon = m.icon
          return (
            <div key={m.label} className="anim-fade-in rounded-[10px] border border-[#e8e8e8] bg-white p-4 shadow-card" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-center justify-between">
                <span className="text-[#737373] font-medium text-[12.5px]">{m.label}</span>
                <div className={`flex items-center justify-center w-10 h-10 rounded-[8px] ${m.iconBg}`}>
                  <Icon className={`w-4 h-4 ${m.iconColor}`} />
                </div>
              </div>
              <div className="text-[24px] font-semibold text-[#0d0d0d] mt-2 tracking-tight">
                {m.value}
              </div>
              <div className="flex items-center gap-1 mt-1 text-[12px] font-medium text-[#22c55e]">
                <TrendingUp className="w-3 h-3" />
                {m.trend}
              </div>
            </div>
          )
        })}
      </div>

      {/* AI Answers Widget + Lead Status Widget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* AI Answers */}
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#525252]" />
              <h2 className="text-[14px] font-semibold text-[#0d0d0d]">92% автоответов</h2>
            </div>
            <div className="flex gap-1">
              {['7', '30', '90'].map((p) => (
                <button
                  key={p}
                  onClick={() => setAiPeriod(p)}
                  className={`h-7 px-2.5 rounded-[6px] text-[12px] font-medium transition-colors cursor-pointer ${
                    aiPeriod === p
                      ? 'bg-[#0d0d0d] text-white'
                      : 'bg-[#f5f5f5] text-[#525252] hover:bg-[#e8e8e8]'
                  }`}
                >
                  {p} дн
                </button>
              ))}
            </div>
          </div>

          {/* Bar chart */}
          <div className="flex items-end gap-2 h-[120px] mb-4">
            {aiWeekDays.map((day, i) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end justify-center" style={{ height: '100px' }}>
                  <div
                    className="w-full max-w-[32px] rounded-[4px] bg-[#0d0d0d] transition-all"
                    style={{ height: `${(aiValues[i] / maxAi) * 100}%`, opacity: 0.15 + (aiValues[i] / maxAi) * 0.85 }}
                  />
                </div>
                <span className="text-[11px] text-[#a3a3a3] font-medium">{day}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-4 text-[12px]">
            <div>
              <span className="text-[#a3a3a3]">Всего: </span>
              <span className="font-semibold text-[#0d0d0d]">87</span>
            </div>
            <div>
              <span className="text-[#a3a3a3]">Среднее: </span>
              <span className="font-semibold text-[#0d0d0d]">12</span>
            </div>
            <div>
              <span className="text-[#a3a3a3]">Макс: </span>
              <span className="font-semibold text-[#0d0d0d]">24</span>
            </div>
          </div>
        </div>

        {/* Lead Status Donut */}
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-[#525252]" />
            <h2 className="text-[14px] font-semibold text-[#0d0d0d]">Статусы лидов</h2>
          </div>
          <div className="flex items-center gap-6">
            {/* SVG Donut */}
            <div className="relative w-[130px] h-[130px] shrink-0">
              <svg viewBox="0 0 42 42" className="w-full h-full -rotate-90">
                {(() => {
                  const total = leadStatuses.reduce((s, l) => s + l.count, 0)
                  const circumference = 2 * Math.PI * 15.91549430918954
                  const segments = leadStatuses.reduce<Array<{ label: string; color: string; dash: number; gap: number; offset: number }>>((arr, s) => {
                    const pct = s.count / total
                    const dash = pct * circumference
                    const gap = circumference - dash
                    const prev = arr.length > 0 ? arr[arr.length - 1] : null
                    const offset = prev ? prev.offset + prev.dash : 0
                    return [...arr, { label: s.label, color: s.color, dash, gap, offset }]
                  }, [])
                  return segments.map((seg) => (
                    <circle
                      key={seg.label}
                      cx="21" cy="21" r="15.91549430918954"
                      fill="transparent"
                      stroke={seg.color}
                      strokeWidth="3.8"
                      strokeDasharray={`${seg.dash} ${seg.gap}`}
                      strokeDashoffset={-seg.offset}
                    />
                  ))
                })()}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[14px] font-semibold text-[#0d0d0d]">192</div>
                  <div className="text-[10px] text-[#a3a3a3]">лидов</div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-2.5">
              {leadStatuses.map((s) => (
                <div key={s.label} className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="text-[12.5px] text-[#525252]">{s.label}</span>
                  <span className="text-[12.5px] font-semibold text-[#0d0d0d]">{s.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Activity Feed */}
      <div className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8e8e8]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#525252]" />
            <h2 className="text-[14px] font-semibold text-[#0d0d0d]">Живая лента активности</h2>
          </div>
          <button
            onClick={() => setView('activity')}
            className="text-[12px] text-[#737373] hover:text-[#171717] transition-colors font-medium cursor-pointer"
          >
            Все записи
          </button>
        </div>

        {/* Filter pills */}
        <div className="px-5 py-3 border-b border-[#f5f5f5]">
          <FilterRow>
            {activityFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActivityFilter(f)}
                className={`shrink-0 h-7 px-3 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                  activityFilter === f
                    ? 'bg-[#0d0d0d] text-white'
                    : 'bg-[#f5f5f5] text-[#525252] hover:bg-[#e8e8e8]'
                }`}
              >
                {f}
              </button>
            ))}
          </FilterRow>
        </div>

        {/* Items */}
        <div className="divide-y divide-[#f5f5f5] max-h-[360px] overflow-y-auto custom-scroll">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 px-5 py-3 hover:bg-[#fafafa] transition-colors"
            >
              {item.initials ? (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f5f5f5] text-[#525252] text-[12px] font-semibold shrink-0 border border-[#e8e8e8]">
                  {item.initials}
                </div>
              ) : (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f5f5f5] shrink-0 border border-[#e8e8e8]">
                  <Bot className="w-3.5 h-3.5 text-[#a3a3a3]" />
                </div>
              )}
              <div className={`w-2 h-2 rounded-full mt-[6px] shrink-0 ${dotColor[item.type]}`} />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-[#404040] leading-[1.4]">
                  {item.name ? (
                    <>
                      <span className="font-medium text-[#171717]">{item.name}</span>
                      <span className="text-[#a3a3a3]"> &middot; {item.company}</span>
                      {' — '}
                    </>
                  ) : null}
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

      {/* Attention Bar */}
      <div className="flex items-center gap-4 bg-[#fafafa] border border-[#e8e8e8] rounded-[10px] p-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#f5f5f5] shrink-0">
          <AlertTriangle className="w-[18px] h-[18px] text-[#737373]" />
        </div>
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <span className="text-[13px] font-semibold text-[#0d0d0d]">Требует внимания</span>
          <div className="flex items-center gap-5 flex-wrap">
            {attentionItems.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 text-[12.5px]">
                <span className="font-semibold text-[#0d0d0d]">{item.value}</span>
                <span className="text-[#525252]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => setView('inbox')}
          className="flex items-center gap-1 text-[12px] font-medium text-[#525252] hover:text-[#0d0d0d] transition-colors cursor-pointer shrink-0"
        >
          Открыть
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}
