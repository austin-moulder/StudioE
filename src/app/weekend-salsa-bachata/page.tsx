import type { Metadata } from "next"
import Script from "next/script"
import GoogleTag from "@/components/analytics/GoogleTag"
import { ASSETS, META_PIXEL_ID, OFFER } from "@/lib/weekend-salsa-bachata/config"
import WeekendSalsaBachataClient from "./WeekendSalsaBachataClient"
import WeekendSalsaBachataTracker from "./WeekendSalsaBachataTracker"

export const metadata: Metadata = {
  title: "Saturday Salsa and Bachata Classes in Chicago | Studio E",
  description:
    "Learn Salsa and Bachata every Saturday at Studio E. Beginner-friendly classes, no partner required, and a $15 first-class offer credited toward membership.",
  openGraph: {
    title: "Saturday Salsa and Bachata Classes in Chicago | Studio E",
    description:
      "Learn Salsa and Bachata every Saturday at Studio E. Beginner-friendly classes, no partner required, and a $15 first-class offer credited toward membership.",
    url: "https://www.joinstudioe.com/weekend-salsa-bachata",
    type: "website",
    images: [
      {
        url: ASSETS.hero,
        width: 1200,
        height: 800,
        alt: "Studio E community gathered for social dancing",
      },
    ],
  },
}

export default function WeekendSalsaBachataPage() {
  return (
    <>
      <GoogleTag />
      <Script id="meta-pixel-weekend-salsa-bachata" strategy="afterInteractive">
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
      <WeekendSalsaBachataTracker />
      <WeekendSalsaBachataClient />
      <p className="sr-only">
        {OFFER.name} at {OFFER.venueName}, {OFFER.addressLine}, {OFFER.cityLine}. Saturday{" "}
        {OFFER.classBlock}.
      </p>
    </>
  )
}
