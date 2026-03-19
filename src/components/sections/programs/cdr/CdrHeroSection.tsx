import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import MaskText from "@/components/animation/OpacityMoveYInViewAnimation";
import { useTranslation } from "next-i18next";

function CdrHeroSection() {
  const { t } = useTranslation("programs");
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.9], [0.5, 1]), {
    stiffness: 200,
    damping: 30,
  });

  return (
    <section className="w-full bg-[#034D6B] py-16 md:py-24 overflow-hidden">
      <div className="flex flex-col w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mt-16">
          <MaskText positionFrom={40} triggerOnce={true} animationDelay={0} extraClassNames="text-center text-bold-2xl md:text-bold-3xl text-white pb-4">
            {t("cdrPage.hero.abbreviation")}
          </MaskText>
          <MaskText positionFrom={20} triggerOnce={true} animationDelay={0.15} extraClassNames="text-center text-[#E0C759]/70 text-sm md:text-base font-medium tracking-[6px] uppercase">
            {t("cdrPage.hero.fullName")}
          </MaskText>
        </div>

        {/* Circular image with scale-on-scroll */}
        <motion.div
          ref={imageRef}
          style={{ scale }}
          className="relative w-[70vw] -mt-[50px] max-w-[800px] aspect-square mx-auto rounded-full overflow-hidden"
        >
          <Image
            src="/assets/images/programs/cdr-header.png"
            alt="Carbon Dioxide Removal"
            fill
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default CdrHeroSection;
