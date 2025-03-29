"use client";

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Settings } from "lucide-react"
import { useAuth } from "@/lib/hooks/useAuth"
import { useState, useEffect } from "react"
import FirebaseLogo from "./FirebaseLogo"

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const { user } = useAuth();
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
              <div className="flex items-center justify-center h-10 w-36">
                <FirebaseLogo width={125} height={40} alt="Studio E Logo" className="mx-auto" />
              </div>
              <span className="font-montserrat font-bold text-xl">STUDIO E</span>
            </Link>
            <p className="text-sm text-gray-500 mt-2">
              Connecting passionate dance instructors with eager students since 2023.
            </p>
            <div className="mt-4 flex gap-4">
              <Link href="#" className="text-gray-500 hover:text-gray-800">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-800">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-800">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-800">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
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
                <Link href="#" className="text-gray-500 hover:text-gray-800">
                  Latin
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-800">
                  Hip Hop
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-800">
                  Contemporary
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-800">
                  Jazz
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-800">
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