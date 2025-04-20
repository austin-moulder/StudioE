"use client"

import { useState, useEffect } from "react"
import { Toaster as SonnerToaster } from "sonner"

interface ToasterProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"
  richColors?: boolean
  closeButton?: boolean
  className?: string
}

export function Toaster({
  position = "bottom-right",
  richColors = true,
  closeButton = true,
  className,
}: ToasterProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <SonnerToaster
      position={position}
      richColors={richColors}
      closeButton={closeButton}
      className={className}
    />
  )
} 