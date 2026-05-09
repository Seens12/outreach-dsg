'use client'

import { useState } from 'react'
import {
  Bot,
  Send,
  Building2,
  Mail,
  Lightbulb,
  Search,
  User,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Message {
  id: number
  role: 'user' | 'ai'
  content: string
}

const suggestions = [
  { icon: Building2, label: 'Проанализируй компанию' },
  { icon: Mail, label: 'Составь письмо' },
  { icon: Lightbulb, label: 'Предложи стратегию' },
  { icon: Search, label: 'Найди контакты' },
]

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'ai',
    content:
      'Здравствуйте! Я AI-ассистент OutreachAI. Я могу помочь вам с анализом компаний, составлением персонализированных писем, разработкой стратегий Outreach и поиском контактов. Чем могу помочь?',
  },
  {
    id: 2,
    role: 'user',
    content: 'Проанализируй компанию Яндекс',
  },
  {
    id: 3,
    role: 'ai',
    content: `**Анализ компании: Яндекс**

**Основная информация:**
- Основана в 1997 году, штаб-квартира в Москве
- Рыночная капитализация: ~$13 млрд
- Сотрудников: ~18 000
- Выручка за 2023: ~560 млрд руб.

**Направления бизнеса:**
- Поиск и портальные сервисы
- Taxi (Яндекс Go)
- E-commerce (Маркет, Лавка)
- Cloud-технологии
- AI и ML исследования

**Точки контакта для Outreach:**
Рекомендую обращаться к руководителям направлений B2B и Enterprise. Фокус на IT-директоров и руководителей развития бизнеса.`,
  },
  {
    id: 4,
    role: 'user',
    content: 'Составь письмо для ИТ-директора',
  },
  {
    id: 5,
    role: 'ai',
    content: `**Черновик письма:**

> Тема: Автоматизация вашего outreach-процесса
>
> Уважаемый [Имя],
>
> Заметил, что ваша команда активно масштабирует B2B-направление. Мы помогаем компаниям вроде [ссылка на кейс] увеличить конверсию холодных писем на 40% с помощью AI-персонализации.
>
> Будет ли вам интересно посмотреть короткую демо (15 мин)?
>
> С уважением,
> [Имя]

**Рекомендации:**
- Добавьте персональный факт о компании
- Упомяните конкретный проект или новость
- Используйте имя получателя`,
  },
  {
    id: 6,
    role: 'user',
    content: 'Предложи стратегию для IT-компаний',
  },
  {
    id: 7,
    role: 'ai',
    content: `**Стратегия Outreach для IT-компаний:**

1. **Сегментация аудитории:**
   - C-level (CTO, CEO) — стратегическое предложение
   - IT-руководители — техническое решение
   - HR-директора — продуктовый подход

2. **Каналы:**
   - Email (основной) — 3-4 касания
   - LinkedIn — warming + connection
   - Телефон — после 2-го email

3. **Тайминг:**
   - Вторник-четверг, 10:00-12:00
   - Интервал между письмами: 3-5 дней
   - Максимум 4 касания в последовательности

4. **Метрики для отслеживания:**
   - Open rate > 35%
   - Reply rate > 10%
   - Meeting booked rate > 3%`,
  },
]

export default function AiDemoView() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
  }

  const handleSuggestion = (label: string) => {
    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      content: label,
    }
    setMessages((prev) => [...prev, userMsg])
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#e8e8e8]">
        <h1 className="text-lg font-semibold text-[#171717]">AI Демо</h1>
        <p className="text-sm text-[#737373] mt-0.5">
          Попробуйте возможности AI-ассистента
        </p>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scroll">
        {/* Suggestion chips - only show at beginning */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestions.map((s) => {
              const Icon = s.icon
              return (
                <button
                  key={s.label}
                  onClick={() => handleSuggestion(s.label)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[10px] border border-[#e8e8e8] bg-white text-sm text-[#525252] hover:bg-[#fafafa] hover:border-[#d4d4d4] transition-colors cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-[#737373]" />
                  {s.label}
                </button>
              )
            })}
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end animate-message-send' : 'justify-start animate-message-receive'}`}
          >
            {msg.role === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-[#0d0d0d] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-[70%] rounded-[10px] px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#0d0d0d] text-white'
                  : 'bg-white border border-[#e8e8e8] text-[#171717]'
              }`}
            >
              <div
                className="whitespace-pre-wrap [&>strong]:font-semibold [&>blockquote]:border-l-2 [&>blockquote]:border-[#e8e8e8] [&>blockquote]:pl-3 [&>blockquote]:italic [&>blockquote]:text-[#525252]"
              >
                {msg.content.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                      <strong key={i}>{part.slice(2, -2)}</strong>
                    )
                  }
                  return part
                })}
              </div>
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-[#e8e8e8] flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="w-4 h-4 text-[#525252]" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="border-t border-[#e8e8e8] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 rounded-[10px] border border-[#e8e8e8] bg-white px-4 py-2.5 focus-within:border-[#737373] transition-colors">
            <Sparkles className="w-4 h-4 text-[#a8a8a8] flex-shrink-0" />
            <input
              type="text"
              placeholder="Введите сообщение..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 text-sm bg-transparent outline-none placeholder:text-[#a8a8a8] text-[#171717]"
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim()}
            className="h-10 w-10 p-0 rounded-[10px] bg-[#0d0d0d] hover:bg-[#262626] text-white flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-[11px] text-[#a8a8a8] mt-2">
          AI-ассистент может допускать ошибки. Проверяйте важную информацию.
        </p>
      </div>
    </div>
  )
}
