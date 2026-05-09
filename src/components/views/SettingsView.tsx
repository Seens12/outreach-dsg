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
  Pencil,
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import { toast } from 'sonner'

/* ── Tabs ──────────────────────────────────────────────── */

const tabs = ['Профиль', 'Компания', 'Внешний вид'] as const
type Tab = typeof tabs[number]

/* ── Drawer Section Types ──────────────────────────────── */

type DrawerSection = 'profile' | 'company' | 'appearance' | null

/* ── Form Defaults ─────────────────────────────────────── */

const profileDefaults = {
  name: 'Алексей Петров',
  email: 'alexey@company.ru',
  phone: '+7 (999) 123-45-67',
  position: 'Head of Sales',
}

const companyDefaults = {
  companyName: 'Tech Solutions LLC',
  industry: 'it',
  website: 'https://techsolutions.ru',
  employeeCount: '11-50',
}

const appearanceDefaults = {
  language: 'ru',
  timezone: 'europe-moscow',
  dateFormat: 'dd.mm.yyyy',
}

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

  // Drawer state
  const [openDrawer, setOpenDrawer] = useState<DrawerSection>(null)

  // Profile form state
  const [profileForm, setProfileForm] = useState(profileDefaults)

  // Company form state
  const [companyForm, setCompanyForm] = useState(companyDefaults)

  // Appearance form state
  const [appearanceForm, setAppearanceForm] = useState(appearanceDefaults)

  // Helpers
  const openSectionDrawer = (section: DrawerSection) => {
    setOpenDrawer(section)
  }

  const closeDrawer = () => {
    setOpenDrawer(null)
  }

  const handleProfileSave = () => {
    setOpenDrawer(null)
    toast.success('Профиль сохранён')
  }

  const handleCompanySave = () => {
    setOpenDrawer(null)
    toast.success('Данные компании сохранены')
  }

  const handleAppearanceSave = () => {
    setOpenDrawer(null)
    toast.success('Настройки внешнего вида сохранены')
  }

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
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[14px] font-semibold text-[#0d0d0d]">Личная информация</h3>
              <button
                onClick={() => openSectionDrawer('profile')}
                className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] border border-[#e8e8e8] bg-white text-[12.5px] font-medium text-[#525252] hover:text-[#0d0d0d] hover:border-[#d4d4d4] transition-colors cursor-pointer"
              >
                <Pencil className="w-3 h-3" />
                Изменить
              </button>
            </div>

            {/* Photo */}
            <div className="flex items-center gap-5 mb-6">
              <div className="relative w-[72px] h-[72px] rounded-full bg-[#f5f5f5] border border-[#e8e8e8] flex items-center justify-center shrink-0">
                <User className="w-7 h-7 text-[#a3a3a3]" />
                <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center cursor-pointer hover:bg-[#262626] transition-colors">
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[#0d0d0d]">{profileForm.name}</div>
                <div className="text-[12.5px] text-[#737373] mt-0.5">{profileForm.email}</div>
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
                <Input defaultValue={profileForm.name} className="border-[#e8e8e8] h-10 rounded-[8px] text-[13px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <Mail className="w-3 h-3" />
                  Email
                </Label>
                <Input defaultValue={profileForm.email} readOnly className="border-[#e8e8e8] h-10 rounded-[8px] text-[13px] bg-[#fafafa] text-[#a3a3a3]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <Phone className="w-3 h-3" />
                  Телефон
                </Label>
                <Input defaultValue={profileForm.phone} className="border-[#e8e8e8] h-10 rounded-[8px] text-[13px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3" />
                  Должность
                </Label>
                <Input defaultValue={profileForm.position} className="border-[#e8e8e8] h-10 rounded-[8px] text-[13px]" />
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
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[14px] font-semibold text-[#0d0d0d]">Информация о компании</h3>
              <button
                onClick={() => openSectionDrawer('company')}
                className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] border border-[#e8e8e8] bg-white text-[12.5px] font-medium text-[#525252] hover:text-[#0d0d0d] hover:border-[#d4d4d4] transition-colors cursor-pointer"
              >
                <Pencil className="w-3 h-3" />
                Изменить
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <Building2 className="w-3 h-3" />
                  Название компании
                </Label>
                <Input defaultValue={companyForm.companyName} className="border-[#e8e8e8] h-10 rounded-[8px] text-[13px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3" />
                  Отрасль
                </Label>
                <Select defaultValue={companyForm.industry}>
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
                <Input defaultValue={companyForm.website} className="border-[#e8e8e8] h-10 rounded-[8px] text-[13px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  Количество сотрудников
                </Label>
                <Select defaultValue={companyForm.employeeCount}>
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
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[14px] font-semibold text-[#0d0d0d]">Настройки интерфейса</h3>
              <button
                onClick={() => openSectionDrawer('appearance')}
                className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] border border-[#e8e8e8] bg-white text-[12.5px] font-medium text-[#525252] hover:text-[#0d0d0d] hover:border-[#d4d4d4] transition-colors cursor-pointer"
              >
                <Pencil className="w-3 h-3" />
                Изменить
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <Languages className="w-3 h-3" />
                  Язык
                </Label>
                <Select defaultValue={appearanceForm.language}>
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
                <Select defaultValue={appearanceForm.timezone}>
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
                <Select defaultValue={appearanceForm.dateFormat}>
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

      {/* ─── Drawer: Личная информация ─────────────────────────── */}
      <Sheet open={openDrawer === 'profile'} onOpenChange={(open) => !open && closeDrawer()}>
        <SheetContent
          side="right"
          className="w-[400px] max-w-[400px] sm:max-w-[400px] bg-white border-[#e8e8e8] rounded-l-[10px] p-0"
        >
          <SheetHeader className="px-6 pt-6 pb-0 border-b border-[#e8e8e8]">
            <SheetTitle className="text-[16px] font-semibold text-[#0d0d0d]">
              Редактирование профиля
            </SheetTitle>
            <SheetDescription className="text-[12.5px] text-[#a3a3a3]">
              Измените личную информацию вашего профиля
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-5 custom-scroll">
            <div className="flex flex-col gap-4">
              {/* Photo in drawer */}
              <div className="flex items-center gap-4 pb-4 border-b border-[#e8e8e8]">
                <div className="relative w-[56px] h-[56px] rounded-full bg-[#f5f5f5] border border-[#e8e8e8] flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-[#a3a3a3]" />
                  <button className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center cursor-pointer hover:bg-[#262626] transition-colors">
                    <Camera className="w-2.5 h-2.5" />
                  </button>
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[#0d0d0d]">{profileForm.name}</div>
                  <div className="text-[12px] text-[#737373] mt-0.5">{profileForm.email}</div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  Имя
                </Label>
                <Input
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="border-[#e8e8e8] h-10 rounded-[8px] text-[13px] text-[#171717]"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <Mail className="w-3 h-3" />
                  Email
                </Label>
                <Input
                  value={profileForm.email}
                  readOnly
                  className="border-[#e8e8e8] h-10 rounded-[8px] text-[13px] bg-[#fafafa] text-[#a3a3a3]"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <Phone className="w-3 h-3" />
                  Телефон
                </Label>
                <Input
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="border-[#e8e8e8] h-10 rounded-[8px] text-[13px] text-[#171717]"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3" />
                  Должность
                </Label>
                <Input
                  value={profileForm.position}
                  onChange={(e) => setProfileForm({ ...profileForm, position: e.target.value })}
                  className="border-[#e8e8e8] h-10 rounded-[8px] text-[13px] text-[#171717]"
                />
              </div>
            </div>
          </div>

          <SheetFooter className="px-6 py-4 border-t border-[#e8e8e8] flex-row gap-3">
            <button
              onClick={closeDrawer}
              className="flex-1 flex items-center justify-center h-10 px-4 rounded-[8px] border border-[#e8e8e8] bg-white text-[13px] font-medium text-[#525252] hover:text-[#0d0d0d] hover:border-[#d4d4d4] transition-colors cursor-pointer"
            >
              Отмена
            </button>
            <button
              onClick={handleProfileSave}
              className="flex-1 flex items-center justify-center gap-2 h-10 px-4 rounded-[8px] bg-[#0d0d0d] text-white text-[13px] font-medium hover:bg-[#262626] transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Сохранить
            </button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* ─── Drawer: Информация о компании ──────────────────────── */}
      <Sheet open={openDrawer === 'company'} onOpenChange={(open) => !open && closeDrawer()}>
        <SheetContent
          side="right"
          className="w-[400px] max-w-[400px] sm:max-w-[400px] bg-white border-[#e8e8e8] rounded-l-[10px] p-0"
        >
          <SheetHeader className="px-6 pt-6 pb-0 border-b border-[#e8e8e8]">
            <SheetTitle className="text-[16px] font-semibold text-[#0d0d0d]">
              Редактирование компании
            </SheetTitle>
            <SheetDescription className="text-[12.5px] text-[#a3a3a3]">
              Обновите информацию о вашей компании
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-5 custom-scroll">
            <div className="flex flex-col gap-4">
              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <Building2 className="w-3 h-3" />
                  Название компании
                </Label>
                <Input
                  value={companyForm.companyName}
                  onChange={(e) => setCompanyForm({ ...companyForm, companyName: e.target.value })}
                  className="border-[#e8e8e8] h-10 rounded-[8px] text-[13px] text-[#171717]"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3" />
                  Отрасль
                </Label>
                <Select
                  value={companyForm.industry}
                  onValueChange={(val) => setCompanyForm({ ...companyForm, industry: val })}
                >
                  <SelectTrigger className="w-full border-[#e8e8e8] h-10 rounded-[8px] text-[13px] text-[#171717]">
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
                <Input
                  value={companyForm.website}
                  onChange={(e) => setCompanyForm({ ...companyForm, website: e.target.value })}
                  className="border-[#e8e8e8] h-10 rounded-[8px] text-[13px] text-[#171717]"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  Количество сотрудников
                </Label>
                <Select
                  value={companyForm.employeeCount}
                  onValueChange={(val) => setCompanyForm({ ...companyForm, employeeCount: val })}
                >
                  <SelectTrigger className="w-full border-[#e8e8e8] h-10 rounded-[8px] text-[13px] text-[#171717]">
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

          <SheetFooter className="px-6 py-4 border-t border-[#e8e8e8] flex-row gap-3">
            <button
              onClick={closeDrawer}
              className="flex-1 flex items-center justify-center h-10 px-4 rounded-[8px] border border-[#e8e8e8] bg-white text-[13px] font-medium text-[#525252] hover:text-[#0d0d0d] hover:border-[#d4d4d4] transition-colors cursor-pointer"
            >
              Отмена
            </button>
            <button
              onClick={handleCompanySave}
              className="flex-1 flex items-center justify-center gap-2 h-10 px-4 rounded-[8px] bg-[#0d0d0d] text-white text-[13px] font-medium hover:bg-[#262626] transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Сохранить
            </button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* ─── Drawer: Настройки интерфейса ─────────────────────── */}
      <Sheet open={openDrawer === 'appearance'} onOpenChange={(open) => !open && closeDrawer()}>
        <SheetContent
          side="right"
          className="w-[400px] max-w-[400px] sm:max-w-[400px] bg-white border-[#e8e8e8] rounded-l-[10px] p-0"
        >
          <SheetHeader className="px-6 pt-6 pb-0 border-b border-[#e8e8e8]">
            <SheetTitle className="text-[16px] font-semibold text-[#0d0d0d]">
              Настройки интерфейса
            </SheetTitle>
            <SheetDescription className="text-[12.5px] text-[#a3a3a3]">
              Настройте язык, часовой пояс и формат даты
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-5 custom-scroll">
            <div className="flex flex-col gap-4">
              <div className="space-y-1.5">
                <Label className="text-[12px] text-[#737373] font-medium flex items-center gap-1.5">
                  <Languages className="w-3 h-3" />
                  Язык
                </Label>
                <Select
                  value={appearanceForm.language}
                  onValueChange={(val) => setAppearanceForm({ ...appearanceForm, language: val })}
                >
                  <SelectTrigger className="w-full border-[#e8e8e8] h-10 rounded-[8px] text-[13px] text-[#171717]">
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
                <Select
                  value={appearanceForm.timezone}
                  onValueChange={(val) => setAppearanceForm({ ...appearanceForm, timezone: val })}
                >
                  <SelectTrigger className="w-full border-[#e8e8e8] h-10 rounded-[8px] text-[13px] text-[#171717]">
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
                <Select
                  value={appearanceForm.dateFormat}
                  onValueChange={(val) => setAppearanceForm({ ...appearanceForm, dateFormat: val })}
                >
                  <SelectTrigger className="w-full border-[#e8e8e8] h-10 rounded-[8px] text-[13px] text-[#171717]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd.mm.yyyy">ДД.ММ.ГГГГ</SelectItem>
                    <SelectItem value="mm.dd.yyyy">ММ.ДД.ГГГГ</SelectItem>
                    <SelectItem value="yyyy-mm-dd">ГГГГ-ММ-ДД</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Preview card inside drawer */}
              <div className="rounded-[10px] border border-[#e8e8e8] bg-[#fafafa] p-4 mt-2">
                <p className="text-[12px] font-medium text-[#525252] mb-2">Предпросмотр</p>
                <div className="text-[13px] text-[#171717] space-y-1">
                  <p>Язык: <span className="font-medium">{appearanceForm.language === 'ru' ? 'Русский' : appearanceForm.language === 'en' ? 'English' : 'Deutsch'}</span></p>
                  <p>Часовой пояс: <span className="font-medium">{appearanceForm.timezone === 'europe-moscow' ? 'Europe/Moscow (UTC+3)' : appearanceForm.timezone === 'europe-kiev' ? 'Europe/Kiev (UTC+2)' : appearanceForm.timezone === 'europe-london' ? 'Europe/London (UTC+0)' : 'America/New_York (UTC-5)'}</span></p>
                  <p>Дата: <span className="font-medium">01.01.2025</span></p>
                </div>
              </div>
            </div>
          </div>

          <SheetFooter className="px-6 py-4 border-t border-[#e8e8e8] flex-row gap-3">
            <button
              onClick={closeDrawer}
              className="flex-1 flex items-center justify-center h-10 px-4 rounded-[8px] border border-[#e8e8e8] bg-white text-[13px] font-medium text-[#525252] hover:text-[#0d0d0d] hover:border-[#d4d4d4] transition-colors cursor-pointer"
            >
              Отмена
            </button>
            <button
              onClick={handleAppearanceSave}
              className="flex-1 flex items-center justify-center gap-2 h-10 px-4 rounded-[8px] bg-[#0d0d0d] text-white text-[13px] font-medium hover:bg-[#262626] transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Сохранить
            </button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
