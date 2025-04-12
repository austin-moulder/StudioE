"use client";

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Settings } from "lucide-react"
import { useSupabaseAuth } from "@/lib/hooks/useSupabaseAuth"
import { useState, useEffect } from "react"
import StudioELogo from "./StudioELogo"

// Custom Spotify icon component since it's not included in lucide-react
const Spotify = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M6 12c0-1 2.5-2 6-2s6 1 6 2" />
    <path d="M6 9c0-1 3-2 6-2s6 1 6 2" />
    <path d="M6 15c0-1 3-2 6-2s6 1 6 2" />
  </svg>
);

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const { user } = useSupabaseAuth();
      setUser(user);
    } catch (error) {
      console.error("Error accessing auth context:", error);
    }
  }, []);

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center h-10 w-10">
                <StudioELogo width={40} height={40} alt="Studio E Logo" className="mx-auto" />
              </div>
              <span className="font-montserrat font-bold text-xl">STUDIO E</span>
            </Link>
            <p className="text-sm text-gray-500 mt-2">
              Connecting passionate dance instructors with eager students since 2023.
            </p>
            <div className="mt-4 flex gap-4">
              <Link href="https://www.facebook.com/profile.php?id=61551116319222" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://www.instagram.com/the_studio_e/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://www.youtube.com/@JoinStudioE" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="https://open.spotify.com/show/3SdEa5nSOMzobeGp211vsq?si=e40869ade9934ba6" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
                <Spotify className="h-5 w-5" />
                <span className="sr-only">Spotify</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-montserrat font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-800">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-500 hover:text-gray-800">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/instructors" className="text-gray-500 hover:text-gray-800">
                  Find Instructors
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-500 hover:text-gray-800">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-500 hover:text-gray-800">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-montserrat font-semibold">Dance Styles</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/instructors?search=salsa" className="text-gray-500 hover:text-gray-800">
                  Salsa
                </Link>
              </li>
              <li>
                <Link href="/instructors?search=bachata" className="text-gray-500 hover:text-gray-800">
                  Bachata
                </Link>
              </li>
              <li>
                <Link href="/instructors?search=heels" className="text-gray-500 hover:text-gray-800">
                  Heels
                </Link>
              </li>
              <li>
                <Link href="/instructors?search=hip+hop" className="text-gray-500 hover:text-gray-800">
                  Hip Hop
                </Link>
              </li>
              <li>
                <Link href="/instructors" className="text-gray-500 hover:text-gray-800">
                  Other
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-montserrat font-semibold">Contact</h3>
            <address className="not-italic text-sm text-gray-500">
              <p>2613 W Evergreen Avenue</p>
              <p>Chicago, IL 60622</p>
              <p className="mt-2">Email: studioelatindance@gmail.com</p>
              <p>Phone: (816) 419-6279</p>
            </address>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Studio E. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            {mounted && user && (
              <Link href="/admin/gallery" className="hover:text-gray-800 flex items-center gap-1">
                <Settings className="h-3 w-3" />
                Admin
              </Link>
            )}
            <Link href="#" className="hover:text-gray-800">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gray-800">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-gray-800">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 