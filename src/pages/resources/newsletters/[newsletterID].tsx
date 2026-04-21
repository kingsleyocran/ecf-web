import { useEffect } from "react";
import Lenis from "lenis";
import { NextPage } from "next";
import CustomHead from "@/components/layout/CustomHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getNewsletterApi } from "@/backend/firebase/db/api/newsletters_api";
import { NewsletterSchema, ResponseNewsletterSchema } from "@/backend/models/newsletters";
import { ResponseIndicator } from "@/backend/models/_shared";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../../../next-i18next.config";

interface Props { newsletter: NewsletterSchema; metaDataTag: any; jsonLd: any; }

export async function getServerSideProps(context: any) {
  const { newsletterID } = context.query;
  const { locale } = context;
  let newsletterData: NewsletterSchema | null = null;
  try {
    const [data, status] = await getNewsletterApi(newsletterID);
    if (status === ResponseIndicator.SUCCESS) {
      const n = (data as ResponseNewsletterSchema).data;
      newsletterData = { ...n, createdAt: n.createdAt instanceof Date ? n.createdAt.toISOString() : n.createdAt, updatedAt: n.updatedAt instanceof Date ? n.updatedAt.toISOString() : n.updatedAt } as any;
    }
  } catch (_) {}
  if (!newsletterData) return { notFound: true };
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "resources"], nextI18NextConfig)),
      newsletter: newsletterData,
      metaDataTag: {
        title: `${newsletterData.title} | ECF`,
        description: newsletterData.description,
        keywords: `${newsletterData.title}, ECF newsletter, climate newsletter Africa`,
        alternates: { canonical: `https://ecfrontiers.org/resources/newsletters/${newsletterData.id}` },
        openGraph: { type: "website", images: [{ url: newsletterData.imgUrl || "https://ecfrontiers.org/hero-image.png", width: 1200, height: 630, alt: newsletterData.title, type: "image/png" }] },
        twitter: { images: [{ url: newsletterData.imgUrl || "https://ecfrontiers.org/hero-image.png" }] },
      },
      jsonLd: [{ "@context": "https://schema.org", "@type": "Article", headline: newsletterData.title, description: newsletterData.description, publisher: { "@type": "Organization", name: "Emerging Climate Frontiers" }, url: `https://ecfrontiers.org/resources/newsletters/${newsletterData.id}` }],
    },
  };
}

const NewsletterDetailRoute: NextPage<Props> = ({ newsletter, metaDataTag, jsonLd }) => {
  useEffect(() => { const lenis = new Lenis(); function raf(t: number) { lenis.raf(t); requestAnimationFrame(raf); } requestAnimationFrame(raf); });
  return (
    <>
      <CustomHead jsonLd={jsonLd} metaDataTag={metaDataTag} />
      <Header />
      <div className="pt-10 pb-[200px] bg-white min-h-screen">
        <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12 lg:px-16 pt-14 md:py-14 flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-4">
            <h1 className="text-bold-2xl text-[#034D6B] secondarybold">{newsletter.title}</h1>
            <p className="text-normal-base text-black/60 max-w-xl">{newsletter.description}</p>
          </div>

          {newsletter.content && (
            <div
              className="w-full newsletter-content"
              dangerouslySetInnerHTML={{ __html: newsletter.content }}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default NewsletterDetailRoute;
