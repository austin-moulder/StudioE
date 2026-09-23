import type { Metadata } from "next"
import Script from "next/script"
import { Great_Vibes } from "next/font/google"
import GoogleTag from "@/components/analytics/GoogleTag"
import PopupClassLanding from "@/components/popup-class/PopupClassLanding"
import { AFRO_CUBAN_CONFIG, META_PIXEL_ID } from "@/lib/afro-cuban-movement/config"

const scriptFont = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-popup-script",
  display: "swap",
})

const { assets, event } = AFRO_CUBAN_CONFIG

export const metadata: Metadata = {
  title: "Afro-Cuban Movement | Studio E Chicago",
  description:
    "Afro-Cuban movement class in Humboldt Park—muelleo, ondulation, rumba, and a rotating practice of 8 Orishas. $25, bring a friend free. Wednesdays 7:30–8:30 PM. No salsa experience needed.",
  openGraph: {
    title: "Afro-Cuban Movement — Studio E",
    description:
      "Beginner-friendly Afro-Cuban class with Orisha practice. $25, bring a friend free. Cap of 20. No salsa experience required.",
    url: "https://www.joinstudioe.com/afro-cuban-movement",
    type: "website",
    images: [
      {
        url: assets.flyer,
        width: 1080,
        height: 1080,
        alt: "Afro-Cuban Movement class flyer",
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function AfroCubanMovementPage() {
  return (
    <div className={scriptFont.variable}>
      <GoogleTag />
      <Script id="meta-pixel-afro-cuban" strategy="afterInteractive">
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
      <PopupClassLanding config={AFRO_CUBAN_CONFIG} />
      <p className="sr-only">
        {event.name} at {event.venueName}, {event.addressLine}, {event.cityLine}. Wednesdays{" "}
        {event.durationLabel}. No previous salsa experience necessary.
      </p>
    </div>
  )
}
