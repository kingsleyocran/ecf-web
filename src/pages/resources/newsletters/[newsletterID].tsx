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

  const handleIframeLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    const iframe = e.currentTarget;
    const height = iframe.contentDocument?.documentElement.scrollHeight;
    if (height) iframe.style.height = `${height}px`;
  };

  return (
    <>
      <CustomHead jsonLd={jsonLd} metaDataTag={metaDataTag} />
      <Header />
      <div className="pt-10 pb-24 bg-neutral-100 min-h-screen">
        <div className="w-full max-w-[700px] mx-auto px-4 pt-14 flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-3">
            <p className="text-xs font-semibold tracking-[5px] uppercase text-[#034D6B]/60">Newsletter</p>
            <h1 className="text-bold-2xl text-[#034D6B] secondarybold">{newsletter.title}</h1>
          </div>

          {newsletter.content && (
            <div className="rounded-2xl overflow-hidden shadow-md bg-white">
              <iframe
                srcDoc={newsletter.content}
                className="w-full border-0 block"
                style={{ minHeight: 600 }}
                scrolling="no"
                onLoad={handleIframeLoad}
                title={newsletter.title}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default NewsletterDetailRoute;
