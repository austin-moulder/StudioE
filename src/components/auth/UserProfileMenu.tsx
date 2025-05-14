"use client";

import { LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export default function UserProfileMenu() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  if (!user) return null;

  // Get user display name - full name or email username
  const displayName = user.user_metadata?.full_name || 
                      (user.email ? user.email.split('@')[0] : 'User');
  
  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await signOut();
      router.push('/');
      // Force reload to ensure auth state is cleared
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
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