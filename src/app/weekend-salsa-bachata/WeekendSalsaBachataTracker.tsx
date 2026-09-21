"use client"

import { useEffect } from "react"
import { OFFER } from "@/lib/weekend-salsa-bachata/config"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export default function WeekendSalsaBachataTracker() {
  useEffect(() => {
    if (typeof window.fbq === "function") {
      window.fbq("track", "ViewContent", {
        content_name: OFFER.name,
        content_category: "membership",
        value: OFFER.firstClassPrice,
        currency: "USD",
      })
    }
  }, [])

  return null
}
