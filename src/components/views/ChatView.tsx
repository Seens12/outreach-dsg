'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Zap,
  Megaphone,
  BarChart3,
  FileText,
  Paperclip,
  SendHorizontal,
  Bot,
  User,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Mic,
  MicOff,
  Loader2,
  X,
  FileSpreadsheet,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { VoiceWave } from '@/components/shared/VoiceWave'
import { useVoiceRecording } from '@/lib/useVoiceRecording'

// ── Types ──────────────────────────────────────────────────

type ChatMessage = {
  id: string
  role: 'ai' | 'user'
  text?: string
  agentCard?: AgentCardData
}

type AgentCardData = {
  title: string
  rows: { label: string; value: string }[]
  actions: { label: string; icon: React.ElementType }[]
}

type Screen = 'welcome' | 'chat'

// ── Demo Data ──────────────────────────────────────────────

const welcomeCards = [
  {
    id: 'campaign',
    icon: Megaphone,
    title: 'Новая кампания',
    description: 'Создать outreach-кампанию с помощью AI',
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Анализ лидов',
    description: 'Получить AI-анализ ваших контактов',
  },
  {
    id: 'template',
    icon: FileText,
    title: 'Создать шаблон',
    description: 'Генерировать персонализированный шаблон',
  },
]

const sampleMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'ai',
    text: 'Проанализировал компанию TechCorp. Вот ключевые данные:',
    agentCard: {
      title: 'Анализ компании',
      rows: [
        { label: 'Компания', value: 'TechCorp Solutions' },
        { label: 'Отрасль', value: 'Enterprise SaaS' },
        { label: 'Размер', value: '200-500 сотрудников' },
        { label: 'Выручка', value: '$15M-$30M ARR' },
        { label: 'Технологии', value: 'AWS, React, Python' },
        { label: 'Решение', value: 'CloudPlatform Pro' },
      ],
      actions: [
        { label: 'Написать письмо', icon: SendHorizontal },
        { label: 'Добавить в кампанию', icon: Sparkles },
        { label: 'CRM', icon: ExternalLink },
      ],
    },
  },
  {
    id: '2',
    role: 'user',
    text: 'Создай персонализированное письмо для CEO TechCorp. Упомяни их недавний раунд финансирования.',
  },
  {
    id: '3',
    role: 'ai',
    text: null,
    agentCard: undefined,
  },
]

// ── Subcomponents ──────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2.5 px-1 py-1">
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0d0d0d] shrink-0">
        <Bot className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="flex items-center gap-1 bg-[#f5f5f5] rounded-[12px] px-3.5 py-2.5">
        <div className="typing-dot w-[6px] h-[6px] rounded-full bg-[#a3a3a3]" />
        <div className="typing-dot w-[6px] h-[6px] rounded-full bg-[#a3a3a3]" />
        <div className="typing-dot w-[6px] h-[6px] rounded-full bg-[#a3a3a3]" />
      </div>
    </div>
  )
}

function AgentCard({ card }: { card: AgentCardData }) {
  return (
    <div className="mt-2 border border-[#e8e8e8] rounded-[10px] bg-white overflow-hidden shadow-card">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#fafafa] border-b border-[#e8e8e8]">
        <div className="flex items-center justify-center w-6 h-6 rounded-[6px] bg-[#0d0d0d]">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-[13px] font-semibold text-[#0d0d0d]">{card.title}</span>
      </div>
      <div className="divide-y divide-[#f5f5f5]">
        {card.rows.map((row, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-2.5">
            <span className="text-[12.5px] text-[#737373]">{row.label}</span>
            <span className="text-[12.5px] font-medium text-[#171717]">{row.value}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 px-4 py-3 border-t border-[#e8e8e8] bg-[#fafafa]">
        {card.actions.map((action, i) => {
          const ActionIcon = action.icon
          return (
            <button
              key={i}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#0d0d0d] bg-white border border-[#e8e8e8] rounded-[8px] px-3 py-1.5 hover:bg-[#f5f5f5] transition-colors"
            >
              <ActionIcon className="w-3 h-3" />
              {action.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Main Component ──────────────────────────────────────────

export default function ChatView() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleWelcomeCardClick = (cardId: string) => {
    setMessages(sampleMessages)
    setScreen('chat')
  }

  const handleSend = () => {
    if (!input.trim()) return
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', text: input.trim() },
    ])
    setInput('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    const ta = e.target
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 200) + 'px'
  }

  const handleTranscribed = useCallback((text: string) => {
    setInput(prev => prev ? `${prev} ${text}` : text)
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
    isTranscribing,
    voicePhase,
    transcribedText,
    analyserNode,
    handleMicClick,
    cancelRecording,
  } = useVoiceRecording({ onTranscribed: handleTranscribed })

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, screen])

  return (
    <div className="flex flex-col h-full text-[13.5px] text-[#171717]">
      {/* ── Welcome Screen ───────────────────────────────── */}
      {screen === 'welcome' && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
          {/* Logo */}
          <div className="flex items-center justify-center w-16 h-16 rounded-[16px] bg-[#0d0d0d] mb-6 shadow-card">
            <Zap className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
            AI Ассистент
          </h1>
          <p className="text-[14px] text-[#737373] mt-1.5 mb-5">
            Автоматизация outreach с помощью искусственного интеллекта
          </p>

          {/* Status */}
          <div className="flex items-center gap-2 mb-10">
            <span className="status-pulse w-2 h-2 rounded-full bg-[#15803d] inline-block" />
            <span className="text-[12.5px] text-[#525252] font-medium">
              Агент готов к работе
            </span>
          </div>

          {/* Welcome Cards */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-[640px]">
            {welcomeCards.map((card) => {
              const CardIcon = card.icon
              return (
                <button
                  key={card.id}
                  onClick={() => handleWelcomeCardClick(card.id)}
                  className="border border-[#e8e8e8] rounded-[10px] bg-white p-5 text-left hover:bg-[#fafafa] hover:border-[#d4d4d4] transition-all shadow-card hover:shadow-card cursor-pointer group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-[10px] bg-[#f5f5f5] mb-3 group-hover:bg-[#ebebeb] transition-colors">
                    <CardIcon className="w-5 h-5 text-[#525252]" />
                  </div>
                  <div className="text-[13.5px] font-semibold text-[#0d0d0d] mb-1">
                    {card.title}
                  </div>
                  <div className="text-[12px] text-[#737373] leading-[1.4]">
                    {card.description}
                  </div>
                  <div className="flex items-center gap-1 mt-3 text-[12px] font-medium text-[#2563eb] opacity-0 group-hover:opacity-100 transition-opacity">
                    Начать
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Chat Stream ──────────────────────────────────── */}
      {screen === 'chat' && (
        <>
          <div className="flex-1 overflow-y-auto px-6 py-6 custom-scroll">
            <div className="flex flex-col gap-5 max-w-[680px] mx-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'animate-message-send flex-row-reverse' : 'animate-message-receive'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-full shrink-0 mt-[2px] ${
                      msg.role === 'ai'
                        ? 'bg-[#0d0d0d]'
                        : 'bg-[#f5f5f5] border border-[#e8e8e8]'
                    }`}
                  >
                    {msg.role === 'ai' ? (
                      <Bot className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-[#525252]" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[85%] ${
                      msg.role === 'user'
                        ? 'bg-[#0d0d0d] text-white rounded-[14px] rounded-tr-[4px] px-4 py-3'
                        : 'bg-transparent'
                    }`}
                  >
                    {msg.role === 'user' && msg.text && (
                      <p className="text-[13.5px] leading-[1.5] whitespace-pre-wrap">
                        {msg.text}
                      </p>
                    )}
                    {msg.role === 'ai' && msg.text && (
                      <p className="text-[13.5px] text-[#404040] leading-[1.5]">
                        {msg.text}
                      </p>
                    )}
                    {msg.role === 'ai' && msg.agentCard && (
                      <AgentCard card={msg.agentCard} />
                    )}
                    {msg.role === 'ai' && !msg.text && !msg.agentCard && (
                      <TypingIndicator />
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>
        </>
      )}

      {/* ── Input Area ───────────────────────────────────── */}
      <div className="border-t border-[#e8e8e8] bg-white px-6 py-4">
        <div className="max-w-[680px] mx-auto">
          {/* Hardcoded attached file previews — compact square chips, flex-wrap for many files */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            <div className="group relative flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-[#f5f5f5] border border-[#e8e8e8] hover:border-[#d4d4d4] transition-colors cursor-default max-w-[180px]">
              <div className="w-6 h-6 rounded-[4px] bg-[#dcfce7] flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#15803d]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11.5px] font-medium text-[#171717] truncate leading-tight">Компании_outreach.xlsx</div>
                <div className="text-[10px] text-[#a3a3a3] leading-tight">245 КБ</div>
              </div>
              <button className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white border border-[#e0e0e0] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm">
                <X className="w-2.5 h-2.5 text-[#737373]" />
              </button>
            </div>
            <div className="group relative flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-[#f5f5f5] border border-[#e8e8e8] hover:border-[#d4d4d4] transition-colors cursor-default max-w-[180px]">
              <div className="w-6 h-6 rounded-[4px] bg-[#dbeafe] flex items-center justify-center shrink-0">
                <FileText className="w-3.5 h-3.5 text-[#2563eb]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11.5px] font-medium text-[#171717] truncate leading-tight">Контакты_IT_2024.csv</div>
                <div className="text-[10px] text-[#a3a3a3] leading-tight">128 КБ</div>
              </div>
              <button className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white border border-[#e0e0e0] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm">
                <X className="w-2.5 h-2.5 text-[#737373]" />
              </button>
            </div>
          </div>
          {/* Input area */}
          {(voicePhase === 'recording' || voicePhase === 'transcribing') ? (
            <div className="flex items-center gap-3 bg-[#fafafa] border border-[#e8e8e8] rounded-[12px] px-3 h-[44px] overflow-hidden">
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
            <div className="flex flex-col bg-[#fafafa] border border-[#e8e8e8] rounded-[12px] overflow-hidden">
              {/* Textarea block — 5 lines default, grows to ~10 max */}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Напишите сообщение..."
                rows={5}
                className="w-full bg-transparent text-[13.5px] text-[#171717] placeholder:text-[#a3a3a3] resize-none outline-none px-4 pt-3 pb-2 leading-[1.5] max-h-[200px]"
              />
              {/* Icons toolbar — separate block below */}
              <div className="flex items-center gap-1.5 px-3 pb-2.5 pt-0.5">
                <button className="flex items-center justify-center w-8 h-8 rounded-[8px] hover:bg-[#ebebeb] transition-colors cursor-pointer" aria-label="Прикрепить файл">
                  <Paperclip className="w-[18px] h-[18px] text-[#737373]" />
                </button>
                <div className="flex items-center justify-center w-8 h-8">
                  <Sparkles className="w-[18px] h-[18px] text-[#737373]" />
                </div>
                <div className="flex-1" />
                <button
                  onClick={handleMicClick}
                  className={cn(
                    'w-8 h-8 rounded-[8px] flex items-center justify-center transition-all cursor-pointer',
                    'border border-[#e8e8e8] hover:bg-[#ebebeb] hover:border-[#d4d4d4]',
                    transcribedText && 'border-[#0d0d0d]/10 bg-[#0d0d0d]/5',
                  )}
                  aria-label="Голосовой ввод"
                >
                  <Mic className="w-[18px] h-[18px] text-[#737373]" />
                </button>
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-[#0d0d0d] hover:bg-[#262626] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <SendHorizontal className="w-[18px] h-[18px] text-white" />
                </button>
              </div>
            </div>
          )}
          {/* Keyboard shortcuts hint */}
          <div className="flex items-center justify-center mt-2">
            <div style={{ fontSize: '12px', color: '#a8a8a8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <kbd className="px-1.5 py-0.5 rounded bg-[#f5f5f5] border border-[#e8e8e8] text-[11px] font-mono">Enter</kbd>
              отправить ·
              <kbd className="px-1.5 py-0.5 rounded bg-[#f5f5f5] border border-[#e8e8e8] text-[11px] font-mono">Shift+Enter</kbd>
              новая строка
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
