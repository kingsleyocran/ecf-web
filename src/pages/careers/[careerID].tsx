import { useEffect } from "react";
import Lenis from "lenis";
import { NextPage } from "next";
import CustomHead from "@/components/layout/CustomHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CareerPage from "@/components/sections/careers/CareerPage";
import { getCareerApi } from "@/backend/firebase/db/api/careers_api";
import { CareerSchema, ResponseCareerSchema } from "@/backend/models/careers";
import { ResponseIndicator } from "@/backend/models/_shared";

interface Props {
  career: CareerSchema;
  metaDataTag: any;
  jsonLd: any;
}

export async function getServerSideProps(context: any) {
  const { careerID } = context.query;

  let careerData: CareerSchema | null = null;

  try {
    const [data, status] = await getCareerApi(careerID);
    if (status === ResponseIndicator.SUCCESS) {
      const result = data as ResponseCareerSchema;
      careerData = {
        ...result.data,
        createdAt: result.data.createdAt instanceof Date
          ? result.data.createdAt.toISOString()
          : result.data.createdAt,
        updatedAt: result.data.updatedAt instanceof Date
          ? result.data.updatedAt.toISOString()
          : result.data.updatedAt,
      } as any;
    }
  } catch (_) {}

  if (!careerData) {
    return { notFound: true };
  }

  const metaDataTag = {
    title: `${careerData.title} | ECF Careers`,
    authors: [{ name: "Emerging Climate Frontiers (ECF)" }],
    description: careerData.description,
    keywords: `${careerData.title}, ECF careers, climate jobs Africa`,
    openGraph: {
      title: `${careerData.title} | ECF Careers`,
      description: careerData.description,
      type: "website",
      url: `https://www.emergingclimatefrontiers.org/careers/${careerData.id}`,
      images: [{ url: careerData.imgUrl || "https://www.emergingclimatefrontiers.org/hero-image.png", width: 1200, height: 630, alt: careerData.title, type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ecfrontiers",
      creator: "@ecfrontiers",
      title: `${careerData.title} | ECF Careers`,
      description: careerData.description,
      images: [{ url: careerData.imgUrl || "https://www.emergingclimatefrontiers.org/hero-image.png" }],
    },
    alternates: {
      canonical: `https://www.emergingclimatefrontiers.org/careers/${careerData.id}`,
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: careerData.title,
    description: careerData.description,
    jobLocation: { "@type": "Place", name: careerData.location },
    employmentType: careerData.type,
    hiringOrganization: {
      "@type": "Organization",
      name: "Emerging Climate Frontiers",
      sameAs: "https://www.emergingclimatefrontiers.org",
    },
  };

  return { props: { career: careerData, metaDataTag, jsonLd } };
}

const CareerDetailPage: NextPage<Props> = ({ career, metaDataTag, jsonLd }) => {
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
      <CareerPage career={career} />
      <Footer />
    </>
  );
};

export default CareerDetailPage;
