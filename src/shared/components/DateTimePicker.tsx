import React from "react";

interface DateTimePickerProps {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  theme: "light" | "dark";
}

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export function DateTimePicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  theme,
}: DateTimePickerProps) {
  const textColor = theme === "light" ? "text-[#094A54]" : "text-white";
  const borderColor =
    theme === "light" ? "border-[#094A5480]" : "border-gray-700";
  const inputBg = theme === "light" ? "bg-white" : "bg-dark-bg";
  const hoverBg = theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800";

  return (
    <div className="flex flex-col gap-4">
      {/* Date Picker */}
      <div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className={`
            w-full h-12 md:h-[56px] px-4 rounded-xl border 
            focus:outline-none focus:ring-2 focus:ring-[#00C78B]
            ${borderColor} ${inputBg} ${textColor}
            [&::-webkit-calendar-picker-indicator]:opacity-0
            [&::-webkit-calendar-picker-indicator]:absolute
            [&::-webkit-calendar-picker-indicator]:w-full
            [&::-webkit-calendar-picker-indicator]:h-full
            [&::-webkit-calendar-picker-indicator]:cursor-pointer
            relative
          `}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${
              theme === "light" ? "%23094A54" : "%23ffffff"
            }' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='16' y1='2' x2='16' y2='6'%3E%3C/line%3E%3Cline x1='8' y1='2' x2='8' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='10' x2='21' y2='10'%3E%3C/line%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            backgroundSize: "24px",
          }}
        />
      </div>

      {/* Time Picker */}
      <div>
        <select
          value={selectedTime}
          onChange={(e) => onTimeChange(e.target.value)}
          className={`
            w-full h-12 md:h-[56px] px-4 rounded-xl border 
            focus:outline-none focus:ring-2 focus:ring-[#00C78B]
            ${borderColor} ${inputBg} ${textColor}
            appearance-none
          `}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${
              theme === "light" ? "%23094A54" : "%23ffffff"
            }' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpolyline points='12 6 12 12 16 14'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            backgroundSize: "24px",
          }}
        >
          <option value="">Выберите время</option>
          {timeSlots.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
