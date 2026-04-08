import { useState } from "react"

const Calendar = ({ selectedDate, onSelectDate }) => {
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

  const handleDayClick = (day) => {
    const clickedDate = new Date(year, month, day)
    if (clickedDate < today) return
    onSelectDate(clickedDate)
  }

  return (
    <div className="w-full max-w-md mx-auto bg-[#fffdf0] p-4 sm:p-6 rounded-2xl shadow-lg border border-[#fcf1d7]">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            if (month === today.getMonth() && year === today.getFullYear()) return
            setMonth(month === 0 ? 11 : month - 1)
            if (month === 0) setYear(year - 1)
          }}
          className="px-2 sm:px-3 py-1 bg-[#fcf1d7] rounded hover:bg-[#e52421] hover:text-white transition text-sm"
        >
          ◀
        </button>

        <h2 className="text-sm sm:text-lg font-semibold capitalize text-[#781040] text-center">
          {new Date(year, month).toLocaleString("es-CL", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <button
          onClick={() => {
            setMonth(month === 11 ? 0 : month + 1)
            if (month === 11) setYear(year + 1)
          }}
          className="px-2 sm:px-3 py-1 bg-[#fcf1d7] rounded hover:bg-[#e52421] hover:text-white transition text-sm"
        >
          ▶
        </button>
      </div>

      {/* Días */}
      <div className="grid grid-cols-7 text-center text-xs sm:text-sm font-medium text-[#781040] mb-2">
        {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Fechas */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }).map((_, i) => (
          <div key={i}></div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const date = new Date(year, month, day)
          const disabled = date < today
          const isSelected =
            selectedDate &&
            date.toDateString() === selectedDate.toDateString()
          const isToday = date.toDateString() === today.toDateString()

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              disabled={disabled}
              className={`aspect-square flex items-center justify-center rounded-full transition text-xs sm:text-sm ${
                disabled
                  ? "text-gray-300 cursor-not-allowed"
                  : isSelected
                  ? "bg-[#e52421] text-white"
                  : "hover:bg-[#fcf1d7] hover:text-[#781040]"
              } ${isToday ? "border border-[#e52421]" : ""}`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar