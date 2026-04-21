import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../../next-i18next.config";
import CustomHead from "@/components/layout/CustomHead";
import { useEffect } from "react";
import Lenis from "lenis";
import { NextPage } from "next";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import HomeHeroSectrion from "@/components/sections/home/HomeHeroSectrion";
import NewsletterSection from "@/components/sections/NewsletterSection";
import ResourcesSection from "@/components/sections/resources/ResourcesSection";
import PartnersSection from "@/components/sections/PartnersSection";
import FeaturedProjects from "@/components/sections/home/HomeFeaturedProjects";
import HomeThematicAreasSection from "@/components/sections/home/HomeThematicAreasSection";
import HomeAchievementsSection from "@/components/sections/home/HomeAchievementsSection";
import TechHeroSection from "@/components/sections/programs/TechHeroSection";
import TechDetailsSection from "@/components/sections/programs/TechDetailsSection";

interface Props {
  metaDataTag: any;
  jsonLd: any;
}

export async function getServerSideProps(context: any) {
  const { locale } = context;
  const metaDataTagRes = {
    title:
      "Programs | Frontier Climate Technologies for Africa | Emerging Climate Frontiers",
    authors: [{ name: "Emerging Climate Frontiers (ECF)" }],
    description:
      "Explore ECF's programs in AI for Climate, Carbon Dioxide Removal, and Solar Radiation Management — building African expertise, research capacity, and governance in Frontier Climate Technologies.",
    keywords:
      "ECF programs, AI for climate Africa, Carbon Dioxide Removal Africa, Solar Radiation Management Africa, ACIFER Fellowship, SRM short course, CDR training, African climate programs, frontier climate technologies programs",
    openGraph: {
      title:
        "Programs | Frontier Climate Technologies for Africa | Emerging Climate Frontiers",
      description:
        "ECF's programs in AI, CDR, and SRM build the next generation of African climate leaders, researchers, and governance advocates.",
      type: "website",
      url: "https://ecfrontiers.org/programs",
      publishedTime: "2025-01-23",
      modifiedTime: "2025-01-23",
      authors: ["Emerging Climate Frontiers (ECF)"],
      tags: "ECF Programs, AI Climate, CDR Africa, SRM Africa, ACIFER, Frontier Climate Technologies, African Climate Research",
      images: [
        {
          url: "https://ecfrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "Emerging Climate Frontiers Programs — AI, CDR, and SRM for Africa",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ECF_Climate",
      creator: "@ECF_Climate",
      title:
        "Programs | Frontier Climate Technologies for Africa | Emerging Climate Frontiers",
      description:
        "ECF's programs in AI, CDR, and SRM are building the next generation of African climate leaders and governance experts.",
      images: [
        {
          url: "https://ecfrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "ECF Programs — Frontier Climate Technologies for Africa",
        },
      ],
    },
    alternates: {
      canonical: "https://ecfrontiers.org/programs",
    },
  };

  const jsonLdRes = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Programs | Frontier Climate Technologies for Africa | Emerging Climate Frontiers",
      url: "https://ecfrontiers.org/programs",
      description:
        "ECF's programs equip African researchers, policymakers, and civil society to lead on AI for Climate, Carbon Dioxide Removal, and Solar Radiation Management.",
      publisher: {
        "@type": "Organization",
        name: "Emerging Climate Frontiers",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "ECF Frontier Climate Technology Programs",
      url: "https://ecfrontiers.org/programs",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Artificial Intelligence for Climate Adaptation",
          url: "https://ecfrontiers.org/programs/ai",
          description:
            "Building African AI literacy, research capacity, and governance frameworks for AI-driven climate adaptation.",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Carbon Dioxide Removal (CDR)",
          url: "https://ecfrontiers.org/programs/cdr",
          description:
            "Strengthening African-led research, carbon accounting training, and governance in Carbon Dioxide Removal.",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Solar Radiation Management (SRM)",
          url: "https://ecfrontiers.org/programs/srm",
          description:
            "Building African research capacity and governance literacy to ensure Africa shapes SRM on its own terms.",
        },
      ],
    },
  ];
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "programs",
        "resources",
      ], nextI18NextConfig)),
      metaDataTag: metaDataTagRes,
      jsonLd: jsonLdRes,
    },
  };
}

const Page: NextPage<Props> = ({ metaDataTag, jsonLd }) => {
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

      <TechHeroSection />

      <TechDetailsSection />

      <NewsletterSection />

      <Footer />
    </>
  );
};

export default Page;
