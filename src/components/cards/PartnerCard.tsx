import React, { useState } from "react";
import Image from "next/image";

type Props = { data: any };

export default function PartnersCard({ data }: Props) {
  const [onHover, setonHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setonHover(true)}
      onMouseLeave={() => setonHover(false)}
      style={onHover ? {
        boxShadow: "0px 0px 30px 5px rgba(12,57,213,1) inset",
        WebkitBoxShadow: "0px 0px 30px 5px rgba(12,57,213,1) inset", // For Safari
        MozBoxShadow: "0px 0px 30px 5px rgba(12,57,213,1) inset", // For older Firefox versions
      }:{
        boxShadow: "0px 0px 15px 5px rgba(255,255,255,0.09) inset",
        WebkitBoxShadow: "0px 0px 15px 5px rgba(255,255,255,0.09) inset", // For Safari
        MozBoxShadow: "0px 0px 15px 5px rgba(255,255,255,0.09) inset", // For older Firefox versions
      }}
      className="border-[0.5px] transition-all duration-150 border-white/20 hover:border-[#0C39D5]/80 h-100 lg:h-[120px] w-full rounded-lg p-8"
    >
      <div className="h-full w-full relative">
        <Image
          src={data.imgUrl}
          alt={data.title}
          fill
          style={{ objectFit: "contain", objectPosition: "center" }}
          priority
        />
      </div>
    </div>
  );
}
