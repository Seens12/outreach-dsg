'use client';

import { useState } from 'react';
import {
  Mail,
  Bell,
  MessageSquareReply,
  UserPlus,
  CalendarClock,
  AlertTriangle,
  Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface NotificationCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

export default function NotificationsView() {
  const [categories, setCategories] = useState<NotificationCategory[]>([
    {
      id: 'email',
      title: 'Email уведомления',
      description: 'Получайте уведомления о событиях на электронную почту',
      icon: <Mail className="size-5 text-[#2563eb]" />,
      enabled: true,
    },
    {
      id: 'push',
      title: 'Push-уведомления',
      description: 'Браузерные push-уведомления для важных событий',
      icon: <Bell className="size-5 text-[#d97706]" />,
      enabled: true,
    },
    {
      id: 'replies',
      title: 'Ответы на письма',
      description: 'Уведомления при получении ответов на отправленные письма',
      icon: <MessageSquareReply className="size-5 text-[#16a34a]" />,
      enabled: true,
    },
    {
      id: 'leads',
      title: 'Новые лиды',
      description: 'Уведомления при появлении новых лидов из кампаний',
      icon: <UserPlus className="size-5 text-[#2563eb]" />,
      enabled: false,
    },
    {
      id: 'reports',
      title: 'Отчёты по расписанию',
      description: 'Автоматическая отправка еженедельных отчётов на email',
      icon: <CalendarClock className="size-5 text-[#737373]" />,
      enabled: false,
    },
    {
      id: 'errors',
      title: 'Ошибки доставки',
      description: 'Мгновенные уведомления о bounce и ошибках отправки',
      icon: <AlertTriangle className="size-5 text-[#dc2626]" />,
      enabled: true,
    },
  ]);

  const handleToggle = (id: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, enabled: !cat.enabled } : cat
      )
    );
  };

  const enabledCount = categories.filter((c) => c.enabled).length;

  return (
    <div className="space-y-6 p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0d0d0d]">Уведомления</h1>
        <p className="text-sm text-[#737373]">Настройка уведомлений</p>
      </div>

      {/* Notification Categories */}
      <div className="grid gap-3 sm:grid-cols-2">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="border-[#e8e8e8] rounded-[10px] py-0"
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#fafafa]">
                {category.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-[#0d0d0d]">{category.title}</h3>
                <p className="mt-0.5 text-xs text-[#a3a3a3] leading-relaxed line-clamp-2">
                  {category.description}
                </p>
              </div>
              <Switch
                checked={category.enabled}
                onCheckedChange={() => handleToggle(category.id)}
                className="shrink-0"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary + Save */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] p-4">
        <p className="text-sm text-[#737373]">
          Активно уведомлений: <span className="font-medium text-[#0d0d0d]">{enabledCount}</span> из{' '}
          <span className="font-medium text-[#0d0d0d]">{categories.length}</span>
        </p>
        <Button className="bg-[#2563eb] hover:bg-[#2563eb]/90 text-white">
          <Save className="size-4" />
          Сохранить настройки
        </Button>
      </div>
    </div>
  );
}
