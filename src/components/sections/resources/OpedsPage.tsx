import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { OpEdSchema } from "@/backend/models/opeds";

function OpedsPage({ opeds }: { opeds: OpEdSchema[] }) {
  const { t } = useTranslation("resources");

  return (
    <section className="w-full bg-[#034D6B] pb-[100px] flex flex-col">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 py-[180px]">
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-[#E0C759]/60 text-xs primarybold tracking-[6px] uppercase">{t("opeds.label")}</p>
          <h1 className="text-bold-2xl md:text-bold-3xl text-[#E0C759]">{t("opeds.heading")}</h1>
          <p className="text-normal-base text-white/70 max-w-lg">
            {t("opeds.description")}
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        {opeds.length === 0 ? (
          <div className="flex justify-center py-20">
            <p className="text-white/40 text-normal-base">No op-eds available yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-10 max-w-[800px] mx-auto">
            {opeds.map((oped) => (
              <OpEdCard key={oped.id} oped={oped} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function OpEdCard({ oped }: { oped: OpEdSchema }) {
  const { t } = useTranslation("resources");
  return (
    <Link
      href={`/resources/opeds/${oped.id}`}
      className="group flex flex-col md:flex-row gap-6 items-center bg-transparent hover:bg-white/10 transition-colors duration-200 p-4 rounded-lg"
    >
      <div className="relative shrink-0 w-full md:w-[180px] aspect-square rounded-xl overflow-hidden bg-[#C7B14E]">
        {oped.imgUrl && (
          <Image src={oped.imgUrl} alt={oped.name} fill style={{ objectFit: "cover" }}
            className="group-hover:scale-105 transition-transform duration-300" />
        )}
      </div>
      <div className="flex flex-col gap-3 pt-1">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="px-3 py-1 rounded-full bg-[#E0C759]/10 text-[#E0C759] text-xs primarybold">{t("opeds.badge")}</span>
          {oped.author && <span className="text-white/50 text-xs">{oped.author}</span>}
        </div>
        <h3 className="text-bold-xl text-[#E0C759] group-hover:text-[#E0C759]/80 transition-colors duration-200">
          {oped.name}
        </h3>
        <p className="text-normal-base text-white/70 line-clamp-3">{oped.description}</p>
      </div>
    </Link>
  );
}

export default OpedsPage;
