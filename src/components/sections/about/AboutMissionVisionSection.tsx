import Image from "next/image";
import OpacityInView from "@/components/animation/OpacityInViewAnimation";
import ScaleInView from "@/components/animation/ScaleInViewAnimation";

function AboutMissionVisionSection() {
  return (
    <section id="mission-vision" className="w-full bg-white py-16 md:py-24">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 flex flex-col gap-20 md:gap-32">
        {/* Our Mission — text left, image right */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1">
            <OpacityInView triggerOnce={true} animationDelay={0} extraClassNames="text-bold-2xl text-[#E0C759] mb-6">
              Our Mission
            </OpacityInView>
            <OpacityInView triggerOnce={true} animationDelay={0.15} extraClassNames="text-normal-base text-black/80 max-w-[480px]">
              ECF is dedicated to empowering African institutions and
              policymakers to drive FCTs through inclusive, science-driven, and
              contextually relevant approaches. We foster capacity,
              collaboration, and movement building to ensure African institutions
              and communities lead FCTs efforts, shaping equitable global climate
              governance with dignity and agency.
            </OpacityInView>
          </div>
          <ScaleInView div outerClassName="flex-1 flex justify-end" extraClassNames="w-full max-w-[520px]" triggerOnce={true} animationDelay={0.1}>
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/assets/images/test-image.png"
                alt="ECF team at conference"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </ScaleInView>
        </div>

        {/* Our North Star — image left, text right */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
          <ScaleInView div outerClassName="flex-1" extraClassNames="w-full max-w-[520px]" triggerOnce={true} animationDelay={0.1}>
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/assets/images/test-image.png"
                alt="ECF team members"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </ScaleInView>
          <div className="flex-1">
            <OpacityInView triggerOnce={true} animationDelay={0} extraClassNames="text-bold-2xl text-[#E0C759] mb-6">
              Our North Star
            </OpacityInView>
            <OpacityInView triggerOnce={true} animationDelay={0.15} extraClassNames="text-normal-base text-black/80 max-w-[480px]">
              ECF envisions an Africa where early-career researchers, students,
              policymakers, and mandated institutions have a strengthened
              capacity to lead locally relevant FCTs, including AI for climate
              adaptation, contributing to inclusive global governance and local
              resilience.
            </OpacityInView>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMissionVisionSection;
