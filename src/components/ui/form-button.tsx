"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pending?: React.ReactNode;
}

export function FormButton({
  type = "submit",
  children,
  pending,
  ...props
}: FormButtonProps) {
  const { pending: isPending } = useFormStatus();

  return (
    <Button type={type} disabled={isPending} {...props}>
      {isPending ? pending || "Please wait..." : children}
    </Button>
  );
} 