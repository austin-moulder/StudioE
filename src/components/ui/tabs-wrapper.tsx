"use client"

import type React from "react"

import { Tabs } from "@/components/ui/tabs"

interface TabsWrapperProps {
  children: React.ReactNode
  defaultValue: string
}

export function TabsWrapper({ children, defaultValue }: TabsWrapperProps) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      {children}
    </Tabs>
  )
} 