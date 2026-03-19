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
      ...(await serverSideTranslations(locale ?? "en", ["common", "privacy"])),
    },
  };
}

const PrivacyPolicyPage: NextPage = () => {
  const { t } = useTranslation("privacy");

  const metaDataTag = {
    title: "Privacy Policy | Emerging Climate Frontiers",
    description:
      "Privacy Policy for Emerging Climate Frontiers. Learn how we collect, use, and protect your personal information.",
    keywords: "privacy policy, data protection, personal information, ECF",
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Privacy Policy | Emerging Climate Frontiers",
      description:
        "Privacy Policy for Emerging Climate Frontiers outlining how we collect, use, and protect personal information.",
    },
  ];

  const personalItems = t("sections.infoCollect.personalItems", { returnObjects: true }) as string[];
  const howWeUseItems = t("sections.howWeUse.items", { returnObjects: true }) as string[];
  const sharingItems = t("sections.sharing.items", { returnObjects: true }) as string[];
  const rightsItems = t("sections.rights.items", { returnObjects: true }) as string[];

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
                {t("sections.intro.heading")}
              </h2>
              <p className="mb-4">
                {t("sections.intro.body1")}
              </p>
              <p>
                {t("sections.intro.body2")}
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                {t("sections.infoCollect.heading")}
              </h2>
              <h3 className="text-bold-lg text-[#024D6B] mb-3">
                {t("sections.infoCollect.personalHeading")}
              </h3>
              <p className="mb-4">
                {t("sections.infoCollect.personalBody")}
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {personalItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="mb-4">
                {t("sections.infoCollect.personalBody2")}
              </p>

              <h3 className="text-bold-lg text-[#024D6B] mb-3">
                {t("sections.infoCollect.autoHeading")}
              </h3>
              <p>
                {t("sections.infoCollect.autoBody")}
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                {t("sections.howWeUse.heading")}
              </h2>
              <p className="mb-4">{t("sections.howWeUse.body")}</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {howWeUseItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                {t("sections.sharing.heading")}
              </h2>
              <p className="mb-4">
                {t("sections.sharing.body")}
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {sharingItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                {t("sections.security.heading")}
              </h2>
              <p>
                {t("sections.security.body")}
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                {t("sections.rights.heading")}
              </h2>
              <p className="mb-4">{t("sections.rights.body")}</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {rightsItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>
                {t("sections.rights.body2")}
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                {t("sections.cookies.heading")}
              </h2>
              <p>
                {t("sections.cookies.body")}
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
                {t("sections.children.heading")}
              </h2>
              <p>
                {t("sections.children.body")}
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                {t("sections.changes.heading")}
              </h2>
              <p>
                {t("sections.changes.body")}
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

export default PrivacyPolicyPage;
