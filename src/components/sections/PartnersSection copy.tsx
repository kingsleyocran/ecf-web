import Image from "next/image";
import ParallaxMarquee from "../animation/ParallaxMarquee";

// Generate array of partner logos
const partnerLogos = Array.from({ length: 17 }, (_, i) => ({
  id: i + 1,
  src: `/assets/images/partners/${i + 1}.png`,
  alt: `Partner ${i + 1}`,
}));

function PartnersSection() {

  return (
    <section className="w-full flex flex-col gap-8 my-6 md:my-20">
      {/* Content */}
      <div className="flex flex-row justify-between w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        {/* Section Title */}
        <div className="flex flex-row justify-center w-full">
          <h2 className="text-bold-2xl text-[#E0C759] text-center">
            Our Partners
          </h2>
        </div>
      </div>
    </section>
  );
}

export default PartnersSection;
