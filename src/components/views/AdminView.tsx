'use client'

import {
  Database,
  Users,
  Activity,
  Cpu,
  Circle,
  Clock,
  Settings,
  UserPlus,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'

const statCards = [
  {
    label: 'Тенанты',
    value: '24',
    icon: Database,
    change: '+2 за месяц',
    color: 'text-[#2563eb]',
  },
  {
    label: 'Пользователи',
    value: '156',
    icon: Users,
    change: '+18 за месяц',
    color: 'text-[#16a34a]',
  },
  {
    label: 'Активные сессии',
    value: '89',
    icon: Activity,
    change: 'Сейчас онлайн',
    color: 'text-[#d97706]',
  },
  {
    label: 'Системная нагрузка',
    value: '32%',
    icon: Cpu,
    change: 'Норма',
    color: 'text-[#16a34a]',
  },
]

const healthItems = [
  { label: 'База данных', status: 'OK', latency: '2ms' },
  { label: 'API сервер', status: 'OK', latency: '12ms' },
  { label: 'Email сервер', status: 'OK', latency: '45ms' },
  { label: 'Очередь задач', status: 'OK', latency: '0ms' },
]

const recentActivity = [
  {
    icon: UserPlus,
    text: 'Новый пользователь зарегистрирован: marina@techcorp.ru',
    time: '5 мин назад',
    color: 'text-[#2563eb]',
  },
  {
    icon: Settings,
    text: 'Тенант "DataFlow" обновил настройки почты',
    time: '23 мин назад',
    color: 'text-[#d97706]',
  },
  {
    icon: CheckCircle,
    text: 'Backup базы данных завершён успешно',
    time: '1 час назад',
    color: 'text-[#16a34a]',
  },
  {
    icon: AlertTriangle,
    text: 'Высокая нагрузка на email-сервер (восстановлено)',
    time: '2 часа назад',
    color: 'text-[#d97706]',
  },
  {
    icon: UserPlus,
    text: 'Новый тенант создан: "CloudSync Solutions"',
    time: '3 часа назад',
    color: 'text-[#16a34a]',
  },
]

export default function AdminView() {
  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scroll">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#e8e8e8]">
        <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
          Администрирование
        </h1>
        <p className="text-sm text-[#737373] mt-0.5">Управление системой</p>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="rounded-[10px] border border-[#e8e8e8] bg-white p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] text-[#737373]">
                    {stat.label}
                  </span>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="text-2xl font-semibold text-[#171717]">
                  {stat.value}
                </div>
                <div className="text-[12px] text-[#a8a8a8] mt-1">
                  {stat.change}
                </div>
              </div>
            )
          })}
        </div>

        {/* System health */}
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white p-0">
          <div className="px-5 pt-5 pb-0">
            <h2 className="text-sm font-semibold text-[#171717]">
              Состояние системы
            </h2>
          </div>
          <div className="px-5 pt-4 pb-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {healthItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#fafafa]"
                >
                  <Circle className="w-2.5 h-2.5 fill-[#0d0d0d] text-[#0d0d0d] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-[#171717]">
                      {item.label}
                    </div>
                    <div className="text-[12px] text-[#a8a8a8]">
                      {item.status} &middot; {item.latency}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white p-0">
          <div className="px-5 pt-5 pb-0">
            <h2 className="text-sm font-semibold text-[#171717]">
              Последняя активность
            </h2>
          </div>
          <div className="px-5 pt-4 pb-5">
            <div className="space-y-0">
              {recentActivity.map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 py-3 border-b border-[#e8e8e8] last:border-b-0 last:pb-0"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#fafafa] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] text-[#171717]">
                        {item.text}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-[#a8a8a8]" />
                        <span className="text-[12px] text-[#a8a8a8]">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
