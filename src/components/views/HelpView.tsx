'use client'

import { useState } from 'react'
import {
  Search,
  Rocket,
  Megaphone,
  Puzzle,
  BarChart3,
  Shield,
  FileCode,
  ChevronRight,
  Headphones,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'

const quickLinks = [
  { icon: Rocket, title: 'Начало работы', desc: 'Быстрый старт с платформой' },
  { icon: Megaphone, title: 'Кампании', desc: 'Создание и управление' },
  { icon: Puzzle, title: 'Интеграции', desc: 'Подключение сервисов' },
  { icon: BarChart3, title: 'Аналитика', desc: 'Отчёты и метрики' },
  { icon: Shield, title: 'Безопасность', desc: 'Защита данных' },
  { icon: FileCode, title: 'API документация', desc: 'Для разработчиков' },
]

const faqItems = [
  {
    question: 'Как создать первую кампанию?',
    answer:
      'Перейдите в раздел "Кампании", нажмите "Новая кампания", выберите тип (холодные письма, follow-up или nurturing), настройте аудиторию, шаблон письма и расписание отправки. После проверки нажмите "Запустить".',
  },
  {
    question: 'Как подключить почтовый ящик?',
    answer:
      'В разделе "Ящики" нажмите "Добавить ящик". Поддерживается подключение через IMAP/SMTP или OAuth для Gmail и Google Workspace. После подключения система автоматически проверит DNS-настройки.',
  },
  {
    question: 'Как работает AI-персонализация?',
    answer:
      'AI анализирует публичные данные о компании и контактном лице (сайт, LinkedIn, новости) и автоматически подставляет релевантные факты в шаблон письма. Это повышает Open Rate на 35% и Reply Rate на 40% в среднем.',
  },
  {
    question: 'Какие тарифные планы доступны?',
    answer:
      'Доступны три плана: Starter (от $29/мес), Professional (от $79/мес) и Enterprise (индивидуально). Все планы включают неограниченные кампании, AI-ассистент и аналитику. Различия — в количестве пользователей и объёме рассылок.',
  },
  {
    question: 'Как настроить SPF, DKIM и DMARC?',
    answer:
      'В разделе "Домены" добавьте ваш домен. Система автоматически сгенерирует нужные DNS-записи и покажет инструкции для их добавления на стороне вашего регистратора. После применения записей нажмите "Проверить" для верификации.',
  },
]

export default function HelpView() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scroll">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#e8e8e8]">
        <h1 className="text-lg font-semibold text-[#171717]">Помощь</h1>
        <p className="text-sm text-[#737373] mt-0.5">
          Центр помощи и поддержки
        </p>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a8a8a8]" />
          <input
            type="text"
            placeholder="Поиск по статьям..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-[10px] border border-[#e8e8e8] bg-white text-sm outline-none focus:border-[#737373] transition-colors placeholder:text-[#a8a8a8] text-[#171717]"
          />
        </div>

        {/* Quick links grid */}
        <div>
          <h2 className="text-sm font-semibold text-[#171717] mb-3">
            Быстрые ссылки
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickLinks.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.title}
                  className="flex items-center gap-3 p-4 rounded-[10px] border border-[#e8e8e8] bg-white hover:border-[#d4d4d4] hover:shadow-sm transition-all text-left cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-[8px] bg-[#fafafa] flex items-center justify-center flex-shrink-0 group-hover:bg-[#f5f5f5] transition-colors">
                    <Icon className="w-4 h-4 text-[#525252]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#171717]">
                      {item.title}
                    </div>
                    <div className="text-[12px] text-[#a8a8a8] mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#d4d4d4] group-hover:text-[#a8a8a8] transition-colors flex-shrink-0" />
                </button>
              )
            })}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-sm font-semibold text-[#171717] mb-3">
            Часто задаваемые вопросы
          </h2>
          <div className="rounded-[10px] border border-[#e8e8e8] bg-white overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="px-4 border-b border-[#e8e8e8] last:border-b-0"
                >
                  <AccordionTrigger className="text-sm font-medium text-[#171717] hover:no-underline py-4">
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

        {/* Contact support */}
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-[10px] bg-[#fafafa] flex items-center justify-center flex-shrink-0">
            <Headphones className="w-5 h-5 text-[#525252]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-[#171717]">
              Не нашли ответ?
            </div>
            <div className="text-[13px] text-[#737373] mt-0.5">
              Наша служба поддержки ответит в течение 2 часов в рабочее время
            </div>
          </div>
          <Button className="rounded-[10px] bg-[#0d0d0d] hover:bg-[#262626] text-white flex-shrink-0">
            Написать в поддержку
          </Button>
        </div>
      </div>
    </div>
  )
}
