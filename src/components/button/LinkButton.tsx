import React from "react";
import Link from "next/link";
import ArrowRightIcon from "../../../public/assets/icons/menu_arrow_right.svg";

type Props = {
  classNames?: string;
  title: string;
  href: string;
  colorType?: "red" | "blue";
};

export default function LinkButton({
  title,
  classNames = "bg-th-accent-medium hover:bg-th-accent-dark",
  href,
  colorType = "red",
}: Props) {
  return (
    <button type="button" className="hover:shadow-xl shadow-white">
      <Link
        style={{
          boxShadow: "0px 0px 15px 0px rgba(255,255,255,0.40) inset",
          WebkitBoxShadow: "0px 0px 15px 0px rgba(255,255,255,0.40) inset", // For Safari
          MozBoxShadow: "0px 0px 15px 0px rgba(255,255,255,0.40) inset", // For older Firefox versions
          background:
            colorType === "red"
              ? "radial-gradient(circle, rgba(255,76,76,1) 0%, rgba(184,5,5,1) 90%)"
              : "radial-gradient(circle, rgba(76,127,255,1) 0%, rgba(5,47,184,1) 90%)",
        }}
        className={`${classNames} hover:shadow-xl shadow-white text-white rounded-full  flex flex-row gap-4 items-center
          justify-between text-normal tracking-[0px] px-6 lg:px-6 py-3   transition-all duration-200`}
        href={href}
        passHref
      >
        {title}
        <ArrowRightIcon
          className="fill-white"
          width="7"
          height="9"
          viewBox="0 0 5 7"
        />
      </Link>
    </button>
  );
}
