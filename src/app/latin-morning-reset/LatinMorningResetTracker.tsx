"use client"

import { useEffect } from "react"
import { OFFER } from "@/lib/latin-morning-reset/config"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/** Fires Meta ViewContent once on client mount. */
export default function LatinMorningResetTracker() {
  useEffect(() => {
    if (typeof window.fbq === "function") {
      window.fbq("track", "ViewContent", {
        content_name: OFFER.name,
        content_category: "fitness",
        value: OFFER.price,
        currency: "USD",
      })
    }
  }, [])

  return null
}
