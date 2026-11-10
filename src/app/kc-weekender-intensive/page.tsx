import type { Metadata } from "next"
import Script from "next/script"
import GoogleTag from "@/components/analytics/GoogleTag"
import {
  INTENSIVE,
  INTENSIVE_ASSETS,
  INTENSIVE_COPY,
  META_PIXEL_ID,
} from "@/lib/kc-weekender/intensive-config"
import KcWeekenderIntensiveClient from "./KcWeekenderIntensiveClient"

export const metadata: Metadata = {
  title: INTENSIVE_COPY.pageTitle,
  description: INTENSIVE_COPY.metaDescription,
  openGraph: {
    title: INTENSIVE.name,
    description: INTENSIVE_COPY.metaDescription,
    url: "https://www.joinstudioe.com/kc-weekender-intensive",
    type: "website",
    images: [
      {
        url: INTENSIVE_ASSETS.hero,
        width: 1200,
        height: 800,
        alt: "Studio E salsa intensive coaching",
      },
    ],
  },
}

export default function KcWeekenderIntensivePage() {
  return (
    <>
      <GoogleTag />
      <Script id="meta-pixel-kc-intensive" strategy="afterInteractive">
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
      <KcWeekenderIntensiveClient />
      <p className="sr-only">
        {INTENSIVE.name}. ${INTENSIVE.price} add-on for full-pass buyers. Cap of {INTENSIVE.capacity}.
      </p>
    </>
  )
}
