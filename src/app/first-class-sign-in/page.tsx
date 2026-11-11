import type { Metadata } from "next"
import FirstClassSignInClient from "./FirstClassSignInClient"

export const metadata: Metadata = {
  title: "Welcome to Your First Class | Studio E Chicago",
  description:
    "You’re in the right place. Sign in for your first class at Studio E, 2657 W Division St, Humboldt Park.",
  openGraph: {
    title: "Welcome to Your First Class | Studio E",
    description: "A soft place to land before your first class. Sign in below.",
    url: "https://www.joinstudioe.com/first-class-sign-in",
    type: "website",
    images: [
      {
        url: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/DSC05448.jpg",
        width: 1200,
        height: 800,
        alt: "Studio E dancers welcoming each other on the floor",
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function FirstClassSignInPage() {
  return <FirstClassSignInClient />
}
