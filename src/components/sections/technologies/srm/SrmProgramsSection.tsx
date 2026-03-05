import { motion } from "framer-motion"; // still needed for motion.span (decorative id number + chips)
import Image from "next/image";
import MaskText from "@/components/animation/OpacityMoveYInViewAnimation";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Partners = Record<string, string[]> | null;

interface Stat {
  value: string;
  label: string;
}

interface Program {
  id: string;
  title: string;
  image: string;
  background: string;
  objectives: string[];
  impacts: string[];
  partners: Partners;
  stats: Stat[];
}

const programs: Program[] = [
  {
    id: "01",
    title: "SRM Short Course Programme",
    image: "/assets/images/test-image.png",
    background:
      "Africa contributes minimally to global greenhouse gas emissions, yet bears disproportionate climate impacts — intensified droughts, flooding, heat stress, food insecurity, and ecosystem degradation. While mitigation and adaptation remain essential, emerging conversations around Solar Radiation Modification (SRM) are accelerating globally. However, Africa remains underrepresented in research production, governance negotiations, and technical infrastructure shaping these Frontier Climate Technologies (FCTs). This short course was designed as a strategic intervention to close the knowledge gap on SRM within African institutions and equip policymakers, researchers, and civil society actors to engage in global climate intervention dialogue from a position of informed agency.",
    objectives: [
      "Strengthen academic understanding of SRM.",
      "Build a pipeline of informed early-career professionals engaging with climate interventions.",
      "Promote justice-centred perspectives in climate technology dialogue.",
      "Encourage interdisciplinary engagement across science, policy, and governance.",
      "Advance African agency in global climate intervention discussions.",
    ],
    impacts: [
      "Reached over 900 students and early-career professionals across Ghana, South Africa, and Kenya.",
      "Improved 85% of participants' understanding of SRM concepts through post-training surveys.",
      "Strengthened interest in science-policy careers and climate research across engaged academic institutions.",
      "Enhanced institutional demand for recurring climate intervention education.",
      "Reinforced Africa-focused discourse within 10 universities.",
    ],
    stats: [
      { value: "900+", label: "students reached" },
      { value: "85%", label: "improved understanding" },
      { value: "10", label: "partner universities" },
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
    id: "02",
    title: "SRM Briefing Series (2025)",
    image: "/assets/images/test-image.png",
    background:
      "Across Africa, countries such as Ghana, Kenya, and South Africa are experiencing intensifying climate impacts — rising temperatures, erratic rainfall, prolonged droughts, flooding, and coastal vulnerability. Yet despite these realities, African voices remain underrepresented in global discussions on Solar Radiation Modification. Limited technical familiarity, insufficient research output, and constrained participation in international science-policy platforms have collectively restricted the ability of policymakers, researchers, and civil society actors to engage confidently in SRM discourse. The SRM Briefing Series was convened in Ghana, Kenya, and South Africa to directly address this gap by strengthening informed, justice-centered engagement on SRM across diverse national contexts.",
    objectives: [
      "Build shared African literacy on SRM science, risks, and uncertainties.",
      "Examine ethical, governance, and community implications.",
      "Surface research gaps and policy blind spots.",
      "Strengthen cross-sector dialogue between science, policy, and civil society.",
      "Support early coordination toward national and regional SRM positions.",
    ],
    impacts: [
      "Three regional briefings delivered in Accra, Nairobi, and Johannesburg.",
      "105 participants engaged including policymakers, staff from mandated institutions, and research and civil society organizations from over 35 institutions.",
      "Strengthened African capacity to engage critically with SRM discourse.",
      "Clarified governance priorities including consent, accountability, and justice.",
      "Reinforced African leadership in shaping SRM research agendas.",
    ],
    stats: [
      { value: "3", label: "regional briefings" },
      { value: "105", label: "participants engaged" },
      { value: "35+", label: "institutions represented" },
    ],
    partners: null,
  },
  {
    id: "03",
    title: "ACIFER SRM Fellowship",
    image: "/assets/images/test-image.png",
    background:
      "The African Climate Intervention Fellowship for Early-Career Researchers (ACIFER) SRM Track is a pioneering initiative aimed at strengthening African-led research and governance literacy in Solar Radiation Modification. As global dialogues intensify around emerging climate interventions, it is essential that African researchers and policymakers are equipped to critically assess the scientific, ethical, and governance implications of SRM within the continent's unique environmental and socio-political contexts. At present, SRM research is predominantly concentrated in institutions outside Africa, creating a knowledge imbalance that marginalizes African perspectives in global governance discussions. ACIFER addresses these gaps by strengthening research capacity, fostering interdisciplinary collaboration, and enhancing research-to-policy translation mechanisms.",
    objectives: [
      "Build African-led research capacity in SRM.",
      "Equip fellows with technical, ethical, and governance knowledge.",
      "Foster mentorship and interdisciplinary collaboration.",
      "Strengthen Africa's contribution to global climate intervention research.",
    ],
    impacts: [
      "Trained 30 fellows selected from 45+ African countries.",
      "3 research proposals developed and presented (currently underway).",
      "36 mentorship sessions conducted.",
      "Fellows engaged in cross-country research collaborations.",
      "Established an early-career research community to foster cross-regional collaborations.",
    ],
    stats: [
      { value: "30", label: "fellows trained" },
      { value: "45+", label: "African countries" },
      { value: "36", label: "mentorship sessions" },
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
            triggerOnce={true}
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
        triggerOnce={true}
        animationDelay={delay + 0.05}
        extraClassNames="text-[#E0C759]/80 text-xs primarybold tracking-[4px] uppercase"
      >
        {label}
      </MaskText>
    </div>
  );
}

function ProgramCard({ program, index }: { program: Program; index: number }) {
  return (
    <MaskText div positionFrom={40} triggerOnce={true} animationDelay={0.05 * index} extraClassNames="rounded-3xl overflow-hidden bg-white/5 border border-white/10 mb-10 last:mb-0">
      {/* Hero image with title overlay */}
      <div className="relative w-full h-[280px] md:h-[380px] overflow-hidden">
        <Image
          src={program.image}
          alt={program.title}
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
            transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
            className="text-[#E0C759] primarybold text-[56px] md:text-[80px] leading-none opacity-30 block mb-1"
          >
            {program.id}
          </motion.span>
          <MaskText
            positionFrom={20}
            triggerOnce={true}
            animationDelay={0.2}
            extraClassNames="text-white primarybold text-bold-xl md:text-bold-2xl leading-snug max-w-xl"
          >
            {program.title}
          </MaskText>
        </div>
      </div>

      <div className="p-8 md:p-12 flex flex-col gap-10">

        {/* Key stats */}
        <div className="grid grid-cols-3 gap-4 pb-10 border-b border-white/10">
          {program.stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <MaskText
                positionFrom={16}
                triggerOnce={true}
                animationDelay={0.1 + 0.1 * i}
                extraClassNames="text-[#E0C759] primarybold text-bold-2xl md:text-bold-3xl leading-none"
              >
                {stat.value}
              </MaskText>
              <MaskText
                positionFrom={12}
                triggerOnce={true}
                animationDelay={0.15 + 0.1 * i}
                extraClassNames="text-white/50 text-xs md:text-sm leading-snug"
              >
                {stat.label}
              </MaskText>
            </div>
          ))}
        </div>

        {/* Background */}
        <div className="border-l-2 border-[#E0C759]/30 pl-6">
          <MaskText
            positionFrom={20}
            triggerOnce={true}
            animationDelay={0.1}
            extraClassNames="text-white/60 text-normal-base leading-relaxed"
          >
            {program.background}
          </MaskText>
        </div>

        {/* Objectives + Impacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <ColumnHeader label="Objectives" delay={0.05} />
            <BulletList items={program.objectives} />
          </div>
          <div className="md:border-l md:border-white/10 md:pl-10">
            <ColumnHeader label="Impacts" delay={0.05} />
            <BulletList items={program.impacts} />
          </div>
        </div>

        {/* Partners */}
        {program.partners && (
          <div className="pt-6 border-t border-white/10">
            <ColumnHeader label="Partner Universities" delay={0.05} />
            <div className="flex flex-col gap-6">
              {Object.entries(program.partners).map(([country, universities], ci) => (
                <div key={country}>
                  <MaskText
                    positionFrom={14}
                    triggerOnce={true}
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
                        transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1], delay: 0.1 + 0.08 * ci + 0.04 * ui }}
                        className="px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-white/70 text-sm hover:bg-white/10 transition-colors duration-200"
                      >
                        {uni}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </MaskText>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

function SrmProgramsSection() {
  return (
    <section className="w-full bg-[#034D6B] py-16 md:py-24">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        {/* Section header */}
        <div className="mb-12">
          <MaskText positionFrom={20} triggerOnce={true} animationDelay={0} extraClassNames="text-[#E0C759]/60 text-xs primarybold tracking-[6px] uppercase mb-3">
            Solar Radiation Management
          </MaskText>
          <MaskText positionFrom={30} triggerOnce={true} animationDelay={0.1} extraClassNames="text-white primarybold text-bold-2xl">
            SRM Programs
          </MaskText>
        </div>

        {/* Programs list */}
        <div>
          {programs.map((program, index) => (
            <ProgramCard key={program.id} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SrmProgramsSection;
