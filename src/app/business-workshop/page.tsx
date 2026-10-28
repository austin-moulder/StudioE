import type { Metadata } from "next"
import Script from "next/script"
import GoogleTag from "@/components/analytics/GoogleTag"
import BusinessWorkshopClient from "./BusinessWorkshopClient"
import { EVENT, FLYER, META_PIXEL_ID } from "@/lib/business-workshop/config"

export const metadata: Metadata = {
  title: "Build Your Business in 90 Minutes | Studio E Workshop",
  description:
    "Free 90-minute workshop with Austin Moulder. Learn to incorporate a business, build a killer offer, stack social proof, run scalable marketing, and drive sales. Sunday, Nov 22, 3–4:30 PM at Studio E, Chicago.",
  openGraph: {
    title: "Build Your Business in 90 Minutes — Studio E",
    description:
      "Sunday, November 22 · 3:00–4:30 PM. Free workshop for professionals, students, MBAs, and founders.",
    url: "https://www.joinstudioe.com/business-workshop",
    type: "website",
    images: [
      {
        url: FLYER,
        width: 1080,
        height: 1080,
        alt: "Build Your Business in 90 Minutes workshop flyer",
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function BusinessWorkshopPage() {
  return (
    <>
      <GoogleTag />
      <Script id="meta-pixel-business-workshop" strategy="afterInteractive">
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
      <BusinessWorkshopClient />
      <p className="sr-only">
        {EVENT.name} at {EVENT.venueName}, {EVENT.addressLine}. {EVENT.dateLabel},{" "}
        {EVENT.timeLabel}.
      </p>
    </>
  )
}
