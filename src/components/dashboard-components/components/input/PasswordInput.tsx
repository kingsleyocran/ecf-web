import { useEffect, useRef, useState } from "react";
import CheckIcon from "../../../../../public/assets/dashboard_assets/check_input.svg";
import ErrorIcon from "../../../../../public/assets/dashboard_assets/error_input.svg";

type Props = {
  isRequired?: boolean;
  onInputChange: (value: any) => void;
  labelText?: string;
  placeholderText?: string;
  value?: string | null;
  isWide?: boolean;
  validationRegex: RegExp;
  compareTo?: string;
  disabled?: boolean;
  note?: string;
};

function PasswordInput({
  isRequired = true,
  onInputChange,
  value,
  labelText = "Text input",
  placeholderText = "Text",
  isWide = true,
  validationRegex,
  compareTo,
  note,
  disabled = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
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
      onInputChange(inputValue);
    } else {
      setIsValidBool("invalid");
      onInputChange(null);
    }
  }

  useEffect(() => {
    if (value !== null && value !== undefined) {
      setInputValue(value.toString());
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

      {note && <p className="font-medium text-sm text-neutral-500">{note}</p>}

      <div className="relative">
        <input
          ref={inputRef}
          name="password"
          type={showPassword ? "text" : "password"}
          className={`flex flex-row items-center bg-white p-3
            focus:ring-transparent font-medium text-black w-full placeholder:text-neutral-400 text-base
            md:text-sm lg:text-sm outline-none tracking-[0px] rounded-lg border-[1px] border-transparent active:border-neutral-300 focus:border-neutral-300
            ${disabled ? "bg-white cursor-not-allowed" : ""}`}
          autoComplete="off"
          placeholder={placeholderText}
          disabled={disabled}
          value={inputValue}
          onChange={(event) => {
            inputHandler(event.target.value);
          }}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 px-3 py-2 paragraph-text-very-small
          text-neutral-500 focus:outline-none"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;
