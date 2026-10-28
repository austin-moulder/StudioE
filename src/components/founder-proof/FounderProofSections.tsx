import {
  BUSINESS_SUCCESS_STORIES,
  FOUNDER_ACHIEVEMENTS,
  FOUNDER_FREE_WORKSHOP_LINE,
  FOUNDER_RATE_LINE,
} from "@/lib/founder-proof/content"

type Theme = "dark" | "light"

const themes = {
  dark: {
    section: "border-y border-white/10 bg-[#111827] px-5 py-16 sm:px-8 sm:py-20",
    sectionAlt: "px-5 py-16 sm:px-8 sm:py-20",
    eyebrow: "font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A5A]",
    heading: "mt-3 font-montserrat text-3xl font-black tracking-tight text-white sm:text-4xl",
    body: "mt-4 max-w-2xl text-white/75",
    card: "rounded-2xl border border-white/10 bg-[#0B1220] p-5 sm:p-6",
    quote: "text-sm leading-relaxed text-white/80",
    name: "mt-4 font-montserrat text-sm font-bold text-white",
    role: "text-xs text-white/55",
    rateBox: "mt-8 rounded-2xl border border-[#FF3366]/35 bg-[#FF3366]/10 px-5 py-5",
    ratePrimary: "font-montserrat text-base font-bold text-white sm:text-lg",
    rateSecondary: "mt-2 text-sm text-white/80",
    org: "font-montserrat text-sm font-bold text-[#FF7A5A]",
    detail: "mt-2 text-sm leading-relaxed text-white/80",
  },
  light: {
    section: "bg-[#FAF8F6] px-4 py-16 md:py-20",
    sectionAlt: "bg-white px-4 py-16 md:py-20",
    eyebrow: "text-xs font-bold uppercase tracking-[0.2em] text-[#8B1538]",
    heading: "mt-3 font-montserrat text-3xl font-black text-stone-900 md:text-4xl",
    body: "mx-auto mt-4 max-w-2xl text-lg text-stone-600",
    card: "rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6",
    quote: "text-sm leading-relaxed text-stone-600",
    name: "mt-4 font-montserrat text-sm font-bold text-stone-900",
    role: "text-xs text-stone-500",
    rateBox: "mx-auto mt-8 max-w-3xl rounded-2xl border border-[#FF3366]/25 bg-[#FFF5F7] px-5 py-5 text-left",
    ratePrimary: "font-montserrat text-base font-bold text-stone-900 sm:text-lg",
    rateSecondary: "mt-2 text-sm text-stone-600",
    org: "font-montserrat text-sm font-bold text-[#8B1538]",
    detail: "mt-2 text-sm leading-relaxed text-stone-600",
  },
} as const

export function SuccessStoriesSection({
  theme,
  centeredIntro = false,
}: {
  theme: Theme
  centeredIntro?: boolean
}) {
  const t = themes[theme]
  return (
    <section className={t.section}>
      <div className={`mx-auto max-w-5xl ${centeredIntro ? "text-center" : ""}`}>
        <p className={t.eyebrow}>Success stories</p>
        <h2 className={t.heading}>Professionals who’ve learned with Austin</h2>
        <p className={`${t.body} ${centeredIntro ? "mx-auto" : ""}`}>
          The same coaching voice behind Studio E’s dance-business consulting—real operators, real
          outcomes.
        </p>
        <div className="mt-10 grid gap-4 text-left sm:grid-cols-2">
          {BUSINESS_SUCCESS_STORIES.map((story) => (
            <article key={story.name} className={t.card}>
              <p className={t.quote}>“{story.quote}”</p>
              <p className={t.name}>{story.name}</p>
              <p className={t.role}>{story.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FounderTrackRecordSection({
  theme,
  showFreeWorkshopCallout,
}: {
  theme: Theme
  showFreeWorkshopCallout?: boolean
}) {
  const t = themes[theme]
  return (
    <section className={t.sectionAlt}>
      <div className="mx-auto max-w-5xl">
        <p className={t.eyebrow}>Founder track record</p>
        <h2 className={t.heading}>Why operators pay $250+/hour for this time</h2>
        <p className={t.body}>
          Austin René Moulder has sat in BCG war rooms, scaled marketplace ops at nine-figure
          revenue, helped raise institutional capital, and is now bootstrapping Chicago’s
          fastest-growing Latin dance business—from the inside.
        </p>

        <div className={t.rateBox}>
          <p className={t.ratePrimary}>{FOUNDER_RATE_LINE}</p>
          {showFreeWorkshopCallout ? (
            <p className={t.rateSecondary}>{FOUNDER_FREE_WORKSHOP_LINE}</p>
          ) : (
            <p className={t.rateSecondary}>
              Inside the Career Accelerator, you get that operator lens weekly—on live Studio E
              work—not a slide deck from someone who’s never run a P&amp;L.
            </p>
          )}
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {FOUNDER_ACHIEVEMENTS.map((item) => (
            <li key={item.org} className={t.card}>
              <p className={t.org}>{item.org}</p>
              <p className={t.detail}>{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
