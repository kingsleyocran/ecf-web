import { useEffect } from "react";
import Lenis from "lenis";
import { NextPage } from "next";
import CustomHead from "@/components/layout/CustomHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewslettersPage from "@/components/sections/resources/NewslettersPage";
import { getNewslettersApi } from "@/backend/firebase/db/api/newsletters_api";
import { NewsletterSchema, ListResponseNewslettersSchema } from "@/backend/models/newsletters";
import { ResponseIndicator } from "@/backend/models/_shared";

interface Props { newsletters: NewsletterSchema[]; metaDataTag: any; jsonLd: any; }

export async function getServerSideProps() {
  let newsletters: NewsletterSchema[] = [];
  try {
    const [data, status] = await getNewslettersApi();
    if (status === ResponseIndicator.SUCCESS)
      newsletters = (data as ListResponseNewslettersSchema).data.map((n) => ({ ...n, createdAt: n.createdAt instanceof Date ? n.createdAt.toISOString() : n.createdAt, updatedAt: n.updatedAt instanceof Date ? n.updatedAt.toISOString() : n.updatedAt })) as any;
  } catch (_) {}
  return {
    props: {
      newsletters,
      metaDataTag: {
        title: "Newsletters | ECF",
        description: "Monthly dispatches from Emerging Climate Frontiers.",
        keywords: "ECF newsletter, climate newsletter Africa, SRM newsletter, CDR digest",
        alternates: { canonical: "https://www.emergingclimatefrontiers.org/resources/newsletters" },
        openGraph: { type: "website", images: [{ url: "https://www.emergingclimatefrontiers.org/hero-image.png", width: 1200, height: 630, alt: "ECF Newsletters", type: "image/png" }] },
        twitter: { images: [{ url: "https://www.emergingclimatefrontiers.org/hero-image.png" }] },
      },
      jsonLd: [{ "@context": "https://schema.org", "@type": "WebPage", name: "Newsletters | ECF", url: "https://www.emergingclimatefrontiers.org/resources/newsletters", publisher: { "@type": "Organization", name: "Emerging Climate Frontiers" } }],
    },
  };
}

const NewslettersIndexPage: NextPage<Props> = ({ newsletters, metaDataTag, jsonLd }) => {
  useEffect(() => { const lenis = new Lenis(); function raf(t: number) { lenis.raf(t); requestAnimationFrame(raf); } requestAnimationFrame(raf); });
  return (<><CustomHead jsonLd={jsonLd} metaDataTag={metaDataTag} /><Header /><NewslettersPage newsletters={newsletters} /><Footer /></>);
};
export default NewslettersIndexPage;
