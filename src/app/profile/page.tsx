"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { redirect } from "next/navigation";
import { User, Mail, Phone, MapPin, Camera, Music, Calendar, Sparkles, Heart, Headphones } from "lucide-react";
import { supabase } from "@/lib/supabase/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import Image from "next/image";
import { getUserExtendedProfile, saveUserExtendedProfile, uploadProfileImage } from "@/lib/profiles/profileUtils";
import { DANCE_STYLES, LEARNING_STYLES, UserProfile } from "@/types/user-profile";
import { cn } from "@/lib/utils";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Profile() {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [extendedProfile, setExtendedProfile] = useState<UserProfile | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    profile_image_url: "",
    dance_style_interests: [] as string[],
    availability_for_privates: "",
    preferred_learning_style: "",
    dance_goals: "",
    favorite_song: "",
    favorite_artist: "",
    dance_motivation: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch extended profile when user is loaded
  useEffect(() => {
    async function fetchExtendedProfile() {
      if (user) {
        const profile = await getUserExtendedProfile(user.id);
        if (profile) {
          setExtendedProfile(profile);
          setFormData(prev => ({
            ...prev,
            profile_image_url: profile.profile_image_url || "",
            dance_style_interests: profile.dance_style_interests || [],
            availability_for_privates: profile.availability_for_privates || "",
            preferred_learning_style: profile.preferred_learning_style || "",
            dance_goals: profile.dance_goals || "",
            favorite_song: profile.favorite_song || "",
            favorite_artist: profile.favorite_artist || "",
            dance_motivation: profile.dance_motivation || "",
          }));
        }
      }
    }
    
    if (user) {
      fetchExtendedProfile();
    }
  }, [user]);

  // Set form data when user is loaded
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        full_name: user.user_metadata?.full_name || "",
        email: user.email || "",
        phone: user.user_metadata?.phone || "",
        address: user.user_metadata?.address || "",
        bio: user.user_metadata?.bio || "",
      }));
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

  const handleDanceStyleChange = (style: string) => {
    setFormData(prev => {
      const current = [...prev.dance_style_interests];
      if (current.includes(style)) {
        return {
          ...prev,
          dance_style_interests: current.filter(s => s !== style)
        };
      } else {
        return {
          ...prev,
          dance_style_interests: [...current, style]
        };
      }
    });
  };

  const handleLearningStyleChange = (style: string) => {
    setFormData(prev => ({
      ...prev,
      preferred_learning_style: style
    }));
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    try {
      setUploadingImage(true);
      const imageUrl = await uploadProfileImage(user.id, file);
      
      if (imageUrl) {
        setFormData(prev => ({ ...prev, profile_image_url: imageUrl }));
        toast.success("Profile image uploaded successfully!");
      } else {
        toast.error("Failed to upload profile image");
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
      toast.error("Failed to upload profile image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to update your profile");
      return;
    }
    
    try {
      setIsUpdating(true);
      
      // Update user metadata in auth
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: formData.full_name,
          phone: formData.phone,
          address: formData.address,
          bio: formData.bio,
        }
      });
      
      if (authError) throw authError;
      
      // Update or create extended profile
      const extendedProfileData = {
        user_id: user.id,
        profile_image_url: formData.profile_image_url,
        dance_style_interests: formData.dance_style_interests,
        availability_for_privates: formData.availability_for_privates,
        preferred_learning_style: formData.preferred_learning_style,
        dance_goals: formData.dance_goals,
        favorite_song: formData.favorite_song,
        favorite_artist: formData.favorite_artist,
        dance_motivation: formData.dance_motivation,
      };
      
      const savedProfile = await saveUserExtendedProfile(extendedProfileData);
      
      if (savedProfile) {
        setExtendedProfile(savedProfile);
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update extended profile");
      }
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
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div 
              className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer"
              onClick={handleImageClick}
            >
              {formData.profile_image_url ? (
                <Image 
                  src={formData.profile_image_url} 
                  alt="Profile" 
                  width={96} 
                  height={96} 
                  className="object-cover w-full h-full"
                />
              ) : (
                <User className="h-12 w-12 text-gray-500" />
              )}
              
              {uploadingImage && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <button 
              className="absolute bottom-0 right-0 bg-[#EC407A] text-white p-1.5 rounded-full shadow-md hover:bg-[#D81B60] transition-colors"
              onClick={handleImageClick}
              type="button"
            >
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
          {/* Basic Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium tracking-tight">Basic Information</h3>
            
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

          {/* Dance Preferences Section */}
          <div className="space-y-4 pt-6 border-t">
            <h3 className="text-lg font-medium tracking-tight">Dance Preferences</h3>
            
            <div>
              <Label className="mb-2 block">Dance Style Interests</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {DANCE_STYLES.map((style) => (
                  <div key={style} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`style-${style}`} 
                      checked={formData.dance_style_interests.includes(style)}
                      onCheckedChange={() => handleDanceStyleChange(style)}
                    />
                    <label
                      htmlFor={`style-${style}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {style}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="availability_for_privates">Availability for Private Lessons</Label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <Textarea
                  id="availability_for_privates"
                  name="availability_for_privates"
                  value={formData.availability_for_privates}
                  onChange={handleChange}
                  className="pl-10 min-h-[80px]"
                  placeholder="Share when you're typically available for private lessons (e.g., weekday evenings, weekend mornings, etc.)"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="preferred_learning_style">Preferred Learning Style</Label>
              <Select
                value={formData.preferred_learning_style}
                onValueChange={handleLearningStyleChange}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="How do you learn best?" />
                </SelectTrigger>
                <SelectContent>
                  {LEARNING_STYLES.map((style) => (
                    <SelectItem key={style} value={style}>
                      {style}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dance_goals">Dance Goals</Label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Sparkles className="h-5 w-5 text-gray-400" />
                </div>
                <Textarea
                  id="dance_goals"
                  name="dance_goals"
                  value={formData.dance_goals}
                  onChange={handleChange}
                  className="pl-10 min-h-[80px]"
                  placeholder="What do you hope to achieve with dance? (e.g., social dancing, competitions, performances, etc.)"
                />
              </div>
            </div>
          </div>

          {/* Personal Preferences Section */}
          <div className="space-y-4 pt-6 border-t">
            <h3 className="text-lg font-medium tracking-tight">Personal Preferences</h3>
            
            <div>
              <Label htmlFor="favorite_song">Favorite Song</Label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Music className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="favorite_song"
                  name="favorite_song"
                  value={formData.favorite_song}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="What's your favorite song to dance to?"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="favorite_artist">Favorite Musical Artist</Label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Headphones className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="favorite_artist"
                  name="favorite_artist"
                  value={formData.favorite_artist}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Who is your favorite musical artist?"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="dance_motivation">I dance because...</Label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Heart className="h-5 w-5 text-gray-400" />
                </div>
                <Textarea
                  id="dance_motivation"
                  name="dance_motivation"
                  value={formData.dance_motivation}
                  onChange={handleChange}
                  className="pl-10 min-h-[80px]"
                  placeholder="Share what inspires you to dance..."
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t">
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