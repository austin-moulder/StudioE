import type { Metadata } from "next"
import Script from "next/script"
import GoogleTag from "@/components/analytics/GoogleTag"
import { IMAGES, META_PIXEL_ID } from "@/lib/class-confirmation/config"
import ClassConfirmationClient from "./ClassConfirmationClient"

export const metadata: Metadata = {
  title: "You’re Confirmed | Studio E Class Upsell",
  description:
    "Thanks for signing up at Studio E. Claim a limited-time 50% off private lesson before or after your class.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "You’re Confirmed | Studio E",
    description: "Claim 50% off a private lesson to prepare for your first class.",
    url: "https://www.joinstudioe.com/class-confirmation",
    type: "website",
    images: [{ url: IMAGES.hero, width: 1200, height: 800, alt: "Studio E private lesson" }],
  },
}

export default function ClassConfirmationPage() {
  return (
    <>
      <GoogleTag />
      <Script id="meta-pixel-class-confirmation" strategy="afterInteractive">
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
      <ClassConfirmationClient />
    </>
  )
}
