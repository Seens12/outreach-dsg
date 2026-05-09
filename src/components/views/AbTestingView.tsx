'use client';

import { useState } from 'react';
import {
  Plus,
  Trophy,
  Eye,
  MessageSquare,
  MousePointerClick,
  FlaskConical,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  BarChart3,
} from 'lucide-react';
import { toast } from 'sonner';
import { EmptyState } from '@/components/shared/EmptyState';

type TestStatus = 'active' | 'completed' | 'draft';

interface AbTest {
  id: string;
  title: string;
  hypothesis: string;
  campaign: string;
  contacts: number;
  startDate: string;
  status: TestStatus;
  progress: number;
  leader: 'A' | 'B' | null;
  variantA: {
    subject: string;
    preview: string;
    openRate: number;
    clickRate: number;
    replyRate: number;
  };
  variantB: {
    subject: string;
    preview: string;
    openRate: number;
    clickRate: number;
    replyRate: number;
  };
}

const mockTests: AbTest[] = [
  {
    id: '1',
    title: 'Тема: Встреча vs Демо',
    hypothesis:
      'Персонализированная тема письма с упоминанием встречи повышает открываемость по сравнению с邀请 на демо',
    campaign: 'IT Directors Q4',
    contacts: 420,
    startDate: '12 янв 2025',
    status: 'active',
    progress: 94.7,
    leader: 'B',
    variantA: {
      subject: 'Встреча по автоматизации для {company}',
      preview: 'Здравствуйте, {name}! Хотел бы обсудить...',
      openRate: 42.3,
      clickRate: 12.1,
      replyRate: 8.4,
    },
    variantB: {
      subject: 'Демо: как {company} ускорит рост',
      preview: 'За 15 минут покажем, как сэкономить...',
      openRate: 51.2,
      clickRate: 18.6,
      replyRate: 13.1,
    },
  },
  {
    id: '2',
    title: 'CTA: Кнопка vs Ссылка',
    hypothesis: 'Кнопка CTA в письме генерирует больше кликов, чем текстовая ссылка',
    campaign: 'Enterprise Outreach',
    contacts: 310,
    startDate: '5 янв 2025',
    status: 'active',
    progress: 67.3,
    leader: 'B',
    variantA: {
      subject: 'Предложение для {company}',
      preview: 'Готовы обсудить варианты сотрудничества...',
      openRate: 38.7,
      clickRate: 9.2,
      replyRate: 6.8,
    },
    variantB: {
      subject: 'Предложение для {company}',
      preview: 'Готовы обсудить варианты сотрудничества...',
      openRate: 39.1,
      clickRate: 15.8,
      replyRate: 10.2,
    },
  },
  {
    id: '3',
    title: 'Длина письма: Короткое vs Полное',
    hypothesis: 'Короткое письмо (3-4 предложения) получает больше ответов, чем полное (10+ предложений)',
    campaign: 'Startup Q1',
    contacts: 0,
    startDate: '—',
    status: 'draft',
    progress: 0,
    leader: null,
    variantA: {
      subject: 'Быстрый вопрос для {company}',
      preview: 'Здравствуйте, {name}! У меня один быстрый вопрос...',
      openRate: 0,
      clickRate: 0,
      replyRate: 0,
    },
    variantB: {
      subject: 'Как {company} решает проблему X',
      preview: 'Анализируя рынок, мы заметили, что компании...',
      openRate: 0,
      clickRate: 0,
      replyRate: 0,
    },
  },
];

const topStats = [
  { label: 'Активных', value: '3', icon: FlaskConical },
  { label: 'Завершённых', value: '4', icon: CheckCircle2 },
  { label: 'Средний прирост', value: '+19%', icon: TrendingUp },
  { label: 'Лучший результат', value: '+31%', icon: Trophy },
];

const statusConfig: Record<TestStatus, { label: string; className: string }> = {
  active: {
    label: 'Активный',
    className: 'bg-[#dcfce7] text-[#15803d] border-[#bbf7d0]',
  },
  completed: {
    label: 'Завершён',
    className: 'bg-[#f5f5f5] text-[#525252] border-[#e8e8e8]',
  },
  draft: {
    label: 'Черновик',
    className: 'bg-[#dbeafe] text-[#3b82f6] border-[#bfdbfe]',
  },
};

function VariantBlock({
  label,
  variant,
  isLeader,
}: {
  label: string;
  variant: AbTest['variantA'];
  isLeader: boolean;
}) {
  return (
    <div
      className={`rounded-[10px] border p-4 ${
        isLeader
          ? 'border-[#0d0d0d]/20 bg-[#0d0d0d]/[0.03]'
          : 'border-[#f0f0f0] bg-[#fafafa]'
      }`}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-[13px] font-semibold text-[#0d0d0d]">
          Вариант {label}
        </span>
        {isLeader && (
          <span className="inline-flex items-center gap-1 px-2 py-[2px] rounded-full text-[10px] bg-[#f5f5f5] text-[#404040] border border-[#e8e8e8]">
            <Trophy className="size-3" />
            Лидер
          </span>
        )}
      </div>
      {variant.subject ? (
        <>
          <p className="text-[12.5px] font-medium text-[#0d0d0d] leading-snug">
            {variant.subject}
          </p>
          <p className="text-[12px] text-[#737373] mt-1 leading-relaxed line-clamp-2">
            {variant.preview}
          </p>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#f0f0f0]">
            <div className="flex items-center gap-1.5 text-[11.5px] text-[#737373]">
              <Eye className="size-3 text-[#a3a3a3]" />
              <span>
                Open:{' '}
                <span className="font-medium text-[#404040]">
                  {variant.openRate}%
                </span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11.5px] text-[#737373]">
              <MousePointerClick className="size-3 text-[#a3a3a3]" />
              <span>
                Click:{' '}
                <span className="font-medium text-[#404040]">
                  {variant.clickRate}%
                </span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11.5px] text-[#737373]">
              <MessageSquare className="size-3 text-[#a3a3a3]" />
              <span>
                Reply:{' '}
                <span className="font-medium text-[#404040]">
                  {variant.replyRate}%
                </span>
              </span>
            </div>
          </div>
        </>
      ) : (
        <p className="text-[12px] text-[#a3a3a3]">Вариант не настроен</p>
      )}
    </div>
  );
}

export default function AbTestingView() {
  const [tests] = useState<AbTest[]>(mockTests);

  return (
    <div className="space-y-6 p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
            A/B Тестирование
          </h1>
          <p className="text-sm text-[#737373] mt-0.5">
            Сравнение вариантов для оптимизации конверсии
          </p>
        </div>
        <button
          onClick={() => toast.success('Тест создан')}
          className="inline-flex items-center gap-2 bg-[#0d0d0d] text-white px-4 py-2 rounded-[8px] text-[13px] font-medium hover:bg-[#262626] transition-colors cursor-pointer"
        >
          <Plus className="size-4" />
          Новый тест
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {topStats.map((s) => {
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

      {/* Active Tests */}
      <div>
        <h2 className="text-[15px] font-semibold text-[#0d0d0d] mb-3">
          Активные тесты
        </h2>
        <div className="grid gap-4">
          {tests.length === 0 ? (
            <EmptyState
              icon={FlaskConical}
              title="Нет A/B тестов"
              description="Создайте первый тест для сравнения вариантов"
              action={{
                label: 'Новый тест',
                onClick: () => toast.success('Тест создан'),
              }}
            />
          ) : (
            tests.map((test) => {
              const st = statusConfig[test.status];
              return (
                <div
                  key={test.id}
                  className="border border-[#e8e8e8] rounded-[10px] bg-white p-5 shadow-card"
                >
                  {/* Title row */}
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-[15px] font-semibold text-[#0d0d0d]">
                          {test.title}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-[3px] rounded-full text-[11px] font-medium border ${st.className}`}
                        >
                          {st.label}
                        </span>
                      </div>
                      <p className="text-[12.5px] text-[#737373] mt-1.5 leading-relaxed max-w-2xl">
                        {test.hypothesis}
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  {test.status !== 'draft' && (
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex-1 h-[3px] bg-[#f5f5f5] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0d0d0d] rounded-full transition-all"
                          style={{ width: `${test.progress}%` }}
                        />
                      </div>
                      <span className="text-[12px] text-[#525252] font-medium shrink-0">
                        {test.progress}%{' '}
                        {test.leader && (
                          <span className="text-[#a3a3a3]">
                            Лидер: {test.leader}
                          </span>
                        )}
                      </span>
                    </div>
                  )}

                  {/* Campaign info */}
                  {test.status !== 'draft' && (
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3 pt-3 border-t border-[#f5f5f5] text-[12px] text-[#737373]">
                      <div className="flex items-center gap-1.5">
                        <BarChart3 className="size-3.5 text-[#a3a3a3]" />
                        <span>
                          Кампания:{' '}
                          <span className="text-[#404040] font-medium">
                            {test.campaign}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="size-3.5 text-[#a3a3a3]" />
                        <span>
                          <span className="text-[#404040] font-medium">
                            {test.contacts}
                          </span>{' '}
                          контактов
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-[#a3a3a3]" />
                        <span>Старт: {test.startDate}</span>
                      </div>
                    </div>
                  )}

                  {/* Variants */}
                  {test.status !== 'draft' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      <VariantBlock
                        label="A"
                        variant={test.variantA}
                        isLeader={test.leader === 'A'}
                      />
                      <VariantBlock
                        label="B"
                        variant={test.variantB}
                        isLeader={test.leader === 'B'}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 mt-4 rounded-[10px] border border-dashed border-[#e8e8e8] p-4 text-[12.5px] text-[#a3a3a3]">
                      <Clock className="size-4 shrink-0" />
                      <span>Настройте варианты A и B чтобы запустить тест</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
