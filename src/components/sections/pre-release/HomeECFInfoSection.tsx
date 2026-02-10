import React from "react";

const thematicAreas = [
  {
    title: "Artificial Intelligence (AI)",
    description:
      "Developing AI for high-quality climate data in water-scarce regions and supporting context-specific applications.",
    icon: "🤖",
  },
  {
    title: "Carbon Dioxide Removal (CDR)",
    description:
      "Tailoring CDR solutions to African contexts and building local expertise in carbon accounting and decarbonization.",
    icon: "🌱",
  },
  {
    title: "Solar Radiation Management (SRM)",
    description:
      "Assessing SRM's regional impacts and ensuring African voices shape global governance frameworks.",
    icon: "☀️",
  },
];

const achievements = [
  {
    number: "20+",
    label: "Professionals Trained",
    description: "in carbon accounting and decarbonization",
  },
  {
    number: "10",
    label: "Strategic Placements",
    description: "in industries and public institutions",
  },
  {
    number: "1st",
    label: "Public SRM Session",
    description: "at a UN Climate Conference",
  },
  {
    number: "1st",
    label: "Open Virtual Dialogue",
    description: "on geoengineering in Africa",
  },
];

function HomeECFInfoSection() {
  return (
    <section className="w-full bg-white py-12 md:py-24">
      <div className="w-full max-w-[1300px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Thematic Areas Section */}
        <div className="mb-16 md:mb-24">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-section-header text-[#024D6B] mb-4">
              Our Thematic Areas
            </h2>
            <p className="text-normal-base text-[#535353] max-w-[800px] mx-auto">
              ECF focuses on three Frontier Climate Technologies (FCTs) that
              hold transformative potential for Africa&apos;s climate future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {thematicAreas.map((area, index) => (
              <div
                key={index}
                className="bg-[#F5F5F5] rounded-2xl p-6 md:p-8 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300"
              >
                {/* <div className="text-5xl mb-2">{area.icon}</div> */}
                <h3 className="text-bold-lg text-[#024D6B]">{area.title}</h3>
                <p className="text-normal-base text-[#535353]">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-[#024D6B] rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-section-header text-white mb-4">
              What We Are Proud Of
            </h2>
            <p className="text-normal-base text-white/80 max-w-[800px] mx-auto">
              ECF builds on a strong foundation of achievements that demonstrate
              our commitment to empowering African leadership in climate
              technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center text-center gap-2 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-bold-2xl text-[#E0C759]">
                  {achievement.number}
                </div>
                <div className="text-bold-lg text-white">
                  {achievement.label}
                </div>
                <div className="text-normal-sm text-white/70">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Achievements List */}
          <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-start gap-3">
              <div className="text-[#E0C759] text-xl">✓</div>
              <p className="text-normal-base text-white/90">
                Pioneered African Climate Intervention Fellowship for
                Early-Career Researchers (ACIEFR)
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-start gap-3">
              <div className="text-[#E0C759] text-xl">✓</div>
              <p className="text-normal-base text-white/90">
                Published baseline knowledge assessment on climate interventions
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-start gap-3">
              <div className="text-[#E0C759] text-xl">✓</div>
              <p className="text-normal-base text-white/90">
                Created short courses and 101 documents in partnership with
                major universities
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-start gap-3">
              <div className="text-[#E0C759] text-xl">✓</div>
              <p className="text-normal-base text-white/90">
                Partnered with CSIR (Ghana & South Africa) and EPAs for
                institutional strengthening
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 md:mt-24">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-section-header text-[#024D6B] mb-4">
              Build With Us
            </h2>
          </div>

          <div className="bg-[#024D6B] rounded-3xl p-8 md:p-12">
            <div className="mb-8">
              <p
                className="text-normal-bas
              e text-white/80 text-center mb-6 md:mb-8"
              >
                If you are:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-start gap-3 hover:bg-white/20 transition-all duration-300">
                  <div className="text-[#E0C759] text-xl font-bold">•</div>
                  <p className="text-normal-base text-white/90">
                    A researcher working on AI, CDR, SRM or climate data
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-start gap-3 hover:bg-white/20 transition-all duration-300">
                  <div className="text-[#E0C759] text-xl font-bold">•</div>
                  <p className="text-normal-base text-white/90">
                    A policymaker or regulator shaping climate and technology
                    policy
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-start gap-3 hover:bg-white/20 transition-all duration-300">
                  <div className="text-[#E0C759] text-xl font-bold">•</div>
                  <p className="text-normal-base text-white/90">
                    A funder or institution investing in African climate
                    innovation
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-start gap-3 hover:bg-white/20 transition-all duration-300">
                  <div className="text-[#E0C759] text-xl font-bold">•</div>
                  <p className="text-normal-base text-white/90">
                    A community organization advancing climate justice
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-normal-base md:text-normal-lg text-white font-medium max-w-[900px] mx-auto">
                ECF is building Africa&apos;s next climate technology ecosystem
                — and we invite you to build it with us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeECFInfoSection;
