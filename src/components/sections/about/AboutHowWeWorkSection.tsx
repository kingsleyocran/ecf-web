import MaskText from "@/components/animation/OpacityMoveYInViewAnimation";

const pillars = [
  {
    title: "Capacity Strengthening",
    description:
      "We develop sustainable training programs for early-career researchers, students, and policymakers to build expertise in CDR, SRM, and AI governance, tailored to Africa's unique climate challenges.",
  },
  {
    title: "Collaborative Network Building",
    description:
      "We establish a continental coalition of stakeholders from academia, government, civil society, and communities to shape Africa's collective stance on FCTs",
  },
  {
    title: "Movement Building for Climate Justice",
    description:
      "We ignite and sustain a vibrant, Africa-led movement to advance equitable and contextually relevant FCTs, uniting diverse voices from youth, marginalized communities, and policymakers.",
  },
];

function AboutHowWeWorkSection() {
  return (
    <section id="how-we-work" className="w-full bg-[#C7B14E] py-16 md:py-24">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <MaskText positionFrom={24} triggerOnce={true} animationDelay={0} extraClassNames="text-bold-2xl text-white mb-4">
          How We Work
        </MaskText>
        <MaskText positionFrom={20} triggerOnce={true} animationDelay={0.1} extraClassNames="text-normal-base text-white/80 max-w-[450px] mb-12">
          Our approach to building African climate technology leadership.
        </MaskText>
      </div>

      {/* Cards */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <MaskText key={index} div positionFrom={32} triggerOnce={true} animationDelay={0.1 * index} extraClassNames="rounded-2xl bg-white/10 p-8 md:p-10">
              <MaskText positionFrom={16} triggerOnce={true} animationDelay={0.05 + 0.1 * index} extraClassNames="text-bold-lg text-white mb-4">
                {pillar.title}
              </MaskText>
              <MaskText positionFrom={14} triggerOnce={true} animationDelay={0.12 + 0.1 * index} extraClassNames="text-normal-base text-white/80">
                {pillar.description}
              </MaskText>
            </MaskText>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutHowWeWorkSection;
