'use client';

import { useState } from 'react';
import {
  Webhook,
  Plus,
  Play,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WebhookData {
  id: string;
  url: string;
  events: string[];
  active: boolean;
  lastDelivery: string;
  successRate: number;
}

const mockWebhooks: WebhookData[] = [
  {
    id: '1',
    url: 'https://api.myapp.com/webhooks/outreach',
    events: ['email.sent', 'email.reply', 'lead.created'],
    active: true,
    lastDelivery: '2 мин назад',
    successRate: 98.5,
  },
  {
    id: '2',
    url: 'https://hooks.slack.com/services/T0X/B0X/abc',
    events: ['lead.created', 'lead.converted'],
    active: true,
    lastDelivery: '15 мин назад',
    successRate: 100,
  },
  {
    id: '3',
    url: 'https://n8n.mycompany.com/webhook/crm-sync',
    events: ['email.bounced', 'email.reply', 'campaign.completed'],
    active: false,
    lastDelivery: '2 дня назад',
    successRate: 72.3,
  },
];

const eventColors: Record<string, string> = {
  'email.sent': 'bg-[#2563eb]/10 text-[#2563eb] border-[#2563eb]/20',
  'email.reply': 'bg-[#16a34a]/10 text-[#16a34a] border-[#16a34a]/20',
  'email.bounced': 'bg-[#dc2626]/10 text-[#dc2626] border-[#dc2626]/20',
  'lead.created': 'bg-[#d97706]/10 text-[#d97706] border-[#d97706]/20',
  'lead.converted': 'bg-[#16a34a]/10 text-[#16a34a] border-[#16a34a]/20',
  'campaign.completed': 'bg-[#2563eb]/10 text-[#2563eb] border-[#2563eb]/20',
};

export default function WebhooksView() {
  const [webhooks] = useState<WebhookData[]>(mockWebhooks);

  return (
    <div className="space-y-6 p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0d0d0d]">Вебхуки</h1>
          <p className="text-sm text-[#737373]">Управление вебхук-интеграциями</p>
        </div>
        <Button className="mt-3 sm:mt-0 bg-[#2563eb] hover:bg-[#2563eb]/90 text-white">
          <Plus className="size-4" />
          Добавить вебхук
        </Button>
      </div>

      {/* Webhook Cards */}
      <div className="grid gap-4">
        {webhooks.map((webhook) => (
          <Card
            key={webhook.id}
            className="border-[#e8e8e8] rounded-[10px] py-4"
          >
            <CardContent className="space-y-4 p-4">
              {/* Top Row: URL + Status */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#fafafa]">
                    <Webhook className="size-4 text-[#737373]" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#0d0d0d] font-mono">
                      {webhook.url}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {webhook.events.map((event) => (
                        <Badge
                          key={event}
                          variant="outline"
                          className={`text-xs ${eventColors[event] || 'bg-[#fafafa] text-[#737373] border-[#e8e8e8]'}`}
                        >
                          {event}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Badge
                  className={
                    webhook.active
                      ? 'bg-[#16a34a]/10 text-[#16a34a] border-[#16a34a]/20'
                      : 'bg-[#fafafa] text-[#737373] border-[#e8e8e8]'
                  }
                >
                  {webhook.active ? (
                    <>
                      <CheckCircle2 className="size-3" />
                      Активен
                    </>
                  ) : (
                    <>
                      <XCircle className="size-3" />
                      Неактивен
                    </>
                  )}
                </Badge>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#737373] border-t border-[#f5f5f5] pt-3">
                <div className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  <span>Последняя доставка: {webhook.lastDelivery}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Activity className="size-3.5" />
                  <span>
                    Успешность:{' '}
                    <span
                      className={
                        webhook.successRate >= 95
                          ? 'text-[#16a34a] font-medium'
                          : webhook.successRate >= 80
                            ? 'text-[#d97706] font-medium'
                            : 'text-[#dc2626] font-medium'
                      }
                    >
                      {webhook.successRate}%
                    </span>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 border-t border-[#f5f5f5] pt-3">
                <Button variant="outline" size="sm" className="border-[#e8e8e8] text-[#737373] hover:text-[#0d0d0d]">
                  <Play className="size-3.5" />
                  Тест
                </Button>
                <Button variant="outline" size="sm" className="border-[#e8e8e8] text-[#737373] hover:text-[#0d0d0d]">
                  <Pencil className="size-3.5" />
                  Изменить
                </Button>
                <Button variant="outline" size="sm" className="border-[#e8e8e8] text-[#dc2626] hover:text-[#dc2626] hover:border-[#dc2626]/30 hover:bg-[#dc2626]/5">
                  <Trash2 className="size-3.5" />
                  Удалить
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
