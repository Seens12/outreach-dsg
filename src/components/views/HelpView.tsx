'use client'

import { useState } from 'react'
import {
  Rocket,
  Bot,
  Puzzle,
  Clock,
  BookOpen,
  ChevronRight,
  HelpCircle,
  Search,
  Lightbulb,
  FileText,
  Headphones,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface QuickStartCard {
  icon: typeof Rocket
  title: string
  steps: number
  time: string
  description: string
}

interface FaqItem {
  question: string
  answer: string
}

interface DocArticle {
  id: string
  title: string
  readTime: string
  date: string
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const quickStartCards = [
  {
    icon: Rocket,
    title: 'Быстрый старт',
    steps: 5,
    time: '15 мин',
    description: 'Настройте платформу и отправьте первое письмо за 5 простых шагов.',
    iconBg: 'bg-[#dbeafe]',
    iconColor: 'text-[#3b82f6]',
  },
  {
    icon: Bot,
    title: 'AI-агента',
    steps: 7,
    time: '25 мин',
    description: 'Подключите AI-ассистента для автоматической обработки ответов.',
    iconBg: 'bg-[#ede9fe]',
    iconColor: 'text-[#7c3aed]',
  },
  {
    icon: Puzzle,
    title: 'Интеграции',
    steps: 4,
    time: '10 мин',
    description: 'Настройте интеграции с CRM, календарём и другими сервисами.',
    iconBg: 'bg-[#dcfce7]',
    iconColor: 'text-[#22c55e]',
  },
]

const faqItems: FaqItem[] = [
  {
    question: 'Как настроить DNS для домена?',
    answer:
      'Перейдите в раздел "Домены", нажмите "Настроить DNS" рядом с нужным доменом. Система автоматически сгенерирует SPF, DKIM, DMARC и MX записи. Скопируйте их и добавьте на стороне вашего регистратора. После применения нажмите "Проверить все" для верификации. Процесс обычно занимает от 1 до 24 часов.',
  },
  {
    question: 'Сколько писем можно отправлять в день?',
    answer:
      'Количество зависит от прогрева домена. Новый домен начинается с 10 писем/день и постепенно увеличивается до 200+ после полного прогрева (21 день). Рекомендуемое расписание прогрева: неделя 1 — 10/день, неделя 2 — 30/день, неделя 3 — 80/день, далее — до лимита домена.',
  },
  {
    question: 'Как работает AI-агент?',
    answer:
      'AI-агент анализирует входящие ответы, определяет интент (заинтересован, отказ, вопрос) и формирует персонализированный ответ на основе базы знаний. Поддерживаются режимы: полностью автоматический, с ручным подтверждением и обучающий. Средняя уверенность ответов — 90%+.',
  },
  {
    question: 'Как подключить CRM?',
    answer:
      'Перейдите в раздел "Интеграции", выберите CRM (amoCRM, Bitrix24, HubSpot). Введите API-ключ и URL вашего CRM. Система автоматически синхронизирует контакты, лиды и статусы. Поддерживается двусторонняя синхронизация в реальном времени.',
  },
  {
    question: 'Что такое "Режим обучения"?',
    answer:
      'Режим обучения позволяет AI-агенту наблюдать за вашими ответами и учиться на них. В этом режиме AI предлагает черновики ответов, но не отправляет их автоматически. Вы можете корректировать ответы, и AI учится на ваших правках. Рекомендуем использовать 1-2 недели перед переходом в автоматический режим.',
  },
  {
    question: 'Как импортировать контакты из CSV?',
    answer:
      'В разделе "Контакты" нажмите "Импорт", выберите CSV-файл. Система автоматически определит столбцы (имя, email, компания, должность). Поддерживается импорт до 10 000 контактов за раз. Рекомендуемый формат: UTF-8 с разделителем-запятой.',
  },
  {
    question: 'Какие гарантии доставки писем?',
    answer:
      'Мы гарантируем доставку в папку "Входящие" (не "Спам") при соблюдении условий: верифицированный домен с корректными DNS, завершённый прогрев ящика, персонализированный контент. При нарушении этих условийdelivery rate составляет 85-95%. Наша техподдержка помогает с whitelisting у крупных провайдеров.',
  },
  {
    question: 'Как отменить подписку?',
    answer:
      'Перейдите в раздел "Биллинг", нажмите "Управление подпиской", затем "Отменить". Доступ сохраняется до конца оплаченного периода. Все данные можно экспортировать в течение 30 дней после отмены. Подписку можно возобновить в любой момент без потери данных.',
  },
]

const docArticles: DocArticle[] = [
  {
    id: '1',
    title: 'Полное руководство по холодным рассылкам',
    readTime: '12 мин',
    date: '15 янв 2025',
  },
  {
    id: '2',
    title: 'Настройка SPF, DKIM и DMARC — подробная инструкция',
    readTime: '8 мин',
    date: '12 янв 2025',
  },
  {
    id: '3',
    title: 'Лучшие практики для повышения Open Rate',
    readTime: '10 мин',
    date: '10 янв 2025',
  },
  {
    id: '4',
    title: 'Как AI-персонализация увеличивает конверсию',
    readTime: '6 мин',
    date: '8 янв 2025',
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HelpView() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFaq = faqItems.filter((item) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
  })

  const filteredDocs = docArticles.filter((item) => {
    if (!searchQuery) return true
    return item.title.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <HelpCircle className="w-6 h-6 text-[#525252]" />
          <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
            Центр помощи
          </h1>
        </div>
        <p className="text-[13px] text-[#737373]">
          Гайды, FAQ и документация для эффективной работы с OutreachAI
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a3a3]" />
        <input
          type="text"
          placeholder="Поиск по статьям и FAQ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-[10px] border border-[#e8e8e8] bg-white text-sm text-[#171717] outline-none focus:border-[#737373] transition-colors placeholder:text-[#a3a3a3]"
        />
      </div>

      {/* Quick Start section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-[#525252]" />
          <h2 className="text-[14px] font-semibold text-[#171717]">Быстрый старт</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickStartCards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card p-5 hover:border-[#d4d4d4] transition-colors cursor-pointer group"
                onClick={() => toast.info('Открыт гайд: ' + card.title)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-[8px] ${card.iconBg} group-hover:opacity-80 transition-colors shrink-0`}>
                    <Icon className={`w-4 h-4 ${card.iconColor}`} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-[13px] font-semibold text-[#0d0d0d]">{card.title}</div>
                    <div className="text-[11px] text-[#a3a3a3] leading-tight">{card.steps} шагов</div>
                  </div>
                </div>
                <p className="text-[12.5px] text-[#737373] leading-relaxed mb-3">
                  {card.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-[#f5f5f5]">
                  <div className="flex items-center gap-1 text-[12px] text-[#a3a3a3]">
                    <Clock className="w-3 h-3" />
                    {card.time}
                  </div>
                  <span className="text-[12px] text-[#737373] font-medium group-hover:text-[#0d0d0d] transition-colors flex items-center gap-0.5">
                    Начать
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* FAQ section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="w-4 h-4 text-[#525252]" />
          <h2 className="text-[14px] font-semibold text-[#171717]">Часто задаваемые вопросы</h2>
        </div>
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {filteredFaq.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="px-5 border-b border-[#e8e8e8] last:border-b-0"
              >
                <AccordionTrigger className="text-[13px] font-medium text-[#171717] hover:no-underline py-4 text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[13px] text-[#525252] leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Documentation section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-[#525252]" />
          <h2 className="text-[14px] font-semibold text-[#171717]">Документация</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredDocs.map((article) => (
            <div
              key={article.id}
              className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card p-4 hover:border-[#d4d4d4] transition-colors cursor-pointer group flex items-center gap-3"
              onClick={() => toast.info('Открыта статья: ' + article.title)}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#fafafa] group-hover:bg-[#f5f5f5] transition-colors shrink-0">
                <FileText className="w-4 h-4 text-[#525252]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-[#171717] leading-snug">
                  {article.title}
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-[12px] text-[#a3a3a3]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                  <span>{article.date}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#d4d4d4] group-hover:text-[#a3a3a3] transition-colors shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Contact support */}
      <div className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card p-5 flex items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-[10px] bg-[#fafafa] shrink-0">
          <Headphones className="w-5 h-5 text-[#525252]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-semibold text-[#171717]">
            Не нашли ответ?
          </div>
          <div className="text-[13px] text-[#737373] mt-0.5">
            Наша служба поддержки ответит в течение 2 часов в рабочее время
          </div>
        </div>
        <Button
          className="rounded-[10px] bg-[#0d0d0d] hover:bg-[#262626] text-white flex-shrink-0"
          onClick={() => toast.success('Обращение отправлено в поддержку')}
        >
          Написать в поддержку
        </Button>
      </div>
    </div>
  )
}
