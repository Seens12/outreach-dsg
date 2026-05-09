"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] border shadow-xs outline-none disabled:cursor-not-allowed disabled:opacity-50",
        "transition-all duration-200 ease-in-out",
        "data-[state=checked]:bg-[#0d0d0d] data-[state=checked]:border-[#0d0d0d] data-[state=checked]:text-white",
        "data-[state=unchecked]:bg-white data-[state=unchecked]:border-[#d4d4d4]",
        "hover:border-[#a8a8a8]",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-opacity duration-150 scale-100 data-[state=checked]:scale-100"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
