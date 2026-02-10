import PrimaryButton from "@/components/button/PrimaryButton";
import { homeContent } from "@/utils/content";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useMediaQuery } from "react-responsive";
import HomeAboutSection from "./HomeAboutSection";

function HomeHeroSectrion() {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 640px) and (max-width: 1024px)",
  });
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px) and (max-width: 1280px)",
  });

  return (
    <section className="flex flex-col  w-full">
      <div className="h-[110vh] relative">
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-[110vh]">
          <Image
            src="/assets/images/hero.png"
            alt="Home Hero Background"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "bottom center",
            }}
            priority
          />
        </div>

        {/* Content */}
        <div className="absolute flex flex-col justify-center items-center w-full h-[92vh] max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
          <div className="pt-6">
            <h1 className="text-bold-3xl text-white flex flex-col items-center gap-2">
              <span>Empowering Africa</span>

              <div className="flex flex-row gap-4 items-center">
                <span>to Lead</span>

                <div className="h-[70px] w-[70px] relative">
                  <Image
                    src="/assets/images/globe.png"
                    alt="Home Hero Background"
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "bottom center",
                    }}
                    priority
                  />
                </div>

                <span>
                  the <span className="text-[#E0C759]">Climate</span>
                </span>
              </div>

              <span className="text-[#E0C759]">Technology Frontier</span>
            </h1>

            <p className="text-white max-w-[600px] text-normal-base text-center mt-6">
              Building local capacity, fostering innovation, and amplifying
              African voices in the global conversation on Frontier Climate
              Technologies
            </p>

            <div className="flex flex-row gap-4 mt-6 justify-center">
              <Link href="/get-involved" passHref>
                <PrimaryButton title="Access Resources" variant="white" />
              </Link>

              <Link href="/get-involved" passHref>
                <PrimaryButton title="Join the Movement" variant="blue-light" />
              </Link>
            </div>
          </div>
        </div>

        {/* Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-[28vh]">
          <Image
            src="/assets/images/hero-overlay.png"
            alt="Home Hero Background"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "top center",
            }}
            priority
          />
        </div>
      </div>

      <div>
        <HomeAboutSection />
      </div>
    </section>
  );
}

export default HomeHeroSectrion;
