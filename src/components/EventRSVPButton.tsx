"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/supabase";
import { logEventRSVP } from "@/lib/analytics/userActivity";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { Check } from "lucide-react";

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
  const [hasRSVPd, setHasRSVPd] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // Check if user has already RSVP'd for this event
  useEffect(() => {
    if (!user) return;
    
    async function checkExistingRSVP() {
      try {
        const { data, error } = await supabase
          .from("event_rsvps")
          .select("*")
          .eq("user_id", user?.id || '') // Add optional chaining and fallback
          .eq("event_id", eventId)
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
  }, [eventId, user]);

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

      // Update local state to show RSVP'd status
      setHasRSVPd(true);
      
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