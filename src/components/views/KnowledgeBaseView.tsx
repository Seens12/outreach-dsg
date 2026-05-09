'use client'

import { useState } from 'react'
import {
  FileText,
  Upload,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  File,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type FileStatus = 'Загружен' | 'Обрабатывается' | 'Ошибка'

interface KBFile {
  id: string
  name: string
  description: string
  type: 'pdf' | 'docx'
  size: string
  status: FileStatus
  date: string
}

interface TopicCoverage {
  name: string
  percentage: number
  color: string
}

// ---------------------------------------------------------------------------
// Demo data
// ---------------------------------------------------------------------------

const topics: TopicCoverage[] = [
  { name: 'Цены', percentage: 92, color: 'bg-[#16a34a]' },
  { name: 'Продукт', percentage: 85, color: 'bg-[#2563eb]' },
  { name: 'Интеграции', percentage: 68, color: 'bg-[#d97706]' },
  { name: 'FAQ', percentage: 74, color: 'bg-[#16a34a]' },
  { name: 'Кейсы', percentage: 55, color: 'bg-[#d97706]' },
]

const files: KBFile[] = [
  { id: '1', name: 'Прайс-лист 2024.pdf', description: 'Актуальный прайс-лист на все тарифные планы и доп. услуги', type: 'pdf', size: '2.4 МБ', status: 'Загружен', date: '12 янв 2024' },
  { id: '2', name: 'Описание продукта.docx', description: 'Полное описание функционала платформы OutreachAI', type: 'docx', size: '1.8 МБ', status: 'Загружен', date: '10 янв 2024' },
  { id: '3', name: 'FAQ клиентов.pdf', description: 'Часто задаваемые вопросы и ответы от команды поддержки', type: 'pdf', size: '890 КБ', status: 'Обрабатывается', date: '8 янв 2024' },
  { id: '4', name: 'Кейсы клиентов.docx', description: 'Кейсы успешного внедрения OutreachAI у партнёров', type: 'docx', size: '3.1 МБ', status: 'Загружен', date: '5 янв 2024' },
]

// ---------------------------------------------------------------------------
// Status helpers
// ---------------------------------------------------------------------------

const statusConfig: Record<FileStatus, { color: string; icon: React.ElementType }> = {
  'Загружен': { color: 'text-[#16a34a]', icon: CheckCircle },
  'Обрабатывается': { color: 'text-[#d97706]', icon: Clock },
  'Ошибка': { color: 'text-[#dc2626]', icon: AlertCircle },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function KnowledgeBaseView() {
  const [fileList, setFileList] = useState(files)
  const [hoveredFile, setHoveredFile] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setFileList((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[18px] font-bold tracking-[-0.02em] text-[#171717]">
          База знаний
        </h1>
        <p className="text-[13px] text-[#737373] font-medium mt-1">
          Управление базой знаний AI-ассистента
        </p>
      </div>

      {/* Readiness card */}
      <div className="border border-[#e8e8e8] rounded-[10px] bg-white p-6 mb-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-[14px] font-bold text-[#171717] mb-1">
              Готовность базы знаний
            </h2>
            <p className="text-[12px] text-[#a8a8a8]">
              AI-ассистент использует эти данные для ответов на вопросы клиентов
            </p>
          </div>
          <div className="text-right">
            <div className="text-[28px] font-bold text-[#171717] leading-none">
              78%
            </div>
            <div className="text-[11px] text-[#16a34a] font-semibold mt-0.5">
              +5% за неделю
            </div>
          </div>
        </div>

        {/* Main progress bar */}
        <Progress
          value={78}
          className="h-2 bg-[#e8e8e8] rounded-full mb-6 [&>div]:bg-[#16a34a]"
        />

        {/* Topic coverage */}
        <div>
          <h3 className="text-[12px] font-semibold text-[#737373] uppercase tracking-[0.04em] mb-3">
            Покрытие тем
          </h3>
          <div className="space-y-3">
            {topics.map((topic) => (
              <div key={topic.name} className="flex items-center gap-3">
                <div className="w-[90px] text-[12.5px] font-medium text-[#525252] flex-shrink-0">
                  {topic.name}
                </div>
                <div className="flex-1 h-[6px] bg-[#f0f0f0] rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all duration-500', topic.color)}
                    style={{ width: `${topic.percentage}%` }}
                  />
                </div>
                <div className="w-[36px] text-right text-[12px] font-semibold text-[#171717]">
                  {topic.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Files section */}
      <div className="mb-4">
        <h2 className="text-[14px] font-bold text-[#171717]">
          Документы
        </h2>
        <p className="text-[12px] text-[#a8a8a8] mt-0.5">
          {fileList.length} файлов загружено
        </p>
      </div>

      {/* File grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* File cards */}
        {fileList.map((file) => {
          const cfg = statusConfig[file.status]
          const StatusIcon = cfg.icon
          const isHovered = hoveredFile === file.id
          return (
            <div
              key={file.id}
              className="border border-[#e8e8e8] rounded-[10px] bg-white p-5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow duration-200 relative"
              onMouseEnter={() => setHoveredFile(file.id)}
              onMouseLeave={() => setHoveredFile(null)}
            >
              {/* Delete button (visible on hover) */}
              <button
                onClick={() => handleDelete(file.id)}
                className={cn(
                  'absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg text-[#a8a8a8] hover:bg-[#dc2626]/10 hover:text-[#dc2626] transition-all duration-150 cursor-pointer',
                  isHovered ? 'opacity-100' : 'opacity-0'
                )}
              >
                <Trash2 className="w-[13px] h-[13px]" />
              </button>

              {/* Icon */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                    file.type === 'pdf'
                      ? 'bg-[#dc2626]/10 text-[#dc2626]'
                      : 'bg-[#2563eb]/10 text-[#2563eb]'
                  )}
                >
                  {file.type === 'pdf' ? (
                    <FileText className="w-5 h-5" />
                  ) : (
                    <File className="w-5 h-5" />
                  )}
                </div>
                <div className="min-w-0 flex-1 pr-6">
                  <div className="text-[13px] font-semibold text-[#171717] leading-tight truncate">
                    {file.name}
                  </div>
                  <div className="text-[11.5px] text-[#a8a8a8] mt-0.5">
                    {file.size}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-[12px] text-[#737373] leading-relaxed mb-4 line-clamp-2">
                {file.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[#f0f0f0]">
                <div className="flex items-center gap-1.5">
                  <StatusIcon className={cn('w-3.5 h-3.5', cfg.color)} />
                  <span className={cn('text-[11.5px] font-semibold', cfg.color)}>
                    {file.status}
                  </span>
                </div>
                <span className="text-[11px] text-[#a8a8a8]">
                  {file.date}
                </span>
              </div>
            </div>
          )
        })}

        {/* Upload card */}
        <button className="border-2 border-dashed border-[#e8e8e8] rounded-[10px] bg-[#fafafa] hover:bg-[#f5f5f5] hover:border-[#d4d4d4] transition-all duration-200 p-5 flex flex-col items-center justify-center gap-2 cursor-pointer min-h-[180px] group">
          <div className="w-10 h-10 rounded-full bg-white border border-[#e8e8e8] flex items-center justify-center group-hover:border-[#0d0d0d] transition-colors duration-200">
            <Upload className="w-4 h-4 text-[#a8a8a8] group-hover:text-[#0d0d0d] transition-colors duration-200" />
          </div>
          <div className="text-[13px] font-medium text-[#737373] group-hover:text-[#171717] transition-colors duration-200">
            Загрузить файл
          </div>
          <div className="text-[11px] text-[#a8a8a8]">
            PDF, DOCX до 10 МБ
          </div>
        </button>
      </div>
    </div>
  )
}
