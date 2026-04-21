import { motion } from "framer-motion";
import MaskText from "@/components/animation/OpacityMoveYInViewAnimation";
import { useTranslation } from "next-i18next";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-[7px] shrink-0 w-[5px] h-[5px] rounded-full bg-[#E0C759]" />
          <MaskText
            positionFrom={14}
            animationDelay={0.05 * i}
            extraClassNames="text-white/70 text-normal-base leading-relaxed"
          >
            {item}
          </MaskText>
        </li>
      ))}
    </ul>
  );
}

function AiProgramObjectivesSection() {
  const { t } = useTranslation("programs");

  const objectives = t("aiPage.programObjectives.items", {
    returnObjects: true,
  }) as unknown as string[];

  return (
    <section className="w-full bg-[#034D6B] py-16 md:py-24">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        {/* Section header */}
        <div className="mb-12">
          <MaskText
            positionFrom={20}
            animationDelay={0}
            extraClassNames="text-[#E0C759]/60 text-xs primarybold tracking-[6px] uppercase mb-3"
          >
            {t("aiPage.programObjectives.sectionTitle")}
          </MaskText>
          <MaskText
            positionFrom={30}
            animationDelay={0.1}
            extraClassNames="text-white primarybold text-bold-2xl"
          >
            {t("aiPage.programObjectives.objectivesLabel")}
          </MaskText>
        </div>

        {/* Objectives card */}
        <div className="rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-8 md:p-12">
          <div className="mb-5">
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
              style={{ originX: 0 }}
              className="w-6 h-[2px] bg-[#E0C759] rounded-full mb-3"
            />
      
          </div>
          <BulletList items={objectives} />
        </div>
      </div>
    </section>
  );
}

export default AiProgramObjectivesSection;
