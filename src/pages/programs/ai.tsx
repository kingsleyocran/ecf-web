import { useEffect } from "react";
import Lenis from "lenis";
import { NextPage } from "next";
import CustomHead from "@/components/layout/CustomHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewsletterSection from "@/components/sections/NewsletterSection";
import AiHeroSection from "@/components/sections/programs/ai/AiHeroSection";
import AiObjectivesSection from "@/components/sections/programs/ai/AiObjectivesSection";
import AiProgramObjectivesSection from "@/components/sections/programs/ai/AiProgramObjectivesSection";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props {
  metaDataTag: any;
  jsonLd: any;
}

export async function getServerSideProps(context: any) {
  const { locale } = context;
  const metaDataTag = {
    title:
      "Artificial Intelligence for Climate Adaptation | Emerging Climate Frontiers",
    authors: [{ name: "Emerging Climate Frontiers (ECF)" }],
    description:
      "ECF trains the next generation of African AI and climate experts, embedding AI into locally relevant research and advocating for governance structures that center African agency.",
    keywords:
      "Artificial Intelligence, AI Climate, ECF, Emerging Climate Frontiers, AI Africa, Climate Adaptation, AI Governance, Data Sovereignty, ACIFER, AI Climate 101",
    openGraph: {
      title:
        "Artificial Intelligence for Climate Adaptation | Emerging Climate Frontiers",
      description:
        "ECF closes the AI-climate gap by building African expertise, infrastructure, and governance frameworks for AI-driven climate adaptation.",
      type: "website",
      url: "https://www.emergingclimatefrontiers.org/programs/ai",
      publishedTime: "2025-01-23",
      modifiedTime: "2025-01-23",
      authors: ["Emerging Climate Frontiers (ECF)"],
      tags: "AI, Artificial Intelligence, Climate Adaptation, Africa, ECF, Data Sovereignty",
      images: [
        {
          url: "https://www.emergingclimatefrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "Artificial Intelligence for Climate Adaptation — Emerging Climate Frontiers",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ecfrontiers",
      creator: "@ecfrontiers",
      title:
        "AI for Climate Adaptation | Emerging Climate Frontiers",
      description:
        "ECF builds African AI capacity and governance for climate adaptation on the continent's own terms.",
      images: [
        {
          url: "https://www.emergingclimatefrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "Emerging Climate Frontiers AI",
        },
      ],
    },
    alternates: {
      canonical: "https://www.emergingclimatefrontiers.org/programs/ai",
    },
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Artificial Intelligence for Climate Adaptation | Emerging Climate Frontiers",
      url: "https://www.emergingclimatefrontiers.org/programs/ai",
      description:
        "ECF's AI programs build African expertise and governance frameworks for AI-driven climate adaptation, ensuring the continent leads with agency and sovereignty.",
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

const AiPage: NextPage<Props> = ({ metaDataTag, jsonLd }) => {
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
      <AiHeroSection />
      <AiObjectivesSection />
      <AiProgramObjectivesSection />
      <NewsletterSection />
      <Footer />
    </>
  );
};

export default AiPage;
