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
  // Extract the current value from props
  const defaultVal = props.defaultValue || [50];
  const val = props.value !== undefined ? props.value : defaultVal;
  
  // Check if this is a range slider (2 values) or single value slider
  const isRangeSlider = Array.isArray(val) && val.length === 2;
  
  // Handle different cases for value extraction
  let currentValue, startValue, endValue;
  
  // Calculate the percentage values for positioning based on min/max
  const min = props.min || 0;
  const max = props.max || 100;
  const range = max - min;
  
  if (isRangeSlider) {
    const rawStartValue = Array.isArray(val) ? val[0] : min;
    const rawEndValue = Array.isArray(val) && val.length > 1 ? val[1] : max;
    
    // Convert actual values to percentages for positioning
    startValue = ((rawStartValue - min) / range) * 100;
    endValue = ((rawEndValue - min) / range) * 100;
  } else {
    const rawValue = Array.isArray(val) ? val[0] : (typeof val === 'number' ? val : 50);
    currentValue = ((rawValue - min) / range) * 100;
  }
  
  // Determine colors based on isPurple prop
  const colorClass = isPurple ? "bg-purple-500" : "bg-pink-500";
  const borderColorClass = isPurple ? "border-purple-500" : "border-pink-500";
  
  return (
    <div className="relative w-full h-8 my-1">
      {/* Slider track */}
      <div className="absolute top-3 w-full h-2 bg-gray-200 rounded-full"></div>
      
      {isRangeSlider ? (
        // Range slider UI
        <div
          className={`absolute top-3 h-2 ${colorClass} rounded-full`}
          style={{
            left: `${startValue}%`,
            right: `${100 - endValue}%`,
          }}
        />
      ) : (
        // Single value slider UI
        <>
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
        </>
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
        {isRangeSlider ? (
          <>
            <SliderPrimitive.Thumb className="opacity-0" />
            <SliderPrimitive.Thumb className="opacity-0" />
          </>
        ) : (
          <SliderPrimitive.Thumb className="opacity-0" />
        )}
      </SliderPrimitive.Root>
      
      {isRangeSlider ? (
        // Custom visible thumbs for range slider
        <>
          <div 
            className={cn(
              "absolute top-4 h-5 w-5 rounded-full border-2 bg-white shadow-md -translate-y-1/2",
              borderColorClass
            )}
            style={{
              left: `${startValue}%`,
              transform: "translateX(-50%)",
            }}
          />
          <div 
            className={cn(
              "absolute top-4 h-5 w-5 rounded-full border-2 bg-white shadow-md -translate-y-1/2",
              borderColorClass
            )}
            style={{
              left: `${endValue}%`,
              transform: "translateX(-50%)",
            }}
          />
        </>
      ) : (
        // Custom visible thumb for single value slider
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
      )}
    </div>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider } 