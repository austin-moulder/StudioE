import type { Metadata } from "next"
import Script from "next/script"
import GoogleTag from "@/components/analytics/GoogleTag"
import { ASSETS, META_PIXEL_ID, OFFER } from "@/lib/latin-morning-reset/config"
import LatinMorningResetClient from "./LatinMorningResetClient"
import LatinMorningResetTracker from "./LatinMorningResetTracker"

export const metadata: Metadata = {
  title: "21-Day Latin Morning Reset | Studio E Chicago",
  description:
    "Beginner-friendly weekday 10AM Latin dance workout combining dance, mobility, strength, and community. Start your 21-Day Latin Morning Reset for $21. No partner required.",
  openGraph: {
    title: "21-Day Latin Morning Reset | Studio E",
    description:
      "Show up at 10AM, move your body, meet great people, and start your day feeling better. $21 to get started.",
    url: "https://www.joinstudioe.com/latin-morning-reset",
    type: "website",
    images: [
      {
        url: ASSETS.hero,
        width: 1200,
        height: 800,
        alt: "Studio E Latin Morning Reset group class",
      },
    ],
  },
}

export default function LatinMorningResetPage() {
  return (
    <>
      <GoogleTag />
      <Script id="meta-pixel-latin-morning-reset" strategy="afterInteractive">
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
      <LatinMorningResetTracker />
      <LatinMorningResetClient />
      <p className="sr-only">
        {OFFER.name} at {OFFER.venueName}, {OFFER.addressLine}, {OFFER.cityLine}.
      </p>
    </>
  )
}
