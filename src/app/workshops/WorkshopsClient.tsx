"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Instagram } from "lucide-react"
import StudioELogo from "@/components/StudioELogo"
import WorkshopCard from "@/components/workshops/WorkshopCard"
import { getUpcomingWorkshops } from "@/lib/workshops/catalog"

const INSTAGRAM_URL = "https://www.instagram.com/the_studio_e/"
const CHALLENGE_PATH = "/challenge"

export default function WorkshopsClient() {
  const workshops = useMemo(() => getUpcomingWorkshops(), [])
  const nextUp = workshops[0]

  return (
    <div className="min-h-screen bg-[#FAF8F6] text-stone-900 antialiased">
      {/* Minimal header */}
      <header className="border-b border-stone-200/80 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4 sm:px-6">
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

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Coming Up Next */}
        {nextUp ? (
          <section aria-labelledby="coming-up-heading" className="mb-10">
            <h2
              id="coming-up-heading"
              className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-[#FF3366]"
            >
              Coming Up Next
            </h2>
            <div className="mt-3">
              <WorkshopCard workshop={nextUp} featured />
            </div>
          </section>
        ) : null}

        {/* Choose Your Next Workshop */}
        <section aria-labelledby="choose-heading">
          <h2
            id="choose-heading"
            className="font-montserrat text-2xl font-black tracking-tight text-stone-900 sm:text-3xl"
          >
            Choose Your Next Workshop
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Upcoming workshops, soonest first. Tap Reserve My Spot to check out.
          </p>

          {workshops.length === 0 ? (
            <p className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 text-center text-sm text-stone-600">
              No upcoming workshops are listed right now. Follow Studio E on Instagram for the next
              announcement.
            </p>
          ) : (
            <ul className="mt-6 space-y-4">
              {workshops.map((workshop) => (
                <li key={workshop.id}>
                  <WorkshopCard workshop={workshop} featured={workshop.id === nextUp?.id} />
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Routing */}
        <section
          className="mt-12 rounded-2xl border border-stone-200 bg-white p-6 text-center sm:p-8"
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
        <div className="mx-auto max-w-3xl text-center">
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
