import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import LangIcon from "../../../../public/assets/icons/lang.svg";
import Image from "next/image";
import { motion } from "framer-motion";
import { navLinks, languages } from "@/utils/content";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { useTranslation } from "next-i18next";

function NavBar() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const currentLang = languages.find((l) => l.code === router.locale) ?? languages[0];

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-[#024D6B] md:h-[65px] w-full fixed z-50"
    >
      <div
        className={`w-full relative transition-all duration-200 h-[65px] md:h-[65px]
        flex flex-row items-center justify-between max-w-[1920px] 2xl:mx-auto gap-4`}
      >
        {/* Logo */}
        <Link
          className="relative flex items-center gap-1 px-2 "
          href={"/"}
          passHref
        >
          <div className="relative md:h-[45px] md:w-[100px] h-[45px] w-[100px]">
            <Image
              src={"/assets/brand/logo-1.svg"}
              alt={"ecf_logo"}
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </Link>

        <div className="flex flex-row px-2 md:px-4 items-center gap-2">
          {/* Desktop Menu */}
          <div className="hidden md:flex flex-row items-center gap-1">
            {navLinks.map((navlink, idx) => (
              <Fragment key={idx}>
                {navlink?.subPages ? (
                  <DesktopMenu navlink={navlink} />
                ) : (
                  <Link
                    className={`flex flex-row primarybold paragraph-text-small tracking-[0px]
                  rounded-full items-center gap-2 px-4 lg:px-5 py-2 outline-none transition-all duration-200
                  ${
                    router.pathname === navlink.href
                      ? "text-[#E0C759] hover:text-[#E0C759]"
                      : "text-white hover:bg-white/20"
                  }`}
                    href={navlink.href}
                    passHref
                  >
                    <p className="line-clamp-1">{t(navlink.tKey)}</p>
                  </Link>
                )}
              </Fragment>
            ))}

            <Link
              className="flex flex-row primarybold text-white paragraph-text-small tracking-[0px]
                  rounded-full items-center gap-2 px-4 lg:px-5 py-2  bg-[#0182B5] hover:bg-[#4BB0D9]/90 outline-none"
              href={"/donate"}
              passHref
            >
              <p className="line-clamp-1">{t("nav.donate")}</p>
            </Link>

            {/* Language Selector */}
            <Popover className="relative">
              <PopoverButton
                className="primarybold text-white hover:bg-white/30 transition-all duration-200
                flex flex-row gap-1 items-center justify-center h-[45px] px-[10px] rounded-2xl outline-none"
              >
                <LangIcon />
                {currentLang.code.toUpperCase()}
              </PopoverButton>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel className="absolute right-0 mt-2 bg-white rounded-2xl shadow-lg py-2 min-w-[170px] z-50 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() =>
                        router.push(router.asPath, router.asPath, {
                          locale: lang.code,
                        })
                      }
                      className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors duration-150
                        ${lang.code === router.locale ? "bg-[#034D6B]/10 text-[#034D6B]" : "text-black hover:bg-gray-50"}`}
                    >
                      <span className="font-bold text-xs w-6 shrink-0">
                        {lang.code.toUpperCase()}
                      </span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </PopoverPanel>
              </Transition>
            </Popover>
          </div>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </motion.nav>
  );
}

export default NavBar;
