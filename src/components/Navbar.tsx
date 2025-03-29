"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, LogOut } from "lucide-react"
import { useAuth } from "@/lib/hooks/useAuth"
import FirebaseLogo from "./FirebaseLogo"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Instructors", href: "/instructors" },
  { name: "Events", href: "/events" },
  { name: "Podcast", href: "/podcast" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { user, loading, signInWithGoogle, signOut } = useAuth()

  // Prevent hydration mismatch
  useEffect(() => {
    // Only set mounted to true on the client side
    if (typeof window !== "undefined") {
      setMounted(true)
    }
  }, [])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

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
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center h-10 w-36">
            <FirebaseLogo width={125} height={40} alt="Studio E Logo" priority className="mx-auto" />
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
        </nav>

        <div className="flex items-center gap-4">
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="hidden md:block">
                    <div className="flex items-center gap-2">
                      {user.photoURL && (
                        <Image 
                          src={user.photoURL} 
                          alt={user.displayName || "User"} 
                          width={32} 
                          height={32} 
                          className="rounded-full" 
                        />
                      )}
                      <span className="text-sm font-medium">{user.displayName?.split(' ')[0] || 'User'}</span>
                    </div>
                  </div>
                  <button 
                    onClick={signOut}
                    className="hidden items-center gap-1 text-sm font-medium text-red-500 hover:text-red-600 md:flex"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={signInWithGoogle}
                  className="text-sm font-medium"
                >
                  Sign In
                </button>
              )}
            </>
          )}
          
          <Link href="https://forms.gle/ENvPqjyLuEGHMpqi6" target="_blank" rel="noopener noreferrer">
            <button className="hidden rounded-md bg-[#EC407A] px-3 py-1.5 text-sm font-medium text-white md:block">
              Get Started
            </button>
          </Link>

          <button 
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100" 
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
        
        {/* Menu container - slide in from right */}
        <div 
          className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white/90 backdrop-blur-sm shadow-xl transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4 border-b border-gray-300 bg-white/90">
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
              {!loading && (
                <>
                  {user ? (
                    <div className="pb-4">
                      <div className="flex items-center gap-3 mb-4 p-3 bg-white/90 border border-gray-200 rounded-lg">
                        {user.photoURL && (
                          <Image 
                            src={user.photoURL} 
                            alt={user.displayName || "User"} 
                            width={40} 
                            height={40} 
                            className="rounded-full" 
                          />
                        )}
                        <span className="text-md font-medium text-gray-900">{user.displayName || 'User'}</span>
                      </div>
                      <button 
                        onClick={() => {
                          signOut();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 rounded-md border-2 border-red-500 bg-white/90 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50/90 transition"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => {
                        signInWithGoogle();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full rounded-md border-2 border-gray-300 bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50/90 transition"
                    >
                      Sign In
                    </button>
                  )}
                </>
              )}
              <Link href="https://forms.gle/ENvPqjyLuEGHMpqi6" target="_blank" rel="noopener noreferrer" className="block">
                <button className="w-full rounded-md bg-[#EC407A] px-4 py-3 text-sm font-bold text-white hover:bg-[#D03A6C] transition shadow-md">
                  Get Started
                </button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
} 