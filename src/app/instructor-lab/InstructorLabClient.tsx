"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  Clock,
  GraduationCap,
  MapPin,
  Music2,
  Phone,
  ShieldCheck,
  Users,
  X,
} from "lucide-react"

const FORM_URL = "https://api.leadconnectorhq.com/widget/form/GxAgj06fJQPDRveEtOwz"
const FORM_ID = "GxAgj06fJQPDRveEtOwz"
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

const danceStyles = [
  {
    title: "Salsa On 1",
    fundamentals: "6 Fundamentals",
    detail: "Studio E method — the core building blocks of On 1 salsa teaching.",
  },
  {
    title: "Salsa On 2",
    fundamentals: "6 Fundamentals",
    detail: "Timing, musicality, and feel — the same 6 fundamentals, On 2 timing.",
  },
  {
    title: "Bachata",
    fundamentals: "5 Fundamentals",
    detail: "Social dance focus built on Studio E’s 5 Bachata fundamentals.",
  },
  {
    title: "Cumbia",
    fundamentals: "4 Fundamentals",
    detail:
      "Master the 4 Cumbia fundamentals and regional variations like sonidera, texana, guaracha, and wepa.",
  },
]

const skillItems = [
  { title: "Teaching Presence", detail: "Voice, pacing, classroom control" },
  { title: "Sales", detail: "How to enroll, retain, and re-enroll students" },
  { title: "Marketing & Content", detail: "Attract students with social media" },
]

const steps = [
  {
    title: "Apply",
    body: "Click “Apply for LDIC” and complete the short form, including your availability.",
  },
  {
    title: "10-Minute Phone Interview",
    body: "We’ll hop on a brief call to learn about you, confirm fit, and lock your cohort details.",
  },
  {
    title: "Train for 8 Weeks — Then Certify & Join",
    body: "The 8-week LDIC Program is the interview. Attend weekly sessions, complete demo teaching hours, and earn the Studio E Latin Dance Instructor Certification. Successful participants join the paid instructor team.",
  },
]

const faqs = [
  {
    question: "When exactly does it start?",
    answer:
      "The upcoming cohort is planned for Sunday evenings, 6:00 – 7:30 PM at Studio E (2657 W Division St). We’ll confirm the final schedule based on accepted applicants’ availability.",
  },
  {
    question: "Do I need to know how to dance salsa, bachata, or cumbia to participate?",
    answer:
      "No. We welcome dancers trained in other genres—ballroom, hip hop, contemporary, and more. The learning pace is fast, so previous dance experience of any kind will help you keep up. We’ll train you on the Studio E Latin method.",
  },
  {
    question: "Do I need prior teaching experience?",
    answer:
      "No. You need solid dance experience and a real desire to lead and teach. We’ll train you on the Studio E method.",
  },
  {
    question: "Is this a paid job?",
    answer:
      "The 8-week LDIC Program is a paid-in (deposit) training and evaluation period — the interview process itself. Successful participants are invited to join Studio E as paid instructors after completing the program and certification.",
  },
  {
    question: "Can I teach at other studios using this method?",
    answer:
      "No. By joining the LDIC Program, you agree not to use Studio E’s proprietary curriculum at any other studio or program.",
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
      : "border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#8B1538]"

  return (
    <a
      href="#apply"
      className={`inline-flex items-center justify-center rounded-xl font-bold px-8 py-4 text-base md:text-lg transition-all duration-300 ${base} ${className}`}
    >
      Apply for LDIC
      <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
    </a>
  )
}

export default function InstructorLabClient() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)

  useEffect(() => {
    let attempts = 0
    const maxAttempts = 50
    let interval: ReturnType<typeof setInterval> | null = null

    const tryInit = () => {
      attempts += 1
      if (initFormEmbed()) {
        if (interval) clearInterval(interval)
        return
      }
      if (attempts >= maxAttempts) {
        enableFormEmbedScrollFallback()
        if (interval) clearInterval(interval)
      }
    }

    interval = setInterval(tryInit, 200)
    tryInit()
    const onResize = () => initFormEmbed()
    window.addEventListener("resize", onResize)

    return () => {
      if (interval) clearInterval(interval)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#FAF8F6] text-stone-900">
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />

      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat scale-105"
          style={{
            backgroundImage:
              "url(https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/DSC05892.jpg)",
            backgroundPosition: "center 40%",
          }}
        />
        {/* Dark overlay for white-text contrast */}
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#5C0A1F]/55 via-[#8B1538]/40 to-black/50" />

        <div className="container relative z-10 px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/25 bg-black/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-sm md:text-sm">
              <Clock className="h-4 w-4 text-[#FF7A5A]" aria-hidden />
              Upcoming cohort · Limited spots
            </div>

            <h1 className="font-montserrat text-3xl font-black leading-tight drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
              Studio E LDIC
              <span className="mt-3 block text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                Latin Dance Instructor Certification Program
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/95 sm:text-lg md:text-xl drop-shadow-md">
              Turn your love for Salsa, Bachata, and Cumbia into a leadership role at the fastest
              growing Latin dance studio in Chicago. Train with us, teach our students, and earn
              your spot on the Studio E instructor team.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4">
              <ApplyButton />
              <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-white/85">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#FF7A5A]" aria-hidden />
                  Humboldt Park, Chicago
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-[#FF7A5A]" aria-hidden />
                  Small cohort
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-[#FF7A5A]" aria-hidden />
                  Studio E Certification
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
          <ChevronDown className="h-7 w-7" aria-hidden />
        </div>
      </section>

      {/* WHAT IS LDIC */}
      <section className="border-b border-stone-200/80 bg-white px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B1538]">
              What is the LDIC Program
            </p>
            <h2 className="mt-3 font-montserrat text-3xl font-black text-stone-900 md:text-4xl">
              8 weeks of training at Chicago&apos;s top social dance instructor lab
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-stone-600">
              The LDIC Program (Latin Dance Instructor Certification) is Studio E’s 8-week,
              small-cohort training for aspiring dance teachers. Over those weeks you:
            </p>
          </div>

          <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
            {[
              "Learn Studio E’s proprietary teaching method",
              "Practice with real Studio E students",
              "Earn the official Studio E Latin Dance Instructor Certification",
              "Get the chance to join our paid instructor team",
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

          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-stone-200 bg-[#FAF8F6] p-5">
              <div className="flex items-center gap-2 text-[#8B1538]">
                <MapPin className="h-5 w-5" aria-hidden />
                <h3 className="font-bold">Location</h3>
              </div>
              <p className="mt-2 text-stone-700">
                Studio E Headquarters — 2657 W Division St, Humboldt Park, Chicago
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-[#FAF8F6] p-5">
              <div className="flex items-center gap-2 text-[#8B1538]">
                <Clock className="h-5 w-5" aria-hidden />
                <h3 className="font-bold">Tentative time</h3>
              </div>
              <p className="mt-2 text-stone-700">
                Sundays, 6:00 – 7:30 PM (final time confirmed based on accepted applicants’
                availability)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU’LL LEARN */}
      <section className="bg-[#FAF8F6] px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B1538]">
              What you’ll learn
            </p>
            <h2 className="mt-3 font-montserrat text-3xl font-black text-stone-900 md:text-4xl">
              Master the fundamentals — then teach them
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
              Over 8 weeks, you’ll get crash courses and hands-on practice in Studio E’s
              proprietary fundamentals for each style.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {danceStyles.map((item) => (
              <Card key={item.title} className="border-none bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#FF3366]/10">
                      <Music2 className="h-5 w-5 text-[#FF3366]" aria-hidden />
                    </div>
                    <span className="rounded-md bg-[#8B1538] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      {item.fundamentals}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-stone-900">{item.title}</h3>
                  <p className="mt-2 text-stone-600 leading-relaxed">{item.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {skillItems.map((item) => (
              <Card key={item.title} className="border-none bg-white shadow-sm">
                <CardContent className="p-5">
                  <h3 className="font-bold text-stone-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-stone-600">{item.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#8B1538] to-[#9933CC] p-6 text-center text-white md:p-8">
            <GraduationCap className="mx-auto h-8 w-8 text-[#FF7A5A]" aria-hidden />
            <p className="mt-3 text-lg font-semibold md:text-xl">
              Plus: Demo hours where you teach Studio E students under supervision
            </p>
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
              Three steps to the instructor team
            </h2>
          </div>

          <ol className="mt-12 space-y-6">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#FF3366] font-montserrat text-xl font-black text-white shadow-md shadow-[#FF3366]/30">
                  {index + 1}
                </div>
                <div className="pt-1">
                  <h3 className="flex flex-wrap items-center gap-2 text-xl font-bold text-stone-900">
                    {step.title}
                    {index === 1 && (
                      <Phone className="h-4 w-4 text-[#FF3366]" aria-hidden />
                    )}
                  </h3>
                  <p className="mt-1 text-stone-600 leading-relaxed">{step.body}</p>
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
              Built for serious future instructors
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200/60 bg-white p-6 md:p-8">
              <h3 className="flex items-center gap-2 text-lg font-bold text-emerald-800">
                <Check className="h-5 w-5" aria-hidden />
                The LDIC Program is for you if:
              </h3>
              <ul className="mt-5 space-y-3">
                {[
                  "You have dance experience (Latin social, ballroom, hip hop, contemporary, or similar) and want to teach.",
                  "You’re open to learning Studio E’s Latin method at a fast pace.",
                  "You care about the Puerto Rican and broader Latin community in Chicago.",
                  "You’re ready to show up, be coached, and lead from the front.",
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
                Not for you if:
              </h3>
              <ul className="mt-5 space-y-3">
                {[
                  "You just want more classes with no responsibility.",
                  "You can’t commit to showing up almost every week.",
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

      {/* INVESTMENT & COMMITMENT */}
      <section className="bg-white px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B1538]">
              Investment &amp; commitment
            </p>
            <h2 className="mt-3 font-montserrat text-3xl font-black text-stone-900 md:text-4xl">
              A refundable deposit that filters for serious applicants
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
              To create real stakes—and keep flaky applicants out—the LDIC Program requires a
              refundable deposit.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[#FF3366]/20 bg-gradient-to-br from-[#FFF5F7] to-white shadow-sm">
            <div className="border-b border-[#FF3366]/15 bg-[#FF3366]/5 px-6 py-8 text-center md:px-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#8B1538]">
                Investment
              </p>
              <p className="mt-3 font-montserrat text-2xl font-bold text-stone-400 line-through md:text-3xl">
                $2,499
              </p>
              <p className="mt-1 font-montserrat text-5xl font-black text-[#FF3366] md:text-6xl">
                $249
              </p>
              <p className="mt-2 text-lg font-medium text-stone-700">Refundable deposit</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-600">
                Each lab session is typically a $500 28-day challenge we run for our students—$2,499
                in training value. Your commitment is a $249 refundable deposit.
              </p>
            </div>

            <div className="space-y-6 px-6 py-8 md:px-10">
              <div>
                <h3 className="flex items-center gap-2 font-bold text-stone-900">
                  <ShieldCheck className="h-5 w-5 text-[#FF3366]" aria-hidden />
                  How it works
                </h3>
                <ul className="mt-4 space-y-3">
                  {[
                    "Attend at least 7 of the 8 sessions (no more than 1 absence).",
                    "Respect and use ONLY Studio E’s proprietary curriculum at Studio E (you agree not to use this method at any other studio or program).",
                    "Complete your demo hours and pursue the instructor route with Studio E.",
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
                  If you complete the program, meet the attendance requirement, and are brought on
                  as an instructor, Studio E returns your full $249 deposit (e.g., via your pay once
                  you start teaching).
                </p>
              </div>

              <div className="rounded-xl bg-stone-100 px-5 py-4 text-stone-700">
                <p className="font-semibold text-stone-900">If you don’t commit</p>
                <p className="mt-1 text-sm leading-relaxed md:text-base">
                  If you decide NOT to go into the instructor route, or you miss more than one
                  session, you forfeit the deposit. This keeps the room full of serious, committed
                  future instructors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="bg-[#FAF8F6] px-4 py-16 md:py-20">
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

      {/* FINAL CTA + APPLY FORM */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#5C0A1F] via-[#8B1538] to-[#9933CC] px-4 py-16 text-white md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,122,90,0.2),_transparent_50%)]" />
        <div className="container relative z-10 mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
            Spots are limited
          </div>
          <h2 className="font-montserrat text-3xl font-black md:text-5xl">
            Ready To Lead The Floor At Studio E?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90 md:text-xl">
            Spots are limited. If you’re serious about becoming a Latin dance instructor in
            Chicago, the LDIC Program is your shot.
          </p>
          <div className="mt-8">
            <ApplyButton variant="outline" />
          </div>
          <p className="mt-4 text-sm text-white/70">
            Or open the application form{" "}
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              in a new tab
            </a>
            .
          </p>
        </div>
      </section>

      <section id="apply" className="scroll-mt-24 bg-white px-4 py-14 md:py-16">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h2 className="font-montserrat text-2xl font-black text-stone-900 md:text-3xl">
              Apply for the LDIC Program
            </h2>
            <p className="mt-2 text-stone-600">
              Complete the short form below—include your availability so we can finalize the cohort
              schedule.
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
              data-form-name="LDIC Program Application"
              data-height="700"
              data-layout-iframe-id={FORM_IFRAME_ID}
              data-form-id={FORM_ID}
              title="LDIC Program Application"
              className="w-full border-none"
              style={{ minHeight: "700px", width: "100%" }}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
