import { ArrowRight } from "lucide-react"

type FestCheckoutLinkProps = {
  href: string
  label: string
  size?: "default" | "large"
  className?: string
}

export default function FestCheckoutLink({
  href,
  label,
  size = "default",
  className = "",
}: FestCheckoutLinkProps) {
  const sizeClasses =
    size === "large"
      ? "w-full max-w-lg px-10 py-5 text-lg md:text-xl"
      : "w-full max-w-md px-8 py-4 text-base md:text-lg"

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-white font-black uppercase tracking-wide text-gray-900 shadow-xl transition-opacity hover:opacity-95 ${sizeClasses} ${className}`}
    >
      {label}
      <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
    </a>
  )
}
