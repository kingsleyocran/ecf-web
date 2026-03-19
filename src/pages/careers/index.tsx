import { useEffect } from "react";
import Lenis from "lenis";
import { NextPage } from "next";
import CustomHead from "@/components/layout/CustomHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AllCareersPage from "@/components/sections/careers/AllCareersPage";
import { filterCareersApi } from "@/backend/firebase/db/api/careers_api";
import { CareerSchema, ListResponseCareersSchema } from "@/backend/models/careers";
import { ResponseIndicator } from "@/backend/models/_shared";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props {
  careers: CareerSchema[];
  metaDataTag: any;
  jsonLd: any;
}

export async function getServerSideProps(context: any) {
  const { locale } = context;
  let careers: CareerSchema[] = [];

  try {
    const [data, status] = await filterCareersApi({
      orderBy: "createdAt",
      orderDirection: "desc",
    });
    if (status === ResponseIndicator.SUCCESS) {
      const result = data as ListResponseCareersSchema;
      careers = result.data.map((c) => ({
        ...c,
        createdAt: c.createdAt instanceof Date ? c.createdAt.toISOString() : c.createdAt,
        updatedAt: c.updatedAt instanceof Date ? c.updatedAt.toISOString() : c.updatedAt,
      })) as any;
    }
  } catch (_) {}

  const metaDataTag = {
    title: "Careers | Emerging Climate Frontiers",
    authors: [{ name: "Emerging Climate Frontiers (ECF)" }],
    description:
      "Join Emerging Climate Frontiers and help shape Africa's role in frontier climate technologies — SRM, CDR, and AI. View open positions and fellowships.",
    keywords:
      "ECF careers, climate jobs Africa, SRM fellowship, CDR research jobs, climate technology careers, Emerging Climate Frontiers jobs",
    openGraph: {
      title: "Careers | Emerging Climate Frontiers",
      description:
        "Join ECF and help build Africa's capacity in frontier climate technologies. View open positions.",
      type: "website",
      url: "https://www.emergingclimatefrontiers.org/careers",
      publishedTime: "2025-01-23",
      modifiedTime: "2025-01-23",
      authors: ["Emerging Climate Frontiers (ECF)"],
      tags: "ECF, Careers, Climate Jobs, Frontier Climate Technologies, Africa",
      images: [
        {
          url: "https://www.emergingclimatefrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "Careers — Emerging Climate Frontiers",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ecfrontiers",
      creator: "@ecfrontiers",
      title: "Careers | Emerging Climate Frontiers",
      description:
        "Join ECF and help shape Africa's role in frontier climate technologies.",
      images: [
        {
          url: "https://www.emergingclimatefrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "ECF Careers",
        },
      ],
    },
    alternates: {
      canonical: "https://www.emergingclimatefrontiers.org/careers",
    },
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Careers | Emerging Climate Frontiers",
      url: "https://www.emergingclimatefrontiers.org/careers",
      description:
        "Open positions and fellowships at Emerging Climate Frontiers.",
      publisher: {
        "@type": "Organization",
        name: "Emerging Climate Frontiers",
      },
    },
  ];

  return { props: { ...(await serverSideTranslations(locale ?? "en", ["common", "careers"])), careers, metaDataTag, jsonLd } };
}

const CareersPage: NextPage<Props> = ({ careers, metaDataTag, jsonLd }) => {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  });

  return (
    <>
      <CustomHead jsonLd={jsonLd} metaDataTag={metaDataTag} />
      <Header />
      <AllCareersPage careers={careers} />
      <Footer />
    </>
  );
};

export default CareersPage;
