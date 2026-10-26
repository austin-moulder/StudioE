import type { Metadata } from "next"
import Script from "next/script"
import { Great_Vibes } from "next/font/google"
import GoogleTag from "@/components/analytics/GoogleTag"
import PopupClassLanding from "@/components/popup-class/PopupClassLanding"
import { META_PIXEL_ID, SALSA_ON_2_CONFIG } from "@/lib/salsa-on-2/config"

const scriptFont = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-popup-script",
  display: "swap",
})

const { assets, event } = SALSA_ON_2_CONFIG

export const metadata: Metadata = {
  title: "Salsa On 2 Workshop | Studio E Chicago Humboldt Park",
  description:
    "Salsa On 2 workshop in Humboldt Park for dancers who already know salsa. Tuesday 8:30 PM or Thursday 7:30 PM—buy your ticket, then reply with your preferred night. $25, bring a friend free.",
  openGraph: {
    title: "Salsa On 2 Workshop at Studio E",
    description:
      "One sequence, several levels. Two nights: Tuesday 8:30 PM or Thursday 7:30 PM. $25, bring a friend free.",
    url: "https://www.joinstudioe.com/salsa-on-2",
    type: "website",
    images: [
      {
        url: assets.flyer,
        width: 1080,
        height: 1080,
        alt: "Salsa On 2 Workshop flyer at Studio E",
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function SalsaOn2Page() {
  return (
    <div className={scriptFont.variable}>
      <GoogleTag />
      <Script id="meta-pixel-salsa-on-2" strategy="afterInteractive">
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
      <PopupClassLanding config={SALSA_ON_2_CONFIG} />
      <p className="sr-only">
        {event.name} at {event.venueName}, {event.addressLine}, {event.cityLine}.
      </p>
    </div>
  )
}
