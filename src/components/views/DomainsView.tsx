'use client'

import { useState } from 'react'
import {
  Plus,
  CheckCircle2,
  XCircle,
  Globe,
  RefreshCw,
  ExternalLink,
  Trash2,
  Settings,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { EmptyState } from '@/components/shared/EmptyState'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'

interface DnsCheck {
  label: string
  ok: boolean
}

interface Domain {
  id: string
  domain: string
  checks: DnsCheck[]
  verifiedAt: string
}

const domains: Domain[] = [
  {
    id: '1',
    domain: 'company.ru',
    checks: [
      { label: 'SPF', ok: true },
      { label: 'DKIM', ok: true },
      { label: 'DMARC', ok: true },
      { label: 'MX', ok: true },
    ],
    verifiedAt: '15 янв 2025, 14:30',
  },
  {
    id: '2',
    domain: 'outreach.company.ru',
    checks: [
      { label: 'SPF', ok: true },
      { label: 'DKIM', ok: true },
      { label: 'DMARC', ok: false },
      { label: 'MX', ok: true },
    ],
    verifiedAt: '12 янв 2025, 09:15',
  },
  {
    id: '3',
    domain: 'sales.company.ru',
    checks: [
      { label: 'SPF', ok: false },
      { label: 'DKIM', ok: false },
      { label: 'DMARC', ok: false },
      { label: 'MX', ok: false },
    ],
    verifiedAt: 'Не верифицирован',
  },
]

function DnsStatusDot({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[12px]">
      {ok ? (
        <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
      ) : (
        <XCircle className="h-3.5 w-3.5 text-red-500" />
      )}
      <span className={ok ? 'text-[#525252]' : 'text-red-500'}>{label}</span>
    </div>
  )
}

function DomainHealthScore({ checks }: { checks: DnsCheck[] }) {
  const passed = checks.filter((c) => c.ok).length
  const total = checks.length
  const pct = (passed / total) * 100

  let color = 'text-green-600'
  let bgColor = 'bg-green-50'
  if (pct < 50) {
    color = 'text-red-600'
    bgColor = 'bg-red-50'
  } else if (pct < 100) {
    color = 'text-amber-600'
    bgColor = 'bg-amber-50'
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${bgColor} ${color}`}
    >
      {passed}/{total} записей
    </span>
  )
}

export default function DomainsView() {
  const [data, setData] = useState<Domain[]>(domains)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const domainToDelete = data.find((d) => d.id === confirmId)

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((d) => d.id !== id))
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">Домены</h1>
          <p className="text-[13px] text-[#737373]">
            Настройка DNS и доменов
          </p>
        </div>
        <Button onClick={() => toast.success('Домен добавлен')} className="gap-2 bg-[#0d0d0d] text-white hover:bg-[#262626]">
          <Plus className="h-4 w-4" />
          Добавить домен
        </Button>
      </div>

      {/* Domain cards */}
      <div className="flex flex-col gap-4">
        {data.length === 0 ? (
          <EmptyState
            icon={Globe}
            title="Нет доменов"
            description="Добавьте домен для настройки DNS"
            action={{ label: 'Добавить домен', onClick: () => toast.success('Домен добавлен') }}
          />
        ) : (
        <>
        {data.map((domain) => (
          <div
            key={domain.id}
            className="rounded-[10px] border border-[#e8e8e8] bg-white p-5"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              {/* Left side */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fafafa]">
                    <Globe className="h-4 w-4 text-[#525252]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-sm font-medium text-[#0d0d0d]">
                      {domain.domain}
                    </span>
                    <DomainHealthScore checks={domain.checks} />
                  </div>
                </div>

                {/* DNS Checks */}
                <div className="ml-0 flex flex-wrap items-center gap-4 lg:ml-12">
                  {domain.checks.map((check) => (
                    <DnsStatusDot
                      key={check.label}
                      ok={check.ok}
                      label={check.label}
                    />
                  ))}
                </div>

                {/* Verification date */}
                <div className="ml-0 flex items-center gap-1.5 text-[12px] text-[#a3a3a3] lg:ml-12">
                  <ShieldCheck className="h-3 w-3" />
                  <span>
                    Верификация:{' '}
                    {domain.verifiedAt === 'Не верифицирован' ? (
                      <span className="text-red-500">{domain.verifiedAt}</span>
                    ) : (
                      domain.verifiedAt
                    )}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-[13px]"
                >
                  <Settings className="h-3.5 w-3.5" />
                  DNS
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-[13px]"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Проверить
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-[13px] text-red-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                  onClick={() => setConfirmId(domain.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Удалить
                </Button>
              </div>
            </div>
          </div>
        ))}
        </>
        )}
      </div>

      <ConfirmDialog
        open={confirmId !== null}
        onOpenChange={(open) => !open && setConfirmId(null)}
        title="Удалить домен?"
        description={domainToDelete ? `Домен «${domainToDelete.domain}» будет удалён безвозвратно.` : 'Домен будет удалён безвозвратно.'}
        confirmLabel="Удалить"
        onConfirm={() => {
          if (confirmId) {
            handleDelete(confirmId)
            toast.success('Домен удалён')
            setConfirmId(null)
          }
        }}
      />
    </div>
  )
}
