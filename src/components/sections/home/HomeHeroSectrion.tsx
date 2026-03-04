import PrimaryButton from "@/components/button/PrimaryButton";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import HomeAboutSection from "./HomeAboutSection";

function HomeHeroSectrion() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "start start"],
  });

  const springConfig = { stiffness: 400, damping: 30 };

  // About section: starts scaling at ~20% in view, fills by ~70%
  const aboutScale = useSpring(
    useTransform(
      aboutProgress,
      [0.1, 0.3],
      [isMobile ? 0.92 : 0.9, 1]
    ),
    springConfig
  );
  const aboutRadius = useSpring(
    useTransform(aboutProgress, [0.2, 0.3], [40, 0]),
    springConfig
  );

  return (
    <section className="relative">
      {/* Sticky hero — background + content stay pinned in viewport */}
      <div className="sticky top-0 h-[120vh] w-full overflow-hidden">
        {/* Background image — static */}
        <div className="absolute inset-0">
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

        {/* Content — static */}
        <div className="absolute inset-0 z-10 h-[92vh] flex flex-col justify-center items-center w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
          <div className="pt-6">
            <h1 className="text-bold-3xl text-white flex flex-col items-center gap-2">
              <span>Empowering Africa</span>

              <div className="flex flex-row gap-4 items-center">
                <span>to Lead</span>

                <div className="h-[70px] w-[70px] relative">
                  <Image
                    src="/assets/images/globe.png"
                    alt="Globe icon"
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

              <Link href="/donate" passHref>
                <PrimaryButton title="Donate" variant="blue-light" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling layer — overlay + about section scroll over the sticky hero */}
      <div className="relative z-10 -mt-[35vh]">
        {/* Overlay image — scrolls up naturally over the hero */}
        <div className="h-[35vh] relative w-full">
          <Image
            src="/assets/images/hero-overlay.png"
            alt=""
            fill
            style={{
              objectFit: "cover",
              objectPosition: "top center",
            }}
            priority
          />
        </div>

        {/* About section — scales in from small to fill */}
        <motion.div
          ref={aboutRef}
          style={{
            scale: aboutScale,
            borderRadius: aboutRadius,
            transformOrigin: "top center",
          }}
          className="relative overflow-hidden -mt-[15vh]"
        >
          <HomeAboutSection />
        </motion.div>
      </div>
    </section>
  );
}

export default HomeHeroSectrion;
