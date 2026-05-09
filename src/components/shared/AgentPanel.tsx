'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Bot,
  Send,
  ChevronUp,
  Sparkles,
  User,
  Building2,
  Mail,
  Lightbulb,
  Search,
  Mic,
  MicOff,
  Loader2,
  X,
  Paperclip,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { VoiceWave } from '@/components/shared/VoiceWave'
import { useVoiceRecording } from '@/lib/useVoiceRecording'

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

/* ─── Main Agent Panel ─── */
export function AgentPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<AgentMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [transcribedText, setTranscribedText] = useState('')

  const chatEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleTranscribed = useCallback((text: string) => {
    setInput(prev => prev ? `${prev} ${text}` : text)
    setTranscribedText(text)
    // Trigger auto-resize after transcription
    requestAnimationFrame(() => {
      const ta = textareaRef.current
      if (ta) {
        ta.style.height = 'auto'
        ta.style.height = Math.min(ta.scrollHeight, 200) + 'px'
      }
    })
  }, [])

  const {
    isRecording,
    voicePhase,
    analyserNode,
    handleMicClick,
    cancelRecording,
  } = useVoiceRecording({ onTranscribed: handleTranscribed })

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: input.trim() }])
    setInput('')
    setTranscribedText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleSuggestion = (label: string) => {
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: label }])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    const ta = e.target
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 200) + 'px'
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
                {suggestions.map((s, i) => {
                  const Icon = s.icon
                  return (
                    <button
                      key={s.label}
                      onClick={() => handleSuggestion(s.label)}
                      className="anim-scale-in inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#e8e8e8] bg-white text-[12px] text-[#525252] hover:bg-[#fafafa] hover:border-[#d4d4d4] transition-colors cursor-pointer"
                      style={{ animationDelay: `${i * 40}ms` }}
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
                className={cn('flex gap-2', msg.role === 'user' ? 'justify-end animate-message-send' : 'justify-start animate-message-receive')}
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
                      : 'anim-fade-in bg-[#f5f5f5] text-[#171717]',
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

          {/* ─── Input Area ─── */}
          <div className="px-4 py-3 border-t border-[#f5f5f5]">
            {(voicePhase === 'recording' || voicePhase === 'transcribing') ? (
              <div className="flex items-center gap-3 bg-[#fafafa] border border-[#e8e8e8] rounded-xl px-3 h-[44px] overflow-hidden">
                <button
                  onClick={cancelRecording}
                  className="w-7 h-7 rounded-lg bg-white border border-[#e8e8e8] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors cursor-pointer flex-shrink-0"
                  aria-label="Отменить запись"
                >
                  <X className="w-3.5 h-3.5 text-[#525252]" />
                </button>
                <div className={cn(
                  'flex-1 relative h-[20px]',
                  voicePhase === 'recording' ? 'voice-wave-container' : 'voice-wave-container fading',
                )}>
                  {voicePhase === 'transcribing' ? (
                    <div className="flex items-center justify-center gap-1.5 h-full">
                      <Loader2 className="w-4 h-4 text-[#737373] animate-spin" />
                      <span className="text-[12px] text-[#a3a3a3]">Распознавание...</span>
                    </div>
                  ) : (
                    <VoiceWave analyser={analyserNode} isActive={isRecording} />
                  )}
                </div>
                <div className="relative flex-shrink-0">
                  <span className="absolute inset-0 rounded-lg bg-[#0d0d0d] mic-ripple" />
                  <button
                    onClick={handleMicClick}
                    className="relative w-8 h-8 rounded-lg bg-[#0d0d0d] hover:bg-[#262626] flex items-center justify-center transition-colors cursor-pointer mic-glow"
                    aria-label="Остановить запись"
                  >
                    <MicOff className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            ) : (
              /* Normal Input — textarea on top, icons below */
              <div className="flex flex-col bg-[#fafafa] border border-[#e8e8e8] rounded-xl overflow-hidden">
                <textarea
                  ref={textareaRef}
                  placeholder="Управляйте системой прямо здесь — настройте параметры, исправьте ошибки, запросите отчёты. Всё без перехода в расширенный режим."
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                  rows={3}
                  className="w-full bg-transparent text-[13px] outline-none placeholder:text-[#a3a3a3] resize-none px-3 pt-2.5 pb-1.5 leading-[1.5] max-h-[200px]"
                />
                <div className="flex items-center gap-1.5 px-2.5 pb-2 pt-0.5">
                  <button
                    className="w-7 h-7 rounded-md flex items-center justify-center transition-colors cursor-pointer hover:bg-[#ebebeb]"
                    aria-label="Прикрепить файл"
                  >
                    <Paperclip className="w-[16px] h-[16px] text-[#737373]" />
                  </button>
                  <div className="flex items-center justify-center w-7 h-7">
                    <Sparkles className="w-[16px] h-[16px] text-[#737373]" />
                  </div>
                  <div className="flex-1" />
                  <button
                    onClick={handleMicClick}
                    className={cn(
                      'w-7 h-7 rounded-md flex items-center justify-center transition-all cursor-pointer',
                      'bg-transparent border border-[#e8e8e8] hover:bg-[#ebebeb] hover:border-[#d4d4d4]',
                      transcribedText && 'border-[#0d0d0d]/10 bg-[#0d0d0d]/5',
                    )}
                    aria-label="Голосовой ввод"
                  >
                    <Mic className="w-[16px] h-[16px] text-[#737373]" />
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="w-7 h-7 rounded-md bg-[#0d0d0d] hover:bg-[#262626] flex items-center justify-center disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    <Send className="w-[16px] h-[16px] text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
