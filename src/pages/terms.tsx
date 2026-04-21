import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../next-i18next.config";
import { useTranslation } from "next-i18next";
import CustomHead from "@/components/layout/CustomHead";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { NextPage } from "next";
import React from "react";

export async function getServerSideProps({ locale }: { locale: string }) {
  const metaDataTag = {
    title: "Terms of Use | Emerging Climate Frontiers",
    authors: [{ name: "Emerging Climate Frontiers (ECF)" }],
    description:
      "Read ECF's Terms of Use. Understand the rules, permissions, and conditions that apply when you visit and use the Emerging Climate Frontiers website.",
    keywords:
      "terms of use, terms and conditions, website terms, ECF, Emerging Climate Frontiers, legal",
    openGraph: {
      title: "Terms of Use | Emerging Climate Frontiers",
      description:
        "Read the terms and conditions for using the Emerging Climate Frontiers website and services.",
      type: "website",
      url: "https://ecfrontiers.org/terms",
      publishedTime: "2025-01-23",
      modifiedTime: "2025-01-23",
      authors: ["Emerging Climate Frontiers (ECF)"],
      tags: "Terms of Use, Website Terms, ECF",
      images: [
        {
          url: "https://ecfrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "Emerging Climate Frontiers Terms of Use",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ECF_Climate",
      creator: "@ECF_Climate",
      title: "Terms of Use | Emerging Climate Frontiers",
      description:
        "Read the terms and conditions for using the Emerging Climate Frontiers website.",
      images: [
        {
          url: "https://ecfrontiers.org/hero-image.png",
          width: 1200,
          height: 630,
          alt: "Emerging Climate Frontiers Terms of Use",
        },
      ],
    },
    alternates: {
      canonical: "https://ecfrontiers.org/terms",
    },
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Terms of Use | Emerging Climate Frontiers",
      url: "https://ecfrontiers.org/terms",
      description:
        "Terms of Use for Emerging Climate Frontiers outlining the rules and regulations for using our website and services.",
      publisher: {
        "@type": "Organization",
        name: "Emerging Climate Frontiers",
      },
    },
  ];

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "terms"], nextI18NextConfig)),
      metaDataTag,
      jsonLd,
    },
  };
}

interface Props {
  metaDataTag: any;
  jsonLd: any;
}

const TermsOfUsePage: NextPage<Props> = ({ metaDataTag, jsonLd }) => {
  const { t } = useTranslation("terms");

  const useLicenseItems = t("sections.useLicense.items", { returnObjects: true }) as string[];
  const userConductItems = t("sections.userConduct.items", { returnObjects: true }) as string[];

  return (
    <>
      <CustomHead jsonLd={jsonLd} metaDataTag={metaDataTag} />
      <Header />

      <main className="w-full bg-white min-h-screen">
        <div className="w-full max-w-[900px] mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-24">
          <h1 className="text-bold-2xl text-[#024D6B] mb-8">{t("title")}</h1>

          <div className="flex flex-col gap-6 text-normal-base text-[#535353]">
            <section>
              <p className="mb-4">
                <strong className="text-[#024D6B]">{t("lastUpdated")}</strong>{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                {t("sections.acceptance.heading")}
              </h2>
              <p>
                {t("sections.acceptance.body")}
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                {t("sections.useLicense.heading")}
              </h2>
              <p className="mb-4">
                {t("sections.useLicense.body")}
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {useLicenseItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>
                {t("sections.useLicense.body2")}
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                {t("sections.disclaimer.heading")}
              </h2>
              <p>
                {t("sections.disclaimer.body")}
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                {t("sections.limitations.heading")}
              </h2>
              <p>
                {t("sections.limitations.body")}
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                {t("sections.accuracy.heading")}
              </h2>
              <p>
                {t("sections.accuracy.body")}
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                {t("sections.thirdPartyLinks.heading")}
              </h2>
              <p>
                {t("sections.thirdPartyLinks.body")}
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                {t("sections.intellectualProperty.heading")}
              </h2>
              <p className="mb-4">
                {t("sections.intellectualProperty.body")}
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                {t("sections.userConduct.heading")}
              </h2>
              <p className="mb-4">{t("sections.userConduct.body")}</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {userConductItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                {t("sections.modifications.heading")}
              </h2>
              <p>
                {t("sections.modifications.body")}
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                {t("sections.governingLaw.heading")}
              </h2>
              <p>
                {t("sections.governingLaw.body")}
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                {t("sections.contact.heading")}
              </h2>
              <p>
                {t("sections.contact.body")}
              </p>
              <p className="mt-4">
                <strong>{t("sections.contact.orgName")}</strong>
                <br />
                Email: hello@ecfrontiers.org
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default TermsOfUsePage;
