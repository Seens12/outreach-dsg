'use client';

import { useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Copy,
  FileText,
  Mail,
  MessageSquare,
  Eye,
  FlaskConical,
  Upload,
  MailOpen,
} from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';

type Category =
  | 'cold'
  | 'follow-up'
  | 'meeting'
  | 'objection'
  | 'manager';

interface Template {
  id: string;
  name: string;
  subject: string;
  category: Category;
  type: 'email' | 'sequence';
  usages: number;
  openRate: number;
  replyRate: number;
  lastModified: string;
}

const categoryLabels: Record<Category, string> = {
  cold: 'Холодный контакт',
  'follow-up': 'Follow-up',
  meeting: 'После встречи',
  objection: 'Ответ на возражение',
  manager: 'Передача менеджеру',
};

const categoryFilterKeys = ['all', 'cold', 'follow-up', 'meeting', 'objection', 'manager'] as const;
type FilterKey = (typeof categoryFilterKeys)[number];

const categoryFilterLabels: Record<FilterKey, string> = {
  all: 'Все',
  cold: 'Холодный контакт',
  'follow-up': 'Follow-up',
  meeting: 'После встречи',
  objection: 'Ответ на возражение',
  manager: 'Передача менеджеру',
};

const templates: Template[] = [
  {
    id: '1',
    name: 'Первый контакт — IT-компании',
    subject: 'Оптимизация инфраструктуры для {company}',
    category: 'cold',
    type: 'email',
    usages: 156,
    openRate: 68,
    replyRate: 23,
    lastModified: '12 янв 2025',
  },
  {
    id: '2',
    name: 'Реактивация контакта',
    subject: 'Новое решение для {company}',
    category: 'cold',
    type: 'sequence',
    usages: 203,
    openRate: 54,
    replyRate: 18,
    lastModified: '10 янв 2025',
  },
  {
    id: '3',
    name: 'Follow-up после демо',
    subject: 'Вопросы по нашему демо для {company}',
    category: 'follow-up',
    type: 'email',
    usages: 87,
    openRate: 72,
    replyRate: 34,
    lastModified: '8 янв 2025',
  },
  {
    id: '4',
    name: 'Второй follow-up — без ответа',
    subject: 'Остались ли у вас вопросы по {company}?',
    category: 'follow-up',
    type: 'email',
    usages: 64,
    openRate: 61,
    replyRate: 28,
    lastModified: '7 янв 2025',
  },
  {
    id: '5',
    name: 'После встречи — Итоги',
    subject: 'Итоги встречи и следующие шаги',
    category: 'meeting',
    type: 'email',
    usages: 42,
    openRate: 89,
    replyRate: 52,
    lastModified: '5 янв 2025',
  },
  {
    id: '6',
    name: 'Ответ на «Дорого»',
    subject: 'Стоимость vs ROI для {company}',
    category: 'objection',
    type: 'email',
    usages: 31,
    openRate: 66,
    replyRate: 41,
    lastModified: '3 янв 2025',
  },
  {
    id: '7',
    name: 'Ответ на «Уже есть решение»',
    subject: 'Альтернативный подход для {company}',
    category: 'objection',
    type: 'email',
    usages: 18,
    openRate: 58,
    replyRate: 33,
    lastModified: '2 янв 2025',
  },
  {
    id: '8',
    name: 'Передача менеджеру — теплый лид',
    subject: 'Квалифицированный лид из {company}',
    category: 'manager',
    type: 'email',
    usages: 9,
    openRate: 91,
    replyRate: 78,
    lastModified: '1 янв 2025',
  },
];

const topStats = [
  { label: 'Шаблонов', value: '8', icon: FileText },
  { label: 'Использований', value: '604', icon: Mail },
  { label: 'Ср. открытие', value: '67%', icon: MailOpen },
  { label: 'Ср. ответ', value: '34%', icon: MessageSquare },
];

export default function TemplatesView() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredTemplates =
    activeFilter === 'all'
      ? templates
      : templates.filter((t) => t.category === activeFilter);

  const templateToDelete = templates.find((t) => t.id === deleteId);

  return (
    <div className="space-y-6 p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
            Шаблоны писем
          </h1>
          <p className="text-sm text-[#737373] mt-0.5">
            Управление email-шаблонами для кампаний
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toast.info('A/B тестирование шаблонов...')}
            className="inline-flex items-center gap-1.5 border border-[#e8e8e8] bg-white text-[#525252] px-3.5 py-2 rounded-[8px] text-[12.5px] font-medium hover:bg-[#f5f5f5] transition-colors cursor-pointer"
          >
            <FlaskConical className="size-3.5" />
            A/B тест
          </button>
          <button
            onClick={() => toast.info('Импорт шаблонов...')}
            className="inline-flex items-center gap-1.5 border border-[#e8e8e8] bg-white text-[#525252] px-3.5 py-2 rounded-[8px] text-[12.5px] font-medium hover:bg-[#f5f5f5] transition-colors cursor-pointer"
          >
            <Upload className="size-3.5" />
            Импорт
          </button>
          <button
            onClick={() => toast.success('Шаблон создан')}
            className="inline-flex items-center gap-2 bg-[#0d0d0d] text-white px-4 py-2 rounded-[8px] text-[13px] font-medium hover:bg-[#262626] transition-colors cursor-pointer"
          >
            <Plus className="size-4" />
            Новый шаблон
          </button>
        </div>
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

      {/* Category pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categoryFilterKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors cursor-pointer ${
              activeFilter === key
                ? 'bg-[#0d0d0d] text-white'
                : 'bg-[#f5f5f5] text-[#525252] hover:bg-[#e8e8e8]'
            }`}
          >
            {categoryFilterLabels[key]}
          </button>
        ))}
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#a3a3a3] md:col-span-2 lg:col-span-3">
            <FileText className="size-10 mb-3 text-[#d4d4d4]" />
            <p className="text-[14px] font-medium text-[#525252]">
              Нет шаблонов
            </p>
            <p className="text-[12.5px] mt-1">
              В этой категории пока нет шаблонов
            </p>
          </div>
        ) : (
          filteredTemplates.map((template, index) => (
            <div
              key={template.id}
              className={`anim-fade-in border border-[#e8e8e8] rounded-[10px] bg-white p-5 shadow-card transition-shadow ${index === 0 ? 'md:col-span-2' : ''}`}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  {/* Name + badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-[14.5px] font-semibold text-[#0d0d0d]">
                      {template.name}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-[3px] rounded-[6px] text-[11px] font-medium bg-[#f5f5f5] text-[#525252] border border-[#e8e8e8]">
                      {categoryLabels[template.category]}
                    </span>
                    <span className="inline-flex items-center px-2 py-[3px] rounded-[6px] text-[11px] font-medium bg-[#fafafa] text-[#a3a3a3] border border-[#e8e8e8]">
                      {template.type === 'email' ? 'Email' : 'Sequence'}
                    </span>
                  </div>

                  {/* Subject */}
                  <p className="mt-2 text-[12.5px] text-[#525252] leading-relaxed">
                    {template.subject}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-[12px] text-[#737373]">
                    <div className="flex items-center gap-1.5">
                      <Mail className="size-3 text-[#a3a3a3]" />
                      <span>
                        <span className="font-medium text-[#404040]">
                          {template.usages}
                        </span>{' '}
                        использований
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="size-3 text-[#a3a3a3]" />
                      <span>
                        <span className="font-medium text-[#404040]">
                          {template.openRate}%
                        </span>{' '}
                        откр.
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="size-3 text-[#a3a3a3]" />
                      <span>
                        <span className="font-medium text-[#404040]">
                          {template.replyRate}%
                        </span>{' '}
                        ответов
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => toast.info('Редактирование шаблона...')}
                    className="inline-flex items-center gap-1.5 border border-[#e8e8e8] bg-white text-[#525252] px-3 py-1.5 rounded-[7px] text-[12px] font-medium hover:bg-[#f5f5f5] transition-colors cursor-pointer"
                  >
                    <Pencil className="size-3.5" />
                    Изменить
                  </button>
                  <button
                    onClick={() => toast.success('Шаблон дублирован')}
                    className="inline-flex items-center gap-1.5 border border-[#e8e8e8] bg-white text-[#525252] px-3 py-1.5 rounded-[7px] text-[12px] font-medium hover:bg-[#f5f5f5] transition-colors cursor-pointer"
                  >
                    <Copy className="size-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteId(template.id)}
                    className="inline-flex items-center gap-1.5 border border-[#e8e8e8] bg-white text-[#dc2626] px-3 py-1.5 rounded-[7px] text-[12px] font-medium hover:bg-[#dc2626]/5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Удалить шаблон?"
        description={
          templateToDelete
            ? `Шаблон «${templateToDelete.name}» будет удалён безвозвратно.`
            : 'Шаблон будет удалён безвозвратно.'
        }
        confirmLabel="Удалить"
        onConfirm={() => {
          if (deleteId) {
            toast.success('Шаблон удалён');
            setDeleteId(null);
          }
        }}
      />
    </div>
  );
}
