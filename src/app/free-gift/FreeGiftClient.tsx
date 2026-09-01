"use client"

import Link from "next/link"
import {
  BookOpen,
  CheckCircle2,
  Download,
  MapPin,
  Play,
  Sparkles,
} from "lucide-react"

const GUIDE_URL =
  "https://drive.google.com/file/d/11DmqbXAS-2RZCkC-oY4XptqllKQf9LDO/view?usp=drive_link"

/** Replace with embed URL when the salsa basics video is ready (YouTube, Vimeo, etc.) */
const SALSA_VIDEO_EMBED_URL: string | null = null

const fears = [
  { fear: "I have no rhythm", answer: "Intro classes teach rhythm from scratch" },
  { fear: "I'm too old", answer: "You'll find all ages on the dance floor" },
  { fear: "I'm too out of shape", answer: "Social dancing helps you get back into shape" },
  {
    fear: "I'll look stupid in a beginner class",
    answer: "Studio E is built for absolute beginners",
  },
  { fear: "I don't have a partner", answer: "Over 70% of students show up solo" },
  {
    fear: "I don't know the etiquette",
    answer: "Our Friday Happy Hour Social teaches you the ropes",
  },
]

const sevenDayPath = [
  {
    days: "Day 1–2",
    title: "Start with the guide & video",
    body: "Read the starter guide and practice the basic salsa step on this page.",
  },
  {
    days: "Day 3",
    title: "Book your first class",
    body: "Pick a beginner class at Studio E—your first one is free.",
  },
  {
    days: "Day 4–5",
    title: "Bring a friend (optional)",
    body: "Invite someone for extra support. Solo is totally fine too.",
  },
  {
    days: "Day 6–7",
    title: "Show up early, stay a few minutes after",
    body: "Meet your instructor, ask one question, and choose your membership path.",
  },
]

const firstClassTips = [
  "Arrive 10 minutes early—street and park parking is widely available",
  "Sign in at the front desk and fill out a quick form",
  "Wear comfortable clothes and shoes you can spin in (avoid tennis shoes if possible)",
  "Take a deep breath—our goal is to learn just one new thing per class",
]

export default function FreeGiftClient() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#FF7A5A]/95 via-[#FF3366]/95 to-[#9933CC]/95" />
        <div className="container relative z-10 px-4 py-14 md:py-20">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white"
          >
            ← Back to Studio E
          </Link>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              <Sparkles className="h-5 w-5" aria-hidden />
              Your free gift
            </div>
            <h1 className="mb-4 text-3xl font-black leading-tight text-white md:text-5xl">
              Chicago Social Dance Starter Guide
            </h1>
            <p className="text-lg font-light leading-relaxed text-white/95 md:text-xl">
              Everything you need to go from Netflix on the couch to dancing out 3+ nights a week—with
              a warm, welcoming community.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/85">
              <MapPin className="h-4 w-4" aria-hidden />
              2657 W Division St · Humboldt Park
            </div>
          </div>
        </div>
      </section>

      {/* Guide download */}
      <section className="border-b border-gray-100 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-8 shadow-sm md:p-10">
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF3366] to-[#9933CC] text-white shadow-md">
                <BookOpen className="h-8 w-8" aria-hidden />
              </div>
              <h2 className="mb-3 text-2xl font-black text-gray-900 md:text-3xl">
                Download the full guide
              </h2>
              <p className="mb-8 max-w-lg text-gray-600 leading-relaxed">
                A beginner-friendly walkthrough of Chicago&apos;s social dance scene—common fears
                debunked, how Studio E teaches differently, what to expect in your first class, and
                your 7-day kickoff plan.
              </p>
              <a
                href={GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC] px-8 py-4 text-base font-bold text-white shadow-lg transition hover:opacity-95 sm:w-auto"
              >
                <Download className="h-5 w-5" aria-hidden />
                Open starter guide (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Fears */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <p className="mb-2 text-center text-sm font-bold uppercase tracking-[0.2em] text-[#FF3366]">
            From the guide
          </p>
          <h2 className="mb-3 text-center text-2xl font-black text-gray-900 md:text-3xl">
            Learning to social dance can be hard… but it doesn&apos;t have to be
          </h2>
          <p className="mb-10 text-center text-gray-600">
            Here&apos;s what students worried about—and what they realized after Studio E.
          </p>
          <div className="space-y-3">
            {fears.map((item) => (
              <div
                key={item.fear}
                className="grid gap-2 rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:grid-cols-2 sm:gap-4 sm:p-5"
              >
                <p className="text-sm font-semibold text-gray-500">{item.fear}</p>
                <p className="flex items-start gap-2 text-sm font-medium text-gray-900">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500"
                    aria-hidden
                  />
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Method teaser */}
      <section className="border-y border-gray-100 bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-black text-gray-900 md:text-3xl">
            The Studio E Method—not combo of the day
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 leading-relaxed">
            While most studios overwhelm you with tricky combinations and no structure, we teach
            foundational skills across salsa, bachata, cumbia, and merengue—turns, cross-body,
            travels, and styling—so you can actually dance socially, not memorize a routine.
          </p>
        </div>
      </section>

      {/* Video */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <p className="mb-2 text-center text-sm font-bold uppercase tracking-[0.2em] text-[#FF3366]">
            Day 1–2
          </p>
          <h2 className="mb-3 text-center text-2xl font-black text-gray-900 md:text-3xl">
            Learn the basic salsa step
          </h2>
          <p className="mb-8 text-center text-gray-600">
            Practice at home before your first class. Video below—more coming soon.
          </p>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-900 shadow-lg">
            <div className="relative aspect-video w-full">
              {SALSA_VIDEO_EMBED_URL ? (
                <iframe
                  src={SALSA_VIDEO_EMBED_URL}
                  title="Basic salsa step tutorial"
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/20 bg-white/10">
                    <Play className="h-7 w-7 text-white/80" aria-hidden />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">Video coming soon</p>
                    <p className="mt-1 max-w-sm text-sm text-white/60">
                      We&apos;re adding a short tutorial on the basic salsa step. Check back—or
                      open the guide above for your next steps.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7-day path */}
      <section className="border-t border-gray-100 bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-3 text-center text-2xl font-black text-gray-900 md:text-3xl">
            Your next 7 days
          </h2>
          <p className="mb-10 text-center text-gray-600">
            Build the habit that turns you into a confident dancer in 28 days or less.
          </p>
          <div className="space-y-4">
            {sevenDayPath.map((step) => (
              <div
                key={step.days}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-[#FF3366]">
                  {step.days}
                </p>
                <h3 className="mt-1 font-bold text-gray-900">{step.title}</h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* First class prep */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-2xl font-black text-gray-900 md:text-3xl">
            How to prepare for your first class
          </h2>
          <ul className="space-y-3">
            {firstClassTips.map((tip) => (
              <li key={tip} className="flex items-start gap-3 text-gray-700">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#FF3366]"
                  aria-hidden
                />
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] py-14 md:py-20">
        <div className="container mx-auto max-w-2xl px-4 text-center text-white">
          <h2 className="text-3xl font-black md:text-4xl">Claim your first class free</h2>
          <p className="mx-auto mt-4 max-w-lg text-lg font-light text-white/90">
            Unlike other studios, Studio E gives you your first class on us. Spots fill fast—lock
            yours in now.
          </p>
          <Link
            href="/founder-deal"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 text-lg font-bold text-[#FF3366] shadow-lg transition hover:bg-white/95"
          >
            Get my free first class
          </Link>
          <p className="mt-6 text-sm text-white/70">
            2657 W Division St, Chicago, IL 60622
          </p>
        </div>
      </section>
    </div>
  )
}
