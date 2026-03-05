import Link from "next/link";
import { ReportSchema } from "@/backend/models/reports";

function ReportViewerPage({ report }: { report: ReportSchema }) {
  return (
    <div className="pt-0 pb-[60px] bg-[#034D6B] min-h-screen flex flex-col">
      {/* Header bar */}
      <div className="w-full bg-[#023d57] px-4 md:px-8 lg:px-16 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-[#E0C759]/60 text-xs primarybold tracking-[4px] uppercase">Report</p>
          <h1 className="text-white primarybold text-bold-xl leading-snug max-w-2xl">{report.title}</h1>
          <p className="text-white/50 text-sm">{report.publishedDate}</p>
        </div>
        <Link
          href={report.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-6 py-3 rounded-full bg-[#E0C759] text-[#034D6B] primarybold text-sm hover:bg-[#c9b24e] transition-colors duration-200"
        >
          Download PDF
        </Link>
      </div>

      {/* PDF iframe */}
      <div className="flex-1 w-full px-4 md:px-8 lg:px-16 py-8">
        <div className="w-full h-[80vh] rounded-2xl overflow-hidden bg-white/5">
          <iframe
            src={report.pdfUrl}
            title={report.title}
            className="w-full h-full border-0"
          />
          {/* Fallback message */}
          <noscript>
            <div className="flex items-center justify-center h-full">
              <p className="text-white/60 text-center">
                Unable to display PDF.{" "}
                <Link href={report.pdfUrl} target="_blank" className="text-[#E0C759] underline">
                  Open PDF directly
                </Link>
              </p>
            </div>
          </noscript>
        </div>
      </div>
    </div>
  );
}

export default ReportViewerPage;
