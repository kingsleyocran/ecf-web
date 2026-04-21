import { useTranslation } from "next-i18next";
import { ReportSchema } from "@/backend/models/reports";

function ReportViewerPage({ report }: { report: ReportSchema }) {
  const { t } = useTranslation("resources");
  return (
    <div className=" pb-[60px] bg-[#034D6B] min-h-screen flex flex-col">
      {/* Header bar */}
      <div className="w-full bg-[#023d57] pt-[100px] px-4 md:px-8 lg:px-16 pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-[#E0C759]/60 text-xs primarybold tracking-[4px] uppercase">{t("reportViewer.label")}</p>
          <h1 className="text-white primarybold text-bold-xl leading-snug max-w-2xl">{report.title}</h1>
          <p className="text-white/50 text-sm">{report.publishedDate}</p>
        </div>
      </div>

      {/* PDF iframe */}
      <div className="flex-1 w-full px-4 md:px-8 lg:px-16 py-8 bg-[#023d57]">
        <div className="w-full h-[95vh] rounded-2xl overflow-hidden bg-white/5">
          <iframe
            src={report.pdfUrl}
            title={report.title}
            className="w-full h-full border-0"
          />
          {/* Fallback message */}
          <noscript>
            <div className="flex items-center justify-center h-full">
              <p className="text-white/60 text-center">
                {t("reportViewer.pdfFallback")}
              </p>
            </div>
          </noscript>
        </div>
      </div>
    </div>
  );
}

export default ReportViewerPage;
