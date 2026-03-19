import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MaskText from "@/components/animation/OpacityMoveYInViewAnimation";
import { useTranslation } from "next-i18next";

const teamMembersMeta = [
  { key: "ernest", name: "Ernest Ofori", roleKey: "coExecutiveDirector", country: "gh", image: "/assets/images/team/ernest.png", linkedin: "https://www.linkedin.com/in/ernest-ofori-7568311b5" },
  { key: "vida", name: "Vida Agyebeng Ayim", roleKey: "coExecutiveDirector", country: "gh", image: "/assets/images/team/vida.png", linkedin: "https://www.linkedin.com/in/vidaayim" },
  { key: "elijah", name: "Elijah Bakari", roleKey: "programDirector", country: "ke", image: "/assets/images/team/elijah.png", linkedin: "https://www.linkedin.com/in/elijah-bakari-72a32b15b" },
  { key: "taylen", name: "Taylen Reddy", roleKey: "programOfficer", country: "za", image: "/assets/images/team/taylen.png", linkedin: "https://www.linkedin.com/in/taylen-reddy-266316246" },
  { key: "kwesi", name: "Kwesi Quagraine", roleKey: "researchScientificDirector", country: "gh", image: "/assets/images/team/kwesi.png", linkedin: "https://www.linkedin.com/in/kwesiquagraine/" },
  { key: "siisi", name: "Siisi Ansah", roleKey: "programAssistant", country: "gh", image: "/assets/images/team/siisi.png", linkedin: "https://www.linkedin.com/in/siisi-ansah-4244082b8" },
];

type TeamMember = {
  name: string;
  role: string;
  country: string;
  image: string;
  bio: string;
  linkedin: string;
};

function TeamCard({ member }: { member: TeamMember }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center text-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative w-full aspect-square rounded-2xl bg-gray-200 mb-4">
        <Image
          src={member.image}
          alt={member.name}
          fill
          style={{ objectFit: "cover", borderRadius: "16px" }}
        />

        {/* Flag badge */}
        <div
          style={{ opacity: isHovered && member.bio ? "0" : "100" }}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 "
        >
          <Image
            src={`/assets/images/flags/${member.country}.png`}
            alt="Country flag"
            width={28}
            height={20}
            className="rounded-sm"
            style={{ borderRadius: "5px" }}
          />
        </div>

        {/* Hover overlay — slides up from bottom */}
        <AnimatePresence>
          {isHovered && member.bio && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
              className="absolute inset-0 z-20 h-full bg-white flex flex-col justify-center items-center p-6"
            >
              <p className="text-bold-base text-black mb-1">{member.name}</p>
              <p className="text-xs font-semibold tracking-widest uppercase text-black/60 mb-3">
                {member.role}
              </p>
              <p className="text-sm text-black/70 leading-relaxed text-center">
                {member.bio}
              </p>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 hover:opacity-80"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip-linkedin)">
                      <path
                        d="M15.8333 0H4.16667C3.06177 0.000176699 2.00216 0.439129 1.22082 1.22035C0.439475 2.00157 0.000353497 3.0611 0 4.166V15.8327C0 16.9377 0.438874 17.9975 1.22011 18.7789C2.00135 19.5604 3.06099 19.9996 4.166 20H15.8327C16.3799 20.0001 16.9218 19.8924 17.4274 19.683C17.933 19.4737 18.3924 19.1668 18.7794 18.7798C19.1664 18.3929 19.4733 17.9336 19.6828 17.428C19.8922 16.9224 20 16.3806 20 15.8333V4.16667C20 3.0616 19.561 2.00179 18.7796 1.22039C17.9982 0.438987 16.9384 0 15.8333 0ZM6.66667 15.8333H4.16667V6.66667H6.66667V15.8333ZM5.41667 5.61C5.12625 5.61158 4.8419 5.52691 4.59966 5.36672C4.35742 5.20653 4.16819 4.97802 4.05595 4.71017C3.94372 4.44231 3.91353 4.14717 3.96921 3.86214C4.0249 3.57711 4.16395 3.31502 4.36874 3.10911C4.57354 2.90319 4.83486 2.7627 5.11958 2.70546C5.4043 2.64822 5.69961 2.67679 5.96807 2.78756C6.23654 2.89833 6.46607 3.08631 6.62759 3.32767C6.7891 3.56903 6.87533 3.85291 6.87533 4.14333C6.87534 4.53094 6.72191 4.90278 6.44859 5.17761C6.17526 5.45243 5.80426 5.60789 5.41667 5.61ZM16.6667 15.8333H14.1667V11.1633C14.1667 8.35667 10.8333 8.56933 10.8333 11.1633V15.8333H8.33333V6.66667H10.8333V8.13733C12 5.98267 16.6667 5.82333 16.6667 10.2V15.8333Z"
                        fill="#0077B5"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip-linkedin">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Name and role below card */}
      <div
        style={{ opacity: isHovered && member.bio ? "0" : "100" }}
        className="flex flex-col gap-1"
      >
        <p className="text-bold-base text-black mt-2">{member.name}</p>
        <p className="text-xs font-semibold tracking-widest uppercase text-black/60 mt-1">
          {member.role}
        </p>
      </div>
    </div>
  );
}

function AboutTeamSection() {
  const { t } = useTranslation("about");

  const teamMembers: TeamMember[] = teamMembersMeta.map((meta) => ({
    name: meta.name,
    role: t(`team.roles.${meta.roleKey}`),
    country: meta.country,
    image: meta.image,
    bio: t(`team.members.${meta.key}.bio`),
    linkedin: meta.linkedin,
  }));

  return (
    <section id="our-team" className="w-full bg-white py-16 md:py-24">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12">
          <MaskText positionFrom={24} triggerOnce={true} animationDelay={0} extraClassNames="text-bold-2xl text-black mb-4 text-center">
            {t("team.heading")}
          </MaskText>
          <MaskText
            positionFrom={20}
            triggerOnce={true}
            animationDelay={0.1}
            extraClassNames="text-normal-base text-black/70 max-w-lg mx-auto text-center"
          >
            {t("team.description")}
          </MaskText>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 max-w-[900px] mx-auto">
          {teamMembers.map((member, index) => (
            <MaskText key={member.name} div positionFrom={32} triggerOnce={true} animationDelay={0.07 * index} extraClassNames="">
              <TeamCard member={member} />
            </MaskText>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutTeamSection;
