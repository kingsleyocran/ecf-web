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

const thematicAreas = [
  {
    id: 1,
    title: "Artificial Intelligence for Climate Adaptation",
    description: (
      <>
        Harnessing AI to develop high-quality climate data systems, early
        warning mechanisms, and adaptive solutions tailored to Africa's unique
        climate challenges. We're building local AI infrastructure and expertise
        to ensure real-time, context-specific climate responses that serve
        African communities first.
      </>
    ),
    iconPath: "/assets/vector/theme-ai.svg",
  },
  {
    id: 2,
    title: "Carbon Dioxide Removal (CDR)",
    description: (
      <>
        Exploring and scaling nature-based and technological carbon removal
        solutions that align with Africa's ecosystems and economic realities.
        From biochar initiatives to coastal blue carbon projects, we're ensuring
        Africa leads in defining what responsible CDR looks like on the
        continent.
      </>
    ),
    iconPath: "/assets/vector/theme-cdr.svg",
  },
  {
    id: 3,
    title: "Solar Radiation Management (SRM)",
    description: (
      <>
        Leading rigorous, ethical research into SRM's potential impacts on
        African climate systems, agriculture, and communities. We ensure African
        scientists and policymakers have the knowledge and platforms to shape
        global SRM governance decisions that could profoundly affect the
        continent.
      </>
    ),
    iconPath: "/assets/vector/theme-srm.svg",
  },
];

function HomeThematicAreasSection() {
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
              Our Thematic <br /> Focus Areas
            </h2>

            <p className="text-normal-base text-white/90 max-w-[500px]">
              ECF's work spans three interconnected frontier climate
              technologies, each critical to Africa's climate resilience and
              global climate governance.
            </p>

            <PrimaryButton
              title="Find out more"
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
  data: (typeof thematicAreas)[0];
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
