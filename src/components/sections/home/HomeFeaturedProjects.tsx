import Image from "next/image";
import { ComponentPropsWithoutRef, ReactNode } from "react";

// Dummy project data
const featuredProjects = [
  {
    id: 1,
    title: "Climate Data Infrastructure",
    description:
      "Building AI-powered climate monitoring systems across East Africa",
    image: "/assets/images/test-image.png",
    link: "/projects/1",
    size: "small",
    gridClass: "col-span-1 md:col-span-1 bento-card-1",
  },
  {
    id: 2,
    title: "Coastal Blue Carbon Initiative",
    description:
      "Restoring mangrove ecosystems for carbon sequestration in West Africa",
    image: "/assets/images/test-image.png",
    link: "/projects/2",
    size: "small",
    gridClass: "col-span-1 md:col-span-1 bento-card-2",
  },
  {
    id: 3,
    title: "Projects in Action",
    description:
      "See how ECF's work is transforming climate technology capacity across Africa",
    image: "/assets/images/test-image.png",
    link: "/projects",
    size: "large",
    gridClass: "col-span-1 md:col-span-2 bento-card-3",
  },
  {
    id: 4,
    title: "SRM Research Network",
    description:
      "Leading ethical research on solar radiation management impacts",
    image: "/assets/images/test-image.png",
    link: "/projects/4",
    size: "medium",
    gridClass: "col-span-1 md:col-span-2 bento-card-4",
  },
  {
    id: 5,
    title: "Biochar Production Scaling",
    description: "Scaling sustainable biochar solutions for carbon removal",
    image: "/assets/images/test-image.png",
    link: "/projects/5",
    size: "medium",
    gridClass: "col-span-1 md:col-span-1 bento-card-5",
  },
];

function HomeFeaturedProjects() {
  return (
    <section className="w-full flex flex-col py-12 md:py-24 bg-[#034D6B]">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-bold-2xl  text-[#E0C759] mb-4">
            Featured Projects
          </h2>
          <p className="text-normal-lg text-white/90 max-w-[500px]">
            See how ECF's work is transforming climate technology capacity
            across Africa
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
        "grid w-full auto-rows-[300pxq] md:auto-rows-[150px] grid-cols-1 md:grid-cols-3 gap-4"
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
}: {
  id: string;
  name: string;
  description: string;
  backgroundImage: string;
  gridClass?: string;
}) => (
  <a
    href="#"
    className={`group relative overflow-hidden rounded-xl bg-gray-900 cursor-pointer transition-all duration-300 hover:shadow-lg ${gridClass || ""}`}
  >
    {/* Background Image */}
    <div className="absolute inset-0 z-0">
      <Image
        src={backgroundImage}
        alt={backgroundImage}
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
  </a>
);

export default HomeFeaturedProjects;
