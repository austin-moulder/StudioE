import type { Metadata } from "next"
import Script from "next/script"
import GoogleTag from "@/components/analytics/GoogleTag"
import {
  ASSETS,
  formatYouthStartLabel,
  META_PIXEL_ID,
  PROGRAM,
  YOUTH_START,
} from "@/lib/youth/config"
import YouthClient from "./YouthClient"

export const metadata: Metadata = {
  title: "Chicago Latin Dance Youth Program",
  description: `After-school Latin dance for ages 5–17, Tuesday–Thursday 5:15–6:15 PM (split into two groups). $89 deposit applied to January 2027. Free unlimited classes for the rest of 2026. Next charge February 2, 2027.`,
  openGraph: {
    title: "Chicago Latin Dance Youth Program | Studio E",
    description: `Free youth classes for the rest of 2026. $89 deposit applied to ${YOUTH_START.label}. Next charge February 2, 2027.`,
    url: "https://www.joinstudioe.com/youth",
    type: "website",
    images: [
      {
        url: ASSETS.group,
        width: 1200,
        height: 800,
        alt: "Chicago Latin Dance Youth Program at Studio E",
      },
    ],
  },
}

export default function YouthPage() {
  return (
    <>
      <GoogleTag />
      <Script id="meta-pixel-youth" strategy="afterInteractive">
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
      <YouthClient />
      <p className="sr-only">
        {PROGRAM.name} at {PROGRAM.venueName}, {PROGRAM.addressLine}, {PROGRAM.cityLine}. Classes
        start {formatYouthStartLabel()}. Tuesday through Thursday, 5:15–6:15 PM. Ages 5–17
        in two groups.
      </p>
    </>
  )
}
