'use client'

import { useState, useRef, useEffect } from 'react'
import { Bot, Send, ChevronUp, Sparkles, User, Building2, Mail, Lightbulb, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AgentMessage {
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

const initialMessages: AgentMessage[] = [
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

function renderContent(content: string) {
  return content.split(/(\*\*.*?\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export function AgentPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<AgentMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: input.trim() }])
    setInput('')
  }

  const handleSuggestion = (label: string) => {
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: label }])
  }

  return (
    <div
      className="flex flex-col border-t border-[#e8e8e8] bg-white flex-shrink-0 transition-all duration-300 ease-in-out"
      style={{ height: isOpen ? 350 : 44 }}
    >
      {/* Toggle bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 h-[44px] flex-shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors"
      >
        <div className="w-6 h-6 rounded-md bg-[#0d0d0d] flex items-center justify-center">
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-[13px] font-medium text-[#171717]">AI Ассистент</span>
        <ChevronUp
          className={cn(
            'w-4 h-4 text-[#737373] ml-auto transition-transform duration-300',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {/* Chat area (only when open) */}
      {isOpen && (
        <>
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 custom-scroll">
            {/* Suggestion chips - only show at initial state */}
            {messages.length === initialMessages.length && (
              <div className="flex flex-wrap gap-2 mb-2">
                {suggestions.map(s => {
                  const Icon = s.icon
                  return (
                    <button
                      key={s.label}
                      onClick={() => handleSuggestion(s.label)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#e8e8e8] bg-white text-[12px] text-[#525252] hover:bg-[#fafafa] hover:border-[#d4d4d4] transition-colors cursor-pointer"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#737373]" />
                      {s.label}
                    </button>
                  )
                })}
              </div>
            )}

            {messages.map(msg => (
              <div
                key={msg.id}
                className={cn('flex gap-2', msg.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                {msg.role === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-[#0d0d0d] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[80%] rounded-lg px-3 py-2 text-[13px] leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-[#0d0d0d] text-white'
                      : 'bg-[#f5f5f5] text-[#171717]',
                  )}
                >
                  <div className="whitespace-pre-wrap">
                    {msg.role === 'ai' ? renderContent(msg.content) : msg.content}
                  </div>
                </div>
                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-[#e8e8e8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3 h-3 text-[#525252]" />
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="px-4 py-3 border-t border-[#f5f5f5]">
            <div className="flex items-center gap-2 bg-[#fafafa] border border-[#e8e8e8] rounded-lg px-3 py-2">
              <Sparkles className="w-4 h-4 text-[#737373]" />
              <input
                type="text"
                placeholder="Спросить AI..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#a3a3a3]"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-7 h-7 rounded-md bg-[#0d0d0d] hover:bg-[#262626] flex items-center justify-center disabled:opacity-30 transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
