import { useEffect } from "react";
import Lenis from "lenis";
import { NextPage } from "next";
import CustomHead from "@/components/layout/CustomHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReportsPage from "@/components/sections/resources/ReportsPage";
import { getReportsApi } from "@/backend/firebase/db/api/reports_api";
import { ReportSchema, ListResponseReportsSchema } from "@/backend/models/reports";
import { ResponseIndicator } from "@/backend/models/_shared";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props { reports: ReportSchema[]; metaDataTag: any; jsonLd: any; }

export async function getServerSideProps(context: any) {
  const { locale } = context;
  let reports: ReportSchema[] = [];
  try {
    const [data, status] = await getReportsApi();
    if (status === ResponseIndicator.SUCCESS) {
      reports = (data as ListResponseReportsSchema).data.map((r) => ({
        ...r,
        createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : r.createdAt,
        updatedAt: r.updatedAt instanceof Date ? r.updatedAt.toISOString() : r.updatedAt,
      })) as any;
    }
  } catch (_) {}

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "resources"])),
      reports,
      metaDataTag: {
        title: "Reports | ECF",
        description: "Published reports from Emerging Climate Frontiers on SRM, CDR, and AI.",
        keywords: "ECF reports, SRM report, CDR report, climate AI Africa, geoengineering report",
        alternates: { canonical: "https://www.emergingclimatefrontiers.org/resources/reports" },
        openGraph: {
          type: "website",
          images: [{ url: "https://www.emergingclimatefrontiers.org/hero-image.png", width: 1200, height: 630, alt: "ECF Reports", type: "image/png" }],
        },
        twitter: {
          images: [{ url: "https://www.emergingclimatefrontiers.org/hero-image.png" }],
        },
      },
      jsonLd: [{ "@context": "https://schema.org", "@type": "WebPage", name: "Reports | ECF", url: "https://www.emergingclimatefrontiers.org/resources/reports", publisher: { "@type": "Organization", name: "Emerging Climate Frontiers" } }],
    },
  };
}

const ReportsIndexPage: NextPage<Props> = ({ reports, metaDataTag, jsonLd }) => {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  });
  return (
    <>
      <CustomHead jsonLd={jsonLd} metaDataTag={metaDataTag} />
      <Header />
      <ReportsPage reports={reports} />
      <Footer />
    </>
  );
};

export default ReportsIndexPage;
