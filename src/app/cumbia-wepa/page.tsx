import type { Metadata } from "next"
import Script from "next/script"
import { Great_Vibes } from "next/font/google"
import GoogleTag from "@/components/analytics/GoogleTag"
import PopupClassLanding from "@/components/popup-class/PopupClassLanding"
import { CUMBIA_WEPA_CONFIG, META_PIXEL_ID } from "@/lib/cumbia-wepa/config"

const scriptFont = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-popup-script",
  display: "swap",
})

const { assets, event } = CUMBIA_WEPA_CONFIG

export const metadata: Metadata = {
  title: "Cumbia Wepa Workshop | Studio E Chicago",
  description:
    "Mexican street-style cumbia wepa footwork workshop in Humboldt Park. $25 ticket, bring a friend free. Thursdays 6:30–7:30 PM at Studio E.",
  openGraph: {
    title: "Cumbia Wepa Workshop — Studio E",
    description:
      "Learn wepa footwork in a beginner-friendly Thursday workshop. $25, bring a friend free. Cap of 20.",
    url: "https://www.joinstudioe.com/cumbia-wepa",
    type: "website",
    images: [
      {
        url: assets.flyer,
        width: 1080,
        height: 1080,
        alt: "Cumbia Wepa Workshop flyer",
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function CumbiaWepaPage() {
  return (
    <div className={scriptFont.variable}>
      <GoogleTag />
      <Script id="meta-pixel-cumbia-wepa" strategy="afterInteractive">
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
      <PopupClassLanding config={CUMBIA_WEPA_CONFIG} />
      <p className="sr-only">
        {event.name} at {event.venueName}, {event.addressLine}, {event.cityLine}. Thursdays{" "}
        {event.durationLabel}.
      </p>
    </div>
  )
}
