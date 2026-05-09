'use client';

import { useState } from 'react';
import {
  Check,
  Crown,
  Download,
  Mail,
  Users,
  Zap,
  Building2,
  Infinity,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  current: boolean;
  icon: React.ReactNode;
  accent: string;
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$29',
    period: '/мес',
    description: 'Для начинающих',
    features: [
      '1,000 писем/мес',
      '500 контактов',
      '1 кампания',
      'Email поддержка',
      'Базовая аналитика',
    ],
    current: false,
    icon: <Zap className="size-5" />,
    accent: '#737373',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$99',
    period: '/мес',
    description: 'Для растущих команд',
    features: [
      '10,000 писем/мес',
      '5,000 контактов',
      'Безлимит кампаний',
      'A/B тестирование',
      'CRM интеграции',
      'Приоритетная поддержка',
      'Расширенная аналитика',
    ],
    current: true,
    icon: <Star className="size-5" />,
    accent: '#2563eb',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$299',
    period: '/мес',
    description: 'Для крупных компаний',
    features: [
      'Безлимит писем',
      'Безлимит контактов',
      'Безлимит кампаний',
      'A/B тестирование',
      'Все CRM интеграции',
      'Dedicated менеджер',
      'API доступ',
      'White-label',
      'SLA гарантия',
    ],
    current: false,
    icon: <Building2 className="size-5" />,
    accent: '#16a34a',
  },
];

interface PaymentRecord {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: 'Оплачено' | 'В обработке' | 'Возврат';
}

const mockPayments: PaymentRecord[] = [
  {
    id: 'INV-2024-012',
    date: '15 янв 2025',
    description: 'Pro план - январь 2025',
    amount: '$99.00',
    status: 'Оплачено',
  },
  {
    id: 'INV-2024-011',
    date: '15 дек 2024',
    description: 'Pro план - декабрь 2024',
    amount: '$99.00',
    status: 'Оплачено',
  },
  {
    id: 'INV-2024-010',
    date: '15 ноя 2024',
    description: 'Pro план - ноябрь 2024',
    amount: '$99.00',
    status: 'Оплачено',
  },
  {
    id: 'INV-2024-009',
    date: '15 окт 2024',
    description: 'Pro план - октябрь 2024',
    amount: '$99.00',
    status: 'Оплачено',
  },
  {
    id: 'INV-2024-008',
    date: '15 сен 2024',
    description: 'Pro план - сентябрь 2024',
    amount: '$99.00',
    status: 'Оплачено',
  },
];

const statusStyles: Record<string, string> = {
  Оплачено: 'bg-[#16a34a]/10 text-[#16a34a]',
  'В обработке': 'bg-[#d97706]/10 text-[#d97706]',
  Возврат: 'bg-[#dc2626]/10 text-[#dc2626]',
};

export default function BillingView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0d0d0d]">Биллинг</h1>
        <p className="text-sm text-[#737373]">Управление подпиской и оплатами</p>
      </div>

      {/* Current Plan Card */}
      <Card className="border-[#e8e8e8] rounded-[10px] py-4">
        <CardContent className="space-y-5 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#2563eb]/10">
                <Crown className="size-5 text-[#2563eb]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-[#0d0d0d]">Pro план</h3>
                  <Badge className="bg-[#2563eb]/10 text-[#2563eb] border-[#2563eb]/20 text-[10px]">
                    Текущий план
                  </Badge>
                </div>
                <p className="text-sm text-[#737373]">$99/мес, следующее списание 15 фев 2025</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-[#e8e8e8] text-[#737373]">
              Управление
            </Button>
          </div>

          {/* Usage Bars */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm text-[#737373]">
                  <Mail className="size-3.5" />
                  Письма
                </div>
                <span className="text-sm font-medium text-[#0d0d0d]">
                  7,847 <span className="text-[#a3a3a3] font-normal">/ 10,000</span>
                </span>
              </div>
              <Progress value={78.47} className="h-2 bg-[#f5f5f5]" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm text-[#737373]">
                  <Users className="size-3.5" />
                  Контакты
                </div>
                <span className="text-sm font-medium text-[#0d0d0d]">
                  2,341 <span className="text-[#a3a3a3] font-normal">/ 5,000</span>
                </span>
              </div>
              <Progress value={46.82} className="h-2 bg-[#f5f5f5]" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Comparison */}
      <div>
        <h2 className="text-base font-semibold text-[#0d0d0d] mb-3">Сравнение тарифов</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`border-[#e8e8e8] rounded-[10px] py-4 relative ${
                plan.current ? 'ring-2 ring-[#2563eb]/20' : ''
              }`}
            >
              {plan.current && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[#2563eb] text-white border-0 text-[10px]">
                    <Check className="size-3" />
                    Текущий план
                  </Badge>
                </div>
              )}
              <CardContent className="space-y-4 p-4">
                <div className="text-center space-y-2">
                  <div
                    className="mx-auto flex size-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${plan.accent}15`, color: plan.accent }}
                  >
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0d0d0d]">{plan.name}</h3>
                    <p className="text-xs text-[#a3a3a3]">{plan.description}</p>
                  </div>
                  <div className="pt-1">
                    <span className="text-2xl font-bold text-[#0d0d0d]">{plan.price}</span>
                    <span className="text-sm text-[#a3a3a3]">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-[#737373]">
                      <Check className="size-3.5 text-[#16a34a] shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {plan.current ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-[#e8e8e8] text-[#737373]"
                    disabled
                  >
                    Текущий план
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="w-full bg-[#2563eb] hover:bg-[#2563eb]/90 text-white"
                  >
                    Выбрать
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div>
        <h2 className="text-base font-semibold text-[#0d0d0d] mb-3">История оплат</h2>
        <Card className="border-[#e8e8e8] rounded-[10px] py-4">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-[#f5f5f5] hover:bg-transparent">
                  <TableHead className="text-[#a3a3a3] font-medium text-xs pl-4">Дата</TableHead>
                  <TableHead className="text-[#a3a3a3] font-medium text-xs">Описание</TableHead>
                  <TableHead className="text-[#a3a3a3] font-medium text-xs">Сумма</TableHead>
                  <TableHead className="text-[#a3a3a3] font-medium text-xs">Статус</TableHead>
                  <TableHead className="text-[#a3a3a3] font-medium text-xs text-right pr-4">Счёт</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPayments.map((payment) => (
                  <TableRow key={payment.id} className="border-[#f5f5f5]">
                    <TableCell className="pl-4 text-sm text-[#0d0d0d]">{payment.date}</TableCell>
                    <TableCell className="text-sm text-[#737373]">{payment.description}</TableCell>
                    <TableCell className="text-sm font-medium text-[#0d0d0d]">{payment.amount}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium ${statusStyles[payment.status]}`}>
                        {payment.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <Button variant="ghost" size="sm" className="text-[#2563eb] hover:text-[#2563eb] hover:bg-[#2563eb]/5">
                        <Download className="size-3.5" />
                        PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
