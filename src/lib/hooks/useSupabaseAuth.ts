"use client";

import { useContext } from "react";
import { SupabaseAuthContext } from "../contexts/SupabaseAuthContext";

export function useSupabaseAuth() {
  // Get the context
  const context = useContext(SupabaseAuthContext);
  
  // Ensure the context exists (it should because of our SupabaseAuthProvider)
  if (!context) {
    throw new Error("useSupabaseAuth must be used within a SupabaseAuthProvider");
  }

  return context;
} 