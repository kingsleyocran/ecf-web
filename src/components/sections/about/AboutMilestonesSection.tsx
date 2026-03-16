import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  AnimatePresence,
  useMotionValueEvent,
  type MotionValue,
  type MotionStyle,
} from "framer-motion";
import Image from "next/image";

// ─── Data ────────────────────────────────────────────────────────────────────

const milestonesData = [
  {
    year: "2023",
    items: [
      {
        title: "ECF Founded Within GAYO",
        description:
          "Our climate team at GAYO took a bold step to challenge inequalities in the climate technology field and create spaces for African leadership.",
        image: "/assets/images/test-image.png",
      },
      {
        title: "Africa's First Geoengineering Dialogue Launched",
        description:
          "Launched the continent's first open virtual dialogue on geoengineering to discuss these technologies from distinctly African perspectives.",
        image: "/assets/images/test-image.png",
      },
    ],
  },
  {
    year: "2024",
    items: [
      {
        title: "First Public SRM Session at UN Climate Conference",
        description:
          "Organized the first-ever public session on Solar Radiation Management at a UN Climate Conference, demonstrating Africa's readiness to engage on the global stage.",
        image: "/assets/images/test-image.png",
      },
      {
        title: "Baseline Knowledge Assessment Published",
        description:
          "Published a comprehensive baseline knowledge assessment on climate interventions, highlighting gaps between the Global South and Global North.",
        image: "/assets/images/test-image.png",
      },
      {
        title: "Institutional Partnerships Established",
        description:
          "Partnered with CSIR in Ghana and South Africa, and Environmental Protection Agencies (EPA) to build capacity within national research and regulatory bodies.",
        image: "/assets/images/test-image.png",
      },
    ],
  },
  {
    year: "2025",
    items: [
      {
        title: "ACIFER Fellowship Launched",
        description:
          "Pioneered the African Climate Intervention Fellowship for Early-Career Researchers in partnership with the African Climate Intervention Research Hub.",
        image: "/assets/images/test-image.png",
      },
      {
        title: "Carbon Accounting Training Program Delivered",
        description:
          "Trained 20 professionals in carbon accounting and decarbonization, with 10 strategically placed in industries and public institutions.",
        image: "/assets/images/test-image.png",
      },
      {
        title: "University Short Courses Initiated",
        description:
          "Partnered with universities in Ghana, Kenya, and South Africa to launch dedicated short courses on climate interventions.",
        image: "/assets/images/test-image.png",
      },
      {
        title: "Transition to Independent Organization",
        description:
          "Began transitioning from GAYO to become Emerging Climate Frontiers (ECF), an independent organization ready to scale impact across the continent.",
        image: "/assets/images/test-image.png",
      },
    ],
  },
];

// ─── Scroll items: intro → text, image, text, image, ... ─────────────────────

type IntroItem = { type: "intro" };
type TextItem = { type: "text"; year: string; title: string; description: string };
type ImageItem = { type: "image"; src: string; alt: string; year: string };
type OutroItem = { type: "outro" };
type ScrollItem = IntroItem | TextItem | ImageItem | OutroItem;

const scrollItems: ScrollItem[] = [
  { type: "intro" },
  ...milestonesData.flatMap((milestone) =>
    milestone.items.flatMap((item) => [
      {
        type: "text" as const,
        year: milestone.year,
        title: item.title,
        description: item.description,
      },
      {
        type: "image" as const,
        src: item.image,
        alt: item.title,
        year: milestone.year,
      },
    ])
  ),
  { type: "outro" },
];

const TOTAL_MILESTONES = milestonesData.reduce((n, m) => n + m.items.length, 0);

// ─── Per-item canvas positions ────────────────────────────────────────────────

type Pos = { left: string; top: string; rotate: number; w?: number; h?: number };

const itemPositions: Pos[] = [
  // 0: Intro (centered via flex, position unused)
  { left: "0", top: "0", rotate: 0 },
  // 1: Text 0 — ECF Founded
  { left: "22%", top: "20%", rotate: -2 },
  // 2: Image 0
  { left: "49%", top: "14%", rotate: 3, w: 360, h: 430 },
  // 3: Text 1 — Geoengineering
  { left: "24%", top: "44%", rotate: 1.5 },
  // 4: Image 1
  { left: "50%", top: "32%", rotate: -2.5, w: 345, h: 415 },
  // 5: Text 2 — SRM Session
  { left: "20%", top: "28%", rotate: -1 },
  // 6: Image 2
  { left: "47%", top: "18%", rotate: 2, w: 370, h: 440 },
  // 7: Text 3 — Baseline Assessment
  { left: "26%", top: "50%", rotate: 2 },
  // 8: Image 3
  { left: "50%", top: "26%", rotate: -2, w: 350, h: 415 },
  // 9: Text 4 — Partnerships
  { left: "22%", top: "22%", rotate: -1.5 },
  // 10: Image 4
  { left: "48%", top: "42%", rotate: 1.5, w: 355, h: 420 },
  // 11: Text 5 — ACIFER
  { left: "24%", top: "38%", rotate: 1 },
  // 12: Image 5
  { left: "47%", top: "16%", rotate: -2, w: 350, h: 420 },
  // 13: Text 6 — Carbon Accounting
  { left: "20%", top: "46%", rotate: 2.5 },
  // 14: Image 6
  { left: "49%", top: "22%", rotate: -1.5, w: 360, h: 430 },
  // 15: Text 7 — University
  { left: "26%", top: "26%", rotate: -2 },
  // 16: Image 7
  { left: "50%", top: "44%", rotate: 3, w: 345, h: 415 },
  // 17: Text 8 — Transition
  { left: "22%", top: "20%", rotate: 1 },
  // 18: Image 8
  { left: "48%", top: "36%", rotate: -2.5, w: 355, h: 425 },
  // 19: Outro (centered via flex, position unused)
  { left: "0", top: "0", rotate: 0 },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const STEP_VH = 130;
const lastYear = milestonesData[milestonesData.length - 1].year;
const nextYear = String(Number(lastYear) + 1);
const years = [...milestonesData.map((m) => m.year), nextYear];

function getYear(index: number): string {
  const item = scrollItems[index];
  if (!item || item.type === "intro") return "2023";
  if (item.type === "outro") return milestonesData[milestonesData.length - 1].year;
  return item.year;
}

function getMilestoneNum(index: number): number {
  if (index === 0) return 0;
  return Math.ceil(index / 2);
}

// ─── Intro wrapper: fades + shrinks as you scroll away ───────────────────────

function IntroScrollItem({
  total,
  scrollYProgress,
  children,
}: {
  total: number;
  scrollYProgress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const fadeEnd = 0.7 / total;
  const opacity = useTransform(scrollYProgress, [0, fadeEnd], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0, fadeEnd], [1, 0.92]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center gap-6 pointer-events-none"
      style={{ opacity, scale, zIndex: 30 }}
    >
      {children}
    </motion.div>
  );
}

// ─── Scroll-driven item: reverse zoom (1.12→1) + scroll-weighted fade ─────────
// Opacity and scale are both driven directly by scrollYProgress — no time-based
// transitions. Scroll faster = faster zoom/fade. Scroll slower = slower.

function MilestoneScrollItem({
  index,
  total,
  scrollYProgress,
  children,
  style,
  className,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  children: React.ReactNode;
  style?: MotionStyle;
  className?: string;
}) {
  const N = total;

  // Each item gets a window in [0,1] scroll space.
  // Overlap is kept tight (0.75 steps each side) so items don't collide.
  // Step height (STEP_VH=130) gives the slow, weighted feel across more scroll distance.
  const enterStart = Math.max(0, (index - 0.75) / N);
  const peakStart  = index / N;
  const peakEnd    = (index + 0.55) / N;
  const goneEnd    = Math.min(1, (index + 1.1) / N);

  // Scroll-driven opacity: 0 → 1 (enter) → 0.14 (ghost) → 0 (gone)
  const opacity = useTransform(
    scrollYProgress,
    [enterStart, peakStart, peakEnd, goneEnd],
    [0, 1, 0.14, 0]
  );

  // Scale runs the full lifecycle: 1.18 (entering) → 1.0 (peak) → 0.85 (fully gone).
  // This way scale keeps animating until opacity reaches zero at goneEnd.
  const scale = useTransform(
    scrollYProgress,
    [enterStart, peakStart, goneEnd],
    [1.18, 1.0, 0.85]
  );

  return (
    <motion.div style={{ ...style, opacity, scale }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Outro: fades in as you reach the end, stays visible ─────────────────────

function OutroScrollItem({
  index,
  total,
  scrollYProgress,
  children,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const enterStart = Math.max(0, (index - 0.75) / total);
  const peakStart  = index / total;
  const opacity = useTransform(scrollYProgress, [enterStart, peakStart], [0, 1]);
  const scale   = useTransform(scrollYProgress, [enterStart, peakStart], [1.1, 1]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      style={{ opacity, scale, zIndex: 30 }}
    >
      {children}
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

function AboutMilestonesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [timelineH, setTimelineH] = useState(500);

  useEffect(() => {
    if (!timelineRef.current) return;
    const ro = new ResizeObserver(([entry]) => setTimelineH(entry.contentRect.height));
    ro.observe(timelineRef.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rawIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, scrollItems.length - 1]
  );
  useMotionValueEvent(rawIndex, "change", (v) => setActiveIndex(Math.round(v)));

  const isDraggingRef = useRef(false);
  const dotPos = useMotionValue(0);

  const rawDotY = useTransform(scrollYProgress, [0, 1], [0, timelineH - 14]);
  useMotionValueEvent(rawDotY, "change", (v) => {
    if (!isDraggingRef.current) dotPos.set(v);
  });

  const seekToFraction = (fraction: number, smooth = false) => {
    if (!sectionRef.current) return;
    const f = Math.max(0, Math.min(1, fraction));
    dotPos.set(f * (timelineH - 14));
    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.offsetHeight;
    window.scrollTo({
      top: sectionTop + f * (sectionHeight - window.innerHeight),
      behavior: smooth ? "smooth" : "instant" as ScrollBehavior,
    });
  };

  const handleTimelinePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = e.currentTarget.getBoundingClientRect();
    seekToFraction((e.clientY - rect.top) / rect.height);
  };

  const handleTimelinePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    seekToFraction((e.clientY - rect.top) / rect.height);
  };

  const handleTimelinePointerUp = () => {
    isDraggingRef.current = false;
  };

  const activeYear = getYear(activeIndex);
  const activeYearIndex = years.indexOf(activeYear);
  const milestoneNum = getMilestoneNum(activeIndex);

  return (
    <section id="milestones" className="w-full bg-[#034D6B]">
      {/* ── Mobile: simple vertical list ── */}
      <div className="md:hidden py-16 px-4">
        <p className="text-[#E0C759]/70 text-sm font-medium tracking-widest uppercase mb-3">
          Our Journey
        </p>
        <h2 className="text-bold-2xl text-white mb-12">
          Building Africa&apos;s Climate Future
        </h2>
        {milestonesData.map((milestone) => (
          <div key={milestone.year} className="mb-16">
            <h3 className="text-[#E0C759] primarybold text-bold-2xl mb-8">
              {milestone.year}
            </h3>
            <div className="flex flex-col gap-5">
              {milestone.items.map((mi, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden border border-white/10 bg-white/5"
                >
                  {mi.image && (
                    <div className="relative h-[180px]">
                      <Image
                        src={mi.image}
                        alt={mi.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="w-8 h-[3px] bg-[#E0C759] rounded-full mb-3" />
                    <h4 className="text-white primarybold text-normal-base mb-2">
                      {mi.title}
                    </h4>
                    <p className="text-white/60 text-normal-base leading-relaxed">
                      {mi.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop: sticky canvas ── */}
      <div
        ref={sectionRef}
        className="hidden md:block"
        style={{ height: `${scrollItems.length * STEP_VH}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Top-left label */}
          <div className="absolute top-8 left-8 z-50 pointer-events-none">
            <p className="text-[#E0C759]/60 text-xs font-medium tracking-[6px] uppercase">
              Our Journey — Milestones
            </p>
          </div>

          {/* Progress counter */}
          <div className="absolute bottom-8 left-8 z-50 pointer-events-none">
            <p className="text-white/30 text-sm primarybold">
              {milestoneNum === 0
                ? "— "
                : String(milestoneNum).padStart(2, "0")}{" "}
              / {String(TOTAL_MILESTONES).padStart(2, "0")}
            </p>
          </div>

          {/* ── Scroll items ── */}
          {scrollItems.map((item, i) => {
            const isActive = i === activeIndex;
            const pos = itemPositions[i];

            // ── Intro ──
            if (item.type === "intro") {
              return (
                <IntroScrollItem
                  key="intro"
                  total={scrollItems.length}
                  scrollYProgress={scrollYProgress}
                >
                  <div
                    className="relative rounded-full overflow-hidden shadow-2xl flex-shrink-0"
                    style={{ width: 260, height: 260 }}
                  >
                    <Image
                      src="/assets/images/test-image.png"
                      alt="ECF Journey"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-[#E0C759]/60 text-xs primarybold tracking-[6px] uppercase mb-3">
                      Our Journey
                    </p>
                    <h2 className="text-white primarybold text-bold-2xl max-w-[380px] leading-tight">
                      Building Africa&apos;s Climate Future
                    </h2>
                  </div>
                </IntroScrollItem>
              );
            }

            // ── Text bubble ──
            if (item.type === "text") {
              return (
                <MilestoneScrollItem
                  key={i}
                  index={i}
                  total={scrollItems.length}
                  scrollYProgress={scrollYProgress}
                  style={{
                    position: "absolute",
                    left: pos.left,
                    top: pos.top,
                    rotate: pos.rotate,
                    maxWidth: "420px",
                    zIndex: isActive ? 30 : 10,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div className="bg-[#056F99] rounded-3xl p-8 md:p-10 shadow-xl">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-8 h-[3px] bg-[#E0C759] rounded-full" />
                      <span className="text-[#E0C759]/70 text-xs primarybold tracking-[4px] uppercase">
                        {item.year}
                      </span>
                    </div>
                    <h4 className="text-white primarybold text-bold-xl mb-4 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-white/60 text-normal-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </MilestoneScrollItem>
              );
            }

            // ── Image block ──
            if (item.type === "image") {
              return (
                <MilestoneScrollItem
                  key={i}
                  index={i}
                  total={scrollItems.length}
                  scrollYProgress={scrollYProgress}
                  style={{
                    position: "absolute",
                    left: pos.left,
                    top: pos.top,
                    width: pos.w,
                    height: pos.h,
                    rotate: pos.rotate,
                    zIndex: isActive ? 25 : 8,
                    pointerEvents: "none",
                  }}
                  className="rounded-2xl overflow-hidden shadow-2xl"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </MilestoneScrollItem>
              );
            }

            // ── Outro ──
            if (item.type === "outro") {
              return (
                <OutroScrollItem
                  key="outro"
                  index={i}
                  total={scrollItems.length}
                  scrollYProgress={scrollYProgress}
                >
                  <div className="w-8 h-[3px] bg-[#E0C759] rounded-full mb-6" />
                  <h2 className="text-white primarybold text-bold-2xl text-center max-w-[480px] leading-tight">
                    The Journey Continues
                  </h2>
                  <p className="text-white/50 text-normal-lg text-center max-w-[360px] mt-4 leading-relaxed">
                    Building a future where Africa leads climate technology.
                  </p>
                </OutroScrollItem>
              );
            }

            return null;
          })}

          {/* ── Skip button ── */}
          <button
            onClick={() => {
              if (!sectionRef.current) return;
              const sectionBottom =
                sectionRef.current.offsetTop + sectionRef.current.offsetHeight;
              window.scrollTo({ top: sectionBottom, behavior: "smooth" });
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 text-white/60 hover:text-white text-sm transition-all duration-300 cursor-pointer"
          >
            Skip section
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 1.75V12.25M7 12.25L12.25 7M7 12.25L1.75 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* ── Right: timeline axis ── */}
          <div className="absolute right-8 top-0 bottom-8 z-50 flex flex-col items-end">
            <div className="pt-14 pb-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeYear}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.28, ease: EASE_OUT }}
                  className="text-[#E0C759] primarybold leading-none text-right"
                  style={{ fontSize: "clamp(3rem, 5vw, 5rem)" }}
                >
                  {activeYear}
                </motion.p>
              </AnimatePresence>
            </div>

            <div
              ref={timelineRef}
              className="relative flex-1 cursor-ns-resize select-none"
              style={{ width: "88px" }}
              onPointerDown={handleTimelinePointerDown}
              onPointerMove={handleTimelinePointerMove}
              onPointerUp={handleTimelinePointerUp}
              onPointerCancel={handleTimelinePointerUp}
            >
              <div
                className="absolute right-[7px] top-0 bottom-0 w-px"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 5px, transparent 5px, transparent 13px)",
                }}
              />
              <motion.div
                style={{
                  y: dotPos,
                  boxShadow: "0 0 0 6px rgba(224,199,89,0.2)",
                }}
                className="absolute right-0 w-[14px] h-[14px] rounded-full bg-[#E0C759] z-10 pointer-events-none"
              />
              {years.map((year, idx) => {
                const yearStartIdx = scrollItems.findIndex(
                  (item) => item.type !== "intro" && item.type !== "outro" && item.year === year
                );
                const fraction =
                  yearStartIdx === -1
                    ? idx / (years.length - 1)
                    : yearStartIdx / (scrollItems.length - 1);
                const top = fraction * (timelineH - 14);
                const isYearActive = activeYear === year;
                const isPast = idx <= activeYearIndex;
                return (
                  <div
                    key={year}
                    className="absolute right-0 flex items-center"
                    style={{ top: `${top}px` }}
                  >
                    <span
                      className={`mr-2 text-xs primarybold whitespace-nowrap transition-colors duration-300 ${
                        isYearActive
                          ? "text-[#E0C759]"
                          : isPast
                            ? "text-white/50"
                            : "text-white/20"
                      }`}
                    >
                      {year}
                    </span>
                    <div
                      className={`w-3 h-px transition-colors duration-300 ${
                        isPast ? "bg-[#E0C759]" : "bg-white/20"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMilestonesSection;
