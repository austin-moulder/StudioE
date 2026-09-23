"use client"

import Image from "next/image"
import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react"
import { Check, ChevronDown, MapPin, Users } from "lucide-react"
import {
  formatEventDateLabel,
  getCountdownParts,
  getUpcomingEventStartMs,
  type CountdownParts,
} from "@/lib/popup-class/event-time"
import {
  DEFAULT_POPUP_THEME,
  DEFAULT_POPUP_UI_EN,
  buildPopupCheckoutUrl,
  fillTemplate,
  type PopupClassLandingConfig,
  type PopupClassUiLabels,
} from "@/lib/popup-class/types"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

type Lang = "en" | "es"

const SPOTS_MIN = 3
const SPOTS_MAX = 12

function getSpotsLeft(storageKey: string): number {
  if (typeof window === "undefined") return 7
  try {
    const raw = window.localStorage.getItem(storageKey)
    if (raw) {
      const n = Number(raw)
      if (Number.isInteger(n) && n >= SPOTS_MIN && n <= SPOTS_MAX) return n
    }
  } catch {
    /* ignore */
  }
  const count = Math.floor(Math.random() * (SPOTS_MAX - SPOTS_MIN + 1)) + SPOTS_MIN
  try {
    window.localStorage.setItem(storageKey, String(count))
  } catch {
    /* ignore */
  }
  return count
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

function trackMeta(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: eventName, ...params })
  if (typeof window.fbq === "function") {
    window.fbq("track", eventName, params)
  }
}

function Countdown({
  parts,
  ended,
  endedLabel,
  ui,
}: {
  parts: CountdownParts
  ended: boolean
  endedLabel: string
  ui: PopupClassUiLabels
}) {
  if (ended) {
    return (
      <p className="font-montserrat text-xl font-black text-[var(--popup-accent)] sm:text-2xl">
        {endedLabel}
      </p>
    )
  }

  const units: [string, number][] =
    parts.days > 0
      ? [
          [ui.countdownDays, parts.days],
          [ui.countdownHrs, parts.hours],
          [ui.countdownMin, parts.minutes],
          [ui.countdownSec, parts.seconds],
        ]
      : [
          [ui.countdownHrs, parts.hours],
          [ui.countdownMin, parts.minutes],
          [ui.countdownSec, parts.seconds],
        ]

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
      role="timer"
      aria-live="polite"
    >
      {units.map(([label, value]) => (
        <div
          key={label}
          className="min-w-[4rem] rounded-xl border border-white/15 bg-black/40 px-2.5 py-2 text-center backdrop-blur-sm"
        >
          <div className="font-montserrat text-2xl font-black tabular-nums text-white sm:text-3xl">
            {pad(value)}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-white/65">{label}</div>
        </div>
      ))}
    </div>
  )
}

export default function PopupClassLanding({ config }: { config: PopupClassLandingConfig }) {
  const { event, assets } = config
  const theme = config.theme ?? DEFAULT_POPUP_THEME
  const bilingual = Boolean(config.spanish)
  const embedCheckout = Boolean(config.embedCheckout)

  const [lang, setLang] = useState<Lang>("en")
  const [eventStartMs, setEventStartMs] = useState<number | null>(null)
  const [dateLabel, setDateLabel] = useState("")
  const [parts, setParts] = useState<CountdownParts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: 1,
  })
  const [ended, setEnded] = useState(false)
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [checkoutSrc, setCheckoutSrc] = useState<string | null>(null)

  const copy = lang === "es" && config.spanish ? config.spanish.copy : config.copy
  const offerBullets =
    lang === "es" && config.spanish ? config.spanish.offerBullets : config.offerBullets
  const offerTerms = lang === "es" && config.spanish ? config.spanish.offerTerms : config.offerTerms
  const faqs = lang === "es" && config.spanish ? config.spanish.faqs : config.faqs
  const durationLabel =
    lang === "es" && config.spanish ? config.spanish.durationLabel : event.durationLabel
  const ui: PopupClassUiLabels =
    lang === "es" && config.spanish ? config.spanish.ui : DEFAULT_POPUP_UI_EN

  const themeStyle = useMemo(
    () =>
      ({
        ["--popup-bg" as string]: theme.pageBg,
        ["--popup-alt" as string]: theme.altBg,
        ["--popup-accent" as string]: theme.accent,
        ["--popup-accent-hover" as string]: theme.accentHover,
        ["--popup-soft" as string]: theme.soft,
        ["--popup-final-from" as string]: theme.finalFrom,
        ["--popup-final-via" as string]: theme.finalVia,
        ["--popup-final-to" as string]: theme.finalTo,
        ["--popup-cta-shadow" as string]: theme.ctaShadow,
      }) as CSSProperties,
    [theme]
  )

  const ctaClass =
    "mx-auto flex w-full max-w-md items-center justify-center rounded-2xl bg-[var(--popup-accent)] px-6 py-4 text-center font-montserrat text-base font-black uppercase tracking-wide text-white shadow-[0_10px_30px_var(--popup-cta-shadow)] transition hover:bg-[var(--popup-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--popup-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--popup-bg)] sm:text-lg"

  useEffect(() => {
    const start = getUpcomingEventStartMs(event)
    setEventStartMs(start)
    setSpotsLeft(getSpotsLeft(config.spotsStorageKey))
    trackMeta("ViewContent", {
      content_name: event.name,
      content_category: "event",
      value: event.price,
      currency: "USD",
    })
  }, [config.spotsStorageKey, event])

  useEffect(() => {
    if (!eventStartMs) return
    const locale = lang === "es" ? "es-MX" : "en-US"
    setDateLabel(formatEventDateLabel(eventStartMs, event.timeZone, locale))
  }, [event.timeZone, eventStartMs, lang])

  useEffect(() => {
    if (!embedCheckout) return
    setCheckoutSrc(buildPopupCheckoutUrl(config.checkoutUrl, config.utm, { placement: "embed" }))
  }, [config.checkoutUrl, config.utm, embedCheckout])

  useEffect(() => {
    if (!eventStartMs) return
    const tick = () => {
      const next = getCountdownParts(eventStartMs)
      setParts(next)
      setEnded(next.totalMs <= 0)
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [eventStartMs])

  const goCheckout = useCallback(
    (placement: string) => {
      trackMeta("InitiateCheckout", {
        content_name: event.name,
        value: event.price,
        currency: "USD",
        placement,
      })
      if (embedCheckout) {
        document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth", block: "start" })
        return
      }
      window.location.href = buildPopupCheckoutUrl(config.checkoutUrl, config.utm, { placement })
    },
    [config.checkoutUrl, config.utm, embedCheckout, event.name, event.price]
  )

  return (
    <div
      className="min-h-screen scroll-smooth bg-[var(--popup-bg)] pb-24 text-white antialiased sm:pb-0"
      style={themeStyle}
      lang={lang}
    >
      {config.bannerStripe === "mexican" ? (
        <div
          className="flex h-1.5 w-full"
          aria-hidden
          style={{
            background:
              "linear-gradient(90deg, #006847 0%, #006847 33%, #FFFFFF 33%, #FFFFFF 66%, #CE1126 66%, #CE1126 100%)",
          }}
        />
      ) : null}
      {config.bannerStripe === "pan-african" ? (
        <div
          className="flex h-1.5 w-full"
          aria-hidden
          style={{
            background:
              "linear-gradient(90deg, #E31C23 0%, #E31C23 33%, #0A0A0A 33%, #0A0A0A 66%, #006B3F 66%, #006B3F 100%)",
          }}
        />
      ) : null}

      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={assets.flyer}
            alt={copy.flyerAlt}
            fill
            priority
            className="object-cover object-center opacity-35"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, color-mix(in srgb, var(--popup-bg) 70%, transparent), color-mix(in srgb, var(--popup-alt) 85%, transparent), var(--popup-bg))`,
            }}
          />
        </div>

        <div className="relative mx-auto max-w-xl px-4 pb-12 pt-10 sm:px-6 sm:pt-14">
          {bilingual ? (
            <div className="mb-5 flex justify-center">
              <button
                type="button"
                onClick={() => setLang((prev) => (prev === "en" ? "es" : "en"))}
                className="rounded-md border border-white/30 bg-white/10 px-4 py-2 font-montserrat text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--popup-soft)]"
              >
                {ui.langToggle}
              </button>
            </div>
          ) : null}

          <p className="text-center font-montserrat text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--popup-soft)]">
            Studio E · Humboldt Park
          </p>
          <p
            className="mt-3 text-center text-2xl text-[var(--popup-accent)]"
            style={{ fontFamily: "var(--font-popup-script), cursive" }}
          >
            {copy.accentLabel}
          </p>

          <h1 className="mt-3 text-center font-montserrat text-[1.7rem] font-black leading-[1.12] tracking-tight sm:text-4xl">
            {copy.heroHeadline}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-base leading-relaxed text-white/85 sm:text-lg">
            {copy.heroSubheadline}
          </p>

          <div className="mx-auto mt-6 max-w-sm overflow-hidden rounded-2xl border border-white/15 bg-black/30 shadow-xl">
            <div className="relative aspect-square">
              <Image
                src={assets.flyer}
                alt={copy.flyerAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 28rem"
              />
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-sm space-y-2 rounded-2xl border border-[color-mix(in_srgb,var(--popup-accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--popup-accent)_10%,transparent)] px-4 py-4 text-center text-sm">
            <p className="font-montserrat text-base font-black text-white">
              {dateLabel || ui.loadingDate}
            </p>
            <p className="text-white/85">{durationLabel}</p>
            <p className="text-white/85">
              {event.venueName} · {event.addressLine}
            </p>
            <p className="font-montserrat text-lg font-black text-[var(--popup-accent)]">
              {copy.priceFriendLine}
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="mb-3 font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              {ui.startsIn}
            </p>
            <Countdown parts={parts} ended={ended} endedLabel={copy.countdownEnded} ui={ui} />
          </div>

          <div className="mt-8 flex flex-col items-center">
            <button type="button" onClick={() => goCheckout("hero")} className={ctaClass}>
              {copy.primaryCta}
            </button>
            <p className="mt-3 max-w-md text-center text-xs leading-relaxed text-white/70">
              {copy.capacityNote}
            </p>
          </div>
        </div>
      </header>

      <section className="border-t border-white/10 px-4 py-12 sm:px-6" aria-labelledby="video-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="video-heading"
            className="mb-6 text-center font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
          >
            {copy.videoHeadline}
          </h2>
          <div className="mx-auto mt-6 flex max-w-[280px] justify-center overflow-hidden rounded-2xl border border-white/15 bg-black shadow-lg sm:max-w-[320px]">
            <video
              className="aspect-[9/16] h-auto w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              poster={assets.flyer}
              aria-label={copy.videoAriaLabel}
            >
              <source src={assets.video} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {copy.educationHeadline && copy.educationBody ? (
        <section
          className="border-t border-white/10 px-4 py-12 sm:px-6"
          aria-labelledby="education-heading"
        >
          <div className="mx-auto max-w-xl text-center">
            <h2
              id="education-heading"
              className="font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
            >
              {copy.educationHeadline}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/85">
              {copy.educationBody}
            </p>
          </div>
        </section>
      ) : null}

      <section
        className="bg-[var(--popup-alt)] px-4 py-12 sm:px-6"
        aria-labelledby="offer-heading"
      >
        <div className="mx-auto max-w-xl">
          <h2
            id="offer-heading"
            className="text-center font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
          >
            {copy.offerHeadline}
          </h2>
          <ul className="mt-8 space-y-3">
            {offerBullets.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--popup-accent)]" aria-hidden />
                <span className="text-base leading-snug text-white/90">{item}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-2 text-sm text-white/65">
            {offerTerms.map((term) => (
              <li key={term}>• {term}</li>
            ))}
          </ul>
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => goCheckout("offer")} className={ctaClass}>
              {copy.primaryCta}
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6" aria-labelledby="friend-heading">
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="friend-heading"
            className="font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
          >
            {copy.friendHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/85">
            {copy.friendBody}
          </p>
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => goCheckout("friend")} className={ctaClass}>
              {copy.secondaryCta}
            </button>
          </div>
        </div>
      </section>

      <section
        className="bg-[var(--popup-alt)] px-4 py-12 sm:px-6"
        aria-labelledby="limited-heading"
      >
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="limited-heading"
            className="font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
          >
            {copy.limitedHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/85">
            {copy.limitedBody}
          </p>
          <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-[color-mix(in_srgb,var(--popup-accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--popup-accent)_10%,transparent)] px-5 py-6">
            <Users className="mx-auto h-8 w-8 text-[var(--popup-accent)]" aria-hidden />
            <p className="mt-3 font-montserrat text-sm font-bold uppercase tracking-[0.18em] text-[var(--popup-soft)]">
              {fillTemplate(ui.limitedTo, { n: event.capacity })}
            </p>
            {spotsLeft !== null ? (
              <p className="mt-3 font-montserrat text-3xl font-black text-white">
                {fillTemplate(spotsLeft === 1 ? ui.spotsLeftOne : ui.spotsLeftMany, {
                  n: spotsLeft,
                })}
              </p>
            ) : null}
            <p className="mt-2 text-xs text-white/60">
              {fillTemplate(ui.capOf, { n: event.capacity })}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6" aria-labelledby="community-heading">
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="community-heading"
            className="font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
          >
            {copy.communityHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/85">
            {copy.communityBody}
          </p>
          {copy.communityBadge ? (
            <p className="mt-6 inline-block rounded-full border border-[var(--popup-accent)] bg-[color-mix(in_srgb,var(--popup-accent)_15%,transparent)] px-5 py-2.5 font-montserrat text-sm font-black uppercase tracking-wide text-[var(--popup-accent)]">
              {copy.communityBadge}
            </p>
          ) : null}
        </div>
      </section>

      <section
        className="bg-[var(--popup-alt)] px-4 py-12 sm:px-6"
        aria-labelledby="location-heading"
      >
        <div className="mx-auto max-w-xl">
          <h2
            id="location-heading"
            className="text-center font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
          >
            {ui.locationHeadline}
          </h2>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
            <MapPin className="mx-auto h-6 w-6 text-[var(--popup-accent)]" aria-hidden />
            <p className="mt-3 font-montserrat text-lg font-black">{event.venueName}</p>
            <p className="mt-1 text-white/85">{event.addressLine}</p>
            <p className="text-white/85">{event.cityLine}</p>
            <p className="mt-1 text-sm text-[var(--popup-soft)]">{event.neighborhood}</p>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Map to Studio E on Division Street"
              src={event.mapsEmbedSrc}
              className="h-48 w-full grayscale-[30%] contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => goCheckout("location")} className={ctaClass}>
              {copy.primaryCta}
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="faq-heading"
            className="mb-6 text-center font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
          >
            {ui.faqHeadline}
          </h2>
          <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
            {faqs.map((item, index) => {
              const open = openFaq === index
              const panelId = `${config.id}-faq-${index}`
              const buttonId = `${config.id}-faq-btn-${index}`
              return (
                <div key={item.question}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenFaq(open ? null : index)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--popup-accent)]"
                    >
                      <span className="font-montserrat text-sm font-bold text-white sm:text-base">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[var(--popup-accent)] transition ${open ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!open}
                    className="px-4 pb-4"
                  >
                    <p className="text-sm leading-relaxed text-white/75">{item.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section
        className="border-t border-white/10 px-4 py-14 sm:px-6"
        style={{
          background:
            "linear-gradient(to bottom right, var(--popup-final-from), var(--popup-final-via), var(--popup-final-to))",
        }}
      >
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            {copy.finalHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/90">{copy.finalBody}</p>
          <div className="mt-6 space-y-1 text-sm text-white/90">
            <p className="font-montserrat text-lg font-black">{copy.priceFriendLine}</p>
            <p>{dateLabel}</p>
            <p>{durationLabel}</p>
          </div>
          <div className="mt-6">
            <Countdown parts={parts} ended={ended} endedLabel={copy.countdownEnded} ui={ui} />
          </div>
          {spotsLeft !== null ? (
            <p className="mt-5 font-montserrat text-sm font-bold text-white">
              {fillTemplate(spotsLeft === 1 ? ui.ticketsLeftOne : ui.ticketsLeftMany, {
                n: spotsLeft,
                capacity: event.capacity,
              })}
            </p>
          ) : null}
          {!embedCheckout ? (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => goCheckout("final")}
                className="mx-auto flex w-full max-w-md items-center justify-center rounded-2xl bg-white px-6 py-4 font-montserrat text-base font-black uppercase tracking-wide text-[var(--popup-accent)] shadow-lg transition hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--popup-final-via)] sm:text-lg"
              >
                {copy.primaryCta}
              </button>
            </div>
          ) : null}
        </div>
      </section>

      {embedCheckout ? (
        <section
          id="checkout"
          className="scroll-mt-6 border-t border-white/10 bg-[var(--popup-bg)] px-4 py-14 sm:px-6"
          aria-labelledby="checkout-heading"
        >
          <div className="mx-auto max-w-xl">
            <h2
              id="checkout-heading"
              className="text-center font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
            >
              {ui.reserveSpot}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-center text-base text-white/80">
              {fillTemplate(ui.checkoutHelper, { priceLine: copy.priceFriendLine })}
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
              {checkoutSrc ? (
                <iframe
                  src={checkoutSrc}
                  title={`${event.name} checkout`}
                  className="block min-h-[820px] w-full border-0 bg-white"
                  loading="lazy"
                  allow="payment *"
                />
              ) : (
                <div className="flex min-h-[240px] items-center justify-center px-6 text-sm text-stone-500">
                  Loading checkout…
                </div>
              )}
            </div>
            <p className="mt-4 text-center text-sm text-white/65">
              If the form doesn&apos;t load,{" "}
              {checkoutSrc ? (
                <a
                  href={checkoutSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--popup-soft)] underline underline-offset-2"
                >
                  {ui.openCheckoutNewTab}
                </a>
              ) : (
                ui.openCheckoutNewTab
              )}
              .
            </p>
          </div>
        </section>
      ) : null}

      <footer className="px-4 py-8 text-center text-xs text-white/50 sm:px-6">
        <p className="font-montserrat font-bold text-white/70">{event.venueName}</p>
        <p className="mt-1">
          {event.addressLine}, {event.cityLine}
        </p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[color-mix(in_srgb,var(--popup-bg)_95%,transparent)] p-3 backdrop-blur sm:hidden">
        <button type="button" onClick={() => goCheckout("sticky")} className={`${ctaClass} max-w-none`}>
          {copy.stickyCta}
        </button>
      </div>
    </div>
  )
}
