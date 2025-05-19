"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <Link 
      href="/dashboard" 
      className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
    >
      <ArrowLeft className="mr-1 h-4 w-4" />
      Back to Dashboard
    </Link>
  );
} 