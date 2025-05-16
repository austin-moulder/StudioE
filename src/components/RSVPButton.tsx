"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/supabase";
import { logClassInquiry } from "@/lib/analytics/userActivity";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { Check } from "lucide-react";

interface RSVPButtonProps {
  classId: string;
  className: string;
  instructorId?: string;
  buttonText?: string;
  buttonVariant?: "default" | "outline" | "secondary" | "link";
  buttonSize?: "default" | "sm" | "lg" | "icon";
  buttonClassName?: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export default function RSVPButton({
  classId,
  className,
  instructorId,
  buttonText = "RSVP",
  buttonVariant = "secondary",
  buttonSize = "default",
  buttonClassName = "",
  onSuccess,
  onError
}: RSVPButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasRSVPd, setHasRSVPd] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // Check if user has already RSVP'd for this class
  useEffect(() => {
    if (!user) return;
    
    async function checkExistingRSVP() {
      try {
        const { data, error } = await supabase
          .from("class_inquiries")
          .select("*")
          .eq("user_id", user?.id || '') // Add optional chaining and fallback
          .eq("class_id", classId)
          .single();
        
        if (error && error.code !== 'PGRST116') { // PGRST116 is the error code for no rows returned
          console.error("Error checking RSVP status:", error);
          return;
        }
        
        setHasRSVPd(!!data);
      } catch (error) {
        console.error("Error checking RSVP status:", error);
      }
    }
    
    checkExistingRSVP();
  }, [classId, user]);

  const handleRSVP = async () => {
    if (!user) {
      // Redirect to login if user is not authenticated
      router.push("/dev-login");
      return;
    }

    // If already RSVP'd, don't do anything
    if (hasRSVPd) return;
    
    setIsLoading(true);

    try {
      // Log the analytics event
      await logClassInquiry(
        user.id,
        classId,
        className,
        instructorId
      );

      // Validate the classId is a valid UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(classId)) {
        throw new Error("Invalid class ID format. Expected a UUID.");
      }

      // Create the database record for the RSVP
      const { error } = await supabase
        .from("class_inquiries")
        .insert({
          user_id: user.id,
          class_id: classId, // Store as UUID string to match classes table primary key
          class_name: className,
          instructor_id: instructorId || null,
          status: "pending" // Use 'pending' status to count as upcoming classes
        });

      if (error) throw error;

      // Update local state to show RSVP'd status
      setHasRSVPd(true);
      
      // Call onSuccess callback if provided
      if (onSuccess) onSuccess();
      
      // Refresh the page to update stats
      router.refresh();
      
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      if (onError) onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine button appearance based on RSVP status
  const getButtonProps = () => {
    if (hasRSVPd) {
      return {
        variant: buttonVariant,
        size: buttonSize,
        className: `bg-green-600 text-white hover:bg-green-700 ${buttonClassName}`,
        disabled: true,
        children: (
          <span className="flex items-center">
            <Check className="h-3.5 w-3.5 mr-1" />
            RSVP'd
          </span>
        )
      };
    }
    
    return {
      variant: buttonVariant,
      size: buttonSize,
      className: buttonClassName,
      disabled: isLoading,
      children: isLoading ? "Submitting..." : buttonText
    };
  };

  const buttonProps = getButtonProps();

  return (
    <Button
      {...buttonProps}
      onClick={handleRSVP}
    >
      {buttonProps.children}
    </Button>
  );
} 