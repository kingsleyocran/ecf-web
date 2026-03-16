import { useEffect } from "react";
import Lenis from "lenis";
import { NextPage } from "next";
import CustomHead from "@/components/layout/CustomHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ArticlesPage from "@/components/sections/resources/ArticlesPage";
import { getArticlesApi } from "@/backend/firebase/db/api/articles_api";
import { ArticleSchema, ListResponseArticlesSchema } from "@/backend/models/articles";
import { ResponseIndicator } from "@/backend/models/_shared";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props { articles: ArticleSchema[]; metaDataTag: any; jsonLd: any; }

export async function getServerSideProps(context: any) {
  const { locale } = context;
  let articles: ArticleSchema[] = [];
  try {
    const [data, status] = await getArticlesApi();
    if (status === ResponseIndicator.SUCCESS)
      articles = (data as ListResponseArticlesSchema).data.map((a) => ({ ...a, createdAt: a.createdAt instanceof Date ? a.createdAt.toISOString() : a.createdAt, updatedAt: a.updatedAt instanceof Date ? a.updatedAt.toISOString() : a.updatedAt })) as any;
  } catch (_) {}
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "resources"])),
      articles,
      metaDataTag: {
        title: "Articles | ECF",
        description: "Insights and analysis from Emerging Climate Frontiers.",
        keywords: "ECF articles, climate articles Africa, SRM article, CDR analysis",
        alternates: { canonical: "https://www.emergingclimatefrontiers.org/resources/articles" },
        openGraph: { type: "website", images: [{ url: "https://www.emergingclimatefrontiers.org/hero-image.png", width: 1200, height: 630, alt: "ECF Articles", type: "image/png" }] },
        twitter: { images: [{ url: "https://www.emergingclimatefrontiers.org/hero-image.png" }] },
      },
      jsonLd: [{ "@context": "https://schema.org", "@type": "WebPage", name: "Articles | ECF", url: "https://www.emergingclimatefrontiers.org/resources/articles", publisher: { "@type": "Organization", name: "Emerging Climate Frontiers" } }],
    },
  };
}

const ArticlesIndexPage: NextPage<Props> = ({ articles, metaDataTag, jsonLd }) => {
  useEffect(() => { const lenis = new Lenis(); function raf(t: number) { lenis.raf(t); requestAnimationFrame(raf); } requestAnimationFrame(raf); });
  return (<><CustomHead jsonLd={jsonLd} metaDataTag={metaDataTag} /><Header /><ArticlesPage articles={articles} /><Footer /></>);
};
export default ArticlesIndexPage;
