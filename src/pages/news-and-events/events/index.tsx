import { useEffect } from "react";
import Lenis from "lenis";
import { NextPage } from "next";
import CustomHead from "@/components/layout/CustomHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EventsPage from "@/components/sections/news-and-events/EventsPage";
import { filterEventsApi } from "@/backend/firebase/db/api/events_api";
import { EventSchema, ListResponseEventsSchema } from "@/backend/models/events";
import { ResponseIndicator } from "@/backend/models/_shared";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props {
  events: EventSchema[];
  metaDataTag: any;
  jsonLd: any;
}

export async function getServerSideProps(context: any) {
  const { locale } = context;
  let events: EventSchema[] = [];

  try {
    const [data, status] = await filterEventsApi({ orderBy: "createdAt", orderDirection: "desc" });
    if (status === ResponseIndicator.SUCCESS) {
      const result = data as ListResponseEventsSchema;
      events = result.data.map((e) => ({
        ...e,
        createdAt: e.createdAt instanceof Date ? e.createdAt.toISOString() : e.createdAt,
        updatedAt: e.updatedAt instanceof Date ? e.updatedAt.toISOString() : e.updatedAt,
      })) as any;
    }
  } catch (_) {}

  const metaDataTag = {
    title: "Events | Emerging Climate Frontiers",
    authors: [{ name: "Emerging Climate Frontiers (ECF)" }],
    description:
      "ECF forums, workshops, and convenings on Solar Radiation Management, Carbon Dioxide Removal, and AI — shaping Africa's engagement with frontier climate technologies.",
    keywords:
      "ECF events, climate events Africa, SRM forum, CDR workshop, climate governance event, geoengineering conference Africa",
    openGraph: {
      title: "Events | Emerging Climate Frontiers",
      description:
        "Forums, workshops, and convenings shaping Africa's engagement with frontier climate technologies.",
      type: "website",
      url: "https://www.emergingclimatefrontiers.org/news-and-events/events",
      images: [
        {
          url: "https://www.emergingclimatefrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "ECF Events",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ecfrontiers",
      creator: "@ecfrontiers",
      title: "Events | Emerging Climate Frontiers",
      description: "ECF events on frontier climate technologies across Africa.",
      images: [{ url: "https://www.emergingclimatefrontiers.org/hero-image.png" }],
    },
    alternates: {
      canonical: "https://www.emergingclimatefrontiers.org/news-and-events/events",
    },
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Events | Emerging Climate Frontiers",
      url: "https://www.emergingclimatefrontiers.org/news-and-events/events",
      publisher: { "@type": "Organization", name: "Emerging Climate Frontiers" },
    },
  ];

  return { props: { ...(await serverSideTranslations(locale ?? "en", ["common", "news-events"])), events, metaDataTag, jsonLd } };
}

const EventsIndexPage: NextPage<Props> = ({ events, metaDataTag, jsonLd }) => {
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
      <EventsPage events={events} />
      <Footer />
    </>
  );
};

export default EventsIndexPage;
