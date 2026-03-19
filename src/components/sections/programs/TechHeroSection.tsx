import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslation } from "next-i18next";

function TechHeroSection() {
  const { t } = useTranslation("programs");
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 200, damping: 30 };
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.9], [0.5, 1]),
    springConfig
  );

  return (
    <section className="w-full bg-[#034D6B] py-16 md:py-24 overflow-hidden">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mt-16">
          <p className="text-white/80 text-sm md:text-base font-medium tracking-widest uppercase mb-4">
            {t("techHero.label")}
          </p>
          <h1 className="text-bold-2xl md:text-bold-3xl text-[#E0C759] mb-4">
            {t("techHero.heading")}
          </h1>
          <p className="text-normal-base text-white/80 max-w-lg mx-auto mt-4">
            {t("techHero.description")}
          </p>
        </div>

        {/* Circular image with scale-on-scroll */}
        <motion.div
          ref={imageRef}
          style={{ scale }}
          className="relative w-[70vw] max-w-[800px] aspect-square mx-auto rounded-full overflow-hidden"
        >
          <Image
            src="/assets/images/test-image.png"
            alt="ECF team"
            fill
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default TechHeroSection;
