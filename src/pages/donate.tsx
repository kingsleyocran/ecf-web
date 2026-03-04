import { useEffect } from "react";
import Lenis from "lenis";
import { NextPage } from "next";
import CustomHead from "@/components/layout/CustomHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewsletterSection from "@/components/sections/NewsletterSection";
import PartnersSection from "@/components/sections/PartnersSection";
import DonateHeroSection from "@/components/sections/donate/DonateHeroSection";
import DonateTiersSection from "@/components/sections/donate/DonateTiersSection";

interface Props {
  metaDataTag: any;
  jsonLd: any;
}

export async function getServerSideProps() {
  const metaDataTag = {
    title: "Donate | Emerging Climate Frontiers",
    authors: [{ name: "Emerging Climate Frontiers (ECF)" }],
    description:
      "Support Emerging Climate Frontiers in empowering African researchers, policymakers, and institutions to lead on Frontier Climate Technologies. Every donation funds research, fellowships, and policy dialogues across Africa.",
    keywords:
      "Donate ECF, Support Climate Research Africa, Fund Climate Fellowship, Climate Technology Donation, African Climate Leadership",
    openGraph: {
      title: "Donate | Emerging Climate Frontiers",
      description:
        "Your donation directly powers African leadership in Frontier Climate Technologies — from research fellowships to policy dialogues.",
      type: "website",
      url: "https://www.emergingclimatefrontiers.org/donate",
      images: [
        {
          url: "https://www.emergingclimatefrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "Donate to Emerging Climate Frontiers",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ecfrontiers",
      creator: "@ecfrontiers",
      title: "Donate | Emerging Climate Frontiers",
      description:
        "Support African climate leadership. Donate to ECF and help build the research and policy capacity Africa needs.",
      images: [
        {
          url: "https://www.emergingclimatefrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "Donate to Emerging Climate Frontiers",
        },
      ],
    },
    alternates: {
      canonical: "https://www.emergingclimatefrontiers.org/donate",
    },
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "DonateAction",
      name: "Donate to Emerging Climate Frontiers",
      description:
        "Support African leadership in Frontier Climate Technologies through a donation to ECF.",
      url: "https://www.emergingclimatefrontiers.org/donate",
      recipient: {
        "@type": "Organization",
        name: "Emerging Climate Frontiers",
        url: "https://www.emergingclimatefrontiers.org",
      },
    },
  ];

  return { props: { metaDataTag, jsonLd } };
}

const DonatePage: NextPage<Props> = ({ metaDataTag, jsonLd }) => {
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

      <DonateHeroSection />

      <DonateTiersSection />

      <PartnersSection />

      <NewsletterSection />

      <Footer />
    </>
  );
};

export default DonatePage;
