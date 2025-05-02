"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  defaultMonth,
  selected,
  ...props
}: CalendarProps) {
  // Track when a day is being interacted with
  const [hoveredDay, setHoveredDay] = React.useState<Date | null>(null);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      defaultMonth={defaultMonth || undefined}
      selected={selected}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-lg font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex w-full justify-between",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center",
        row: "flex w-full mt-2",
        cell: "h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "outline" }),
          "h-10 w-10 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 hover:text-gray-900"
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-[#EC407A] text-white hover:bg-[#EC407A]/90 hover:text-white focus:bg-[#EC407A] focus:text-white",
        day_today: "bg-[#FF3366]/10 text-[#FF3366] font-semibold",
        day_outside: "day-outside text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-30",
        day_range_middle: "aria-selected:bg-[#EC407A]/20 aria-selected:text-gray-900",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      onDayMouseEnter={(day) => setHoveredDay(day)}
      onDayMouseLeave={() => setHoveredDay(null)}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar } 