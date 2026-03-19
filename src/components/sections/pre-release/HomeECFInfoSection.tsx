import React from "react";
import { useTranslation } from "next-i18next";

const thematicKeys = ["ai", "cdr", "srm"] as const;

const achievementStats = [
  { number: "20+", key: "trained" },
  { number: "10", key: "placed" },
  { number: "1st", key: "courses" },
  { number: "1st", key: "fellowship" },
] as const;

function HomeECFInfoSection() {
  const { t } = useTranslation("home");

  const highlights = t("achievements.highlights", {
    returnObjects: true,
  }) as string[];

  const roles = t("buildWithUs.roles", { returnObjects: true }) as string[];

  return (
    <section className="w-full bg-white py-12 md:py-24">
      <div className="w-full max-w-[1300px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Thematic Areas Section */}
        <div className="mb-16 md:mb-24">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-section-header text-[#024D6B] mb-4">
              {t("thematic.heading")}
            </h2>
            <p className="text-normal-base text-[#535353] max-w-[800px] mx-auto">
              {t("thematic.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {thematicKeys.map((key) => (
              <div
                key={key}
                className="bg-[#F5F5F5] rounded-2xl p-6 md:p-8 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-bold-lg text-[#024D6B]">
                  {t(`thematic.${key}.title`)}
                </h3>
                <p className="text-normal-base text-[#535353]">
                  {t(`thematic.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-[#024D6B] rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-section-header text-white mb-4">
              {t("achievements.heading")}
            </h2>
            <p className="text-normal-base text-white/80 max-w-[800px] mx-auto">
              {t("achievements.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {achievementStats.map(({ number, key }) => (
              <div
                key={key}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center text-center gap-2 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-bold-2xl text-[#E0C759]">{number}</div>
                <div className="text-bold-lg text-white">
                  {t(`achievements.items.${key}.label`)}
                </div>
                <div className="text-normal-sm text-white/70">
                  {t(`achievements.items.${key}.description`)}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Achievements List */}
          <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            {highlights.map((text, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-start gap-3"
              >
                <div className="text-[#E0C759] text-xl">✓</div>
                <p className="text-normal-base text-white/90">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 md:mt-24">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-section-header text-[#024D6B] mb-4">
              {t("buildWithUs.heading")}
            </h2>
          </div>

          <div className="bg-[#024D6B] rounded-3xl p-8 md:p-12">
            <div className="mb-8">
              <p className="text-normal-base text-white/80 text-center mb-6 md:mb-8">
                {t("buildWithUs.ifYouAre")}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                {roles.map((role, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-start gap-3 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="text-[#E0C759] text-xl font-bold">•</div>
                    <p className="text-normal-base text-white/90">{role}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-normal-base md:text-normal-lg text-white font-medium max-w-[900px] mx-auto">
                {t("buildWithUs.cta")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeECFInfoSection;
