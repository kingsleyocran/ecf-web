import React from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import CheckIcon from "../../../../../public/assets/dashboard_assets/check_input.svg";
import ErrorIcon from "../../../../../public/assets/dashboard_assets/error_input.svg";
import SearchIcon from "../../../../../public/assets/dashboard_assets/search.svg";
import AddIcon from "../../../../../public/assets/dashboard_assets/add.svg";
import CloseIcon from "../../../../../public/assets/dashboard_assets/close.svg";

type Props = {
  dataList: string[];
  isRequired?: boolean;
  onInputChange: (value: any) => void;
  labelText?: string;
  note?: string;
  value?: string[] | null;
  customInputPlaceholder?: string;
  enableCustomTextInput?: boolean;
};

export default function MultiAddFromSelectDropdown({
  dataList,
  isRequired = true,
  onInputChange,
  value,
  labelText = "Label Text",
  note,
  customInputPlaceholder = "Enter value",
  enableCustomTextInput = false,
}: Props) {
  const [dropDownPositionTop, setDropDownPositionTop] = useState(true);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      const clickY = event.clientY;
      const viewportHeight = window.innerHeight;
      const position: boolean = clickY > viewportHeight * 0.7;
      setDropDownPositionTop(position);
    }
    const button = buttonRef.current;
    if (button) {
      button.addEventListener("click", handleMouseDown);
    }
    return () => {
      if (button) {
        button.removeEventListener("click", handleMouseDown);
      }
    };
  }, []);

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isValidBool, setIsValidBool] = useState<"valid" | "invalid" | "empty">(
    "empty"
  );

  function inputHandler(val: string) {
    let returnVal = [];
    if (selectedValues.includes(val)) {
      returnVal = selectedValues.filter((selected) => selected !== val);
    } else {
      returnVal = [...selectedValues, val];
    }

    setSelectedValues(returnVal);

    if (returnVal.length > 0) {
      setIsValidBool("valid");
      onInputChange(returnVal);
      setSearchQuery("")
    } else {
      isRequired ? setIsValidBool("invalid") : setIsValidBool("empty");
      onInputChange(null);
    }
  }

  useEffect(() => {
    if (value !== null && value !== undefined && value.length > 0) {
      setSelectedValues(value);
    } else {
      resetForm()
      setSelectedValues([])
      isRequired ? setIsValidBool("invalid") : setIsValidBool("empty");
    }
  }, [value, isRequired]);

  const [searchQuery, setSearchQuery] = useState("");
  const [otherTextValue, setOtherTextValue] = useState("");

  const filteredList =
    searchQuery === ""
      ? dataList
      : dataList.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(searchQuery.toLowerCase().replace(/\s+/g, ""))
        );

  function resetForm() {
    setSearchQuery("");
    setOtherTextValue("");
  }

  return (
    <div className="relative w-full flex flex-col gap-[6px]">
      {labelText && (
        <label
          htmlFor="text"
          className="font-medium text-black text-sm flex flex-row justify-between"
        >
          <span>
            {labelText}
            <span className="text-red-700">{isRequired ? "*" : ""}</span>
          </span>

          {isValidBool === "valid" && isRequired && (
            <CheckIcon width="13" height="13" viewBox="0 0 13 13" />
          )}
          {isValidBool === "invalid" && isRequired && (
            <ErrorIcon width="13" height="13" viewBox="0 0 13 13" />
          )}
        </label>
      )}

      {/*  */}
      {selectedValues.length > 0 && (
        <div className="flex flex-col w-full gap-1">
          {selectedValues &&
            selectedValues.map((data: string, _x) => (
              <button
                key={_x}
                type="button"
                onClick={() => {
                  inputHandler(data);
                }}
                className="flex flex-row justify-between items-center w-full py-3 px-3
                rounded-lg font-medium text-black text-sm bg-white border-neutral-300 border-[0.5px]"
              >
                {data}

                <CloseIcon
                  fill="black"
                  width="9"
                  height="9"
                  viewBox="0 0 27.1 27.1"
                />
              </button>
            ))}
        </div>
      )}

      <Popover className="relative">
        {({ open }) => (
          <>
            <PopoverButton
              ref={buttonRef}
              className={`
                font-medium text-black text-sm
                group flex flex-row gap-2 items-center rounded-md bg-white px-3 py-2  focus:outline-none `}
            >
              <AddIcon />
              <span>Add</span>
            </PopoverButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel
                data-lenis-prevent="true"
                className={`absolute left-0 z-50 mt-2 w-300 origin-top-left bg-white
                  shadow-md rounded-lg p-2
                  ${dropDownPositionTop ? " -top-[750%]" : "top-[100%]"}`}
              >
                <div className={`flex flex-col gap-2`}>
                  {/* Search text input */}
                  <div className=" w-full px-2.5 flex flex-row items-center h-[45px] md:h-[35px] flex-1 bg-white font-medium text-black text-sm  rounded-lg border-[0.5px] border-neutral-400 focus:border-neutral-500">
                    <SearchIcon
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="black"
                    />
                    <div className="flex-1 ">
                      <input
                        name="text"
                        type="text"
                        className="border-none w-full bg-transparent placeholder:text-neutral-400 font-medium text-black text-sm"
                        placeholder="Search"
                        onChange={(event) => {
                          setSearchQuery(event.target.value);
                        }}
                      />
                    </div>
                  </div>

                  {/*  Search results list */}
                  <div className="h-[150px]  flex flex-col gap-1  overflow-y-auto">
                    {filteredList &&
                      filteredList.map((data: string, _x) => (
                        <PopoverButton
                          key={_x}
                          onClick={() => {
                            inputHandler(data);
                          }}
                          className="flex flex-row w-full py-1.5 px-3 rounded-lg font-medium text-black text-sm hover:bg-neutral-100"
                        >
                          {data}
                        </PopoverButton>
                      ))}

                    {filteredList.length === 0 && (
                      <div className="flex flex-row justify-center items-center h-150 text-xs">
                        Sorry, there are no result here
                      </div>
                    )}
                  </div>

                  {/* Other Text Input */}
                  {enableCustomTextInput && (
                    <PopoverPanel className={"block"}>
                      {({ close }) => (
                        <div className="flex flex-row justify-start items-center gap-2">
                          <p className="pl-3 pr-1 font-medium text-black text-sm">Other</p>
                          <div className="w-full  flex flex-row items-center h-[45px] md:h-[35px] flex-1 bg-white font-medium text-black text-sm  rounded-lg border-[0.5px] border-neutral-400 focus:border-neutral-500">
                            <input
                              name="text"
                              type="text"
                              className="border-none w-full bg-transparent placeholder:text-neutral-400 font-medium text-black text-sm"
                              placeholder={customInputPlaceholder}
                              onChange={(event) => {
                                setOtherTextValue(event.target.value);
                              }}
                            />
                          </div>

                          <button
                            disabled={otherTextValue.length < 2}
                            onClick={() => {
                              inputHandler(otherTextValue);
                              close();
                            }}
                            type="button"
                            className={`px-3 font-medium text-black text-sm flex flex-row justify-center items-center rounded-lg 
                            ${
                              otherTextValue.length < 2
                                ? " cursor-not-allowed opacity-40"
                                : " bg-neutral-600 active:scale-95"
                            } 
                            bg-neutral-400 text-white th-text-size h-[45px] md:h-[35px] text-center transition-all duration-200`}
                          >
                            Confirm
                          </button>
                        </div>
                      )}
                    </PopoverPanel>
                  )}
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
