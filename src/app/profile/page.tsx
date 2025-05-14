"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { redirect } from "next/navigation";
import { User, Mail, Phone, MapPin, Camera } from "lucide-react";
import { supabase } from "@/lib/supabase/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function Profile() {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Set form data when user is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.user_metadata?.full_name || "",
        email: user.email || "",
        phone: user.user_metadata?.phone || "",
        address: user.user_metadata?.address || "",
        bio: user.user_metadata?.bio || "",
      });
    }
  }, [user]);

  // If not mounted yet, don't render anything to avoid hydration mismatch
  if (!mounted) return null;

  // If not loading and no user, redirect to sign in
  if (!isLoading && !user) {
    redirect("/");
  }

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="container max-w-5xl mx-auto py-16 px-4 text-center">
        <div className="w-12 h-12 border-4 border-[#EC407A] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your profile...</p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsUpdating(true);
      
      // Update user metadata
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: formData.full_name,
          phone: formData.phone,
          address: formData.address,
          bio: formData.bio,
        }
      });
      
      if (error) throw error;
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container max-w-3xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-gray-500 mt-1">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center mb-8 gap-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-12 w-12 text-gray-500" />
            </div>
            <button className="absolute bottom-0 right-0 bg-[#EC407A] text-white p-1.5 rounded-full shadow-md hover:bg-[#D81B60] transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold">{formData.full_name || "Your Name"}</h2>
            <p className="text-gray-500">{user?.email}</p>
            <p className="text-sm mt-1 text-gray-500">Member since {new Date(user?.created_at || "").toLocaleDateString()}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="pl-10 bg-gray-50"
                />
              </div>
              <p className="text-xs mt-1 text-gray-500">Email cannot be changed. Contact support for assistance.</p>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="h-24"
                placeholder="Tell us a bit about yourself..."
              />
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button 
              type="submit" 
              className="bg-[#EC407A] hover:bg-[#D81B60]"
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 