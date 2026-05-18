import { FEST_DAYS, type FestDay } from "@/lib/fest-pass/constants"

type FestWeeklyScheduleTableProps = {
  studioLabel?: string
  timeSlots: readonly string[]
  grid: string[][]
  fridaySpanLabel?: string
  weekdays?: readonly FestDay[]
}

export default function FestWeeklyScheduleTable({
  studioLabel,
  timeSlots,
  grid,
  fridaySpanLabel,
  weekdays = FEST_DAYS,
}: FestWeeklyScheduleTableProps) {
  return (
    <div>
      {studioLabel && (
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-900 md:text-base">{studioLabel}</p>
      )}
      
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[320px] border-collapse text-center text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#FF3366] text-white">
                <th className="border border-[#FF3366] px-2 py-2.5 font-bold sm:px-3">Time</th>
                {weekdays.map((day) => (
                  <th key={day} className="border border-[#FF3366] px-2 py-2.5 font-bold sm:px-3">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, rowIndex) => (
                <tr key={time} className="bg-white">
                  <td className="border border-gray-200 bg-gray-50 px-2 py-3 font-semibold text-gray-900 sm:px-3">
                    {time}
                  </td>
                  {grid[rowIndex]?.map((cell, colIndex) => (
                    <td
                      key={`${time}-${colIndex}`}
                      className="border border-gray-200 px-2 py-3 font-medium uppercase leading-snug text-gray-800 sm:px-3"
                    >
                      {cell}
                    </td>
                  ))}
                  {fridaySpanLabel && rowIndex === 0 && (
                    <td
                      rowSpan={timeSlots.length}
                      className="border border-gray-200 px-2 py-3 align-middle text-sm font-bold uppercase leading-snug text-gray-900 sm:px-3"
                    >
                      {fridaySpanLabel}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
    </div>
  )
}
