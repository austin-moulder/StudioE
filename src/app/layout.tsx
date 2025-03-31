import "./globals.css";
import { Inter, Montserrat } from "next/font/google";
import { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { cn } from "@/lib/utils";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SupabaseAuthProvider } from "@/lib/contexts/SupabaseAuthContext";

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
    <html lang="en">
      <head>
        <link rel="icon" href="/studio-e-logo.svg" type="image/svg+xml" />
      </head>
      <body className={cn(inter.variable, montserrat.variable, "min-h-screen flex flex-col")}>
        <SupabaseAuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SupabaseAuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
