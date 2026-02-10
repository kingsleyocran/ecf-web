import LangIcon from "../../../../public/assets/icons/lang.svg";
import PrimaryButton from "../../button/PrimaryButton";
import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// Mock data - Replace with actual data from Firebase/API
const resourcesData = [
  {
    id: 1,
    title: "SRM Impacts on West African Monsoon Systems: A Modeling Study behind the title",
    description:
      "Explore cutting-edge research, training materials, and insights from Africa's growing FCT community. Explore cutting-edge research, training materials, and insights from Africa's growing FCT community",
    languages: ["English", "Francais"],
    link: "/resources/1",
  },
  {
    id: 2,
    title: "SRM Impacts on West African Monsoon Systems: A Modeling Study of West African Monsoon Systems",
    description:
      "Explore cutting-edge research, training materials, and insights from Africa's growing FCT community. Explore cutting-edge research, training materials, and insights from Africa's growing FCT community",
    languages: ["English", "Francais"],
    link: "/resources/2",
  },
  {
    id: 3,
    title: "SRM Impacts on West African Monsoon Systems: A Modeling Study",
    description:
      "Explore cutting-edge research, training materials, and insights from Africa's growing FCT community. Explore cutting-edge research, training materials, and insights from Africa's growing FCT community",
    languages: ["English", "Francais"],
    link: "/resources/3",
  },
  {
    id: 4,
    title: "SRM Impacts on West African Monsoon Systems: A Modeling Study",
    description:
      "Explore cutting-edge research, training materials, and insights from Africa's growing FCT community. Explore cutting-edge research, training materials, and insights from Africa's growing FCT community",
    languages: ["English", "Francais"],
    link: "/resources/4",
  },
];

function ResourcesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  // Track scroll progress through the section
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Add spring physics for smooth movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform vertical scroll into horizontal movement
  // Adjust -80% based on number of cards and desired scroll distance
  const x = useTransform(smoothProgress, [0, 1], ["1%", "-80%"]);

  return (
    <section
      ref={targetRef}
      className="relative md:h-[150vh] w-full flex flex-col bg-[#025C7F]"
    >
      <div className="md:sticky md:top-[0px] pt-24 ">
        {/* Header Section */}
        <div className="flex flex-row justify-between w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex w-full flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8 mb-8 md:mb-12">
            <div className="flex flex-col item gap-3 md:gap-4 max-w-2xl">
              <h2 className="text-bold-2xl text-[#E0C759]">
                Latest Resources
                <br />& Knowledge
              </h2>
              <p className="text-normal-base text-white/90">
                Explore cutting-edge research, training materials, and insights
                from Africa's growing FCT community
              </p>
            </div>

            <div className="flex-shrink-0">
              <button className="px-6 md:px-6 py-2 md:py-2 bg-white/20 hover:bg-white/30 text-white rounded-[20px] font-medium text-base md:text-lg transition-all duration-200 whitespace-nowrap">
                Read more
              </button>
            </div>
          </div>
        </div>

        {/* Desktop - Scroll-jacking horizontal scroll */}
        <div className="hidden md:flex flex-row justify-between w-full max-w-[1920px] pb-24">
          <div className="flex flex-col w-full ">
            {/* Cards Section - Horizontal Scroll with Motion */}
            <div className="relative overflow-hidden">
              <motion.div style={{ x }} className="flex flex-row items-end gap-4 md:gap-6 h-[480px]">
                {resourcesData.map((resource, index) => (
                  <div
                    key={resource.id}
                    onMouseEnter={() => setHoveredCardId(index)}
                    onMouseLeave={() => setHoveredCardId(0)}
                    style={{
                      width: `calc(150vh / ${resourcesData.length - 1})`,
                      height: hoveredCardId === index ? "470px" : "400px",
                    }}
                    className={`${index == 0 ? "2xl:ml-auto ml-4 md:ml-8 lg:ml-16" : ""} flex-shrink-0 w-[calc(100vh/${resourcesData.length + 2})] bg-[#04719C] rounded-2xl
                      md:rounded-3xl p-6 md:p-8 flex flex-col justify-between gap-6 cursor-pointer transition-all duration-200`}
                  >
                    {/* Card Content */}
                    <div className="flex flex-col gap-4">
                      <h3 className="text-bold-lg text-white line-clamp-3">
                        {resource.title}
                      </h3>

                      <p className="text-normal-base text-white/80 line-clamp-5">
                        {resource.description}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="flex flex-col items-start gap-4">
                      <div className="flex items-center gap-2 ">
                        <LangIcon className="w-4 h-4" width="20" height="20" viewBox="0 0 20 20" />
                        <span className="paragraph-text-small text-white/90">
                          {resource.languages.join(", ")}
                        </span>
                      </div>

                      {hoveredCardId === index && (
                        <PrimaryButton
                          title="Read more"
                          isWide={false}
                          variant="yellow-light"
                          onClick={() => {
                            // Handle navigation to resource detail page
                            window.location.href = resource.link;
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile - Simple horizontal scroll */}
        <div className="flex md:hidden flex-row justify-between w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex flex-col w-full overflow-hidden rounded-2xl md:rounded-[40px]">
            {/* Cards Section - Horizontal Scroll */}
            <div className="relative">
              <div
                ref={scrollContainerRef}
                className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {resourcesData.map((resource) => (
                  <div
                    key={resource.id}
                    onMouseEnter={() => setHoveredCardId(resource.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    className="flex-shrink-0 w-[85vw] bg-[#013A52] rounded-2xl p-6 flex flex-col justify-between gap-6 snap-start cursor-pointer transition-all duration-200 active:bg-[#014A65]"
                  >
                    {/* Card Content */}
                    <div className="flex flex-col gap-4">
                      <h3 className="text-bold-lg text-white leading-tight">
                        {resource.title}
                      </h3>

                      <p className="text-normal-base text-white/80 line-clamp-4">
                        {resource.description}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-white/90">
                        <LangIcon className="w-4 h-4" width="20" height="20" viewBox="0 0 20 20" />
                        <span className="text-sm">
                          {resource.languages.join(", ")}
                        </span>
                      </div>

                      {hoveredCardId === resource.id && (
                        <PrimaryButton
                          title="Read more"
                          variant="yellow-light"
                          onClick={() => {
                            // Handle navigation to resource detail page
                            window.location.href = resource.link;
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Custom scrollbar hide styles */}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}

export default ResourcesSection;
