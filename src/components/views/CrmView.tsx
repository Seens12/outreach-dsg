'use client';

import { useState } from 'react';
import {
  Database,
  RefreshCw,
  Users,
  Handshake,
  Clock,
  CheckCircle2,
  XCircle,
  Link2,
  Settings,
  ArrowRight,
  Crown,
  Star,
  Shield,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';

const stats = [
  { label: 'Активных', value: '1', icon: Zap },
  { label: 'Контактов', value: '847', icon: Users },
  { label: 'Сделки', value: '124', icon: Handshake },
  { label: 'Последняя синхр.', value: '5 мин назад', icon: Clock },
];

interface CrmFeature {
  text: string;
}

interface CrmCard {
  id: string;
  name: string;
  description: string;
  connected: boolean;
  badge: string;
  badgeType: 'popular' | 'premium' | 'none';
  contacts: number;
  deals: number;
  features: CrmFeature[];
}

const crmCards: CrmCard[] = [
  {
    id: '1',
    name: 'amoCRM',
    description: 'Полная двусторонняя синхронизация контактов, сделок и воронок',
    connected: true,
    badge: 'Популярная',
    badgeType: 'popular',
    contacts: 847,
    deals: 124,
    features: [
      { text: 'Двусторонняя синхронизация' },
      { text: 'Автоматическое создание сделок' },
      { text: 'Обновление статусов в реальном времени' },
      { text: 'Импорт/экспорт контактов' },
    ],
  },
  {
    id: '2',
    name: 'Bitrix24',
    description: 'Интеграция с CRM-системой Битрикс24 для обмена лидами и задачами',
    connected: false,
    badge: '',
    badgeType: 'none',
    contacts: 0,
    deals: 0,
    features: [
      { text: 'Синхронизация лидов' },
      { text: 'Создание задач из писем' },
      { text: 'Отслеживание активности' },
    ],
  },
  {
    id: '3',
    name: 'HubSpot',
    description: 'Интеграция с HubSpot CRM для маркетинга и продаж',
    connected: false,
    badge: 'Премиум',
    badgeType: 'premium',
    contacts: 0,
    deals: 0,
    features: [
      { text: 'Контакт-менеджмент' },
      { text: 'Пайплайн сделок' },
      { text: 'Email-трекинг' },
      { text: 'Веб-хуки и автоматизации' },
    ],
  },
  {
    id: '4',
    name: 'Pipedrive',
    description: 'Управление сделками и контактами через Pipedrive API',
    connected: false,
    badge: 'Премиум',
    badgeType: 'premium',
    contacts: 0,
    deals: 0,
    features: [
      { text: 'Синхронизация сделок' },
      { text: 'Управление контактами' },
      { text: 'Трекинг активности' },
    ],
  },
];

function CrmIconPlaceholder({ name }: { name: string }) {
  const firstLetter = name[0];
  return (
    <div className="flex size-12 shrink-0 items-center justify-center rounded-[10px] bg-[#f5f5f5] border border-[#e8e8e8]">
      <span className="text-[18px] font-bold text-[#404040]">{firstLetter}</span>
    </div>
  );
}

export default function CrmView() {
  const [cards, setCards] = useState<CrmCard[]>(crmCards);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const cardToDisconnect = cards.find((c) => c.id === confirmId);

  const connectedCard = cards.find((c) => c.connected);
  const availableCards = cards.filter((c) => !c.connected);

  return (
    <div className="space-y-6 p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
          CRM интеграции
        </h1>
        <p className="text-sm text-[#737373] mt-0.5">
          Подключите вашу CRM-систему для автоматической синхронизации контактов, сделок и воронок
        </p>
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

      {/* Connected Section */}
      {connectedCard && (
        <section>
          <h2 className="text-[15px] font-semibold text-[#0d0d0d] mb-3">
            Подключенные
          </h2>
          <div className="border border-[#e8e8e8] rounded-[10px] bg-white p-5 shadow-card">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <CrmIconPlaceholder name={connectedCard.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-[15px] font-semibold text-[#0d0d0d]">
                      {connectedCard.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-[3px] rounded-[6px] text-[12px] bg-[#dcfce7] text-[#22c55e] border border-[#bbf7d0]">
                      <CheckCircle2 className="size-3" />
                      Подключено
                    </span>
                  </div>
                  <p className="text-[12.5px] text-[#737373] mt-1">
                    {connectedCard.description}
                  </p>
                  <div className="flex items-center gap-5 mt-3">
                    <div className="flex items-center gap-1.5 text-[12.5px] text-[#525252]">
                      <Users className="size-3.5 text-[#a3a3a3]" />
                      <span>
                        <span className="font-semibold text-[#0d0d0d]">
                          {connectedCard.contacts}
                        </span>{' '}
                        контактов
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[12.5px] text-[#525252]">
                      <Handshake className="size-3.5 text-[#a3a3a3]" />
                      <span>
                        <span className="font-semibold text-[#0d0d0d]">
                          {connectedCard.deals}
                        </span>{' '}
                        сделок
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() =>
                    toast.success('Синхронизация запущена...')
                  }
                  className="inline-flex items-center gap-1.5 border border-[#e8e8e8] bg-white text-[#525252] px-3.5 py-2 rounded-[7px] text-[12.5px] font-medium hover:bg-[#f5f5f5] transition-colors cursor-pointer"
                >
                  <RefreshCw className="size-3.5" />
                  Синхронизировать
                </button>
                <button
                  onClick={() => toast.info('Открытие настроек маппинга...')}
                  className="inline-flex items-center gap-1.5 border border-[#e8e8e8] bg-white text-[#525252] px-3.5 py-2 rounded-[7px] text-[12.5px] font-medium hover:bg-[#f5f5f5] transition-colors cursor-pointer"
                >
                  <Settings className="size-3.5" />
                  Маппинг
                </button>
                <button
                  onClick={() => setConfirmId(connectedCard.id)}
                  className="inline-flex items-center gap-1.5 border border-[#fda4af]/30 bg-[#fce7f3]/50 text-[#e11d48] px-3.5 py-2 rounded-[7px] text-[12.5px] font-medium hover:bg-[#fce7f3] transition-colors cursor-pointer"
                >
                  <XCircle className="size-3.5" />
                  Отключить
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Available Integrations */}
      <section>
        <h2 className="text-[15px] font-semibold text-[#0d0d0d] mb-3">
          Доступные интеграции
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {availableCards.map((crm) => (
            <div
              key={crm.id}
              className="border border-[#e8e8e8] rounded-[10px] bg-white p-5 shadow-card flex flex-col"
            >
              {/* Icon + Name + Badge */}
              <div className="flex items-start gap-3">
                <CrmIconPlaceholder name={crm.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-[14.5px] font-semibold text-[#0d0d0d]">
                      {crm.name}
                    </h3>
                    {crm.badgeType === 'premium' && (
                      <span className="inline-flex items-center gap-1 px-2 py-[2px] rounded-full text-[10px] font-semibold bg-[#f5f5f5] text-[#525252] border border-[#e8e8e8]">
                        <Crown className="size-3" />
                        Премиум
                      </span>
                    )}
                    {crm.badgeType === 'popular' && (
                      <span className="inline-flex items-center gap-1 px-2 py-[2px] rounded-full text-[10px] font-semibold bg-[#f5f5f5] text-[#525252] border border-[#e8e8e8]">
                        <Star className="size-3" />
                        {crm.badge}
                      </span>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1 mt-1 px-2 py-[2px] rounded-full text-[10px] font-medium bg-[#fafafa] text-[#a3a3a3] border border-[#e8e8e8]">
                    Не подключено
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[12.5px] text-[#737373] mt-3 leading-relaxed">
                {crm.description}
              </p>

              {/* Features */}
              <ul className="mt-3 space-y-1.5 flex-1">
                {crm.features.map((f) => (
                  <li
                    key={f.text}
                    className="flex items-center gap-2 text-[12.5px] text-[#525252]"
                  >
                    <CheckCircle2 className="size-3.5 text-[#a3a3a3] shrink-0" />
                    {f.text}
                  </li>
                ))}
              </ul>

              {/* Connect button */}
              <button
                onClick={() => {
                  if (crm.badgeType === 'premium') {
                    toast.info('Доступно на Premium-плане');
                  } else {
                    toast.success(`Подключение к ${crm.name}...`);
                  }
                }}
                className={`mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer ${
                  crm.badgeType === 'premium'
                    ? 'border border-[#e8e8e8] bg-[#f5f5f5] text-[#525252] hover:bg-[#e8e8e8]'
                    : 'bg-[#0d0d0d] text-white hover:bg-[#262626]'
                }`}
              >
                <Link2 className="size-3.5" />
                {crm.badgeType === 'premium' ? 'Узнать больше' : 'Подключить'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <ConfirmDialog
        open={confirmId !== null}
        onOpenChange={(open) => !open && setConfirmId(null)}
        title="Отключить CRM?"
        description={
          cardToDisconnect
            ? `Интеграция с «${cardToDisconnect.name}» будет отключена. Все несинхронизированные данные могут быть потеряны.`
            : 'Интеграция будет отключена.'
        }
        confirmLabel="Отключить"
        onConfirm={() => {
          if (confirmId) {
            setCards((prev) =>
              prev.map((c) =>
                c.id === confirmId
                  ? { ...c, connected: false, contacts: 0, deals: 0 }
                  : c
              )
            );
            toast.success('CRM отключена');
            setConfirmId(null);
          }
        }}
      />
    </div>
  );
}
