import Image from "next/image";
import Link from "next/link";
import { ReportSchema } from "@/backend/models/reports";

const dummyReports: ReportSchema[] = [
  {
    id: "1",
    title: "African Perspectives on Solar Radiation Management: A Governance Framework",
    description:
      "This report examines the governance landscape for SRM in Africa, drawing on stakeholder consultations across Ghana, Kenya, and South Africa to propose a continental engagement framework.",
    coverImgUrl: "/assets/images/test-image.png",
    pdfUrl: "/assets/images/test-image.png",
    publishedDate: "March 2025",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "ACIFER SRM Track: Programme Evaluation Report 2024",
    description:
      "A comprehensive evaluation of the ACIFER SRM Fellowship's first cohort, documenting outcomes, lessons learned, and recommendations for scaling Africa-led climate intervention research.",
    coverImgUrl: "/assets/images/test-image.png",
    pdfUrl: "/assets/images/test-image.png",
    publishedDate: "January 2025",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Carbon Dioxide Removal in Sub-Saharan Africa: Opportunities and Risks",
    description:
      "An assessment of CDR pathways — biochar, enhanced weathering, direct air capture — in Sub-Saharan African contexts, with analysis of feasibility, equity, and governance considerations.",
    coverImgUrl: "/assets/images/test-image.png",
    pdfUrl: "/assets/images/test-image.png",
    publishedDate: "October 2024",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function ReportsPage({ reports }: { reports: ReportSchema[] }) {
  const display = reports.length > 0 ? reports : dummyReports;

  return (
    <section className="w-full bg-white pb-[100px] flex flex-col">
      {/* Hero */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 py-[180px]">
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-[#034D6B]/60 text-xs primarybold tracking-[6px] uppercase">Reports</p>
          <h1 className="text-bold-2xl md:text-bold-3xl text-[#034D6B]">Our Publications</h1>
          <p className="text-normal-base text-gray-500 max-w-lg">
            Research reports, governance frameworks, and programme evaluations from ECF.
          </p>
        </div>
      </div>

      {/* Report cards — portrait grid */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1100px] mx-auto">
          {display.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReportCard({ report }: { report: ReportSchema }) {
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
        <p className="text-[#034D6B]/70 text-xs mt-1 primarybold tracking-wide">VIEW REPORT →</p>
      </div>
    </Link>
  );
}

export default ReportsPage;
