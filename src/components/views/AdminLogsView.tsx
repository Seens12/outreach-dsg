'use client'

import { useState } from 'react'
import {
  Search,
  Filter,
  AlertCircle,
  AlertTriangle,
  Info,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type LogLevel = 'ERROR' | 'WARN' | 'INFO'

interface LogEntry {
  id: number
  timestamp: string
  level: LogLevel
  message: string
  source: string
}

const logEntries: LogEntry[] = [
  { id: 1, timestamp: '2024-06-18 14:32:15', level: 'INFO', message: 'Система запущена успешно. Все сервисы инициализированы.', source: 'system' },
  { id: 2, timestamp: '2024-06-18 14:28:03', level: 'ERROR', message: 'Не удалось подключиться к SMTP-серверу: Connection refused', source: 'mail-service' },
  { id: 3, timestamp: '2024-06-18 14:25:47', level: 'WARN', message: 'Высокая нагрузка на CPU: 78%. Рекомендуется масштабирование.', source: 'monitoring' },
  { id: 4, timestamp: '2024-06-18 14:20:11', level: 'INFO', message: 'Backup базы данных запущен (автоматический)', source: 'backup' },
  { id: 5, timestamp: '2024-06-18 14:15:33', level: 'ERROR', message: 'Таймаут запроса к внешнему API (CRM интеграция): 30000ms exceeded', source: 'api-gateway' },
  { id: 6, timestamp: '2024-06-18 14:10:05', level: 'INFO', message: 'Пользователь alexey@techcorp.ru вошёл в систему', source: 'auth' },
  { id: 7, timestamp: '2024-06-18 14:05:22', level: 'WARN', message: 'Сертификат домена mail.techcorp.ru истекает через 7 дней', source: 'cert-manager' },
  { id: 8, timestamp: '2024-06-18 13:58:19', level: 'INFO', message: 'Кампания "Q3 Launch" отправлена: 245 писем', source: 'campaigns' },
  { id: 9, timestamp: '2024-06-18 13:50:44', level: 'ERROR', message: 'Ошибка валидации email: invalid-recipient@unknown для тенанта BrightStar', source: 'validation' },
  { id: 10, timestamp: '2024-06-18 13:45:01', level: 'INFO', message: 'Обновлена конфигурация тенанта DataFlow Inc.', source: 'tenant-service' },
  { id: 11, timestamp: '2024-06-18 13:40:17', level: 'WARN', message: 'Очередь задач: 15 элементов в ожидании (retry)', source: 'queue' },
  { id: 12, timestamp: '2024-06-18 13:35:30', level: 'INFO', message: 'Автоматическое обновление завершено: v2.4.1', source: 'system' },
]

const levelConfig: Record<LogLevel, { icon: typeof AlertCircle; className: string }> = {
  ERROR: {
    icon: AlertCircle,
    className: 'bg-[#f5f5f5] text-[#404040] border-[#e8e8e8]',
  },
  WARN: {
    icon: AlertTriangle,
    className: 'bg-[#f5f5f5] text-[#525252] border-[#e8e8e8]',
  },
  INFO: {
    icon: Info,
    className: 'bg-[#f5f5f5] text-[#525252] border-[#e8e8e8]',
  },
}

const levelFilters: { label: string; value: LogLevel | 'ALL' }[] = [
  { label: 'Все', value: 'ALL' },
  { label: 'Error', value: 'ERROR' },
  { label: 'Warning', value: 'WARN' },
  { label: 'Info', value: 'INFO' },
]

export default function AdminLogsView() {
  const [filter, setFilter] = useState<LogLevel | 'ALL'>('ALL')
  const [search, setSearch] = useState('')

  const filtered = logEntries.filter((log) => {
    const matchesLevel = filter === 'ALL' || log.level === filter
    const matchesSearch =
      !search ||
      log.message.toLowerCase().includes(search.toLowerCase()) ||
      log.source.toLowerCase().includes(search.toLowerCase())
    return matchesLevel && matchesSearch
  })

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scroll">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#e8e8e8]">
        <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">Логи</h1>
        <p className="text-sm text-[#737373] mt-0.5">Системные логи</p>
      </div>

      <div className="flex-1 p-6 space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Level filter */}
          <div className="flex items-center gap-1 p-1 rounded-[10px] border border-[#e8e8e8] bg-white">
            {levelFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                  filter === f.value
                    ? 'bg-[#0d0d0d] text-white'
                    : 'text-[#525252] hover:text-[#171717]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a8a8a8]" />
            <input
              type="text"
              placeholder="Поиск по логам..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#e8e8e8] bg-white text-sm outline-none focus:border-[#737373] transition-colors placeholder:text-[#a8a8a8] text-[#171717]"
            />
          </div>

          {/* Date info */}
          <div className="text-[12px] text-[#a8a8a8] ml-auto hidden sm:block">
            Показано: {filtered.length} из {logEntries.length}
          </div>
        </div>

        {/* Log entries */}
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white overflow-hidden">
          {filtered.map((log, i) => {
            const cfg = levelConfig[log.level]
            const Icon = cfg.icon
            return (
              <div
                key={log.id}
                className={`flex items-start gap-3 px-4 py-3 border-b border-[#e8e8e8] last:border-b-0 ${
                  log.level === 'ERROR' ? 'bg-[#fffafa]' : ''
                }`}
              >
                <Badge
                  variant="outline"
                  className={`flex-shrink-0 mt-0.5 font-semibold ${cfg.className}`}
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {log.level}
                </Badge>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-[#171717] leading-snug">
                    {log.message}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[12px] text-[#a8a8a8] font-mono">
                      {log.timestamp}
                    </span>
                    <span className="text-[12px] px-1.5 py-0.5 rounded bg-[#fafafa] text-[#737373] font-mono">
                      {log.source}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-[13px] text-[#a8a8a8]">
              Нет записей, соответствующих фильтрам
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
