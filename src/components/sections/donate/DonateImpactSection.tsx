import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const impactItems = [
  {
    number: "$25",
    label: "Funds Research Materials",
    description:
      "Provides essential research materials and access to academic databases for one early-career climate researcher.",
  },
  {
    number: "$50",
    label: "Supports Policy Dialogues",
    description:
      "Enables participation of one African policymaker in a regional climate technology governance dialogue.",
  },
  {
    number: "$100",
    label: "Powers a Fellowship Month",
    description:
      "Covers one month of support for an ACIEFR fellow conducting African-led climate intervention research.",
  },
  {
    number: "$250",
    label: "Builds Institutional Capacity",
    description:
      "Delivers a short-course workshop module at a partner university in Ghana, Kenya, or South Africa.",
  },
];

function ImpactCard({
  number,
  label,
  description,
  delay,
}: {
  number: string;
  label: string;
  description: string;
  delay: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className="bg-[#025C7F] rounded-3xl p-6 md:p-8 flex flex-col gap-3"
    >
      <span className="text-[#E0C759] text-5xl md:text-6xl font-bold primarybold">
        {number}
      </span>
      <span className="text-white text-lg font-semibold secondarybold">
        {label}
      </span>
      <p className="text-white/80 text-normal-base leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

function DonateImpactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <p className="text-[#0182B5] text-sm md:text-base font-medium tracking-widest uppercase mb-3">
            Your Impact
          </p>
          <h2 className="text-bold-2xl text-[#025C7F] max-w-[600px]">
            Every Contribution Creates Change
          </h2>
          <p className="text-normal-lg text-black/60 max-w-[560px] mt-4 leading-relaxed">
            See exactly how your donation translates into real action across the
            African climate technology landscape.
          </p>
        </motion.div>

        {/* Impact cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {impactItems.map((item, index) => (
            <ImpactCard
              key={index}
              {...item}
              delay={0.1 * (index + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DonateImpactSection;
