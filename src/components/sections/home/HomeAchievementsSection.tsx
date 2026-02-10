import PrimaryButton from "@/components/button/PrimaryButton";
import { homeContent } from "@/utils/content";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useMediaQuery } from "react-responsive";

function HomeAchievementsSection() {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 640px) and (max-width: 1024px)",
  });
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px) and (max-width: 1280px)",
  });

  return (
    <section className="w-full flex flex-col">
      {/* Content */}
      <div className=" flex flex-row justify-between w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        <div></div>
      </div>
    </section>
  );
}

export default HomeAchievementsSection;
