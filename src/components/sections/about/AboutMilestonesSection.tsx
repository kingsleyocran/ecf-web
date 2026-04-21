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
import { useTranslation } from "next-i18next";
import { useMediaQuery } from "react-responsive";

// ─── Data ────────────────────────────────────────────────────────────────────

const milestoneMeta = [
  {
    year: "2023",
    items: [
      { key: "founded",     image: "/assets/images/milestones/milestone-1.png" },
      { key: "geoDialogue", image: "/assets/images/milestones/milestone-2.png" },
    ],
  },
  {
    year: "2024",
    items: [
      { key: "srmSession",   image: "/assets/images/milestones/milestone-3.png" },
      { key: "baseline",     image: null },
      { key: "partnerships", image: "/assets/images/milestones/milestone-5.png" },
    ],
  },
  {
    year: "2025",
    items: [
      { key: "acifer",          image: "/assets/images/milestones/milestone-6.png" },
      { key: "carbonAccounting",image: "/assets/images/milestones/milestone-7.png" },
      { key: "shortCourses",    image: "/assets/images/milestones/milestone-8.png" },
      { key: "transition",      image: "/assets/images/milestones/milestone-9.png" },
    ],
  },
];

type IntroItem  = { type: "intro" };
type TextItem   = { type: "text";  year: string; key: string };
type ImageItem  = { type: "image"; src: string; alt: string; year: string };
type OutroItem  = { type: "outro" };
type ScrollItem = IntroItem | TextItem | ImageItem | OutroItem;

const scrollItems: ScrollItem[] = [
  { type: "intro" },
  ...milestoneMeta.flatMap((milestone) =>
    milestone.items.flatMap((item) => [
      { type: "text" as const, year: milestone.year, key: item.key },
      ...(item.image
        ? [{ type: "image" as const, src: item.image, alt: item.key, year: milestone.year }]
        : []),
    ])
  ),
  { type: "outro" },
];

const TOTAL_MILESTONES = milestoneMeta.reduce((n, m) => n + m.items.length, 0);

// ─── Positions ───────────────────────────────────────────────────────────────

type Pos = { left: string; top: string; rotate: number; w?: number; h?: number };

const desktopPositions: Pos[] = [
  { left: "0",   top: "0",   rotate: 0 },
  { left: "22%", top: "20%", rotate: -2 },
  { left: "49%", top: "14%", rotate: 3,    w: 360, h: 430 },
  { left: "24%", top: "44%", rotate: 1.5 },
  { left: "50%", top: "32%", rotate: -2.5, w: 345, h: 415 },
  { left: "20%", top: "28%", rotate: -1 },
  { left: "47%", top: "18%", rotate: 2,    w: 370, h: 440 },
  { left: "26%", top: "50%", rotate: 2 },
  { left: "22%", top: "22%", rotate: -1.5 },
  { left: "48%", top: "42%", rotate: 1.5,  w: 355, h: 420 },
  { left: "24%", top: "38%", rotate: 1 },
  { left: "47%", top: "16%", rotate: -2,   w: 350, h: 420 },
  { left: "20%", top: "46%", rotate: 2.5 },
  { left: "49%", top: "22%", rotate: -1.5, w: 360, h: 430 },
  { left: "26%", top: "26%", rotate: -2 },
  { left: "50%", top: "44%", rotate: 3,    w: 345, h: 415 },
  { left: "22%", top: "20%", rotate: 1 },
  { left: "48%", top: "36%", rotate: -2.5, w: 355, h: 425 },
  { left: "0",   top: "0",   rotate: 0 },
];

// Mobile: text on left ~4%, images on right ~52%, images ~40% of desktop size
const mobilePositions: Pos[] = [
  { left: "0",   top: "0",   rotate: 0 },
  { left: "4%",  top: "20%", rotate: -1 },
  { left: "52%", top: "14%", rotate: 2,    w: 144, h: 172 },
  { left: "5%",  top: "44%", rotate: 1 },
  { left: "53%", top: "32%", rotate: -2,   w: 138, h: 166 },
  { left: "4%",  top: "28%", rotate: -1 },
  { left: "52%", top: "18%", rotate: 1.5,  w: 148, h: 176 },
  { left: "5%",  top: "50%", rotate: 1.5 },
  { left: "4%",  top: "22%", rotate: -1 },
  { left: "53%", top: "42%", rotate: 1,    w: 142, h: 168 },
  { left: "4%",  top: "38%", rotate: 0.5 },
  { left: "52%", top: "16%", rotate: -1.5, w: 140, h: 168 },
  { left: "4%",  top: "46%", rotate: 1.5 },
  { left: "53%", top: "22%", rotate: -1,   w: 144, h: 172 },
  { left: "5%",  top: "26%", rotate: -1.5 },
  { left: "52%", top: "44%", rotate: 2,    w: 138, h: 166 },
  { left: "4%",  top: "20%", rotate: 0.5 },
  { left: "53%", top: "36%", rotate: -2,   w: 142, h: 170 },
  { left: "0",   top: "0",   rotate: 0 },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const STEP_VH = 130;
const lastYear = milestoneMeta[milestoneMeta.length - 1].year;
const nextYear = String(Number(lastYear) + 1);
const years = [...milestoneMeta.map((m) => m.year), nextYear];

function getYear(index: number): string {
  const item = scrollItems[index];
  if (!item || item.type === "intro") return "2023";
  if (item.type === "outro") return milestoneMeta[milestoneMeta.length - 1].year;
  return item.year;
}

function getMilestoneNum(index: number): number {
  if (index === 0) return 0;
  return Math.ceil(index / 2);
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function IntroScrollItem({
  total, scrollYProgress, children,
}: {
  total: number; scrollYProgress: MotionValue<number>; children: React.ReactNode;
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

function MilestoneScrollItem({
  index, total, scrollYProgress, children, style, className,
}: {
  index: number; total: number; scrollYProgress: MotionValue<number>;
  children: React.ReactNode; style?: MotionStyle; className?: string;
}) {
  const N = total;
  const enterStart = Math.max(0, (index - 0.75) / N);
  const peakStart  = index / N;
  const peakEnd    = (index + 0.55) / N;
  const goneEnd    = Math.min(1, (index + 1.1) / N);

  const opacity = useTransform(scrollYProgress,
    [enterStart, peakStart, peakEnd, goneEnd],
    [0, 1, 0.14, 0]);
  const scale = useTransform(scrollYProgress,
    [enterStart, peakStart, goneEnd],
    [1.18, 1.0, 0.85]);

  return (
    <motion.div style={{ ...style, opacity, scale }} className={className}>
      {children}
    </motion.div>
  );
}

function OutroScrollItem({
  index, total, scrollYProgress, children,
}: {
  index: number; total: number; scrollYProgress: MotionValue<number>; children: React.ReactNode;
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
  const { t } = useTranslation("about");
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const sectionRef  = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [timelineH, setTimelineH]     = useState(500);

  useEffect(() => {
    if (!timelineRef.current) return;
    const ro = new ResizeObserver(([e]) => setTimelineH(e.contentRect.height));
    ro.observe(timelineRef.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, scrollItems.length - 1]);
  useMotionValueEvent(rawIndex, "change", (v) => setActiveIndex(Math.round(v)));

  const isDraggingRef = useRef(false);
  const dotPos = useMotionValue(0);

  const rawDotY = useTransform(scrollYProgress, [0, 1], [0, timelineH - 14]);
  useMotionValueEvent(rawDotY, "change", (v) => {
    if (!isDraggingRef.current) dotPos.set(v);
  });

  const seekToFraction = (fraction: number) => {
    if (!sectionRef.current) return;
    const f = Math.max(0, Math.min(1, fraction));
    dotPos.set(f * (timelineH - 14));
    const top = sectionRef.current.offsetTop;
    const h   = sectionRef.current.offsetHeight;
    window.scrollTo({ top: top + f * (h - window.innerHeight), behavior: "instant" as ScrollBehavior });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = e.currentTarget.getBoundingClientRect();
    seekToFraction((e.clientY - rect.top) / rect.height);
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    seekToFraction((e.clientY - rect.top) / rect.height);
  };
  const handlePointerUp = () => { isDraggingRef.current = false; };

  const activeYear      = getYear(activeIndex);
  const activeYearIndex = years.indexOf(activeYear);
  const milestoneNum    = getMilestoneNum(activeIndex);
  const positions       = isMobile ? mobilePositions : desktopPositions;

  return (
    <section id="milestones" className="w-full bg-[#034D6B]">
      <div
        ref={sectionRef}
        style={{ height: `${scrollItems.length * STEP_VH}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Top-left label */}
          <div className="absolute top-6 left-4 md:top-8 md:left-8 z-50 pointer-events-none">
            <p className="text-[#E0C759]/60 text-xs font-medium tracking-[6px] uppercase">
              {t("milestones.sectionLabel")}
            </p>
          </div>

          {/* Progress counter */}
          <div className="absolute bottom-6 left-4 md:bottom-8 md:left-8 z-50 pointer-events-none">
            <p className="text-white/30 text-xs md:text-sm primarybold">
              {milestoneNum === 0 ? "— " : String(milestoneNum).padStart(2, "0")}{" "}
              / {String(TOTAL_MILESTONES).padStart(2, "0")}
            </p>
          </div>

          {/* ── Scroll items ── */}
          {scrollItems.map((item, i) => {
            const isActive = i === activeIndex;
            const pos = positions[i];

            if (item.type === "intro") {
              return (
                <IntroScrollItem key="intro" total={scrollItems.length} scrollYProgress={scrollYProgress}>
                  <div
                    className="relative rounded-full overflow-hidden shadow-2xl flex-shrink-0"
                    style={{ width: isMobile ? 160 : 260, height: isMobile ? 160 : 260 }}
                  >
                    <Image
                      src="/assets/images/milestones/milestones-header.png"
                      alt="ECF Journey"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="text-center px-4">
                    <p className="text-[#E0C759]/60 text-xs primarybold tracking-[6px] uppercase mb-3">
                      {t("milestones.label")}
                    </p>
                    <h2 className="text-white primarybold text-bold-xl md:text-bold-2xl max-w-[280px] md:max-w-[380px] leading-tight">
                      {t("milestones.heading")}
                    </h2>
                  </div>
                </IntroScrollItem>
              );
            }

            if (item.type === "text") {
              return (
                <MilestoneScrollItem
                  key={i} index={i} total={scrollItems.length} scrollYProgress={scrollYProgress}
                  style={{
                    position: "absolute",
                    left: pos.left,
                    top: pos.top,
                    rotate: pos.rotate,
                    maxWidth: isMobile ? "46vw" : "420px",
                    zIndex: isActive ? 30 : 10,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div className="bg-[#056F99] rounded-2xl md:rounded-3xl p-4 md:p-10 shadow-xl">
                    <div className="flex items-center gap-2 mb-2 md:mb-5">
                      <div className="w-5 md:w-8 h-[2px] md:h-[3px] bg-[#E0C759] rounded-full" />
                      <span className="text-[#E0C759]/70 text-[10px] md:text-xs primarybold tracking-[3px] md:tracking-[4px] uppercase">
                        {item.year}
                      </span>
                    </div>
                    <h4 className="text-white primarybold text-sm md:text-bold-xl mb-1 md:mb-4 leading-snug">
                      {t(`milestones.items.${item.key}.title`)}
                    </h4>
                    <p className="text-white/60 text-xs md:text-normal-lg leading-relaxed">
                      {t(`milestones.items.${item.key}.description`)}
                    </p>
                  </div>
                </MilestoneScrollItem>
              );
            }

            if (item.type === "image") {
              return (
                <MilestoneScrollItem
                  key={i} index={i} total={scrollItems.length} scrollYProgress={scrollYProgress}
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
                  className="rounded-xl md:rounded-2xl overflow-hidden shadow-2xl"
                >
                  <div className="relative w-full h-full">
                    <Image src={item.src} alt={item.alt} fill style={{ objectFit: "cover" }} />
                  </div>
                </MilestoneScrollItem>
              );
            }

            if (item.type === "outro") {
              return (
                <OutroScrollItem key="outro" index={i} total={scrollItems.length} scrollYProgress={scrollYProgress}>
                  <div className="w-6 md:w-8 h-[2px] md:h-[3px] bg-[#E0C759] rounded-full mb-4 md:mb-6" />
                  <h2 className="text-white primarybold text-bold-xl md:text-bold-2xl text-center max-w-[280px] md:max-w-[480px] leading-tight px-4">
                    {t("milestones.outro.heading")}
                  </h2>
                  <p className="text-white/50 text-sm md:text-normal-lg text-center max-w-[260px] md:max-w-[360px] mt-3 md:mt-4 leading-relaxed px-4">
                    {t("milestones.outro.description")}
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
              window.scrollTo({
                top: sectionRef.current.offsetTop + sectionRef.current.offsetHeight,
                behavior: "smooth",
              });
            }}
            className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2
              px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm
              border border-white/20 text-white/60 hover:text-white text-xs md:text-sm transition-all duration-300 cursor-pointer"
          >
            {t("milestones.skipSection")}
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.75V12.25M7 12.25L12.25 7M7 12.25L1.75 7"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* ── Right: timeline axis ── */}
          <div className="absolute right-3 md:right-8 top-0 bottom-6 md:bottom-8 z-50 flex flex-col items-end">
            <div className="pt-10 md:pt-14 pb-4 md:pb-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeYear}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.28, ease: EASE_OUT }}
                  className="text-[#E0C759] primarybold leading-none text-right"
                  style={{ fontSize: isMobile ? "clamp(1.5rem, 7vw, 2.5rem)" : "clamp(3rem, 5vw, 5rem)" }}
                >
                  {activeYear}
                </motion.p>
              </AnimatePresence>
            </div>

            <div
              ref={timelineRef}
              className="relative flex-1 cursor-ns-resize select-none"
              style={{ width: isMobile ? 56 : 88 }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <div
                className="absolute right-[7px] top-0 bottom-0 w-px"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 5px, transparent 5px, transparent 13px)",
                }}
              />
              <motion.div
                style={{ y: dotPos, boxShadow: "0 0 0 6px rgba(224,199,89,0.2)" }}
                className="absolute right-0 w-[14px] h-[14px] rounded-full bg-[#E0C759] z-10 pointer-events-none"
              />
              {years.map((year, idx) => {
                const yearStartIdx = scrollItems.findIndex(
                  (si) => si.type !== "intro" && si.type !== "outro" && si.year === year
                );
                const fraction =
                  yearStartIdx === -1
                    ? idx / (years.length - 1)
                    : yearStartIdx / (scrollItems.length - 1);
                const top = fraction * (timelineH - 14);
                const isYearActive = activeYear === year;
                const isPast = idx <= activeYearIndex;
                return (
                  <div key={year} className="absolute right-0 flex items-center" style={{ top: `${top}px` }}>
                    <span
                      className={`mr-1 md:mr-2 text-[10px] md:text-xs primarybold whitespace-nowrap transition-colors duration-300 ${
                        isYearActive ? "text-[#E0C759]" : isPast ? "text-white/50" : "text-white/20"
                      }`}
                    >
                      {year}
                    </span>
                    <div className={`w-2 md:w-3 h-px transition-colors duration-300 ${isPast ? "bg-[#E0C759]" : "bg-white/20"}`} />
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
