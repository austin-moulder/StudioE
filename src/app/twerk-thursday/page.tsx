import type { Metadata } from "next"
import Script from "next/script"
import { Great_Vibes } from "next/font/google"
import GoogleTag from "@/components/analytics/GoogleTag"
import { ASSETS, EVENT, META_PIXEL_ID } from "@/lib/twerk-thursday/config"
import TwerkThursdayClient from "./TwerkThursdayClient"

const scriptFont = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-twerk-script",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Twerk Thursday | Ladies-Only Class at Studio E Chicago",
  description:
    "Ladies-only beginner twerk class in Humboldt Park. $25 ticket, bring a female friend free. Only 20 spots. Thursday 8:30–9:30 PM at Studio E.",
  openGraph: {
    title: "Twerk Thursday — Ladies Only at Studio E",
    description:
      "Judgment-free, women-only twerk night in Humboldt Park. $25, bring a friend free. Cap of 20.",
    url: "https://www.joinstudioe.com/twerk-thursday",
    type: "website",
    images: [
      {
        url: ASSETS.flyer,
        width: 1080,
        height: 1080,
        alt: "Twerk Thursday ladies-only workshop flyer",
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function TwerkThursdayPage() {
  return (
    <div className={scriptFont.variable}>
      <GoogleTag />
      <Script id="meta-pixel-twerk-thursday" strategy="afterInteractive">
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
      <TwerkThursdayClient />
      <p className="sr-only">
        {EVENT.name} at {EVENT.venueName}, {EVENT.addressLine}, {EVENT.cityLine}.
      </p>
    </div>
  )
}
