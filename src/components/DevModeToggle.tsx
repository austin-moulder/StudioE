"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, User } from "lucide-react";

export default function DevModeToggle() {
  const [isDevMode, setIsDevMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      // Get the current dev mode status from localStorage
      const devMode = localStorage.getItem("use_dev_auth") === "true";
      setIsDevMode(devMode);
      setMounted(true);
    } catch (error) {
      console.error("Error reading dev mode from localStorage:", error);
      setIsDevMode(false);
      setMounted(true);
    }
  }, []);

  // Don't render anything during SSR to avoid hydration mismatch
  if (!mounted) return null;

  const toggleDevMode = () => {
    try {
      const newValue = !isDevMode;
      localStorage.setItem("use_dev_auth", newValue.toString());
      setIsDevMode(newValue);
      
      // Reload the page to apply changes
      window.location.reload();
    } catch (error) {
      console.error("Error toggling dev mode:", error);
      alert("Failed to toggle dev mode. Please try again.");
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-gray-900 text-white rounded-lg shadow-lg">
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex flex-col">
            <span className="font-mono font-bold">Development Mode</span>
            <span className="text-xs">
              Auth Status: {isDevMode ? 
                <span className="text-green-400 font-semibold">Active (Mock User)</span> : 
                <span className="text-yellow-400 font-semibold">Inactive (Real Auth)</span>}
            </span>
          </div>
          <button
            onClick={toggleDevMode}
            className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors ml-2 ${
              isDevMode ? "bg-green-500" : "bg-gray-600"
            }`}
            aria-pressed={isDevMode}
          >
            <span
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                isDevMode ? "translate-x-7" : ""
              }`}
            />
          </button>
        </div>

        {isDevMode && (
          <div className="pt-2 border-t border-gray-700">
            <div className="flex gap-2 justify-around">
              <Link 
                href="/dashboard" 
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium transition-colors"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link 
                href="/profile" 
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 