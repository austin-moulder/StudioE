import type { Metadata } from "next"
import Script from "next/script"
import GoogleTag from "@/components/analytics/GoogleTag"
import { META_PIXEL_ID, PULSE_PARTNERSHIP_PHOTO } from "@/lib/pulse/config"
import PulseClient from "./PulseClient"

export const metadata: Metadata = {
  title: "Pulse Dance Shoes Recommended by Studio E",
  description:
    "Shop comfortable Latin dance shoes recommended by Studio E for Salsa and Bachata beginners in Chicago.",
  openGraph: {
    title: "Pulse Dance Shoes Recommended by Studio E",
    description:
      "Shop comfortable Latin dance shoes recommended by Studio E for Salsa and Bachata beginners in Chicago.",
    url: "https://www.joinstudioe.com/pulse",
    type: "website",
    images: [
      {
        url: PULSE_PARTNERSHIP_PHOTO,
        width: 1200,
        height: 1500,
        alt: "Studio E partnership with Pulse Dance Shoes",
      },
    ],
  },
}

export default function PulsePage() {
  return (
    <>
      <GoogleTag />
      <Script id="meta-pixel-pulse" strategy="afterInteractive">
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
          fbq('trackCustom', 'PulsePageView');
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
      <PulseClient />
      <p className="sr-only">
        Pulse Dance Shoes recommended by Studio E for Salsa and Bachata beginners in Chicago. Use
        code STUDIOE15 at checkout. Studio E may earn a commission if you purchase through our link.
      </p>
    </>
  )
}
