'use client'

import { useState } from 'react'
import {
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Zap,
  RefreshCw,
  Mail,
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type MailboxStatus = 'connected' | 'pending'

interface Mailbox {
  id: string
  email: string
  status: MailboxStatus
  imapOk: boolean
  smtpOk: boolean
  lastSync: string
}

const mailboxes: Mailbox[] = [
  {
    id: '1',
    email: 'outreach@company.ru',
    status: 'connected',
    imapOk: true,
    smtpOk: true,
    lastSync: '5 мин назад',
  },
  {
    id: '2',
    email: 'sales@company.ru',
    status: 'connected',
    imapOk: true,
    smtpOk: true,
    lastSync: '12 мин назад',
  },
  {
    id: '3',
    email: 'support@company.ru',
    status: 'pending',
    imapOk: true,
    smtpOk: false,
    lastSync: 'Ошибка',
  },
]

function StatusBadge({ status }: { status: MailboxStatus }) {
  if (status === 'connected') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        Подключен
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
      <AlertTriangle className="h-3 w-3" />
      Ожидание
    </span>
  )
}

function CheckIndicator({ ok, label }: { ok: boolean; label: string }) {
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

export default function MailboxesView() {
  const [data] = useState<Mailbox[]>(mailboxes)

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-bold text-[#0d0d0d]">Ящики</h1>
          <p className="text-[13px] text-[#737373]">
            Управление email-ящиками
          </p>
        </div>
        <Button className="gap-2 bg-[#2563eb] text-white hover:bg-[#2563eb]/90">
          <Plus className="h-4 w-4" />
          Добавить ящик
        </Button>
      </div>

      {/* Mailbox list */}
      <div className="flex flex-col gap-4">
        {data.map((mailbox) => (
          <div
            key={mailbox.id}
            className="rounded-[10px] border border-[#e8e8e8] bg-white p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Left side: email + status */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fafafa]">
                    <Mail className="h-4 w-4 text-[#525252]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-sm font-medium text-[#0d0d0d]">
                      {mailbox.email}
                    </span>
                    <StatusBadge status={mailbox.status} />
                  </div>
                </div>

                {/* Checks row */}
                <div className="flex items-center gap-5">
                  <CheckIndicator ok={mailbox.imapOk} label="IMAP" />
                  <CheckIndicator ok={mailbox.smtpOk} label="SMTP" />
                  <div className="flex items-center gap-1.5 text-[12px] text-[#a3a3a3]">
                    <RefreshCw className="h-3 w-3" />
                    <span>
                      Последняя синхронизация:{' '}
                      {mailbox.lastSync === 'Ошибка' ? (
                        <span className="text-red-500">{mailbox.lastSync}</span>
                      ) : (
                        mailbox.lastSync
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side: action buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-[13px]"
                >
                  <Zap className="h-3.5 w-3.5" />
                  Тест
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-[13px] text-red-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Удалить
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
