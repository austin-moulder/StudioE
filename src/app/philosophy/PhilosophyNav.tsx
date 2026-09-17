"use client"

import { useEffect, useState } from "react"

type NavItem = { id: string; label: string }

export default function PhilosophyNav({ items }: { items: readonly NavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "")

  useEffect(() => {
    const ids = items.map((item) => item.id)
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav
      aria-label="Philosophy sections"
      className="sticky top-16 z-30 border-b border-stone-200 bg-white/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-3 py-3 sm:px-6">
        {items.map((item) => {
          const isActive = active === item.id
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`shrink-0 rounded-full px-3.5 py-2 font-montserrat text-xs font-bold tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] sm:text-[13px] ${
                isActive
                  ? "bg-[#FF3366] text-white"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {item.label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
