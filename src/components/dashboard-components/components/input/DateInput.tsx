import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import CheckIcon from "../../../../../public/assets/dashboard_assets/check_input.svg";
import ErrorIcon from "../../../../../public/assets/dashboard_assets/error_input.svg";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { setHours, setMinutes } from "date-fns";
import { convertDateTime } from "@/utils/dayjs_functions";

type Props = {
  isRequired?: boolean;
  onInputChange: (value: any) => void;
  labelText?: string;
  note?: string;
  value?: Date | null;
  isWide?: boolean;
  disabled?: boolean;
};

function DateInput({
  isRequired = true,
  onInputChange,
  value,
  labelText = "Text input",
  isWide = true,
  note,
  disabled = false,
}: Props) {
  const defaultClassNames = getDefaultClassNames();
  const [isValidBool, setIsValidBool] = useState<"valid" | "invalid" | "empty">(
    "empty"
  );
  const [selected, setSelected] = useState<Date>();
  const [timeValue, setTimeValue] = useState<string>("00:00");

  function returnOutputHandler(inputValue: Date) {
    if (!inputValue) {
      setIsValidBool(isRequired ? "invalid" : "empty");
      onInputChange(null);
    } else {
      setIsValidBool("valid");
      onInputChange(inputValue);
    }
  }

  useEffect(() => {
    if (value !== null && value !== undefined) {
      setSelected(value);
    } else {
      setSelected(undefined);
      setIsValidBool("empty");
    }
  }, [value]);

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selected) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(selected, minutes), hours);
    setSelected(newSelectedDate);
    setTimeValue(time);
    returnOutputHandler(newSelectedDate);
  };

  const handleDaySelect = (date: Date | undefined) => {
    if (!timeValue || !date) {
      setSelected(date);
      return;
    }
    const [hours, minutes] = timeValue
      .split(":")
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    );
    setSelected(newDate);

    returnOutputHandler(newDate);
  };

  return (
    <div className={`${isWide ? "w-full" : ""} flex flex-col gap-[6px]`}>
      {labelText && (
        <label
          htmlFor="text"
          className="paragraph-text flex flex-row justify-between"
        >
          <span>
            {labelText}
            <span className="text-red-700">{isRequired ? "*" : ""}</span>
          </span>

          <div className="flex-none">
            {isValidBool === "valid" && (
              <CheckIcon width="13" height="13" viewBox="0 0 13 13" />
            )}
            {isValidBool === "invalid" && (
              <ErrorIcon width="13" height="13" viewBox="0 0 13 13" />
            )}
          </div>
        </label>
      )}

      {note && (
        <p className="paragraph-text-very-small text-neutral-500">{note}</p>
      )}

      <div className="flex flex-row justify-center text-input">
        <div className=" flex flex-col gap-8 justify-center items-center p-12 max-w-[450px]">
          <div className="flex flex-col gap-2 w-full">
            Set the time:{" "}
            <input className="text-input border-neutral-300" type="time" value={timeValue} onChange={handleTimeChange} />
          </div>

          <DayPicker
            mode="single"
            required
            selected={selected}
            onSelect={handleDaySelect}
            footer={
              selected
                ? `Selected: ${convertDateTime(selected)} UTC`
                : "Pick a day."
            }
            timeZone="UTC"
            classNames={{
              today: `border-transparent bg-neutral-200`, // Add a border to today's date
              selected: `bg-neutral-600 border-transparent text-white`, // Highlight the selected day
              root: `${defaultClassNames.root}`, // Add a shadow to the root element
              chevron: ` fill-black-500`, // Change the color of the chevron
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default DateInput;
