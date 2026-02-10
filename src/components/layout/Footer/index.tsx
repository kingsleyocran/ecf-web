import Link from "next/link";
import React from "react";
import Image from "next/image";
import { navLinks, socialLinks, termPrivacyList } from "@/utils/content";
import LogoSvg from "../../../../public/assets/brand/logo-1.svg";
import EmailIcon from "../../../../public/assets/icons/email.svg";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#034D6B] border-t border-neutral-200">
      <div className="w-full max-w-[1300px] mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" passHref>
              <LogoSvg
                width="200"
                height="101"
                viewBox="0 0 315 159"
                className="w-[180px] md:w-[200px] cursor-pointer"
              />
            </Link>
          </div>

          <div className="">
            <p className="px-2 primarybold text-xl tracking-[7px] text-[#E0C759]">
              QUICK LINKS
            </p>

            <div className="flex flex-col items-start gap-4 mt-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-normal-base text-white hover:bg-white/10 px-2 py-1 rounded-2xl duration-150 transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Terms and Privacy Links */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <p className="primarybold text-xl tracking-[7px] text-[#E0C759]">
              CONTACT US
            </p>
            {/* Email Contact */}
            <div className="flex flex-row items-center gap-2">
              <Link
                href="mailto:hello@ecfrontiers.org"
                className="text-normal-base text-white hover:underline flex flex-row items-center gap-2"
              >
                <EmailIcon />
                hello@ecfrontiers.org
              </Link>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-row gap-3">
              <Link href={socialLinks.linkedin} passHref legacyBehavior>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-[40px] w-[30px] inline-flex items-center justify-center rounded-xl bg-[#024D6B] hover:bg-[#024D6B]/80 transition-colors"
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
                  className="h-[40px] w-[30px] inline-flex items-center justify-center rounded-xl bg-[#024D6B] hover:bg-[#024D6B]/80 transition-colors"
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
                  className="h-[40px] w-[30px] inline-flex items-center justify-center rounded-xl bg-[#024D6B] hover:bg-[#024D6B]/80 transition-colors"
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
            </div>

            <div className="flex flex-row gap-4 items-center">
              <Link
                href={termPrivacyList[0].href}
                className="text-normal-base text-white hover:underline"
              >
                {termPrivacyList[0].title}
              </Link>
              <span className="text-white">|</span>
              <Link
                href={termPrivacyList[1].href}
                className="text-normal-base text-white hover:underline"
              >
                {termPrivacyList[1].title}
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 text-center">
          <p className="text-normal-sm text-white/40">
            © {currentYear} Emerging Climate Frontiers. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
