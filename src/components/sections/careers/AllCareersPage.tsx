import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { CareerSchema } from "@/backend/models/careers";

function AllCareersPage({ careers }: { careers: CareerSchema[] }) {
  const { t } = useTranslation("careers");

  return (
    <section className="w-full bg-[#034D6B] pb-[100px] flex flex-col">
      {/* Hero */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 py-[180px]">
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-[#E0C759]/60 text-xs primarybold tracking-[6px] uppercase">
            {t("hero.label")}
          </p>
          <h1 className="text-bold-2xl md:text-bold-3xl text-[#E0C759]">
            {t("hero.heading")}
          </h1>
          <p className="text-normal-base text-white/70 max-w-lg">
            {t("hero.description")}
          </p>
        </div>
      </div>

      {/* Career cards */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col gap-10 max-w-[800px] mx-auto">
          {careers.length > 0 ? (
            careers.map((career) => (
              <CareerCard key={career.id} career={career} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-white/70 text-lg">
                No open positions at the moment. Check back later!
              </p>
            </div>
          )}
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
