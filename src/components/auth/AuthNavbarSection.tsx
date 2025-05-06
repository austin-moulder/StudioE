"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import UserProfileMenu from "./UserProfileMenu";
import SignInModal from "./SignInModal";

export default function AuthNavbarSection() {
  const { user, isLoading } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);

  // Show a loading skeleton if auth is loading
  if (isLoading) {
    return (
      <div className="h-8 w-20 animate-pulse rounded-md bg-gray-200"></div>
    );
  }

  return (
    <>
      {user ? (
        <UserProfileMenu />
      ) : (
        <button
          onClick={() => setShowSignInModal(true)}
          className="text-sm font-medium transition-colors hover:text-gray-600"
          aria-label="Sign in"
        >
          Sign in
        </button>
      )}

      {/* Sign in modal */}
      <SignInModal 
        isOpen={showSignInModal} 
        onClose={() => setShowSignInModal(false)} 
      />
    </>
  );
} 