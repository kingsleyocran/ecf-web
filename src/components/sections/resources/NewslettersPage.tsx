import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { NewsletterSchema } from "@/backend/models/newsletters";

function NewslettersPage({ newsletters }: { newsletters: NewsletterSchema[] }) {
  const { t } = useTranslation("resources");

  return (
    <section className="w-full bg-white pb-[100px] flex flex-col">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 py-[180px]">
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-[#034D6B]/60 text-xs primarybold tracking-[6px] uppercase">{t("newsletters.label")}</p>
          <h1 className="text-bold-2xl md:text-bold-3xl text-[#034D6B]">{t("newsletters.heading")}</h1>
          <p className="text-normal-base text-gray-500 max-w-lg">
            {t("newsletters.description")}
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        {newsletters.length === 0 ? (
          <div className="flex justify-center py-20">
            <p className="text-gray-400 text-normal-base">No newsletters available yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-10 max-w-[800px] mx-auto">
            {newsletters.map((nl) => (
              <NewsletterCard key={nl.id} newsletter={nl} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function NewsletterCard({ newsletter }: { newsletter: NewsletterSchema }) {
  const { t } = useTranslation("resources");
  return (
    <Link
      href={`/resources/newsletters/${newsletter.id}`}
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
          <span className="px-3 py-1 rounded-full bg-[#E0C759]/20 text-[#E0C759] text-xs primarybold">{t("newsletters.badge")}</span>
        </div>
        <h3 className="text-bold-xl text-[#E0C759] group-hover:text-[#E0C759]/80 transition-colors duration-200">
          {newsletter.title}
        </h3>
        <p className="text-normal-base text-white/70 line-clamp-3">{newsletter.description}</p>
        <p className="text-[#E0C759] text-xs primarybold tracking-wide">{t("newsletters.readNewsletter")}</p>
      </div>
    </Link>
  );
}

export default NewslettersPage;
