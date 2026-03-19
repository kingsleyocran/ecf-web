import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "next-i18next";

const impactKeys = [
  { key: "research", number: "$25" },
  { key: "dialogues", number: "$50" },
  { key: "fellowship", number: "$100" },
  { key: "capacity", number: "$250" },
] as const;

function ImpactCard({
  number,
  label,
  description,
  delay,
}: {
  number: string;
  label: string;
  description: string;
  delay: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className="bg-[#025C7F] rounded-3xl p-6 md:p-8 flex flex-col gap-3"
    >
      <span className="text-[#E0C759] text-5xl md:text-6xl font-bold primarybold">
        {number}
      </span>
      <span className="text-white text-lg font-semibold secondarybold">
        {label}
      </span>
      <p className="text-white/80 text-normal-base leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

function DonateImpactSection() {
  const { t } = useTranslation("donate");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <p className="text-[#0182B5] text-sm md:text-base font-medium tracking-widest uppercase mb-3">
            {t("impact.label")}
          </p>
          <h2 className="text-bold-2xl text-[#025C7F] max-w-[600px]">
            {t("impact.heading")}
          </h2>
          <p className="text-normal-lg text-black/60 max-w-[560px] mt-4 leading-relaxed">
            {t("impact.description")}
          </p>
        </motion.div>

        {/* Impact cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {impactKeys.map(({ key, number }, index) => (
            <ImpactCard
              key={key}
              number={number}
              label={t(`impact.items.${key}.label`)}
              description={t(`impact.items.${key}.description`)}
              delay={0.1 * (index + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DonateImpactSection;
