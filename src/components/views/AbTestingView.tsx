'use client';

import { useState } from 'react';
import {
  Plus,
  Trophy,
  Mail,
  Eye,
  MessageSquare,
  BarChart3,
  FileEdit,
  FlaskConical,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { EmptyState } from '@/components/shared/EmptyState';

type TestStatus = 'Активный' | 'Завершённый' | 'Черновик';

interface AbTest {
  id: string;
  name: string;
  description: string;
  status: TestStatus;
  completion: number;
  variantA: { openRate: number; replyRate: number };
  variantB: { openRate: number; replyRate: number };
  winner: 'A' | 'B' | null;
}

const mockTests: AbTest[] = [
  {
    id: '1',
    name: 'Тема письма: Персонализация vs Директ',
    description: 'Сравнение персонализированной темы с прямой для холодных рассылок',
    status: 'Активный',
    completion: 67,
    variantA: { openRate: 42.3, replyRate: 8.1 },
    variantB: { openRate: 38.7, replyRate: 6.4 },
    winner: null,
  },
  {
    id: '2',
    name: 'CTA: Кнопка vs Ссылка',
    description: 'Тестирование эффективности CTA-элементов в письмах',
    status: 'Завершённый',
    completion: 100,
    variantA: { openRate: 35.2, replyRate: 5.8 },
    variantB: { openRate: 35.2, replyRate: 9.2 },
    winner: 'B',
  },
  {
    id: '3',
    name: 'Время отправки: Утро vs День',
    description: 'Определение оптимального времени отправки для целевой аудитории',
    status: 'Черновик',
    completion: 0,
    variantA: { openRate: 0, replyRate: 0 },
    variantB: { openRate: 0, replyRate: 0 },
    winner: null,
  },
];

const statusStyles: Record<TestStatus, string> = {
  Активный: 'bg-[#2563eb]/10 text-[#2563eb] border-[#2563eb]/20',
  'Завершённый': 'bg-[#16a34a]/10 text-[#16a34a] border-[#16a34a]/20',
  Черновик: 'bg-[#fafafa] text-[#a3a3a3] border-[#e8e8e8]',
};

export default function AbTestingView() {
  const [tests] = useState<AbTest[]>(mockTests);

  return (
    <div className="space-y-6 p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">A/B Тесты</h1>
          <p className="text-sm text-[#737373]">Сравнение вариантов email</p>
        </div>
        <Button onClick={() => toast.success('Тест создан')} className="mt-3 sm:mt-0 bg-[#0d0d0d] hover:bg-[#262626] text-white">
          <Plus className="size-4" />
          Новый тест
        </Button>
      </div>

      {/* Test Cards */}
      <div className="grid gap-4">
        {tests.length === 0 ? (
          <EmptyState
            icon={FlaskConical}
            title="Нет A/B тестов"
            description="Создайте первый A/B тест для сравнения вариантов"
            action={{ label: 'Новый тест', onClick: () => toast.success('Тест создан') }}
          />
        ) : (
        <>
        {tests.map((test) => (
          <Card
            key={test.id}
            className="border-[#e8e8e8] rounded-[10px] py-4"
          >
            <CardContent className="space-y-4 p-4">
              {/* Title + Status */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#fafafa]">
                    <FlaskConical className="size-4 text-[#737373]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#0d0d0d]">{test.name}</h3>
                    <p className="mt-0.5 text-xs text-[#737373]">{test.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {test.winner && (
                    <Badge className="bg-[#16a34a]/10 text-[#16a34a] border-[#16a34a]/20">
                      <Trophy className="size-3" />
                      Победитель: {test.winner}
                    </Badge>
                  )}
                  <Badge className={statusStyles[test.status]}>
                    {test.status}
                  </Badge>
                </div>
              </div>

              {/* Progress Bar */}
              {test.status !== 'Черновик' && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#a3a3a3]">Прогресс теста</span>
                    <span className="font-medium text-[#0d0d0d]">{test.completion}%</span>
                  </div>
                  <Progress value={test.completion} className="h-1.5 bg-[#f5f5f5]" />
                </div>
              )}

              {/* Variant Comparison */}
              {test.status !== 'Черновик' ? (
                <div className="grid grid-cols-2 gap-3">
                  {/* Variant A */}
                  <div
                    className={`rounded-lg border p-3 ${
                      test.winner === 'A'
                        ? 'border-[#16a34a]/30 bg-[#16a34a]/5'
                        : 'border-[#f5f5f5] bg-[#fafafa]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-xs font-semibold text-[#0d0d0d]">Вариант A</span>
                      {test.winner === 'A' && (
                        <Trophy className="size-3 text-[#16a34a]" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Eye className="size-3 text-[#a3a3a3]" />
                        <span className="text-[#737373]">Open rate</span>
                        <span className="ml-auto font-medium text-[#0d0d0d]">{test.variantA.openRate}%</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <MessageSquare className="size-3 text-[#a3a3a3]" />
                        <span className="text-[#737373]">Reply rate</span>
                        <span className="ml-auto font-medium text-[#0d0d0d]">{test.variantA.replyRate}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Variant B */}
                  <div
                    className={`rounded-lg border p-3 ${
                      test.winner === 'B'
                        ? 'border-[#16a34a]/30 bg-[#16a34a]/5'
                        : 'border-[#f5f5f5] bg-[#fafafa]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-xs font-semibold text-[#0d0d0d]">Вариант B</span>
                      {test.winner === 'B' && (
                        <Trophy className="size-3 text-[#16a34a]" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Eye className="size-3 text-[#a3a3a3]" />
                        <span className="text-[#737373]">Open rate</span>
                        <span className="ml-auto font-medium text-[#0d0d0d]">{test.variantB.openRate}%</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <MessageSquare className="size-3 text-[#a3a3a3]" />
                        <span className="text-[#737373]">Reply rate</span>
                        <span className="ml-auto font-medium text-[#0d0d0d]">{test.variantB.replyRate}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-lg border border-dashed border-[#e8e8e8] p-4 text-center">
                  <FileEdit className="size-4 text-[#a3a3a3]" />
                  <p className="text-xs text-[#a3a3a3]">
                    Настройте варианты A и B чтобы запустить тест
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        </>
        )}
      </div>
    </div>
  );
}
