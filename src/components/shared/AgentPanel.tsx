'use client'

import { useState } from 'react'
import { Bot, Send, ChevronUp, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AgentMessage {
  id: number
  role: 'user' | 'ai'
  content: string
}

const initialMessages: AgentMessage[] = [
  { id: 1, role: 'ai', content: 'Здравствуйте! Чем могу помочь?' },
]

export function AgentPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<AgentMessage[]>(initialMessages)
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: input.trim() }])
    setInput('')
  }

  return (
    <div
      className="flex flex-col border-t border-[#e8e8e8] bg-white flex-shrink-0 transition-all duration-300 ease-in-out"
      style={{ height: isOpen ? 350 : 44 }}
    >
      {/* Toggle bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 h-[44px] flex-shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors"
      >
        <div className="w-6 h-6 rounded-md bg-[#0d0d0d] flex items-center justify-center">
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-[13px] font-medium text-[#171717]">AI Ассистент</span>
        <ChevronUp
          className={cn(
            'w-4 h-4 text-[#737373] ml-auto transition-transform duration-300',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {/* Chat area (only when open) */}
      {isOpen && (
        <>
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 custom-scroll">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={cn('flex gap-2', msg.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                {msg.role === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-[#0d0d0d] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[80%] rounded-lg px-3 py-2 text-[13px] leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-[#0d0d0d] text-white'
                      : 'bg-[#f5f5f5] text-[#171717]',
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-[#f5f5f5]">
            <div className="flex items-center gap-2 bg-[#fafafa] border border-[#e8e8e8] rounded-lg px-3 py-2">
              <Sparkles className="w-4 h-4 text-[#737373]" />
              <input
                type="text"
                placeholder="Спросить AI..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#a3a3a3]"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-7 h-7 rounded-md bg-[#0d0d0d] hover:bg-[#262626] flex items-center justify-center disabled:opacity-30 transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
