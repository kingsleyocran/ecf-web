import Image from "next/image";
import Link from "next/link";
import { CareerSchema } from "@/backend/models/careers";

const dummyCareers: CareerSchema[] = [
  {
    id: "1",
    title: "Research Fellow — SRM",
    description:
      "Support ECF's Solar Radiation Modification research programme through literature reviews, data analysis, and policy briefs.",
    location: "Remote",
    type: "Fellowship",
    content: "",
    imgUrl: "/assets/images/test-image.png",
    applyUrl: null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Programme Coordinator",
    description:
      "Coordinate ECF's capacity-building programmes across Ghana, Kenya, and South Africa, managing logistics, communications, and stakeholder engagement.",
    location: "Accra, Ghana",
    type: "Full-time",
    content: "",
    imgUrl: "/assets/images/test-image.png",
    applyUrl: null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Communications & Digital Lead",
    description:
      "Lead ECF's external communications strategy including social media, newsletters, and multimedia content development.",
    location: "Remote",
    type: "Contract",
    content: "",
    imgUrl: "/assets/images/test-image.png",
    applyUrl: null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function AllCareersPage({ careers }: { careers: CareerSchema[] }) {
  const displayCareers = careers.length > 0 ? careers : dummyCareers;

  return (
    <section className="w-full bg-[#034D6B] pb-[100px] flex flex-col">
      {/* Hero */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 py-[180px]">
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-[#E0C759]/60 text-xs primarybold tracking-[6px] uppercase">
            Open Positions
          </p>
          <h1 className="text-bold-2xl md:text-bold-3xl text-[#E0C759]">
            Join the Mission
          </h1>
          <p className="text-normal-base text-white/70 max-w-lg">
            Help shape Africa&apos;s role in frontier climate technologies.
          </p>
        </div>
      </div>

      {/* Career cards */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col gap-10 max-w-[800px] mx-auto">
          {displayCareers.map((career) => (
            <CareerCard key={career.id} career={career} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CareerCard({ career }: { career: CareerSchema }) {
  return (
    <Link
      href={`/careers/${career.id}`}
      className="group flex flex-col md:flex-row gap-6 items-center bg-transparent hover:bg-white/10
      transition-colors duration-200 p-4 rounded-lg"
    >
      {/* Image */}
      <div className="relative shrink-0 w-full md:w-[180px] aspect-square rounded-xl overflow-hidden bg-[#C7B14E]">
        {career.imgUrl && (
          <Image
            src={career.imgUrl}
            alt={career.title}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-3 pt-1">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="px-3 py-1 rounded-full bg-[#E0C759]/20 text-[#E0C759] text-xs primarybold tracking-wide">
            {career.type}
          </span>
          <span className="text-white/50 text-xs">{career.location}</span>
        </div>
        <h3 className="text-bold-xl text-[#E0C759] group-hover:text-[#E0C759]/80 transition-colors duration-200">
          {career.title}
        </h3>
        <p className="text-normal-base text-white/70 line-clamp-3">
          {career.description}
        </p>
      </div>
    </Link>
  );
}

export default AllCareersPage;
