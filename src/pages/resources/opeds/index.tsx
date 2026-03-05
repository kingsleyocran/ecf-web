import { useEffect } from "react";
import Lenis from "lenis";
import { NextPage } from "next";
import CustomHead from "@/components/layout/CustomHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OpedsPage from "@/components/sections/resources/OpedsPage";
import { getOpedsApi } from "@/backend/firebase/db/api/opeds_api";
import { OpEdSchema, ListResponseOpedsSchema } from "@/backend/models/opeds";
import { ResponseIndicator } from "@/backend/models/_shared";

interface Props { opeds: OpEdSchema[]; metaDataTag: any; jsonLd: any; }

export async function getServerSideProps() {
  let opeds: OpEdSchema[] = [];
  try {
    const [data, status] = await getOpedsApi();
    if (status === ResponseIndicator.SUCCESS)
      opeds = (data as ListResponseOpedsSchema).data.map((o) => ({ ...o, createdAt: o.createdAt instanceof Date ? o.createdAt.toISOString() : o.createdAt, updatedAt: o.updatedAt instanceof Date ? o.updatedAt.toISOString() : o.updatedAt })) as any;
  } catch (_) {}
  return {
    props: {
      opeds,
      metaDataTag: {
        title: "Op-Eds | ECF",
        description: "Opinion and editorial pieces from ECF contributors.",
        keywords: "ECF op-ed, climate opinion Africa, SRM opinion, CDR editorial",
        alternates: { canonical: "https://www.emergingclimatefrontiers.org/resources/opeds" },
        openGraph: { type: "website", images: [{ url: "https://www.emergingclimatefrontiers.org/hero-image.png", width: 1200, height: 630, alt: "ECF Op-Eds", type: "image/png" }] },
        twitter: { images: [{ url: "https://www.emergingclimatefrontiers.org/hero-image.png" }] },
      },
      jsonLd: [{ "@context": "https://schema.org", "@type": "WebPage", name: "Op-Eds | ECF", url: "https://www.emergingclimatefrontiers.org/resources/opeds", publisher: { "@type": "Organization", name: "Emerging Climate Frontiers" } }],
    },
  };
}

const OpedsIndexPage: NextPage<Props> = ({ opeds, metaDataTag, jsonLd }) => {
  useEffect(() => { const lenis = new Lenis(); function raf(t: number) { lenis.raf(t); requestAnimationFrame(raf); } requestAnimationFrame(raf); });
  return (<><CustomHead jsonLd={jsonLd} metaDataTag={metaDataTag} /><Header /><OpedsPage opeds={opeds} /><Footer /></>);
};
export default OpedsIndexPage;
