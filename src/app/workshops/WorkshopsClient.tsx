"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Instagram, Sparkles } from "lucide-react"
import StudioELogo from "@/components/StudioELogo"
import WorkshopCard from "@/components/workshops/WorkshopCard"
import WorkshopsCarousel from "@/components/workshops/WorkshopsCarousel"
import { getUpcomingWorkshops } from "@/lib/workshops/catalog"

const INSTAGRAM_URL = "https://www.instagram.com/the_studio_e/"
const CHALLENGE_PATH = "/challenge"
const FOUNDER_DEAL_PATH = "/founder-deal"

export default function WorkshopsClient() {
  const workshops = useMemo(() => getUpcomingWorkshops(), [])

  return (
    <div className="min-h-screen bg-[#FAF8F6] text-stone-900 antialiased">
      {/* Minimal header */}
      <header className="border-b border-stone-200/80 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4 sm:px-6">
          <Link href="/" aria-label="Studio E home" className="shrink-0">
            <StudioELogo className="h-10 w-10" />
          </Link>
          <div className="min-w-0">
            <h1 className="font-montserrat text-lg font-black tracking-tight text-stone-900 sm:text-xl">
              Studio E Workshops
            </h1>
            <p className="truncate text-xs text-stone-500 sm:text-sm">
              Low-cost Latin dance and specialty workshops in Chicago.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Coming Up Next — carousel */}
        {workshops.length > 0 ? (
          <section aria-labelledby="coming-up-heading" className="mb-12">
            <h2
              id="coming-up-heading"
              className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-[#FF3366]"
            >
              Coming Up Next
            </h2>
            <p className="mt-1 text-sm text-stone-600">Swipe to browse — soonest first.</p>
            <div className="mt-4 -mx-4 px-4 sm:mx-0 sm:px-0">
              <WorkshopsCarousel workshops={workshops} />
            </div>
          </section>
        ) : null}

        {/* Choose Your Next Workshop — events-style grid */}
        <section aria-labelledby="choose-heading">
          <h2
            id="choose-heading"
            className="font-montserrat text-2xl font-black tracking-tight text-stone-900 sm:text-3xl"
          >
            Choose Your Next Workshop
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Upcoming workshops, soonest first. Reserve My Spot opens the workshop page.
          </p>

          {workshops.length === 0 ? (
            <p className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 text-center text-sm text-stone-600">
              No upcoming workshops are listed right now. Follow Studio E on Instagram for the next
              announcement.
            </p>
          ) : (
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {workshops.map((workshop) => (
                <li key={workshop.id}>
                  <WorkshopCard workshop={workshop} />
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* First class free — other classes */}
        <section
          className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] p-6 text-white sm:p-8"
          aria-labelledby="first-class-heading"
        >
          <div className="mx-auto max-w-xl text-center">
            <p className="inline-flex items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-[0.16em] text-white/85">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Beyond workshops
            </p>
            <h2
              id="first-class-heading"
              className="mt-3 font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
            >
              Looking for regular classes?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/90">
              Studio E’s other classes are first class free. Start with Salsa, Bachata, and more —
              no workshop ticket required.
            </p>
            <Link
              href={FOUNDER_DEAL_PATH}
              className="mt-6 inline-flex w-full max-w-sm items-center justify-center rounded-2xl border-2 border-white bg-white px-6 py-3.5 font-montserrat text-sm font-black uppercase tracking-wide text-[#FF3366] transition hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#FF3366]"
            >
              Claim Your First Class Free
            </Link>
          </div>
        </section>

        {/* Routing */}
        <section
          className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 text-center sm:p-8"
          aria-labelledby="start-heading"
        >
          <h2
            id="start-heading"
            className="font-montserrat text-xl font-black tracking-tight text-stone-900 sm:text-2xl"
          >
            Not Sure Where to Start?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-600">
            New to Studio E? Choose a beginner-friendly workshop. Want a structured confidence
            transformation? Explore the 28-Day Latin Dance Confidence Challenge.
          </p>
          <Link
            href={CHALLENGE_PATH}
            className="mt-6 inline-flex w-full max-w-sm items-center justify-center rounded-2xl bg-[#1a1a2e] px-6 py-3.5 font-montserrat text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#2a2a3e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a2e] focus-visible:ring-offset-2"
          >
            See the 28-Day Challenge
          </Link>
        </section>
      </main>

      {/* Footer CTA */}
      <footer className="border-t border-stone-200 bg-white px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-montserrat text-sm font-bold text-stone-900 sm:text-base">
            Follow Studio E on Instagram for new workshop announcements.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 font-montserrat text-sm font-bold text-[#FF3366] underline-offset-4 hover:underline"
          >
            <Instagram className="h-4 w-4" aria-hidden />
            @the_studio_e
          </a>
          <p className="mt-6 text-xs text-stone-400">
            <Link href="/" className="underline-offset-2 hover:underline">
              joinstudioe.com
            </Link>
            {" · "}
            2657 W Division St, Chicago
          </p>
        </div>
      </footer>
    </div>
  )
}
