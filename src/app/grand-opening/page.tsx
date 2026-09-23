import type { Metadata } from "next"
import Script from "next/script"
import GoogleTag from "@/components/analytics/GoogleTag"
import { ASSETS, EVENT, META_PIXEL_ID } from "@/lib/grand-opening/config"
import GrandOpeningClient from "./GrandOpeningClient"

export const metadata: Metadata = {
  title: "Studio E Official Grand Opening",
  description:
    "Friday, October 23 at Studio E in Humboldt Park. Bombazo, workshops, two-room social, performances, merch runway, and food. Free RSVP—every RSVP enters a special raffle worth $1,000+.",
  openGraph: {
    title: "Studio E Official Grand Opening | Friday, October 23",
    description:
      "Celebrate Studio E’s official grand opening. Free RSVP enters you into a special raffle worth $1,000+.",
    url: "https://www.joinstudioe.com/grand-opening",
    type: "website",
    images: [
      {
        url: ASSETS.hero,
        width: 1200,
        height: 800,
        alt: "Studio E Official Grand Opening",
      },
    ],
  },
}

export default function GrandOpeningPage() {
  return (
    <>
      <GoogleTag />
      <Script id="meta-pixel-grand-opening" strategy="afterInteractive">
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
      <GrandOpeningClient />
      <p className="sr-only">
        {EVENT.name} on {EVENT.dateLabel} at {EVENT.venueName}, {EVENT.addressLine}, {EVENT.cityLine}.
      </p>
    </>
  )
}
