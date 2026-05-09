'use client'

import { useState } from 'react'
import { Zap, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function RegisterView() {
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

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
          <h1 className="text-xl font-semibold text-[#171717] text-center mb-1">
            Создать аккаунт
          </h1>
          <p className="text-sm text-[#737373] text-center mb-6">
            Заполните данные для регистрации
          </p>

          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <Label className="text-[13px] font-medium text-[#525252]">
                Имя
              </Label>
              <input
                type="text"
                placeholder="Иван Петров"
                className="w-full h-10 px-3 rounded-lg border border-[#e8e8e8] bg-white text-sm outline-none focus:border-[#737373] transition-colors placeholder:text-[#a8a8a8] text-[#171717]"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label className="text-[13px] font-medium text-[#525252]">
                Email
              </Label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full h-10 px-3 rounded-lg border border-[#e8e8e8] bg-white text-sm outline-none focus:border-[#737373] transition-colors placeholder:text-[#a8a8a8] text-[#171717]"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label className="text-[13px] font-medium text-[#525252]">
                Пароль
              </Label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Минимум 8 символов"
                  className="w-full h-10 px-3 pr-10 rounded-lg border border-[#e8e8e8] bg-white text-sm outline-none focus:border-[#737373] transition-colors placeholder:text-[#a8a8a8] text-[#171717]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a8a8a8] hover:text-[#525252] transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <Label className="text-[13px] font-medium text-[#525252]">
                Подтвердите пароль
              </Label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Повторите пароль"
                className="w-full h-10 px-3 rounded-lg border border-[#e8e8e8] bg-white text-sm outline-none focus:border-[#737373] transition-colors placeholder:text-[#a8a8a8] text-[#171717]"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(v) => setAcceptTerms(v === true)}
                className="border-[#d4d4d4] data-[state=checked]:bg-[#0d0d0d] data-[state=checked]:border-[#0d0d0d] mt-0.5"
              />
              <Label
                htmlFor="terms"
                className="text-[13px] text-[#525252] cursor-pointer font-normal leading-snug"
              >
                Принимаю{' '}
                <span className="text-[#2563eb] hover:text-[#1d4ed8] transition-colors">
                  условия использования
                </span>{' '}
                и{' '}
                <span className="text-[#2563eb] hover:text-[#1d4ed8] transition-colors">
                  политику конфиденциальности
                </span>
              </Label>
            </div>

            {/* Submit */}
            <Button className="w-full h-10 rounded-[10px] bg-[#0d0d0d] hover:bg-[#262626] text-white text-sm font-medium mt-2">
              Создать аккаунт
            </Button>
          </div>
        </div>

        {/* Link to login */}
        <p className="text-sm text-[#737373] text-center mt-6">
          Уже есть аккаунт?{' '}
          <button
            type="button"
            className="text-[#2563eb] hover:text-[#1d4ed8] font-medium transition-colors cursor-pointer"
          >
            Войти
          </button>
        </p>
      </div>
    </div>
  )
}
