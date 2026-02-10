import { useRef, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { AnimatePresence, motion } from "framer-motion";
import ParallaxMarquee from "@/components/animation/ParallaxMarquee";
import DraggableAchievementCard from "@/components/cards/DraggableAchievementCard";
import DraggableImage from "@/components/cards/DraggableImage";

// Achievement data
const achievementsData = {
  title: "What We Are Proud Of",
  subtitle:
    "ECF builds on a strong foundation of achievements that demonstrate our commitment to empowering African leadership in climate technologies",
  marqueeText: "Empowering Africa to Lead the Climate Technology Frontier",
  achievements: [
    {
      id: 1,
      number: "20",
      label: "Professionals Trained In",
      description: "carbon accounting and decarbonization",
      position: { x: 14, y: 3 },
    },
    {
      id: 2,
      number: "1ST",
      label: "University Short Courses",
      description:
        "Partnered with universities in Ghana, Kenya, and South Africa",
      position: { x: 55, y: 28 },
    },
    {
      id: 3,
      number: "10",
      label: "Strategically Placed",
      description:
        "In industries and public institutions including Ghana's carbon market office",
      position: { x: 18, y: 47 },
    },
    {
      id: 4,
      number: "1ST",
      label: "ACIFER Fellowship",
      description:
        "Africa's first fellowship for early-career climate intervention researchers",
      position: { x: 45, y: 67 },
    },
  ],
  images: [
    {
      id: 1,
      src: "/assets/images/test-image.png",
      alt: "ECF professionals",
      position: { x: 38, y: 2 },
      size: { width: 280, height: 320 },
    },
    {
      id: 2,
      src: "/assets/images/test-image.png",
      alt: "ECF team members",
      position: { x: 8, y: 23 },
      size: { width: 280, height: 320 },
    },
    {
      id: 3,
      src: "/assets/images/test-image.png",
      alt: "ECF conference",
      position: { x: 58, y: 50 },
      size: { width: 280, height: 320 },
    },
    {
      id: 4,
      src: "/assets/images/test-image.png",
      alt: "ECF team",
      position: { x: 22, y: 70 },
      size: { width: 280, height: 320 },
    },
  ],
};

function HomeAchievementsSection() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });

  const { title, subtitle, marqueeText, achievements, images } =
    achievementsData;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "200px 0px 200px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-16 md:py-24 bg-white overflow-hidden">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-bold-2xl text-[#025C7F] mb-4">{title}</h2>
          <p className="text-normal-lg text-black/70 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden">
        {/* Draggable area with three layers */}
        {isMobile ? (
          // Mobile: Vertical stacking without drag
          <div className="flex flex-col gap-8">
            {/* Images */}
            {images.map((image) => (
              <div
                key={image.id}
                className="w-full h-[400px] rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Achievement cards */}
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-[#025C7F] rounded-3xl p-6 shadow-lg"
              >
                <div className="text-[#C7B14E] text-5xl font-bold mb-2">
                  {achievement.number}
                </div>
                <div className="text-white text-lg font-semibold mb-2">
                  {achievement.label}
                </div>
                <div className="text-white/80 text-sm">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop/Tablet: Draggable layout with sticky marquee
          <div ref={constraintsRef} className="relative h-[1300px]">
            {/* Layer 1: Draggable Images - Bottom layer (z-5) */}
            {images.map((image, index) => (
              <DraggableImage
                key={image.id}
                {...image}
                delay={0.1 * (index + 1)}
                constraintsRef={constraintsRef}
                isDragEnabled={!isMobile}
              />
            ))}

            {/* Layer 2: Marquee background - Middle layer, Sticky in viewport center (z-10) */}
            <AnimatePresence>
              {isInView && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="fixed top-[50vh] -translate-y-1/2 pointer-events-none z-10"
                >
                  <ParallaxMarquee baseVelocity={-50}>
                    <span className="text-[10vw] md:text-[12vw] text-[#E0C759]  secondarybold tracking-normal whitespace-nowrap">
                      {marqueeText}
                    </span>
                  </ParallaxMarquee>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Layer 3: Draggable Achievement Cards - Top layer (z-20) */}
            {achievements.map((achievement, index) => (
              <DraggableAchievementCard
                key={achievement.id}
                {...achievement}
                delay={0.2 * (index + 1)}
                constraintsRef={constraintsRef}
                isDragEnabled={!isMobile}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeAchievementsSection;