import { useEffect } from "react";
import Lenis from "lenis";
import { NextPage } from "next";
import CustomHead from "@/components/layout/CustomHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewsletterSection from "@/components/sections/NewsletterSection";
import CdrHeroSection from "@/components/sections/programs/cdr/CdrHeroSection";
import CdrCirclesSection from "@/components/sections/programs/cdr/CdrCirclesSection";
import CdrProgramsSection from "@/components/sections/programs/cdr/CdrProgramsSection";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props {
  metaDataTag: any;
  jsonLd: any;
}

export async function getServerSideProps(context: any) {
  const { locale } = context;
  const metaDataTag = {
    title: "Carbon Dioxide Removal (CDR) | Emerging Climate Frontiers",
    authors: [{ name: "Emerging Climate Frontiers (ECF)" }],
    description:
      "ECF strengthens African research capacity and governance frameworks in Carbon Dioxide Removal, ensuring Africa leads CDR efforts with local expertise and context-specific solutions.",
    keywords:
      "Carbon Dioxide Removal, CDR, ECF, Emerging Climate Frontiers, African Climate Governance, CDR Africa, Climate Intervention, Carbon Accounting, ACIFER, CDR Short Course",
    openGraph: {
      title: "Carbon Dioxide Removal (CDR) | Emerging Climate Frontiers",
      description:
        "ECF builds African capacity in Carbon Dioxide Removal through training, research fellowships, and carbon accounting programs.",
      type: "website",
      url: "https://www.emergingclimatefrontiers.org/programs/cdr",
      publishedTime: "2025-01-23",
      modifiedTime: "2025-01-23",
      authors: ["Emerging Climate Frontiers (ECF)"],
      tags: "CDR, Carbon Dioxide Removal, Climate Governance, Africa, ECF",
      images: [
        {
          url: "https://www.emergingclimatefrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "Carbon Dioxide Removal — Emerging Climate Frontiers",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ecfrontiers",
      creator: "@ecfrontiers",
      title: "Carbon Dioxide Removal (CDR) | Emerging Climate Frontiers",
      description:
        "ECF strengthens African capacity in Carbon Dioxide Removal through research, training, and governance frameworks.",
      images: [
        {
          url: "https://www.emergingclimatefrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "Emerging Climate Frontiers CDR",
        },
      ],
    },
    alternates: {
      canonical: "https://www.emergingclimatefrontiers.org/programs/cdr",
    },
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Carbon Dioxide Removal (CDR) | Emerging Climate Frontiers",
      url: "https://www.emergingclimatefrontiers.org/programs/cdr",
      description:
        "ECF's Carbon Dioxide Removal programs build African research capacity and governance literacy to ensure Africa leads CDR efforts on its own terms.",
      publisher: {
        "@type": "Organization",
        name: "Emerging Climate Frontiers",
      },
    },
  ];

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "programs",
      ])),
      metaDataTag,
      jsonLd,
    },
  };
}

const CdrPage: NextPage<Props> = ({ metaDataTag, jsonLd }) => {
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
      <CdrHeroSection />
      <CdrCirclesSection />
      <CdrProgramsSection />
      <NewsletterSection />
      <Footer />
    </>
  );
};

export default CdrPage;
