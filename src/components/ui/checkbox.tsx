"use client"

import * as React from "react"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onCheckedChange) {
        onCheckedChange(event.target.checked)
      }
    }

    return (
      <div className="relative flex items-center">
        <input
          type="checkbox"
          className="h-4 w-4 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F94C8D] focus:ring-offset-2"
          ref={ref}
          checked={checked}
          onChange={handleChange}
          {...props}
        />
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox } 