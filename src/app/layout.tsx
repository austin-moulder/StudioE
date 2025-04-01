import "./globals.css";
import { Inter, Montserrat } from "next/font/google";
import { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from "@/lib/providers";
import { cn } from "@/lib/utils";

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
        url: "/studio-e-logo.svg",
        width: 1200,
        height: 630,
        alt: "Studio E Logo"
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio E | Dance Instruction Marketplace",
    description: "Connect with passionate dance instructors for private lessons tailored to your skill level and goals.",
    images: ["/studio-e-logo.svg"],
  },
  icons: {
    icon: [
      { url: "/studio-e-logo.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/studio-e-logo.svg" }
    ],
    shortcut: [
      { url: "/studio-e-logo.svg" }
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
      </head>
      <body className={cn(inter.variable, montserrat.variable, "min-h-screen flex flex-col bg-white text-black")}>
        <Providers>
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
