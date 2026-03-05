import { useEffect } from "react";
import Lenis from "lenis";
import { NextPage } from "next";
import CustomHead from "@/components/layout/CustomHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContentDetailPage from "@/components/sections/resources/ContentDetailPage";
import { getOpedApi } from "@/backend/firebase/db/api/opeds_api";
import { OpEdSchema, ResponseOpEdSchema } from "@/backend/models/opeds";
import { ResponseIndicator } from "@/backend/models/_shared";

interface Props { oped: OpEdSchema; metaDataTag: any; jsonLd: any; }

export async function getServerSideProps(context: any) {
  const { opedID } = context.query;
  let opedData: OpEdSchema | null = null;
  try {
    const [data, status] = await getOpedApi(opedID);
    if (status === ResponseIndicator.SUCCESS) {
      const o = (data as ResponseOpEdSchema).data;
      opedData = { ...o, createdAt: o.createdAt instanceof Date ? o.createdAt.toISOString() : o.createdAt, updatedAt: o.updatedAt instanceof Date ? o.updatedAt.toISOString() : o.updatedAt } as any;
    }
  } catch (_) {}
  if (!opedData) return { notFound: true };
  return {
    props: {
      oped: opedData,
      metaDataTag: {
        title: `${opedData.title} | ECF`,
        description: opedData.description,
        keywords: `${opedData.title}, ECF op-ed, climate opinion Africa`,
        alternates: { canonical: `https://www.emergingclimatefrontiers.org/resources/opeds/${opedData.id}` },
        openGraph: { type: "website", images: [{ url: opedData.imgUrl || "https://www.emergingclimatefrontiers.org/hero-image.png", width: 1200, height: 630, alt: opedData.title, type: "image/png" }] },
        twitter: { images: [{ url: opedData.imgUrl || "https://www.emergingclimatefrontiers.org/hero-image.png" }] },
      },
      jsonLd: [{ "@context": "https://schema.org", "@type": "Article", headline: opedData.title, description: opedData.description, author: { "@type": "Person", name: opedData.author }, publisher: { "@type": "Organization", name: "Emerging Climate Frontiers" }, url: `https://www.emergingclimatefrontiers.org/resources/opeds/${opedData.id}` }],
    },
  };
}

const OpEdDetailRoute: NextPage<Props> = ({ oped, metaDataTag, jsonLd }) => {
  useEffect(() => { const lenis = new Lenis(); function raf(t: number) { lenis.raf(t); requestAnimationFrame(raf); } requestAnimationFrame(raf); });
  return (
    <>
      <CustomHead jsonLd={jsonLd} metaDataTag={metaDataTag} />
      <Header />
      <ContentDetailPage title={oped.title} author={oped.author} publishedDate={oped.publishedDate} imgUrl={oped.imgUrl} content={oped.content} badge="Op-Ed" />
      <Footer />
    </>
  );
};
export default OpEdDetailRoute;
