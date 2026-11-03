import type { Metadata } from "next"
import GetStartedClient from "./GetStartedClient"
import { COPY, IMAGES } from "@/lib/get-started/config"

export const metadata: Metadata = {
  title: COPY.pageTitle,
  description: COPY.metaDescription,
  openGraph: {
    title: COPY.pageTitle,
    description: COPY.metaDescription,
    images: [{ url: IMAGES.hero, width: 1200, height: 800, alt: "Studio E private dance lesson" }],
  },
}

export default function GetStartedPage() {
  return <GetStartedClient />
}
