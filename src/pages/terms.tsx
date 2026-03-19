import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import CustomHead from "@/components/layout/CustomHead";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { NextPage } from "next";
import React from "react";

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "terms"])),
    },
  };
}

const TermsOfUsePage: NextPage = () => {
  const { t } = useTranslation("terms");

  const metaDataTag = {
    title: "Terms of Use | Emerging Climate Frontiers",
    description:
      "Terms of Use for Emerging Climate Frontiers. Read our terms and conditions for using our website and services.",
    keywords: "terms of use, terms and conditions, website terms, ECF",
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Terms of Use | Emerging Climate Frontiers",
      description:
        "Terms of Use for Emerging Climate Frontiers outlining the rules and regulations for using our website and services.",
    },
  ];

  const useLicenseItems = t("sections.useLicense.items", { returnObjects: true }) as string[];
  const userConductItems = t("sections.userConduct.items", { returnObjects: true }) as string[];

  return (
    <>
      {/* <CustomHead jsonLd={jsonLd} metaDataTag={metaDataTag} /> */}
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
