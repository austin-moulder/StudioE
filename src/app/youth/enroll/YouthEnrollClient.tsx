"use client"

import { useEffect } from "react"
import Script from "next/script"
import { Check } from "lucide-react"
import { ENROLL_COPY, ENROLL_FORM } from "@/lib/youth/enroll-config"

const FORM_IFRAME_ID = `inline-${ENROLL_FORM.id}`

type IFrameResizeWindow = Window & {
  iFrameResize?: (options: Record<string, unknown>, target: HTMLIFrameElement) => void
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

function trackMeta(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: eventName, ...params })
  if (typeof window.fbq === "function") {
    window.fbq("track", eventName, params)
  }
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
      minHeight: isMobile ? 560 : 720,
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

export default function YouthEnrollClient() {
  useEffect(() => {
    trackMeta("ViewContent", {
      content_name: "Youth Program Enrollment Form",
      content_category: "youth_enrollment",
    })
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

  return (
    <div className="min-h-screen scroll-smooth bg-[#F7F1E8] text-stone-900 antialiased">
      <div className="bg-[#1C1410] px-4 py-2.5 text-center">
        <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.16em] text-[#E8C97A] sm:text-xs">
          {ENROLL_COPY.announcement}
        </p>
      </div>

      <header className="bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] px-4 py-14 text-white sm:px-6 sm:py-16">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-montserrat text-xs font-bold uppercase tracking-[0.22em] text-white/85">
            Studio E · Youth Program
          </p>
          <h1 className="mt-3 font-montserrat text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            {ENROLL_COPY.headline}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/90 sm:text-lg">
            {ENROLL_COPY.subheadline}
          </p>
        </div>
      </header>

      <section className="px-4 py-12 sm:px-6 sm:py-14" aria-labelledby="next-steps-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="next-steps-heading"
            className="text-center font-montserrat text-2xl font-black tracking-tight text-[#1C1410] sm:text-3xl"
          >
            {ENROLL_COPY.nextStepsHeadline}
          </h2>
          <ul className="mt-8 space-y-3">
            {ENROLL_COPY.nextSteps.map((step) => (
              <li key={step} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#FF3366]" aria-hidden />
                <span className="text-base leading-snug text-stone-800">{step}</span>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-md text-center text-sm leading-relaxed text-stone-600">
            {ENROLL_COPY.rollingAdmissionNote}
          </p>
        </div>
      </section>

      <section
        id="enroll"
        className="scroll-mt-6 bg-white px-4 py-12 sm:px-6 sm:py-16"
        aria-labelledby="enroll-form-heading"
      >
        <div className="mx-auto max-w-xl">
          <h2
            id="enroll-form-heading"
            className="text-center font-montserrat text-2xl font-black tracking-tight text-[#1C1410] sm:text-3xl"
          >
            Child Enrollment Form
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-base text-stone-600">
            {ENROLL_COPY.formIntro}
          </p>

          <div className="mt-8 overflow-visible rounded-2xl border border-[#E8DCC8] bg-[#F7F1E8]/40 p-2 shadow-sm sm:p-4">
            <Script
              src="https://link.msgsndr.com/js/form_embed.js"
              strategy="afterInteractive"
              onLoad={initFormEmbed}
            />
            <iframe
              src={ENROLL_FORM.url}
              id={FORM_IFRAME_ID}
              title={ENROLL_FORM.name}
              data-layout='{"id":"INLINE"}'
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name={ENROLL_FORM.name}
              data-height="720"
              data-layout-iframe-id={FORM_IFRAME_ID}
              data-form-id={ENROLL_FORM.id}
              className="block w-full border-0 bg-white"
              style={{ width: "100%", minHeight: "720px", border: "none", borderRadius: "8px" }}
            />
          </div>

          <p className="mt-4 text-center text-sm text-stone-500">
            If the form doesn&apos;t load,{" "}
            <a
              href={ENROLL_FORM.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#FF3366] underline underline-offset-2"
            >
              open it in a new tab
            </a>
            .
          </p>
        </div>
      </section>

      <footer className="border-t border-[#E8DCC8] bg-[#F7F1E8] px-4 py-10 text-center text-sm text-stone-500 sm:px-6">
        <p className="font-montserrat text-base font-bold text-[#1C1410]">Studio E</p>
        <p className="mt-1">{ENROLL_COPY.footerNote}</p>
      </footer>
    </div>
  )
}
