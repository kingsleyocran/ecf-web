import Image from "next/image";
import PrimaryButton from "../../button/PrimaryButton";
import ParallaxMarquee from "../../animation/ParallaxMarquee";
import Link from "next/link";

function HomeAboutSection() {
  const keywords = [
    "AFRICA",
    "OCEAN-CLIMATE SOLUTIONS",
    "EQUITY",
    "JUSTICE",
    "CAPACITY",
    "INNOVATION",
  ];

  return (
    <section className="relative w-full flex flex-col overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/test-image.png"
          alt="About background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#025C7F]/95 via-[#025C7F]/80 to-[#025C7F]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] md:min-h-[700px] px-4 md:px-8 lg:px-16 py-20 md:py-32">
        <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center gap-8">
          <h2 className="text-bold-2xl text-white">
            From the Sidelines
            <br />
            to the Forefront
          </h2>

          <p className="text-normal-base text-white/90 max-w-[600px] leading-relaxed">
            ECF is dedicated to empowering African institutions and policymakers
            to drive FCTs through inclusive, science-driven, and contextually
            relevant approaches. We foster capacity, collaboration, and movement
            building to ensure African institutions and communities lead FCTs
            efforts, shaping equitable global climate governance with dignity
            and agency.
          </p>

          <Link href="/about" passHref>
            <PrimaryButton title="About Us" variant="yellow-light" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeAboutSection;
