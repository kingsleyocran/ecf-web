import React from "react";

type Props = {
  accessor: string;
  size?: "big" | "small";
};

export default function Chip({ accessor, size = "big" }: Props) {
  function getCSSClassName() {
    if (size === "big") {
      return "h-[35px] flex flex-row justify-center items-center  px-4 rounded-full text-sm font-medium";
    } else {
      return "h-[20px] flex flex-row justify-center items-center  px-2 rounded-full text-xs font-medium";
    }
  }

  return (
    <div className={` flex flex-row justify-center items-center `}>
      <div className={`bg-neutral-500 text-white ` + getCSSClassName()}>
        <p className="line-clamp-1">
          {accessor.charAt(0).toUpperCase() +
            accessor
              .slice(1)
              .replace(/-([a-z])/g, (_, c) => " " + c.toUpperCase())}
        </p>
      </div>
    </div>
  );
}
