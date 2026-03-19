import MaskText from "@/components/animation/OpacityMoveYInViewAnimation";
import { useTranslation } from "next-i18next";

function AboutHowWeWorkSection() {
  const { t } = useTranslation("about");

  const pillars = [
    {
      title: t("howWeWork.pillars.capacity.title"),
      description: t("howWeWork.pillars.capacity.description"),
    },
    {
      title: t("howWeWork.pillars.network.title"),
      description: t("howWeWork.pillars.network.description"),
    },
    {
      title: t("howWeWork.pillars.movement.title"),
      description: t("howWeWork.pillars.movement.description"),
    },
  ];

  return (
    <section id="how-we-work" className="w-full bg-[#C7B14E] py-16 md:py-24">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <MaskText positionFrom={24} animationDelay={0.5} extraClassNames="text-bold-2xl text-white mb-4">
          {t("howWeWork.heading")}
        </MaskText>
        <MaskText positionFrom={20} animationDelay={0.7} extraClassNames="text-normal-base text-white/80 max-w-[450px] mb-12">
          {t("howWeWork.description")}
        </MaskText>
      </div>

      {/* Cards */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <MaskText key={index} div positionFrom={32} animationDelay={0.1 * index} extraClassNames="rounded-2xl bg-white/10 p-8 md:p-10 h-full">
              <MaskText positionFrom={16} animationDelay={0.10 + 0.1 * index} extraClassNames="text-bold-lg text-white mb-4">
                {pillar.title}
              </MaskText>
              <MaskText positionFrom={14} animationDelay={0.20 + 0.1 * index} extraClassNames="text-normal-base text-white/80">
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
