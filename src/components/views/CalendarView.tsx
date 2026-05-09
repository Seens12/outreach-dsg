'use client'

import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Mail,
  Phone,
  Users,
  CalendarDays,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/shared/EmptyState'

type EventType = 'scheduled' | 'pending' | 'meeting'

interface CalendarEvent {
  type: EventType
}

interface UpcomingTask {
  id: string
  contactName: string
  type: 'follow-up' | 'meeting' | 'call'
  scheduledTime: string
  status: 'scheduled' | 'confirmed' | 'pending'
}

const eventDotColors: Record<EventType, string> = {
  scheduled: 'bg-green-500',
  pending: 'bg-amber-500',
  meeting: 'bg-[#2563eb]',
}

const eventLabels: Record<EventType, string> = {
  scheduled: 'Follow-up',
  pending: 'Ожидание',
  meeting: 'Встреча',
}

const typeLabels: Record<UpcomingTask['type'], string> = {
  'follow-up': 'Follow-up',
  meeting: 'Встреча',
  call: 'Звонок',
}

const typeIcons: Record<UpcomingTask['type'], typeof Mail> = {
  'follow-up': Mail,
  meeting: Users,
  call: Phone,
}

const statusColors: Record<UpcomingTask['status'], string> = {
  scheduled: 'bg-green-50 text-green-700',
  confirmed: 'bg-blue-50 text-blue-700',
  pending: 'bg-amber-50 text-amber-700',
}

const statusLabels: Record<UpcomingTask['status'], string> = {
  scheduled: 'Запланировано',
  confirmed: 'Подтверждено',
  pending: 'Ожидание',
}

const upcomingTasks: UpcomingTask[] = [
  {
    id: '1',
    contactName: 'Алексей Петров',
    type: 'follow-up',
    scheduledTime: 'Сегодня, 14:00',
    status: 'scheduled',
  },
  {
    id: '2',
    contactName: 'Мария Иванова',
    type: 'meeting',
    scheduledTime: 'Сегодня, 16:30',
    status: 'confirmed',
  },
  {
    id: '3',
    contactName: 'Дмитрий Смирнов',
    type: 'call',
    scheduledTime: 'Завтра, 10:00',
    status: 'pending',
  },
  {
    id: '4',
    contactName: 'Елена Козлова',
    type: 'follow-up',
    scheduledTime: 'Завтра, 12:00',
    status: 'scheduled',
  },
  {
    id: '5',
    contactName: 'Олег Новиков',
    type: 'meeting',
    scheduledTime: '20 янв, 15:00',
    status: 'pending',
  },
]

const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

// January 2025 starts on Wednesday (index 2 in Mon-based week)
// 31 days total
function generateCalendarEvents(): Record<number, CalendarEvent[]> {
  return {
    3: [{ type: 'scheduled' }],
    6: [{ type: 'meeting' }],
    8: [{ type: 'scheduled' }],
    10: [{ type: 'pending' }],
    13: [{ type: 'scheduled' }, { type: 'meeting' }],
    15: [{ type: 'scheduled' }],
    17: [{ type: 'pending' }],
    20: [{ type: 'meeting' }],
    22: [{ type: 'scheduled' }, { type: 'pending' }],
    24: [{ type: 'meeting' }],
    27: [{ type: 'scheduled' }],
    29: [{ type: 'pending' }, { type: 'meeting' }],
    31: [{ type: 'scheduled' }],
  }
}

export default function CalendarView() {
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())

  const calendarEvents = generateCalendarEvents()

  // Get days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  // First day of month (0=Sun, 1=Mon, ...), convert to Mon-based
  let firstDay = new Date(year, month, 1).getDay()
  firstDay = firstDay === 0 ? 6 : firstDay - 1 // convert to Mon=0

  // Generate calendar cells
  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  // Fill remaining to complete 5 weeks (35 cells)
  while (cells.length < 35) cells.push(null)

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">Календарь</h1>
        <p className="text-[13px] text-[#737373]">
          Планирование follow-up и встреч
        </p>
      </div>

      {/* Calendar */}
      <div className="mb-8 rounded-[10px] border border-[#e8e8e8] bg-white p-5">
        {/* Month/Year navigation */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-[#0d0d0d]">
            {monthNames[month]} {year}
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#525252] transition-colors hover:bg-[#fafafa]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#525252] transition-colors hover:bg-[#fafafa]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Day headers */}
        <div className="mb-2 grid grid-cols-7">
          {dayNames.map((name) => (
            <div
              key={name}
              className="py-2 text-center text-[12px] font-medium text-[#a3a3a3]"
            >
              {name}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-px rounded-lg bg-[#f5f5f5]">
          {cells.map((day, idx) => {
            const events = day ? calendarEvents[day] || [] : []
            const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear()

            return (
              <div
                key={idx}
                className={`flex min-h-[64px] flex-col items-center gap-1 bg-white p-1.5 sm:min-h-[72px] sm:p-2 ${
                  day ? 'cursor-default' : ''
                }`}
              >
                {day && (
                  <>
                    <span
                      className={`text-[13px] font-medium ${
                        isToday
                          ? 'flex h-6 w-6 items-center justify-center rounded-full bg-[#2563eb] text-white'
                          : 'text-[#0d0d0d]'
                      }`}
                    >
                      {day}
                    </span>
                    {events.length > 0 && (
                      <div className="flex items-center gap-0.5">
                        {events.map((evt, ei) => (
                          <span
                            key={ei}
                            className={`h-1.5 w-1.5 rounded-full ${eventDotColors[evt.type]}`}
                            title={eventLabels[evt.type]}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-[12px] text-[#a3a3a3]">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Follow-up
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#a3a3a3]">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Ожидание
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#a3a3a3]">
            <span className="h-2 w-2 rounded-full bg-[#2563eb]" />
            Встреча
          </div>
        </div>
      </div>

      {/* Upcoming tasks */}
      <div className="rounded-[10px] border border-[#e8e8e8] bg-white p-5">
        <h3 className="mb-4 text-[15px] font-semibold text-[#0d0d0d]">
          Ближайшие задачи
        </h3>
        <div className="flex flex-col divide-y divide-[#f5f5f5]">
          {upcomingTasks.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title="Нет событий"
              description="Нет запланированных задач на эту дату"
            />
          ) : (
          <>
          {upcomingTasks.map((task) => {
            const Icon = typeIcons[task.type]
            return (
              <div
                key={task.id}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#fafafa]">
                    <Icon className="h-4 w-4 text-[#525252]" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-medium text-[#0d0d0d]">
                      {task.contactName}
                    </span>
                    <span className="text-[12px] text-[#a3a3a3]">
                      {typeLabels[task.type]}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#525252]">
                    <Clock className="h-3 w-3 text-[#a3a3a3]" />
                    {task.scheduledTime}
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${statusColors[task.status]}`}
                  >
                    {statusLabels[task.status]}
                  </span>
                </div>
              </div>
            )
          })}
          </>
          )}
        </div>
      </div>
    </div>
  )
}
