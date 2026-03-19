import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { ReportSchema } from "@/backend/models/reports";

function ReportsPage({ reports }: { reports: ReportSchema[] }) {
  const { t } = useTranslation("resources");

  return (
    <section className="w-full bg-white pb-[100px] flex flex-col">
      {/* Hero */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 py-[180px]">
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-[#034D6B]/60 text-xs primarybold tracking-[6px] uppercase">{t("reports.label")}</p>
          <h1 className="text-bold-2xl md:text-bold-3xl text-[#034D6B]">{t("reports.heading")}</h1>
          <p className="text-normal-base text-gray-500 max-w-lg">
            {t("reports.description")}
          </p>
        </div>
      </div>

      {/* Report cards — portrait grid */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        {reports.length === 0 ? (
          <div className="flex justify-center py-20">
            <p className="text-gray-400 text-normal-base">No reports available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1100px] mx-auto">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ReportCard({ report }: { report: ReportSchema }) {
  const { t } = useTranslation("resources");
  return (
    <Link
      href={`/resources/reports/${report.id}`}
      className="group flex flex-col bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-2xl overflow-hidden border border-gray-100"
    >
      {/* Cover image — portrait 3:4 */}
      <div className="relative w-full aspect-[3/4] bg-[#C7B14E] overflow-hidden">
        {report.coverImgUrl && (
          <Image
            src={report.coverImgUrl}
            alt={report.title}
            fill
            style={{ objectFit: "cover" }}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <span className="px-2 py-1 rounded-full bg-[#E0C759]/20 text-[#E0C759] text-xs primarybold">
            {report.publishedDate}
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 p-5">
        <h3 className="text-[#034D6B] primarybold text-bold-base leading-snug group-hover:text-[#034D6B]/70 transition-colors duration-200 line-clamp-3">
          {report.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-3">{report.description}</p>
        <p className="text-[#034D6B]/70 text-xs mt-1 primarybold tracking-wide">{t("reports.viewReport")}</p>
      </div>
    </Link>
  );
}

export default ReportsPage;
