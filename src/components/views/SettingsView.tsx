'use client'

import { useState } from 'react'
import {
  User,
  Mail,
  Building2,
  Briefcase,
  Phone,
  Camera,
  Save,
  Globe,
  Clock,
  CalendarDays,
  Languages,
  Upload,
  Check,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

/* ── Tabs ──────────────────────────────────────────────── */

const tabs = ['Профиль', 'Компания', 'Внешний вид'] as const
type Tab = typeof tabs[number]

/* ── Onboarding Steps ──────────────────────────────────── */

const onboardingSteps = [
  { label: 'Профиль', done: true },
  { label: 'Компания', done: true },
  { label: 'Ящик', done: true },
  { label: 'Домен', done: true },
  { label: 'Первая кампания', done: false },
]

/* ── Component ─────────────────────────────────────────── */

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState<Tab>('Профиль')

  return (
    <div className="flex flex-col gap-5 p-6 text-[13.5px] text-[#171717] overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
          Настройки
        </h1>
        <p className="text-[13px] text-[#737373] mt-1">
          Управление профилем и настройками аккаунта
        </p>
      </div>

      {/* Custom Tab Bar */}
      <div className="flex gap-0 border-b border-[#e8e8e8]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-5 py-2.5 text-[13px] font-medium transition-colors cursor-pointer ${
              activeTab === tab
                ? 'text-[#0d0d0d]'
                : 'text-[#a3a3a3] hover:text-[#525252]'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0d0d0d] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Профиль' && (
        <div className="flex flex-col gap-5">
          {/* Photo + Name/Email/Phone/Position */}
          <div className="rounded-[10px] border border-[#e8e8e8] bg-white p-5 shadow-card">
            <h3 className="text-[14px] font-semibold text-[#0d0d0d] mb-5">Личная информация</h3>

            {/* Photo */}
            <div className="flex items-center gap-5 mb-6">
              <div className="relative w-[72px] h-[72px] rounded-full bg-[#f5f5f5] border border-[#e8e8e8] flex items-center justify-center shrink-0">
                <User className="w-7 h-7 text-[#a3a3a3]" />
                <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center cursor-pointer hover:bg-[#262626] transition-colors">
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[#0d0d0d]">Алексей Петров</div>
                <div className="text-[12.5px] text-[#737373] mt-0.5">alexey@company.ru</div>
                <button className="text-[12px] text-[#525252] font-medium hover:text-[#0d0d0d] mt-1 cursor-pointer">
                  Изменить фото
                </button>
              </div>
            </div>

            {/* Fields */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  Имя
                </Label>
                <Input defaultValue="Алексей Петров" className="border-[#e8e8e8] h-10 rounded-[8px] text-[13px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <Mail className="w-3 h-3" />
                  Email
                </Label>
                <Input defaultValue="alexey@company.ru" readOnly className="border-[#e8e8e8] h-10 rounded-[8px] text-[13px] bg-[#fafafa] text-[#a3a3a3]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <Phone className="w-3 h-3" />
                  Телефон
                </Label>
                <Input defaultValue="+7 (999) 123-45-67" className="border-[#e8e8e8] h-10 rounded-[8px] text-[13px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3" />
                  Должность
                </Label>
                <Input defaultValue="Head of Sales" className="border-[#e8e8e8] h-10 rounded-[8px] text-[13px]" />
              </div>
            </div>
          </div>

          {/* Profile completeness */}
          <div className="rounded-[10px] border border-[#e8e8e8] bg-white p-5 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-medium text-[#525252]">Заполненность профиля</span>
              <span className="text-[13px] font-semibold text-[#0d0d0d]">80%</span>
            </div>
            <div className="h-2 rounded-full bg-[#f5f5f5] overflow-hidden">
              <div className="h-full rounded-full bg-[#0d0d0d]" style={{ width: '80%' }} />
            </div>
            <p className="text-[12px] text-[#a3a3a3] mt-2">Добавьте фото и номер телефона для полного профиля</p>
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <button
              onClick={() => toast.success('Профиль сохранён')}
              className="flex items-center gap-2 h-10 px-5 rounded-[8px] bg-[#0d0d0d] text-white text-[13px] font-medium hover:bg-[#262626] transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Сохранить изменения
            </button>
          </div>
        </div>
      )}

      {activeTab === 'Компания' && (
        <div className="flex flex-col gap-5">
          <div className="rounded-[10px] border border-[#e8e8e8] bg-white p-5 shadow-card">
            <h3 className="text-[14px] font-semibold text-[#0d0d0d] mb-5">Информация о компании</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <Building2 className="w-3 h-3" />
                  Название компании
                </Label>
                <Input defaultValue="Tech Solutions LLC" className="border-[#e8e8e8] h-10 rounded-[8px] text-[13px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3" />
                  Отрасль
                </Label>
                <Select defaultValue="it">
                  <SelectTrigger className="w-full border-[#e8e8e8] h-10 rounded-[8px] text-[13px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">IT и Разработка ПО</SelectItem>
                    <SelectItem value="fintech">Финтех</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="consulting">Консалтинг</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <Globe className="w-3 h-3" />
                  Веб-сайт
                </Label>
                <Input defaultValue="https://techsolutions.ru" className="border-[#e8e8e8] h-10 rounded-[8px] text-[13px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  Количество сотрудников
                </Label>
                <Select defaultValue="11-50">
                  <SelectTrigger className="w-full border-[#e8e8e8] h-10 rounded-[8px] text-[13px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1–10</SelectItem>
                    <SelectItem value="11-50">11–50</SelectItem>
                    <SelectItem value="51-200">51–200</SelectItem>
                    <SelectItem value="201-500">201–500</SelectItem>
                    <SelectItem value="500+">500+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => toast.success('Данные компании сохранены')}
              className="flex items-center gap-2 h-10 px-5 rounded-[8px] bg-[#0d0d0d] text-white text-[13px] font-medium hover:bg-[#262626] transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Сохранить изменения
            </button>
          </div>
        </div>
      )}

      {activeTab === 'Внешний вид' && (
        <div className="flex flex-col gap-5">
          <div className="rounded-[10px] border border-[#e8e8e8] bg-white p-5 shadow-card">
            <h3 className="text-[14px] font-semibold text-[#0d0d0d] mb-5">Настройки интерфейса</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <Languages className="w-3 h-3" />
                  Язык
                </Label>
                <Select defaultValue="ru">
                  <SelectTrigger className="w-full border-[#e8e8e8] h-10 rounded-[8px] text-[13px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  Часовой пояс
                </Label>
                <Select defaultValue="europe-moscow">
                  <SelectTrigger className="w-full border-[#e8e8e8] h-10 rounded-[8px] text-[13px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe-moscow">Europe/Moscow (UTC+3)</SelectItem>
                    <SelectItem value="europe-kiev">Europe/Kiev (UTC+2)</SelectItem>
                    <SelectItem value="europe-london">Europe/London (UTC+0)</SelectItem>
                    <SelectItem value="america-new-york">America/New_York (UTC-5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <CalendarDays className="w-3 h-3" />
                  Формат даты
                </Label>
                <Select defaultValue="dd.mm.yyyy">
                  <SelectTrigger className="w-full border-[#e8e8e8] h-10 rounded-[8px] text-[13px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd.mm.yyyy">ДД.ММ.ГГГГ</SelectItem>
                    <SelectItem value="mm.dd.yyyy">ММ.ДД.ГГГГ</SelectItem>
                    <SelectItem value="yyyy-mm-dd">ГГГГ-ММ-ДД</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => toast.success('Настройки внешнего вида сохранены')}
              className="flex items-center gap-2 h-10 px-5 rounded-[8px] bg-[#0d0d0d] text-white text-[13px] font-medium hover:bg-[#262626] transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Сохранить изменения
            </button>
          </div>
        </div>
      )}

      {/* Onboarding Section */}
      <div className="rounded-[10px] border border-[#e8e8e8] bg-white p-5 shadow-card">
        <h3 className="text-[14px] font-semibold text-[#0d0d0d] mb-1">Онбординг</h3>
        <p className="text-[12.5px] text-[#a3a3a3] mb-4">Завершите все шаги для полного начала работы</p>

        <div className="flex items-center gap-0">
          {onboardingSteps.map((step, i) => {
            const isLast = i === onboardingSteps.length - 1
            return (
              <div key={step.label} className="flex items-center">
                {/* Step circle + connector */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold border-2 transition-colors ${
                    step.done
                      ? 'bg-[#0d0d0d] border-[#0d0d0d] text-white'
                      : 'bg-white border-[#e8e8e8] text-[#a3a3a3]'
                  }`}>
                    {step.done ? <Check className="w-3.5 h-3.5" /> : i + 1}
                  </div>
                  <span className={`text-[10.5px] font-medium whitespace-nowrap ${step.done ? 'text-[#525252]' : 'text-[#a3a3a3]'}`}>
                    {step.label}
                  </span>
                </div>
                {!isLast && (
                  <div className={`w-8 h-[2px] mx-1.5 mb-4 rounded-full ${step.done ? 'bg-[#0d0d0d]' : 'bg-[#e8e8e8]'}`} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
