import { useEffect } from "react";
import Lenis from "lenis";
import { NextPage } from "next";
import CustomHead from "@/components/layout/CustomHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EventDetailPage from "@/components/sections/news-and-events/EventDetailPage";
import { getEventApi } from "@/backend/firebase/db/api/events_api";
import { EventSchema, ResponseEventSchema } from "@/backend/models/events";
import { ResponseIndicator } from "@/backend/models/_shared";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../../../next-i18next.config";

interface Props {
  event: EventSchema;
  metaDataTag: any;
  jsonLd: any;
}

export async function getServerSideProps(context: any) {
  const { eventID } = context.query;
  const { locale } = context;

  let eventData: EventSchema | null = null;

  try {
    const [data, status] = await getEventApi(eventID);
    if (status === ResponseIndicator.SUCCESS) {
      const result = data as ResponseEventSchema;
      eventData = {
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

  if (!eventData) {
    return { notFound: true };
  }

  const metaDataTag = {
    title: `${eventData.title} | ECF Events`,
    authors: [{ name: "Emerging Climate Frontiers (ECF)" }],
    description: eventData.description,
    keywords: `${eventData.title}, ECF events, climate event Africa`,
    openGraph: {
      title: `${eventData.title} | ECF Events`,
      description: eventData.description,
      type: "website",
      url: `https://ecfrontiers.org/news-and-events/events/${eventData.id}`,
      images: [{ url: eventData.imgUrl || "https://ecfrontiers.org/hero-image.png", width: 1200, height: 630, alt: eventData.title, type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ecfrontiers",
      creator: "@ecfrontiers",
      title: `${eventData.title} | ECF Events`,
      description: eventData.description,
      images: [{ url: eventData.imgUrl || "https://ecfrontiers.org/hero-image.png", alt: eventData.title }],
    },
    alternates: {
      canonical: `https://ecfrontiers.org/news-and-events/events/${eventData.id}`,
    },
  };

  const jsonLd = [{
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventData.title,
    description: eventData.description,
    startDate: eventData.date,
    location: {
      "@type": "Place",
      name: eventData.location,
    },
    organizer: {
      "@type": "Organization",
      name: "Emerging Climate Frontiers",
      url: "https://ecfrontiers.org",
    },
  }];

  return { props: { ...(await serverSideTranslations(locale ?? "en", ["common", "news-events"], nextI18NextConfig)), event: eventData, metaDataTag, jsonLd } };
}

const EventDetailRoute: NextPage<Props> = ({ event, metaDataTag, jsonLd }) => {
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
      <EventDetailPage event={event} />
      <Footer />
    </>
  );
};

export default EventDetailRoute;
