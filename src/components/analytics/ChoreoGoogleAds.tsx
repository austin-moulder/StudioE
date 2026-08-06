import Script from "next/script"

export const CHOREO_GOOGLE_ADS_ID = "AW-18365215282"

export default function ChoreoGoogleAds() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${CHOREO_GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="choreo-google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${CHOREO_GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  )
}
