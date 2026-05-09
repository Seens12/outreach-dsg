'use client'

import { useState } from 'react'
import {
  Globe,
  Mail,
  HardDrive,
  Layers,
  Save,
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { toast } from 'sonner'

export default function AdminSystemView() {
  const [maintenance, setMaintenance] = useState(false)
  const [smtpEnabled, setSmtpEnabled] = useState(true)
  const [queueEnabled, setQueueEnabled] = useState(true)

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scroll">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#e8e8e8]">
        <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">Система</h1>
        <p className="text-sm text-[#737373] mt-0.5">Системные настройки</p>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {/* General settings */}
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white">
          <CardHeader className="pb-0">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#525252]" />
              <CardTitle className="text-sm font-semibold text-[#171717]">
                Общие настройки
              </CardTitle>
            </div>
            <CardDescription className="text-[13px]">
              Основные параметры системы
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[13px] font-medium text-[#525252]">
                  Название системы
                </Label>
                <input
                  type="text"
                  defaultValue="OutreachAI"
                  className="w-full h-9 px-3 rounded-lg border border-[#e8e8e8] bg-white text-sm outline-none focus:border-[#737373] transition-colors text-[#171717]"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[13px] font-medium text-[#525252]">
                  URL системы
                </Label>
                <input
                  type="text"
                  defaultValue="https://app.outreachai.io"
                  className="w-full h-9 px-3 rounded-lg border border-[#e8e8e8] bg-white text-sm outline-none focus:border-[#737373] transition-colors text-[#171717]"
                />
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[#e8e8e8]">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-[#d97706]" />
                <div>
                  <div className="text-[13px] font-medium text-[#171717]">
                    Режим обслуживания
                  </div>
                  <div className="text-[12px] text-[#a8a8a8]">
                    Отключить доступ для всех пользователей
                  </div>
                </div>
              </div>
              <Switch
                checked={maintenance}
                onCheckedChange={setMaintenance}
              />
            </div>
          </CardContent>
        </div>

        {/* Email settings */}
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white">
          <CardHeader className="pb-0">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#525252]" />
              <CardTitle className="text-sm font-semibold text-[#171717]">
                Настройки email
              </CardTitle>
            </div>
            <CardDescription className="text-[13px]">
              Конфигурация почтового сервера
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[13px] font-medium text-[#525252]">
                  SMTP хост
                </Label>
                <input
                  type="text"
                  defaultValue="smtp.outreachai.io"
                  className="w-full h-9 px-3 rounded-lg border border-[#e8e8e8] bg-white text-sm outline-none focus:border-[#737373] transition-colors text-[#171717]"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[13px] font-medium text-[#525252]">
                  SMTP порт
                </Label>
                <input
                  type="text"
                  defaultValue="587"
                  className="w-full h-9 px-3 rounded-lg border border-[#e8e8e8] bg-white text-sm outline-none focus:border-[#737373] transition-colors text-[#171717]"
                />
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[#e8e8e8]">
              <div>
                <div className="text-[13px] font-medium text-[#171717]">
                  Лимит отправки в день
                </div>
                <div className="text-[12px] text-[#a8a8a8]">
                  Максимальное количество писем на тенант в сутки
                </div>
              </div>
              <span className="text-[13px] font-semibold text-[#171717]">
                1 000
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[#e8e8e8]">
              <div>
                <div className="text-[13px] font-medium text-[#171717]">
                  Включить SMTP
                </div>
                <div className="text-[12px] text-[#a8a8a8]">
                  Использовать собственный SMTP-сервер
                </div>
              </div>
              <Switch
                checked={smtpEnabled}
                onCheckedChange={setSmtpEnabled}
              />
            </div>
          </CardContent>
        </div>

        {/* Storage */}
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white">
          <CardHeader className="pb-0">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-[#525252]" />
              <CardTitle className="text-sm font-semibold text-[#171717]">
                Хранилище
              </CardTitle>
            </div>
            <CardDescription className="text-[13px]">
              Использование дискового пространства
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#525252]">
                Занято: <span className="font-medium text-[#171717]">24.7 GB</span> из 100 GB
              </span>
              <span className="text-[13px] font-semibold text-[#171717]">
                24.7%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#e8e8e8] overflow-hidden">
              <div className="h-full rounded-full bg-[#0d0d0d] transition-all" style={{ width: '24.7%' }} />
            </div>
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center p-3 rounded-lg bg-[#fafafa]">
                <div className="text-[12px] text-[#a8a8a8]">База данных</div>
                <div className="text-sm font-semibold text-[#171717] mt-1">12.3 GB</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-[#fafafa]">
                <div className="text-[12px] text-[#a8a8a8]">Файлы</div>
                <div className="text-sm font-semibold text-[#171717] mt-1">8.1 GB</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-[#fafafa]">
                <div className="text-[12px] text-[#a8a8a8]">Логи</div>
                <div className="text-sm font-semibold text-[#171717] mt-1">4.3 GB</div>
              </div>
            </div>
          </CardContent>
        </div>

        {/* Queue settings */}
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white">
          <CardHeader className="pb-0">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#525252]" />
              <CardTitle className="text-sm font-semibold text-[#171717]">
                Очередь задач
              </CardTitle>
            </div>
            <CardDescription className="text-[13px]">
              Настройки фоновой обработки
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-[13px] font-medium text-[#171717]">
                  Включить очередь
                </div>
                <div className="text-[12px] text-[#a8a8a8]">
                  Фоновая обработка задач
                </div>
              </div>
              <Switch
                checked={queueEnabled}
                onCheckedChange={setQueueEnabled}
              />
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[#e8e8e8]">
              <div>
                <div className="text-[13px] font-medium text-[#171717]">
                  Задач в очереди
                </div>
              </div>
              <span className="text-[13px] font-semibold text-[#16a34a]">
                3 (обработка)
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[#e8e8e8]">
              <div>
                <div className="text-[13px] font-medium text-[#171717]">
                  Обработано за 24ч
                </div>
              </div>
              <span className="text-[13px] font-semibold text-[#171717]">
                1 247
              </span>
            </div>
          </CardContent>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <Button onClick={() => toast.success('Настройки системы сохранены')} className="rounded-[10px] bg-[#0d0d0d] hover:bg-[#262626] text-white text-[13px] gap-2">
            <Save className="w-4 h-4" />
            Сохранить настройки
          </Button>
        </div>
      </div>
    </div>
  )
}
