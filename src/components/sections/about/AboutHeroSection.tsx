import Image from "next/image";
import { motion } from "framer-motion";
import OpacityMoveYInViewAnimation from "@/components/animation/OpacityMoveYInViewAnimation";
import { useTranslation } from "next-i18next";

function AboutHeroSection() {
  const { t } = useTranslation("about");

  const paragraphs = [
    t("hero.para1"),
    t("hero.para2"),
    t("hero.para3"),
  ];

  return (
    <section className="relative bg-[#034D6B] ">
      {/* Sticky background — stays pinned while text scrolls over it */}
      <div className="sticky top-[40px]  w-full h-[calc(100vh-40px)] overflow-hidden ">
        <div className="h-full w-full max-w-[1920px] 2xl:mx-auto px-4 md:p-8 lg:p-8 ">
          {/* Image container with padding and rounded corners */}
          <div className="relative w-full h-full rounded-2xl md:rounded-[20px] overflow-hidden">
            <Image
              src="/assets/images/test-image.png"
              alt="About hero background"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#034D6B]/95 via-[#034D6B]/50 to-[#034D6B]/30 " />

            {/* Left-side heading — inside the image container */}
            <div className="relative z-10 h-full flex flex-col justify-start px-4 md:px-8 lg:px-16 pt-16 md:pt-24">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
                className="text-white/80 text-sm md:text-base font-medium tracking-widest uppercase mb-4"
              >
                {t("hero.label")}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: 0.35 }}
                className="text-bold-2xl md:text-bold-3xl text-[#E0C759]"
              >
                {t("hero.heading")}
              </motion.h1>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling text layer — paragraphs scroll over the sticky background */}
      <div className="relative z-10 -mt-[30vh]">
        <div className="flex flex-col items-end pb-[40vh] w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-20">
          {paragraphs.map((text, index) => (
            <div
              key={index}
              className="max-w-[420px] mb-[50px] last:mb-[20vh]"
            >
              <OpacityMoveYInViewAnimation
                positionFrom={40}
                duration={0.8}
                animationDelay={0.1}
                triggerOnce={false}
                extraClassNames="text-right"
              >
                <span className="text-white text-normal-base leading-relaxed">
                  {text}
                </span>
              </OpacityMoveYInViewAnimation>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutHeroSection;
