import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SupabaseAuthProvider } from "@/lib/contexts/SupabaseAuthContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio E | Dance Instruction Marketplace",
  description: "Connect with passionate dance instructors for private lessons tailored to your skill level and goals.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
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
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen flex flex-col">
        <SupabaseAuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SupabaseAuthProvider>
      </body>
    </html>
  );
}
