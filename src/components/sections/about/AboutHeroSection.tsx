import Image from "next/image";
import OpacityMoveYInViewAnimation from "@/components/animation/OpacityMoveYInViewAnimation";

const paragraphs = [
  "In 2022, our climate team at GAYO took a bold step: we named and challenged the glaring inequalities in the rapidly evolving field of climate technologies. We saw firsthand how African voices were being sidelined in critical global dialogues; not because of lack of will, but due to structural barriers and persistent knowledge gaps.",
  "In response, we set out to build something fundamentally different: safe, accessible spaces where African voices can lead climate discussions, allowing local stakeholders to shape their own positions on Frontier Climate Technologies.",
  "Now, after three years of dedicated work, we are transitioning from GAYO to become Emerging Climate Frontiers (ECF)\u2014an independent organization ready to scale our impact, deepen our research, and meet the growing demand across the continent.",
];

function AboutHeroSection() {
  return (
    <section className="relative bg-[#034D6B] ">
      {/* Sticky background — stays pinned while text scrolls over it */}
      <div className="sticky top-[40px]  w-full h-[calc(100vh-40px)] overflow-hidden ">
        <div className="h-full w-full max-w-[1920px] 2xl:mx-auto px-4 md:p-8 lg:p-8 ">
          {/* Image container with padding and rounded corners */}
          <div className="relative w-full h-full rounded-2xl md:rounded-[20px] overflow-hidden">
            <Image
              src="/assets/images/test-image.png"
              alt="About hero background"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#034D6B]/95 via-[#034D6B]/50 to-[#034D6B]/30 " />

            {/* Left-side heading — inside the image container */}
            <div className="relative z-10 h-full flex flex-col justify-start px-4 md:px-8 lg:px-16 pt-16 md:pt-24">
              <p className="text-white/80 text-sm md:text-base font-medium tracking-widest uppercase mb-4">
                About Us
              </p>
              <h1 className="text-bold-2xl md:text-bold-3xl text-[#E0C759]">
                Shaping Africa&apos;s <br /> Climate Future
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling text layer — paragraphs scroll over the sticky background */}
      <div className="relative z-10 -mt-[30vh]">
        <div className="flex flex-col items-end pb-[40vh] w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-20">
          {paragraphs.map((text, index) => (
            <div
              key={index}
              className="max-w-[520px] mb-[50px] last:mb-[20vh]"
            >
              <OpacityMoveYInViewAnimation
                positionFrom={40}
                duration={0.8}
                animationDelay={0.1}
                triggerOnce={false}
                extraClassNames="text-right"
              >
                <span className="text-white text-base md:text-lg leading-relaxed">
                  {text}
                </span>
              </OpacityMoveYInViewAnimation>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutHeroSection;
