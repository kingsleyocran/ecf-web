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
import AboutHeroSection from "@/components/sections/about/AboutHeroSection";
import AboutMissionVisionSection from "@/components/sections/about/AboutMissionVisionSection";
import AboutHowWeWorkSection from "@/components/sections/about/AboutHowWeWorkSection";
import AboutMilestonesSection from "@/components/sections/about/AboutMilestonesSection";
import AboutTeamSection from "@/components/sections/about/AboutTeamSection";

interface Props {
  metaDataTag: any;
  jsonLd: any;
}

export async function getServerSideProps(context: any) {
  const { locale } = context;
  const metaDataTagRes = {
    title: "About Emerging Climate Frontiers | Our Mission, Team & Story",
    authors: [{ name: "Emerging Climate Frontiers (ECF)" }],
    description:
      "ECF is Africa's leading organization for Frontier Climate Technologies governance. Learn about our mission, team, milestones, and work in AI, CDR, and SRM for African-led climate action.",
    keywords:
      "About ECF, Emerging Climate Frontiers team, ECF mission, African climate organization, GAYO, climate governance Africa, frontier climate technologies, ECF history, climate equity Africa",
    openGraph: {
      title: "About Emerging Climate Frontiers | Our Mission, Team & Story",
      description:
        "Learn who we are, what drives us, and how ECF is building African leadership in AI, Carbon Dioxide Removal, and Solar Radiation Management.",
      type: "website",
      url: "https://ecfrontiers.org/about",
      publishedTime: "2025-01-23",
      modifiedTime: "2025-01-23",
      authors: ["Emerging Climate Frontiers (ECF)"],
      tags: "About ECF, ECF Team, African Climate Leadership, Climate Justice, Frontier Climate Technologies, ECF Mission",
      images: [
        {
          url: "https://ecfrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "About Emerging Climate Frontiers — Our mission and team",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ECF_Climate",
      creator: "@ECF_Climate",
      title: "About Emerging Climate Frontiers | Our Mission, Team & Story",
      description:
        "Meet the team and mission behind ECF — building African agency in Frontier Climate Technologies governance.",
      images: [
        {
          url: "https://ecfrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "About Emerging Climate Frontiers",
        },
      ],
    },
    alternates: {
      canonical: "https://ecfrontiers.org/about",
    },
  };

  const jsonLdRes = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Emerging Climate Frontiers",
      url: "https://ecfrontiers.org/about",
      description:
        "Learn about ECF's mission to empower African institutions in Frontier Climate Technologies — AI, CDR, and SRM — through research capacity, governance frameworks, and continental coalitions.",
      publisher: {
        "@type": "Organization",
        name: "Emerging Climate Frontiers",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "Emerging Climate Frontiers",
      alternateName: "ECF",
      url: "https://ecfrontiers.org/",
      logo: {
        "@type": "ImageObject",
        url: "https://ecfrontiers.org/logo.png",
      },
      description:
        "ECF trains and equips African researchers, policymakers, and civil society to lead on Frontier Climate Technologies including AI, Carbon Dioxide Removal, and Solar Radiation Management.",
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
  ];
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "about", "resources"], nextI18NextConfig)),
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

    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        lenis.scrollTo(hash, { offset: -80 });
      }, 300);
    }
  }, []);

  return (
    <>
      <CustomHead jsonLd={jsonLd} metaDataTag={metaDataTag} />

      <Header />

      <AboutHeroSection />

      <AboutMissionVisionSection />

      <AboutHowWeWorkSection />

      <AboutMilestonesSection />

      <AboutTeamSection/>

      <PartnersSection />

      <NewsletterSection />

      <Footer />
    </>
  );
};

export default Page;
