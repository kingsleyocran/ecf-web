import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";

type TechEntry = {
  abbr: string;
  icon: string;
  title: string;
  description: string;
  align: "left" | "right";
  features: string[];
};

function TechBlock({ tech }: { tech: TechEntry }) {
  const isLeft = tech.align === "left";

  return (
    <div className="relative max-w-[700px]">
      {/* Header row: Circle + Title/Description side by side */}
      <div
        className={`relative z-10 flex flex-col items-center md:items-stretch ${
          isLeft ? "md:flex-row " : "md:flex-row-reverse"
        } gap-10 md:gap-10`}
      >
        {/* Stem: vertical line connecting circle to features */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="flex flex-col items-center"
        >
          {/* Big circle badge */}
          <div
            className="shrink-0 w-[160px] h-[160px] md:w-[220px] md:h-[220px] rounded-full flex flex-col items-center justify-center gap-1 md:gap-2"
            style={{ backgroundColor: tech.align === "left" ? "#D0B954" : "#0098D4" }}
          >
            <span className="text-white text-3xl md:text-5xl font-bold tracking-wide">
              {tech.abbr}
            </span>
            {/* <Image
              src={tech.icon}
              alt={tech.abbr}
              width={40}
              height={40}
              className="w-[24px] h-[24px] md:w-[40px] md:h-[40px]"
            /> */}
          </div>

          <div
            className={`-mt-5 w-[25px] flex-1 h-full ${isLeft ? "stem-gradient-gold" : "stem-gradient-blue"}`}
          />
        </motion.div>

        {/* Text + features col\umn */}
        <div className="flex flex-col items-center md:tems-start">
          {/* Title + Description */}
          <div className="max-w-[580px] text-center md:text-left flex flex-col gap-4">
            <h3
            style={{ color: tech.align === "left" ? "#D8C572" : "#92E0FF" }}
              className="text-bold-xl md:text-bold-2xl mb-3">
              {tech.title}
            </h3>
            <p className="text-normal-base text-white/80 leading-relaxed">
              {tech.description}
            </p>
          </div>

          {/* Feature bubbles — positioned under the text area, offset from stem */}
          <div className={`relative z-10 mt-12 md:mt-16 `}>
            {/* Desktop: zigzag column */}
            <div className="flex flex-col ">
              {tech.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.33, 1, 0.68, 1],
                    delay: 0.1 * (index + 1),
                  }}
                  style={{ marginLeft: index % 2 !== 0 ? "160px" : "0px" }}
                >
                  <div className="-mt-[30px] aspect-square w-[160px] h-[160px] md:w-[190px] md:h-[190px] rounded-full flex items-center justify-center p-6 bg-white/[0.07]">
                    <p className="text-white text-sm md:text-[16px] text-center leading-normal">
                      {feature}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TechDetailsSection() {
  const { t } = useTranslation("programs");

  const technologies: TechEntry[] = [
    {
      abbr: "SRM",
      icon: "/assets/vector/theme-srm.svg",
      title: t("srm.title"),
      description: t("srm.description"),
      align: "left",
      features: [
        t("srm.features.modeling"),
        t("srm.features.governance"),
        t("srm.features.risk"),
        t("srm.features.engagement"),
      ],
    },
    {
      abbr: "AI",
      icon: "/assets/vector/theme-ai.svg",
      title: t("ai.title"),
      description: t("ai.description"),
      align: "right",
      features: [
        t("ai.features.data"),
        t("ai.features.centres"),
        t("ai.features.warning"),
        t("ai.features.governance"),
      ],
    },
    {
      abbr: "CDR",
      icon: "/assets/vector/theme-cdr.svg",
      title: t("cdr.title"),
      description: t("cdr.description"),
      align: "left",
      features: [
        t("cdr.features.natureBased"),
        t("cdr.features.ocean"),
        t("cdr.features.accounting"),
        t("cdr.features.entrepreneurship"),
      ],
    },
  ];

  return (
    <section className="w-full bg-[#025C7F] py-8 md:py-16 overflow-hidden">
      <style>{`
        .stem-gradient-gold {
          background: linear-gradient(to bottom, #D0B954, transparent);
        }
        .stem-gradient-blue {
          background: linear-gradient(to bottom, #0098D4, transparent);
        }
      `}</style>
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 py-12 flex flex-col gap-[200px] items-center">
        {technologies.map((tech) => (
          <TechBlock key={tech.abbr} tech={tech} />
        ))}
      </div>
    </section>
  );
}

export default TechDetailsSection;
