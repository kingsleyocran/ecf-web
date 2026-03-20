import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import PrimaryButton from "../../button/PrimaryButton";
import { useTranslation } from "next-i18next";

function HomeThematicAreasSection() {
  const { t } = useTranslation("home");

  const thematicAreas = [
    {
      id: 1,
      title: t("thematic.ai.title"),
      description: t("thematic.ai.description"),
      iconPath: "/assets/vector/theme-ai.svg",
    },
    {
      id: 2,
      title: t("thematic.cdr.title"),
      description: t("thematic.cdr.description"),
      iconPath: "/assets/vector/theme-cdr.svg",
    },
    {
      id: 3,
      title: t("thematic.srm.title"),
      description: t("thematic.srm.description"),
      iconPath: "/assets/vector/theme-srm.svg",
    },
  ];

  return (
    <div className="relative">
      {/* Background */}
      <div className="h-[600px] md:h-[100vh] w-full sticky top-0 z-20 bg-[#C7B14E]" />

      {/* Content */}
      <div className="relative w-full flex flex-col gap-8 max-w-[1920px] 2xl:mx-auto py-12 md:py-24 px-4 md:px-8 lg:px-16 z-20">
        <div className="w-full flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left - Title Section (Sticky) */}
          <div className="md:sticky md:top-[100px] -mt-[600px] md:-mt-[800px] md:basis-1/2 h-full flex flex-col items-start gap-6 z-20">
            <h2 className="text-bold-2xl text-white max-w-[400px] leading-tight">
              {t("thematic.heading")}
            </h2>

            <p className="text-normal-base text-white/90 max-w-[500px]">
              {t("thematic.description")}
            </p>

            <PrimaryButton
              title={t("thematic.cta")}
              variant="white"
              onClick={() => {
                window.location.href = "/thematic-areas";
              }}
            />
          </div>

          {/* Right - Cards Section */}
          <div className="md:basis-1/2 h-full md:-mt-[400px] flex flex-col z-20">
            {thematicAreas.map((area, index) => (
              <ThematicAreaCard
                data={area}
                key={area.id}
                i={index}
                total={thematicAreas.length}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="h-[80px] md:h-[100px] w-full bg-gradient-to-t from-[#C7B14E] via-[#C7B14E]/90 to-transparent sticky bottom-0 z-20" />
    </div>
  );
}

type CardProps = {
  data: { id: number; title: string; description: string; iconPath: string };
  i: number;
  total: number;
};

function ThematicAreaCard({ data, i, total }: CardProps) {
  const [onHover, setOnHover] = useState(false);
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scaleScroll = useTransform(scrollYProgress, [0.2, 1], [0.92, 1]);
  const scaleSpring = useSpring(scaleScroll, { stiffness: 200, damping: 30 });

  // Upward shift for stacked cards - proportional to scale
  const yScroll = useTransform(scrollYProgress, [0.2, 1], [-50, 0]);
  const ySpring = useSpring(yScroll, { stiffness: 200, damping: 30 });

  return (
    <div
      ref={container}
      className="sticky top-[80px] md:top-[150px]"
      style={{ zIndex: i }}
    >
      <motion.div
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        style={{
          scale: i === total - 1 ? 1 : scaleSpring,
          y: i === total - 1 ? 0 : ySpring,
          transformOrigin: "top",
        }}
        className="md:-mt-[70px] min-h-[450px] w-full bg-white
        rounded-2xl md:rounded-3xl border-[#025C7F]/20 hover:border-[#025C7F]/40 border-[1px]
        shadow-xl flex flex-col items-start justify-between gap-6
        transition-all duration-300 p-8 md:p-10 lg:p-12"
      >
        {/* Card Header */}
        <div className="flex flex-col gap-4">
          <h3 className="text-bold-xl text-[#025C7F]">
            {data.title}
          </h3>
          <p className="text-normal-base text-black/80">{data.description}</p>
        </div>

        {/* Icon */}
        <div
          className="h-[80px] w-[80px] md:h-[100px] md:w-[100px] rounded-2xl bg-[#C7B14E]
          flex items-center justify-center p-4 relative shadow-md"
        >
          <Image
            src={data.iconPath}
            alt={data.title}
            width={60}
            height={60}
            className="w-[50px] h-[50px] md:w-[60px] md:h-[60px]"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default HomeThematicAreasSection;
