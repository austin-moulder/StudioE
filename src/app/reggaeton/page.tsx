import type { Metadata } from "next"
import Script from "next/script"
import { Great_Vibes } from "next/font/google"
import GoogleTag from "@/components/analytics/GoogleTag"
import PopupClassLanding from "@/components/popup-class/PopupClassLanding"
import { META_PIXEL_ID, REGGAETON_CONFIG } from "@/lib/reggaeton/config"

const scriptFont = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-popup-script",
  display: "swap",
})

const { assets, event } = REGGAETON_CONFIG

export const metadata: Metadata = {
  title: "Reggaeton Class | Studio E Chicago Humboldt Park",
  description:
    "Beginner-friendly reggaeton class in Humboldt Park. $25 ticket, bring a friend free. Only 20 spots. Wednesday 7:30–8:30 PM at Studio E.",
  openGraph: {
    title: "Reggaeton Night at Studio E",
    description:
      "High-energy reggaeton class in Humboldt Park. $25, bring a friend free. Cap of 20.",
    url: "https://www.joinstudioe.com/reggaeton",
    type: "website",
    images: [
      {
        url: assets.flyer,
        width: 1080,
        height: 1080,
        alt: "Reggaeton class flyer at Studio E",
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function ReggaetonPage() {
  return (
    <div className={scriptFont.variable}>
      <GoogleTag />
      <Script id="meta-pixel-reggaeton" strategy="afterInteractive">
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
      <PopupClassLanding config={REGGAETON_CONFIG} />
      <p className="sr-only">
        {event.name} at {event.venueName}, {event.addressLine}, {event.cityLine}.
      </p>
    </div>
  )
}
