import type { Metadata } from "next"
import Script from "next/script"
import GoogleTag from "@/components/analytics/GoogleTag"
import { DEAL, META_PIXEL_ID, PHOTOS } from "@/lib/grand-opening-deal/config"
import GrandOpeningDealClient from "./GrandOpeningDealClient"

export const metadata: Metadata = {
  title: "Grand Opening Deal | 2 Weeks Unlimited for $49 | Studio E",
  description:
    "Grand Opening deal at Studio E on Paseo Boricua: $49 for 2 weeks of unlimited classes, normally $249. Buy by 11:59 PM on October 24 and redeem anytime before January 1, 2027.",
  openGraph: {
    title: "Grand Opening Deal — 2 Weeks Unlimited for $49",
    description:
      "Normally $249. Buy tonight, redeem before January 1, 2027, and dance unlimited at Studio E.",
    url: "https://www.joinstudioe.com/grand-opening-deal",
    type: "website",
    images: [{ url: PHOTOS[0], alt: "Studio E dancers together" }],
  },
  robots: { index: false, follow: false },
}

export default function GrandOpeningDealPage() {
  return (
    <>
      <GoogleTag />
      <Script id="meta-pixel-grand-opening-deal" strategy="afterInteractive">
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
      <GrandOpeningDealClient />
      <p className="sr-only">
        {DEAL.name} at {DEAL.venueName}, {DEAL.addressLine}, {DEAL.cityLine}. ${DEAL.price} for 2
        weeks of unlimited classes, normally ${DEAL.regularPrice}.
      </p>
    </>
  )
}
