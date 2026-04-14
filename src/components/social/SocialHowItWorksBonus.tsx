"use client"

import { useEffect, useState } from "react"
import { isAprilMayFreeSocial } from "./socialAprilMayFree"

export default function SocialHowItWorksBonus() {
  const [freeSeason, setFreeSeason] = useState(false)

  useEffect(() => {
    setFreeSeason(isAprilMayFreeSocial())
  }, [])

  if (freeSeason) {
    return (
      <p className="mt-3 text-sm font-semibold text-[#FF3366]">
        Starting June 1: if you purchase a Gold Membership at the social, we credit the price of the dancer pass to
        your first month.
      </p>
    )
  }

  return (
    <p className="mt-3 text-sm font-semibold text-[#FF3366]">
      Bonus: if you purchase a Gold Membership at the social, we credit the price of the dancer pass to your first
      month.
    </p>
  )
}
