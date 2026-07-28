"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Briefcase,
  Check,
  ChevronDown,
  Clock,
  MapPin,
  Rocket,
  ShieldCheck,
  Target,
  Users,
  X,
} from "lucide-react"

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
]

const steps = [
  {
    title: "Apply",
    body: "Click “Apply for Career Accelerator” and complete the short application—including your background and goals.",
  },
  {
    title: "Selection",
    body: "We review applications and invite a small group of serious, high-potential candidates. Spots are limited.",
  },
  {
    title: "Train Weekly",
    body: "Come to Studio E on Sundays, 7:30 – 9:00 PM for 8 weeks, and complete small implementation projects between sessions.",
  },
  {
    title: "Placement Opportunities",
    body: "Top performers will be considered for roles or contract work inside Studio E’s marketing, ops, or sales functions as opportunities arise.",
  },
]

const outcomes = [
  "A clear understanding of how a real small business runs behind the scenes.",
  "Concrete skills in marketing, operations, sales, customer success, and recruiting.",
  "Tangible projects you helped with at Studio E.",
  "A shot at being placed in real business functions at Studio E if you’re a strong fit.",
]

const faqs = [
  {
    question: "Is there a cost to join?",
    answer:
      "Yes—a $249 refundable deposit. It’s a commitment device, not a tuition fee. If you complete the Career Accelerator, Studio E returns your full deposit.",
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

function ApplyButton({
  className = "",
  variant = "primary",
}: {
  className?: string
  variant?: "primary" | "outline"
}) {
  const base =
    variant === "primary"
      ? "bg-[#FF3366] text-white hover:bg-[#E02D5A] shadow-lg shadow-[#FF3366]/25"
      : "border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#1a1a2e]"

  return (
    <a
      href="#apply"
      className={`inline-flex items-center justify-center rounded-xl font-bold px-8 py-4 text-base md:text-lg transition-all duration-300 ${base} ${className}`}
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
    const maxAttempts = 50

    const tryInit = () => {
      attempts += 1
      if (initFormEmbed()) {
        clearInterval(interval)
        return
      }
      if (attempts >= maxAttempts) {
        enableFormEmbedScrollFallback()
        clearInterval(interval)
      }
    }

    tryInit()
    const interval = setInterval(tryInit, 200)
    const onResize = () => initFormEmbed()
    window.addEventListener("resize", onResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#FAF8F6] text-stone-900">
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />

      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#8B1538] to-[#9933CC]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,122,90,0.28),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,51,102,0.2),_transparent_50%)]" />
        <div className="absolute inset-0 bg-black/25" />

        <div className="container relative z-10 px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-sm md:text-sm">
              <Rocket className="h-4 w-4 text-[#FF7A5A]" aria-hidden />
              8-week career accelerator · Limited spots
            </div>

            <h1 className="font-montserrat text-3xl font-black leading-tight drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
              Career Accelerator
              <span className="mt-3 block text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                8 Weeks at Studio E
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/95 sm:text-lg md:text-xl">
              Learn real marketing, operations, sales, and recruiting skills in a live, hands-on
              environment. Apply what you learn inside a fast-growing Chicago business and position
              yourself for real opportunities.
            </p>

            <p className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-white/85 md:text-base">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#FF7A5A]" aria-hidden />
                Sundays · 7:30 – 9:00 PM
              </span>
              <span className="hidden sm:inline text-white/40">·</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#FF7A5A]" aria-hidden />
                Studio E HQ – 2657 W Division St, Humboldt Park
              </span>
            </p>

            <div className="mt-10">
              <ApplyButton />
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
          <ChevronDown className="h-7 w-7" aria-hidden />
        </div>
      </section>

      {/* WHAT IS CAREER ACCELERATOR */}
      <section className="border-b border-stone-200/80 bg-white px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B1538]">
              What is the Career Accelerator
            </p>
            <h2 className="mt-3 font-montserrat text-3xl font-black text-stone-900 md:text-4xl">
              Real skills. Live projects. Real opportunities.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-stone-600">
              The Career Accelerator is Studio E’s 8-week, small-cohort bootcamp for people who
              want real-world business skills—not just theory.
            </p>
          </div>

          <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
            {[
              "Learn core skills in marketing, operations, talent, sales, customer success, entrepreneurship, and recruiting.",
              "Apply them directly to Studio E’s live offers, funnels, and internal projects.",
              "Build a portfolio of work and results you can talk about in interviews.",
              "Be considered for placement in Studio E’s business functions if you’re a strong fit.",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl bg-[#FAF8F6] px-4 py-4 text-left text-stone-800"
              >
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#FF3366]/15 text-[#FF3366]">
                  <Check className="h-4 w-4" aria-hidden />
                </span>
                <span className="font-medium leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHAT YOU’LL LEARN */}
      <section className="bg-[#FAF8F6] px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B1538]">
              What you’ll learn
            </p>
            <h2 className="mt-3 font-montserrat text-3xl font-black text-stone-900 md:text-4xl">
              8 weeks. Zero fluff.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
              Each Sunday builds on the last—marketing through recruiting—with implementation work
              between sessions.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {weeks.map((week, index) => {
              const open = expandedWeek === index
              return (
                <Card key={week.week} className="border border-stone-200/80 bg-white shadow-none">
                  <CardContent className="p-0">
                    <button
                      type="button"
                      onClick={() => setExpandedWeek(open ? null : index)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-stone-50 md:p-6"
                      aria-expanded={open}
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#FF3366] font-montserrat text-sm font-black text-white">
                          W{week.week}
                        </span>
                        <h3 className="text-base font-bold text-stone-900 md:text-lg">
                          {week.title}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 flex-shrink-0 text-stone-500 transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      />
                    </button>
                    {open && (
                      <ul className="space-y-2 border-t border-stone-100 px-5 pb-5 pt-4 md:px-6 md:pb-6 md:pl-[4.5rem]">
                        {week.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2 text-stone-600">
                            <Check
                              className="mt-1 h-4 w-4 flex-shrink-0 text-[#FF3366]"
                              aria-hidden
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B1538]">
              How it works
            </p>
            <h2 className="mt-3 font-montserrat text-3xl font-black text-stone-900 md:text-4xl">
              From application to opportunity
            </h2>
          </div>

          <ol className="mt-12 space-y-6">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#FF3366] font-montserrat text-xl font-black text-white shadow-md shadow-[#FF3366]/30">
                  {index + 1}
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold text-stone-900">{step.title}</h3>
                  <p className="mt-1 leading-relaxed text-stone-600">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 text-center">
            <ApplyButton />
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="bg-[#FAF8F6] px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B1538]">
              Who this is for
            </p>
            <h2 className="mt-3 font-montserrat text-3xl font-black text-stone-900 md:text-4xl">
              Built for hungry, coachable talent
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200/60 bg-white p-6 md:p-8">
              <h3 className="flex items-center gap-2 text-lg font-bold text-emerald-800">
                <Check className="h-5 w-5" aria-hidden />
                This is for you if:
              </h3>
              <ul className="mt-5 space-y-3">
                {[
                  "You’re in Chicago and want a real shot at business skills and experience.",
                  "You’re hungry, coachable, and willing to do unsexy work to learn.",
                  "You’re interested in startups, small business, marketing, or operations.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-stone-700">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-600" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 md:p-8">
              <h3 className="flex items-center gap-2 text-lg font-bold text-stone-700">
                <X className="h-5 w-5 text-[#FF3366]" aria-hidden />
                This is NOT for you if:
              </h3>
              <ul className="mt-5 space-y-3">
                {[
                  "You just want a certificate without doing work.",
                  "You can’t show up on Sunday nights consistently.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-stone-600">
                    <X className="mt-1 h-4 w-4 flex-shrink-0 text-[#FF3366]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES & OPPORTUNITIES */}
      <section className="bg-white px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B1538]">
              Outcomes &amp; opportunities
            </p>
            <h2 className="mt-3 font-montserrat text-3xl font-black text-stone-900 md:text-4xl">
              What you walk away with
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {outcomes.map((item, index) => {
              const icons = [Target, Briefcase, Rocket, Users]
              const Icon = icons[index] ?? Target
              return (
                <Card key={item} className="border-none bg-[#FAF8F6] shadow-sm">
                  <CardContent className="flex items-start gap-4 p-6">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[#FF3366]/10">
                      <Icon className="h-5 w-5 text-[#FF3366]" aria-hidden />
                    </span>
                    <p className="pt-1 font-medium leading-snug text-stone-800">{item}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* INVESTMENT & COMMITMENT */}
      <section className="bg-[#FAF8F6] px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B1538]">
              Investment &amp; commitment
            </p>
            <h2 className="mt-3 font-montserrat text-3xl font-black text-stone-900 md:text-4xl">
              A refundable deposit that filters for serious applicants
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
              This is a talent pipeline, not a profit center. The deposit creates real stakes and
              keeps the cohort full of people who show up.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[#FF3366]/20 bg-gradient-to-br from-[#FFF5F7] to-white shadow-sm">
            <div className="border-b border-[#FF3366]/15 bg-[#FF3366]/5 px-6 py-8 text-center md:px-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#8B1538]">
                Investment
              </p>
              <p className="mt-2 font-montserrat text-5xl font-black text-[#FF3366] md:text-6xl">
                $249
              </p>
              <p className="mt-2 text-lg font-medium text-stone-700">Refundable deposit</p>
            </div>

            <div className="space-y-6 px-6 py-8 md:px-10">
              <div>
                <h3 className="flex items-center gap-2 font-bold text-stone-900">
                  <ShieldCheck className="h-5 w-5 text-[#FF3366]" aria-hidden />
                  How it works
                </h3>
                <ul className="mt-4 space-y-3">
                  {[
                    "Pay a $249 deposit to secure your spot in the Career Accelerator.",
                    "Show up, do the work, and complete the 8-week program.",
                    "Complete the program and Studio E returns your full $249 deposit.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-stone-700">
                      <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[#FF3366]" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-emerald-50 px-5 py-4 text-stone-800">
                <p className="font-semibold text-emerald-900">Get your deposit back</p>
                <p className="mt-1 text-sm leading-relaxed text-emerald-900/90 md:text-base">
                  If you complete the Career Accelerator, Studio E returns your full $249
                  deposit—this is a commitment device, not tuition.
                </p>
              </div>

              <div className="rounded-xl bg-stone-100 px-5 py-4 text-stone-700">
                <p className="font-semibold text-stone-900">If you don’t finish</p>
                <p className="mt-1 text-sm leading-relaxed md:text-base">
                  If you drop out or don’t complete the program, you forfeit the deposit. That keeps
                  the room full of serious, committed talent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="bg-white px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B1538]">FAQs</p>
            <h2 className="mt-3 font-montserrat text-3xl font-black text-stone-900 md:text-4xl">
              Common questions
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const open = expandedFaq === index
              return (
                <Card key={faq.question} className="border border-stone-200/80 bg-white shadow-none">
                  <CardContent className="p-0">
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(open ? null : index)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-stone-50 md:p-6"
                      aria-expanded={open}
                    >
                      <h3 className="pr-2 text-base font-semibold text-stone-900 md:text-lg">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`h-5 w-5 flex-shrink-0 text-stone-500 transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      />
                    </button>
                    {open && (
                      <div className="border-t border-stone-100 px-5 pb-5 pt-4 md:px-6 md:pb-6">
                        <p className="leading-relaxed text-stone-600">{faq.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#8B1538] to-[#9933CC] px-4 py-16 text-white md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,122,90,0.2),_transparent_50%)]" />
        <div className="container relative z-10 mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
            Spots are limited
          </div>
          <h2 className="font-montserrat text-3xl font-black md:text-5xl">
            Ready To Build Real-World Skills And Opportunities?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90 md:text-xl">
            If you’re serious about leveling up and working inside a real business, apply now.
          </p>
          <div className="mt-8">
            <ApplyButton variant="outline" />
          </div>
        </div>
      </section>

      <section id="apply" className="scroll-mt-24 bg-white px-4 py-14 md:py-16">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h2 className="font-montserrat text-2xl font-black text-stone-900 md:text-3xl">
              Apply for Career Accelerator
            </h2>
            <p className="mt-2 text-stone-600">
              Tell us about your background and goals. We invite a small group of high-potential
              candidates each cohort.
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
    </div>
  )
}
