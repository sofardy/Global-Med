import React from "react";
import { useThemeStore } from "@/src/store/theme";

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  min?: string;
  className?: string;
}

export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  min,
  className = "",
}) => {
  const { theme } = useThemeStore();

  const borderColor = theme === "light" ? "border-gray-200" : "border-gray-700";
  const inputBg = theme === "light" ? "bg-white" : "bg-dark-block";
  const textColor = theme === "light" ? "text-light-text" : "text-white";

  return (
    <div className="relative">
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min || new Date().toISOString().split("T")[0]}
        className={`
          w-full h-12 md:h-[56px] 
          px-4 rounded-xl 
          border ${borderColor} 
          ${inputBg} ${textColor} 
          focus:outline-none focus:ring-2 focus:ring-[#00C78B]
          ${className}
        `}
      />
    </div>
  );
};
