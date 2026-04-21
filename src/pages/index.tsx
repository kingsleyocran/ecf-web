import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../next-i18next.config";
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

interface Props {
  metaDataTag: any;
  jsonLd: any;
}

export async function getServerSideProps(context: any) {
  const { locale } = context;
  const metaDataTagRes = {
    title:
      "Emerging Climate Frontiers | Empowering African Leadership in Frontier Climate Technologies",
    authors: [
      {
        name: "Emerging Climate Frontiers (ECF)",
      },
    ],
    description:
      "ECF empowers African institutions and policymakers to drive Frontier Climate Technologies (FCTs) through inclusive, science-driven approaches. We build capacity, foster collaboration, and advance equitable governance for AI, CDR, and SRM in Africa.",
    keywords:
      "Emerging Climate Frontiers, ECF, Frontier Climate Technologies, Carbon Dioxide Removal, CDR, Solar Radiation Management, SRM, AI Climate Governance, African Climate Innovation, Climate Technology Africa, Climate Justice, African Research Capacity, Climate Policy Africa, GAYO",
    openGraph: {
      title:
        "Emerging Climate Frontiers | Empowering African Leadership in Frontier Climate Technologies",
      description:
        "ECF empowers African institutions and policymakers to drive Frontier Climate Technologies through inclusive, science-driven, and contextually relevant approaches.",
      type: "website",
      url: "https://ecfrontiers.org/",
      publishedTime: "2025-01-23",
      modifiedTime: "2025-01-23",
      authors: ["Emerging Climate Frontiers (ECF)"],
      tags: "Climate Technology, African Leadership, Frontier Climate Technologies, CDR, SRM, AI Governance, Climate Justice, African Research, Climate Policy, Decolonial Climate Science",
      images: [
        {
          url: "https://ecfrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "Emerging Climate Frontiers - Empowering African leadership in climate technologies",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ECF_Climate",
      creator: "@ECF_Climate",
      title:
        "Emerging Climate Frontiers | Empowering African Leadership in Frontier Climate Technologies",
      description:
        "Join ECF in building African capacity and leadership in Frontier Climate Technologies (FCTs) to shape equitable global climate governance.",
      images: [
        {
          url: "https://ecfrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "Emerging Climate Frontiers - Twitter preview image",
        },
      ],
    },
    alternates: {
      canonical: "https://ecfrontiers.org/",
    },
  };

  const jsonLdRes = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Emerging Climate Frontiers",
      alternateName: "ECF",
      url: "https://ecfrontiers.org/",
      logo: {
        "@type": "ImageObject",
        url: "https://ecfrontiers.org/logo.png",
      },
      description:
        "ECF empowers African institutions and policymakers to drive Frontier Climate Technologies (FCTs) through inclusive, science-driven, and contextually relevant approaches.",
      foundingDate: "2022",
      parentOrganization: {
        "@type": "Organization",
        name: "Green Africa Youth Organization",
        alternateName: "GAYO",
      },
      sameAs: [
        "https://twitter.com/ECF_Climate",
        "https://www.linkedin.com/company/emerging-climate-frontiers",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Emerging Climate Frontiers | ECF",
      url: "https://ecfrontiers.org/",
      description:
        "ECF empowers African institutions and policymakers to drive Frontier Climate Technologies through capacity building, collaboration, and equitable governance frameworks.",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://ecfrontiers.org/",
      },
      publisher: {
        "@type": "Organization",
        name: "Emerging Climate Frontiers",
      },
      datePublished: "2025-01-23",
      dateModified: "2025-01-23",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Emerging Climate Frontiers (ECF)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ECF is an organization dedicated to empowering African institutions and policymakers to drive Frontier Climate Technologies (FCTs) including AI, Carbon Dioxide Removal (CDR), and Solar Radiation Management (SRM) through inclusive, science-driven approaches.",
          },
        },
        {
          "@type": "Question",
          name: "What are Frontier Climate Technologies (FCTs)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "FCTs include Artificial Intelligence (AI) for climate action, Carbon Dioxide Removal (CDR), and Solar Radiation Management (SRM). These technologies hold transformative potential but require African leadership and context-specific applications.",
          },
        },
        {
          "@type": "Question",
          name: "What is the African Climate Intervention Fellowship for Early-Career Researchers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ACIEFR is ECF's flagship program that grows the ecosystem of researchers with both physical and social science backgrounds, increasing African-led research that informs local and regional decisions on FCT governance.",
          },
        },
        {
          "@type": "Question",
          name: "How does ECF work with African institutions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ECF partners with universities, government agencies, research institutions, and civil society organizations to build capacity, strengthen technical expertise, and foster collaborative networks for equitable FCT governance.",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: "African Climate Intervention Fellowship for Early-Career Researchers",
      alternateName: "ACIEFR",
      url: "https://ecfrontiers.org/#aciefr",
      description:
        "A fellowship program that supports early-career researchers in Frontier Climate Technologies, fostering African-led research and building capacity across the continent.",
    },
  ];
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "home", "resources"], nextI18NextConfig)),
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

      <HomeHeroSectrion />

      <HomeThematicAreasSection />

      <HomeAchievementsSection />

      <FeaturedProjects />

      {/* <ResourcesSection /> */}

      <PartnersSection />

      <NewsletterSection />

      <Footer />
    </>
  );
};

export default Page;
