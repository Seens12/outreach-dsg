'use client'

import {
  Check,
  X,
  Download,
  Crown,
  Zap,
  Star,
  Rocket,
} from 'lucide-react'
import { toast } from 'sonner'

/* ── Plan Types ────────────────────────────────────────── */

interface Feature {
  label: string
  starter: string | boolean
  growth: string | boolean
  pro: string | boolean
}

const features: Feature[] = [
  { label: 'Контакты', starter: '500', growth: '5 000', pro: 'Безлимит' },
  { label: 'Операторы', starter: '1', growth: '3', pro: '10' },
  { label: 'AI-ответы / мес', starter: '50', growth: '500', pro: 'Безлимит' },
  { label: 'Кампании', starter: '2', growth: '10', pro: 'Безлимит' },
  { label: 'Документы', starter: false, growth: '10', pro: 'Безлимит' },
  { label: 'A/B тестирование', starter: false, growth: true, pro: true },
  { label: 'CRM интеграции', starter: false, growth: true, pro: true },
  { label: 'API доступ', starter: false, growth: false, pro: true },
  { label: 'Приоритетная поддержка', starter: false, growth: false, pro: true },
  { label: 'Dedicated менеджер', starter: false, growth: false, pro: true },
]

const plans = [
  { id: 'starter', name: 'Старт', price: '4 900', icon: Zap },
  { id: 'growth', name: 'Рост', price: '12 900', icon: Rocket },
  { id: 'pro', name: 'Pro', price: '29 900', icon: Star },
]

/* ── Payment History ───────────────────────────────────── */

interface Payment {
  id: string
  date: string
  description: string
  amount: string
  status: 'Оплачено' | 'В обработке'
}

const payments: Payment[] = [
  { id: 'INV-2025-006', date: '15 июня 2025', description: 'Тариф Рост — июнь 2025', amount: '12 900 ₽', status: 'В обработке' },
  { id: 'INV-2025-005', date: '15 мая 2025', description: 'Тариф Рост — май 2025', amount: '12 900 ₽', status: 'Оплачено' },
  { id: 'INV-2025-004', date: '15 апр 2025', description: 'Тариф Рост — апрель 2025', amount: '12 900 ₽', status: 'Оплачено' },
  { id: 'INV-2025-003', date: '15 мар 2025', description: 'Тариф Рост — март 2025', amount: '12 900 ₽', status: 'Оплачено' },
]

const statusStyles: Record<string, string> = {
  'Оплачено': 'bg-[#f5f5f5] text-[#404040]',
  'В обработке': 'bg-[#f5f5f5] text-[#525252]',
}

/* ── Component ─────────────────────────────────────────── */

export default function BillingView() {
  return (
    <div className="flex flex-col gap-5 p-6 text-[13.5px] text-[#171717] overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
          Биллинг
        </h1>
        <p className="text-[13px] text-[#737373] mt-1">
          Управление подпиской и оплатами
        </p>
      </div>

      {/* Current Plan Card */}
      <div className="rounded-[10px] border border-[#e8e8e8] bg-white p-5 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-11 h-11 rounded-[10px] bg-[#fafafa] shrink-0">
              <Crown className="w-5 h-5 text-[#525252]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[15px] font-semibold text-[#0d0d0d]">Рост</h3>
                <span className="text-[11px] font-medium px-2 py-[3px] rounded-[6px] bg-[#f5f5f5] text-[#404040]">
                  Текущий план
                </span>
              </div>
              <p className="text-[13px] text-[#737373] mt-0.5">
                12 900 ₽/мес &middot; Следующее списание: <span className="text-[#525252] font-medium">15 июля 2025</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => toast.info('Управление подпиской')}
            className="h-9 px-4 rounded-[8px] border border-[#e8e8e8] bg-white text-[13px] font-medium text-[#525252] hover:bg-[#f5f5f5] hover:text-[#0d0d0d] transition-colors cursor-pointer shrink-0"
          >
            Управление
          </button>
        </div>
      </div>

      {/* Plan Comparison */}
      <div>
        <h2 className="text-[15px] font-semibold text-[#0d0d0d] mb-4">Сравнение тарифов</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => {
            const isCurrent = plan.id === 'growth'
            const Icon = plan.icon
            return (
              <div
                key={plan.id}
                className={`rounded-[10px] border bg-white p-5 flex flex-col shadow-card relative ${
                  isCurrent ? 'border-[#0d0d0d]' : 'border-[#e8e8e8]'
                }`}
              >
                {isCurrent && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                    <span className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-[#0d0d0d] text-white">
                      Текущий план
                    </span>
                  </div>
                )}

                <div className="text-center mb-5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-[10px] bg-[#fafafa] mx-auto mb-3">
                    <Icon className="w-5 h-5 text-[#525252]" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-[#0d0d0d]">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-[24px] font-semibold text-[#0d0d0d] tracking-tight">{plan.price}</span>
                    <span className="text-[13px] text-[#a3a3a3]"> ₽/мес</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-2.5 flex-1 mb-5">
                  {features.map((f) => {
                    const value = f[plan.id as keyof Pick<Feature, 'starter' | 'growth' | 'pro'>]
                    const included = value !== false
                    return (
                      <li key={f.label} className="flex items-center gap-2.5 text-[12.5px]">
                        {included ? (
                          <Check className="w-3.5 h-3.5 text-[#404040] shrink-0" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-[#d4d4d4] shrink-0" />
                        )}
                        <span className={included ? 'text-[#525252]' : 'text-[#d4d4d4]'}>
                          {f.label}
                          {typeof value === 'string' && value !== true && (
                            <span className="text-[#a3a3a3] ml-1">({value})</span>
                          )}
                        </span>
                      </li>
                    )
                  })}
                </ul>

                {/* CTA */}
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full h-10 rounded-[8px] border border-[#e8e8e8] bg-[#fafafa] text-[13px] font-medium text-[#a3a3a3] cursor-not-allowed"
                  >
                    Текущий план
                  </button>
                ) : (
                  <button
                    onClick={() => toast.success(`Выбран тариф "${plan.name}"`)}
                    className="w-full h-10 rounded-[8px] bg-[#0d0d0d] text-white text-[13px] font-medium hover:bg-[#262626] transition-colors cursor-pointer"
                  >
                    Выбрать {plan.name}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Payment History */}
      <div>
        <h2 className="text-[15px] font-semibold text-[#0d0d0d] mb-4">История оплат</h2>
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white overflow-hidden shadow-card">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#e8e8e8] bg-[#fafafa]">
                <th className="text-left py-3 px-4 text-[11.5px] font-semibold text-[#a3a3a3] uppercase tracking-[0.04em]">Дата</th>
                <th className="text-left py-3 px-4 text-[11.5px] font-semibold text-[#a3a3a3] uppercase tracking-[0.04em]">Описание</th>
                <th className="text-left py-3 px-4 text-[11.5px] font-semibold text-[#a3a3a3] uppercase tracking-[0.04em]">Сумма</th>
                <th className="text-left py-3 px-4 text-[11.5px] font-semibold text-[#a3a3a3] uppercase tracking-[0.04em]">Статус</th>
                <th className="text-right py-3 px-4 text-[11.5px] font-semibold text-[#a3a3a3] uppercase tracking-[0.04em]">Счёт</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-[#f5f5f5] last:border-b-0 hover:bg-[#fafafa] transition-colors">
                  <td className="py-3 px-4 text-[#525252]">{p.date}</td>
                  <td className="py-3 px-4 text-[#404040] font-medium">{p.description}</td>
                  <td className="py-3 px-4 font-semibold text-[#0d0d0d]">{p.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-[3px] rounded-[6px] text-[11.5px] font-medium ${statusStyles[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => toast.success('Скачивание счёта...')}
                      className="inline-flex items-center gap-1 text-[12.5px] font-medium text-[#525252] hover:text-[#0d0d0d] transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
