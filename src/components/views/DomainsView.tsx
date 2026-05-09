'use client'

import { useState } from 'react'
import {
  Plus,
  Globe,
  Settings,
  RefreshCw,
  Check,
  X,
  AlertTriangle,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type DomainStatus = 'verified' | 'warming' | 'issues'

interface DnsRecord {
  label: string
  ok: boolean
}

interface Domain {
  id: string
  domain: string
  registrar: string
  status: DomainStatus
  dns: DnsRecord[]
  capacityUsed: number
  capacityMax: number
}

// ---------------------------------------------------------------------------
// Demo data
// ---------------------------------------------------------------------------

const domains: Domain[] = [
  {
    id: '1',
    domain: 'techcorp.ru',
    registrar: 'Reg.ru',
    status: 'verified',
    dns: [
      { label: 'SPF', ok: true },
      { label: 'DKIM', ok: true },
      { label: 'DMARC', ok: true },
      { label: 'MX', ok: true },
    ],
    capacityUsed: 120,
    capacityMax: 200,
  },
  {
    id: '2',
    domain: 'mail.prospect.ru',
    registrar: 'Nic.ru',
    status: 'warming',
    dns: [
      { label: 'SPF', ok: true },
      { label: 'DKIM', ok: true },
      { label: 'DMARC', ok: false },
      { label: 'MX', ok: true },
    ],
    capacityUsed: 30,
    capacityMax: 60,
  },
  {
    id: '3',
    domain: 'sender.example.com',
    registrar: 'Cloudflare',
    status: 'issues',
    dns: [
      { label: 'SPF', ok: false },
      { label: 'DKIM', ok: false },
      { label: 'DMARC', ok: false },
      { label: 'MX', ok: true },
    ],
    capacityUsed: 10,
    capacityMax: 100,
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const statusConfig: Record<DomainStatus, { label: string; className: string }> = {
  verified: { label: 'Прогрев завершён', className: 'bg-[#f5f5f5] text-[#404040]' },
  warming: { label: 'В прогреве', className: 'bg-[#f5f5f5] text-[#525252]' },
  issues: { label: 'С проблемами', className: 'bg-[#f5f5f5] text-[#a3a3a3]' },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DomainsView() {
  const [data] = useState<Domain[]>(domains)

  const totalCapacity = data.reduce((a, d) => a + d.capacityUsed, 0)
  const totalMax = data.reduce((a, d) => a + d.capacityMax, 0)

  return (
    <div className="p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
            Управление доменами и DNS
          </h1>
          <p className="text-[13px] text-[#737373] mt-1">
            Настройка и мониторинг почтовых доменов
          </p>
        </div>
        <Button
          onClick={() => toast.success('Домен добавлен')}
          className="gap-2 bg-[#0d0d0d] text-white hover:bg-[#262626]"
        >
          <Plus className="h-4 w-4" />
          Добавить домен
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Доменов', value: '3', icon: Globe },
          { label: 'Верифицировано', value: '1', icon: ShieldCheck },
          { label: 'В прогреве', value: '2', icon: TrendingUp },
          { label: 'С проблемами', value: '2', icon: AlertTriangle },
          { label: 'Вместимость', value: `${totalCapacity}/${totalMax} писем/день`, icon: Settings },
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
              <div className="text-[20px] font-semibold text-[#0d0d0d] tracking-tight leading-tight">
                {s.value}
              </div>
            </div>
          )
        })}
      </div>

      {/* Domain cards */}
      <div className="flex flex-col gap-4">
        {data.map((domain) => {
          const st = statusConfig[domain.status]
          const dnsOk = domain.dns.filter((d) => d.ok).length
          const dnsTotal = domain.dns.length
          const capacityPct = Math.round((domain.capacityUsed / domain.capacityMax) * 100)

          return (
            <div
              key={domain.id}
              className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                {/* Left column */}
                <div className="flex-1 min-w-0">
                  {/* Domain name + registrar + status */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#fafafa] shrink-0">
                      <Globe className="w-4 h-4 text-[#525252]" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-sm font-medium text-[#0d0d0d]">
                          {domain.domain}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-[2px] rounded-[6px] text-[11px] font-medium ${st.className}`}
                        >
                          {st.label}
                        </span>
                      </div>
                      <span className="text-[12px] text-[#a3a3a3]">{domain.registrar}</span>
                    </div>
                  </div>

                  {/* DNS records */}
                  <div className="flex flex-wrap items-center gap-3 mb-4 ml-0 lg:ml-12">
                    {domain.dns.map((rec) => (
                      <div
                        key={rec.label}
                        className="flex items-center gap-1.5 text-[12px]"
                      >
                        {rec.ok ? (
                          <Check className="h-3.5 w-3.5 text-[#404040]" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-[#a3a3a3]" />
                        )}
                        <span className={rec.ok ? 'text-[#404040]' : 'text-[#a3a3a3]'}>
                          {rec.label}
                        </span>
                      </div>
                    ))}
                    <span className="text-[11px] text-[#a3a3a3] ml-1">
                      {dnsOk}/{dnsTotal}
                    </span>
                  </div>

                  {/* Sending capacity bar */}
                  <div className="ml-0 lg:ml-12">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[12px] text-[#737373] font-medium">
                        Вместимость отправки
                      </span>
                      <span className="text-[12px] text-[#525252] font-semibold">
                        {domain.capacityUsed}/{domain.capacityMax}
                      </span>
                    </div>
                    <Progress
                      value={capacityPct}
                      className="h-2 bg-[#f5f5f5] rounded-full [&>div]:bg-[#171717] w-full max-w-xs"
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-[13px] border-[#e8e8e8]"
                    onClick={() => toast.info('Настройка DNS для ' + domain.domain)}
                  >
                    <Settings className="h-3.5 w-3.5" />
                    Настроить DNS
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-[13px] border-[#e8e8e8]"
                    onClick={() => toast.success('Проверка запущена для ' + domain.domain)}
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Проверить все
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
