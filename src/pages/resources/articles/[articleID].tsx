import { useEffect } from "react";
import Lenis from "lenis";
import { NextPage } from "next";
import CustomHead from "@/components/layout/CustomHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContentDetailPage from "@/components/sections/resources/ContentDetailPage";
import { getArticleApi } from "@/backend/firebase/db/api/articles_api";
import { ArticleSchema, ResponseArticleSchema } from "@/backend/models/articles";
import { ResponseIndicator } from "@/backend/models/_shared";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props { article: ArticleSchema; metaDataTag: any; jsonLd: any; }

export async function getServerSideProps(context: any) {
  const { articleID } = context.query;
  const { locale } = context;
  let articleData: ArticleSchema | null = null;
  try {
    const [data, status] = await getArticleApi(articleID);
    if (status === ResponseIndicator.SUCCESS) {
      const a = (data as ResponseArticleSchema).data;
      articleData = { ...a, createdAt: a.createdAt instanceof Date ? a.createdAt.toISOString() : a.createdAt, updatedAt: a.updatedAt instanceof Date ? a.updatedAt.toISOString() : a.updatedAt } as any;
    }
  } catch (_) {}
  if (!articleData) return { notFound: true };
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "resources"])),
      article: articleData,
      metaDataTag: {
        title: `${articleData.name} | ECF`,
        description: articleData.description,
        keywords: `${articleData.name}, ECF articles, climate Africa`,
        alternates: { canonical: `https://www.emergingclimatefrontiers.org/resources/articles/${articleData.id}` },
        openGraph: { type: "website", images: [{ url: articleData.imgUrl || "https://www.emergingclimatefrontiers.org/hero-image.png", width: 1200, height: 630, alt: articleData.name, type: "image/png" }] },
        twitter: { images: [{ url: articleData.imgUrl || "https://www.emergingclimatefrontiers.org/hero-image.png" }] },
      },
      jsonLd: [{ "@context": "https://schema.org", "@type": "Article", headline: articleData.name, description: articleData.description, author: { "@type": "Person", name: articleData.author }, publisher: { "@type": "Organization", name: "Emerging Climate Frontiers" }, url: `https://www.emergingclimatefrontiers.org/resources/articles/${articleData.id}` }],
    },
  };
}

const ArticleDetailRoute: NextPage<Props> = ({ article, metaDataTag, jsonLd }) => {
  useEffect(() => { const lenis = new Lenis(); function raf(t: number) { lenis.raf(t); requestAnimationFrame(raf); } requestAnimationFrame(raf); });
  return (
    <>
      <CustomHead jsonLd={jsonLd} metaDataTag={metaDataTag} />
      <Header />
      <ContentDetailPage title={article.name} author={article.author} publishedDate="" imgUrl={article.imgUrl} content={article.content} badge="Article" />
      <Footer />
    </>
  );
};
export default ArticleDetailRoute;
