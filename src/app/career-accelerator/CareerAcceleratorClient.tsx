"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import {
  ArrowRight,
  Briefcase,
  Check,
  ChevronDown,
  Clock,
  FolderKanban,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react"
import { BUSINESS_SUCCESS_STORIES } from "@/lib/founder-proof/content"

const AUSTIN_PHOTO =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Austin_Accelerator.jpg"

const DEPOSIT = 799

const BONUSES = [
  "Founder-led networking dinner",
  "Portfolio documentation for interviews",
  "Mock interview preparation",
  "Operator showcase to demonstrate outcomes of your project",
] as const

const PROJECT_EXAMPLES = [
  "Referral campaigns",
  "Conversion rate optimization campaigns",
  "Throughput optimization",
  "Customer retention analysis",
  "Affiliate partnership campaign builds",
  "Ad and lead nurture campaigns",
] as const

const WHAT_YOU_GET = [
  {
    title: "Live operator training",
    body: "Marketing, ops, sales, talent, retention, and recruiting—taught inside a real business.",
    icon: Rocket,
  },
  {
    title: "Real Studio E projects",
    body: "Apply what you learn to live offers, funnels, and internal workstreams.",
    icon: FolderKanban,
  },
  {
    title: "Portfolio documentation",
    body: "Leave with work you can show and talk about in interviews.",
    icon: Briefcase,
  },
  {
    title: "Mentorship",
    body: "Direct coaching from Austin in a small, serious cohort.",
    icon: Users,
  },
  {
    title: "Placement consideration",
    body: "Top performers are first in line for roles or contract work as Studio E grows.",
    icon: ShieldCheck,
  },
] as const

const weeks = [
  {
    week: 1,
    title: "Marketing Foundations",
    bullets: [
      "4 ways to get leads, 4 core lead getters",
      "Brand fundamentals that scale",
      "Website flows and lead nurture basics",
    ],
  },
  {
    week: 2,
    title: "Meta Ads & Automated Funnels",
    bullets: [
      "Intro to Meta Ads (objectives, audiences, creatives)",
      "Simple automated funnels for local offers",
      "Tracking, basic metrics, and feedback loops",
    ],
  },
  {
    week: 3,
    title: "Content & Hooks",
    bullets: [
      "How to mass produce authentic content",
      "Hooks that get attention",
      "Building a Hook / Body / CTA machine for social",
    ],
  },
  {
    week: 4,
    title: "Operations Fundamentals",
    bullets: [
      "First principles thinking",
      "Build for 1, then build for scale",
      "Throughput, cycle time, utilization (how work really moves)",
    ],
  },
  {
    week: 5,
    title: "Talent & Sales",
    bullets: [
      "Document, demonstrate, duplicate (DDD) for training",
      "Character, competence, commitment as hiring filters",
      "The CLOSER framework basics for ethical sales",
    ],
  },
  {
    week: 6,
    title: "Customer Success & Retention",
    bullets: [
      "“Angry Boat” concept and handling tough situations",
      "How to keep customers, not just close them",
      "Simple retention systems inside a small business",
    ],
  },
  {
    week: 7,
    title: "Entrepreneurship Bootcamp",
    bullets: [
      "Golden Equation: 2x 30DGP > CAC (what it means in practice)",
      "Offers, proof stacking, basic money models",
      "Fast Cash plays and single bottleneck theory",
    ],
  },
  {
    week: 8,
    title: "Recruiting & Interview Excellence",
    bullets: [
      "Resume positioning and employer CRM basics",
      "Networking and company research",
      "Negotiation, storytelling, and purpose-oriented answers",
      "Disarming, strategic questions, demonstrated interest",
    ],
  },
] as const

const steps = [
  {
    title: "Attend the free workshop",
    body: "Start with Build a Business in 90 Minutes—Sunday, November 22nd at 3:00 PM at Studio E.",
  },
  {
    title: "Apply",
    body: "Complete the short application with your background and goals.",
  },
  {
    title: "Selection",
    body: "We invite a small group of serious, high-potential candidates. Spots are limited.",
  },
  {
    title: "Train weekly",
    body: "Sundays, 7:30–9:00 PM for 8 weeks, plus live implementation between sessions.",
  },
  {
    title: "Placement opportunities",
    body: "Top performers are considered for roles or contract work in marketing, ops, or sales.",
  },
] as const

const faqs = [
  {
    question: "What’s the first step?",
    answer:
      "Attend the free “Build a Business in 90 Minutes” workshop at Studio E on Sunday, November 22nd at 3:00 PM. That’s how you get a clear look at the accelerator before you commit.",
  },
  {
    question: "Is there a cost to join?",
    answer: `Yes—a $${DEPOSIT} refundable deposit. It’s a commitment device, not a tuition fee. If you complete the Career Accelerator, Studio E returns your full deposit.`,
  },
  {
    question: "Who teaches the accelerator?",
    answer:
      "Austin Moulder—former Boston Consulting Group consultant (1% offer rate), former Operations Director for a $250M tech marketplace overseeing 150+ employees, former VC-backed edtech entrepreneur, and now the bootstrapped owner of Chicago’s fastest-growing Latin dance business (170 active members before the grand opening).",
  },
  {
    question: "Do I need previous experience?",
    answer:
      "No formal experience is required. We care more about your work ethic, curiosity, and willingness to learn than your resume.",
  },
  {
    question: "Is this remote or in-person?",
    answer:
      "This is an in-person program at Studio E HQ: 2657 W Division St, Humboldt Park, Chicago.",
  },
  {
    question: "Will I get a job at the end?",
    answer:
      "This is not a guaranteed job. But top performers will be the first people we look at for roles and projects inside Studio E as we grow.",
  },
]

const FORM_URL = "https://api.leadconnectorhq.com/widget/form/79ExHftDf8qbN9cJxL67"
const FORM_ID = "79ExHftDf8qbN9cJxL67"
const FORM_IFRAME_ID = `inline-${FORM_ID}`

type IFrameResizeWindow = Window & {
  iFrameResize?: (options: Record<string, unknown>, target: HTMLIFrameElement) => void
}

function initFormEmbed() {
  const iframe = document.getElementById(FORM_IFRAME_ID) as HTMLIFrameElement | null
  if (!iframe) return false
  if (iframe.getAttribute("data-iframe-resizer-initialized") === "true") return true
  const { iFrameResize } = window as IFrameResizeWindow
  if (typeof iFrameResize !== "function") return false
  const isMobile = window.matchMedia("(max-width: 768px)").matches
  iFrameResize(
    {
      autoResize: true,
      scrolling: false,
      checkOrigin: false,
      heightCalculationMethod: "max",
      minHeight: isMobile ? 520 : 700,
    },
    iframe
  )
  return true
}

function enableFormEmbedScrollFallback() {
  const iframe = document.getElementById(FORM_IFRAME_ID) as HTMLIFrameElement | null
  if (!iframe || iframe.getAttribute("data-iframe-resizer-initialized") === "true") return
  iframe.setAttribute("scrolling", "yes")
  iframe.style.minHeight = "70vh"
  iframe.style.overflow = "auto"
}

const primaryCta =
  "inline-flex w-full max-w-md items-center justify-center rounded-2xl bg-[#FF3366] px-6 py-4 text-center font-montserrat text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-[#FF3366]/25 transition hover:bg-[#E02D5A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2 sm:text-base"

function ApplyCta({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <a
      href="#apply"
      className={`${light ? "inline-flex w-full max-w-md items-center justify-center rounded-2xl border-2 border-white bg-transparent px-6 py-4 text-center font-montserrat text-sm font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-[#1a1a2e] sm:text-base" : primaryCta} ${className}`}
    >
      Apply for Career Accelerator
      <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
    </a>
  )
}

export default function CareerAcceleratorClient() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
  const [expandedWeek, setExpandedWeek] = useState<number | null>(0)

  useEffect(() => {
    let attempts = 0
    const interval = setInterval(() => {
      attempts += 1
      if (initFormEmbed() || attempts >= 50) {
        if (attempts >= 50) enableFormEmbedScrollFallback()
        clearInterval(interval)
      }
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen scroll-smooth bg-[#FAF8F6] pb-24 text-stone-900 antialiased sm:pb-0">
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />

      {/* 1. HERO */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#8B1538] to-[#9933CC] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,122,90,0.25),_transparent_55%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <p className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
            <Rocket className="h-3.5 w-3.5 text-[#FF7A5A]" aria-hidden />
            8-week career accelerator
          </p>
          <h1 className="mt-5 font-montserrat text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            Stop Learning Business Theory. Start Building With a Real Business.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            Eight weeks of live projects at Studio E—portfolio proof, operator skills, and a shot at
            real opportunity inside a growing Chicago business.
          </p>
          <ul className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-white/85">
            <li className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#FF7A5A]" aria-hidden />
              Sundays · 7:30–9:00 PM · 8 weeks
            </li>
            <li className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-[#FF7A5A]" aria-hidden />
              Studio E · 2657 W Division St
            </li>
          </ul>
          <p className="mt-4 text-sm text-white/75">
            ${DEPOSIT} refundable deposit · Small cohort
          </p>
          <div className="mt-8 flex justify-center">
            <ApplyCta light />
          </div>
          <p className="mt-5 text-sm text-white/70">
            First step:{" "}
            <Link href="/business-workshop" className="font-semibold text-white underline-offset-2 hover:underline">
              free Build a Business in 90 Minutes workshop
            </Link>
          </p>
        </div>
      </header>

      {/* 2. WHAT YOU GET */}
      <section className="px-5 py-14 sm:px-8 sm:py-16" aria-labelledby="get-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="get-heading" className="text-center font-montserrat text-3xl font-black sm:text-4xl">
            What you get
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_YOU_GET.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm"
              >
                <item.icon className="h-6 w-6 text-[#FF3366]" aria-hidden />
                <h3 className="mt-3 font-montserrat text-base font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <ApplyCta />
          </div>
        </div>
      </section>

      {/* 3. 8-WEEK JOURNEY */}
      <section id="journey" className="scroll-mt-20 border-y border-stone-200/80 bg-white px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-montserrat text-3xl font-black sm:text-4xl">
            The 8-week journey
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-stone-600">
            Each Sunday builds on the last. Tap a week for details.
          </p>
          <ol className="relative mt-10 space-y-3 border-l-2 border-[#FF3366]/30 pl-6">
            {weeks.map((week, index) => {
              const open = expandedWeek === index
              return (
                <li key={week.week} className="relative">
                  <span className="absolute -left-[1.9rem] top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#FF3366] text-[10px] font-black text-white">
                    {week.week}
                  </span>
                  <button
                    type="button"
                    onClick={() => setExpandedWeek(open ? null : index)}
                    className="flex w-full items-center justify-between gap-3 rounded-xl border border-stone-200 bg-[#FAF8F6] px-4 py-3 text-left transition hover:border-[#FF3366]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366]"
                    aria-expanded={open}
                  >
                    <span className="font-montserrat text-sm font-bold">{week.title}</span>
                    <ChevronDown
                      className={`h-4 w-4 flex-shrink-0 text-stone-400 transition ${open ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  {open ? (
                    <ul className="mt-2 space-y-1.5 px-1">
                      {week.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2 text-sm text-stone-600">
                          <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#FF3366]" aria-hidden />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              )
            })}
          </ol>
          <div className="mt-8 flex justify-center">
            <ApplyCta />
          </div>
        </div>
      </section>

      {/* 4. PROJECTS */}
      <section className="bg-[#FAF8F6] px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-montserrat text-3xl font-black sm:text-4xl">
            Projects you’ll actually ship
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-stone-600">
            Implementation work on Studio E’s live business—not case studies from a slide deck.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {PROJECT_EXAMPLES.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 rounded-xl border border-stone-200/80 bg-white px-4 py-4 text-sm font-medium text-stone-800"
              >
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FF3366]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-center">
            <ApplyCta />
          </div>
        </div>
      </section>

      {/* 5. AUSTIN COMPACT */}
      <section className="border-y border-stone-200/80 bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full shadow-md">
            <Image
              src={AUSTIN_PHOTO}
              alt="Austin Moulder, Career Accelerator instructor"
              fill
              sizes="80px"
              className="object-cover object-top"
              priority
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8B1538]">
              Taught by Austin Moulder
            </p>
            <p className="mt-2 text-sm leading-relaxed text-stone-700 sm:text-base">
              BCG consultant (1% offer rate) · Ops Director for a $250M marketplace · VC-backed
              edtech founder · Bootstrapping Studio E (170 active members before grand opening)
            </p>
            <p className="mt-2 text-xs text-stone-500">
              Career professionals regularly pay $250+/hour for operator time at this level.
            </p>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="bg-[#FAF8F6] px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-montserrat text-3xl font-black sm:text-4xl">
            Success stories
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {BUSINESS_SUCCESS_STORIES.map((story) => (
              <blockquote
                key={story.name}
                className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm"
              >
                <p className="text-sm leading-relaxed text-stone-600">“{story.quote}”</p>
                <footer className="mt-4">
                  <cite className="not-italic font-montserrat text-sm font-bold text-stone-900">
                    {story.name}
                  </cite>
                  <p className="text-xs text-stone-500">{story.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <ApplyCta />
          </div>
        </div>
      </section>

      {/* 7. WHO FOR / NOT FOR */}
      <section className="bg-white px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-montserrat text-3xl font-black sm:text-4xl">
            Who this is for
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/50 p-6">
              <h3 className="flex items-center gap-2 font-montserrat text-lg font-bold text-emerald-900">
                <Check className="h-5 w-5" aria-hidden />
                This is for you if
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-stone-700">
                {[
                  "You’re in Chicago and want real business skills and experience.",
                  "You’re hungry, coachable, and willing to do unsexy work to learn.",
                  "You’re interested in startups, small business, marketing, or operations.",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-[#FAF8F6] p-6">
              <h3 className="flex items-center gap-2 font-montserrat text-lg font-bold text-stone-800">
                <X className="h-5 w-5 text-[#FF3366]" aria-hidden />
                This is not for you if
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-stone-600">
                {[
                  "You just want a certificate without doing work.",
                  "You can’t show up on Sunday nights consistently.",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FF3366]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <ApplyCta />
          </div>
        </div>
      </section>

      {/* 8. APPLICATION PROCESS */}
      <section className="border-y border-stone-200/80 bg-[#FAF8F6] px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-montserrat text-3xl font-black sm:text-4xl">
            How to join
          </h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm lg:col-span-1"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF3366] text-sm font-black text-white">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-montserrat text-sm font-bold">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-stone-600">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex justify-center">
            <ApplyCta />
          </div>
        </div>
      </section>

      {/* 9. BONUSES */}
      <section className="bg-white px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-montserrat text-3xl font-black sm:text-4xl">
            Included bonuses
          </h2>
          <ul className="mx-auto mt-8 max-w-xl space-y-3">
            {BONUSES.map((item, i) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-[#FF3366]/15 bg-[#FFF5F7] px-5 py-4"
              >
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#FF3366] text-xs font-black text-white">
                  {i + 1}
                </span>
                <span className="font-semibold text-stone-900">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-center">
            <ApplyCta />
          </div>
        </div>
      </section>

      {/* Investment (preserved, below conversion path) */}
      <section className="border-t border-stone-200/80 bg-[#FAF8F6] px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B1538]">Investment</p>
          <p className="mt-3 font-montserrat text-5xl font-black text-[#FF3366]">${DEPOSIT}</p>
          <p className="mt-2 text-lg font-medium text-stone-700">Refundable deposit</p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-stone-600">
            A commitment device, not tuition. Complete the program and Studio E returns your full
            deposit. Drop out and you forfeit it—so the room stays full of serious talent.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-montserrat text-3xl font-black">FAQ</h2>
          <div className="mt-8 space-y-2">
            {faqs.map((faq, index) => {
              const open = expandedFaq === index
              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-stone-200/80 bg-[#FAF8F6]"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366]"
                    aria-expanded={open}
                  >
                    <span className="font-montserrat text-sm font-bold sm:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-stone-400 transition ${open ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  {open ? (
                    <p className="border-t border-stone-200/80 px-5 pb-4 pt-3 text-sm leading-relaxed text-stone-600">
                      {faq.answer}
                    </p>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA + FORM */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#8B1538] to-[#9933CC] px-5 py-14 text-white sm:px-8 sm:py-16">
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Spots are limited
          </p>
          <h2 className="mt-3 font-montserrat text-3xl font-black sm:text-4xl">
            Ready to build with a real business?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/90">
            Apply now. Start with the free workshop if you haven’t reserved yet.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <ApplyCta light />
            <Link
              href="/business-workshop"
              className="text-sm font-semibold text-white/85 underline-offset-2 hover:underline"
            >
              Or reserve the free workshop first →
            </Link>
          </div>
        </div>
      </section>

      <section id="apply" className="scroll-mt-20 bg-white px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h2 className="font-montserrat text-2xl font-black sm:text-3xl">
              Apply for Career Accelerator
            </h2>
            <p className="mt-2 text-stone-600">
              Tell us about your background and goals. We invite a small group each cohort.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-[#FAF8F6] p-2 shadow-sm md:p-4">
            <iframe
              src={FORM_URL}
              id={FORM_IFRAME_ID}
              data-layout='{"id":"INLINE"}'
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Career Accelerator Application"
              data-height="700"
              data-layout-iframe-id={FORM_IFRAME_ID}
              data-form-id={FORM_ID}
              title="Career Accelerator Application"
              className="w-full border-none"
              style={{ minHeight: "700px", width: "100%" }}
            />
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 p-3 backdrop-blur-md sm:hidden">
        <ApplyCta />
      </div>
    </div>
  )
}
