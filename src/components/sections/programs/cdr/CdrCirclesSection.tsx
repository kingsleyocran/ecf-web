import { motion } from "framer-motion";
import MaskText from "@/components/animation/OpacityMoveYInViewAnimation";
import { useTranslation } from "next-i18next";
import { useMediaQuery } from "react-responsive";

function CdrCirclesSection() {
  const { t } = useTranslation("programs");
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const bubbles = t("cdrPage.circles.items", {
    returnObjects: true,
  }) as unknown as string[];

  return (
    <section className="w-full bg-[#025C7F] py-16 md:py-24 overflow-hidden">
      <style>{`
        .stem-gradient-gold-cdr {
          background: linear-gradient(to bottom, #D0B954, transparent);
        }
      `}</style>
      <div className="w-full max-w-[1920px] flex flex-col 2xl:mx-auto px-4 md:px-8 lg:px-16 py-12  items-center gap-36">
        {/* Header */}
        <div className="text-center mt-16 hidden md:block">
          <MaskText
            positionFrom={40}
            triggerOnce={true}
            animationDelay={0}
            extraClassNames="text-center text-bold-2xl md:text-bold-3xl text-white pb-4"
          >
            {t("cdrPage.hero.abbreviation")}
          </MaskText>
          <MaskText
            positionFrom={20}
            triggerOnce={true}
            animationDelay={0.15}
            extraClassNames="text-center text-[#E0C759]/70 text-sm md:text-base font-medium tracking-[6px] uppercase"
          >
            {t("cdrPage.hero.fullName")}
          </MaskText>
        </div>

        <div className="relative max-w-[700px] w-full">
          <div className="relative z-10 flex flex-col items-center md:items-stretch md:flex-row gap-10">
            {/* Circle + stem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="flex flex-col items-center"
            >
              <div className="shrink-0 w-[120px] h-[120px] md:w-[220px] md:h-[220px] rounded-full flex flex-col items-center justify-center bg-[#D0B954]">
                <span className="text-white text-3xl md:text-5xl font-bold tracking-wide">
                  {t("cdrPage.hero.abbreviation")}
                </span>
              </div>
              <div className="-mt-5 w-[25px] flex-1 h-full stem-gradient-gold-cdr" />
            </motion.div>

            {/* Heading + narrative bubbles */}
            <div className="flex flex-col items-center md:items-start">
              {/* Heading */}
              <div className="max-w-[580px] text-center md:text-left flex flex-col gap-3">
                <MaskText
            positionFrom={20}
            triggerOnce={true}
            animationDelay={0.15}
            extraClassNames="md:hidden block text-center text-white/70 text-sm md:text-base font-medium tracking-[6px] uppercase"
          >
            {t("cdrPage.hero.fullName")}
                </MaskText>
                
                <MaskText
                  positionFrom={30}
                  triggerOnce={true}
                  animationDelay={0.1}
                  extraClassNames="text-center md:text-left text-bold-xl md:text-bold-2xl text-[#D8C572]"
                >
                  {t("cdrPage.circles.heading")}
                </MaskText>
              </div>

              {/* Narrative bubbles */}
              <div className="relative z-10 mt-12 md:mt-16">
                <div className="flex flex-col">
                  {bubbles.map((text, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.33, 1, 0.68, 1],
                        delay: 0.1 * (index + 1),
                      }}
                      style={{
                        marginLeft:
                          index % 2 !== 0
                            ? isMobile
                              ? "90px"
                              : "180px"
                            : "0px",
                      }}
                    >
                      <div className="md:-mt-[30px] inline-flex aspect-square rounded-full items-center justify-center p-8 md:p-12 bg-white/[0.07]">
                        <p className="text-white text-base text-center leading-relaxed max-w-[180px] md:max-w-[200px]">
                          {text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CdrCirclesSection;
