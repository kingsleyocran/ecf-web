import { useEffect, useRef, useState } from "react";
import CheckIcon from "../../../../../public/assets/dashboard_assets/check_input.svg";
import ErrorIcon from "../../../../../public/assets/dashboard_assets/error_input.svg";

type Props = {
  isRequired?: boolean;
  onInputChange: (value: any) => void;
  labelText?: string;
  note?: string;
  placeholderText?: string;
  value?: string | null | number;
  isWide?: boolean;
  validationRegex: RegExp;
  type?: string;
  disabled?: boolean;
  maxLength?: number;
};

function TextInput({
  isRequired = true,
  onInputChange,
  value,
  labelText = "Text input",
  placeholderText = "Text",
  isWide = true,
  validationRegex,
  type = "text",
  note,
  disabled = false,
  maxLength,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(value?.toString() || "");
  const [isValidBool, setIsValidBool] = useState<"valid" | "invalid" | "empty">(
    "empty"
  );

  function inputHandler(inputValue: string) {
    setInputValue(inputValue);

    if (inputValue.trim() === "") {
      setIsValidBool(isRequired ? "invalid" : "empty");
      onInputChange(null);
    } else if (validationRegex.test(inputValue.trim())) {
      setIsValidBool("valid");
      onInputChange(type === "number" ? Number(inputValue) : inputValue.trim());
    } else {
      setIsValidBool("invalid");
      onInputChange(null);
    }
  }

  useEffect(() => {
    if (value !== null && value !== undefined) {
      setInputValue(value.toString());
    } else {
      setInputValue("");
      setIsValidBool("empty");
    }
  }, [value]);

  return (
    <div className={`${isWide ? "w-full" : ""} flex flex-col gap-[6px]`}>
      {labelText && (
        <label
          htmlFor="text"
          className="font-medium text-black text-sm flex flex-row justify-between"
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

      {note && <p className="text-sm font-normal text-neutral-500">{note}</p>}

      <input
        ref={inputRef}
        name="text"
        type={type}
        autoComplete="off"
        className={` ${
          disabled ? "bg-white cursor-not-allowed" : ""
        } flex flex-row items-center bg-white p-3
    focus:ring-transparent font-medium text-black w-full placeholder:text-neutral-400 text-base
    md:text-sm lg:text-sm outline-none tracking-[0px] rounded-lg border-[1px] border-transparent active:border-neutral-300 focus:border-neutral-300`}
        placeholder={placeholderText}
        disabled={disabled}
        value={inputValue}
        onChange={(event) => inputHandler(event.target.value)}
        maxLength={maxLength}
      />
      {maxLength && (
        <div className="flex justify-end font-medium text-xs">
          {inputValue.length}/{maxLength}
        </div>
      )}
    </div>
  );
}

export default TextInput;
