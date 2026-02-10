import Link from "next/link";
import React from "react";
import Image from "next/image";
import { contactDetails, socialLinks, termPrivacyList } from "@/utils/content";
import EmailIcon from "../../../../public/assets/icons/email.svg";
import NewsletterForm from "@/components/sections/NewsletterSection";

function Footer({showNewsletterForm = true}: {showNewsletterForm?: boolean}) {
  const currentYear = new Date().getFullYear();
  // Website by Build with OrbOrbit
  return (
    <nav className="flex flex-col">
      <div className=" transition-all duration-200">
        <div className="w-full flex flex-col transition-all max-w-[1920px] 2xl:mx-auto">


          {/* Footer Content */}
          <div className="bg-th-background flex flex-col gap-14 md:flex-row justify-between px-6 md:px-12 py-8">
            {/* Logo */}
            <Link
              className="relative flex items-center"
              href={"/"}
              passHref
            >
              <div className="relative  h-[120px] md:h-[160px] w-full md:w-[300px]">
                <Image
                  src={"/assets/brand/logo-2.png"}
                  alt={"ecf_logo"}
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </Link>

            {/* Footer Links */}
            <div className="flex flex-row max-w-[300px] justify-center">
              {showNewsletterForm && <NewsletterForm/>}
            </div>

            {/* Contact Section */}
            <div className=" flex flex-col md:items-start items-center gap-2">
              <h6
                style={{
                  letterSpacing: "0.4em",
                }}
                className="secondarybold text-[#8BB92C] text-xl uppercase"
              >
                Contact us
              </h6>

              {/* Email */}
              <Link
                className="text-normal-lg primarymedium text-black tracking-[0px]
                   hover:underline flex flex-row items-center gap-2"
                href={`mailto:${contactDetails.email}`}
                passHref
              >
                <EmailIcon />
                {contactDetails.email}
              </Link>

              {/* Socials */}
              <div className="flex lg:gap-2 gap-3">
                <Link href={socialLinks.linkedin} passHref legacyBehavior>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-[40px] w-[40px] bg-[#8BB92C] inline-flex items-center justify-center rounded-xl"
                  >
                    <Image
                      src="/assets/socials/in.svg"
                      alt="linkedin icon"
                      width={20}
                      height={20}
                      priority
                    />
                  </a>
                </Link>

                <Link href={socialLinks.twitter} passHref legacyBehavior>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-[40px] w-[40px] bg-[#8BB92C] inline-flex items-center justify-center rounded-xl"
                  >
                    <Image
                      src="/assets/socials/x.svg"
                      alt="twitter icon"
                      width={20}
                      height={20}
                      priority
                    />
                  </a>
                </Link>

                <Link href={socialLinks.instagram} passHref legacyBehavior>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-[40px] w-[40px] bg-[#8BB92C] inline-flex items-center justify-center rounded-xl"
                  >
                    <Image
                      src="/assets/socials/ig.svg"
                      alt="instagram icon"
                      width={20}
                      height={20}
                      priority
                    />
                  </a>
                </Link>

                {/* <Link href={socialLinks.facebook} passHref legacyBehavior>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-[40px] w-[40px] bg-[#8BB92C] inline-flex items-center justify-center rounded-xl"
                  >
                    <Image
                      src="/assets/socials/fb.svg"
                      alt="facebook icon"
                      width={20}
                      height={20}
                    />
                  </a>
                </Link> */}
              </div>
            </div>
          </div>

          {/* Footer Bottom Section */}
          <div className="bg-[#61270A] mt-8 flex flex-col gap-6 md:flex-row justify-between items-center mx-4 py-6 px-6 md:mx-8">
            <p className="text-normal-base text-white text-center">
              © Copyright {currentYear}. All Rights Reserved
            </p>

            <div className="flex flex-row gap-4 ">
              <Link
                className="text-normal-base text-white tracking-[0px]
                  rounded-full hover:underline"
                href={termPrivacyList[0].href}
                passHref
              >
                {termPrivacyList[0].title}
              </Link>
              <div className=" w-[2px] bg-white/30"> </div>
              <Link
                className="text-normal-base text-white tracking-[0px]
                  rounded-full hover:underline"
                href={termPrivacyList[1].href}
                passHref
              >
                {termPrivacyList[1].title}
              </Link>
            </div>
          </div>

          {/* Website by Build with OrbOrbit */}
          <div className="flex primarymedium text-normal-base flex-row text-center justify-center items-center mx-4 py-6 px-6 md:mx-8">
            Website by Build with OrbOrbit❤️
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Footer;
