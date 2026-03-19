import React from "react";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import PrimaryButton from "../button/PrimaryButton";
import { useTranslation } from "next-i18next";

function Section() {
  const { t } = useTranslation("common");
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 640px) and (max-width: 1024px)",
  });

  return (
    <div className="h-full w-full bg-th-background  relative flex flex-col transition-all duration-200">
      <div
        className="h-full relative flex flex-col justify-center
        max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-24"
      >
        {/** Our Story Content */}
        <div className="flex flex-col items-center gap-4 w-full h-fullrelative">
          <h1
            style={{
              lineHeight: isMobile ? "40px" : isTablet ? "60px" : "130px",
            }}
            className="secondarybold text-[#E0C759] flex flex-col text-[50px] md:text-[80px] lg:text-[150px] uppercase"
          >
            {t("notFound.code")}
          </h1>

          <p
            className={`text-black md:max-w-[1200px] w-full text-normal-base text-center`}
          >
            {t("notFound.message")}
          </p>

          <Link className="" href={"/"} passHref>
            <PrimaryButton title={t("notFound.returnHome")} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Section;
