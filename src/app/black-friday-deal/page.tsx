import type { Metadata } from "next"
import Script from "next/script"
import GoogleTag from "@/components/analytics/GoogleTag"
import { ASSETS, COPY, META_PIXEL_ID, PRICING, VENUE } from "@/lib/black-friday-deal/config"
import BlackFridayDealClient from "./BlackFridayDealClient"

export const metadata: Metadata = {
  title: COPY.pageTitle,
  description: COPY.metaDescription,
  openGraph: {
    title: COPY.pageTitle,
    description: COPY.metaDescription,
    url: "https://www.joinstudioe.com/black-friday-deal",
    type: "website",
    images: [
      {
        url: ASSETS.hero,
        width: 1200,
        height: 800,
        alt: "Studio E Black Friday BOGO Month — 2 months for the price of 1",
      },
    ],
  },
}

export default function BlackFridayDealPage() {
  return (
    <>
      <GoogleTag />
      <Script id="meta-pixel-black-friday" strategy="afterInteractive">
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
      <BlackFridayDealClient />
      <p className="sr-only">
        {COPY.offerName} at {VENUE.name}, {VENUE.addressLine}, {VENUE.cityLine}. Gold Plan $
        {PRICING.goldRate} for the first 28 days with the next 28 days credited free. New members
        only. Launches Friday November 27 2026 at 7 AM Chicago time. Ends 7 PM the same day. 20
        passes only.
      </p>
    </>
  )
}
