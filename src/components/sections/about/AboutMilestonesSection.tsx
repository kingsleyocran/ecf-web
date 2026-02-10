import { useEffect, useRef, useState } from "react";

const milestonesData = [
  {
    year: "2023",
    items: [
      {
        title: "ECF Founded Within GAYO:",
        description:
          "Our climate team at GAYO took a bold step to challenge inequalities in the climate technology field and create spaces for African leadership.",
      },
      {
        title: "Africa\u2019s First Geoengineering Dialogue Launched:",
        description:
          "Launched the continent\u2019s first open virtual dialogue on geoengineering to discuss these technologies from distinctly African perspectives.",
      },
    ],
  },
  {
    year: "2024",
    items: [
      {
        title: "First Public SRM Session at UN Climate Conference:",
        description:
          "Organized the first-ever public session on Solar Radiation Management at a UN Climate Conference, demonstrating Africa\u2019s readiness to engage on the global stage.",
      },
      {
        title: "Baseline Knowledge Assessment Published:",
        description:
          "Published a comprehensive baseline knowledge assessment on climate interventions, highlighting gaps between the Global South and Global North.",
      },
      {
        title: "Institutional Partnerships Established",
        description:
          "Partnered with the Council for Scientific and Industrial Research (CSIR) in Ghana and South Africa, and Environmental Protection Agencies (EPA) to build capacity within national research and regulatory bodies.",
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
      },
      {
        title: "Carbon Accounting Training Program Delivered",
        description:
          "Trained 20 professionals in carbon accounting and decarbonization, with 10 strategically placed in industries and public institutions including Ghana\u2019s carbon market office.",
      },
      {
        title: "University Short Courses Initiated",
        description:
          "Partnered with universities in Ghana, Kenya, and South Africa to launch dedicated short courses on climate interventions.",
      },
      {
        title: "Transition to Independent Organization",
        description:
          "Began transitioning from GAYO to become Emerging Climate Frontiers (ECF), an independent organization ready to scale impact across the continent.",
      },
    ],
  },
];

const years = milestonesData.map((m) => m.year);

function AboutMilestonesSection() {
  const [activeYear, setActiveYear] = useState(years[0]);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const year = entry.target.getAttribute("data-year");
            if (year) setActiveYear(year);
          }
        }
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    for (const year of years) {
      const el = sectionRefs.current[year];
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToYear = (year: string) => {
    const el = sectionRefs.current[year];
    if (!el) return;

    setActiveYear(year);
    isClickScrolling.current = true;

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  };

  return (
    <section className="w-full bg-[#034D6B] py-16 md:py-36">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        <div
          ref={containerRef}
          className="flex flex-col md:flex-row gap-10 md:gap-20"
        >
          {/* Sticky sidebar with year buttons */}
          <div className="md:sticky md:top-32 md:self-start flex flex-col gap-2 basis-2/5">
            <p className="text-bold-lg text-white mb-4">
              Milestones
            </p>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => scrollToYear(year)}
                className={`px-6 py-3 rounded-full text-base font-semibold transition-colors text-left w-fit ${
                  activeYear === year
                    ? "bg-[#E0C759] text-[#034D6B]"
                    : "bg-white/10 text-white/60 hover:bg-white/20"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Scrolling milestone content */}
          <div className="flex-1 flex flex-col gap-16 md:gap-20 basis-3/5">
            {milestonesData.map((milestone) => (
              <div
                key={milestone.year}
                ref={(el) => {
                  sectionRefs.current[milestone.year] = el;
                }}
                data-year={milestone.year}
                className="scroll-mt-32"
              >
                <h3 className="text-bold-2xl text-[#E0C759] mb-8">
                  {milestone.year}
                </h3>
                <div className="flex flex-col gap-8">
                  {milestone.items.map((item, index) => (
                    <div key={index}>
                      <p className="text-normal-base text-white/90">
                        <span className="font-semibold">{item.title}</span>{" "}
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMilestonesSection;
