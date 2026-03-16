import { useEffect } from "react";
import Lenis from "lenis";
import { NextPage } from "next";
import CustomHead from "@/components/layout/CustomHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LatestNewsPage from "@/components/sections/news-and-events/LatestNewsPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props {
  metaDataTag: any;
  jsonLd: any;
}

export async function getServerSideProps(context: any) {
  const { locale } = context;
  const metaDataTag = {
    title: "Latest News | Emerging Climate Frontiers",
    authors: [{ name: "Emerging Climate Frontiers (ECF)" }],
    description:
      "Stay up to date with the latest news on Solar Radiation Management, Carbon Dioxide Removal, AI, and African climate governance from ECF.",
    keywords:
      "ECF news, SRM news, CDR news, AI climate Africa, climate governance news, geoengineering news",
    openGraph: {
      title: "Latest News | Emerging Climate Frontiers",
      description:
        "The latest coverage on frontier climate technologies and African climate governance.",
      type: "website",
      url: "https://www.emergingclimatefrontiers.org/news-and-events/latest-news",
      images: [
        {
          url: "https://www.emergingclimatefrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "ECF Latest News",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ecfrontiers",
      creator: "@ecfrontiers",
      title: "Latest News | Emerging Climate Frontiers",
      description: "Stay informed on frontier climate technologies in Africa.",
      images: [{ url: "https://www.emergingclimatefrontiers.org/hero-image.png" }],
    },
    alternates: {
      canonical: "https://www.emergingclimatefrontiers.org/news-and-events/latest-news",
    },
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Latest News | Emerging Climate Frontiers",
      url: "https://www.emergingclimatefrontiers.org/news-and-events/latest-news",
      publisher: { "@type": "Organization", name: "Emerging Climate Frontiers" },
    },
  ];

  return { props: { ...(await serverSideTranslations(locale ?? "en", ["common"])), metaDataTag, jsonLd } };
}

const LatestNewsPageRoute: NextPage<Props> = ({ metaDataTag, jsonLd }) => {
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
      <LatestNewsPage />
      <Footer />
    </>
  );
};

export default LatestNewsPageRoute;
