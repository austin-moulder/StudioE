import type { EventSchedule } from "./event-time"

export type FaqItem = {
  question: string
  answer: string
}

export type PopupClassCopy = {
  accentLabel: string
  heroHeadline: string
  heroSubheadline: string
  primaryCta: string
  secondaryCta: string
  capacityNote: string
  videoHeadline: string
  /** Optional short explainer shown after the video (e.g. “What is Wepa?”). */
  educationHeadline?: string
  educationBody?: string
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

/** Chrome labels that sit outside the main marketing copy block. */
export type PopupClassUiLabels = {
  startsIn: string
  locationHeadline: string
  faqHeadline: string
  limitedTo: string
  spotsLeftOne: string
  spotsLeftMany: string
  capOf: string
  ticketsLeftOne: string
  ticketsLeftMany: string
  reserveSpot: string
  checkoutHelper: string
  loadingDate: string
  openCheckoutNewTab: string
  countdownDays: string
  countdownHrs: string
  countdownMin: string
  countdownSec: string
  /** Label on the toggle (language you switch into). */
  langToggle: string
}

export type PopupClassTheme = {
  pageBg: string
  altBg: string
  accent: string
  accentHover: string
  soft: string
  finalFrom: string
  finalVia: string
  finalTo: string
  ctaShadow: string
}

export const DEFAULT_POPUP_THEME: PopupClassTheme = {
  pageBg: "#1A0508",
  altBg: "#2A0A12",
  accent: "#FF2D6A",
  accentHover: "#E8255C",
  soft: "#FF8FB3",
  finalFrom: "#FF2D6A",
  finalVia: "#C4184E",
  finalTo: "#4A0A1C",
  ctaShadow: "rgba(255,45,106,0.45)",
}

/** Green / white / red night palette for Mexican street-cumbia energy. */
export const MEXICAN_POPUP_THEME: PopupClassTheme = {
  pageBg: "#0B1610",
  altBg: "#13241A",
  accent: "#CE1126",
  accentHover: "#A80E1E",
  soft: "#F0C75E",
  finalFrom: "#CE1126",
  finalVia: "#8B1A1A",
  finalTo: "#006847",
  ctaShadow: "rgba(206,17,38,0.42)",
}

/** Red / black / green night palette for Afro-Cuban / pan-African energy. */
export const AFRO_CUBAN_POPUP_THEME: PopupClassTheme = {
  pageBg: "#0A0A0A",
  altBg: "#161210",
  accent: "#E31C23",
  accentHover: "#B8161C",
  soft: "#F0C75E",
  finalFrom: "#E31C23",
  finalVia: "#1A1A1A",
  finalTo: "#006B3F",
  ctaShadow: "rgba(227,28,35,0.42)",
}

export const DEFAULT_POPUP_UI_EN: PopupClassUiLabels = {
  startsIn: "Starts in",
  locationHeadline: "Where We Dance",
  faqHeadline: "FAQ",
  limitedTo: "Limited to {n} attendees",
  spotsLeftOne: "{n} spot left",
  spotsLeftMany: "{n} spots left",
  capOf: "Cap of {n} total tickets",
  ticketsLeftOne: "Only {n} ticket left · Cap of {capacity}",
  ticketsLeftMany: "Only {n} tickets left · Cap of {capacity}",
  reserveSpot: "Reserve Your Spot",
  checkoutHelper: "Complete checkout below. {priceLine}.",
  loadingDate: "Loading date…",
  openCheckoutNewTab: "open checkout in a new tab",
  countdownDays: "Days",
  countdownHrs: "Hrs",
  countdownMin: "Min",
  countdownSec: "Sec",
  langToggle: "Español",
}

export type PopupClassLandingConfig = {
  id: string
  checkoutUrl: string
  /** When true, CTAs scroll to an on-page iframe of checkoutUrl instead of navigating away. */
  embedCheckout?: boolean
  spotsStorageKey: string
  theme?: PopupClassTheme
  /** Cultural color stripe at the top of the page. */
  bannerStripe?: "mexican" | "pan-african"
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
  copy: PopupClassCopy
  offerBullets: readonly string[]
  offerTerms: readonly string[]
  faqs: readonly FaqItem[]
  /**
   * Optional Spanish pack. When present, a language toggle appears at the top of the page.
   * English uses the top-level copy/bullets/faqs; Spanish swaps these fields in.
   */
  spanish?: {
    durationLabel: string
    copy: PopupClassCopy
    offerBullets: readonly string[]
    offerTerms: readonly string[]
    faqs: readonly FaqItem[]
    ui: PopupClassUiLabels
  }
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

export const CANT_MAKE_THIS_WEEK_FAQ_ES: FaqItem = {
  question: "¿Y si no puedo esta semana?",
  answer:
    "Compra tu boleto igual. Te damos prioridad para la próxima clase para que no se agote — las hacemos varias veces al mes.",
}

export function fillTemplate(template: string, vars: Record<string, string | number>) {
  return Object.entries(vars).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    template
  )
}
