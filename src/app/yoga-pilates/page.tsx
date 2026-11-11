import type { Metadata } from "next"
import Script from "next/script"
import { Great_Vibes } from "next/font/google"
import GoogleTag from "@/components/analytics/GoogleTag"
import PopupClassLanding from "@/components/popup-class/PopupClassLanding"
import { META_PIXEL_ID, YOGA_PILATES_CONFIG } from "@/lib/yoga-pilates/config"

const scriptFont = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-popup-script",
  display: "swap",
})

const { assets, event } = YOGA_PILATES_CONFIG

export const metadata: Metadata = {
  title: "Yoga + Pilates Saturday | Studio E Chicago",
  description:
    "Latina-focused wellness in Humboldt Park. Saturdays: yoga at 10 AM, pilates at 11 AM. Full workshop $35 or one class $25—friend free. Mats available to rent at 2659 W Division St.",
  openGraph: {
    title: "Yoga + Pilates Saturday — Studio E",
    description:
      "Reset your Saturday morning. Yoga 10 AM · Pilates 11 AM. Friend free. Full workshop $35 or one class $25.",
    url: "https://www.joinstudioe.com/yoga-pilates",
    type: "website",
    images: [
      {
        url: assets.flyer,
        width: 1080,
        height: 1080,
        alt: "Yoga + Pilates Saturday workshop flyer",
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function YogaPilatesPage() {
  return (
    <div className={scriptFont.variable}>
      <GoogleTag />
      <Script id="meta-pixel-yoga-pilates" strategy="afterInteractive">
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
      <PopupClassLanding config={YOGA_PILATES_CONFIG} />
      <p className="sr-only">
        {event.name} at {event.venueName}, {event.addressLine}, {event.cityLine}.{" "}
        {event.durationLabel}.
      </p>
    </div>
  )
}
