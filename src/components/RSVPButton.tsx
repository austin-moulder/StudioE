"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/supabase";
import { logClassInquiry } from "@/lib/analytics/userActivity";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";

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
  const router = useRouter();
  const { user } = useAuth();

  const handleRSVP = async () => {
    if (!user) {
      // Redirect to login if user is not authenticated
      router.push("/dev-login");
      return;
    }

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

  return (
    <Button
      variant={buttonVariant}
      size={buttonSize}
      className={buttonClassName}
      onClick={handleRSVP}
      disabled={isLoading}
    >
      {isLoading ? "Submitting..." : buttonText}
    </Button>
  );
} 