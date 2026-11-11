"use client"

import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { useEffect } from "react"
import StudioELogo from "@/components/StudioELogo"

const FORM = {
  id: "hSgoxvOpy8acoHrSlYLf",
  url: "https://api.leadconnectorhq.com/widget/form/hSgoxvOpy8acoHrSlYLf",
  name: "First Class Sign-In",
} as const

const FORM_IFRAME_ID = `inline-${FORM.id}`

const PHOTOS = [
  {
    src: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/DSC05448.jpg",
    alt: "Dancers smiling together at Studio E",
  },
  {
    src: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/DSC05366.jpg",
    alt: "Warm energy on the Studio E dance floor",
  },
  {
    src: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/DSC05837.jpg",
    alt: "Studio E community in Humboldt Park",
  },
] as const

type IFrameResizeWindow = Window & {
  iFrameResize?: (options: Record<string, unknown>, target: HTMLIFrameElement) => void
}

function initFormEmbed() {
  const iframe = document.getElementById(FORM_IFRAME_ID) as HTMLIFrameElement | null
  if (!iframe) return false
  if (iframe.getAttribute("data-iframe-resizer-initialized") === "true") return true

  const { iFrameResize } = window as IFrameResizeWindow
  if (typeof iFrameResize !== "function") return false

  iFrameResize(
    {
      autoResize: true,
      scrolling: false,
      checkOrigin: false,
      heightCalculationMethod: "max",
      minHeight: window.matchMedia("(max-width: 768px)").matches ? 420 : 480,
    },
    iframe
  )
  return true
}

export default function FirstClassSignInClient() {
  useEffect(() => {
    let attempts = 0
    const interval = setInterval(() => {
      attempts += 1
      if (initFormEmbed()) {
        clearInterval(interval)
        return
      }
      if (attempts >= 50) {
        clearInterval(interval)
        const iframe = document.getElementById(FORM_IFRAME_ID) as HTMLIFrameElement | null
        if (iframe) {
          iframe.setAttribute("scrolling", "yes")
          iframe.style.minHeight = "70vh"
        }
      }
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#1C1410] antialiased">
      <header className="border-b border-[#1C1410]/08 bg-[#F7F1E8]/95 px-4 py-4 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Studio E home">
            <StudioELogo width={36} height={36} alt="Studio E Logo" className="h-9 w-9" />
            <span className="font-montserrat text-sm font-bold tracking-wide">STUDIO E</span>
          </Link>
          <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-[#1C1410]/45">
            First class
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <p className="text-center font-montserrat text-[11px] font-bold uppercase tracking-[0.28em] text-[#B85A5A]">
          Welcome
        </p>
        <h1 className="mt-3 text-center font-montserrat text-3xl font-black leading-tight tracking-tight sm:text-4xl">
          We’re glad you’re here.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-base leading-relaxed text-[#1C1410]/7">
          Take a breath. Sign in below for your first class—then step onto the floor when you’re
          ready. We’ll take care of the rest.
        </p>

        <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
          {PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-[3/4] overflow-hidden rounded-xl bg-stone-200"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 280px"
                priority
              />
            </div>
          ))}
        </div>

        <section className="mt-10" aria-labelledby="sign-in-heading">
          <h2
            id="sign-in-heading"
            className="text-center font-montserrat text-xl font-black tracking-tight sm:text-2xl"
          >
            Sign in for class
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-[#1C1410]/6">
            A quick check-in so we know you’re here and can welcome you properly.
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-[#E8DCC8] bg-white p-1 shadow-sm sm:p-3">
            <Script
              src="https://link.msgsndr.com/js/form_embed.js"
              strategy="afterInteractive"
              onLoad={initFormEmbed}
            />
            <iframe
              src={FORM.url}
              id={FORM_IFRAME_ID}
              title={FORM.name}
              data-layout='{"id":"INLINE"}'
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name={FORM.name}
              data-height="480"
              data-layout-iframe-id={FORM_IFRAME_ID}
              data-form-id={FORM.id}
              className="block w-full border-0 bg-white"
              style={{ width: "100%", minHeight: "420px", border: "none", borderRadius: "8px" }}
            />
          </div>

          <p className="mt-4 text-center text-sm text-[#1C1410]/5">
            If the form doesn&apos;t load,{" "}
            <a
              href={FORM.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#B85A5A] underline underline-offset-2"
            >
              open it in a new tab
            </a>
            .
          </p>
        </section>

        <p className="mt-12 text-center text-xs leading-relaxed text-[#1C1410]/45">
          Studio E · 2657 W Division St · Humboldt Park, Chicago
        </p>
      </main>
    </div>
  )
}
