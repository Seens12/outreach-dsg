'use client'

import { useState } from 'react'
import {
  Search,
  UserPlus,
  Download,
  Upload,
  MoreHorizontal,
  Mail,
} from 'lucide-react'
import { toast } from 'sonner'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ProspectStatus = 'hot' | 'warm' | 'new'

interface Prospect {
  id: string
  name: string
  email: string
  company: string
  position: string
  status: ProspectStatus
  campaign: string
  lastContact: string
  confidence: number
}

// ---------------------------------------------------------------------------
// Demo data — 12 rows
// ---------------------------------------------------------------------------

const prospects: Prospect[] = [
  { id: '1', name: 'Анна Волкова', email: 'a.volkova@technostart.ru', company: 'ТехноСтарт', position: 'CEO', status: 'hot', campaign: 'SaaS Q4', lastContact: 'Сегодня', confidence: 92 },
  { id: '2', name: 'Павел Егоров', email: 'p.egorov@dataflow.io', company: 'DataFlow', position: 'CTO', status: 'hot', campaign: 'AI Enterprise', lastContact: 'Вчера', confidence: 88 },
  { id: '3', name: 'Мария Иванова', email: 'm.ivanova@cloudsync.com', company: 'CloudSync', position: 'Head of Marketing', status: 'warm', campaign: 'SaaS Q4', lastContact: '2 дня назад', confidence: 75 },
  { id: '4', name: 'Дмитрий Козлов', email: 'd.kozlov@finbridge.ru', company: 'FinBridge', position: 'VP Sales', status: 'hot', campaign: 'FinTech 2024', lastContact: '3 дня назад', confidence: 85 },
  { id: '5', name: 'Елена Смирнова', email: 'e.smirnova@marketpro.ru', company: 'MarketPro', position: 'CMO', status: 'warm', campaign: 'AI Enterprise', lastContact: '1 день назад', confidence: 70 },
  { id: '6', name: 'Олег Новиков', email: 'o.novikov@salesforce-ru.com', company: 'SalesForce RU', position: 'Sales Director', status: 'hot', campaign: 'SaaS Q4', lastContact: 'Сегодня', confidence: 91 },
  { id: '7', name: 'Ольга Фёдорова', email: 'o.fedorova@techvision.ru', company: 'TechVision', position: 'Product Manager', status: 'warm', campaign: 'FinTech 2024', lastContact: '4 дня назад', confidence: 68 },
  { id: '8', name: 'Сергей Попов', email: 's.popov@vktech.com', company: 'VK Tech', position: 'Tech Lead', status: 'new', campaign: 'AI Enterprise', lastContact: '1 неделя', confidence: 45 },
  { id: '9', name: 'Наталья Краснова', email: 'n.krasnova@2gis.ru', company: '2ГИС', position: 'HR Director', status: 'new', campaign: 'SaaS Q4', lastContact: '5 дней назад', confidence: 52 },
  { id: '10', name: 'Алексей Белов', email: 'a.belov@ozon.ru', company: 'Ozon Tech', position: 'CIO', status: 'warm', campaign: 'E-com 2024', lastContact: '2 дня назад', confidence: 73 },
  { id: '11', name: 'Ирина Лебедева', email: 'i.lebedeva@mts.ru', company: 'МТС Digital', position: 'Analytics Lead', status: 'new', campaign: 'AI Enterprise', lastContact: '1 неделя', confidence: 38 },
  { id: '12', name: 'Роман Зайцев', email: 'r.zaytsev@kaspersky.com', company: 'Касперский', position: 'CEO', status: 'new', campaign: 'FinTech 2024', lastContact: '6 дней назад', confidence: 42 },
]

// ---------------------------------------------------------------------------
// Status helpers
// ---------------------------------------------------------------------------

const statusConfig: Record<ProspectStatus, { label: string; className: string }> = {
  hot: { label: 'Горячий', className: 'bg-[#fce7f3] text-[#be123c]' },
  warm: { label: 'Тёплый', className: 'bg-[#fafafa] text-[#a16207]' },
  new: { label: 'Новый', className: 'bg-[#dbeafe] text-[#3b82f6]' },
}

const statusFilters = [
  { key: 'all', label: 'Все статусы' },
  { key: 'hot', label: 'Горячие' },
  { key: 'warm', label: 'Тёплые' },
  { key: 'new', label: 'Новые' },
]

const campaigns = ['Все кампании', 'SaaS Q4', 'AI Enterprise', 'FinTech 2024', 'E-com 2024']

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProspectsView() {
  const { setView } = useAppStore()
  const [activeStatus, setActiveStatus] = useState('all')
  const [campaignFilter, setCampaignFilter] = useState('Все кампании')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = prospects.filter((p) => {
    if (activeStatus !== 'all' && p.status !== activeStatus) return false
    if (campaignFilter !== 'Все кампании' && p.campaign !== campaignFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q) ||
        p.position.toLowerCase().includes(q)
      )
    }
    return true
  })

  const hotCount = prospects.filter((p) => p.status === 'hot').length
  const warmCount = prospects.filter((p) => p.status === 'warm').length
  const newCount = prospects.filter((p) => p.status === 'new').length

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(filtered.map((p) => p.id)))
    }
  }

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="p-6 overflow-y-auto h-full custom-scroll">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold tracking-tight text-[#0d0d0d]">
          Контакты
        </h1>
        <div className="flex items-center gap-3 mt-2 text-[13px] text-[#737373] font-medium">
          <span>Всего контактов <span className="text-[#171717] font-semibold">{prospects.length}</span></span>
          <span className="w-1 h-1 rounded-full bg-[#e8e8e8]" />
          <span>Горячие лиды <span className="text-[#404040] font-semibold">{hotCount}</span></span>
          <span className="w-1 h-1 rounded-full bg-[#e8e8e8]" />
          <span>Тёплые лиды <span className="text-[#525252] font-semibold">{warmCount}</span></span>
          <span className="w-1 h-1 rounded-full bg-[#e8e8e8]" />
          <span>Новые за неделю <span className="text-[#a3a3a3] font-semibold">{newCount}</span></span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mb-5">
        <Button
          onClick={() => toast.success('Форма добавления контакта')}
          className="h-[36px] text-[13px] font-medium rounded-[8px] bg-[#0d0d0d] hover:bg-[#262626] text-white gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Добавить контакт
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.success('CSV экспорт запущен')}
          className="h-[36px] text-[13px] font-medium rounded-[8px] border-[#e8e8e8] text-[#525252] hover:bg-[#f5f5f5] gap-2"
        >
          <Download className="w-4 h-4" />
          Экспорт CSV
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.success('Импорт CSV запущен')}
          className="h-[36px] text-[13px] font-medium rounded-[8px] border-[#e8e8e8] text-[#525252] hover:bg-[#f5f5f5] gap-2"
        >
          <Upload className="w-4 h-4" />
          Импорт CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-5 flex-wrap">
        {/* Status pills */}
        <div className="flex items-center gap-2">
          {statusFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveStatus(f.key)}
              className={cn(
                'h-[32px] px-3 rounded-full text-[12.5px] font-medium transition-all duration-150 cursor-pointer border',
                activeStatus === f.key
                  ? 'bg-[#0d0d0d] text-white border-[#0d0d0d]'
                  : 'bg-white text-[#525252] border-[#e8e8e8] hover:bg-[#f5f5f5] hover:text-[#171717]'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Campaign dropdown */}
        <Select value={campaignFilter} onValueChange={setCampaignFilter}>
          <SelectTrigger
            size="sm"
            className="h-[32px] text-[12.5px] font-medium border-[#e8e8e8] rounded-[8px] bg-white w-[170px]"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {campaigns.map((c) => (
              <SelectItem key={c} value={c} className="text-[13px]">
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search */}
        <div className="relative w-[220px] ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#a3a3a3]" />
          <Input
            placeholder="Поиск контактов..."
            aria-label="Поиск"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-[32px] text-[12.5px] bg-[#fafafa] border-[#e8e8e8] rounded-[8px]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-[10px] border border-[#e8e8e8] bg-white shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-[#e8e8e8] hover:bg-transparent bg-[#fafafa]">
              <TableHead className="w-[40px] pl-4">
                <Checkbox
                  checked={selected.size === filtered.length && filtered.length > 0}
                  onCheckedChange={toggleAll}
                  className="border-[#d4d4d4] data-[state=checked]:bg-[#0d0d0d] data-[state=checked]:border-[#0d0d0d]"
                />
              </TableHead>
              <TableHead className="text-[12px] font-semibold text-[#525252] uppercase tracking-wide">Имя</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#525252] uppercase tracking-wide">Email</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#525252] uppercase tracking-wide">Компания</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#525252] uppercase tracking-wide">Должность</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#525252] uppercase tracking-wide">Статус</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#525252] uppercase tracking-wide">Кампания</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#525252] uppercase tracking-wide">Последний контакт</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#525252] uppercase tracking-wide w-[120px]">Уверенность</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => {
              const st = statusConfig[p.status]
              return (
                <TableRow key={p.id} className="border-[#f5f5f5] hover:bg-[#fafafa] cursor-pointer group" onClick={() => setView('inbox')}>
                  <TableCell className="pl-4">
                    <Checkbox
                      checked={selected.has(p.id)}
                      onCheckedChange={() => toggleOne(p.id)}
                      className="border-[#d4d4d4] data-[state=checked]:bg-[#0d0d0d] data-[state=checked]:border-[#0d0d0d]"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0d0d0d] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                        {p.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="text-[13px] font-medium text-[#171717]">{p.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-[13px] text-[#525252]">{p.email}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[13px] text-[#525252]">{p.company}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[13px] text-[#737373]">{p.position}</span>
                  </TableCell>
                  <TableCell>
                    <span className={cn('inline-flex items-center px-2.5 py-[3px] rounded-[6px] text-[12px]', st.className)}>
                      {st.label}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[13px] text-[#525252]">{p.campaign}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[13px] text-[#737373]">{p.lastContact}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-[5px] bg-[#f0f0f0] rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full',
                            p.confidence >= 80 ? 'bg-[#bbf7d0]' : p.confidence >= 50 ? 'bg-[#fde68a]' : 'bg-[#fecdd3]'
                          )}
                          style={{ width: `${p.confidence}%` }}
                        />
                      </div>
                      <span className={cn(
                        'text-[12px] font-semibold min-w-[32px] text-right',
                        p.confidence >= 80 ? 'text-[#15803d]' : p.confidence >= 50 ? 'text-[#a16207]' : 'text-[#be123c]'
                      )}>
                        {p.confidence}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 text-[12.5px] text-[#737373]">
        <span>Показано {filtered.length} из {prospects.length}</span>
        {selected.size > 0 && (
          <span className="font-medium text-[#171717]">
            Выбрано: {selected.size}
          </span>
        )}
      </div>
    </div>
  )
}
