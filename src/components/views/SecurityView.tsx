'use client';

import { useState } from 'react';
import {
  Lock,
  Smartphone,
  Monitor,
  Globe,
  Key,
  Plus,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  LogOut,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';

interface Session {
  id: string;
  device: string;
  icon: 'desktop' | 'mobile' | 'web';
  location: string;
  ip: string;
  lastActive: string;
  current: boolean;
}

interface ApiKey {
  id: string;
  name: string;
  created: string;
  lastUsed: string;
  keyPreview: string;
}

const mockSessions: Session[] = [
  {
    id: '1',
    device: 'MacBook Pro - Chrome',
    icon: 'desktop',
    location: 'Москва, Россия',
    ip: '192.168.1.***',
    lastActive: 'Сейчас',
    current: true,
  },
  {
    id: '2',
    device: 'iPhone 15 Pro - Safari',
    icon: 'mobile',
    location: 'Москва, Россия',
    ip: '10.0.0.***',
    lastActive: '2 часа назад',
    current: false,
  },
  {
    id: '3',
    device: 'Windows PC - Firefox',
    icon: 'web',
    location: 'Санкт-Петербург, Россия',
    ip: '172.16.0.***',
    lastActive: '1 день назад',
    current: false,
  },
];

const mockApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Production API',
    created: '15 ноя 2024',
    lastUsed: '5 мин назад',
    keyPreview: 'sk_live_...a8f3',
  },
  {
    id: '2',
    name: 'Development',
    created: '03 дек 2024',
    lastUsed: '2 дня назад',
    keyPreview: 'sk_test_...7b2e',
  },
];

function SessionIcon({ type }: { type: Session['icon'] }) {
  switch (type) {
    case 'desktop':
      return <Monitor className="size-4 text-[#737373]" />;
    case 'mobile':
      return <Smartphone className="size-4 text-[#737373]" />;
    case 'web':
      return <Globe className="size-4 text-[#737373]" />;
  }
}

export default function SecurityView() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [confirmSessionId, setConfirmSessionId] = useState<string | null>(null);
  const [confirmApiKeyId, setConfirmApiKeyId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys);

  return (
    <div className="space-y-6 p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">Безопасность</h1>
        <p className="text-sm text-[#737373]">Настройки безопасности аккаунта</p>
      </div>

      {/* Password Change */}
      <Card className="border-[#e8e8e8] rounded-[10px] py-4">
        <CardContent className="space-y-4 p-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#fafafa]">
              <Lock className="size-4 text-[#737373]" />
            </div>
            <h3 className="text-sm font-semibold text-[#0d0d0d]">Смена пароля</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="current-password" className="text-xs text-[#737373]">
                Текущий пароль
              </Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? 'text' : 'password'}
                  placeholder="Введите текущий пароль"
                  className="pr-9 border-[#e8e8e8]"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  aria-label={showCurrentPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a3a3a3] hover:text-[#737373]"
                >
                  {showCurrentPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-password" className="text-xs text-[#737373]">
                Новый пароль
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Введите новый пароль"
                  className="pr-9 border-[#e8e8e8]"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  aria-label={showNewPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a3a3a3] hover:text-[#737373]"
                >
                  {showNewPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password" className="text-xs text-[#737373]">
                Подтвердите пароль
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Подтвердите новый пароль"
                  className="pr-9 border-[#e8e8e8]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a3a3a3] hover:text-[#737373]"
                >
                  {showConfirmPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => toast.success('Пароль изменён')} size="sm" className="bg-[#0d0d0d] hover:bg-[#262626] text-white">
              <Lock className="size-3.5" />
              Изменить
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="border-[#e8e8e8] rounded-[10px] py-4">
        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex size-8 items-center justify-center rounded-lg bg-[#fafafa]">
              {twoFactorEnabled ? (
                <ShieldCheck className="size-4 text-[#16a34a]" />
              ) : (
                <ShieldAlert className="size-4 text-[#d97706]" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#0d0d0d]">Двухфакторная аутентификация</h3>
              <p className="mt-0.5 text-xs text-[#737373]">
                Дополнительный уровень защиты при входе в аккаунт
              </p>
              <div className="mt-2">
                <Badge
                  className={
                    twoFactorEnabled
                      ? 'bg-[#16a34a]/10 text-[#16a34a] border-[#16a34a]/20'
                      : 'bg-[#d97706]/10 text-[#d97706] border-[#d97706]/20'
                  }
                >
                  {twoFactorEnabled ? 'Включена' : 'Выключена'}
                </Badge>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-[#e8e8e8] text-[#737373] shrink-0"
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
          >
            {twoFactorEnabled ? 'Отключить' : 'Настроить'}
          </Button>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card className="border-[#e8e8e8] rounded-[10px] py-4">
        <CardContent className="space-y-4 p-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#fafafa]">
              <Monitor className="size-4 text-[#737373]" />
            </div>
            <h3 className="text-sm font-semibold text-[#0d0d0d]">Активные сессии</h3>
          </div>
          <div className="divide-y divide-[#f5f5f5]">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex flex-col gap-3 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-9 items-center justify-center rounded-lg bg-[#fafafa]">
                    <SessionIcon type={session.icon} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[#0d0d0d]">{session.device}</p>
                      {session.current && (
                        <Badge className="bg-[#2563eb]/10 text-[#2563eb] border-[#2563eb]/20 text-[10px]">
                          Текущая
                        </Badge>
                      )}
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-[#737373]">
                      <span>{session.location}</span>
                      <span>IP: {session.ip}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {session.lastActive}
                      </span>
                    </div>
                  </div>
                </div>
                {!session.current && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#dc2626]/30 text-[#dc2626] hover:bg-[#dc2626]/5 hover:text-[#dc2626] shrink-0 self-start"
                    onClick={() => setConfirmSessionId(session.id)}
                  >
                    <LogOut className="size-3.5" />
                    Завершить
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card className="border-[#e8e8e8] rounded-[10px] py-4">
        <CardContent className="space-y-4 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-[#fafafa]">
                <Key className="size-4 text-[#737373]" />
              </div>
              <h3 className="text-sm font-semibold text-[#0d0d0d]">API ключи</h3>
            </div>
            <Button
              size="sm"
              className="bg-[#2563eb] hover:bg-[#2563eb]/90 text-white"
            >
              <Plus className="size-3.5" />
              Создать ключ
            </Button>
          </div>
          <div className="divide-y divide-[#f5f5f5]">
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-9 items-center justify-center rounded-lg bg-[#fafafa]">
                    <Key className="size-4 text-[#737373]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0d0d0d]">{apiKey.name}</p>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-[#737373]">
                      <span className="font-mono bg-[#f5f5f5] px-1.5 py-0.5 rounded text-[#737373]">
                        {apiKey.keyPreview}
                      </span>
                      <span>Создан: {apiKey.created}</span>
                      <span>Последнее использование: {apiKey.lastUsed}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button variant="ghost" size="icon" aria-label="Копировать" className="size-8 text-[#a3a3a3] hover:text-[#737373]">
                    <Copy className="size-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Удалить" className="size-8 text-[#a3a3a3] hover:text-[#dc2626]" onClick={() => setConfirmApiKeyId(apiKey.id)}>
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={confirmSessionId !== null}
        onOpenChange={(open) => !open && setConfirmSessionId(null)}
        title="Завершить сессию?"
        description={`Сессия будет принудительно завершена, и пользователь будет разлогинен.`}
        confirmLabel="Завершить"
        onConfirm={() => {
          if (confirmSessionId) {
            setSessions((prev) => prev.filter((s) => s.id !== confirmSessionId));
            toast.success('Сессия завершена');
            setConfirmSessionId(null);
          }
        }}
      />

      <ConfirmDialog
        open={confirmApiKeyId !== null}
        onOpenChange={(open) => !open && setConfirmApiKeyId(null)}
        title="Удалить API-ключ?"
        description={`API-ключ будет удалён безвозвратно. Все приложения, использующие этот ключ, потеряют доступ.`}
        confirmLabel="Удалить"
        onConfirm={() => {
          if (confirmApiKeyId) {
            setApiKeys((prev) => prev.filter((k) => k.id !== confirmApiKeyId));
            toast.success('Ключ удалён');
            setConfirmApiKeyId(null);
          }
        }}
      />
    </div>
  );
}
