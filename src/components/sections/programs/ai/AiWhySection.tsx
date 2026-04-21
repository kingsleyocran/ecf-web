import { motion } from "framer-motion";
import MaskText from "@/components/animation/OpacityMoveYInViewAnimation";
import { useTranslation } from "next-i18next";

function AiWhySection() {
  const { t } = useTranslation("programs");

  const rawItems = t("aiPage.why.items", { returnObjects: true });
  const items: string[] = Array.isArray(rawItems) ? rawItems : [];

  return (
    <section className="w-full bg-[#034D6B] py-16 md:py-24">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        {/* Section label */}
        <MaskText
          positionFrom={20}
          animationDelay={0}
          extraClassNames="text-[#E0C759]/60 text-xs primarybold tracking-[6px] uppercase mb-3"
        >
          {t("aiPage.why.heading")}
        </MaskText>

        {/* Points */}
        <div className="mt-10 flex flex-col gap-0">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.08 * i,
              }}
              className="flex items-start gap-5 py-5 border-b border-white/10 last:border-b-0"
            >
              <span className="mt-[10px] shrink-0 w-[6px] h-[6px] rounded-full bg-[#E0C759]" />
              <p className="text-white/80 text-normal-base md:text-lg leading-relaxed">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AiWhySection;
