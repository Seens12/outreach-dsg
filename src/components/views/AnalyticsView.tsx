'use client'

import { useState } from 'react'
import {
  Send,
  MailOpen,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Clock,
  Target,
  Lightbulb,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

// ── Demo Data ──────────────────────────────────────────────────────────────

const areaChartData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (29 - i))
  const day = date.getDate()
  const month = date.getMonth() + 1
  return {
    name: `${day}.${month}`,
    sent: Math.floor(100 + Math.random() * 80 + (i > 10 ? 30 : 0)),
    replies: Math.floor(8 + Math.random() * 15 + (i > 15 ? 5 : 0)),
  }
})

const funnelData = [
  { stage: 'Контакт', value: 3847, rate: '100%' },
  { stage: 'Открыто', value: 2469, rate: '64.2%' },
  { stage: 'Ответ', value: 335, rate: '8.7%' },
  { stage: 'Встреча', value: 124, rate: '3.2%' },
  { stage: 'Сделка', value: 89, rate: '2.3%' },
]

const pieData = [
  { name: 'Email', value: 45, color: '#0d0d0d' },
  { name: 'LinkedIn', value: 25, color: '#2563eb' },
  { name: 'Холодные звонки', value: 20, color: '#16a34a' },
  { name: 'Рефералы', value: 10, color: '#d97706' },
]

const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const hours = Array.from({ length: 17 }, (_, i) => i + 6)

// Generate heatmap data: 7 days x 17 hours (6-22)
const heatmapData: number[][] = days.map((_, di) =>
  hours.map((_, hi) => {
    // Simulate realistic patterns
    const dayFactor = di < 5 ? 1 : 0.2 // Weekdays busier
    const hourFactor = hi >= 9 && hi <= 17 ? 1 : 0.3 // Business hours
    const peakFactor = (hi >= 10 && hi <= 12) || (hi >= 14 && hi <= 16) ? 1.5 : 1
    const raw = dayFactor * hourFactor * peakFactor * (Math.random() * 10)
    return Math.min(10, Math.round(raw))
  })
)

const greenLevels = [
  'bg-[#f5f5f5]', // 0
  'bg-[#dcfce7]', // 1-2
  'bg-[#bbf7d0]', // 3-4
  'bg-[#86efac]', // 5-6
  'bg-[#4ade80]', // 7-8
  'bg-[#16a34a]', // 9-10
]

function getHeatColor(v: number): string {
  if (v === 0) return greenLevels[0]
  if (v <= 2) return greenLevels[1]
  if (v <= 4) return greenLevels[2]
  if (v <= 6) return greenLevels[3]
  if (v <= 8) return greenLevels[4]
  return greenLevels[5]
}

const insights = [
  {
    icon: TrendingUp,
    color: 'text-[#16a34a] bg-[#f0fdf4]',
    text: 'Вторники показывают на 34% больше ответов по сравнению с другими днями недели',
  },
  {
    icon: Target,
    color: 'text-[#2563eb] bg-[#eff6ff]',
    text: 'Тема с персонализацией конвертирует на 2.1x лучше, чем универсальная тема',
  },
  {
    icon: Clock,
    color: 'text-[#d97706] bg-[#fffbeb]',
    text: 'Follow-up через 3 дня оптимальный: конверсия на 18% выше, чем через 1 день',
  },
]

const metricCards = [
  {
    label: 'Отправлено',
    value: '3,847',
    trend: '+12.5%',
    trendUp: true,
    icon: Send,
    iconBg: 'bg-[#fafafa]',
  },
  {
    label: 'Открыто',
    value: '64.2%',
    trend: '+3.8%',
    trendUp: true,
    icon: MailOpen,
    iconBg: 'bg-[#f0fdf4]',
  },
  {
    label: 'Ответы',
    value: '8.7%',
    trend: '-1.2%',
    trendUp: false,
    icon: MessageSquare,
    iconBg: 'bg-[#eff6ff]',
  },
  {
    label: 'Конверсия',
    value: '2.3%',
    trend: '+0.4%',
    trendUp: true,
    icon: ArrowUpRight,
    iconBg: 'bg-[#fffbeb]',
  },
]

const periods = ['7 дней', '30 дней', '90 дней', 'Год']

// ── Tooltip Style ──────────────────────────────────────────────────────────

const tooltipStyle = {
  contentStyle: {
    backgroundColor: '#fff',
    border: '1px solid #e8e8e8',
    borderRadius: '10px',
    fontSize: '13px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '8px 12px',
  },
  itemStyle: {
    padding: '2px 0',
  },
  labelStyle: {
    color: '#525252',
    fontWeight: 500,
    marginBottom: '4px',
  },
}

// ── Custom Pie Label ───────────────────────────────────────────────────────

function renderCustomLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
}) {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontSize: '13px', fontWeight: 600 }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

// ── Component ──────────────────────────────────────────────────────────────

export default function AnalyticsView() {
  const [activePeriod, setActivePeriod] = useState('30 дней')

  return (
    <div className="flex-1 overflow-y-auto custom-scroll">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-[#0d0d0d]">
            Аналитика
          </h1>
          <p className="text-sm text-[#737373] mt-1">
            Подробная аналитика вашей outreach-активности
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-1 bg-[#fafafa] rounded-[10px] p-1 w-fit">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setActivePeriod(p)}
              className={`px-4 py-2 text-sm font-medium rounded-[8px] transition-all duration-150 cursor-pointer ${
                activePeriod === p
                  ? 'bg-white text-[#0d0d0d] shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
                  : 'text-[#737373] hover:text-[#0d0d0d]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricCards.map((m) => {
            const Icon = m.icon
            return (
              <div
                key={m.label}
                className="bg-white border border-[#e8e8e8] rounded-[10px] p-4 flex items-start gap-3"
              >
                <div
                  className={`w-10 h-10 rounded-[8px] ${m.iconBg} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-[18px] h-[18px] text-[#525252]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-[#a8a8a8] font-medium">
                    {m.label}
                  </div>
                  <div className="text-xl font-bold text-[#0d0d0d] mt-0.5">
                    {m.value}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {m.trendUp ? (
                      <TrendingUp className="w-3.5 h-3.5 text-[#16a34a]" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 text-[#dc2626]" />
                    )}
                    <span
                      className={`text-[12px] font-semibold ${
                        m.trendUp ? 'text-[#16a34a]' : 'text-[#dc2626]'
                      }`}
                    >
                      {m.trend}
                    </span>
                    <span className="text-[12px] text-[#a8a8a8] ml-1">
                      vs пред. период
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Area Chart */}
        <div className="bg-white border border-[#e8e8e8] rounded-[10px] p-5">
          <h3 className="text-[15px] font-semibold text-[#0d0d0d] mb-4">
            Динамика отправок и ответов
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart
              data={areaChartData}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="sentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d0d0d" stopOpacity={0.08} />
                  <stop offset="95%" stopColor="#0d0d0d" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="replyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#a8a8a8' }}
                interval="preserveStartEnd"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#a8a8a8' }}
              />
              <Tooltip {...tooltipStyle} />
              <Area
                type="monotone"
                dataKey="sent"
                name="Отправлено"
                stroke="#0d0d0d"
                strokeWidth={2}
                fill="url(#sentGradient)"
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#0d0d0d' }}
              />
              <Area
                type="monotone"
                dataKey="replies"
                name="Ответы"
                stroke="#16a34a"
                strokeWidth={2}
                fill="url(#replyGradient)"
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#16a34a' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Two-column: Funnel + Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Funnel */}
          <div className="bg-white border border-[#e8e8e8] rounded-[10px] p-5">
            <h3 className="text-[15px] font-semibold text-[#0d0d0d] mb-4">
              Воронка конверсии
            </h3>
            <div className="space-y-2">
              {funnelData.map((item, i) => {
                const maxVal = funnelData[0].value
                const widthPct = Math.max(12, (item.value / maxVal) * 100)
                const colors = ['#0d0d0d', '#2563eb', '#16a34a', '#d97706', '#dc2626']
                return (
                  <div key={item.stage}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] font-medium text-[#171717]">
                        {item.stage}
                      </span>
                      <span className="text-[13px] font-semibold text-[#0d0d0d]">
                        {item.value.toLocaleString()}
                        <span className="text-[#a8a8a8] font-normal ml-2">
                          {item.rate}
                        </span>
                      </span>
                    </div>
                    <div className="w-full h-7 bg-[#fafafa] rounded-md overflow-hidden">
                      <div
                        className="h-full rounded-md transition-all duration-500 ease-out"
                        style={{
                          width: `${widthPct}%`,
                          backgroundColor: colors[i],
                          opacity: 1 - i * 0.12,
                        }}
                      />
                    </div>
                    {i < funnelData.length - 1 && (
                      <div className="text-[11px] text-[#a8a8a8] text-center mt-1">
                        {(
                          (funnelData[i + 1].value / item.value) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Heatmap */}
          <div className="bg-white border border-[#e8e8e8] rounded-[10px] p-5">
            <h3 className="text-[15px] font-semibold text-[#0d0d0d] mb-4">
              Лучшее время отправки
            </h3>
            <div className="space-y-1">
              {/* Header row with hour labels */}
              <div className="flex items-center gap-[2px]">
                <div className="w-8 flex-shrink-0" />
                {hours.map((h) => (
                  <div
                    key={h}
                    className="flex-1 text-center text-[9px] text-[#a8a8a8] font-medium min-w-0"
                  >
                    {h}
                  </div>
                ))}
              </div>
              {/* Heatmap rows */}
              {days.map((day, di) => (
                <div key={day} className="flex items-center gap-[2px]">
                  <div className="w-8 text-[11px] text-[#737373] font-medium flex-shrink-0 text-right pr-1">
                    {day}
                  </div>
                  {heatmapData[di].map((val, hi) => (
                    <div
                      key={hi}
                      className={`flex-1 h-6 rounded-sm min-w-0 hm-cell transition-transform duration-100 cursor-default ${getHeatColor(val)}`}
                      title={`${day} ${hours[hi]}:00 — ${val} отправок`}
                    />
                  ))}
                </div>
              ))}
              {/* Legend */}
              <div className="flex items-center justify-end gap-1 mt-2">
                <span className="text-[10px] text-[#a8a8a8] mr-1">Меньше</span>
                {greenLevels.map((c, i) => (
                  <div
                    key={i}
                    className={`w-4 h-3 rounded-sm ${c}`}
                  />
                ))}
                <span className="text-[10px] text-[#a8a8a8] ml-1">Больше</span>
              </div>
            </div>
          </div>
        </div>

        {/* Two-column: Pie + Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Pie Chart */}
          <div className="bg-white border border-[#e8e8e8] rounded-[10px] p-5">
            <h3 className="text-[15px] font-semibold text-[#0d0d0d] mb-4">
              Каналы конверсии
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-[200px] h-[200px] flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                      labelLine={false}
                      label={renderCustomLabel}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip {...tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[13px] text-[#525252] flex-1">
                      {item.name}
                    </span>
                    <span className="text-[13px] font-semibold text-[#0d0d0d]">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-white border border-[#e8e8e8] rounded-[10px] p-5">
            <h3 className="text-[15px] font-semibold text-[#0d0d0d] mb-4">
              Инсайты
            </h3>
            <div className="space-y-3">
              {insights.map((insight, i) => {
                const Icon = insight.icon
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-[8px] bg-[#fafafa] border border-[#f0f0f0] hover:border-[#e0e0e0] transition-colors"
                  >
                    <div
                      className={`w-9 h-9 rounded-[7px] ${insight.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className="text-[13px] text-[#525252] leading-relaxed pt-1.5">
                      {insight.text}
                    </p>
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
