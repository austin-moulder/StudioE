import type { EventSchedule } from "./event-time"

export type FaqItem = {
  question: string
  answer: string
}

export type PopupClassLandingConfig = {
  id: string
  checkoutUrl: string
  /** When true, CTAs scroll to an on-page iframe of checkoutUrl instead of navigating away. */
  embedCheckout?: boolean
  spotsStorageKey: string
  utm: {
    utm_source: string
    utm_medium: string
    utm_campaign: string
  }
  event: EventSchedule & {
    name: string
    format: string
    durationLabel: string
    price: number
    capacity: number
    venueName: string
    addressLine: string
    cityLine: string
    neighborhood: string
    mapsEmbedSrc: string
  }
  assets: {
    flyer: string
    video: string
  }
  copy: {
    accentLabel: string
    heroHeadline: string
    heroSubheadline: string
    primaryCta: string
    secondaryCta: string
    capacityNote: string
    videoHeadline: string
    offerHeadline: string
    friendHeadline: string
    friendBody: string
    priceFriendLine: string
    limitedHeadline: string
    limitedBody: string
    communityHeadline: string
    communityBody: string
    communityBadge: string | null
    finalHeadline: string
    finalBody: string
    countdownEnded: string
    stickyCta: string
    flyerAlt: string
    videoAriaLabel: string
  }
  offerBullets: readonly string[]
  offerTerms: readonly string[]
  faqs: readonly FaqItem[]
}

export function buildPopupCheckoutUrl(
  checkoutUrl: string,
  utm: PopupClassLandingConfig["utm"],
  extraParams?: Record<string, string>
) {
  const url = new URL(checkoutUrl)
  Object.entries(utm).forEach(([key, value]) => {
    if (!url.searchParams.has(key)) url.searchParams.set(key, value)
  })
  if (typeof window !== "undefined") {
    const incoming = new URLSearchParams(window.location.search)
    ;["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"].forEach(
      (key) => {
        const value = incoming.get(key)
        if (value) url.searchParams.set(key, value)
      }
    )
  }
  if (extraParams) {
    Object.entries(extraParams).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }
  return url.toString()
}

export const CANT_MAKE_THIS_WEEK_FAQ: FaqItem = {
  question: "What if I can’t make it this week?",
  answer:
    "Still grab your ticket. You’ll get first dibs on the next class so you don’t get sold out again — we hold these several times per month.",
}
