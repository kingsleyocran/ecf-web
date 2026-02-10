import React from "react";

type Props = { title: string };

export default function SectionLabel({ title }: Props) {
  return (
    <div
      style={{
        boxShadow: "0px 0px 15px 5px rgba(255,255,255,0.09) inset",
        WebkitBoxShadow: "0px 0px 15px 5px rgba(255,255,255,0.09) inset", // For Safari
        MozBoxShadow: "0px 0px 15px 5px rgba(255,255,255,0.09) inset", // For older Firefox versions
        lineHeight: "10px",
      }}
      className={`tracking-[10px] border-[0.5px] border-white/20 text-white rounded-full flex flex-row gap-4 items-center
              justify-between text-[10px] md:text-[9px] px-6 py-2 transition-all duration-200`}
    >
      {title}
    </div>
  );
}
