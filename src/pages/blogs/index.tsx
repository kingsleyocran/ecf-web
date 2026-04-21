import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../../next-i18next.config";
import CustomHead from "@/components/layout/CustomHead";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { NextPage } from "next";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import AllBlogsSection from "@/components/sections/blogs/AllBlogsSection";

interface Props {
  metaDataTag: any;
  jsonLd: any;
}

export async function getServerSideProps(context: any) {
  const { locale } = context;
  const metaDataTagRes = {
    title:
      "ECF Blog & News | Frontier Climate Technologies, Research, and Policy Updates",
    authors: [
      {
        name: "Emerging Climate Frontiers (ECF)",
      },
    ],
    description:
      "Stay updated with the latest from ECF. Read research insights, policy updates, and news about Frontier Climate Technologies including AI, CDR, and SRM in Africa.",
    keywords:
      "ECF blog, Frontier Climate Technologies, FCT blog, climate research Africa, CDR news, SRM updates, AI climate governance, African climate innovation, climate policy Africa, ECF research updates, climate technology blog",
    openGraph: {
      title:
        "ECF Blog & News | Frontier Climate Technologies, Research, and Policy Updates",
      description:
        "Stay updated with the latest from ECF. Read research insights, policy updates, and news about Frontier Climate Technologies including AI, CDR, and SRM in Africa.",
      type: "website",
      url: "https://ecfrontiers.org/blogs",
      publishedTime: "2025-01-23",
      modifiedTime: "2025-01-23",
      authors: ["Emerging Climate Frontiers (ECF)"],
      tags: "Frontier Climate Technologies, FCT, Climate Research, Climate Policy, CDR, SRM, AI Governance, African Climate Innovation, Climate Technology",
      images: [
        {
          url: "https://ecfrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "ECF Blog - Frontier Climate Technologies in Africa",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ECF_Climate",
      creator: "@ECF_Climate",
      title:
        "ECF Blog & News | Frontier Climate Technologies, Research, and Policy Updates",
      description:
        "Stay updated with the latest from ECF. Read research insights, policy updates, and news about Frontier Climate Technologies in Africa.",
      images: [
        {
          url: "https://ecfrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "ECF Blog Twitter Preview - Frontier Climate Technologies",
        },
      ],
    },
    alternates: {
      canonical: "https://ecfrontiers.org/blogs",
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
      "@type": "Blog",
      name: "ECF Blog & News",
      url: "https://ecfrontiers.org/blogs",
      description:
        "ECF's blog features research insights, policy updates, and news about Frontier Climate Technologies including AI, Carbon Dioxide Removal (CDR), and Solar Radiation Management (SRM) in Africa.",
      publisher: {
        "@type": "Organization",
        name: "Emerging Climate Frontiers",
      },
      blogPost: [
        {
          "@type": "BlogPosting",
          headline:
            "Empowering African Leadership in Frontier Climate Technologies",
          datePublished: "2025-01-23",
          url: "https://ecfrontiers.org/blogs/empowering-african-leadership",
          description:
            "Exploring how African institutions are driving innovation in AI, CDR, and SRM technologies to address climate challenges.",
          author: {
            "@type": "Organization",
            name: "Emerging Climate Frontiers",
          },
        },
      ],
    },
  ];

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "blogs"], nextI18NextConfig)),
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

      {/* <NavigationAnimation>
      </NavigationAnimation> */}

      <Header />

      <AllBlogsSection />

      <Footer />
    </>
  );
};

export default Page;
