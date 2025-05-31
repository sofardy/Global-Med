"use client";

import dynamic from "next/dynamic";

const DateTimePicker = dynamic(() => import("./DateTimePicker"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  ),
});

interface StyledDateTimePickerProps {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  availableTimes?: string[];
}

export default function StyledDateTimePicker(props: StyledDateTimePickerProps) {
  return <DateTimePicker {...props} />;
}
