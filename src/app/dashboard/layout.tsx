"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, User, Calendar, CreditCard, BookOpen, Image, Settings } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted yet, don't render anything to avoid hydration mismatch
  if (!mounted) return null;

  // If not loading and no user, redirect to sign in
  if (!isLoading && !user) {
    redirect("/");
  }

  const sidebarLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/dashboard/bookings", label: "Bookings", icon: Calendar },
    { href: "/dashboard/classes", label: "My Classes", icon: BookOpen },
    { href: "/dashboard/gallery", label: "Gallery", icon: Image },
    { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden">
        {/* Mobile navigation implementation would go here */}
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r bg-white">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
            <span className="text-xl font-semibold">Studio E</span>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-100 hover:text-[#EC407A] transition-colors"
                >
                  <Icon className="mr-3 h-5 w-5 text-gray-500" aria-hidden="true" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
} 