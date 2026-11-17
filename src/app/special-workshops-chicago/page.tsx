import type { Metadata } from "next"
import Script from "next/script"
import { Great_Vibes } from "next/font/google"
import GoogleTag from "@/components/analytics/GoogleTag"
import {
  COPY,
  META_PIXEL_ID,
  VENUE,
  WORKSHOPS,
} from "@/lib/special-workshops-chicago/config"
import SpecialWorkshopsClient from "./SpecialWorkshopsClient"

const scriptFont = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-specialty-script",
  display: "swap",
})

export const metadata: Metadata = {
  title: COPY.pageTitle,
  description: COPY.metaDescription,
  openGraph: {
    title: COPY.pageTitle,
    description: COPY.metaDescription,
    url: "https://www.joinstudioe.com/special-workshops-chicago",
    type: "website",
    images: [
      {
        url: WORKSHOPS[0].flyer,
        width: 1080,
        height: 1080,
        alt: WORKSHOPS[0].flyerAlt,
      },
    ],
  },
}

export default function SpecialWorkshopsChicagoPage() {
  return (
    <div className={scriptFont.variable}>
      <GoogleTag />
      <Script id="meta-pixel-special-workshops" strategy="afterInteractive">
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
      <SpecialWorkshopsClient />
      <p className="sr-only">
        Three advanced Christmas Latin dance workshops at {VENUE.name}, {VENUE.addressLine},{" "}
        {VENUE.cityLine}. Thursdays December 3, 10, and 17 from 8:30–10:00 PM. $30 ticket includes
        one friend free. Wepa Wonderland, Unwrap the Rhythm, and Salsa Shines with Santa. Cap of
        20 tickets per workshop.
      </p>
    </div>
  )
}
