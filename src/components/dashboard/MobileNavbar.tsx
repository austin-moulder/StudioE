"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  BookOpen, 
  Calendar, 
  MessageCircle, 
  Menu,
  CreditCard,
  FileText
} from "lucide-react";

export default function MobileNavbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Only show on dashboard paths and on mobile
  if (!pathname.startsWith("/dashboard")) return null;

  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") {
      return true;
    }
    if (path !== "/dashboard" && pathname.includes(path)) {
      return true;
    }
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 lg:hidden">
      <div className="grid grid-cols-6 h-16">
        <Link 
          href="/dashboard" 
          className="flex flex-col items-center justify-center relative"
        >
          {isActive("/dashboard") && <div className="absolute top-0 w-12 h-1 bg-[#EC407A] rounded-b-full"></div>}
          <Home className={`h-5 w-5 ${isActive("/dashboard") ? "text-[#EC407A]" : "text-gray-500"}`} />
          <span className={`text-[10px] mt-1 ${isActive("/dashboard") ? "font-medium text-[#EC407A]" : ""}`}>Home</span>
        </Link>
        
        <Link 
          href="/dashboard/privates" 
          className="flex flex-col items-center justify-center relative"
        >
          {isActive("/dashboard/privates") && <div className="absolute top-0 w-12 h-1 bg-[#EC407A] rounded-b-full"></div>}
          <BookOpen className={`h-5 w-5 ${isActive("/dashboard/privates") ? "text-[#EC407A]" : "text-gray-500"}`} />
          <span className={`text-[10px] mt-1 ${isActive("/dashboard/privates") ? "font-medium text-[#EC407A]" : ""}`}>Privates</span>
        </Link>
        
        <Link 
          href="/dashboard/lessons" 
          className="flex flex-col items-center justify-center relative"
        >
          {isActive("/dashboard/lessons") && <div className="absolute top-0 w-12 h-1 bg-[#EC407A] rounded-b-full"></div>}
          <FileText className={`h-5 w-5 ${isActive("/dashboard/lessons") ? "text-[#EC407A]" : "text-gray-500"}`} />
          <span className={`text-[10px] mt-1 ${isActive("/dashboard/lessons") ? "font-medium text-[#EC407A]" : ""}`}>Lessons</span>
        </Link>
        
        <Link 
          href="/dashboard/events" 
          className="flex flex-col items-center justify-center relative"
        >
          {isActive("/dashboard/events") && <div className="absolute top-0 w-12 h-1 bg-[#EC407A] rounded-b-full"></div>}
          <Calendar className={`h-5 w-5 ${isActive("/dashboard/events") ? "text-[#EC407A]" : "text-gray-500"}`} />
          <span className={`text-[10px] mt-1 ${isActive("/dashboard/events") ? "font-medium text-[#EC407A]" : ""}`}>Events</span>
        </Link>
        
        <Link 
          href="/dashboard/messages" 
          className="flex flex-col items-center justify-center relative"
        >
          {isActive("/dashboard/messages") && <div className="absolute top-0 w-12 h-1 bg-[#EC407A] rounded-b-full"></div>}
          <MessageCircle className={`h-5 w-5 ${isActive("/dashboard/messages") ? "text-[#EC407A]" : "text-gray-500"}`} />
          <span className={`text-[10px] mt-1 ${isActive("/dashboard/messages") ? "font-medium text-[#EC407A]" : ""}`}>Messages</span>
        </Link>
        
        <Link 
          href="/dashboard/payments" 
          className="flex flex-col items-center justify-center relative"
        >
          {isActive("/dashboard/payments") && <div className="absolute top-0 w-12 h-1 bg-[#EC407A] rounded-b-full"></div>}
          <CreditCard className={`h-5 w-5 ${isActive("/dashboard/payments") ? "text-[#EC407A]" : "text-gray-500"}`} />
          <span className={`text-[10px] mt-1 ${isActive("/dashboard/payments") ? "font-medium text-[#EC407A]" : ""}`}>Payments</span>
        </Link>
      </div>
    </div>
  );
} 