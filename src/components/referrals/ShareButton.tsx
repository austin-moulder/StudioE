"use client"

import { Share2 } from "lucide-react"
import {
  REFERRAL_SHARE,
  getWhatsAppShareUrl,
} from "@/lib/referrals/config"

type ShareButtonProps = {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "light" | "sticky"
}

const variantClasses = {
  primary:
    "bg-[#FF3366] text-white hover:bg-[#E62E5C] focus-visible:ring-[#FF3366]",
  light:
    "bg-white text-[#FF3366] hover:bg-white/95 focus-visible:ring-white",
  sticky:
    "bg-[#FF3366] text-white shadow-lg hover:bg-[#E62E5C] focus-visible:ring-[#FF3366]",
} as const

export default function ShareButton({
  children,
  className = "",
  variant = "primary",
}: ShareButtonProps) {
  const whatsappUrl = getWhatsAppShareUrl()

  async function handleShare() {
    const payload = {
      title: REFERRAL_SHARE.title,
      text: `${REFERRAL_SHARE.text} ${REFERRAL_SHARE.url}`,
      url: REFERRAL_SHARE.url,
    }

    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share(payload)
        return
      } catch (error) {
        // User cancelled or share failed — fall through to WhatsApp.
        if (error instanceof DOMException && error.name === "AbortError") return
      }
    }

    window.location.href = whatsappUrl
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-center text-sm font-bold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:text-base ${variantClasses[variant]} ${className}`}
    >
      <Share2 className="h-4 w-4 shrink-0" aria-hidden />
      <span>{children}</span>
    </button>
  )
}
