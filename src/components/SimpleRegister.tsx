"use client";

import React, { useState } from "react";
import { signUpWithEmail } from "@/lib/supabase/supabaseUtils";

export default function SimpleRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    setUser(null);

    try {
      const { data, error } = await signUpWithEmail(email, password);
      if (error) throw error;
      setSuccess(true);
      setUser(data.user);
    } catch (err: any) {
      setError(err.message || "Failed to register");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-4 bg-white rounded shadow max-w-md mx-auto mt-8">
        <h2 className="text-xl font-bold mb-4">Registration Successful</h2>
        
        {user ? (
          <div className="mb-4">
            <p className="font-semibold">Your account has been created!</p>
            <div className="mt-4 p-3 bg-gray-100 rounded">
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">ID:</span> {user.id}</p>
              <p className="text-sm text-gray-600 mt-2">
                Normally, you would need to verify your email, but for this test, you can log in directly.
              </p>
            </div>
          </div>
        ) : (
          <p className="mb-4">
            Please check your email for a confirmation link to complete the registration process.
          </p>
        )}
        
        <button
          onClick={() => window.location.href = "/login"}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Create Account</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="register-email">
            Email
          </label>
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="register-password">
            Password
          </label>
          <input
            id="register-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            minLength={6}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
} 