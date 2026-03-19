import { motion } from "framer-motion";
import Image from "next/image";
import MaskText from "@/components/animation/OpacityMoveYInViewAnimation";
import { useTranslation } from "next-i18next";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Partners = Record<string, string[]> | null;

interface ProgramMeta {
  key: string;
  id: string;
  image: string;
  partners: Partners;
  stats: { key: string; value: string }[];
}

const programMeta: ProgramMeta[] = [
  {
    key: "shortCourse",
    id: "01",
    image: "/assets/images/programs/cdr-short-courses.png",
    stats: [
      { key: "studentsReached", value: "900+" },
      { key: "improvedUnderstanding", value: "85%" },
      { key: "partnerUniversities", value: "10" },
    ],
    partners: {
      Ghana: [
        "University of Ghana",
        "University of Energy and Natural Resources",
        "University of Environment and Sustainable Development",
        "University of Cape Coast",
        "Kwame Nkrumah University of Science and Technology",
      ],
      Kenya: [
        "Africa Nazarene University",
        "University of Nairobi",
        "Technical University of Mombasa",
      ],
      "South Africa": ["Durban University of Technology"],
    },
  },
  {
    key: "carbonAccounting",
    id: "02",
    image: "/assets/images/programs/cdr-carbon-accounting.png",
    stats: [
      { key: "youthTrained", value: "20" },
      { key: "internshipPlacements", value: "7" },
    ],
    partners: null,
  },
  {
    key: "aciferFellowship",
    id: "03",
    image: "/assets/images/programs/cdr-acifer-fellowship.png",
    stats: [
      { key: "fellowsTrained", value: "30" },
      { key: "africanCountries", value: "45+" },
      { key: "fundedResearch", value: "2" },
    ],
    partners: null,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

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

function ColumnHeader({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <div className="mb-5">
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1], delay }}
        style={{ originX: 0 }}
        className="w-6 h-[2px] bg-[#E0C759] rounded-full mb-3"
      />
      <MaskText
        positionFrom={14}
        animationDelay={delay + 0.05}
        extraClassNames="text-[#E0C759]/80 text-xs primarybold tracking-[4px] uppercase"
      >
        {label}
      </MaskText>
    </div>
  );
}

function ProgramCard({
  program,
  index,
  t,
}: {
  program: ProgramMeta;
  index: number;
  t: (key: string, opts?: Record<string, unknown>) => string;
}) {
  const prefix = `cdrPage.programs.items.${program.key}`;
  const title = t(`${prefix}.title`);
  const background = t(`${prefix}.background`);
  const objectives = t(`${prefix}.objectives`, {
    returnObjects: true,
  }) as unknown as string[];
  const impacts = t(`${prefix}.impacts`, {
    returnObjects: true,
  }) as unknown as string[];

  return (
    <div id={program.key} className="rounded-3xl overflow-hidden bg-white/5 border border-white/10 mb-10 last:mb-0">
      {/* Hero image with title overlay */}
      <div className="relative w-full h-[380px] md:h-[520px] overflow-hidden">
        <Image
          src={program.image}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#034D6B] via-[#034D6B]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.55,
              ease: [0.33, 1, 0.68, 1],
              delay: 0.1,
            }}
            className="text-[#E0C759] primarybold text-[56px] md:text-[80px] leading-none opacity-30 block mb-1"
          >
            {program.id}
          </motion.span>
          <MaskText
            positionFrom={20}
            animationDelay={0.2}
            extraClassNames="text-white primarybold text-bold-xl md:text-bold-2xl leading-snug max-w-xl"
          >
            {title}
          </MaskText>
        </div>
      </div>

      <div className="p-8 md:p-12 flex flex-col gap-10">
        {/* Key stats */}
        <div className={`grid grid-cols-${program.stats.length} gap-4 pb-10 border-b border-white/10`}>
          {program.stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <MaskText
                positionFrom={16}
                animationDelay={0.1 + 0.1 * i}
                extraClassNames="text-[#E0C759] primarybold text-bold-2xl md:text-bold-3xl leading-none"
              >
                {stat.value}
              </MaskText>
              <MaskText
                positionFrom={12}
                animationDelay={0.15 + 0.1 * i}
                extraClassNames="text-white/50 text-xs md:text-sm leading-snug"
              >
                {t(`${prefix}.stats.${stat.key}.label`)}
              </MaskText>
            </div>
          ))}
        </div>

        {/* Background */}
        <div className="border-l-2 border-[#E0C759]/30 pl-6">
          <MaskText
            positionFrom={20}
            animationDelay={0.1}
            extraClassNames="text-white/60 text-normal-base leading-relaxed"
          >
            {background}
          </MaskText>
        </div>

        {/* Objectives + Impacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <ColumnHeader
              label={t("cdrPage.programs.objectivesLabel")}
              delay={0.05}
            />
            <BulletList items={objectives} />
          </div>
          <div className="md:border-l md:border-white/10 md:pl-10">
            <ColumnHeader
              label={t("cdrPage.programs.impactsLabel")}
              delay={0.05}
            />
            <BulletList items={impacts} />
          </div>
        </div>

        {/* Partners */}
        {program.partners && (
          <div className="pt-6 border-t border-white/10">
            <ColumnHeader
              label={t("cdrPage.programs.partnersLabel")}
              delay={0.05}
            />
            <div className="flex flex-col gap-6">
              {Object.entries(program.partners).map(
                ([country, universities], ci) => (
                  <div key={country}>
                    <MaskText
                      positionFrom={14}
                      animationDelay={0.05 + 0.08 * ci}
                      extraClassNames="text-white/40 text-xs primarybold tracking-[3px] uppercase mb-3"
                    >
                      {country}
                    </MaskText>
                    <div className="flex flex-wrap gap-2">
                      {universities.map((uni, ui) => (
                        <motion.span
                          key={uni}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            duration: 0.45,
                            ease: [0.33, 1, 0.68, 1],
                            delay: 0.1 + 0.08 * ci + 0.04 * ui,
                          }}
                          className="px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-white/70 text-sm hover:bg-white/10 transition-colors duration-200"
                        >
                          {uni}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

function CdrProgramsSection() {
  const { t } = useTranslation("programs");

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
            {t("cdrPage.programs.sectionTitle")}
          </MaskText>
          <MaskText
            positionFrom={30}
            animationDelay={0.1}
            extraClassNames="text-white primarybold text-bold-2xl"
          >
            {t("cdrPage.programs.sectionHeading")}
          </MaskText>
        </div>

        {/* Programs list */}
        <div className="flex flex-col gap-5">
          {programMeta.map((program, index) => (
            <ProgramCard
              key={program.id}
              program={program}
              index={index}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CdrProgramsSection;
