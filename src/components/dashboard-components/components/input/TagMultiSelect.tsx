import { useEffect, useState } from "react";
import CheckIcon from "../../../../../public/assets/dashboard_assets/check_input.svg";
import ErrorIcon from "../../../../../public/assets/dashboard_assets/error_input.svg";
import SelectCheckIcon from "../../../../../public/assets/dashboard_assets/select_check.svg";
import Chip from "./Chip";

type Props = {
  isRequired?: boolean;
  onInputChange: (value: any) => void;
  labelText?: string;
  note?: string;
  value?: string[] | null;
  chipList: string[];
};

function TagMultiSelect({
  isRequired = true,
  onInputChange,
  value,
  labelText = "Label Text",
  note,
  chipList,
}: Props) {
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

    console.log("returnVal", returnVal);

    setSelectedValues(returnVal);

    if (returnVal.length > 0) {
      setIsValidBool("valid");
      onInputChange(returnVal);
    } else {
      isRequired ? setIsValidBool("invalid") : setIsValidBool("empty");
      onInputChange(null);
    }
  }

  useEffect(() => {
    if (value !== null && value !== undefined && value.length > 0) {
      setSelectedValues(value);
    } else {
      setSelectedValues([]);
      isRequired ? setIsValidBool("invalid") : setIsValidBool("empty");
    }
  }, [value, isRequired]);

  return (
    <div className={`w-full flex flex-col gap-[6px]`}>
      {labelText && (
        <label
          htmlFor="text"
          className="font-medium text-black text-sm flex flex-row justify-between"
        >
          <span>
            {labelText}
            <span className="text-red-700">{isRequired ? "*" : ""}</span>
          </span>

          {isValidBool === "valid" && (
            <CheckIcon width="13" height="13" viewBox="0 0 13 13" />
          )}
          {isValidBool === "invalid" && (
            <ErrorIcon width="13" height="13" viewBox="0 0 13 13" />
          )}
        </label>
      )}

      <div className="flex flex-col items-start w-full gap-1.5">
        <ul className="!list-none pl-0">
          {chipList.map((p, idx) => (
            <li
              key={idx}
              style={{
                cursor: "pointer",
                padding: "3px",
              }}
              onClick={() => {
                inputHandler(p as any);
              }}
            >
              <div className="flex flex-row gap-2 items-center">
                <div
                  className={` h-[18px] w-[18px] rounded-md border-[0.5px] border-neutral-400 flex flex-col
                  justify-center items-center`}
                  style={{
                    backgroundColor: selectedValues.includes(p)
                      ? "black"
                      : "white",
                  }}
                >
                  {selectedValues.includes(p) && (
                    <SelectCheckIcon style={{ fill: "white" }} />
                  )}
                </div>

                <Chip accessor={p} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {note && (
        <p className="paragraph-text-very-small text-neutral-500">{note}</p>
      )}
    </div>
  );
}

export default TagMultiSelect;
