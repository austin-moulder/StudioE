import type { Metadata } from "next"
import Script from "next/script"
import InstructorLabClient from "./InstructorLabClient"

const META_PIXEL_ID = "1976276599649833"

export const metadata: Metadata = {
  title: "LDIC Program | Studio E Latin Dance Instructor Certification",
  description:
    "Studio E’s 8-week Latin Dance Instructor Certification (LDIC) Program in Humboldt Park, Chicago. Learn the Studio E method, teach real students, and earn your spot on the paid instructor team.",
  openGraph: {
    title: "Studio E LDIC – Latin Dance Instructor Certification Program",
    description:
      "Turn your love for Salsa, Bachata, and Cumbia into a leadership role at Chicago’s fastest growing Latin dance studio.",
    url: "https://www.joinstudioe.com/instructor-lab",
    type: "website",
  },
}

export default function InstructorLabPage() {
  return (
    <>
      <Script id="meta-pixel-instructor-lab" strategy="afterInteractive">
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
      <InstructorLabClient />
    </>
  )
}
