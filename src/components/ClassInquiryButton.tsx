"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";

interface ClassInquiryButtonProps {
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

export default function ClassInquiryButton({
  classId,
  className,
  instructorId,
  buttonText = "Inquire",
  buttonVariant = "default",
  buttonSize = "default",
  buttonClassName = "",
  onSuccess,
  onError
}: ClassInquiryButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleInquiry = async () => {
    if (!user) {
      // Redirect to login if user is not authenticated
      router.push("/dev-login");
      return;
    }

    setIsLoading(true);

    try {
      // The Inquire button doesn't actually create database records 
      // or track analytics - it's just a visual element
      
      // Simply call success
      if (onSuccess) onSuccess();
      
    } catch (error) {
      console.error("Error in inquiry:", error);
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
      onClick={handleInquiry}
      disabled={isLoading}
    >
      {isLoading ? "Please wait..." : buttonText}
    </Button>
  );
} 