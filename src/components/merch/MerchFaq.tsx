"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export type FaqItem = {
  question: string
  answer: string
}

type MerchFaqProps = {
  items: FaqItem[]
}

export default function MerchFaq({ items }: MerchFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
      {items.map((item, index) => {
        const open = openIndex === index
        const panelId = `merch-faq-panel-${index}`
        const buttonId = `merch-faq-button-${index}`

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF3366]"
              >
                <span className="font-montserrat text-sm font-bold text-stone-900 sm:text-base">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-stone-500 transition ${open ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="px-5 pb-5"
            >
              <p className="text-sm leading-relaxed text-stone-600 sm:text-base">
                {item.answer}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
