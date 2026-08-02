"use client"

import { useEffect } from "react"
import Script from "next/script"

const GOOGLE_ADS_ID = "AW-18365278375"
const CONVERSION_SEND_TO = "AW-18365278375/eBEwCOjEvNocEKfRn7VE"

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
    gtag_report_conversion?: (url?: string) => boolean
  }
}

function reportRsvpConversion(url?: string) {
  const callback = () => {
    if (typeof url !== "undefined") {
      window.location.href = url
    }
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: CONVERSION_SEND_TO,
      value: 1.0,
      currency: "USD",
      event_callback: callback,
    })
  }

  return false
}

function isAcuityBookingMessage(data: unknown): boolean {
  if (!data) return false

  if (typeof data === "string") {
    try {
      return isAcuityBookingMessage(JSON.parse(data))
    } catch {
      return /AcuityEvent|acuity_booking_confirmed/i.test(data)
    }
  }

  if (typeof data === "object") {
    const eventName = String((data as { event?: string }).event || "")
    return (
      eventName === "AcuityEvent" ||
      eventName === "acuity_booking_confirmed" ||
      eventName === "Acuity_Scheduled"
    )
  }

  return false
}

/**
 * Google Ads tag + RSVP conversion tracking for /social.
 *
 * Acuity bookings happen inside a cross-origin iframe, so conversion fires when
 * Acuity posts a booking message to the parent window. Add this in Acuity →
 * Integrations → Custom Conversion Tracking:
 *
 * try {
 *   var postobject = JSON.stringify({
 *     event: "AcuityEvent",
 *     Email: "%email%",
 *     ID: "%id%",
 *     Type: "%type%",
 *     AppointmentType: "%appointmentType%"
 *   });
 *   window.parent.parent.postMessage(postobject, "*");
 * } catch (e) {}
 */
export default function SocialGoogleAds() {
  useEffect(() => {
    window.gtag_report_conversion = reportRsvpConversion

    let fired = false
    const fireOnce = () => {
      if (fired) return
      fired = true
      reportRsvpConversion()
    }

    const onMessage = (event: MessageEvent) => {
      const origin = event.origin || ""
      const fromAcuity =
        origin.includes("acuityscheduling.com") || origin.includes("squarespace.com")

      if (isAcuityBookingMessage(event.data) || (fromAcuity && isAcuityBookingMessage(event.data))) {
        fireOnce()
      }
    }

    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-social" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
          window.gtag_report_conversion = function(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
              'send_to': '${CONVERSION_SEND_TO}',
              'value': 1.0,
              'currency': 'USD',
              'event_callback': callback
            });
            return false;
          };
        `}
      </Script>
    </>
  )
}
