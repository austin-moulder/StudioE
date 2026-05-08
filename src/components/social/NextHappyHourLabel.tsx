"use client"

import { useEffect, useState } from "react"

function getNextHappyHourLabel() {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const daysUntilFriday = (5 - dayOfWeek + 7) % 7
  const nextFriday = new Date(today)
  nextFriday.setDate(today.getDate() + daysUntilFriday)

  const formatted = nextFriday.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  })

  return `Next Happy Hour: Friday, ${formatted}, doors 7:00 pm · lesson 7:15–7:45 pm · social dancing 7:45–10:00 pm`
}

export default function NextHappyHourLabel() {
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    setLabel(getNextHappyHourLabel())
  }, [])

  return (
    <p className="mt-3 text-base font-semibold text-white/85 md:text-lg">
      {label ?? "Next Happy Hour: Fridays · doors 7:00 pm · lesson 7:15–7:45 pm · social dancing 7:45–10:00 pm"}
    </p>
  )
}
