'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Bot,
  Send,
  ChevronUp,
  Sparkles,
  User,
  GripHorizontal,
  Mic,
  MicOff,
  Loader2,
  X,
  Paperclip,
  Settings,
  FileBarChart,
  Bug,
  MessageCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { VoiceWave } from '@/components/shared/VoiceWave'
import { useVoiceRecording } from '@/lib/useVoiceRecording'

// ── Types ──────────────────────────────────────────────────

interface AgentMessage {
  id: number
  role: 'user' | 'ai'
  content: string
}

// ── Rotating suggestions for collapsed bar ─────────────────

const rotatingTips = [
  { icon: Settings, text: 'Настройте кампанию автоматически' },
  { icon: Bug, text: 'Исправьте ошибки в настройках' },
  { icon: FileBarChart, text: 'Запросите отчёт по результатам' },
  { icon: MessageCircle, text: 'Задайте вопрос по работе системы' },
  { icon: Sparkles, text: 'Оптимизируйте воронку outreach' },
  { icon: FileBarChart, text: 'Проверьте статус доставки писем' },
  { icon: Settings, text: 'Подключите новый почтовый ящик' },
  { icon: Bug, text: 'Найдите причину низкого Open Rate' },
]

// ── Demo Data ──────────────────────────────────────────────

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

// ── Constants ──────────────────────────────────────────────

const MIN_HEIGHT = 44        // collapsed
const DEFAULT_HEIGHT = 380   // opened default
const MAX_HEIGHT = 70         // vh — max 70% of viewport

/* ─── Main Agent Panel ─── */
interface AgentPanelProps {
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}

export function AgentPanel({ isOpen, onToggle, onClose }: AgentPanelProps) {
  const [panelHeight, setPanelHeight] = useState(DEFAULT_HEIGHT)
  const [messages, setMessages] = useState<AgentMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [transcribedText, setTranscribedText] = useState('')
  const [tipIndex, setTipIndex] = useState(0)

  const chatEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isResizing = useRef(false)
  const startY = useRef(0)
  const startHeight = useRef(0)

  // ── Rotating tips ──
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % rotatingTips.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  // ── Resize handle ──
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    isResizing.current = true
    startY.current = e.clientY
    startHeight.current = panelHeight

    const onMouseMove = (ev: MouseEvent) => {
      if (!isResizing.current) return
      const delta = startY.current - ev.clientY // dragging up = positive delta
      const maxH = window.innerHeight * 0.7
      const newH = Math.max(DEFAULT_HEIGHT, Math.min(maxH, startHeight.current + delta))
      setPanelHeight(newH)
    }

    const onMouseUp = () => {
      isResizing.current = false
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    document.body.style.cursor = 'ns-resize'
    document.body.style.userSelect = 'none'
  }, [panelHeight])

  // ── Voice ──
  const handleTranscribed = useCallback((text: string) => {
    setInput(prev => prev ? `${prev} ${text}` : text)
    setTranscribedText(text)
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

  // ── Chat ──
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    const ta = e.target
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 200) + 'px'
  }

  const handleToggle = () => {
    if (isOpen) {
      onClose()
    } else {
      setPanelHeight(DEFAULT_HEIGHT)
      onToggle()
    }
  }

  // ── Render ──
  const currentTip = rotatingTips[tipIndex]
  const TipIcon = currentTip.icon

  return (
    <div className="flex-shrink-0 mx-3 mb-3 relative z-20">
      <div
        className={cn(
          'flex flex-col bg-white border border-[#e8e8e8] overflow-hidden transition-[height,box-shadow] duration-300 ease-in-out',
          isOpen
            ? 'rounded-t-[12px] rounded-b-[6px] shadow-[0_-8px_40px_-10px_rgba(0,0,0,0.12),0_-2px_12px_-4px_rgba(0,0,0,0.06)]'
            : 'rounded-[10px] shadow-card',
        )}
        style={{ height: isOpen ? panelHeight : MIN_HEIGHT }}
      >
        {/* ── Resize handle (only when open) ── */}
        {isOpen && (
          <div
            onMouseDown={handleResizeStart}
            className="flex items-center justify-center h-[10px] cursor-ns-resize hover:bg-[#f5f5f5] transition-colors select-none shrink-0"
          >
            <GripHorizontal className="w-4 h-4 text-[#c4c4c4]" />
          </div>
        )}

        {/* ── Toggle bar ── */}
        <button
          onClick={handleToggle}
          className={cn(
            'flex items-center gap-2 px-4 shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors',
            isOpen ? 'h-[40px]' : 'h-[44px]',
          )}
        >
          <div className="relative flex items-center justify-center w-6 h-6 rounded-md bg-[#0d0d0d] shrink-0">
            <Bot className="w-3.5 h-3.5 text-white" />
            {!isOpen && (
              <span className="status-pulse absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#15803d] border border-white" />
            )}
          </div>

          <span className="text-[13px] font-medium text-[#171717]">AI Ассистент</span>

          {/* Rotating tip — only when collapsed */}
          {!isOpen && (
            <div className="flex items-center gap-1 ml-2 flex-1 min-w-0">
              <span className="text-[12px] text-[#a3a3a3] flex-shrink-0">—</span>
              <span
                key={tipIndex}
                className="text-[12px] text-[#737373] truncate anim-fade-in inline-flex items-center gap-1"
              >
                <TipIcon className="w-3 h-3 text-[#a3a3a3] shrink-0" />
                {currentTip.text}
              </span>
            </div>
          )}

          <ChevronUp
            className={cn(
              'w-4 h-4 text-[#737373] shrink-0 transition-transform duration-300',
              isOpen && 'rotate-180',
            )}
          />
        </button>

        {/* ── Chat content (only when open) ── */}
        {isOpen && (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 custom-scroll">
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
    </div>
  )
}
