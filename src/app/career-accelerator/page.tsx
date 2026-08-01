import type { Metadata } from "next"
import Script from "next/script"
import GoogleTag from "@/components/analytics/GoogleTag"
import CareerAcceleratorClient from "./CareerAcceleratorClient"

const META_PIXEL_ID = "1976276599649833"

export const metadata: Metadata = {
  title: "Career Accelerator | Studio E 8-Week Career Bootcamp",
  description:
    "Studio E’s 8-week Career Accelerator in Humboldt Park, Chicago. Learn real marketing, operations, sales, and recruiting skills inside a live business—and position yourself for real opportunities.",
  openGraph: {
    title: "Career Accelerator – 8-Week Career Bootcamp at Studio E",
    description:
      "Learn real marketing, ops, sales, and recruiting skills in a live, hands-on environment at Studio E HQ.",
    url: "https://www.joinstudioe.com/career-accelerator",
    type: "website",
  },
}

export default function CareerAcceleratorPage() {
  return (
    <>
      <GoogleTag />
      <Script id="meta-pixel-career-accelerator" strategy="afterInteractive">
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
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <CareerAcceleratorClient />
    </>
  )
}
