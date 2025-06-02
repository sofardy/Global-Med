import React from "react";

import { useThemeStore } from "@/src/store/theme";

interface TimeSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
}

export const TimeSelect: React.FC<TimeSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "",
  className = "",
}) => {
  const { theme } = useThemeStore();

  const borderColor = theme === "light" ? "border-gray-200" : "border-gray-700";
  const inputBg = theme === "light" ? "bg-white" : "bg-dark-block";
  const textColor = theme === "light" ? "text-light-text" : "text-white";
  const hoverBg = theme === "light" ? "hover:bg-gray-50" : "hover:bg-gray-800";

  return (
    <Sele value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button
          className={`
            w-full h-12 md:h-[56px] 
            px-4 rounded-xl 
            border ${borderColor} 
            ${inputBg} ${textColor} 
            focus:outline-none focus:ring-2 focus:ring-[#00C78B]
            text-left
            ${className}
          `}
        >
          <span className="block truncate">{value || placeholder}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-4">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Listbox.Options
          className={`
            absolute z-10 mt-1 max-h-60 w-full overflow-auto 
            rounded-xl py-1 shadow-lg 
            ${inputBg} 
            border ${borderColor}
            focus:outline-none
          `}
        >
          {options.map((time) => (
            <Listbox.Option
              key={time}
              value={time}
              className={({ active }) => `
                relative cursor-pointer select-none py-2 pl-4 pr-9
                ${active ? "bg-[#00C78B] text-white" : textColor}
                ${hoverBg}
              `}
            >
              {({ selected, active }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {time}
                  </span>
                  {selected && (
                    <span
                      className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                        active ? "text-white" : "text-[#00C78B]"
                      }`}
                    >
                      ✓
                    </span>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Sele>
  );
};
