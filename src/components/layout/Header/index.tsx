import React, {
  Fragment,
  ReactNode,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import LangIcon from "../../../../public/assets/icons/lang.svg";
import Image from "next/image";
import { motion } from "framer-motion";
import { navLinks } from "@/utils/content";
import DesktopMenu from "./DesktopMenu";
import PrimaryButton from "@/components/button/PrimaryButton";

function NavBar() {
  const router = useRouter();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
      animate={{ y: showNavbar ? 0 : -100 }} // Moves the navbar out of view when hidden
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
              <>
                {navlink?.subPages ? (
                  <DesktopMenu navlink={navlink} />
                ) : (
                  <Link
                    key={idx}
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
                    <p className="line-clamp-1">{navlink.title}</p>
                  </Link>
                )}
              </>
            ))}

            <Link
              className="flex flex-row primarybold text-white paragraph-text-small tracking-[0px]
                  rounded-full items-center gap-2 px-4 lg:px-5 py-2  bg-[#0182B5] hover:bg-[#4BB0D9]/90 outline-none"
              href={"/donate"}
              passHref
            >
              <p className="line-clamp-1">Donate</p>
            </Link>

            <button
              type="button"
              className="primarybold text-white hover:bg-white/30 transition-all duration-200 
              flex flex-row gap-1 items-center justify-center h-[45px] px-[10px] rounded-2xl"
            >
              <LangIcon />
              EN
            </button>
          </div>

          {/* Mobile Blogs Link */}
          <Link href={"/blogs"} passHref className="md:hidden">
            <PrimaryButton title={"Blogs"} />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

export default NavBar;
