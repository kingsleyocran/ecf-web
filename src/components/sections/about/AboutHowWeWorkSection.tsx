const pillars = [
  {
    title: "Capacity Strengthening",
    description:
      "We develop sustainable training programs for early-career researchers, students, and policymakers to build expertise in CDR, SRM, and AI governance, tailored to Africa\u2019s unique climate challenges.",
  },
  {
    title: "Collaborative Network Building",
    description:
      "We establish a continental coalition of stakeholders from academia, government, civil society, and communities to shape Africa\u2019s collective stance on FCTs",
  },
  {
    title: "Movement Building for Climate Justice",
    description:
      "We ignite and sustain a vibrant, Africa-led movement to advance equitable and contextually relevant FCTs, uniting diverse voices from youth, marginalized communities, and policymakers.",
  },
];

function AboutHowWeWorkSection() {
  return (
    <section className="w-full bg-[#C7B14E] py-16 md:py-24">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <h2 className="text-bold-2xl text-white mb-4">How We Work</h2>
        <p className="text-normal-base text-white/80 max-w-[450px] mb-12">
          Our approach to building African climate technology leadership.
        </p>
      </div>

      {/* Horizontally scrollable cards */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="rounded-2xl  bg-white/10 p-8 md:p-10"
            >
              <h3 className="text-bold-lg text-white mb-4">{pillar.title}</h3>
              <p className="text-normal-base text-white/80">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutHowWeWorkSection;
