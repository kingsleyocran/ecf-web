import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { useTranslation } from "next-i18next";

const projectMeta = [
  { id: 1, tKey: "srmShortCourse", image: "/assets/images/programs/srm-short-courses.png", href: "/programs/srm#shortCourse", gridClass: "col-span-1 md:col-span-2 md:row-span-2" },
  { id: 2, tKey: "srmBriefingSeries", image: "/assets/images/programs/srm-briefing-series.png", href: "/programs/srm#briefingSeries", gridClass: "col-span-1 md:col-span-1 md:row-span-1" },
  { id: 3, tKey: "cdrCarbonAccounting", image: "/assets/images/programs/cdr-carbon-accounting.png", href: "/programs/cdr#carbonAccounting", gridClass: "col-span-1 md:col-span-1 md:row-span-1" },
];

function HomeFeaturedProjects() {
  const { t } = useTranslation("home");

  const featuredProjects = projectMeta.map((p) => ({
    ...p,
    title: t(`featuredProjects.items.${p.tKey}.title`),
    description: t(`featuredProjects.items.${p.tKey}.description`),
  }));

  return (
    <section className="w-full flex flex-col py-12 md:py-24 bg-[#034D6B] z-20 relative">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-bold-2xl  text-[#E0C759] mb-4">
            {t("featuredProjects.heading")}
          </h2>
          <p className="text-normal-lg text-white/90 max-w-[500px]">
            {t("featuredProjects.description")}
          </p>
        </div>

        {/* Bento Grid */}
        <BentoGrid>
          {featuredProjects.map((project) => (
            <BentoCard
              key={project.id}
              id={project.id.toString()}
              name={project.title}
              description={project.description}
              gridClass={project.gridClass}
              backgroundImage={project.image}
              href={project.href}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

const BentoGrid = ({
  children,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={
        "grid w-full auto-rows-[250px] md:auto-rows-[200px] grid-cols-1 md:grid-cols-3 gap-4"
      }
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  id,
  description,
  gridClass,
  backgroundImage,
  href,
}: {
  id: string;
  name: string;
  description: string;
  backgroundImage: string;
  gridClass?: string;
  href: string;
}) => (
  <Link
    href={href}
    className={`group relative overflow-hidden rounded-xl bg-gray-900 cursor-pointer transition-all duration-300 hover:shadow-lg ${gridClass || ""}`}
  >
    {/* Background Image */}
    <div className="absolute inset-0 z-0">
      <Image
        src={backgroundImage}
        alt={name}
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        className="transition-transform duration-500 group-hover:scale-110"
      />
    </div>

    {/* Overlay Gradient */}
    <div className="absolute inset-0 md:group-hover:opacity-100 md:opacity-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10  transition-opacity duration-300" />

    {/* Content */}
    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white md:group-hover:opacity-100 md:opacity-0 transition-opacity duration-300">
      <h3 className="text-lg md:text-xl font-bold mb-2 text-[#E0C759] transition-colors">
        {name}
      </h3>
      <p className="text-sm md:text-base text-white/80 line-clamp-2 group-hover:text-white/90 transition-colors">
        {description}
      </p>
    </div>
  </Link>
);

export default HomeFeaturedProjects;
