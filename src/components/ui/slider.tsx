"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & { 
    isPurple?: boolean;
  }
>(({ className, isPurple = false, ...props }, ref) => {
  // Extract the current value from props, ensuring 0 is handled correctly
  const defaultVal = props.defaultValue || [50];
  const val = props.value !== undefined ? props.value : defaultVal;
  const currentValue = Array.isArray(val) ? val[0] : (typeof val === 'number' ? val : 50);
  
  // Determine colors based on isPurple prop
  const colorClass = isPurple ? "bg-purple-500" : "bg-pink-500";
  const borderColorClass = isPurple ? "border-purple-500" : "border-pink-500";
  
  return (
    <div className="relative w-full h-8 my-1">
      {/* Slider track */}
      <div className="absolute top-3 w-full h-2 bg-gray-200 rounded-full"></div>
      
      {/* Center line indicator */}
      <div className="absolute left-1/2 top-3 h-2 w-0.5 bg-gray-300 -translate-x-[0.5px]"></div>
      
      {/* Colored bar extending from center */}
      {currentValue !== 50 && (
        <div
          className={`absolute top-3 h-2 ${colorClass} rounded-full`}
          style={{
            left: currentValue < 50 ? `${currentValue}%` : '50%',
            right: currentValue > 50 ? `${100 - currentValue}%` : '50%',
          }}
        />
      )}
      
      {/* Radix Slider for functionality */}
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "absolute inset-0 w-full touch-none select-none",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-full w-full">
          <SliderPrimitive.Range className="opacity-0" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="opacity-0" />
      </SliderPrimitive.Root>
      
      {/* Custom visible thumb */}
      <div 
        className={cn(
          "absolute top-4 h-5 w-5 rounded-full border-2 bg-white shadow-md -translate-y-1/2",
          borderColorClass
        )}
        style={{
          left: `${currentValue}%`,
          transform: "translateX(-50%)",
        }}
      />
    </div>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider } 