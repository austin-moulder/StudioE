"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import StudioELogo from "./StudioELogo";
import AuthNavbarSection from "./auth/AuthNavbarSection";
import { useAuth } from "@/lib/auth/auth-context";
import SignInModal from "./auth/SignInModal";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Instructors", href: "/instructors" },
  { name: "Classes", href: "/classes" },
  { name: "Events", href: "/events" },
  { name: "Podcast", href: "/podcast" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const { user } = useAuth();

  // Prevent hydration mismatch
  useEffect(() => {
    // Only set mounted to true on the client side
    if (typeof window !== "undefined") {
      setMounted(true);
    }
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10"></div>
            <span className="font-montserrat font-bold text-xl">STUDIO E</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center h-10 w-10">
            <StudioELogo
              width={40}
              height={40}
              alt="Studio E Logo"
              priority
              className="mx-auto"
            />
          </div>
          <span className="font-montserrat font-bold text-xl">STUDIO E</span>
        </Link>

        <nav className="hidden md:flex md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-gray-600"
            >
              {link.name}
            </Link>
          ))}
          
          {/* Dashboard link - only visible when user is logged in */}
          {user && (
            <Link 
              href="/dashboard" 
              className="text-sm font-medium text-[#EC407A] hover:text-[#D03A6C] transition-colors"
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {/* Auth section - only display when user is logged in */}
          {user && (
            <div className="hidden md:block">
              <AuthNavbarSection />
            </div>
          )}

          {!user && (
            <button 
              onClick={() => setShowSignInModal(true)}
              className="hidden rounded-md bg-[#EC407A] px-3 py-1.5 text-sm font-medium text-white md:block hover:bg-[#D03A6C]"
            >
              Get Started
            </button>
          )}

          <button
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      {/* Mobile menu - using a slide-in animation */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Semi-transparent overlay for contrast with animation */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        {/* Menu container - full width */}
        <div
          className={`absolute top-0 right-0 h-full w-full bg-white/90 backdrop-blur-sm shadow-xl transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between p-4 border-b border-gray-300 bg-white/90">
            <div className="flex items-center gap-2">
              <StudioELogo
                width={36}
                height={36}
                alt="Studio E Logo"
                className="mx-auto"
              />
              <span className="font-montserrat font-bold text-lg">STUDIO E</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100/90 transition"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="px-6 py-6 flex flex-col bg-white/90">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="py-3 text-base font-semibold text-gray-900 border-b border-gray-200 transition-colors hover:text-[#EC407A]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-6 space-y-4 bg-white/90">
              {/* Mobile auth section - only display when user is logged in */}
              {user && (
                <div className="mb-4" onClick={() => setMobileMenuOpen(false)}>
                  <AuthNavbarSection />
                </div>
              )}

              {!user && (
                <button 
                  onClick={() => {
                    setShowSignInModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-md bg-[#EC407A] px-4 py-3 text-sm font-bold text-white hover:bg-[#D03A6C] transition shadow-md"
                >
                  Get Started
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Sign in modal */}
      <SignInModal 
        isOpen={showSignInModal} 
        onClose={() => setShowSignInModal(false)} 
      />
    </header>
  );
} 