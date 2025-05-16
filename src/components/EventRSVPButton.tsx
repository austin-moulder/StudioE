"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/supabase";
import { logEventRSVP } from "@/lib/analytics/userActivity";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";

interface EventRSVPButtonProps {
  eventId: number;
  eventName: string;
  buttonText?: string;
  buttonVariant?: "default" | "outline" | "secondary" | "link";
  buttonSize?: "default" | "sm" | "lg" | "icon";
  buttonClassName?: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export default function EventRSVPButton({
  eventId,
  eventName,
  buttonText = "RSVP",
  buttonVariant = "secondary",
  buttonSize = "default",
  buttonClassName = "",
  onSuccess,
  onError
}: EventRSVPButtonProps) {
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
      // We'll implement this function in the next step
      await logEventRSVP(
        user.id,
        eventId,
        eventName
      );

      // Validate the eventId is a number
      if (typeof eventId !== 'number' && isNaN(Number(eventId))) {
        throw new Error("Invalid event ID format. Expected a number.");
      }

      // Create the database record for the RSVP
      const { error } = await supabase
        .from("event_rsvps")
        .insert({
          user_id: user.id,
          event_id: eventId,
          event_name: eventName,
          status: "pending" // Use 'pending' status to count as upcoming events
        });

      if (error) throw error;

      // Call onSuccess callback if provided
      if (onSuccess) onSuccess();
      
      // Refresh the page to update stats
      router.refresh();
      
    } catch (error) {
      console.error("Error submitting event RSVP:", error);
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