'use client'

import { useState } from 'react'
import {
  Plus,
  Download,
  Eye,
  Trash2,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

// ── Types ──────────────────────────────────────────────────────────────────

type ReportStatus = 'ready' | 'in_progress' | 'error'
type ReportType = 'weekly' | 'monthly' | 'once'

interface Report {
  id: string
  name: string
  description: string
  type: ReportType
  dateRange: string
  status: ReportStatus
  miniData: { name: string; value: number }[]
}

// ── Demo Data ──────────────────────────────────────────────────────────────

const reports: Report[] = [
  {
    id: 'r1',
    name: 'Еженедельный отчёт по кампаниям',
    description: 'Сводка по всем активным кампаниям за неделю',
    type: 'weekly',
    dateRange: '1 — 7 июля 2025',
    status: 'ready',
    miniData: [
      { name: 'W1', value: 65 },
      { name: 'W2', value: 78 },
      { name: 'W3', value: 82 },
      { name: 'W4', value: 90 },
    ],
  },
  {
    id: 'r2',
    name: 'Ежемесячная аналитика конверсий',
    description: 'Детальный отчёт по воронке конверсии за месяц',
    type: 'monthly',
    dateRange: '1 — 30 июня 2025',
    status: 'ready',
    miniData: [
      { name: 'W1', value: 45 },
      { name: 'W2', value: 62 },
      { name: 'W3', value: 55 },
      { name: 'W4', value: 70 },
    ],
  },
  {
    id: 'r3',
    name: 'Анализ эффективности каналов',
    description: 'Сравнительный отчёт по каналам привлечения',
    type: 'once',
    dateRange: 'Январь — Июнь 2025',
    status: 'in_progress',
    miniData: [
      { name: 'E', value: 85 },
      { name: 'L', value: 55 },
      { name: 'P', value: 40 },
      { name: 'R', value: 25 },
    ],
  },
  {
    id: 'r4',
    name: 'Отчёт по командной производительности',
    description: 'Метрики эффективности команды продаж',
    type: 'monthly',
    dateRange: '1 — 30 июня 2025',
    status: 'ready',
    miniData: [
      { name: 'A', value: 72 },
      { name: 'B', value: 88 },
      { name: 'C', value: 64 },
      { name: 'D', value: 79 },
    ],
  },
  {
    id: 'r5',
    name: 'А/B тест тем писем',
    description: 'Результаты тестирования вариантов email-тем',
    type: 'once',
    dateRange: '15 — 28 июня 2025',
    status: 'error',
    miniData: [
      { name: 'A', value: 30 },
      { name: 'B', value: 45 },
      { name: 'C', value: 38 },
    ],
  },
]

// ── Config Maps ────────────────────────────────────────────────────────────

const typeLabels: Record<ReportType, string> = {
  weekly: 'Еженедельный',
  monthly: 'Ежемесячный',
  once: 'Разовый',
}

const typeBadgeClasses: Record<ReportType, string> = {
  weekly: 'bg-[#eff6ff] text-[#2563eb] border-[#bfdbfe]',
  monthly: 'bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0]',
  once: 'bg-[#fafafa] text-[#525252] border-[#e8e8e8]',
}

const statusConfig: Record<
  ReportStatus,
  { label: string; color: string; bgColor: string; borderColor: string; Icon: React.ElementType }
> = {
  ready: {
    label: 'Готов',
    color: 'text-[#16a34a]',
    bgColor: 'bg-[#f0fdf4]',
    borderColor: 'border-[#bbf7d0]',
    Icon: CheckCircle2,
  },
  in_progress: {
    label: 'В процессе',
    color: 'text-[#d97706]',
    bgColor: 'bg-[#fffbeb]',
    borderColor: 'border-[#fde68a]',
    Icon: Loader2,
  },
  error: {
    label: 'Ошибка',
    color: 'text-[#dc2626]',
    bgColor: 'bg-[#fef2f2]',
    borderColor: 'border-[#fecaca]',
    Icon: AlertCircle,
  },
}

// ── Tooltip Style ──────────────────────────────────────────────────────────

const tooltipStyle = {
  contentStyle: {
    backgroundColor: '#fff',
    border: '1px solid #e8e8e8',
    borderRadius: '8px',
    fontSize: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    padding: '6px 10px',
  },
}

// ── Mini Chart ─────────────────────────────────────────────────────────────

function MiniBarChart({ data, barColor }: { data: { name: string; value: number }[]; barColor: string }) {
  return (
    <ResponsiveContainer width={100} height={36}>
      <BarChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <XAxis dataKey="name" hide />
        <YAxis hide />
        <Tooltip {...tooltipStyle} cursor={false} />
        <Bar dataKey="value" radius={[3, 3, 0, 0]} fill={barColor} />
      </BarChart>
    </ResponsiveContainer>
  )
}

// ── Component ──────────────────────────────────────────────────────────────

export default function ReportsView() {
  const [reportList, setReportList] = useState<Report[]>(reports)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const reportToDelete = reportList.find((r) => r.id === confirmId)

  const handleDelete = (id: string) => {
    setReportList((prev) => prev.filter((r) => r.id !== id))
  }

  const getBarColor = (status: ReportStatus): string => {
    switch (status) {
      case 'ready':
        return '#0d0d0d'
      case 'in_progress':
        return '#d97706'
      case 'error':
        return '#dc2626'
    }
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scroll">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
              Отчёты
            </h1>
            <p className="text-sm text-[#737373] mt-1">
              Генерация и просмотр отчётов
            </p>
          </div>
          <button onClick={() => toast.success('Отчёт создан')} className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0d0d0d] text-white text-sm font-medium rounded-[10px] hover:bg-[#262626] transition-colors shadow-sm cursor-pointer">
            <Plus className="w-4 h-4" />
            Создать отчёт
          </button>
        </div>

        {/* Report List */}
        <div className="space-y-3">
          {reportList.map((report) => {
            const typeLabel = typeLabels[report.type]
            const typeClasses = typeBadgeClasses[report.type]
            const statusCfg = statusConfig[report.status]
            const StatusIcon = statusCfg.Icon

            return (
              <div
                key={report.id}
                className="bg-white border border-[#e8e8e8] rounded-[10px] p-4 flex items-center gap-4 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow group"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-[8px] bg-[#fafafa] flex items-center justify-center flex-shrink-0">
                  <FileText className="w-[18px] h-[18px] text-[#525252]" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-[14px] font-semibold text-[#0d0d0d] truncate">
                      {report.name}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-md border ${typeClasses}`}
                    >
                      {typeLabel}
                    </span>
                  </div>
                  <p className="text-[12.5px] text-[#737373] mt-0.5 truncate">
                    {report.description}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="inline-flex items-center gap-1 text-[11.5px] text-[#a8a8a8]">
                      <Clock className="w-3 h-3" />
                      {report.dateRange}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-md border ${statusCfg.bgColor} ${statusCfg.color} ${statusCfg.borderColor}`}
                    >
                      <StatusIcon
                        className={`w-3 h-3 ${
                          report.status === 'in_progress'
                            ? 'animate-spin'
                            : ''
                        }`}
                      />
                      {statusCfg.label}
                    </span>
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="hidden sm:block flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                  <MiniBarChart
                    data={report.miniData}
                    barColor={getBarColor(report.status)}
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    aria-label="Скачать"
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[#737373] hover:text-[#0d0d0d] hover:bg-[#fafafa] transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    aria-label="Просмотр"
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[#737373] hover:text-[#2563eb] hover:bg-[#eff6ff] transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setConfirmId(report.id)}
                    aria-label="Удалить"
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[#737373] hover:text-[#dc2626] hover:bg-[#fef2f2] transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}

          {/* Empty State */}
          {reportList.length === 0 && (
            <div className="bg-white border border-[#e8e8e8] rounded-[10px] p-12 text-center">
              <FileText className="w-12 h-12 text-[#d1d1d1] mx-auto mb-3" />
              <p className="text-[14px] font-medium text-[#525252]">
                Нет отчётов
              </p>
              <p className="text-[13px] text-[#a8a8a8] mt-1">
                Создайте первый отчёт, чтобы отслеживать прогресс
              </p>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmId !== null}
        onOpenChange={(open) => !open && setConfirmId(null)}
        title="Удалить отчёт?"
        description={reportToDelete ? `Отчёт «${reportToDelete.name}» будет удалён безвозвратно.` : 'Отчёт будет удалён безвозвратно.'}
        confirmLabel="Удалить"
        onConfirm={() => {
          if (confirmId) {
            handleDelete(confirmId)
            toast.success('Отчёт удалён')
            setConfirmId(null)
          }
        }}
      />
    </div>
  )
}
