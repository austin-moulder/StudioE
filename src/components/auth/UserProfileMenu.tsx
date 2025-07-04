"use client";

import { LogOut, ChevronDown, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export default function UserProfileMenu() {
  const { user, signOut, isLoading } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  // Debug logging - only in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log("UserProfileMenu - Auth State:", { 
        user: user ? { 
          id: user.id, 
          email: user.email,
          metadata: user.user_metadata 
        } : null, 
        isLoading 
      });
    }
  }, [user, isLoading]);

  // Show loading state or return null if no user
  if (isLoading) {
    return (
      <div className="relative ml-3">
        <div className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-gray-400">
          <span>Loading...</span>
        </div>
      </div>
    );
  }
  
  if (!user) return null;

  // Get user display name - full name or email username
  const displayName = user.user_metadata?.full_name || 
                      (user.email ? user.email.split('@')[0] : 'User');
  
  const handleSignOut = async () => {
    console.log('[UserMenu] Starting sign out process');
    
    try {
      // First close the dropdown menu
      setIsOpen(false);
      
      // Clear auth status in localStorage first for a fast user experience
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_success');
        sessionStorage.clear();
        
        // Set signout flag in localStorage to trigger UI update on homepage
        localStorage.setItem('signedout_timestamp', Date.now().toString());
      }
      
      // Call the signOut method from context
      await signOut().catch(error => {
        console.error('[UserMenu] Error during sign out:', error);
      });
      
      // Redirect with a hard refresh to ensure clean state
      window.location.href = '/?signedout=true';
    } catch (error) {
      console.error('[UserMenu] Error in handleSignOut:', error);
      // If all else fails, just force a hard reload to the homepage
      window.location.href = '/?signedout=true';
    }
  };

  return (
    <div className="relative ml-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#EC407A] focus:ring-offset-2">
            <span>{displayName}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <div className="border-b border-gray-200 px-4 py-3">
            <p className="text-sm font-medium text-gray-900">{displayName}</p>
            <p className="truncate text-sm text-gray-500">{user.email}</p>
          </div>
          
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="w-full flex items-center px-2 py-1.5 text-sm cursor-pointer">
              <LayoutDashboard className="mr-2 h-4 w-4 text-gray-500" aria-hidden="true" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link href="/profile" className="w-full flex items-center px-2 py-1.5 text-sm cursor-pointer">
              <User className="mr-2 h-4 w-4 text-gray-500" aria-hidden="true" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          
          <div className="border-t border-gray-200 my-1"></div>
          
          <DropdownMenuItem asChild>
            <button 
              onClick={handleSignOut} 
              className="w-full flex items-center px-2 py-1.5 text-sm cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4 text-gray-500" aria-hidden="true" />
              <span>Sign out</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 