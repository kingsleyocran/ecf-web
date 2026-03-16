import { useEffect } from "react";
import Lenis from "lenis";
import { NextPage } from "next";
import CustomHead from "@/components/layout/CustomHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReportViewerPage from "@/components/sections/resources/ReportViewerPage";
import { getReportApi } from "@/backend/firebase/db/api/reports_api";
import { ReportSchema, ResponseReportSchema } from "@/backend/models/reports";
import { ResponseIndicator } from "@/backend/models/_shared";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props { report: ReportSchema; metaDataTag: any; jsonLd: any; }

export async function getServerSideProps(context: any) {
  const { reportID } = context.query;
  const { locale } = context;
  let reportData: ReportSchema | null = null;
  try {
    const [data, status] = await getReportApi(reportID);
    if (status === ResponseIndicator.SUCCESS) {
      const r = (data as ResponseReportSchema).data;
      reportData = {
        ...r,
        createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : r.createdAt,
        updatedAt: r.updatedAt instanceof Date ? r.updatedAt.toISOString() : r.updatedAt,
      } as any;
    }
  } catch (_) {}
  if (!reportData) return { notFound: true };
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "resources"])),
      report: reportData,
      metaDataTag: {
        title: `${reportData.title} | ECF Reports`,
        description: reportData.description,
        keywords: `${reportData.title}, ECF reports, climate research Africa`,
        alternates: { canonical: `https://www.emergingclimatefrontiers.org/resources/reports/${reportData.id}` },
        openGraph: {
          type: "website",
          images: [{ url: reportData.coverImgUrl || "https://www.emergingclimatefrontiers.org/hero-image.png", width: 1200, height: 630, alt: reportData.title, type: "image/png" }],
        },
        twitter: {
          images: [{ url: reportData.coverImgUrl || "https://www.emergingclimatefrontiers.org/hero-image.png" }],
        },
      },
      jsonLd: [{ "@context": "https://schema.org", "@type": "WebPage", name: `${reportData.title} | ECF Reports`, url: `https://www.emergingclimatefrontiers.org/resources/reports/${reportData.id}`, publisher: { "@type": "Organization", name: "Emerging Climate Frontiers" } }],
    },
  };
}

const ReportDetailPage: NextPage<Props> = ({ report, metaDataTag, jsonLd }) => {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  });
  return (
    <>
      <CustomHead jsonLd={jsonLd} metaDataTag={metaDataTag} />
      <Header />
      <ReportViewerPage report={report} />
      <Footer />
    </>
  );
};

export default ReportDetailPage;
