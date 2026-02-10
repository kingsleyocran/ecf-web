import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import SearchIcon from "../../../../../public/assets/dashboard_assets/search.svg";
import CloseIcon from "../../../../../public/assets/dashboard_assets/close.svg";

type Props = {
  onInputChange: (value: any) => void;
  note?: string;
  searchPlaceholderText: string;
  value: string | null;
  isWide?: boolean;
};

// Custom debounce hook
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

function DashboardSearchBox({
  onInputChange,
  value,
  searchPlaceholderText = "entity",
  isWide = true,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(value?.toString() || "");
  const debouncedQuery = useDebounce(inputValue, 500);

  const validationRegex = useMemo(() => /^.{2,}$/, []);

  const inputHandler = useCallback((inputValue: string) => {
    setInputValue(inputValue);

    if (inputValue.trim() === "") {
      onInputChange(null);
    } else if (validationRegex.test(inputValue.trim())) {
      onInputChange(inputValue.trim());
    } else {
      onInputChange(null);
    }
  }, [onInputChange, validationRegex]);

  useEffect(() => {
    if (value !== null && value !== undefined) {
      setInputValue(value.toString());
    } else {
      setInputValue("");
    }
  }, [value]);

  useEffect(() => {
    inputHandler(inputValue);
  }, [debouncedQuery, inputValue, inputHandler]);

  return (
    <div className={`${isWide ? "w-full" : ""} flex flex-col`}>
      <div
        className="relative flex flex-row items-center bg-white px-3 py-0
          focus:ring-transparent w-full placeholder:text-neutral-400 text-base
          md:text-sm lg:text-xs tracking-[0px] rounded-full border-[1px] border-transparent focus:border-neutral-300"
      >
        <input
          ref={inputRef}
          name="text"
          type={"text"}
          autoComplete="off"
          className={`ml-3
          focus:ring-transparent w-full placeholder:text-neutral-400 text-base
          md:text-sm lg:text-xs tracking-[0px] border-transparent focus:border-transparent`}
          placeholder={`Search by ${searchPlaceholderText}`}
          disabled={false}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          maxLength={100}
        />
        <div className="absolute inset-y-0  py-2.5">
          <SearchIcon width="14" height="14" viewBox="0 0 18 18" />
        </div>

        {inputValue && (
          <button
            onClick={() => {
              setInputValue("");
            }}
            type="button"
            className="bg-neutral-600 h-[20px] w-[20px] rounded-full  absolute inset-y-0 right-0 mx-[10px] my-1.5 flex flex-row items-center justify-center"
          >
            <CloseIcon
              fill="#fff"
              width="8"
              height="8"
              viewBox="0 0 27.1 27.1"
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default DashboardSearchBox;
