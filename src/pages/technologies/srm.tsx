import { useEffect } from "react";
import Lenis from "lenis";
import { NextPage } from "next";
import CustomHead from "@/components/layout/CustomHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewsletterSection from "@/components/sections/NewsletterSection";
import SrmHeroSection from "@/components/sections/technologies/srm/SrmHeroSection";
import SrmTechCirclesSection from "@/components/sections/technologies/srm/SrmTechCirclesSection";
import SrmProgramsSection from "@/components/sections/technologies/srm/SrmProgramsSection";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props {
  metaDataTag: any;
  jsonLd: any;
}

export async function getServerSideProps(context: any) {
  const { locale } = context;
  const metaDataTag = {
    title: "Solar Radiation Management (SRM) | Emerging Climate Frontiers",
    authors: [{ name: "Emerging Climate Frontiers (ECF)" }],
    description:
      "ECF builds African research capacity, governance frameworks, and continental coalitions to ensure Africa engages with Solar Radiation Management on its own terms — with clarity, sovereignty, and purpose.",
    keywords:
      "Solar Radiation Management, SRM, ECF, Emerging Climate Frontiers, African Climate Governance, SRM Africa, Climate Intervention, Geoengineering Africa, ACIFER, SRM Short Course",
    openGraph: {
      title: "Solar Radiation Management (SRM) | Emerging Climate Frontiers",
      description:
        "ECF ensures African institutions are architects — not passive observers — of global Solar Radiation Management decisions.",
      type: "website",
      url: "https://www.emergingclimatefrontiers.org/technologies/srm",
      publishedTime: "2025-01-23",
      modifiedTime: "2025-01-23",
      authors: ["Emerging Climate Frontiers (ECF)"],
      tags: "SRM, Solar Radiation Management, Climate Governance, Africa, ECF",
      images: [
        {
          url: "https://www.emergingclimatefrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "Solar Radiation Management — Emerging Climate Frontiers",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ecfrontiers",
      creator: "@ecfrontiers",
      title: "Solar Radiation Management (SRM) | Emerging Climate Frontiers",
      description:
        "ECF builds the capacity for Africa to engage with Solar Radiation Management on its own terms.",
      images: [
        {
          url: "https://www.emergingclimatefrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "Emerging Climate Frontiers SRM",
        },
      ],
    },
    alternates: {
      canonical: "https://www.emergingclimatefrontiers.org/technologies/srm",
    },
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Solar Radiation Management (SRM) | Emerging Climate Frontiers",
      url: "https://www.emergingclimatefrontiers.org/technologies/srm",
      description:
        "ECF's Solar Radiation Management programs build African research capacity and governance literacy to ensure Africa shapes the future of SRM on its own terms.",
      publisher: {
        "@type": "Organization",
        name: "Emerging Climate Frontiers",
      },
    },
  ];

  return { props: { ...(await serverSideTranslations(locale ?? "en", ["common", "technologies"])), metaDataTag, jsonLd } };
}

const SrmPage: NextPage<Props> = ({ metaDataTag, jsonLd }) => {
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
      <SrmHeroSection />
      <SrmTechCirclesSection />
      <SrmProgramsSection />
      <NewsletterSection />
      <Footer />
    </>
  );
};

export default SrmPage;
