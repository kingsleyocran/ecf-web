import Image from "next/image";
import { motion } from "framer-motion";

const technologies = [
  {
    abbr: "SRM",
    icon: "/assets/vector/theme-srm.svg",
    title: "Solar Radiation Management",
    description:
      "Solar Radiation Management refers to proposed technologies that would reflect a small amount of sunlight back into space to reduce global warming. These technologies are highly contested and carry significant risks and uncertainties\u2014particularly for African climate systems, agriculture, and water resources.",
    align: "left" as const,
    features: [
      "Regional climate modeling for SRM impacts",
      "Governance framework development",
      "Risk assessment for African agriculture and water systems",
      "Public engagement and informed dialogue",
    ],
  },
  {
    abbr: "AI",
    icon: "/assets/vector/theme-ai.svg",
    title: "Artificial Intelligence for Climate Adaptation",
    description:
      "The absence of Africa-centered governance frameworks and reliance on foreign data centres risks perpetuating inequities in global climate decision-making, delaying real-time AI-supported responses. ECF advocates for local AI infrastructure and expertise to ensure context-specific climate responses that serve African communities first.",
    align: "right" as const,
    features: [
      "Developing AI for high-quality climate data in water-scarce regions",
      "Building local data centres and processing capacity",
      "Early warning systems for agriculture, water, and disaster response",
      "Ethical AI governance frameworks for climate action",
    ],
  },
  {
    abbr: "CDR",
    icon: "/assets/vector/theme-cdr.svg",
    title: "Carbon Dioxide Removal",
    description:
      "CDR encompasses both nature-based solutions and technological approaches to removing carbon dioxide from the atmosphere. Africa\u2019s diverse ecosystems\u2014from forests to coastlines\u2014offer significant potential for CDR, but solutions must be tailored to local contexts.",
    align: "left" as const,
    features: [
      "Nature-based CDR solutions (biochar, afforestation, soil carbon)",
      "Ocean-based CDR (seaweed cultivation, mangrove restoration)",
      "Carbon accounting and MRV (Monitoring, Reporting, Verification)",
      "Local CDR entrepreneurship and job creation",
    ],
  },
];

function TechBlock({ tech }: { tech: (typeof technologies)[number] }) {
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
