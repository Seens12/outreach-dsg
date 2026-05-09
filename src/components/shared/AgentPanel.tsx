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
} from 'lucide-react'
import { toast } from 'sonner'
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

/* ─── Voice Wave Component ─── */
function VoiceWave({ analyser, isActive }: { analyser: AnalyserNode | null; isActive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const barCount = 36
    const barWidth = 2.5
    const gap = 3.5
    const totalWidth = barCount * (barWidth + gap) - gap
    const startX = (rect.width - totalWidth) / 2
    const centerY = rect.height / 2
    const maxBarHeight = rect.height * 0.6

    let time = 0

    const draw = () => {
      ctx.clearRect(0, 0, rect.width, rect.height)

      let dataArray: Uint8Array | null = null
      let hasRealData = false

      if (analyser && isActive) {
        dataArray = new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(dataArray)
        // Check if there's actual audio data (not just silence)
        for (let i = 0; i < Math.min(20, dataArray.length); i++) {
          if (dataArray[i] > 5) {
            hasRealData = true
            break
          }
        }
      }

      for (let i = 0; i < barCount; i++) {
        const x = startX + i * (barWidth + gap)
        let barHeight: number

        if (hasRealData && dataArray) {
          // Real audio-reactive mode: sample frequency data from right to left
          // Higher frequencies (right) → rightmost bars, lower (left) → leftmost bars
          const dataIndex = Math.floor((i / barCount) * (dataArray.length * 0.6))
          const value = dataArray[dataIndex] || 0
          barHeight = Math.max(3, (value / 255) * maxBarHeight)
        } else {
          // Idle/gentle animation: smooth wave from right to left
          const wave = Math.sin((time * 0.03) + (i * 0.3)) * 0.5 + 0.5
          const wave2 = Math.sin((time * 0.02) + (i * 0.15)) * 0.3 + 0.5
          barHeight = Math.max(3, (wave * 0.6 + wave2 * 0.4) * maxBarHeight * 0.5)
        }

        // Color: monochrome with subtle opacity variation
        const distanceFromCenter = Math.abs(i - barCount / 2) / (barCount / 2)
        const alpha = 0.25 + (1 - distanceFromCenter) * 0.55
        ctx.fillStyle = `rgba(13, 13, 13, ${alpha})`

        // Draw bar from center (symmetric up/down)
        const halfBar = barHeight / 2
        ctx.beginPath()
        ctx.roundRect(x, centerY - halfBar, barWidth, barHeight, 1.5)
        ctx.fill()
      }

      time++
      animFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [analyser, isActive])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  )
}

/* ─── Main Agent Panel ─── */
export function AgentPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<AgentMessage[]>(initialMessages)
  const [input, setInput] = useState('')

  // Voice state
  const [isRecording, setIsRecording] = useState(false)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [voicePhase, setVoicePhase] = useState<'idle' | 'recording' | 'transcribing' | 'done'>('idle')
  const [transcribedText, setTranscribedText] = useState('')
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null)

  const chatEndRef = useRef<HTMLDivElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  const cleanupStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
    setAnalyserNode(null)
    mediaRecorderRef.current = null
    audioChunksRef.current = []
  }, [])

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      // Create analyser for real-time frequency data
      const audioCtx = new AudioContext()
      const source = audioCtx.createMediaStreamSource(stream)
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      setAnalyserNode(analyser)

      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = async () => {
        // Stop all tracks
        stream.getTracks().forEach(t => t.stop())
        streamRef.current = null

        // Close audio context
        try { audioCtx.close() } catch { /* ignore */ }

        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        if (blob.size < 100) {
          setIsRecording(false)
          setVoicePhase('idle')
          return
        }

        // Start transcription
        setVoicePhase('transcribing')
        setIsTranscribing(true)

        try {
          const reader = new FileReader()
          reader.onloadend = async () => {
            const base64 = (reader.result as string).split(',')[1]
            const res = await fetch('/api/transcribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ audio: base64 }),
            })
            const data = await res.json()

            if (data.text) {
              setTranscribedText(data.text)
              setInput(prev => prev ? `${prev} ${data.text}` : data.text)
              setVoicePhase('done')

              // Return to idle after showing "done" briefly
              setTimeout(() => {
                setVoicePhase('idle')
                setIsTranscribing(false)
              }, 800)
            } else {
              toast.error('Не удалось распознать речь')
              setVoicePhase('idle')
              setIsTranscribing(false)
            }
          }
          reader.readAsDataURL(blob)
        } catch {
          toast.error('Ошибка транскрипции')
          setVoicePhase('idle')
          setIsTranscribing(false)
        }
      }

      mediaRecorder.start(100)
      setIsRecording(true)
      setVoicePhase('recording')
    } catch {
      toast.error('Нет доступа к микрофону')
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
    setIsRecording(false)
    // Keep voicePhase as 'recording' until onstop fires
  }, [])

  const cancelRecording = useCallback(() => {
    cleanupStream()
    setIsRecording(false)
    setVoicePhase('idle')
    setIsTranscribing(false)
  }, [cleanupStream])

  const handleMicClick = useCallback(() => {
    if (isTranscribing) return
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }, [isRecording, isTranscribing, stopRecording, startRecording])

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: input.trim() }])
    setInput('')
    setTranscribedText('')
  }

  const handleSuggestion = (label: string) => {
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: label }])
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => cleanupStream()
  }, [cleanupStream])

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
            {/* Voice Recording Mode */}
            {(voicePhase === 'recording' || voicePhase === 'transcribing') ? (
              <div className="relative flex items-center gap-3 bg-[#fafafa] border border-[#e8e8e8] rounded-xl px-4 py-3 overflow-hidden">
                {/* Cancel button */}
                <button
                  onClick={cancelRecording}
                  className="w-7 h-7 rounded-lg bg-white border border-[#e8e8e8] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors cursor-pointer flex-shrink-0"
                  aria-label="Отменить запись"
                >
                  <X className="w-3.5 h-3.5 text-[#525252]" />
                </button>

                {/* Wave animation area */}
                <div className={cn(
                  'flex-1 h-8 relative',
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

                {/* Mic button (stop) */}
                <div className="relative flex-shrink-0">
                  {/* Ripple ring */}
                  <span className="absolute inset-0 rounded-lg bg-[#0d0d0d] mic-ripple" />
                  <button
                    onClick={handleMicClick}
                    className="relative w-9 h-9 rounded-lg bg-[#0d0d0d] hover:bg-[#262626] flex items-center justify-center transition-colors cursor-pointer mic-glow"
                    aria-label="Остановить запись"
                  >
                    <MicOff className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            ) : (
              /* Normal Input Mode */
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
                {/* Mic button */}
                <button
                  onClick={handleMicClick}
                  className={cn(
                    'w-7 h-7 rounded-md flex items-center justify-center transition-all cursor-pointer',
                    'bg-transparent border border-[#e8e8e8] hover:bg-[#f5f5f5] hover:border-[#d4d4d4]',
                    transcribedText && 'border-[#0d0d0d]/10 bg-[#0d0d0d]/5',
                  )}
                  aria-label="Голосовой ввод"
                >
                  <Mic className="w-3.5 h-3.5 text-[#737373]" />
                </button>
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-7 h-7 rounded-md bg-[#0d0d0d] hover:bg-[#262626] flex items-center justify-center disabled:opacity-30 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
