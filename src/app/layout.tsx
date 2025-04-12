import "./globals.css";
import { Inter, Montserrat } from "next/font/google";
import { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from "@/lib/providers";
import { cn } from "@/lib/utils";
import SchemaOrg from "@/components/SchemaOrg";
import ScrollToTop from "@/components/ScrollToTop";

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

export const metadata: Metadata = {
  title: "Studio E | Dance Instruction Marketplace",
  description: "Connect with passionate dance instructors for private lessons tailored to your skill level and goals.",
  metadataBase: new URL('https://studioe.dance'),
  openGraph: {
    title: "Studio E | Dance Instruction Marketplace",
    description: "Connect with passionate dance instructors for private lessons tailored to your skill level and goals.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 1200,
        alt: "Studio E Logo"
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio E | Dance Instruction Marketplace",
    description: "Connect with passionate dance instructors for private lessons tailored to your skill level and goals.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/images/og-image.jpg", type: "image/jpeg" },
    ],
    apple: [
      { url: "/images/og-image.jpg" }
    ],
    shortcut: [
      { url: "/images/og-image.jpg" }
    ],
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
        <link rel="icon" href="/studio-e-logo.svg" type="image/svg+xml" />
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
        </Providers>
      </body>
    </html>
  );
}
