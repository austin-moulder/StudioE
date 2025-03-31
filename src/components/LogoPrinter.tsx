"use client";

import { useState, useEffect } from "react";

export default function LogoPrinter() {
  // Mock data
  const mockFiles = [
    "Logos/main_logo.svg",
    "Logos/logo_light.svg",
    "Logos/logo_dark.svg"
  ];

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Files in Storage</h2>
      
      <ul className="list-disc pl-5">
        {mockFiles.map((file, index) => (
          <li key={index} className="mb-1">{file}</li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-gray-500">Note: Using mock data (Supabase migration in progress)</p>
    </div>
  );
} 