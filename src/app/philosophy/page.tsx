import type { Metadata } from "next"
import Link from "next/link"
import {
  BELIEFS_INTRO,
  CLOSING,
  GROUPS,
  HERO,
  NAV_ITEMS,
  PHILOSOPHY_META,
  SPEND_ALLOCATION,
  type PrincipleBlock,
} from "@/lib/philosophy/content"
import PhilosophyNav from "./PhilosophyNav"

export const metadata: Metadata = {
  title: PHILOSOPHY_META.title,
  description: PHILOSOPHY_META.description,
  openGraph: {
    title: PHILOSOPHY_META.title,
    description: PHILOSOPHY_META.description,
    url: PHILOSOPHY_META.url,
    type: "website",
  },
}

function PullQuote({ children }: { children: string }) {
  return (
    <blockquote className="my-6 border-l-4 border-[#FF3366] pl-5 font-montserrat text-xl font-bold leading-snug tracking-tight text-stone-900 sm:text-2xl">
      {children}
    </blockquote>
  )
}

function Principle({
  principle,
  showSpendChart,
}: {
  principle: PrincipleBlock
  showSpendChart?: boolean
}) {
  const showQuoteAfter =
    Boolean(principle.pullQuote) &&
    (Boolean(principle.pullQuoteAfter) || Boolean(principle.bullets?.length))

  return (
    <article id={principle.id} className="scroll-mt-36">
      <h3 className="font-montserrat text-2xl font-black tracking-tight text-stone-900 sm:text-[1.65rem]">
        {principle.title}
      </h3>

      {!showQuoteAfter && principle.pullQuote ? (
        <PullQuote>{principle.pullQuote}</PullQuote>
      ) : (
        <div className="mt-4" />
      )}

      <div className="space-y-4 text-base leading-relaxed text-stone-700 sm:text-[1.05rem]">
        {principle.paragraphs.map((paragraph) => {
          if (paragraph === "The principle is simple:") {
            return (
              <p key={paragraph} className="font-semibold text-stone-800">
                {paragraph}
              </p>
            )
          }

          if (paragraph.startsWith("Build a global network")) {
            return (
              <p
                key={paragraph}
                className="font-montserrat text-lg font-bold leading-snug text-stone-900 sm:text-xl"
              >
                {paragraph}
              </p>
            )
          }

          if (paragraph === "Free Palestine.") {
            return (
              <p key={paragraph} className="font-montserrat text-xl font-black text-stone-900">
                {paragraph}
              </p>
            )
          }

          if (
            paragraph === "Studio E is not for everyone." ||
            paragraph === "Nobody is entitled to another person's body." ||
            paragraph === "Teachers should remain students." ||
            paragraph === "We must acknowledge first." ||
            paragraph === "Culture requires resources."
          ) {
            return (
              <p key={paragraph} className="font-semibold text-stone-900">
                {paragraph}
              </p>
            )
          }

          return <p key={paragraph}>{paragraph}</p>
        })}
      </div>

      {showSpendChart ? (
        <div className="mt-8 space-y-3" aria-label="Approximate spending allocation">
          {SPEND_ALLOCATION.map((item) => (
            <div key={item.label}>
              <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium text-stone-800">{item.label}</span>
                <span className="font-montserrat font-bold tabular-nums text-stone-900">
                  ~{item.pct}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-stone-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#FF3366] to-[#FF7A5A]"
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
          <p className="pt-1 text-xs text-stone-500">Approximate allocation.</p>
        </div>
      ) : null}

      {principle.bullets ? (
        <ul className="mt-5 list-disc space-y-2 pl-5 text-base leading-relaxed text-stone-700">
          {principle.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      {showQuoteAfter && principle.pullQuote ? (
        <PullQuote>{principle.pullQuote}</PullQuote>
      ) : null}

      {principle.afterBullets ? (
        <div className="mt-5 space-y-4 text-base leading-relaxed text-stone-700 sm:text-[1.05rem]">
          {principle.afterBullets.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}
    </article>
  )
}

export default function PhilosophyPage() {
  return (
    <div className="bg-white text-stone-900">
      {/* Hero */}
      <header className="border-b border-stone-200 bg-gradient-to-b from-stone-50 to-white">
        <div className="mx-auto max-w-3xl px-4 pb-14 pt-12 sm:px-6 sm:pb-16 sm:pt-16">
          <p className="mb-5 inline-flex rounded-full border border-stone-300 bg-white px-3 py-1 font-montserrat text-[11px] font-bold uppercase tracking-[0.18em] text-stone-700">
            {HERO.label}
          </p>
          <h1 className="font-montserrat text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            {HERO.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-700 sm:text-xl">
            {HERO.subtitle}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
            {HERO.intro}
          </p>
        </div>
      </header>

      <PhilosophyNav items={NAV_ITEMS} />

      {/* What we believe */}
      <section className="border-b border-stone-200 bg-white px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="believe-heading">
        <div className="mx-auto max-w-3xl">
          <h2
            id="believe-heading"
            className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {BELIEFS_INTRO.headline}
          </h2>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-stone-800">
            {BELIEFS_INTRO.body}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-600">
            {BELIEFS_INTRO.shaping}
          </p>
        </div>
      </section>

      {/* Thematic groups */}
      {GROUPS.map((group, index) => {
        const alt = index % 2 === 1
        return (
          <section
            key={group.id}
            id={group.id}
            aria-labelledby={`${group.id}-heading`}
            className={`scroll-mt-36 border-b border-stone-200 px-4 py-14 sm:px-6 sm:py-20 ${
              alt ? "bg-stone-50" : "bg-white"
            }`}
          >
            <div className="mx-auto max-w-3xl">
              <p className="font-montserrat text-xs font-bold uppercase tracking-[0.22em] text-[#FF3366]">
                Section {String.fromCharCode(65 + index)}
              </p>
              <h2
                id={`${group.id}-heading`}
                className="mt-2 font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
              >
                {group.label}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
                {group.intro}
              </p>

              <div className="mt-12 space-y-14">
                {group.principles.map((principle) => (
                  <Principle
                    key={principle.id}
                    principle={principle}
                    showSpendChart={principle.id === "spends-money"}
                  />
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* Closing */}
      <section
        id={CLOSING.id}
        aria-labelledby="ultimately-heading"
        className="scroll-mt-36 bg-stone-950 px-4 py-20 text-white sm:px-6 sm:py-28"
      >
        <div className="mx-auto max-w-3xl">
          <p className="font-montserrat text-xs font-bold uppercase tracking-[0.22em] text-[#FF7A5A]">
            {CLOSING.groupNote}
          </p>
          <h2
            id="ultimately-heading"
            className="mt-3 font-montserrat text-3xl font-black tracking-tight sm:text-4xl md:text-5xl"
          >
            {CLOSING.title}
          </h2>

          <div className="mt-10 space-y-4 text-lg leading-relaxed text-white/90 sm:text-xl">
            {CLOSING.lines.map((line) => (
              <p
                key={line}
                className={
                  line === "They are another human being."
                    ? "font-montserrat text-2xl font-bold text-white sm:text-3xl"
                    : undefined
                }
              >
                {line}
              </p>
            ))}
          </div>

          <p className="mt-12 font-montserrat text-2xl font-black leading-snug tracking-tight text-white sm:text-3xl md:text-4xl">
            {CLOSING.emphasis}
          </p>

          <p className="mt-14">
            <Link
              href={CLOSING.quietLink.href}
              className="text-sm text-white/70 underline-offset-4 transition hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A5A]"
            >
              {CLOSING.quietLink.label}
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
