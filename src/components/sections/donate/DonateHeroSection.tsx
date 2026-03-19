import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay },
  }),
};

function DonateHeroSection() {
  const { t } = useTranslation("donate");

  return (
    <section className="relative bg-[#034D6B]">
      {/* Sticky background */}
      <div className="sticky top-[40px] w-full h-[calc(100vh-40px)] overflow-hidden">
        <div className="h-full w-full max-w-[1920px] 2xl:mx-auto px-4 md:p-8 lg:p-8">
          <div className="relative w-full h-full rounded-2xl md:rounded-[20px] overflow-hidden">
            <Image
              src="/assets/images/test-image.png"
              alt="Donate hero background"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#034D6B]/95 via-[#034D6B]/60 to-[#034D6B]/20" />

            {/* Hero content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-8 lg:px-16">
              <motion.p
                custom={0}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-white/80 text-sm md:text-base font-medium tracking-widest uppercase mb-4"
              >
                {t("hero.label")}
              </motion.p>

              <motion.h1
                custom={0.15}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-bold-2xl md:text-bold-3xl text-[#E0C759] max-w-[700px]"
              >
                {t("hero.heading")}
              </motion.h1>

              <motion.p
                custom={0.3}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-white text-normal-base md:text-normal-lg max-w-[520px] mt-6 leading-relaxed"
              >
                {t("hero.description")}
              </motion.p>

              <motion.div
                custom={0.45}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="mt-8"
              >
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("donate-tiers")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-2 bg-[#0182B5] hover:bg-[#4BB0D9]/90 transition-colors duration-200
                    text-white primarybold rounded-full px-8 py-3 text-base md:text-lg"
                >
                  {t("hero.cta")}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default DonateHeroSection;
