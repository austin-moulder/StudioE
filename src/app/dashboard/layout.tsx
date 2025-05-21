"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import {
  CircleUser,
  Calendar,
  Menu,
  X,
  Home,
  BookOpen,
  MessageSquare,
  CreditCard,
  Settings,
  MessageCircle,
  CalendarDays,
  Users,
  Star,
  LogOut,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/useAuth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormButton } from "@/components/ui/form-button";
import MobileNavbar from "@/components/dashboard/MobileNavbar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, isLoading } = useAuth();
  const pathname = "/dashboard";

  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted yet, don't render anything to avoid hydration mismatch
  if (!mounted) return null;

  // If not loading and no user, redirect to sign in
  if (!isLoading && !user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 z-40 w-full bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {sidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <span className="ml-3 text-lg font-medium">Dashboard</span>
          </div>
        </div>
      </div>

      {/* Sidebar for mobile (off-canvas) */}
      <div
        className={cn(
          "fixed inset-0 z-30 lg:hidden bg-gray-600 bg-opacity-75 transition-opacity duration-300",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 transform transition-transform duration-300 ease-in-out bg-white border-r lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b">
            <Link href="/" className="text-xl font-bold text-[#EC407A]">
              Studio E
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Home className="h-5 w-5 mr-3 text-gray-500" />
                  Dashboard Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/privates"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md"
                  onClick={() => setSidebarOpen(false)}
                >
                  <BookOpen className="h-5 w-5 mr-3 text-gray-500" />
                  My Private Lessons
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/lessons"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FileText className="h-5 w-5 mr-3 text-gray-500" />
                  Lesson Invoices
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/events"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                  Events & Workshops
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/messages"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md"
                  onClick={() => setSidebarOpen(false)}
                >
                  <MessageCircle className="h-5 w-5 mr-3 text-gray-500" />
                  Messages
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/payments"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md"
                  onClick={() => setSidebarOpen(false)}
                >
                  <CreditCard className="h-5 w-5 mr-3 text-gray-500" />
                  Payments & Billing
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Settings className="h-5 w-5 mr-3 text-gray-500" />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t">
            <Link
              href="/profile"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md"
              onClick={() => setSidebarOpen(false)}
            >
              <CircleUser className="h-5 w-5 mr-3 text-gray-500" />
              Profile
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64 pt-16 lg:pt-0 pb-20 lg:pb-0">
        <main className="min-h-screen bg-gray-50">{children}</main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNavbar />
    </div>
  );
} 