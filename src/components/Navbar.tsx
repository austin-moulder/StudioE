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

          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Semi-transparent overlay for contrast */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          
          {/* Menu container - positioned below navbar */}
          <div className="relative h-full bg-background pt-16">
            <div className="container flex h-16 items-center justify-end absolute top-0 right-0 left-0">
              <button onClick={() => setMobileMenuOpen(false)} className="p-2" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="container mt-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium transition-colors hover:text-gray-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="mt-6 flex flex-col gap-4">
                {!loading && (
                  <>
                    {user ? (
                      <div className="mb-4">
                        <div className="flex items-center gap-3 mb-4">
                          {user.photoURL && (
                            <Image 
                              src={user.photoURL} 
                              alt={user.displayName || "User"} 
                              width={40} 
                              height={40} 
                              className="rounded-full" 
                            />
                          )}
                          <span className="text-md font-medium">{user.displayName || 'User'}</span>
                        </div>
                        <button 
                          onClick={() => {
                            signOut();
                            setMobileMenuOpen(false);
                          }}
                          className="w-full flex items-center justify-center gap-2 rounded-md border border-red-500 bg-white px-4 py-2 text-sm font-medium text-red-500"
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
                        className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm font-medium"
                      >
                        Sign In
                      </button>
                    )}
                  </>
                )}
                <Link href="https://forms.gle/ENvPqjyLuEGHMpqi6" target="_blank" rel="noopener noreferrer">
                  <button className="w-full rounded-md bg-[#EC407A] px-4 py-2 text-sm font-medium text-white">
                    Get Started
                  </button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
} 