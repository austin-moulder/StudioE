"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { ArrowRight, Star } from "lucide-react"
import {
  MERCH_CAROUSEL,
  MERCH_IMAGES,
  SHOPIFY_STORE,
} from "@/lib/merch/shopify"
import type { GoogleReviewsResponse } from "@/lib/google-reviews/types"

const FOUNDER_DEAL = "/founder-deal"
const CHALLENGE = "/challenge"
const SHOPIFY_HOME = SHOPIFY_STORE

const VIBES = {
  learn:
    "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/DSC05366.jpg",
  connect:
    "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/Wide_group.jpg",
  move: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/DSC05448.jpg",
  community:
    "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/DSC05837.jpg",
} as const

const EXPERIENCE = [
  {
    title: "LEARN",
    body: "Street-style Salsa, Bachata, and Latin social dance taught for the floor—not the stage.",
    image: VIBES.learn,
    alt: "Studio E class energy",
  },
  {
    title: "CONNECT",
    body: "A Chicago Latin social dance community where belonging comes before perfection.",
    image: VIBES.connect,
    alt: "Studio E community together",
  },
  {
    title: "MOVE",
    body: "Build confidence through movement and express yourself with people who get it.",
    image: VIBES.move,
    alt: "Studio E dancers on the social floor",
  },
] as const

const MERCH_SHOTS = [
  { src: MERCH_CAROUSEL[0], alt: "Studio E merch on the dance floor" },
  { src: MERCH_CAROUSEL[1], alt: "Studio E apparel in motion" },
  { src: MERCH_IMAGES.coupleOne, alt: "Studio E merch worn as a couple" },
  { src: MERCH_CAROUSEL[3], alt: "Studio E culture wear" },
  { src: MERCH_IMAGES.group, alt: "Studio E community in merch" },
  { src: MERCH_CAROUSEL[5], alt: "Studio E street-style merch" },
] as const

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Claim your first class",
    body: "Reserve your free first class and take the first step into Studio E.",
  },
  {
    step: "2",
    title: "Show up as you are",
    body: "No experience required. Come ready to move, meet people, and learn street-style Latin dance.",
  },
  {
    step: "3",
    title: "Start dancing with the Studio E community",
    body: "Find confidence, belonging, and your people on the social floor.",
  },
] as const

const ROUTING = [
  {
    title: "FIRST CLASS FREE",
    body: "Start dancing with Studio E.",
    cta: "Claim Your First Class",
    href: FOUNDER_DEAL,
  },
  {
    title: "28-DAY CHALLENGE",
    body: "The quickest way to build confidence on the dance floor.",
    cta: "Learn About the 28-Day Challenge",
    href: CHALLENGE,
  },
  {
    title: "MERCH",
    body: "Rep Studio E on and off the dance floor.",
    cta: "Shop Merch",
    href: SHOPIFY_HOME,
    external: true,
  },
] as const

const BRAND_POINTS = [
  "Learn street-style Latin dance",
  "Build confidence through movement",
  "Find your people in Chicago",
] as const

function CtaLink({
  href,
  children,
  className,
  external,
}: {
  href: string
  children: React.ReactNode
  className?: string
  external?: boolean
}) {
  const classes =
    className ??
    "inline-flex items-center justify-center rounded-2xl bg-[#FF3366] px-6 py-3.5 text-center font-montserrat text-sm font-bold uppercase tracking-wide text-white shadow-[0_10px_28px_rgba(255,51,102,0.35)] transition hover:bg-[#E02D5A]"

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-[#F5B301] text-[#F5B301]" : "text-gray-300"}`}
        />
      ))}
    </div>
  )
}

export default function StudioEHomePage({
  googleReviews,
}: {
  googleReviews: GoogleReviewsResponse
}) {
  useEffect(() => {
    if (typeof window === "undefined") return
    const currentHostname = window.location.hostname
    const isLocalhost =
      currentHostname === "localhost" || currentHostname.includes("127.0.0.1")
    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")
    const signedOut = params.get("signedout")

    if (signedOut === "true") {
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete("signedout")
      window.history.replaceState({}, "", newUrl)
    }

    if (isLocalhost && code) {
      const redirectParams = new URLSearchParams()
      redirectParams.append("code", code)
      window.location.replace(`https://www.joinstudioe.com/?${redirectParams.toString()}`)
    }
  }, [])

  return (
    <div className="bg-[#FAF7F5] text-[#1A1210] antialiased">
      {/* 1. HERO */}
      <section className="relative isolate min-h-[88vh] overflow-hidden">
        <Image
          src={MERCH_IMAGES.hero}
          alt="Studio E dancers — Latin social dance community in Chicago"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25" />
        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-5xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
            Studio E · Chicago
          </p>
          <h1 className="mt-4 max-w-3xl font-montserrat text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            Find Your Confidence Through Latin Social Dance
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90 sm:text-xl">
            The quickest and easiest way to learn to social dance
          </p>
          <div className="mt-8">
            <CtaLink href={FOUNDER_DEAL}>Claim Your First Class Free</CtaLink>
          </div>
        </div>
      </section>

      {/* 2. BRAND INTRODUCTION */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            Dance is better when you feel like you belong.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            In response to the unstructured combination-focused classes, we built a curriculum that
            guarantees results in 28 days or less, no matter where you start.
          </p>
          <ul className="mt-10 grid gap-4 text-left sm:grid-cols-3">
            {BRAND_POINTS.map((point) => (
              <li
                key={point}
                className="rounded-2xl bg-white px-5 py-6 text-center shadow-[0_8px_30px_rgba(26,18,16,0.06)]"
              >
                <p className="font-montserrat text-sm font-bold leading-snug text-[#1A1210]">
                  {point}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <CtaLink href={FOUNDER_DEAL}>Claim Your First Class Free</CtaLink>
          </div>
        </div>
      </section>

      {/* 3. THE STUDIO E EXPERIENCE */}
      <section className="bg-[#1A1210] px-5 py-16 text-white sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-[#FF3366]">
              The Studio E Experience
            </p>
            <h2 className="mt-3 font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
              Learn. Connect. Move.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {EXPERIENCE.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-2xl bg-white/5">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-montserrat text-lg font-black tracking-[0.14em] text-[#FF3366]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SOCIAL PROOF — Google 5-star reviews */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-[#FF3366]">
                Google Reviews
              </p>
              <h2 className="mt-3 font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
                Built with the people on the floor.
              </h2>
              {googleReviews.rating ? (
                <p className="mt-3 text-sm text-gray-600">
                  <span className="font-semibold text-[#1A1210]">
                    {googleReviews.rating.toFixed(1)}
                  </span>
                  {googleReviews.userRatingCount
                    ? ` · ${googleReviews.userRatingCount} Google reviews`
                    : " on Google"}
                </p>
              ) : null}
            </div>
            <a
              href={googleReviews.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF3366] hover:underline"
            >
              Read all reviews on Google
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {googleReviews.reviews.map((review) => (
              <article
                key={`${review.authorName}-${review.text.slice(0, 24)}`}
                className="flex flex-col rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(26,18,16,0.06)]"
              >
                <Stars rating={review.rating} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-gray-700">
                  “{review.text}”
                </blockquote>
                <footer className="mt-5 border-t border-black/5 pt-4">
                  <p className="font-montserrat text-sm font-bold">{review.authorName}</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    5-star Google review
                    {review.relativeTime ? ` · ${review.relativeTime}` : ""}
                  </p>
                </footer>
              </article>
            ))}
          </div>
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl md:aspect-[21/9]">
            <Image
              src={VIBES.community}
              alt="Studio E community in class"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="border-y border-black/5 bg-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <ol className="mt-12 grid gap-8 text-left sm:grid-cols-3">
            {HOW_IT_WORKS.map((item) => (
              <li key={item.step}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF3366] font-montserrat text-sm font-black text-white">
                  {item.step}
                </div>
                <h3 className="mt-4 font-montserrat text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <CtaLink href={FOUNDER_DEAL}>Start With Your First Class</CtaLink>
          </div>
        </div>
      </section>

      {/* 6. MERCH */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
              Movement Made for the Streets
            </h2>
            <p className="mt-3 text-lg text-gray-600">Wear the culture. Represent the movement.</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {MERCH_SHOTS.map((shot) => (
              <a
                key={shot.src}
                href={SHOPIFY_HOME}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(26,18,16,0.06)] transition hover:-translate-y-0.5"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              </a>
            ))}
          </div>
          <div className="mt-10 text-center">
            <CtaLink href={SHOPIFY_HOME} external>
              Shop Studio E Merch
              <ArrowRight className="ml-2 h-4 w-4" />
            </CtaLink>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM ROUTING */}
      <section className="bg-[#1A1210] px-5 py-16 text-white sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            Choose Your Next Step
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ROUTING.map((card) => (
              <article
                key={card.title}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-7"
              >
                <h3 className="font-montserrat text-sm font-black tracking-[0.16em] text-[#FF3366]">
                  {card.title}
                </h3>
                <p className="mt-4 flex-1 text-base leading-relaxed text-white/85">{card.body}</p>
                <div className="mt-8">
                  <CtaLink
                    href={card.href}
                    external={"external" in card && card.external}
                    className="inline-flex w-full items-center justify-center rounded-2xl border border-white/25 bg-transparent px-4 py-3 text-center font-montserrat text-xs font-bold uppercase tracking-wide text-white transition hover:border-[#FF3366] hover:bg-[#FF3366]"
                  >
                    {card.cta}
                  </CtaLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF3366] via-[#C4184E] to-[#1A1210]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
          <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-5xl">
            Your first step starts on the dance floor.
          </h2>
          <div className="mt-10">
            <CtaLink
              href={FOUNDER_DEAL}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 text-center font-montserrat text-sm font-bold uppercase tracking-wide text-[#FF3366] transition hover:bg-[#FAF7F5]"
            >
              Claim Your First Class
            </CtaLink>
          </div>
        </div>
      </section>
    </div>
  )
}
