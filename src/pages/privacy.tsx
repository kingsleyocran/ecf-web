import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CustomHead from "@/components/layout/CustomHead";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { NextPage } from "next";
import React from "react";

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
}

const PrivacyPolicyPage: NextPage = () => {
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

  return (
    <>
      {/* <CustomHead jsonLd={jsonLd} metaDataTag={metaDataTag} /> */}
      <Header />

      <main className="w-full bg-white min-h-screen">
        <div className="w-full max-w-[900px] mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-24">
          <h1 className="text-bold-2xl text-[#024D6B] mb-8">Privacy Policy</h1>

          <div className="flex flex-col gap-6 text-normal-base text-[#535353]">
            <section>
              <p className="mb-4">
                <strong className="text-[#024D6B]">Last Updated:</strong>{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                1. Introduction
              </h2>
              <p className="mb-4">
                Emerging Climate Frontiers (&quot;ECF,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is
                committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you visit our website and use our services.
              </p>
              <p>
                By using our website, you consent to the data practices
                described in this policy. If you do not agree with the practices
                described in this policy, please do not use our website.
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                2. Information We Collect
              </h2>
              <h3 className="text-bold-lg text-[#024D6B] mb-3">
                2.1 Personal Information
              </h3>
              <p className="mb-4">
                We may collect personal information that you voluntarily provide
                to us when you:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Subscribe to our newsletter</li>
                <li>Contact us through our website</li>
                <li>Apply for funding or programs</li>
                <li>Participate in surveys or research</li>
              </ul>
              <p className="mb-4">
                This information may include your name, email address, phone
                number, organization affiliation, and other details you choose
                to provide.
              </p>

              <h3 className="text-bold-lg text-[#024D6B] mb-3">
                2.2 Automatically Collected Information
              </h3>
              <p>
                When you visit our website, we automatically collect certain
                information about your device, including information about your
                web browser, IP address, time zone, and some of the cookies that
                are installed on your device. We also collect information about
                how you interact with our website.
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                3. How We Use Your Information
              </h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide, operate, and maintain our website</li>
                <li>Send you newsletters and updates about our work</li>
                <li>Respond to your inquiries and provide support</li>
                <li>Process applications for funding and programs</li>
                <li>Improve our website and user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                4. Information Sharing and Disclosure
              </h2>
              <p className="mb-4">
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information only in the
                following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  With service providers who assist us in operating our website
                  and conducting our activities
                </li>
                <li>
                  When required by law or to protect our rights and safety
                </li>
                <li>With your explicit consent for specific purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                5. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. However, no
                method of transmission over the Internet or electronic storage
                is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                6. Your Rights
              </h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Access and receive a copy of your personal information</li>
                <li>Request correction of inaccurate or incomplete data</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the
                information provided in the Contact section below.
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                7. Cookies and Tracking Technologies
              </h2>
              <p>
                We use cookies and similar tracking technologies to track
                activity on our website and store certain information. You can
                instruct your browser to refuse all cookies or to indicate when
                a cookie is being sent. However, if you do not accept cookies,
                you may not be able to use some portions of our website.
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                8. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices or content of these
                external sites. We encourage you to review the privacy policies
                of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                9. Children&apos;s Privacy
              </h2>
              <p>
                Our website is not intended for children under the age of 13. We
                do not knowingly collect personal information from children
                under 13. If you believe we have collected information from a
                child under 13, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                10. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last Updated&quot; date. You are advised
                to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                11. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy or our data
                practices, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Emerging Climate Frontiers</strong>
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
