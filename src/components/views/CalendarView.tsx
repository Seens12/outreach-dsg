'use client'

import { useState } from 'react'
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock,
  Users,
  Mail,
  Zap,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type EventKind = 'campaign' | 'follow-up' | 'demo' | 'ai-action'

interface CalEvent {
  kind: EventKind
  title: string
  time: string
}

interface UpcomingEvent {
  id: string
  title: string
  kind: EventKind
  date: string
  time: string
}

type ViewTab = 'month' | 'week' | 'day'

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const eventDotColors: Record<EventKind, string> = {
  campaign: 'bg-[#3b82f6]',
  'follow-up': 'bg-[#15803d]',
  demo: 'bg-[#a16207]',
  'ai-action': 'bg-[#7c3aed]',
}

const eventLabels: Record<EventKind, string> = {
  campaign: 'Запуск кампании',
  'follow-up': 'Follow-up',
  demo: 'Демо',
  'ai-action': 'AI действие',
}

const eventIcons: Record<EventKind, typeof Zap> = {
  campaign: Mail,
  'follow-up': ArrowRight,
  demo: Users,
  'ai-action': Zap,
}

const monthNames = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
]

const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const viewTabs: { key: ViewTab; label: string }[] = [
  { key: 'month', label: 'Месяц' },
  { key: 'week', label: 'Неделя' },
  { key: 'day', label: 'День' },
]

// ---------------------------------------------------------------------------
// Demo data
// ---------------------------------------------------------------------------

function generateEvents(): Record<number, CalEvent[]> {
  return {
    3: [{ kind: 'campaign', title: 'Запуск IT Q4', time: '09:00' }],
    5: [{ kind: 'ai-action', title: 'AI follow-up', time: '10:00' }],
    8: [{ kind: 'follow-up', title: 'Follow-up А.Петров', time: '14:00' }],
    10: [{ kind: 'demo', title: 'Демо DataFlow', time: '16:00' }],
    12: [{ kind: 'ai-action', title: 'AI реактивация', time: '11:00' }],
    14: [
      { kind: 'follow-up', title: 'Follow-up М.Иванова', time: '10:00' },
      { kind: 'demo', title: 'Демо ScaleUp', time: '15:00' },
    ],
    16: [{ kind: 'campaign', title: 'Запуск Ритейл', time: '09:00' }],
    18: [{ kind: 'ai-action', title: 'AI ответ', time: '12:00' }],
    20: [{ kind: 'follow-up', title: 'Follow-up Д.Смирнов', time: '11:00' }],
    22: [
      { kind: 'demo', title: 'Демо CloudBase', time: '14:00' },
      { kind: 'ai-action', title: 'AI персонализация', time: '16:00' },
    ],
    25: [{ kind: 'follow-up', title: 'Follow-up Е.Козлова', time: '13:00' }],
    27: [{ kind: 'campaign', title: 'Запуск Медицина', time: '10:00' }],
    29: [{ kind: 'ai-action', title: 'AI отчёт', time: '09:00' }],
  }
}

const upcomingEvents: UpcomingEvent[] = [
  { id: '1', title: 'Follow-up с Алексеем Петровым', kind: 'follow-up', date: 'Сегодня', time: '14:00' },
  { id: '2', title: 'Демо для DataFlow Inc.', kind: 'demo', date: 'Сегодня', time: '16:00' },
  { id: '3', title: 'AI-автоответ на 12 писем', kind: 'ai-action', date: 'Завтра', time: '10:00' },
  { id: '4', title: 'Запуск кампании "Ритейл Q1"', kind: 'campaign', date: '20 янв', time: '09:00' },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CalendarView() {
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())
  const [activeTab, setActiveTab] = useState<ViewTab>('month')

  const calendarEvents = generateEvents()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  let firstDay = new Date(year, month, 1).getDay()
  firstDay = firstDay === 0 ? 6 : firstDay - 1

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length < 35) cells.push(null)

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1) }
    else setMonth(month - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1) }
    else setMonth(month + 1)
  }

  return (
    <div className="p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
            Календарь и расписание
          </h1>
          <p className="text-[13px] text-[#737373] mt-1">
            Планирование рассылок, follow-up и встреч
          </p>
        </div>
        <Button
          onClick={() => toast.success('Событие создано')}
          className="gap-2 bg-[#0d0d0d] text-white hover:bg-[#262626]"
        >
          <Plus className="h-4 w-4" />
          Новое событие
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Событий на неделе', value: '14', icon: CalendarDays },
          { label: 'Встреч', value: '3', icon: Users },
          { label: 'AI действий', value: '4', icon: Zap },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.label}
              className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#fafafa]">
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

      {/* View tabs */}
      <div className="flex items-center gap-1 mb-5">
        {viewTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              if (tab.key !== 'month') {
                toast.info('Вид "' + tab.label + '" скоро будет доступен')
              }
              setActiveTab(tab.key)
            }}
            className={`px-4 py-2 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer ${
              activeTab === tab.key
                ? 'bg-[#0d0d0d] text-white'
                : 'bg-[#f5f5f5] text-[#525252] hover:bg-[#e8e8e8]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'month' ? (
        <>
          {/* Calendar grid */}
          <div className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card p-5 mb-6">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] font-semibold text-[#0d0d0d]">
                {monthNames[month]} {year}
              </h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={prevMonth}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#525252] hover:bg-[#fafafa] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextMonth}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#525252] hover:bg-[#fafafa] transition-colors cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {dayNames.map((d) => (
                <div key={d} className="py-2 text-center text-[12px] font-medium text-[#a3a3a3]">
                  {d}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 gap-px rounded-lg bg-[#f5f5f5]">
              {cells.map((day, idx) => {
                const events = day ? calendarEvents[day] || [] : []
                const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear()

                return (
                  <div
                    key={idx}
                    className={`flex min-h-[72px] flex-col items-center gap-1 bg-white p-1.5 sm:p-2 ${
                      day ? 'cursor-default' : ''
                    }`}
                  >
                    {day && (
                      <>
                        <span
                          className={`text-[13px] font-medium ${
                            isToday
                              ? 'flex h-6 w-6 items-center justify-center rounded-full bg-[#0d0d0d] text-white'
                              : 'text-[#0d0d0d]'
                          }`}
                        >
                          {day}
                        </span>
                        {events.length > 0 && (
                          <div className="flex flex-col items-center gap-0.5 mt-0.5">
                            {events.slice(0, 3).map((evt, ei) => (
                              <span
                                key={ei}
                                className={`h-[5px] w-[5px] rounded-full ${eventDotColors[evt.kind]}`}
                                title={evt.title}
                              />
                            ))}
                            {events.length > 3 && (
                              <span className="text-[10px] text-[#a3a3a3]">+{events.length - 3}</span>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center gap-5 flex-wrap">
              {(Object.entries(eventLabels) as [EventKind, string][]).map(([kind, label]) => (
                <div key={kind} className="flex items-center gap-1.5 text-[12px] text-[#a3a3a3]">
                  <span className={`h-2 w-2 rounded-full ${eventDotColors[kind]}`} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming events */}
          <div className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card p-5">
            <h3 className="text-[14px] font-semibold text-[#0d0d0d] mb-4">
              Ближайшие события
            </h3>
            <div className="flex flex-col divide-y divide-[#f5f5f5]">
              {upcomingEvents.map((evt) => {
                const Icon = eventIcons[evt.kind]
                return (
                  <div
                    key={evt.id}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#fafafa] shrink-0">
                        <Icon className="w-4 h-4 text-[#525252]" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-[13px] font-medium text-[#171717]">
                          {evt.title}
                        </span>
                        <div className="text-[12px] text-[#a3a3a3] leading-tight">
                          {eventLabels[evt.kind]}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] text-[#737373] shrink-0">
                      <Clock className="h-3 w-3 text-[#a3a3a3]" />
                      {evt.date}, {evt.time}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card p-12 flex flex-col items-center justify-center text-center">
          <CalendarDays className="w-10 h-10 text-[#a3a3a3] mb-3" />
          <div className="text-[14px] font-medium text-[#525252] mb-1">
            Вид "{viewTabs.find((t) => t.key === activeTab)?.label}" скоро будет доступен
          </div>
          <div className="text-[13px] text-[#a3a3a3]">
            Сейчас доступен только вид "Месяц"
          </div>
        </div>
      )}
    </div>
  )
}
