import type { Metadata } from "next"
import Script from "next/script"
import GoogleTag from "@/components/analytics/GoogleTag"
import { META_PIXEL_ID } from "@/lib/youth/enroll-config"
import YouthEnrollClient from "./YouthEnrollClient"

export const metadata: Metadata = {
  title: "Youth Program Enrollment",
  description:
    "Complete your Chicago Latin Dance Youth Program enrollment. Tell us about your child so we can get them ready for class at Studio E.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Youth Program Enrollment | Studio E",
    description: "Submit your child’s enrollment details for the Studio E Youth Program.",
    url: "https://www.joinstudioe.com/youth/enroll",
    type: "website",
  },
}

export default function YouthEnrollPage() {
  return (
    <>
      <GoogleTag />
      <Script id="meta-pixel-youth-enroll" strategy="afterInteractive">
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
      <YouthEnrollClient />
      <p className="sr-only">
        Complete your Studio E Youth Program enrollment by submitting information about each child.
      </p>
    </>
  )
}
