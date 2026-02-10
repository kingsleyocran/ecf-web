import CustomHead from "@/components/layout/CustomHead";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { NextPage } from "next";
import React from "react";

const TermsOfUsePage: NextPage = () => {
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

  return (
    <>
      {/* <CustomHead jsonLd={jsonLd} metaDataTag={metaDataTag} /> */}
      <Header />

      <main className="w-full bg-white min-h-screen">
        <div className="w-full max-w-[900px] mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-24">
          <h1 className="text-bold-2xl text-[#024D6B] mb-8">Terms of Use</h1>

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
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using the Emerging Climate Frontiers (&quot;ECF,&quot;
                &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) website, you accept and agree to be bound
                by the terms and provision of this agreement. If you do not
                agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                2. Use License
              </h2>
              <p className="mb-4">
                Permission is granted to temporarily access the materials on
                ECF&apos;s website for personal, non-commercial transitory viewing
                only. This is the grant of a license, not a transfer of title,
                and under this license you may not:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Modify or copy the materials</li>
                <li>
                  Use the materials for any commercial purpose or for any public
                  display
                </li>
                <li>
                  Attempt to decompile or reverse engineer any software
                  contained on ECF&apos;s website
                </li>
                <li>
                  Remove any copyright or other proprietary notations from the
                  materials
                </li>
                <li>
                  Transfer the materials to another person or &quot;mirror&quot; the
                  materials on any other server
                </li>
              </ul>
              <p>
                This license shall automatically terminate if you violate any of
                these restrictions and may be terminated by ECF at any time.
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                3. Disclaimer
              </h2>
              <p>
                The materials on ECF&apos;s website are provided on an &quot;as is&quot; basis.
                ECF makes no warranties, expressed or implied, and hereby
                disclaims and negates all other warranties including, without
                limitation, implied warranties or conditions of merchantability,
                fitness for a particular purpose, or non-infringement of
                intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                4. Limitations
              </h2>
              <p>
                In no event shall ECF or its suppliers be liable for any damages
                (including, without limitation, damages for loss of data or
                profit, or due to business interruption) arising out of the use
                or inability to use the materials on ECF&apos;s website, even if ECF
                or an authorized representative has been notified orally or in
                writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                5. Accuracy of Materials
              </h2>
              <p>
                The materials appearing on ECF&apos;s website could include
                technical, typographical, or photographic errors. ECF does not
                warrant that any of the materials on its website are accurate,
                complete, or current. ECF may make changes to the materials
                contained on its website at any time without notice. However,
                ECF does not make any commitment to update the materials.
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                6. Links to Third-Party Websites
              </h2>
              <p>
                ECF has not reviewed all of the sites linked to its website and
                is not responsible for the contents of any such linked site. The
                inclusion of any link does not imply endorsement by ECF of the
                site. Use of any such linked website is at the user&apos;s own risk.
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                7. Intellectual Property Rights
              </h2>
              <p className="mb-4">
                All content on this website, including but not limited to text,
                graphics, logos, images, and software, is the property of ECF or
                its content suppliers and is protected by international
                copyright and trademark laws. You may not reproduce, distribute,
                modify, create derivative works of, publicly display, publicly
                perform, republish, download, store, or transmit any of the
                material on our website without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                8. User Conduct
              </h2>
              <p className="mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  Use the website in any way that violates any applicable law or
                  regulation
                </li>
                <li>Transmit any malicious code, viruses, or harmful data</li>
                <li>
                  Attempt to gain unauthorized access to any portion of the
                  website
                </li>
                <li>
                  Interfere with or disrupt the website or servers connected to
                  the website
                </li>
                <li>
                  Collect or store personal data about other users without their
                  consent
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                9. Modifications to Terms
              </h2>
              <p>
                ECF may revise these terms of use at any time without notice. By
                using this website, you are agreeing to be bound by the then
                current version of these terms of use. We encourage you to
                review these terms periodically.
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                10. Governing Law
              </h2>
              <p>
                These terms and conditions are governed by and construed in
                accordance with applicable laws. Any disputes relating to these
                terms shall be subject to the exclusive jurisdiction of the
                courts in the relevant jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-bold-xl text-[#024D6B] mb-4">
                11. Contact Information
              </h2>
              <p>
                If you have any questions about these Terms of Use, please
                contact us at:
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

export default TermsOfUsePage;
