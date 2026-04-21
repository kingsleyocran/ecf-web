import Image from "next/image";
import { motion } from "framer-motion";
import OpacityMoveYInViewAnimation from "@/components/animation/OpacityMoveYInViewAnimation";
import { useTranslation } from "next-i18next";

function AboutHeroSection() {
  const { t } = useTranslation("about");

  const paragraphs = [t("hero.para1"), t("hero.para2"), t("hero.para3")];

  return (
    <section className="relative bg-[#034D6B] ">
      {/* Sticky background — stays pinned while text scrolls over it (desktop only) */}
      <div className="md:sticky top-[40px] w-full h-[calc(100vh-40px)] overflow-hidden">
        <div className="md:h-full w-full max-w-[1920px] 2xl:mx-auto px-4 md:p-8 lg:p-8 ">
          {/* Image container with padding and rounded corners */}
          <div className="md:mt-0 mt-[70px] relative w-full h-[400px] md:h-full rounded-2xl md:rounded-[20px] overflow-hidden">
            <Image
              src="/assets/images/about-banner.png"
              alt="About hero background"
              fill
              style={{ objectFit: "cover" }}
              priority
            />

            {/* Dark overlay */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-[#034D6B]/95 via-[#034D6B]/85 to-[#034D6B]/70 " />

            <div className="block md:hidden absolute inset-0 bg-gradient-to-b from-[#034D6B]/30 via-[#034D6B]/85 to-[#034D6B]/95 " />

            {/* Left-side heading — inside the image container */}
            <div className="relative z-10 h-full flex flex-col justify-end md:justify-start px-4 md:px-8 lg:px-16 pb-8 md:pb-0 md:pt-24">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.33, 1, 0.68, 1],
                  delay: 0.2,
                }}
                className="text-white/80 text-sm md:text-base font-medium tracking-widest uppercase mb-4"
              >
                {t("hero.label")}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.33, 1, 0.68, 1],
                  delay: 0.35,
                }}
                className="text-bold-2xl md:text-bold-3xl text-[#E0C759] max-w-2xl"
              >
                {t("hero.heading")}
              </motion.h1>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling text layer — overlays sticky background on desktop, flows after on mobile */}
      <div className="relative z-10 -mt-[30vh]">
        <div className="flex flex-col items-end md:pb-[40vh] w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-20">
          {paragraphs.map((text, index) => (
            <div key={index} className="max-w-[420px] mb-[50px] md:last:mb-[20vh]">
              <OpacityMoveYInViewAnimation
                positionFrom={40}
                duration={0.8}
                animationDelay={0.1}
                triggerOnce={false}
                extraClassNames="md:text-right"
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
