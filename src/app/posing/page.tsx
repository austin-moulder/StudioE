import type { Metadata } from "next"
import Script from "next/script"
import { Great_Vibes } from "next/font/google"
import GoogleTag from "@/components/analytics/GoogleTag"
import PopupClassLanding from "@/components/popup-class/PopupClassLanding"
import { META_PIXEL_ID, POSING_CONFIG } from "@/lib/posing/config"

const scriptFont = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-popup-script",
  display: "swap",
})

const { assets, event } = POSING_CONFIG

export const metadata: Metadata = {
  title: "Pose With Confidence | Chicago Fashion Week Posing Workshop at Studio E",
  description:
    "Look better in every photo with dynamic poses from professional Latin dancers and photographers. Oct 18, 3–6 PM in Paseo Boricua. $150 includes a pro photoshoot, hair and makeup, and 5 edited photos.",
  openGraph: {
    title: "Pose With Confidence — Chicago Fashion Week at Studio E",
    description:
      "3-hour posing workshop + directed pro photoshoot in Paseo Boricua. Oct 18, 3–6 PM. $150 with hair, makeup, and 5 edited photos.",
    url: "https://www.joinstudioe.com/posing",
    type: "website",
    images: [
      {
        url: assets.flyer,
        width: 1080,
        height: 1080,
        alt: "Pose With Confidence posing workshop flyer",
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function PosingPage() {
  return (
    <div className={scriptFont.variable}>
      <GoogleTag />
      <Script id="meta-pixel-posing" strategy="afterInteractive">
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
      <PopupClassLanding config={POSING_CONFIG} />
      <p className="sr-only">
        {event.name} at {event.venueName}, {event.addressLine}, {event.cityLine}. Sunday, October
        18, {event.durationLabel}. Part of Chicago Fashion Week.
      </p>
    </div>
  )
}
