import "./globals.css";
import { Inter, Montserrat } from "next/font/google";
import { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from "@/lib/providers";
import { cn } from "@/lib/utils";
import SchemaOrg from "@/components/SchemaOrg";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "sonner";
import { AnalyticsDebugger } from "@/components/analytics/AnalyticsDebugger";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// Define the Studio E logo URL - use absolute URL to the logo in public folder
const STUDIO_E_LOGO = 'https://www.joinstudioe.com/studio-e-logo.png';

export const metadata: Metadata = {
  title: {
    default: 'Studio E - Dance Classes & Training',
    template: '%s | Studio E'
  },
  description: 'Join Studio E for professional dance classes, training, and workshops. Expert instructors, multiple dance styles, and a welcoming community.',
  keywords: ['dance classes', 'dance training', 'dance studio', 'dance workshops', 'dance community'],
  authors: [{ name: 'Studio E' }],
  creator: 'Studio E',
  publisher: 'Studio E',
  metadataBase: new URL('https://www.joinstudioe.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.joinstudioe.com',
    siteName: 'Studio E',
    title: 'Studio E - Dance Classes & Training',
    description: 'Join Studio E for professional dance classes, training, and workshops. Expert instructors, multiple dance styles, and a welcoming community.',
    images: [{
      url: STUDIO_E_LOGO,
      width: 1200,
      height: 1200,
      alt: 'Studio E - Dance Classes & Training'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio E - Dance Classes & Training',
    description: 'Join Studio E for professional dance classes, training, and workshops. Expert instructors, multiple dance styles, and a welcoming community.',
    images: [STUDIO_E_LOGO]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/studio-e-logo.svg' },
      { url: '/studio-e-logo.png' }
    ],
    shortcut: '/studio-e-logo.png',
    apple: '/studio-e-logo.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-site-verification',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        {/* Explicitly set favicon links */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/studio-e-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/studio-e-logo.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="color-scheme" content="light only" />
        <SchemaOrg />
      </head>
      <body className={cn(inter.variable, montserrat.variable, "min-h-screen flex flex-col bg-white text-black")}>
        <Providers>
          <ScrollToTop />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
          <Toaster />
          <AnalyticsDebugger />
        </Providers>
      </body>
    </html>
  );
}
