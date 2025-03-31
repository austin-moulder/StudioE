"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, LogOut, Mail, User } from "lucide-react"
import { useSupabaseAuth } from "@/lib/hooks/useSupabaseAuth"
import StudioELogo from "./StudioELogo"

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
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [email, setEmail] = useState("")
  const { user, loading, signInWithGoogle, signInWithEmail, signOut, authError, clearAuthError } = useSupabaseAuth()

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

  const handleSignIn = async () => {
    await signInWithGoogle()
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      await signInWithEmail(email)
    }
  }

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
        <Link href="/" className="flex items-center gap-1">
          <div className="flex items-center justify-center h-10 w-28">
            <StudioELogo width={120} height={40} alt="Studio E Logo" priority className="mx-auto" />
          </div>
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

        <div className="flex items-center gap-2">
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="hidden md:block">
                    <div className="flex items-center gap-2">
                      {user.user_metadata?.avatar_url ? (
                        <Image 
                          src={user.user_metadata.avatar_url} 
                          alt={user.user_metadata?.full_name || "User"} 
                          width={32} 
                          height={32} 
                          className="rounded-full" 
                        />
                      ) : (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                      )}
                      <span className="text-sm font-medium">{user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'User'}</span>
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
                <div className="relative">
                  {showEmailForm ? (
                    <div className="absolute right-0 mt-2 w-64 p-4 bg-white rounded-md shadow-lg border z-50">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium">Sign in with Email</h3>
                        <button 
                          onClick={() => {
                            setShowEmailForm(false);
                            clearAuthError();
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      {authError && !authError.includes("Check your email") && (
                        <p className="text-xs text-red-500 mb-2">{authError}</p>
                      )}
                      {authError && authError.includes("Check your email") && (
                        <p className="text-xs text-green-500 mb-2">{authError}</p>
                      )}
                      <form onSubmit={handleEmailSignIn}>
                        <input
                          type="email"
                          placeholder="Your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-2 text-sm border rounded-md mb-2"
                          required
                        />
                        <button
                          type="submit"
                          className="w-full flex justify-center items-center gap-1 bg-[#EC407A] text-white p-2 rounded-md text-sm"
                        >
                          <Mail className="h-4 w-4" />
                          Send Magic Link
                        </button>
                      </form>
                      <div className="mt-2 text-center">
                        <button 
                          onClick={handleSignIn}
                          className="text-xs text-gray-600 hover:text-gray-900"
                        >
                          Try Google Sign In
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setShowEmailForm(true)}
                      className="text-sm font-medium"
                    >
                      Sign In
                    </button>
                  )}
                </div>
              )}
            </>
          )}
          
          <Link href="https://forms.gle/ENvPqjyLuEGHMpqi6" target="_blank" rel="noopener noreferrer">
            <button className="hidden rounded-md bg-[#EC407A] px-3 py-1.5 text-sm font-medium text-white md:block">
              Get Started
            </button>
          </Link>

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
            <div className="flex items-center h-8 w-24">
              <StudioELogo width={96} height={32} alt="Studio E Logo" className="mx-auto" />
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
              {!loading && (
                <>
                  {user ? (
                    <div className="pb-4">
                      <div className="flex items-center gap-3 mb-4 p-3 bg-white/90 border border-gray-200 rounded-lg">
                        {user.user_metadata?.avatar_url ? (
                          <Image 
                            src={user.user_metadata.avatar_url} 
                            alt={user.user_metadata?.full_name || "User"} 
                            width={40} 
                            height={40} 
                            className="rounded-full" 
                          />
                        ) : (
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
                            <User className="h-6 w-6 text-gray-500" />
                          </div>
                        )}
                        <span className="text-md font-medium text-gray-900">{user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}</span>
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
                    <div>
                      <button 
                        onClick={() => setShowEmailForm(true)}
                        className="w-full rounded-md border-2 border-gray-300 bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50/90 transition mb-3"
                      >
                        Sign In
                      </button>
                      
                      {showEmailForm && (
                        <div className="p-4 bg-white/90 rounded-md border mb-3">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-medium">Sign in with Email</h3>
                            <button 
                              onClick={() => {
                                setShowEmailForm(false);
                                clearAuthError();
                              }}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          {authError && !authError.includes("Check your email") && (
                            <p className="text-xs text-red-500 mb-2">{authError}</p>
                          )}
                          {authError && authError.includes("Check your email") && (
                            <p className="text-xs text-green-500 mb-2">{authError}</p>
                          )}
                          <form onSubmit={handleEmailSignIn}>
                            <input
                              type="email"
                              placeholder="Your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full p-2 text-sm border rounded-md mb-2"
                              required
                            />
                            <button
                              type="submit"
                              className="w-full flex justify-center items-center gap-1 bg-[#EC407A] text-white p-2 rounded-md text-sm"
                            >
                              <Mail className="h-4 w-4" />
                              Send Magic Link
                            </button>
                            <div className="mt-2 text-center">
                              <button 
                                onClick={handleSignIn}
                                className="text-xs text-gray-600 hover:text-gray-900"
                              >
                                Try Google Sign In
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
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