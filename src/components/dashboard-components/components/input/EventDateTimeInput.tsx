import { ChangeEventHandler, useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import {
  TIMEZONE_OPTIONS,
  toUtcIso,
  formatEventDate,
  formatEventTime,
} from "@/utils/eventTimezones";
import CheckIcon from "../../../../../public/assets/dashboard_assets/check_input.svg";
import ErrorIcon from "../../../../../public/assets/dashboard_assets/error_input.svg";

export interface EventDateTimeValue {
  isoString: string;   // UTC ISO — stored as startDateTime
  timezone: string;    // IANA name — stored as timezone
  displayDate: string; // "April 12, 2026" — stored as date
  displayTime: string; // "1:00 PM WAT" — for UI display only
}

type Props = {
  isRequired?: boolean;
  onInputChange: (value: EventDateTimeValue | null) => void;
  labelText?: string;
  initialValue?: EventDateTimeValue | null;
};

function EventDateTimeInput({
  isRequired = true,
  onInputChange,
  labelText = "Event Date & Time",
  initialValue,
}: Props) {
  const defaultClassNames = getDefaultClassNames();

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [timeValue, setTimeValue] = useState<string>("09:00");
  const [timezone, setTimezone] = useState<string>(TIMEZONE_OPTIONS[0].iana);
  const [isValid, setIsValid] = useState<"valid" | "invalid" | "empty">("empty");

  function buildAndEmit(day: Date, time: string, tz: string) {
    const parts = time.split(":");
    const hours = parseInt(parts[0] ?? "0", 10);
    const minutes = parseInt(parts[1] ?? "0", 10);
    if (isNaN(hours) || isNaN(minutes)) return;
    // Build a local Date at the selected calendar day + time
    const localDate = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      hours,
      minutes,
      0
    );

    const isoString = toUtcIso(localDate, tz);
    const displayDate = formatEventDate(isoString, tz);
    const displayTime = formatEventTime(isoString, tz);

    setIsValid("valid");
    onInputChange({ isoString, timezone: tz, displayDate, displayTime });
  }

  const handleDaySelect = (day: Date | undefined) => {
    setSelectedDay(day);
    if (day) {
      buildAndEmit(day, timeValue, timezone);
    } else {
      setIsValid(isRequired ? "invalid" : "empty");
      onInputChange(null);
    }
  };

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    setTimeValue(time);
    if (selectedDay) buildAndEmit(selectedDay, time, timezone);
  };

  const handleTimezoneChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const tz = e.target.value;
    setTimezone(tz);
    if (selectedDay) buildAndEmit(selectedDay, timeValue, tz);
  };

  const formattedPreview =
    selectedDay
      ? (() => {
          const parts = timeValue.split(":");
          const hours = parseInt(parts[0] ?? "0", 10);
          const minutes = parseInt(parts[1] ?? "0", 10);
          if (isNaN(hours) || isNaN(minutes)) return null;
          const localDate = new Date(
            selectedDay.getFullYear(),
            selectedDay.getMonth(),
            selectedDay.getDate(),
            hours,
            minutes
          );
          const iso = toUtcIso(localDate, timezone);
          return `${formatEventDate(iso, timezone)} · ${formatEventTime(iso, timezone)}`;
        })()
      : null;

  return (
    <div className="flex flex-col gap-[6px] w-full">
      {labelText && (
        <label className="paragraph-text flex flex-row justify-between">
          <span>
            {labelText}
            <span className="text-red-700">{isRequired ? "*" : ""}</span>
          </span>
          <div className="flex-none">
            {isValid === "valid" && (
              <CheckIcon width="13" height="13" viewBox="0 0 13 13" />
            )}
            {isValid === "invalid" && (
              <ErrorIcon width="13" height="13" viewBox="0 0 13 13" />
            )}
          </div>
        </label>
      )}

      <div className="flex flex-col gap-0 bg-white rounded-xl overflow-hidden border border-neutral-200">

        {/* TOP ROW — Time + Timezone side by side */}
        <div className="flex flex-row gap-4 px-5 pt-5 pb-4 border-b border-neutral-200">
          <div className="flex flex-col gap-2 flex-1">
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Time
            </span>
            <input
              type="time"
              value={timeValue}
              onChange={handleTimeChange}
              className="text-input border border-neutral-300 rounded-lg px-3 py-2 text-sm w-full"
            />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Timezone
            </span>
            <select
              value={timezone}
              onChange={handleTimezoneChange}
              className="text-input border border-neutral-300 rounded-lg px-3 py-2 text-sm w-full bg-white"
            >
              {TIMEZONE_OPTIONS.map((tz) => (
                <option key={tz.iana} value={tz.iana}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* BOTTOM — Full-width calendar */}
        <div className="flex justify-center items-start px-4 pt-2 pb-4">
          <DayPicker
            mode="single"
            selected={selectedDay}
            onSelect={handleDaySelect}
            footer={
              formattedPreview ? (
                <p className="text-xs text-neutral-500 text-center pt-2">
                  <span className="font-medium text-neutral-700">{formattedPreview}</span>
                </p>
              ) : (
                <p className="text-xs text-neutral-400 text-center pt-2">Pick a date</p>
              )
            }
            classNames={{
              today: "border-transparent bg-neutral-200",
              selected: "bg-neutral-600 border-transparent text-white",
              root: defaultClassNames.root,
              chevron: "fill-black-500",
            }}
          />
        </div>

      </div>
    </div>
  );
}

export default EventDateTimeInput;
