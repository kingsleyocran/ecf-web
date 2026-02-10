import { useEffect, useState } from "react";
import SelectCheckIcon from "../../../../../public/assets/dashboard_assets/select_check.svg";

type Props = {
  onInputChange: (value: any) => void;
  value: boolean;
  isWide?: boolean;
  labelText?: string;
  isRequired?: boolean;
};

function BooleanSingleSelect({
  onInputChange,
  value,
  isWide = true,
  labelText = "Label text",
  isRequired = true,
}: Props) {
  const [selected, setSelected] = useState<boolean>(false);
  useEffect(() => {
    setSelected(value);
  }, [value]);

  const options = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  return (
    <div className={`${isWide ? "w-full" : ""} flex flex-col gap-1`}>
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

          </div>
        </label>
      )}

      <div className={`${isWide ? "justify-between" : "gap-12"} flex flex-row`}>
        {options.map((e, _x) => (
          <button
            key={_x}
            type="button"
            onClick={() => {
              setSelected(e.value as boolean);
              onInputChange(e.value as boolean);
            }}
            className="font-medium text-black text-sm flex flex-row gap-2 justify-start items-center h-12 md:h-10 lg:h-9   rounded-lg th-text-size cursor-pointer"
          >
            <div
              style={{
                backgroundColor:
                  selected === e.value
                  ? "black"
                  : "white",
              }}
              className={`  h-[18px] w-[18px] rounded-md border-[0.5px] border-th-stroke-primary flex flex-col justify-center items-center`}
            >
              {selected === e.value && (
                <SelectCheckIcon fill={"white"} />
              )}
            </div>
            {e.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BooleanSingleSelect;
