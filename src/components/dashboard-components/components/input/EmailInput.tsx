import { useEffect, useRef, useState } from "react";
import CheckIcon from "../../../../../public/assets/dashboard_assets/check_input.svg";
import ErrorIcon from "../../../../../public/assets/dashboard_assets/error_input.svg";
import { emailPattern } from "@/utils/regex_utils";

type Props = {
  isRequired?: boolean;
  onInputChange: (value: any) => void;
  labelText?: string;
  placeholderText?: string;
  note?: string;
  value?: string | null;
  isWide?: boolean;
  disabled?: boolean;
};

function EmailInput({
  isRequired = true,
  onInputChange,
  value,
  note,
  labelText = "Email Address",
  placeholderText = "johndoe@gmail.com",
  isWide = true,
  disabled = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(value ?? "");
  const [isValidBool, setIsValidBool] = useState<"valid" | "invalid" | "empty">(
    "empty"
  );

  function inputHandler(inputValue: string) {
    setInputValue(inputValue);

    if (inputValue.trim() === "") {
      setIsValidBool(isRequired ? "invalid" : "empty");
      onInputChange(null);
    } else if (emailPattern.test(inputValue.trim())) {
      setIsValidBool("valid");
      onInputChange(inputValue.trim());
    } else {
      setIsValidBool("invalid");
      onInputChange(null);
    }
  }

  useEffect(() => {
    if (value !== null && value !== undefined) {
      setInputValue(value);
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

      {note && (
        <p className="paragraph-text-very-small text-neutral-500">{note}</p>
      )}

      <input
        ref={inputRef}
        name="email"
        type="email"
        className={`flex flex-row items-center bg-white p-3
    focus:ring-transparent font-medium text-black w-full placeholder:text-neutral-400 text-base
    md:text-sm lg:text-sm outline-none tracking-[0px] rounded-lg border-[1px] border-transparent active:border-neutral-300 focus:border-neutral-300 ${
      disabled ? "bg-th-background cursor-not-allowed" : ""
    }`}
        placeholder={placeholderText}
        disabled={disabled}
        value={inputValue}
        onChange={(event) => inputHandler(event.target.value)}
      />
    </div>
  );
}

export default EmailInput;
