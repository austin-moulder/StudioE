import type { Metadata } from "next"
import Script from "next/script"
import GoogleTag from "@/components/analytics/GoogleTag"
import {
  ASSETS,
  formatYouthStartLabel,
  getYouthStartMonday,
  META_PIXEL_ID,
  PROGRAM,
} from "@/lib/youth/config"
import YouthClient from "./YouthClient"

/** Start Monday is derived from the request time (now + 2 weeks). */
export const dynamic = "force-dynamic"

export function generateMetadata(): Metadata {
  const startLabel = formatYouthStartLabel(getYouthStartMonday())
  return {
    title: "Chicago Latin Dance Youth Program",
    description: `After-school Latin dance starting ${startLabel}, Monday–Thursday. Ages 5–8 and 9–17. Flexible days with make-ups. Bronze 1×/wk, Gold 2×/wk—16-week session.`,
    openGraph: {
      title: "Chicago Latin Dance Youth Program | Studio E",
      description: `Youth Latin dance at Studio E starts ${startLabel}. Come any Mon–Thu; make up missed days.`,
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
        start {formatYouthStartLabel(getYouthStartMonday())}.
      </p>
    </>
  )
}
