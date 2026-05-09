'use client';

import { useState } from 'react';
import {
  Webhook,
  Plus,
  Play,
  Pencil,
  Power,
  Clock,
  Activity,
  Zap,
  CheckCircle2,
  ArrowRight,
  ScrollText,
  ExternalLink,
} from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';

interface WebhookData {
  id: string;
  name: string;
  url: string;
  events: string[];
  active: boolean;
  lastDelivery: string;
  successRate: number;
  created: string;
}

const mockWebhooks: WebhookData[] = [
  {
    id: '1',
    name: 'amoCRM — Интеграция',
    url: 'https://api.mycompany.com/webhooks/outreach-amo',
    events: ['Горячий лид', 'Тёплый лид', 'Лид классифицирован', 'Ответ на письмо'],
    active: true,
    lastDelivery: '10 мин назад',
    successRate: 98.5,
    created: '15 янв 2025',
  },
  {
    id: '2',
    name: 'Slack — Уведомления',
    url: 'https://hooks.slack.com/services/T0X/B0X/a1b2c3d4e5f6g7h8',
    events: ['Горячий лид', 'Ответ на письмо', 'Лид классифицирован'],
    active: true,
    lastDelivery: '32 мин назад',
    successRate: 100,
    created: '22 дек 2024',
  },
  {
    id: '3',
    name: 'n8n — Автоматизация',
    url: 'https://n8n.mycompany.com/webhook/crm-sync-automation',
    events: ['Лид классифицирован', 'Ответ на письмо'],
    active: true,
    lastDelivery: '1 ч назад',
    successRate: 95.2,
    created: '10 янв 2025',
  },
];

const stats = [
  { label: 'Активных', value: '3', icon: Zap },
  { label: 'Событий сегодня', value: '8', icon: Activity },
  { label: 'Успешность', value: '75%', icon: CheckCircle2 },
  { label: 'Ср. время', value: '228мс', icon: Clock },
];

export default function WebhooksView() {
  const [webhooks, setWebhooks] = useState<WebhookData[]>(mockWebhooks);
  const [toggleId, setToggleId] = useState<string | null>(null);

  const webhookToToggle = webhooks.find((w) => w.id === toggleId);

  const handleToggle = (id: string) => {
    setWebhooks((prev) =>
      prev.map((w) => (w.id === id ? { ...w, active: !w.active } : w))
    );
  };

  return (
    <div className="space-y-6 p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
            Вебхуки и интеграции
          </h1>
          <p className="text-sm text-[#737373] mt-0.5">
            Управление вебхуками для автоматизации
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toast.info('Лог доставки открывается...')}
            className="inline-flex items-center gap-2 border border-[#e8e8e8] bg-white text-[#525252] px-4 py-2 rounded-[8px] text-[13px] font-medium hover:bg-[#f5f5f5] transition-colors cursor-pointer"
          >
            <ScrollText className="size-4" />
            Лог доставки
          </button>
          <button
            onClick={() => toast.success('Вебхук добавлен')}
            className="inline-flex items-center gap-2 bg-[#0d0d0d] text-white px-4 py-2 rounded-[8px] text-[13px] font-medium hover:bg-[#262626] transition-colors cursor-pointer"
          >
            <Plus className="size-4" />
            Добавить вебхук
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="border border-[#e8e8e8] rounded-[10px] bg-white p-4 shadow-card"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center size-8 rounded-[8px] bg-[#fafafa]">
                  <Icon className="size-4 text-[#525252]" />
                </div>
                <span className="text-[12.5px] text-[#737373] font-medium">
                  {s.label}
                </span>
              </div>
              <p className="text-[24px] font-semibold text-[#0d0d0d] mt-2.5 tracking-tight">
                {s.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Webhook Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {webhooks.map((webhook) => (
          <div
            key={webhook.id}
            className="border border-[#e8e8e8] rounded-[10px] bg-white p-5 shadow-card"
          >
            {/* Top row: Name + Status */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3 min-w-0">
                <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#fafafa] border border-[#f0f0f0]">
                  <Webhook className="size-[18px] text-[#737373]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-[14.5px] font-semibold text-[#0d0d0d]">
                      {webhook.name}
                    </h3>
                    <span
                      className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-[3px] rounded-[6px] text-[12px] ${
                        webhook.active
                          ? 'bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0]'
                          : 'bg-[#f5f5f5] text-[#a3a3a3] border border-[#e8e8e8]'
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          webhook.active ? 'bg-[#15803d]' : 'bg-[#a3a3a3]'
                        }`}
                      />
                      {webhook.active ? 'Активен' : 'Отключен'}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12.5px] text-[#a3a3a3] font-mono truncate">
                    {webhook.url}
                    <ExternalLink className="inline size-3 ml-1.5 text-[#d4d4d4]" />
                  </p>
                </div>
              </div>
            </div>

            {/* Event badges */}
            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {webhook.events.map((event) => (
                <span
                  key={event}
                  className="inline-flex items-center px-2.5 py-[3px] rounded-[6px] text-[11px] font-medium bg-[#f5f5f5] text-[#525252] border border-[#e8e8e8]"
                >
                  {event}
                </span>
              ))}
            </div>

            {/* Last delivery info */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3.5 pt-3.5 border-t border-[#f5f5f5] text-[12.5px] text-[#737373]">
              <div className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-[#a3a3a3]" />
                <span>{webhook.lastDelivery}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Activity className="size-3.5 text-[#a3a3a3]" />
                <span>
                  Успешность:{' '}
                  <span className="font-medium text-[#404040]">
                    {webhook.successRate}%
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <ArrowRight className="size-3.5 text-[#a3a3a3]" />
                <span>
                  Создан:{' '}
                  <span className="text-[#404040]">{webhook.created}</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3.5 pt-3.5 border-t border-[#f5f5f5]">
              <button
                onClick={() => toast.success('Тест отправлен')}
                className="inline-flex items-center gap-1.5 border border-[#e8e8e8] bg-white text-[#525252] px-3 py-1.5 rounded-[7px] text-[12.5px] font-medium hover:bg-[#f5f5f5] transition-colors cursor-pointer"
              >
                <Play className="size-3.5" />
                Тест
              </button>
              <button
                onClick={() => toast.info('Редактирование вебхука...')}
                className="inline-flex items-center gap-1.5 border border-[#e8e8e8] bg-white text-[#525252] px-3 py-1.5 rounded-[7px] text-[12.5px] font-medium hover:bg-[#f5f5f5] transition-colors cursor-pointer"
              >
                <Pencil className="size-3.5" />
                Изменить
              </button>
              <button
                onClick={() => setToggleId(webhook.id)}
                className={`inline-flex items-center gap-1.5 border px-3 py-1.5 rounded-[7px] text-[12.5px] font-medium transition-colors cursor-pointer ${
                  webhook.active
                    ? 'border-[#e8e8e8] bg-white text-[#737373] hover:bg-[#f5f5f5]'
                    : 'border-[#0d0d0d]/20 bg-[#0d0d0d]/5 text-[#404040]'
                }`}
              >
                <Power className="size-3.5" />
                {webhook.active ? 'Отключить' : 'Включить'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={toggleId !== null}
        onOpenChange={(open) => !open && setToggleId(null)}
        title={
          webhookToToggle?.active
            ? 'Отключить вебхук?'
            : 'Включить вебхук?'
        }
        description={
          webhookToToggle
            ? webhookToToggle.active
              ? `Вебхук «${webhookToToggle.name}» будет отключен. События больше не будут доставляться.`
              : `Вебхук «${webhookToToggle.name}» будет включен.`
            : ''
        }
        confirmLabel={webhookToToggle?.active ? 'Отключить' : 'Включить'}
        destructive={webhookToToggle?.active ?? true}
        onConfirm={() => {
          if (toggleId) {
            handleToggle(toggleId);
            toast.success(webhookToToggle?.active ? 'Вебхук отключен' : 'Вебхук включен');
            setToggleId(null);
          }
        }}
      />
    </div>
  );
}
