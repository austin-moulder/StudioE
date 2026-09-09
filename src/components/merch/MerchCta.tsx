import { ArrowUpRight } from "lucide-react"
import { getFounderOfferUrl } from "@/lib/merch/shopify"

type MerchCtaProps = {
  children: React.ReactNode
  href?: string
  variant?: "primary" | "secondary" | "light"
  className?: string
  showIcon?: boolean
}

const variantClasses = {
  primary:
    "bg-[#FF3366] text-white hover:bg-[#E62E5C] focus-visible:ring-[#FF3366]",
  secondary:
    "border border-stone-300 bg-white text-stone-900 hover:border-stone-400 hover:bg-stone-50 focus-visible:ring-stone-400",
  light:
    "bg-white text-[#FF3366] hover:bg-white/95 focus-visible:ring-white",
} as const

export default function MerchCta({
  children,
  href = getFounderOfferUrl(),
  variant = "primary",
  className = "",
  showIcon = true,
}: MerchCtaProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-center text-sm font-bold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:text-base ${variantClasses[variant]} ${className}`}
    >
      <span>{children}</span>
      {showIcon ? <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden /> : null}
    </a>
  )
}
