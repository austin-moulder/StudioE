"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Gift, MapPin, Sparkles, Star, TrendingUp, Users } from "lucide-react"
import { getFeaturedTestimonials } from "@/lib/testimonials/testimonialUtils"
import type { Testimonial } from "@/types/testimonial"
import useEmblaCarousel from "embla-carousel-react"

const FORM_EMBED_SRC = "https://api.leadconnectorhq.com/widget/form/6rUgcYqFQzF6zuK1DMAg"
const FORM_ID = "6rUgcYqFQzF6zuK1DMAg"
const FORM_IFRAME_ID = `inline-${FORM_ID}`

/** Sept 11, 2026 11:59:59 PM America/Chicago (CDT, UTC-5) */
const GIVEAWAY_DEADLINE_MS = Date.parse("2026-09-12T04:59:59.999Z")

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
  iframe.style.webkitOverflowScrolling = "touch"
}

const disclaimers = [
  "Open to Chicago residents only. You must provide a valid Chicago-area address to be eligible.",
  "No purchase necessary to enter or win.",
  "One official entry per person. Submitting this form more than once counts as a duplicate entry and may disqualify you—this is different from bonus entries earned through Instagram tagging (see How to increase your chances above).",
  "Must be 18 years or older to enter.",
  "If you tag multiple friends on Instagram, each valid tag may count as one bonus entry, up to 5 bonus entries total. Bonus entries do not replace your required form submission.",
  "If you tag multiple friends in the form or on social, the winner may only select one friend to share the prize with.",
  "Tagged friends are not entered automatically—each friend must complete this form separately to be eligible.",
  "By entering, you agree to receive marketing communications from Studio E (email and SMS where applicable). You may unsubscribe at any time.",
  "Prize: 12 months of unlimited group classes at Studio E, 2657 W Division St, Humboldt Park, subject to class schedule and studio policies.",
  "Prize is non-transferable and has no cash value. Studio E instructors, staff, and immediate family members are not eligible.",
  "Winner will be selected after the entry period closes and notified by the contact information provided. Failure to respond within 7 days may result in forfeiture.",
  "Studio E reserves the right to modify, suspend, or cancel the giveaway if necessary. This promotion is not sponsored by Instagram, Facebook, or Meta.",
]

function useCountdown(deadlineMs: number) {
  const [remaining, setRemaining] = useState(() => Math.max(0, deadlineMs - Date.now()))

  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, deadlineMs - Date.now()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [deadlineMs])

  const totalSeconds = Math.floor(remaining / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { remaining, days, hours, minutes, seconds, ended: remaining <= 0 }
}

export default function GiveawayClient() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [testimonialsLoading, setTestimonialsLoading] = useState(true)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const { days, hours, minutes, seconds, ended } = useCountdown(GIVEAWAY_DEADLINE_MS)

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()))
  }, [emblaApi])

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const featured = await getFeaturedTestimonials(6)
        setTestimonials(featured)
      } catch (error) {
        console.error("Error loading testimonials:", error)
      } finally {
        setTestimonialsLoading(false)
      }
    }
    loadTestimonials()
  }, [])

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

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#FF7A5A]/95 via-[#FF3366]/95 to-[#9933CC]/95" />
        <div className="container relative z-10 px-4 py-12 md:py-16">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white"
          >
            ← Back to Studio E
          </Link>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              <Gift className="h-5 w-5" aria-hidden />
              Limited-time giveaway
            </div>
            <h1 className="text-3xl font-black leading-tight text-white md:text-5xl">
              Year of Dance Giveaway
            </h1>
            <p className="mt-4 text-xl font-light text-white/95 md:text-2xl">
              Win <span className="font-bold">12 months of unlimited classes</span> at Studio E
            </p>
            <p className="mt-3 flex items-center justify-center gap-2 text-white/85">
              <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden />
              2657 W Division St · Humboldt Park, Chicago
            </p>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="border-b border-gray-100 bg-gray-50 py-10">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-[#FF3366]">
            <Clock className="h-5 w-5" aria-hidden />
            <span className="text-sm font-bold uppercase tracking-wide">
              {ended ? "Entries closed" : "Entries close September 11 at 11:59 PM"}
            </span>
          </div>
          {ended ? (
            <p className="text-lg text-gray-600">
              Thank you for entering. The winner will be notified soon.
            </p>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {[
                { label: "Days", value: days },
                { label: "Hours", value: hours },
                { label: "Min", value: minutes },
                { label: "Sec", value: seconds },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="min-w-[4.5rem] rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
                >
                  <div className="font-montserrat text-3xl font-black tabular-nums text-[#FF3366] md:text-4xl">
                    {pad(unit.value)}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Prize + form */}
      <section id="enter" className="scroll-mt-20 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-[#FF3366]/20 bg-[#FF3366]/5 p-5">
            <Sparkles className="mt-0.5 h-6 w-6 flex-shrink-0 text-[#FF3366]" aria-hidden />
            <div>
              <h2 className="font-bold text-gray-900">Grand prize</h2>
              <p className="mt-1 text-gray-700 leading-relaxed">
                One winner receives a full year of unlimited group classes at Studio E—dance as much
                as you want, build real skill, and join one of Chicago&apos;s warmest Latin dance
                communities.
              </p>
            </div>
          </div>

          <p className="mb-6 text-center text-gray-600">
            Complete the form below to enter. After submitting, scroll down to see how to earn
            bonus entries.
          </p>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
            <iframe
              src={FORM_EMBED_SRC}
              id={FORM_IFRAME_ID}
              title="Year of Dance Giveaway Entry"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-activation-type="alwaysActivated"
              data-deactivation-type="neverDeactivate"
              data-form-name="Year-of-Dance-Giveaway"
              data-layout-iframe-id={FORM_IFRAME_ID}
              data-form-id={FORM_ID}
              className="block w-full min-h-[520px] border-0"
              style={{ width: "100%", height: "100%", border: "none", borderRadius: "8px" }}
            />
            <Script
              src="https://link.msgsndr.com/js/form_embed.js"
              strategy="afterInteractive"
              onLoad={initFormEmbed}
            />
          </div>

          {/* Bonus entries */}
          <div className="mt-10 rounded-2xl border border-[#9933CC]/25 bg-gradient-to-br from-[#9933CC]/5 to-[#FF3366]/5 p-6 md:p-8">
            <div className="mb-5 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-[#9933CC]" aria-hidden />
              <h2 className="text-xl font-black text-gray-900 md:text-2xl">
                How to increase your chances
              </h2>
            </div>
            <p className="mb-6 text-sm text-gray-600 leading-relaxed">
              Already submitted? Great. These bonus actions stack extra entries on top—they do{" "}
              <span className="font-semibold text-gray-800">not</span> mean filling out the form
              again.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 rounded-xl border border-white/80 bg-white/80 p-4 shadow-sm">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#FF3366] text-sm font-black text-white">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Get chosen by a friend who wins</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    If someone you know wins, they can select you to share the prize—effectively
                    doubling your chances of walking away with a year of unlimited classes.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl border border-white/80 bg-white/80 p-4 shadow-sm">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#9933CC] text-sm font-black text-white">
                  2
                </div>
                <div>
                  <h3 className="flex items-center gap-2 font-bold text-gray-900">
                    <Users className="h-4 w-4 text-[#9933CC]" aria-hidden />
                    Tag friends on our Instagram post
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    Each friend you tag on the official Studio E giveaway post counts as one{" "}
                    <span className="font-semibold text-gray-800">bonus entry</span>—up to{" "}
                    <span className="font-semibold text-gray-800">5 additional entries</span>.
                    Tagging is separate from submitting this form; your friend still needs to enter
                    here to be eligible.
                  </p>
                  <a
                    href="https://www.instagram.com/the_studio_e/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-[#FF3366] hover:underline"
                  >
                    @the_studio_e on Instagram →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimers */}
          <div className="mt-10 rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-500">
              Official rules & disclaimers
            </h3>
            <ul className="space-y-2.5 text-xs leading-relaxed text-gray-600">
              {disclaimers.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 1,000+ students */}
      <section className="border-y border-gray-100 py-14 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-black text-gray-900 md:text-3xl">
            We&apos;ve helped{" "}
            <span className="text-[#FF3366]">1,000+</span> students across the nation learn social
            dancing
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Studio E is Chicago&apos;s street-style, community-first Latin dance home—where beginners
            become confident social dancers without memorizing combos.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-center text-2xl font-black text-gray-900 md:text-3xl">
            What the community is saying
          </h2>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonialsLoading ? (
                <div className="min-w-0 flex-[0_0_100%] py-12 text-center">
                  <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[#FF3366]" />
                  <p className="mt-4 text-gray-600">Loading testimonials...</p>
                </div>
              ) : (
                testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="min-w-0 flex-[0_0_100%] px-2">
                    <Card className="h-full">
                      <CardContent className="p-8 text-center">
                        <div className="mb-6 flex justify-center">
                          {testimonial.image_url && testimonial.image_url !== "/placeholder.svg" ? (
                            <Image
                              src={testimonial.image_url}
                              alt={testimonial.name}
                              width={80}
                              height={80}
                              className="rounded-full object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#FF3366] to-[#9933CC] text-2xl font-bold text-white">
                              {testimonial.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="mb-4 text-sm font-medium text-[#FF3366]">
                          {testimonial.style} Student
                        </p>
                        <p className="mb-6 text-lg font-medium leading-relaxed text-gray-800">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                        <div className="flex justify-center space-x-1">
                          {[...Array(testimonial.rating || 5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))
              )}
            </div>
          </div>
          {!testimonialsLoading && testimonials.length > 0 && (
            <div className="mt-6 flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-3 w-3 rounded-full transition-colors ${
                    index === selectedIndex ? "bg-[#FF3366]" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Head start CTAs */}
      <section className="bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] py-14 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 text-center text-white">
          <h2 className="text-2xl font-black md:text-4xl">Don&apos;t wait for the drawing</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg font-light text-white/90">
            Get a head start on your dance journey today. You don&apos;t have to wait for the
            giveaway to start moving.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Link
              href="/free-gift"
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-bold text-[#FF3366] shadow-lg transition hover:bg-white/95"
            >
              Get the free starter guide
            </Link>
            <Link
              href="/founder-deal"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Claim your first class free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
