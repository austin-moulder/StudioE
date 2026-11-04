import type { Metadata } from "next"
import Script from "next/script"
import GoogleTag from "@/components/analytics/GoogleTag"
import { ASSETS, COPY, EVENT, META_PIXEL_ID, PRICING } from "@/lib/kc-weekender/config"
import KcWeekenderClient from "./KcWeekenderClient"

export const metadata: Metadata = {
  title: COPY.pageTitle,
  description: COPY.metaDescription,
  openGraph: {
    title: EVENT.name,
    description: COPY.metaDescription,
    url: "https://www.joinstudioe.com/kc-weekender",
    type: "website",
    images: [
      {
        url: ASSETS.hero,
        width: 1200,
        height: 800,
        alt: "Studio E salsa instruction",
      },
    ],
  },
}

export default function KcWeekenderPage() {
  return (
    <>
      <GoogleTag />
      <Script id="meta-pixel-kc-weekender" strategy="afterInteractive">
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
      <KcWeekenderClient />
      <p className="sr-only">
        {EVENT.name}. Full pass ${PRICING.fullPass}. Single class ${PRICING.single}. Three salsa
        classes in Kansas City with Studio E.
      </p>
    </>
  )
}
