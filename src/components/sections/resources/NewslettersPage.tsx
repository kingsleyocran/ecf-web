import Image from "next/image";
import Link from "next/link";
import { NewsletterSchema } from "@/backend/models/newsletters";

const dummyNewsletters: NewsletterSchema[] = [
  {
    id: "1",
    title: "ECF Dispatch — March 2025",
    description:
      "This month: ACIFER Cohort 2 opens applications, recap of the Nairobi SRM Briefing, and a round-up of the latest SRM governance developments from COP30 preparatory meetings.",
    url: "https://mailchi.mp",
    publishedDate: "March 2025",
    imgUrl: "/assets/images/test-image.png",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "ECF Dispatch — February 2025",
    description:
      "In this issue: reflections from the Accra SRM Forum, new CDR research brief, and our growing partnership network across East and West Africa.",
    url: "https://mailchi.mp",
    publishedDate: "February 2025",
    imgUrl: "/assets/images/test-image.png",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "ECF Dispatch — January 2025",
    description:
      "Year in review: ECF's 2024 highlights — from 900+ students trained to 3 regional briefings delivered — and a look ahead at our 2025 programme calendar.",
    url: "https://mailchi.mp",
    publishedDate: "January 2025",
    imgUrl: "/assets/images/test-image.png",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function NewslettersPage({ newsletters }: { newsletters: NewsletterSchema[] }) {
  const display = newsletters.length > 0 ? newsletters : dummyNewsletters;

  return (
    <section className="w-full bg-white pb-[100px] flex flex-col">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 py-[180px]">
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-[#034D6B]/60 text-xs primarybold tracking-[6px] uppercase">Newsletters</p>
          <h1 className="text-bold-2xl md:text-bold-3xl text-[#034D6B]">Stay in the Loop</h1>
          <p className="text-normal-base text-gray-500 max-w-lg">
            Monthly dispatches with programme updates, research highlights, and frontier climate news.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col gap-10 max-w-[800px] mx-auto">
          {display.map((nl) => (
            <NewsletterCard key={nl.id} newsletter={nl} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterCard({ newsletter }: { newsletter: NewsletterSchema }) {
  return (
    <Link
      href={newsletter.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col md:flex-row gap-6 items-center bg-[#034D6B] hover:bg-[#034D6B]/80 transition-colors duration-200 p-6 rounded-2xl"
    >
      <div className="relative shrink-0 w-full md:w-[180px] aspect-square rounded-xl overflow-hidden bg-[#023d56]">
        {newsletter.imgUrl && (
          <Image src={newsletter.imgUrl} alt={newsletter.title} fill style={{ objectFit: "cover" }}
            className="group-hover:scale-105 transition-transform duration-300" />
        )}
      </div>
      <div className="flex flex-col gap-3 pt-1">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="px-3 py-1 rounded-full bg-[#E0C759]/20 text-[#E0C759] text-xs primarybold">Newsletter</span>
          <span className="text-white/50 text-xs">· {newsletter.publishedDate}</span>
        </div>
        <h3 className="text-bold-xl text-[#E0C759] group-hover:text-[#E0C759]/80 transition-colors duration-200">
          {newsletter.title}
        </h3>
        <p className="text-normal-base text-white/70 line-clamp-3">{newsletter.description}</p>
        <p className="text-[#E0C759] text-xs primarybold tracking-wide">READ NEWSLETTER →</p>
      </div>
    </Link>
  );
}

export default NewslettersPage;
