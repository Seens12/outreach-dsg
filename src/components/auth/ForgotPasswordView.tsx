'use client'

import { useState } from 'react'
import { Zap, MailCheck, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordView() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSent(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-9 h-9 bg-[#0d0d0d] rounded-[8px] flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-[-0.02em] text-[#171717]">
            OutreachAI
          </span>
        </div>

        {/* Card */}
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white p-6">
          {!sent ? (
            <>
              <h1 className="text-xl font-semibold text-[#171717] text-center mb-1">
                Восстановление пароля
              </h1>
              <p className="text-sm text-[#737373] text-center mb-6">
                Введите email для сброса пароля
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="space-y-1.5">
                  <Label className="text-[13px] font-medium text-[#525252]">
                    Email
                  </Label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-[#e8e8e8] bg-white text-sm outline-none focus:border-[#737373] transition-colors placeholder:text-[#a8a8a8] text-[#171717]"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={!email.trim()}
                  className="w-full h-10 rounded-[10px] bg-[#0d0d0d] hover:bg-[#262626] text-white text-sm font-medium mt-2 disabled:opacity-50"
                >
                  Отправить ссылку
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-[#f0fdf4] flex items-center justify-center mx-auto mb-4">
                <MailCheck className="w-7 h-7 text-[#15803d]" />
              </div>
              <h2 className="text-xl font-semibold text-[#171717] mb-2">
                Письмо отправлено!
              </h2>
              <p className="text-sm text-[#737373] leading-relaxed">
                Мы отправили инструкцию по восстановлению пароля на{' '}
                <span className="font-medium text-[#171717]">{email}</span>.
                Проверьте входящие и папку Спам.
              </p>
              <Button
                variant="outline"
                className="mt-6 rounded-[10px] border-[#e8e8e8] text-[#525252]"
                onClick={() => {
                  setSent(false)
                  setEmail('')
                }}
              >
                Отправить повторно
              </Button>
            </div>
          )}
        </div>

        {/* Back to login */}
        <div className="text-center mt-6">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-sm text-[#737373] hover:text-[#171717] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Вернуться к входу
          </button>
        </div>
      </div>
    </div>
  )
}
