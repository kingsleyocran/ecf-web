import React, { useState } from "react";
import Link from "next/link";

type Props = { title: string; href: string };

export default function LinkButtonWhite({ title, href }: Props) {
  const [onHover, setonHover] = useState(false);

  return (
    <button
      onMouseEnter={() => setonHover(true)}
      onMouseLeave={() => setonHover(false)}
      type="button"
    >
      <Link
        style={
          onHover
            ? {
                boxShadow: "0px 0px 15px 5px rgba(255,76,76,0.40) inset",
                WebkitBoxShadow: "0px 0px 15px 5px rgba(255,76,76,0.40) inset", // For Safari
                MozBoxShadow: "0px 0px 15px 5px rgba(255,76,76,0.40) inset", // For older Firefox versions
                background:
                  "linear-gradient(to top, rgba(184,5,5,0.6) 10%, rgba(255,76,76,0.0) 100%)",
              }
            : {
                boxShadow: "0px 0px 15px 5px rgba(255,255,255,0.12) inset",
                WebkitBoxShadow:
                  "0px 0px 15px 5px rgba(255,255,255,0.12) inset", // For Safari
                MozBoxShadow: "0px 0px 15px 5px rgba(255,255,255,0.12) inset", // For older Firefox versions
                background:
                  "linear-gradient(to top, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0.0) 100%)",
              }
        }
        className={`border-[0.5px] border-white/30 hover:border-[#B80505]/30 text-white rounded-full flex flex-row gap-4 items-center
              justify-between text-normal tracking-[0px] px-8 lg:px-8 py-3 transition-all duration-200`}
        href={href}
        passHref
      >
        {title}
      </Link>
    </button>
  );
}
