import type { Metadata } from "next"
import Script from "next/script"
import GoogleTag from "@/components/analytics/GoogleTag"
import WorkshopsClient from "./WorkshopsClient"

const META_PIXEL_ID = "1976276599649833"

export const metadata: Metadata = {
  title: "Studio E Dance Workshops in Chicago",
  description:
    "Book Salsa, Bachata, Cumbia, and specialty dance workshops with Studio E in Chicago.",
  openGraph: {
    title: "Studio E Dance Workshops in Chicago",
    description:
      "Book Salsa, Bachata, Cumbia, and specialty dance workshops with Studio E in Chicago.",
    url: "https://www.joinstudioe.com/workshops",
    type: "website",
  },
}

/** Dates refresh from the request/render time (next weekday occurrence). */
export const dynamic = "force-dynamic"

export default function WorkshopsPage() {
  return (
    <>
      <GoogleTag />
      <Script id="meta-pixel-workshops" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
          fbq('trackCustom', 'WorkshopsHubView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <WorkshopsClient />
      <p className="sr-only">
        Studio E dance workshops in Chicago. Book Salsa, Bachata, Cumbia, Merengue, Cha-Cha,
        Reggaeton, Twerk, Afro-Cuban, and specialty workshops. Low-cost tickets with direct
        registration.
      </p>
    </>
  )
}
