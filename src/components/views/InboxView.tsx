'use client'

import { useState } from 'react'
import {
  Inbox,
  Search,
  Mail,
  Reply,
  Forward,
  Star,
  Paperclip,
  MoreHorizontal,
  Send,
  X,
  AlertTriangle,
  RefreshCw,
  FileText,
  Globe,
  Database,
  ArrowRight,
  CircleDot,
  Sparkles,
  GraduationCap,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Switch } from '@/components/ui/switch'
import { FilterRow } from '@/components/shared/FilterRow'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type LeadStatus = 'hot' | 'warm' | 'cold'
type EmailState = 'draft' | 'training' | 'ai-reply' | 'urgent'

interface InboxItem {
  id: number
  initials: string
  name: string
  company: string
  preview: string
  time: string
  unread: boolean
  leadStatus: LeadStatus
  confidence: number
  emailState: EmailState
  hasAttachment: boolean
}

interface ThreadMessage {
  id: number
  initials: string
  name: string
  company: string
  time: string
  body: string
  isMe: boolean
}

// ---------------------------------------------------------------------------
// Demo data
// ---------------------------------------------------------------------------

const inboxItems: InboxItem[] = [
  { id: 1, initials: 'АП', name: 'Алексей Петров', company: 'ТехноСтарт', preview: 'Добрый день! Заинтересованы в вашем решении для автоматизации outreach-процессов...', time: '10:32', unread: true, leadStatus: 'hot', confidence: 92, emailState: 'ai-reply', hasAttachment: false },
  { id: 2, initials: 'МК', name: 'Мария Козлова', company: 'DataFlow', preview: 'Спасибо за предложение. Хотели бы уточнить детали по интеграции с нашей CRM...', time: '09:15', unread: true, leadStatus: 'hot', confidence: 88, emailState: 'urgent', hasAttachment: true },
  { id: 3, initials: 'ДВ', name: 'Дмитрий Волков', company: 'CloudSync', preview: 'Можем ли мы запланировать демо на следующую неделю? Готовы обсудить условия...', time: 'Вчера', unread: true, leadStatus: 'warm', confidence: 75, emailState: 'draft', hasAttachment: false },
  { id: 4, initials: 'ЕС', name: 'Елена Смирнова', company: 'FinBridge', preview: 'Утверждаем бюджет на следующий квартал. Когда можем обсудить контракты?', time: 'Вчера', unread: false, leadStatus: 'hot', confidence: 85, emailState: 'ai-reply', hasAttachment: true },
  { id: 5, initials: 'ОН', name: 'Игорь Новиков', company: 'SalesForce RU', preview: 'Нужна ваша помощь с настройкой CRM-интеграции для нового клиента...', time: '2 дек', unread: false, leadStatus: 'warm', confidence: 70, emailState: 'training', hasAttachment: false },
  { id: 6, initials: 'ОФ', name: 'Ольга Фёдорова', company: 'MarketPro', preview: 'Хотим заказать индивидуальный тариф. Какие условия для Enterprise-плана?', time: '1 дек', unread: false, leadStatus: 'cold', confidence: 45, emailState: 'draft', hasAttachment: false },
  { id: 7, initials: 'СП', name: 'Сергей Попов', company: 'VK Tech', preview: 'Интересна ваша платформа для автоматизации B2B-продаж. Возможен ли пилотный проект?', time: '28 ноя', unread: true, leadStatus: 'warm', confidence: 68, emailState: 'ai-reply', hasAttachment: false },
  { id: 8, initials: 'НЛ', name: 'Наталья Лебедева', company: '2ГИС', preview: 'Коллеги, можем ли мы получить демо-доступ к платформе для тестирования?', time: '27 ноя', unread: false, leadStatus: 'cold', confidence: 42, emailState: 'draft', hasAttachment: false },
  { id: 9, initials: 'АБ', name: 'Андрей Белов', company: 'Ozon Tech', preview: 'Готовы подписать контракт на год. Нужна информация по юридическому оформлению...', time: '26 ноя', unread: false, leadStatus: 'hot', confidence: 91, emailState: 'ai-reply', hasAttachment: true },
  { id: 10, initials: 'ИЛ', name: 'Ирина Лебедева', company: 'МТС Digital', preview: 'Подскажите, есть ли у вас интеграция с AmoCRM и Telegram-каналами?', time: '25 ноя', unread: true, leadStatus: 'warm', confidence: 62, emailState: 'training', hasAttachment: false },
  { id: 11, initials: 'РЗ', name: 'Роман Зайцев', company: 'Касперский', preview: 'Рассматриваем OutreachAI для отдела B2B-продаж. Нужна презентация кейсов...', time: '24 ноя', unread: false, leadStatus: 'warm', confidence: 73, emailState: 'draft', hasAttachment: false },
  { id: 12, initials: 'ЕК', name: 'Екатерина Краснова', company: 'Яндекс', preview: 'Добрый день! Мы ищем решение для автоматизации email-рассылок на 10k+ контактов...', time: '23 ноя', unread: true, leadStatus: 'hot', confidence: 87, emailState: 'ai-reply', hasAttachment: false },
]

const threads: Record<number, { subject: string; messages: ThreadMessage[] }> = {
  1: {
    subject: 'Интерес к решению для автоматизации',
    messages: [
      { id: 1, initials: 'АП', name: 'Алексей Петров', company: 'ТехноСтарт', time: '10:32', body: 'Добрый день!\n\nМеня зовут Алексей Петров, я руковожу отделом разработки в ТехноСтарт. Мы сейчас активно ищем решение для автоматизации наших процессов outreach.\n\nВидели ваш продукт на конференции в Москве и заинтересовались. Можете рассказать подробнее о возможностях интеграции с нашей CRM?\n\nС уважением,\nАлексей Петров', isMe: false },
      { id: 2, initials: 'ОА', name: 'Команда OutreachAI', company: 'OutreachAI', time: '11:05', body: 'Здравствуйте, Алексей!\n\nСпасибо за интерес. Мы поддерживаем интеграцию с Salesforce, HubSpot, amoCRM и Bitrix24. Также есть REST API для кастомной интеграции.\n\nДавайте запланируем демо-звонок на этой неделе?\n\n— Команда OutreachAI', isMe: true },
      { id: 3, initials: 'АП', name: 'Алексей Петров', company: 'ТехноСтарт', time: '14:20', body: 'Отлично! Давайте в четверг в 15:00. Мы используем amoCRM — было бы здорово увидеть демо именно с нашей системой.\n\n— Алексей', isMe: false },
    ],
  },
}

const sources = [
  { name: 'Техническая документация API', relevance: 94, icon: FileText },
  { name: 'Прайс-лист Enterprise 2024', relevance: 87, icon: Database },
  { name: 'Кейсы интеграции с amoCRM', relevance: 72, icon: Globe },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const leadStatusConfig: Record<LeadStatus, { label: string; className: string }> = {
  hot: { label: 'Горячий', className: 'bg-[#fce7f3] text-[#be123c]' },
  warm: { label: 'Тёплый', className: 'bg-[#fafafa] text-[#a16207]' },
  cold: { label: 'Холодный', className: 'bg-[#dbeafe] text-[#3b82f6]' },
}

const emailStateConfig: Record<EmailState, { label: string; className: string }> = {
  draft: { label: 'Черновик', className: 'bg-[#f5f5f5] text-[#525252]' },
  training: { label: 'На обучении', className: 'bg-[#cffafe] text-[#0891b2]' },
  'ai-reply': { label: 'AI-ответ', className: 'bg-[#ede9fe] text-[#7c3aed]' },
  urgent: { label: 'Срочно', className: 'bg-[#fee2e2] text-[#be123c]' },
}

type InboxFilter = 'all' | 'attention' | 'training' | 'auto'

const filterTabs: { key: InboxFilter; label: string; count: number }[] = [
  { key: 'all', label: 'Все', count: 12 },
  { key: 'attention', label: 'Внимание', count: 4 },
  { key: 'training', label: 'Обучение', count: 4 },
  { key: 'auto', label: 'Авто', count: 5 },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function InboxView() {
  const [selectedEmailId, setSelectedEmailId] = useState<number>(1)
  const [activeFilter, setActiveFilter] = useState<InboxFilter>('all')
  const [replyText, setReplyText] = useState('')
  const [learningMode, setLearningMode] = useState(false)

  const thread = threads[selectedEmailId]
  const selectedEmail = inboxItems.find((e) => e.id === selectedEmailId)

  const filteredInbox = inboxItems.filter((item) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'attention') return item.leadStatus === 'hot'
    if (activeFilter === 'training') return item.emailState === 'training'
    if (activeFilter === 'auto') return item.emailState === 'ai-reply'
    return true
  })

  const confidence = selectedEmail?.confidence ?? 87

  return (
    <div className="flex h-full text-[13.5px] text-[#171717] font-[family-name:var(--font-geist-sans)] rounded-[10px] border border-[#e8e8e8] overflow-hidden bg-white shadow-card">
      {/* Left panel: Email list */}
      <div className="w-[300px] lg:w-[340px] border-r border-[#e8e8e8] flex flex-col bg-white shrink-0">
        {/* Header */}
        <div className="p-4 border-b border-[#e8e8e8]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Inbox className="size-4 text-[#0d0d0d]" />
              <h2 className="text-[15px] font-semibold text-[#0d0d0d]">
                Входящие
              </h2>
            </div>
            <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-[#0d0d0d] text-white text-[11px] font-semibold">
              {inboxItems.length}
            </span>
          </div>

          {/* Learning mode toggle */}
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="size-3.5 text-[#737373]" />
            <span className="text-[12px] font-medium text-[#525252]">Режим обучения</span>
            <Switch
              checked={learningMode}
              onCheckedChange={(v) => {
                setLearningMode(v)
                toast.success(v ? 'Режим обучения включен' : 'Режим обучения выключен')
              }}
              className="ml-auto"
              aria-label="Переключить режим обучения"
            />
          </div>

          {/* Filter pills */}
          <FilterRow>
            {filterTabs.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={cn(
                  'shrink-0 px-2.5 py-1 rounded-full text-[12px] font-medium transition-colors cursor-pointer',
                  activeFilter === f.key
                    ? 'bg-[#0d0d0d] text-white'
                    : 'bg-[#f5f5f5] text-[#737373] hover:bg-[#e8e8e8]'
                )}
              >
                {f.label}
                <span className="ml-1 text-[10px] opacity-70">{f.count}</span>
              </button>
            ))}
          </FilterRow>
        </div>

        {/* Email list */}
        <div className="flex-1 overflow-y-auto">
          {filteredInbox.map((item) => {
            const isSelected = item.id === selectedEmailId
            const lead = leadStatusConfig[item.leadStatus]
            const state = emailStateConfig[item.emailState]
            return (
              <button
                key={item.id}
                onClick={() => setSelectedEmailId(item.id)}
                className={cn(
                  'w-full text-left px-4 py-3.5 border-b border-[#f5f5f5] transition-colors hover:bg-[#fafafa] cursor-pointer',
                  isSelected ? 'bg-[#f5f5f5]' : 'bg-white'
                )}
              >
                {/* Row 1: Avatar + Name + Company + Time */}
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-[#0d0d0d] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {item.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      {item.unread && (
                        <span className="w-[6px] h-[6px] rounded-full bg-[#0d0d0d] shrink-0" />
                      )}
                      <span className={cn(
                        'text-[13px] truncate',
                        item.unread ? 'font-semibold text-[#0d0d0d]' : 'font-medium text-[#525252]'
                      )}>
                        {item.name}
                      </span>
                      <span className="text-[11px] text-[#a3a3a3] shrink-0">
                        {item.company}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#737373] shrink-0">{item.time}</span>
                </div>

                {/* Row 2: Preview */}
                <p className={cn(
                  'text-[12px] truncate mb-2 ml-[42px]',
                  item.unread ? 'text-[#404040]' : 'text-[#737373]'
                )}>
                  {item.preview}
                </p>

                {/* Row 3: Badges */}
                <div className="flex items-center gap-2 ml-[42px]">
                  {/* Lead status */}
                  <span className={cn('inline-flex items-center px-2 py-[2px] rounded-full text-[10.5px]', lead.className)}>
                    {lead.label}
                  </span>

                  {/* Email state */}
                  <span className={cn('inline-flex items-center px-2 py-[2px] rounded-full text-[10.5px]', state.className)}>
                    {state.label}
                  </span>

                  {/* Confidence */}
                  <span className="inline-flex items-center gap-1 text-[11px] ml-auto">
                    <CircleDot className={cn(
                      'size-3',
                      item.confidence >= 80 ? 'text-[#0d0d0d]' : item.confidence >= 50 ? 'text-[#737373]' : 'text-[#a3a3a3]'
                    )} />
                    {item.confidence}%
                  </span>

                  {/* Attachment */}
                  {item.hasAttachment && (
                    <Paperclip className="size-3 text-[#a3a3a3]" />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Center panel: Email thread */}
      <div className="flex-1 flex flex-col min-w-0">
        {thread && selectedEmail ? (
          <>
            {/* Thread header */}
            <div className="px-6 py-4 border-b border-[#e8e8e8]">
              <h3 className="text-[15px] font-semibold text-[#0d0d0d] mb-1">
                {thread.subject}
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-[#0d0d0d] text-white text-[12px] font-semibold">
                  {selectedEmail.initials}
                </div>
                <div>
                  <p className="text-[13.5px] font-medium text-[#0d0d0d]">
                    {selectedEmail.name}
                  </p>
                  <p className="text-[12px] text-[#737373]">
                    {selectedEmail.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Thread messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="flex flex-col gap-4">
                {thread.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      'rounded-[10px] border border-[#e8e8e8] p-4',
                      msg.isMe ? 'bg-[#fafafa]' : 'bg-white'
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          'flex items-center justify-center size-6 rounded-full text-[10px] font-semibold',
                          msg.isMe ? 'bg-[#0d0d0d] text-white' : 'bg-[#f5f5f5] text-[#525252]'
                        )}>
                          {msg.initials}
                        </div>
                        <span className="text-[13px] font-semibold text-[#0d0d0d]">{msg.name}</span>
                        <span className="text-[12px] text-[#737373]">
                          {msg.isMe ? 'мне' : msg.company}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#737373]">{msg.time}</span>
                    </div>
                    <div className="text-[13px] text-[#404040] leading-relaxed whitespace-pre-line">
                      {msg.body}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reply area */}
            <div className="border-t border-[#e8e8e8] p-4">
              <div className="border border-[#e8e8e8] rounded-[10px] bg-white overflow-hidden">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Напишите ответ..."
                  aria-label="Ответ"
                  rows={3}
                  className="w-full px-4 py-3 text-[13px] text-[#171717] placeholder:text-[#a3a3a3] resize-none outline-none bg-transparent"
                />
                <div className="flex items-center justify-between px-3 py-2 border-t border-[#f5f5f5] bg-[#fafafa]">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-md text-[#a3a3a3] hover:text-[#525252] hover:bg-[#f0f0f0] transition-colors cursor-pointer">
                      <Paperclip className="size-3.5" />
                    </button>
                    <button className="p-1.5 rounded-md text-[#a3a3a3] hover:text-[#525252] hover:bg-[#f0f0f0] transition-colors cursor-pointer">
                      <MoreHorizontal className="size-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setReplyText('')}
                      className="px-3 py-1.5 rounded-[7px] text-[12px] font-medium text-[#737373] hover:bg-[#f0f0f0] transition-colors cursor-pointer"
                    >
                      Отменить
                    </button>
                    <button
                      onClick={() => {
                        setReplyText('')
                        toast.success('Ответ отправлен')
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[7px] bg-[#0d0d0d] text-white text-[12px] font-medium hover:bg-[#262626] transition-colors cursor-pointer"
                    >
                      <Send className="size-3" />
                      Отправить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#a3a3a3]">
            <div className="flex flex-col items-center gap-2">
              <Mail className="size-8 text-[#d4d4d4]" />
              <p className="text-[13px]">Выберите письмо для чтения</p>
            </div>
          </div>
        )}
      </div>

      {/* Right panel: AI Assistant */}
      <div className="hidden lg:flex w-[280px] border-l border-[#e8e8e8] flex-col bg-[#fafafa] shrink-0">
        <div className="p-4 border-b border-[#e8e8e8]">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-[#0d0d0d]" />
            <h2 className="text-[14px] font-semibold text-[#0d0d0d]">
              AI Ассистент
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
          {/* Confidence section */}
          <div>
            <h3 className="text-[12px] font-semibold text-[#525252] uppercase tracking-wide mb-2">
              Доверие ответа
            </h3>
            <div className="border border-[#e8e8e8] rounded-[8px] bg-white p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[22px] font-bold text-[#0d0d0d]">
                  {confidence}%
                </span>
                <CircleDot
                  className={cn(
                    'size-4',
                    confidence >= 80 ? 'text-[#0d0d0d]' : confidence >= 50 ? 'text-[#737373]' : 'text-[#a3a3a3]'
                  )}
                />
              </div>
              <div className="w-full h-[6px] bg-[#f0f0f0] rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all',
                    confidence >= 80 ? 'bg-[#0d0d0d]' : confidence >= 50 ? 'bg-[#737373]' : 'bg-[#a3a3a3]'
                  )}
                  style={{ width: `${confidence}%` }}
                />
              </div>
              <p className="text-[11px] text-[#737373] mt-1.5">
                {confidence >= 80
                  ? 'Высокая уверенность в данных'
                  : confidence >= 50
                    ? 'Средняя уверенность — проверьте'
                    : 'Низкая уверенность — нужна проверка'}
              </p>
            </div>
          </div>

          {/* Sources section */}
          <div>
            <h3 className="text-[12px] font-semibold text-[#525252] uppercase tracking-wide mb-2">
              Источники
            </h3>
            <div className="flex flex-col gap-2">
              {sources.map((source, idx) => {
                const Icon = source.icon
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 border border-[#e8e8e8] rounded-[8px] bg-white p-2.5"
                  >
                    <div className="flex items-center justify-center size-7 rounded-[6px] bg-[#f5f5f5] shrink-0">
                      <Icon className="size-3.5 text-[#525252]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-[#0d0d0d] truncate">
                        {source.name}
                      </p>
                      <p className="text-[11px] text-[#737373]">
                        Релевантность: {source.relevance}%
                      </p>
                    </div>
                    <ArrowRight className="size-3 text-[#d4d4d4] shrink-0" />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Warning box */}
          <div className="rounded-[8px] bg-[#fefce8] border border-[#fef3c7] p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="size-4 text-[#a16207] shrink-0 mt-0.5" />
              <div>
                <p className="text-[12px] font-semibold text-[#a16207] mb-0.5">
                  Недостающая информация
                </p>
                <p className="text-[11px] text-[#a16207]/70 leading-relaxed">
                  Нет данных о текущих акциях и специальных предложениях. Добавьте информацию для более точных ответов.
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div>
            <h3 className="text-[12px] font-semibold text-[#525252] uppercase tracking-wide mb-2">
              Действия
            </h3>
            <div className="flex flex-col gap-2">
              <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-[8px] border border-[#e8e8e8] bg-white text-[12.5px] font-medium text-[#404040] hover:bg-[#f5f5f5] transition-colors cursor-pointer">
                <Sparkles className="size-3.5" />
                Редактировать
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-[8px] border border-[#e8e8e8] bg-white text-[12.5px] font-medium text-[#404040] hover:bg-[#f5f5f5] transition-colors cursor-pointer">
                <Send className="size-3.5" />
                Отправить как есть
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-[8px] bg-[#0d0d0d] text-white text-[12.5px] font-medium hover:bg-[#262626] transition-colors cursor-pointer">
                <RefreshCw className="size-3.5" />
                Регенерировать
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
