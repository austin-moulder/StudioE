"use client";

import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { User, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/lib/auth/auth-context';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function UserProfileMenu() {
  const { user, signOut } = useAuth();
  const [imageError, setImageError] = useState(false);

  if (!user) return null;

  // Get user display name - full name or email username
  const displayName = user.user_metadata?.full_name || 
                      (user.email ? user.email.split('@')[0] : 'User');
  
  // Get avatar URL if available
  const avatarUrl = user.user_metadata?.avatar_url;
  
  // Handle image loading issues that might be caused by redirects
  const handleImageError = () => {
    console.log('Profile image failed to load:', avatarUrl);
    setImageError(true);
  };

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#EC407A] focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          {avatarUrl && !imageError ? (
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <Image
                className="h-8 w-8 rounded-full"
                src={avatarUrl}
                alt={displayName}
                width={32}
                height={32}
                onError={handleImageError}
                unoptimized={true} // Skip Next.js image optimization for Google avatar URLs
              />
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
              <User className="h-5 w-5 text-gray-500" />
            </div>
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="border-b border-gray-200 px-4 py-3">
            <p className="text-sm font-medium text-gray-900">{displayName}</p>
            <p className="truncate text-sm text-gray-500">{user.email}</p>
          </div>
          
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={signOut}
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'flex w-full items-center px-4 py-2 text-sm text-gray-700'
                )}
              >
                <LogOut className="mr-2 h-4 w-4 text-gray-500" aria-hidden="true" />
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
} 