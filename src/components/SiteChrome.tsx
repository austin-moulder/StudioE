"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const HIDE_CHROME_PATHS = ["/chicago-2-week-unlimited-pass", "/challenge"]

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideChrome = HIDE_CHROME_PATHS.some(
    (path) => pathname === path || pathname?.startsWith(`${path}/`)
  )

  if (hideChrome) {
    return <main className="flex-1">{children}</main>
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
