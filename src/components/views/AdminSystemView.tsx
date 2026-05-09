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
import { Label } from '@/components/ui/label'
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

      <div className="flex-1 p-6 space-y-5">
        {/* General settings */}
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white">
          <div className="px-5 pt-5 pb-1">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#525252]" />
              <h2 className="text-sm font-semibold text-[#171717]">Общие настройки</h2>
            </div>
            <p className="text-[12.5px] text-[#737373] mt-0.5">Основные параметры системы</p>
          </div>
          <div className="px-5 pt-4 pb-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[13px] font-medium text-[#525252]">Название системы</Label>
                <input
                  type="text"
                  defaultValue="OutreachAI"
                  className="w-full h-9 px-3 rounded-lg border border-[#e8e8e8] bg-white text-sm outline-none focus:border-[#737373] transition-colors text-[#171717]"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[13px] font-medium text-[#525252]">URL системы</Label>
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
                  <div className="text-[13px] font-medium text-[#171717]">Режим обслуживания</div>
                  <div className="text-[12px] text-[#a8a8a8]">Отключить доступ для всех пользователей</div>
                </div>
              </div>
              <Switch checked={maintenance} onCheckedChange={setMaintenance} />
            </div>
          </div>
        </div>

        {/* Email settings */}
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white">
          <div className="px-5 pt-5 pb-1">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#525252]" />
              <h2 className="text-sm font-semibold text-[#171717]">Настройки email</h2>
            </div>
            <p className="text-[12.5px] text-[#737373] mt-0.5">Конфигурация почтового сервера</p>
          </div>
          <div className="px-5 pt-4 pb-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[13px] font-medium text-[#525252]">SMTP хост</Label>
                <input
                  type="text"
                  defaultValue="smtp.outreachai.io"
                  className="w-full h-9 px-3 rounded-lg border border-[#e8e8e8] bg-white text-sm outline-none focus:border-[#737373] transition-colors text-[#171717]"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[13px] font-medium text-[#525252]">SMTP порт</Label>
                <input
                  type="text"
                  defaultValue="587"
                  className="w-full h-9 px-3 rounded-lg border border-[#e8e8e8] bg-white text-sm outline-none focus:border-[#737373] transition-colors text-[#171717]"
                />
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[#e8e8e8]">
              <div>
                <div className="text-[13px] font-medium text-[#171717]">Лимит отправки в день</div>
                <div className="text-[12px] text-[#a8a8a8]">Максимальное количество писем на тенант в сутки</div>
              </div>
              <span className="text-[13px] font-semibold text-[#171717]">1 000</span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[#e8e8e8]">
              <div>
                <div className="text-[13px] font-medium text-[#171717]">Включить SMTP</div>
                <div className="text-[12px] text-[#a8a8a8]">Использовать собственный SMTP-сервер</div>
              </div>
              <Switch checked={smtpEnabled} onCheckedChange={setSmtpEnabled} />
            </div>
          </div>
        </div>

        {/* Storage */}
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white">
          <div className="px-5 pt-5 pb-1">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-[#525252]" />
              <h2 className="text-sm font-semibold text-[#171717]">Хранилище</h2>
            </div>
            <p className="text-[12.5px] text-[#737373] mt-0.5">Использование дискового пространства</p>
          </div>
          <div className="px-5 pt-4 pb-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#525252]">
                Занято: <span className="font-medium text-[#171717]">24.7 GB</span> из 100 GB
              </span>
              <span className="text-[13px] font-semibold text-[#171717]">24.7%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#e8e8e8] overflow-hidden">
              <div className="h-full rounded-full bg-[#0d0d0d] transition-all" style={{ width: '24.7%' }} />
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2">
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
          </div>
        </div>

        {/* Queue settings */}
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white">
          <div className="px-5 pt-5 pb-1">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#525252]" />
              <h2 className="text-sm font-semibold text-[#171717]">Очередь задач</h2>
            </div>
            <p className="text-[12.5px] text-[#737373] mt-0.5">Настройки фоновой обработки</p>
          </div>
          <div className="px-5 pt-4 pb-5 space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-[13px] font-medium text-[#171717]">Включить очередь</div>
                <div className="text-[12px] text-[#a8a8a8]">Фоновая обработка задач</div>
              </div>
              <Switch checked={queueEnabled} onCheckedChange={setQueueEnabled} />
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[#e8e8e8]">
              <div className="text-[13px] font-medium text-[#171717]">Задач в очереди</div>
              <span className="text-[13px] font-semibold text-[#16a34a]">3 (обработка)</span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[#e8e8e8]">
              <div className="text-[13px] font-medium text-[#171717]">Обработано за 24ч</div>
              <span className="text-[13px] font-semibold text-[#171717]">1 247</span>
            </div>
          </div>
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
