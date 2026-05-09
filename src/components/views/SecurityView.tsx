'use client'

import { useState } from 'react'
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Database,
  UserCheck,
  FileCheck,
  KeyRound,
  Globe,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ArrowUpRight,
  Settings,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CategoryScore {
  name: string
  score: number
  icon: React.ElementType
}

interface SecurityCheck {
  id: string
  title: string
  status: 'ok' | 'warning' | 'error'
  description: string
  action: string
}

// ---------------------------------------------------------------------------
// Demo data
// ---------------------------------------------------------------------------

const categories: CategoryScore[] = [
  { name: 'Аутентификация', score: 92, icon: Lock },
  { name: 'Данные', score: 85, icon: Database },
  { name: 'Доступ', score: 78, icon: UserCheck },
  { name: 'Соответствие', score: 90, icon: FileCheck },
]

const securityChecks: SecurityCheck[] = [
  {
    id: '1',
    title: 'Двухфакторная аутентификация',
    status: 'ok',
    description: 'Все аккаунты защищены двухфакторной аутентификацией',
    action: 'Управление',
  },
  {
    id: '2',
    title: 'Шифрование данных AES-256',
    status: 'ok',
    description: 'Все данные зашифрованы стандартом AES-256',
    action: 'Подробнее',
  },
  {
    id: '3',
    title: 'SSL сертификаты',
    status: 'ok',
    description: 'SSL сертификаты активны для всех доменов',
    action: 'Просмотр',
  },
  {
    id: '4',
    title: 'Парольная политика',
    status: 'warning',
    description: 'Средний уровень — рекомендуется включить требования к сложности',
    action: 'Настроить',
  },
  {
    id: '5',
    title: 'API ключи ротация',
    status: 'ok',
    description: 'Автоматическая ротация ключей каждые 30 дней',
    action: 'Управление',
  },
  {
    id: '6',
    title: 'IP whitelist',
    status: 'error',
    description: 'Не настроен — рекомендуется ограничить доступ по IP',
    action: 'Настроить',
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const statusIcon: Record<SecurityCheck['status'], { icon: React.ElementType; className: string }> = {
  ok: { icon: CheckCircle2, className: 'text-[#0d0d0d]' },
  warning: { icon: AlertCircle, className: 'text-[#737373]' },
  error: { icon: XCircle, className: 'text-[#525252]' },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SecurityView() {
  const overallScore = 87

  return (
    <div className="p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
          Безопасность
        </h1>
        <p className="text-[13px] text-[#737373] font-medium mt-1">
          Мониторинг и настройка безопасности
        </p>
      </div>

      {/* Security Score Card */}
      <div className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-[10px] bg-[#f5f5f5]">
                <ShieldCheck className="w-5 h-5 text-[#0d0d0d]" />
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#737373] uppercase tracking-wide">
                  Общий балл безопасности
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[36px] font-bold text-[#0d0d0d] leading-none">
                    {overallScore}
                  </span>
                  <span className="text-[14px] text-[#737373] font-medium">из 100</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center px-2.5 py-[3px] rounded-full text-[11.5px] font-semibold bg-[#f5f5f5] text-[#404040]">
                Хороший уровень
              </span>
            </div>
          </div>

          {/* Score Ring */}
          <div className="relative w-[100px] h-[100px] shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke="#f0f0f0"
                strokeWidth="8"
              />
              <circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke="#0d0d0d"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - overallScore / 100)}`}
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[20px] font-bold text-[#0d0d0d]">{overallScore}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[#f5f5f5]">
          <Button
            onClick={() => toast.success('Рекомендации применены')}
            className="h-[36px] text-[13px] font-medium rounded-[8px] bg-[#0d0d0d] hover:bg-[#262626] text-white gap-2"
          >
            <ArrowUpRight className="w-4 h-4" />
            Улучшить
          </Button>
        </div>
      </div>

      {/* Category Scores */}
      <div className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card p-6 mb-6">
        <h2 className="text-[15px] font-semibold text-[#0d0d0d] mb-5">
          Категории безопасности
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <div
                key={cat.name}
                className="flex items-center gap-4 p-4 rounded-[8px] border border-[#f5f5f5] hover:border-[#e8e8e8] transition-colors"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#f5f5f5] shrink-0">
                  <Icon className="w-4.5 h-4.5 text-[#525252]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-medium text-[#171717]">
                      {cat.name}
                    </span>
                    <span className={cn(
                      'text-[14px] font-bold',
                      cat.score >= 90 ? 'text-[#0d0d0d]' : cat.score >= 80 ? 'text-[#525252]' : 'text-[#737373]'
                    )}>
                      {cat.score}
                    </span>
                  </div>
                  <div className="w-full h-[5px] bg-[#f0f0f0] rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-500',
                        cat.score >= 90 ? 'bg-[#0d0d0d]' : cat.score >= 80 ? 'bg-[#737373]' : 'bg-[#a3a3a3]'
                      )}
                      style={{ width: `${cat.score}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Security Checks */}
      <div className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card p-6">
        <h2 className="text-[15px] font-semibold text-[#0d0d0d] mb-5">
          Проверки безопасности
        </h2>
        <div className="flex flex-col gap-3">
          {securityChecks.map((check) => {
            const st = statusIcon[check.status]
            const StatusIcon = st.icon
            return (
              <div
                key={check.id}
                className={cn(
                  'flex items-start gap-4 p-4 rounded-[10px] border transition-colors',
                  check.status === 'ok'
                    ? 'border-[#f5f5f5] bg-white'
                    : check.status === 'warning'
                      ? 'border-[#e8e8e8] bg-[#fafafa]'
                      : 'border-[#e8e8e8] bg-[#fafafa]'
                )}
              >
                {/* Icon */}
                <div className={cn(
                  'flex items-center justify-center w-9 h-9 rounded-[8px] shrink-0 mt-0.5',
                  check.status === 'ok' ? 'bg-[#f5f5f5]' : 'bg-[#f5f5f5]'
                )}>
                  <StatusIcon className={cn('w-4 h-4', st.className)} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-[13.5px] font-semibold text-[#171717]">
                      {check.title}
                    </h3>
                    {check.status === 'ok' && (
                      <span className="inline-flex items-center px-2 py-[2px] rounded-full text-[10.5px] font-semibold bg-[#f5f5f5] text-[#404040]">
                        Включена
                      </span>
                    )}
                    {check.status === 'warning' && (
                      <span className="inline-flex items-center px-2 py-[2px] rounded-full text-[10.5px] font-semibold bg-[#f5f5f5] text-[#737373]">
                        Средняя
                      </span>
                    )}
                    {check.status === 'error' && (
                      <span className="inline-flex items-center px-2 py-[2px] rounded-full text-[10.5px] font-semibold bg-[#f5f5f5] text-[#a3a3a3]">
                        Не настроено
                      </span>
                    )}
                  </div>
                  <p className="text-[12.5px] text-[#737373] leading-relaxed">
                    {check.description}
                  </p>
                </div>

                {/* Action */}
                <button
                  onClick={() => {
                    if (check.status === 'ok') {
                      toast.success(`${check.title}: просмотр настроек`)
                    } else {
                      toast.success(`${check.title}: настройка запущена`)
                    }
                  }}
                  className={cn(
                    'shrink-0 px-3 py-1.5 rounded-[7px] text-[12px] font-medium transition-colors cursor-pointer mt-0.5',
                    check.status === 'ok'
                      ? 'text-[#737373] bg-[#f5f5f5] hover:bg-[#e8e8e8]'
                      : 'text-[#404040] bg-[#f5f5f5] hover:bg-[#e8e8e8] border border-[#e8e8e8]'
                  )}
                >
                  {check.action}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
