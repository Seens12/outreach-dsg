'use client';

import { useState } from 'react';
import {
  User,
  Mail,
  Building2,
  Briefcase,
  PenLine,
  Clock,
  RefreshCw,
  Zap,
  Repeat,
  Timer,
  Languages,
  Globe,
  CalendarDays,
  Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SettingsView() {
  const [autoFollowUp, setAutoFollowUp] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0d0d0d]">Настройки</h1>
        <p className="text-sm text-[#737373]">Общие настройки аккаунта</p>
      </div>

      {/* Profile Section */}
      <Card className="border-[#e8e8e8] rounded-[10px] py-4">
        <CardContent className="space-y-4 p-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#fafafa]">
              <User className="size-4 text-[#737373]" />
            </div>
            <h3 className="text-sm font-semibold text-[#0d0d0d]">Профиль</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs text-[#737373] flex items-center gap-1.5">
                <User className="size-3" />
                Имя
              </Label>
              <Input
                id="name"
                defaultValue="Алексей Петров"
                className="border-[#e8e8e8]"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs text-[#737373] flex items-center gap-1.5">
                <Mail className="size-3" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="alexey@company.ru"
                className="border-[#e8e8e8]"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="company" className="text-xs text-[#737373] flex items-center gap-1.5">
                <Building2 className="size-3" />
                Компания
              </Label>
              <Input
                id="company"
                defaultValue="Tech Solutions LLC"
                className="border-[#e8e8e8]"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="position" className="text-xs text-[#737373] flex items-center gap-1.5">
                <Briefcase className="size-3" />
                Должность
              </Label>
              <Input
                id="position"
                defaultValue="Head of Sales"
                className="border-[#e8e8e8]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card className="border-[#e8e8e8] rounded-[10px] py-4">
        <CardContent className="space-y-4 p-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#fafafa]">
              <Mail className="size-4 text-[#737373]" />
            </div>
            <h3 className="text-sm font-semibold text-[#0d0d0d]">Настройки email</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="signature" className="text-xs text-[#737373] flex items-center gap-1.5">
                <PenLine className="size-3" />
                Подпись в письмах
              </Label>
              <Textarea
                id="signature"
                defaultValue="С уважением,&#10;Алексей Петров&#10;Head of Sales, Tech Solutions LLC&#10;+7 (999) 123-45-67"
                className="border-[#e8e8e8] min-h-[100px]"
                rows={5}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="reply-to" className="text-xs text-[#737373] flex items-center gap-1.5">
                  <Mail className="size-3" />
                  Reply-to адрес
                </Label>
                <Input
                  id="reply-to"
                  type="email"
                  defaultValue="replies@company.ru"
                  className="border-[#e8e8e8]"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email-timezone" className="text-xs text-[#737373] flex items-center gap-1.5">
                  <Clock className="size-3" />
                  Часовой пояс отправки
                </Label>
                <Select defaultValue="europe-moscow">
                  <SelectTrigger id="email-timezone" className="w-full border-[#e8e8e8]">
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automation Settings */}
      <Card className="border-[#e8e8e8] rounded-[10px] py-4">
        <CardContent className="space-y-4 p-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#fafafa]">
              <Zap className="size-4 text-[#737373]" />
            </div>
            <h3 className="text-sm font-semibold text-[#0d0d0d]">Автоматизация</h3>
          </div>
          <div className="space-y-4">
            {/* Auto Follow-up Toggle */}
            <div className="flex items-center justify-between rounded-lg border border-[#f5f5f5] bg-[#fafafa] p-3">
              <div className="flex items-center gap-3">
                <Repeat className="size-4 text-[#737373]" />
                <div>
                  <p className="text-sm font-medium text-[#0d0d0d]">Авто follow-up</p>
                  <p className="text-xs text-[#a3a3a3]">Автоматически отправлять письма-напоминания</p>
                </div>
              </div>
              <Switch checked={autoFollowUp} onCheckedChange={setAutoFollowUp} />
            </div>

            {/* Follow-up Settings */}
            {autoFollowUp && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="followup-delay" className="text-xs text-[#737373] flex items-center gap-1.5">
                    <Timer className="size-3" />
                    Задержка follow-up (дней)
                  </Label>
                  <Select defaultValue="3">
                    <SelectTrigger id="followup-delay" className="w-full border-[#e8e8e8]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 день</SelectItem>
                      <SelectItem value="2">2 дня</SelectItem>
                      <SelectItem value="3">3 дня</SelectItem>
                      <SelectItem value="5">5 дней</SelectItem>
                      <SelectItem value="7">7 дней</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="max-followups" className="text-xs text-[#737373] flex items-center gap-1.5">
                    <RefreshCw className="size-3" />
                    Макс. follow-up писем
                  </Label>
                  <Select defaultValue="3">
                    <SelectTrigger id="max-followups" className="w-full border-[#e8e8e8]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Interface Settings */}
      <Card className="border-[#e8e8e8] rounded-[10px] py-4">
        <CardContent className="space-y-4 p-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#fafafa]">
              <Globe className="size-4 text-[#737373]" />
            </div>
            <h3 className="text-sm font-semibold text-[#0d0d0d]">Интерфейс</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="language" className="text-xs text-[#737373] flex items-center gap-1.5">
                <Languages className="size-3" />
                Язык
              </Label>
              <Select defaultValue="ru">
                <SelectTrigger id="language" className="w-full border-[#e8e8e8]">
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
              <Label htmlFor="ui-timezone" className="text-xs text-[#737373] flex items-center gap-1.5">
                <Clock className="size-3" />
                Часовой пояс
              </Label>
              <Select defaultValue="europe-moscow">
                <SelectTrigger id="ui-timezone" className="w-full border-[#e8e8e8]">
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
              <Label htmlFor="date-format" className="text-xs text-[#737373] flex items-center gap-1.5">
                <CalendarDays className="size-3" />
                Формат даты
              </Label>
              <Select defaultValue="dd.mm.yyyy">
                <SelectTrigger id="date-format" className="w-full border-[#e8e8e8]">
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
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg" className="bg-[#2563eb] hover:bg-[#2563eb]/90 text-white">
          <Save className="size-4" />
          Сохранить изменения
        </Button>
      </div>
    </div>
  );
}
