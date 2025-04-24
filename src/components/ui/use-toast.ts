"use client"

import { toast } from "sonner"

type ToastTypes = "default" | "success" | "info" | "warning" | "destructive"

interface ToastProps {
  title?: string
  description?: string
  variant?: ToastTypes
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export function useToast() {
  return {
    toast: ({ title, description, variant = "default", duration = 4000, action }: ToastProps) => {
      const config = {
        description,
        duration,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
      }
      
      switch (variant) {
        case "success":
          toast.success(title, config)
          break
        case "info":
          toast.info(title, config)
          break
        case "warning":
          toast.warning(title, config)
          break
        case "destructive":
          toast.error(title, config)
          break
        default:
          toast(title, config)
      }
    },
  }
} 