'use client';

import { useState } from 'react';
import {
  Link2,
  Unplug,
  Settings,
  Plus,
  RefreshCw,
  Users,
  Database,
  CheckCircle2,
  XCircle,
  Globe,
  Plug,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CrmIntegration {
  id: string;
  name: string;
  description: string;
  icon: 'amocrm' | 'bitrix' | 'custom';
  connected: boolean;
  syncedRecords: number;
  lastSync: string;
}

const mockIntegrations: CrmIntegration[] = [
  {
    id: '1',
    name: 'amoCRM',
    description: 'Синхронизация контактов, сделок и воронок с amoCRM',
    icon: 'amocrm',
    connected: true,
    syncedRecords: 1247,
    lastSync: '5 мин назад',
  },
  {
    id: '2',
    name: 'Bitrix24',
    description: 'Интеграция с CRM-системой Битрикс24 для обмена лидами',
    icon: 'bitrix',
    connected: true,
    syncedRecords: 892,
    lastSync: '12 мин назад',
  },
  {
    id: '3',
    name: 'Custom API',
    description: 'Подключение к произвольной CRM через REST API',
    icon: 'custom',
    connected: false,
    syncedRecords: 0,
    lastSync: 'Никогда',
  },
];

function CrmIcon({ type }: { type: CrmIntegration['icon'] }) {
  switch (type) {
    case 'amocrm':
      return (
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#2563eb]/10">
          <Database className="size-5 text-[#2563eb]" />
        </div>
      );
    case 'bitrix':
      return (
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#16a34a]/10">
          <Globe className="size-5 text-[#16a34a]" />
        </div>
      );
    case 'custom':
      return (
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#d97706]/10">
          <Plug className="size-5 text-[#d97706]" />
        </div>
      );
  }
}

export default function CrmView() {
  const [integrations] = useState<CrmIntegration[]>(mockIntegrations);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0d0d0d]">CRM</h1>
          <p className="text-sm text-[#737373]">Управление интеграцией с CRM-системами</p>
        </div>
      </div>

      {/* CRM Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((crm) => (
          <Card
            key={crm.id}
            className="border-[#e8e8e8] rounded-[10px] py-4"
          >
            <CardContent className="space-y-4 p-4">
              {/* Icon + Name + Status */}
              <div className="flex items-start gap-3">
                <CrmIcon type={crm.icon} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-[#0d0d0d]">{crm.name}</h3>
                    <Badge
                      className={
                        crm.connected
                          ? 'bg-[#16a34a]/10 text-[#16a34a] border-[#16a34a]/20 text-[10px] px-1.5 py-0'
                          : 'bg-[#fafafa] text-[#a3a3a3] border-[#e8e8e8] text-[10px] px-1.5 py-0'
                      }
                    >
                      {crm.connected ? (
                        <>
                          <CheckCircle2 className="size-2.5" />
                          Подключено
                        </>
                      ) : (
                        <>
                          <XCircle className="size-2.5" />
                          Отключено
                        </>
                      )}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-[#737373] leading-relaxed">
                    {crm.description}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 rounded-lg bg-[#fafafa] p-3">
                <div className="flex items-center gap-2">
                  <Users className="size-3.5 text-[#737373]" />
                  <div>
                    <p className="text-xs text-[#a3a3a3]">Записей</p>
                    <p className="text-sm font-medium text-[#0d0d0d]">
                      {crm.syncedRecords.toLocaleString('ru-RU')}
                    </p>
                  </div>
                </div>
                <div className="h-8 w-px bg-[#e8e8e8]" />
                <div className="flex items-center gap-2">
                  <RefreshCw className="size-3.5 text-[#737373]" />
                  <div>
                    <p className="text-xs text-[#a3a3a3]">Последняя синхр.</p>
                    <p className="text-sm font-medium text-[#0d0d0d]">{crm.lastSync}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {crm.connected ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#dc2626]/30 text-[#dc2626] hover:bg-[#dc2626]/5 hover:text-[#dc2626]"
                    >
                      <Unplug className="size-3.5" />
                      Отключить
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#e8e8e8] text-[#737373] hover:text-[#0d0d0d]"
                    >
                      <Settings className="size-3.5" />
                      Настройки
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    className="w-full bg-[#2563eb] hover:bg-[#2563eb]/90 text-white"
                  >
                    <Link2 className="size-3.5" />
                    Подключить
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add Integration Card */}
        <Card className="border-dashed border-[#e8e8e8] rounded-[10px] py-4 hover:border-[#2563eb]/40 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center gap-3 p-4 min-h-[220px]">
            <div className="flex size-11 items-center justify-center rounded-full bg-[#fafafa]">
              <Plus className="size-5 text-[#a3a3a3]" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-[#737373]">Добавить интеграцию</p>
              <p className="text-xs text-[#a3a3a3] mt-1">Подключите новую CRM-систему</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
