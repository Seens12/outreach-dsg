'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
  Send,
  Eye,
  MessageSquare,
  TrendingUp,
  Users,
  Calendar,
  Plus,
  MoreHorizontal,
  Flame,
  Bot,
  BarChart3,
  Target,
  Zap,
} from 'lucide-react';

type CampaignStatus = 'active' | 'draft' | 'completed';
type FilterKey = 'all' | 'active' | 'draft' | 'completed';

interface Campaign {
  id: number;
  name: string;
  status: CampaignStatus;
  sent: number;
  opened: number;
  replied: number;
  hotLeads: number;
  aiReplies: number;
  conversion: number;
  progress: number;
  startDate: string;
  endDate: string;
  audience: number;
}

const campaigns: Campaign[] = [
  {
    id: 1,
    name: 'B2B SaaS Q4 — IT Directors',
    status: 'active',
    sent: 1240,
    opened: 680,
    replied: 142,
    hotLeads: 38,
    aiReplies: 47,
    conversion: 11.4,
    progress: 68,
    startDate: '15 нояб 2024',
    endDate: '31 янв 2025',
    audience: 1820,
  },
  {
    id: 2,
    name: 'Enterprise Outreach — CFO',
    status: 'active',
    sent: 860,
    opened: 510,
    replied: 98,
    hotLeads: 22,
    aiReplies: 31,
    conversion: 11.6,
    progress: 42,
    startDate: '1 дек 2024',
    endDate: '15 фев 2025',
    audience: 2040,
  },
  {
    id: 3,
    name: 'Re-engagement — Q1',
    status: 'draft',
    sent: 0,
    opened: 0,
    replied: 0,
    hotLeads: 0,
    aiReplies: 0,
    conversion: 0,
    progress: 0,
    startDate: '10 фев 2025',
    endDate: '28 фев 2025',
    audience: 3100,
  },
  {
    id: 4,
    name: 'Product Launch — Autumn',
    status: 'completed',
    sent: 2500,
    opened: 1420,
    replied: 310,
    hotLeads: 87,
    aiReplies: 112,
    conversion: 12.4,
    progress: 100,
    startDate: '1 сен 2024',
    endDate: '30 нояб 2024',
    audience: 2500,
  },
  {
    id: 5,
    name: 'Startups Q4 — Seed',
    status: 'completed',
    sent: 1800,
    opened: 980,
    replied: 204,
    hotLeads: 56,
    aiReplies: 78,
    conversion: 11.3,
    progress: 100,
    startDate: '1 окт 2024',
    endDate: '15 дек 2024',
    audience: 1800,
  },
];

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'active', label: 'Активные' },
  { key: 'draft', label: 'Черновики' },
  { key: 'completed', label: 'Завершённые' },
];

const statusConfig: Record<
  CampaignStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  active: {
    label: 'Активная',
    bg: 'bg-[#f5f5f5]',
    text: 'text-[#404040]',
    dot: 'bg-[#0d0d0d]',
  },
  draft: {
    label: 'Черновик',
    bg: 'bg-[#f5f5f5]',
    text: 'text-[#737373]',
    dot: 'bg-[#a3a3a3]',
  },
  completed: {
    label: 'Завершена',
    bg: 'bg-[#f5f5f5]',
    text: 'text-[#404040]',
    dot: 'bg-[#0d0d0d]',
  },
};

function MiniStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center size-7 rounded-[7px] bg-[#f5f5f5]">
        <Icon className="size-3.5 text-[#525252]" />
      </div>
      <div>
        <p className="text-[11.5px] text-[#737373] leading-none">{label}</p>
        <p className="text-[14px] font-semibold text-[#0d0d0d] leading-tight mt-0.5">
          {typeof value === 'number' ? value.toLocaleString('ru-RU') : value}
        </p>
      </div>
    </div>
  );
}

export default function CampaignsView() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filtered =
    activeFilter === 'all'
      ? campaigns
      : campaigns.filter((c) => c.status === activeFilter);

  return (
    <div className="flex flex-col gap-6 text-[13.5px] text-[#171717] font-[family-name:var(--font-geist-sans)] p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
            Кампании
          </h1>
          <p className="text-[13.5px] text-[#737373] mt-0.5">
            Управление вашими email-кампаниями
          </p>
        </div>
      </div>

      {/* Filter row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors cursor-pointer ${
                activeFilter === f.key
                  ? 'bg-[#0d0d0d] text-white'
                  : 'bg-[#f5f5f5] text-[#525252] hover:bg-[#e8e8e8]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => toast.success('Кампания создана')}
          className="inline-flex items-center gap-2 bg-[#0d0d0d] text-white px-4 py-2 rounded-[8px] text-[13px] font-medium hover:bg-[#262626] transition-colors cursor-pointer"
        >
          <Plus className="size-4" />
          Новая кампания
        </button>
      </div>

      {/* Campaign cards */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#737373]">
            <BarChart3 className="size-10 mb-3 text-[#d4d4d4]" />
            <p className="text-[14px] font-medium">Нет кампаний</p>
            <p className="text-[12px] mt-1">
              В этой категории пока нет кампаний
            </p>
          </div>
        ) : (
          filtered.map((campaign) => {
            const status = statusConfig[campaign.status];
            const openRate =
              campaign.sent > 0
                ? ((campaign.opened / campaign.sent) * 100).toFixed(1)
                : '0.0';
            const replyRate =
              campaign.sent > 0
                ? ((campaign.replied / campaign.sent) * 100).toFixed(1)
                : '0.0';

            return (
              <div
                key={campaign.id}
                className="border border-[#e8e8e8] rounded-[10px] bg-white p-5 shadow-card hover:shadow-[0_1px_3px_0_rgba(0,0,0,0.06),0_1px_2px_-1px_rgba(0,0,0,0.06)] transition-shadow"
              >
                {/* Top row: name + status + actions */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <h3 className="text-[14.5px] font-semibold text-[#0d0d0d] truncate">
                      {campaign.name}
                    </h3>
                    <span
                      className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-medium ${status.bg} ${status.text}`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${status.dot}`}
                      />
                      {status.label}
                    </span>
                  </div>
                  <button
                    aria-label="Действия"
                    className="p-1.5 rounded-md text-[#a3a3a3] hover:text-[#525252] hover:bg-[#f5f5f5] transition-colors cursor-pointer"
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </div>

                {/* Audience + Sent */}
                <div className="flex items-center gap-5 mb-4 text-[12.5px] text-[#737373]">
                  <div className="flex items-center gap-1.5">
                    <Users className="size-3.5 text-[#a3a3a3]" />
                    <span>
                      Аудитория:{' '}
                      <span className="font-medium text-[#404040]">
                        {campaign.audience.toLocaleString('ru-RU')}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Send className="size-3.5 text-[#a3a3a3]" />
                    <span>
                      Отправлено:{' '}
                      <span className="font-medium text-[#404040]">
                        {campaign.sent.toLocaleString('ru-RU')}
                      </span>
                    </span>
                  </div>
                </div>

                {/* 4 Mini Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <MiniStat
                    icon={Eye}
                    label="Открыто"
                    value={`${openRate}%`}
                  />
                  <MiniStat
                    icon={MessageSquare}
                    label="Ответы"
                    value={`${replyRate}%`}
                  />
                  <MiniStat
                    icon={Flame}
                    label="Горячие лиды"
                    value={campaign.hotLeads}
                  />
                  <MiniStat
                    icon={Bot}
                    label="AI ответы"
                    value={campaign.aiReplies}
                  />
                </div>

                {/* Progress bar */}
                {campaign.status !== 'draft' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-[11.5px] mb-1.5">
                      <span className="text-[#a3a3a3]">Прогресс</span>
                      <span className="font-medium text-[#404040]">
                        {campaign.progress}%
                      </span>
                    </div>
                    <div className="w-full h-[3px] bg-[#f5f5f5] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0d0d0d] rounded-full transition-all"
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Meta row */}
                <div className="flex items-center justify-between text-[12px] text-[#737373] pt-3 border-t border-[#f5f5f5]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="size-3" />
                    <span>
                      {campaign.startDate} — {campaign.endDate}
                    </span>
                  </div>
                  {campaign.status === 'active' && (
                    <span className="inline-flex items-center gap-1 text-[#404040] font-medium">
                      <Zap className="size-3" />
                      В процессе
                    </span>
                  )}
                  {campaign.status === 'completed' && (
                    <span className="inline-flex items-center gap-1 text-[#404040] font-medium">
                      <Target className="size-3" />
                      Конверсия: {campaign.conversion}%
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
