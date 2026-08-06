"use client"

import { useEffect } from "react"
import Script from "next/script"

const FORM_URL = "https://api.leadconnectorhq.com/widget/form/HoJEeRTq8cGQrJTKKH7u"
const FORM_ID = "HoJEeRTq8cGQrJTKKH7u"

type IFrameResizeWindow = Window & {
  iFrameResize?: (options: Record<string, unknown>, target: HTMLIFrameElement) => void
}

function initFormEmbed(iframeId: string) {
  const iframe = document.getElementById(iframeId) as HTMLIFrameElement | null
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
      minHeight: isMobile ? 520 : 640,
    },
    iframe
  )

  return true
}

function enableFormEmbedScrollFallback(iframeId: string) {
  const iframe = document.getElementById(iframeId) as HTMLIFrameElement | null
  if (!iframe || iframe.getAttribute("data-iframe-resizer-initialized") === "true") return

  iframe.setAttribute("scrolling", "yes")
  iframe.style.minHeight = "70vh"
  iframe.style.overflow = "auto"
}

export default function ChoreoLeadForm({
  iframeId = `inline-${FORM_ID}`,
  title = "Choreography Inquiry",
}: {
  iframeId?: string
  title?: string
}) {
  useEffect(() => {
    let attempts = 0
    const maxAttempts = 50

    const tryInit = () => {
      attempts += 1
      if (initFormEmbed(iframeId)) {
        clearInterval(interval)
        return
      }
      if (attempts >= maxAttempts) {
        enableFormEmbedScrollFallback(iframeId)
        clearInterval(interval)
      }
    }

    tryInit()
    const interval = setInterval(tryInit, 200)
    const onResize = () => initFormEmbed(iframeId)
    window.addEventListener("resize", onResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", onResize)
    }
  }, [iframeId])

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white p-2 shadow-sm md:p-4">
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
      <iframe
        src={FORM_URL}
        id={iframeId}
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={title}
        data-height="640"
        data-layout-iframe-id={iframeId}
        data-form-id={FORM_ID}
        title={title}
        className="w-full border-none"
        style={{ minHeight: "640px", width: "100%" }}
      />
    </div>
  )
}
