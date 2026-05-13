import { motion } from "framer-motion";
import MaskText from "@/components/animation/OpacityMoveYInViewAnimation";
import { useTranslation } from "next-i18next";

function AiFocusAreasSection() {
  const { t } = useTranslation("programs");

  const items = t("aiPage.focusAreas.items", {
    returnObjects: true,
  }) as unknown as { title: string; description: string }[];

  return (
    <section className="w-full bg-[#025C7F] py-16 md:py-24">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        <MaskText
          positionFrom={20}
          animationDelay={0}
          extraClassNames="text-[#E0C759]/60 text-xs primarybold tracking-[6px] uppercase mb-3"
        >
          Artificial Intelligence
        </MaskText>
        <MaskText
          positionFrom={30}
          animationDelay={0.1}
          extraClassNames="text-white primarybold text-bold-2xl mb-12"
        >
          {t("aiPage.focusAreas.heading")}
        </MaskText>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.08 * index,
              }}
              className="rounded-2xl bg-white/5 border border-white/10 p-8 md:p-10 flex flex-col gap-4"
            >
              <h3 className="text-[#E0C759] primarybold text-bold-lg">
                {item.title}
              </h3>
              <p className="text-white/70 text-normal-base leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AiFocusAreasSection;
