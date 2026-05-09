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
} from 'lucide-react'

type InboxFilter = 'all' | 'unread' | 'replied' | 'important'

interface EmailContact {
  name: string
  company: string
  email: string
  avatar: string
}

interface InboxItem {
  id: number
  sender: EmailContact
  preview: string
  time: string
  unread: boolean
  hasAttachment: boolean
  important: boolean
  replied: boolean
}

interface ThreadMessage {
  id: number
  from: EmailContact
  to: string
  time: string
  subject: string
  body: string
}

const contacts: Record<number, EmailContact> = {
  1: {
    name: 'Алексей Петров',
    company: 'TechVision',
    email: 'a.petrov@techvision.ru',
    avatar: 'АП',
  },
  2: {
    name: 'Мария Козлова',
    company: 'DataFlow',
    email: 'm.kozlova@dataflow.io',
    avatar: 'МК',
  },
  3: {
    name: 'Дмитрий Волков',
    company: 'CloudSync',
    email: 'd.volkov@cloudsync.com',
    avatar: 'ДВ',
  },
  4: {
    name: 'Елена Смирнова',
    company: 'FinBridge',
    email: 'e.smirnova@finbridge.ru',
    avatar: 'ЕС',
  },
  5: {
    name: 'Игорь Новиков',
    company: 'SalesForce RU',
    email: 'i.novikov@sf-ru.com',
    avatar: 'ИН',
  },
  6: {
    name: 'Ольга Федорова',
    company: 'MarketPro',
    email: 'o.fedorova@marketpro.ru',
    avatar: 'ОФ',
  },
}

const inboxItems: InboxItem[] = [
  {
    id: 1,
    sender: contacts[1],
    preview: 'Добрый день! Заинтересованы в вашем решении для автоматизации...',
    time: '10:32',
    unread: true,
    hasAttachment: false,
    important: true,
    replied: false,
  },
  {
    id: 2,
    sender: contacts[2],
    preview: 'Спасибо за предложение. Хотели бы уточнить детали по интеграции...',
    time: '09:15',
    unread: true,
    hasAttachment: true,
    important: false,
    replied: false,
  },
  {
    id: 3,
    sender: contacts[3],
    preview: 'Можем ли мы запланировать демо на следующую неделю?',
    time: 'Вчера',
    unread: true,
    hasAttachment: false,
    important: false,
    replied: true,
  },
  {
    id: 4,
    sender: contacts[4],
    preview: 'Утверждаем бюджет на следующий квартал. Когда можем обсудить...',
    time: 'Вчера',
    unread: false,
    hasAttachment: true,
    important: true,
    replied: true,
  },
  {
    id: 5,
    sender: contacts[5],
    preview: 'Коллеги, нужна ваша помощь с настройкой CRM-интеграции...',
    time: '2 дек',
    unread: false,
    hasAttachment: false,
    important: false,
    replied: true,
  },
  {
    id: 6,
    sender: contacts[6],
    preview: 'Хотим заказать индивидуальный тариф. Какие условия?',
    time: '1 дек',
    unread: false,
    hasAttachment: false,
    important: false,
    replied: false,
  },
]

const threads: Record<number, { subject: string; messages: ThreadMessage[] }> = {
  1: {
    subject: 'Интерес к решению для автоматизации',
    messages: [
      {
        id: 1,
        from: contacts[1],
        to: 'вы',
        time: '10:32',
        subject: 'Интерес к решению для автоматизации',
        body: 'Добрый день!\n\nМеня зовут Алексей Петров, я руковожу отделом разработки в TechVision. Мы сейчас активно ищем решение для автоматизации наших процессов outreach и холодных рассылок.\n\nВидели ваш продукт на конференции в Москве и заинтересовались. Можете рассказать подробнее о возможностях интеграции с нашей текущей CRM-системой?\n\nТакже хотелось бы узнать про цены и условия для компаний от 200 сотрудников.\n\nС уважением,\nАлексей Петров',
      },
      {
        id: 2,
        from: {
          name: 'Вы',
          company: 'OutreachAI',
          email: 'team@outreachai.com',
          avatar: 'ОА',
        },
        to: contacts[1].email,
        time: '11:05',
        subject: 'Re: Интерес к решению для автоматизации',
        body: 'Здравствуйте, Алексей!\n\nСпасибо за интерес к нашему продукту. Рад, что вы нас заметили на конференции.\n\nМы поддерживаем интеграцию с Salesforce, HubSpot, amoCRM и Bitrix24. Также есть REST API для кастомной интеграции.\n\nДля компаний от 200 сотрудников у нас есть специальное enterprise-предложение. Давайте запланимаем демо-звонок на этой неделе?\n\nБуду рад обсудить все детали.\n\nС уважением,\nКоманда OutreachAI',
      },
      {
        id: 3,
        from: contacts[1],
        to: 'вы',
        time: '14:20',
        subject: 'Re: Интерес к решению для автоматизации',
        body: 'Отлично! Давайте в четверг в 15:00 по Москве. Нам это подходит.\n\nКстати, мы используемamoCRM — было бы здорово увидеть демо именно с нашей системой.\n\nОтправлю приглашение через календарь.\n\n— Алексей',
      },
    ],
  },
  2: {
    subject: 'Уточнение деталей по интеграции',
    messages: [
      {
        id: 1,
        from: contacts[2],
        to: 'вы',
        time: '09:15',
        subject: 'Уточнение деталей по интеграции',
        body: 'Добрый день!\n\nСпасибо за ваше предложение по интеграции с DataFlow. Мы изучили документацию и у нас осталось несколько вопросов:\n\n1. Поддерживает ли ваш API webhook-уведомления?\n2. Какой лимит на количество запросов в минуту?\n3. Есть ли возможность SSO-авторизации?\n\nТакже прикрепила техническое задание для нашей команды.\n\nМария Козлова\nCTO, DataFlow',
      },
      {
        id: 2,
        from: {
          name: 'Вы',
          company: 'OutreachAI',
          email: 'team@outreachai.com',
          avatar: 'ОА',
        },
        to: contacts[2].email,
        time: '09:48',
        subject: 'Re: Уточнение деталей по интеграции',
        body: 'Здравствуйте, Мария!\n\nОтвечаю на ваши вопросы:\n\n1. Да, мы поддерживаем webhook-уведомления для всех основных событий.\n2. Enterprise-тариф включает 1000 req/min, можно увеличить.\n3. SSO доступен на Enterprise-плане (SAML 2.0 и OIDC).\n\nИзучим ТЗ и вернёмся с предложением до конца дня.\n\n— Команда OutreachAI',
      },
      {
        id: 3,
        from: contacts[2],
        to: 'вы',
        time: '10:22',
        subject: 'Re: Уточнение деталей по интеграции',
        body: 'Спасибо за оперативный ответ! SSO — это критично для нас, так что enterprise-план нам подходит.\n\nБуду ждать ваше предложение. Если понадобится дополнительная информация — пишите.\n\n— Мария',
      },
    ],
  },
}

const sources = [
  { name: 'Техническая документация API', relevance: 94, icon: FileText },
  { name: 'Прайс-лист Enterprise 2024', relevance: 87, icon: Database },
  { name: 'Кейсы интеграции с amoCRM', relevance: 72, icon: Globe },
]

const inboxFilters: { key: InboxFilter; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'unread', label: 'Непрочитанные' },
  { key: 'replied', label: 'С ответом' },
  { key: 'important', label: 'Важные' },
]

export default function InboxView() {
  const [selectedEmailId, setSelectedEmailId] = useState<number>(1)
  const [activeFilter, setActiveFilter] = useState<InboxFilter>('all')
  const [replyText, setReplyText] = useState('')

  const thread = threads[selectedEmailId]
  const selectedEmail = inboxItems.find((e) => e.id === selectedEmailId)

  const filteredInbox = inboxItems.filter((item) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'unread') return item.unread
    if (activeFilter === 'replied') return item.replied
    if (activeFilter === 'important') return item.important
    return true
  })

  const confidence = 87

  return (
    <div className="flex h-full text-[13.5px] text-[#171717] font-[family-name:var(--font-geist-sans)] rounded-[10px] border border-[#e8e8e8] overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
      {/* Left panel: Email list */}
      <div className="w-[320px] border-r border-[#e8e8e8] flex flex-col bg-white shrink-0">
        {/* Header */}
        <div className="p-4 border-b border-[#e8e8e8]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Inbox className="size-4 text-[#0d0d0d]" />
              <h2 className="text-[15px] font-semibold text-[#0d0d0d]">
                Входящие
              </h2>
            </div>
            <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-[#dc2626] text-white text-[11px] font-semibold">
              12
            </span>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-1.5">
            {inboxFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-2.5 py-1 rounded-full text-[12px] font-medium transition-colors ${
                  activeFilter === f.key
                    ? 'bg-[#0d0d0d] text-white'
                    : 'bg-[#f5f5f5] text-[#737373] hover:bg-[#e8e8e8]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Email list */}
        <div className="flex-1 overflow-y-auto">
          {filteredInbox.map((item) => {
            const isSelected = item.id === selectedEmailId
            return (
              <button
                key={item.id}
                onClick={() => setSelectedEmailId(item.id)}
                className={`w-full text-left px-4 py-3 border-b border-[#f5f5f5] transition-colors hover:bg-[#fafafa] ${
                  isSelected ? 'bg-[#f5f5f5]' : 'bg-white'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {/* Unread indicator */}
                  {item.unread && (
                    <span className="mt-[7px] w-[3px] h-[3px] rounded-full bg-[#0d0d0d] shrink-0" />
                  )}
                  {!item.unread && <span className="w-[3px] shrink-0" />}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span
                        className={`text-[13px] truncate ${
                          item.unread
                            ? 'font-semibold text-[#0d0d0d]'
                            : 'font-medium text-[#525252]'
                        }`}
                      >
                        {item.sender.name}
                      </span>
                      <span
                        className={`text-[11px] shrink-0 ml-2 ${
                          item.unread
                            ? 'text-[#0d0d0d] font-medium'
                            : 'text-[#a3a3a3]'
                        }`}
                      >
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#a3a3a3] truncate mb-0.5">
                      {item.sender.company}
                    </p>
                    <p
                      className={`text-[12.5px] truncate ${
                        item.unread
                          ? 'text-[#404040]'
                          : 'text-[#a3a3a3]'
                      }`}
                    >
                      {item.preview}
                    </p>
                  </div>

                  {/* Icons row */}
                  <div className="flex flex-col items-center gap-1 pt-0.5 shrink-0">
                    {item.important && (
                      <Star className="size-3 text-[#d97706] fill-[#d97706]" />
                    )}
                    {item.hasAttachment && (
                      <Paperclip className="size-3 text-[#a3a3a3]" />
                    )}
                  </div>
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
                  {selectedEmail.sender.avatar}
                </div>
                <div>
                  <p className="text-[13.5px] font-medium text-[#0d0d0d]">
                    {selectedEmail.sender.name}
                  </p>
                  <p className="text-[12px] text-[#a3a3a3]">
                    {selectedEmail.sender.company} &middot;{' '}
                    {selectedEmail.sender.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Thread messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="flex flex-col gap-4">
                {thread.messages.map((msg, idx) => {
                  const isMe = msg.from.company === 'OutreachAI'
                  return (
                    <div
                      key={msg.id}
                      className={`rounded-[10px] border border-[#e8e8e8] p-4 ${
                        isMe ? 'bg-[#fafafa]' : 'bg-white'
                      }`}
                    >
                      {/* Message header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex items-center justify-center size-6 rounded-full text-[10px] font-semibold ${
                              isMe
                                ? 'bg-[#0d0d0d] text-white'
                                : 'bg-[#f5f5f5] text-[#525252]'
                            }`}
                          >
                            {msg.from.avatar}
                          </div>
                          <span className="text-[13px] font-semibold text-[#0d0d0d]">
                            {msg.from.name}
                          </span>
                          {!isMe && (
                            <span className="text-[12px] text-[#a3a3a3]">
                              {msg.from.company}
                            </span>
                          )}
                          {isMe && (
                            <span className="text-[12px] text-[#a3a3a3]">
                              мне
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#a3a3a3]">
                          {msg.time}
                        </span>
                      </div>

                      {/* Message body */}
                      <div className="text-[13px] text-[#404040] leading-relaxed whitespace-pre-line">
                        {msg.body}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Draft reply area */}
            <div className="border-t border-[#e8e8e8] p-4">
              <div className="border border-[#e8e8e8] rounded-[10px] bg-white overflow-hidden">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Напишите ответ..."
                  rows={3}
                  className="w-full px-4 py-3 text-[13px] text-[#171717] placeholder:text-[#a3a3a3] resize-none outline-none bg-transparent"
                />
                <div className="flex items-center justify-between px-3 py-2 border-t border-[#f5f5f5] bg-[#fafafa]">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-md text-[#a3a3a3] hover:text-[#525252] hover:bg-[#f0f0f0] transition-colors">
                      <Paperclip className="size-3.5" />
                    </button>
                    <button className="p-1.5 rounded-md text-[#a3a3a3] hover:text-[#525252] hover:bg-[#f0f0f0] transition-colors">
                      <MoreHorizontal className="size-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-[7px] text-[12px] font-medium text-[#737373] hover:bg-[#f0f0f0] transition-colors">
                      Отменить
                    </button>
                    <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[7px] bg-[#0d0d0d] text-white text-[12px] font-medium hover:bg-[#262626] transition-colors">
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

      {/* Right panel: RAG / AI assistant */}
      <div className="w-[280px] border-l border-[#e8e8e8] flex flex-col bg-[#fafafa] shrink-0">
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
                  className={`size-4 ${
                    confidence >= 80
                      ? 'text-[#16a34a]'
                      : confidence >= 50
                        ? 'text-[#d97706]'
                        : 'text-[#dc2626]'
                  }`}
                />
              </div>
              <div className="w-full h-[6px] bg-[#f0f0f0] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    confidence >= 80
                      ? 'bg-[#16a34a]'
                      : confidence >= 50
                        ? 'bg-[#d97706]'
                        : 'bg-[#dc2626]'
                  }`}
                  style={{ width: `${confidence}%` }}
                />
              </div>
              <p className="text-[11px] text-[#a3a3a3] mt-1.5">
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
                      <p className="text-[11px] text-[#a3a3a3]">
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
          <div className="rounded-[8px] bg-[#fef3c7] border border-[#fde68a] p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="size-4 text-[#d97706] shrink-0 mt-0.5" />
              <div>
                <p className="text-[12px] font-semibold text-[#92400e] mb-0.5">
                  Недостающая информация
                </p>
                <p className="text-[11px] text-[#a16207] leading-relaxed">
                  Нет данных о текущих акциях и специальных предложениях.
                  Добавьте информацию для более точных ответов.
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
              <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-[8px] border border-[#e8e8e8] bg-white text-[12.5px] font-medium text-[#404040] hover:bg-[#f5f5f5] transition-colors">
                <Sparkles className="size-3.5" />
                Редактировать
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-[8px] border border-[#e8e8e8] bg-white text-[12.5px] font-medium text-[#404040] hover:bg-[#f5f5f5] transition-colors">
                <Send className="size-3.5" />
                Отправить как есть
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-[8px] bg-[#0d0d0d] text-white text-[12.5px] font-medium hover:bg-[#262626] transition-colors">
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
