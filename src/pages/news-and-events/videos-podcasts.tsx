import { useEffect } from "react";
import Lenis from "lenis";
import { NextPage } from "next";
import CustomHead from "@/components/layout/CustomHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VideosPodcastsPage from "@/components/sections/news-and-events/VideosPodcastsPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props {
  metaDataTag: any;
  jsonLd: any;
}

export async function getServerSideProps(context: any) {
  const { locale } = context;
  const metaDataTag = {
    title: "Videos & Podcasts | Emerging Climate Frontiers",
    authors: [{ name: "Emerging Climate Frontiers (ECF)" }],
    description:
      "Watch and listen to ECF's video discussions, lecture recordings, and podcast episodes on SRM, CDR, AI, and African climate governance.",
    keywords:
      "ECF videos, climate podcast Africa, SRM video, CDR podcast, climate governance Africa, geoengineering podcast",
    openGraph: {
      title: "Videos & Podcasts | Emerging Climate Frontiers",
      description:
        "Video discussions and podcast episodes on frontier climate technologies from an African lens.",
      type: "website",
      url: "https://www.emergingclimatefrontiers.org/news-and-events/videos-podcasts",
      images: [
        {
          url: "https://www.emergingclimatefrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "ECF Videos & Podcasts",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ecfrontiers",
      creator: "@ecfrontiers",
      title: "Videos & Podcasts | Emerging Climate Frontiers",
      description: "Watch and listen to ECF's frontier climate technology media.",
      images: [{ url: "https://www.emergingclimatefrontiers.org/hero-image.png" }],
    },
    alternates: {
      canonical: "https://www.emergingclimatefrontiers.org/news-and-events/videos-podcasts",
    },
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Videos & Podcasts | Emerging Climate Frontiers",
      url: "https://www.emergingclimatefrontiers.org/news-and-events/videos-podcasts",
      publisher: { "@type": "Organization", name: "Emerging Climate Frontiers" },
    },
  ];

  return { props: { ...(await serverSideTranslations(locale ?? "en", ["common"])), metaDataTag, jsonLd } };
}

const VideosPodcastsPageRoute: NextPage<Props> = ({ metaDataTag, jsonLd }) => {
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
      <VideosPodcastsPage />
      <Footer />
    </>
  );
};

export default VideosPodcastsPageRoute;
