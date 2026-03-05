import { motion } from "framer-motion";
import MaskText from "@/components/animation/OpacityMoveYInViewAnimation";

function SrmWhySection() {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="w-full max-w-3xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
        >
          <div className="w-10 h-[3px] bg-[#E0C759] rounded-full mb-6" />
          <h2 className="text-bold-2xl text-[#034D6B] mb-8 leading-tight">
            Why SRM?
          </h2>
        </motion.div>
        <div className="flex flex-col gap-6">
          <MaskText positionFrom={30} triggerOnce={true} animationDelay={0.1} duration={0.8} extraClassNames="text-normal-lg text-black/70 leading-relaxed">
            Solar Radiation Management — the deliberate intervention in Earth&apos;s
            sunlight to cool the planet — is no longer a distant scientific thought
            experiment. It is being researched, debated, and increasingly considered
            as a potential response to accelerating climate breakdown. And yet the
            countries and communities most likely to be affected by its consequences
            are the least represented in the conversations about whether, how, and by
            whom it should be governed.
          </MaskText>
          <MaskText positionFrom={30} triggerOnce={true} animationDelay={0.2} duration={0.8} extraClassNames="text-normal-lg text-black/70 leading-relaxed">
            For Africa, the stakes could not be higher. SRM interventions could affect
            monsoon patterns, reduce crop yields, and alter the very ecosystems
            millions depend on for survival. ECF believes that African institutions,
            policymakers, and communities must not be passive observers of these
            decisions — they must be architects of them. We build the research
            capacity, governance frameworks, and continental coalitions needed for
            Africa to engage with SRM on its own terms, with clarity, sovereignty,
            and purpose.
          </MaskText>
        </div>
      </div>
    </section>
  );
}

export default SrmWhySection;
