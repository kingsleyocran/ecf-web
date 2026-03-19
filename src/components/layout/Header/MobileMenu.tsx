import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { navLinks } from "@/utils/content";
import Link from "next/link";
import ArrowRightIcon from "../../../../public/assets/icons/menu_arrow_right.svg";
import CloseIcon from "../../../../public/assets/icons/close.svg";
import MenuIcon from "../../../../public/assets/icons/menu.svg";
import { useTranslation } from "next-i18next";

export default function MobileMenu() {
  let [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("common");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const arrow = (
    <ArrowRightIcon width="13" height="18" viewBox="0 0 13 25" fill="#024D6B" />
  );

  return (
    <>
      <button
        onClick={openModal}
        type="button"
        aria-label="Open menu"
        className="md:hidden flex items-center justify-center h-[40px] w-[40px] rounded-lg hover:bg-white/20 transition-all duration-200"
      >
        <MenuIcon width="24" height="18" viewBox="0 0 26 20" fill="white" />
      </button>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[99]" onClose={closeModal}>
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed h-[100vh] inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center p-4 pt-12 text-center">
              {/* Dialog Panel */}
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <div className="grid grid-col-1">
                    {/* Close Button */}
                    <div className="flex flex-row items-center justify-between pl-6 pr-4 py-3 border-b border-gray-100">
                      <span className="text-[#024D6B] font-bold text-lg">Menu</span>
                      <button
                        onClick={closeModal}
                        type="button"
                        aria-label="Close menu"
                        className="h-[36px] w-[36px] flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
                      >
                        <CloseIcon
                          width="14"
                          height="14"
                          viewBox="0 0 21 21"
                          fill="#024D6B"
                        />
                      </button>
                    </div>

                    {/* Home */}
                    <button onClick={closeModal} type="button" className="w-full">
                      <Link
                        className="flex flex-row items-center justify-between text-[#024D6B] font-semibold
                        text-base tracking-[0px] px-6 py-4 active:bg-[#024D6B]/5 transition-colors duration-150"
                        href={"/"}
                        passHref
                      >
                        {t("nav.home", "Home")}
                        {arrow}
                      </Link>
                    </button>

                    {/* Navigation Links */}
                    {navLinks.map((navlink, idx) =>
                      navlink.subPages ? (
                        <div key={idx} className="border-t border-gray-100">
                          {/* Parent link as section header - clickable if it has its own page */}
                          {navlink.clickable ? (
                            <button onClick={closeModal} type="button" className="w-full">
                              <Link
                                className="flex flex-row items-center justify-between px-6 pt-4 pb-2
                                text-[#024D6B] font-bold text-xs tracking-[3px] uppercase"
                                href={navlink.href}
                                passHref
                              >
                                {t(navlink.tKey)}
                                {arrow}
                              </Link>
                            </button>
                          ) : (
                            <div className="px-6 pt-4 pb-2 text-[#024D6B]/40 font-bold text-xs tracking-[3px] uppercase">
                              {t(navlink.tKey)}
                            </div>
                          )}
                          {/* Sub-pages */}
                          {navlink.subPages.map((subPage, subIdx) => (
                            <button key={subIdx} onClick={closeModal} type="button" className="w-full">
                              <Link
                                className="flex flex-row items-center justify-between text-[#024D6B]/80 text-sm
                                tracking-[0px] pl-10 pr-6 py-3 active:bg-[#024D6B]/5 transition-colors duration-150"
                                href={subPage.href}
                                passHref
                              >
                                {t(subPage.tKey)}
                                {arrow}
                              </Link>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <button key={idx} onClick={closeModal} type="button" className="w-full border-t border-gray-100">
                          <Link
                            className="flex flex-row items-center justify-between text-[#024D6B] font-semibold
                            text-base tracking-[0px] px-6 py-4 active:bg-[#024D6B]/5 transition-colors duration-150"
                            href={navlink.href}
                            passHref
                          >
                            {t(navlink.tKey)}
                            {arrow}
                          </Link>
                        </button>
                      )
                    )}

                    {/* Donate Button */}
                    <div className="border-t border-gray-100 p-4">
                      <button onClick={closeModal} type="button" className="w-full">
                        <Link
                          className="flex items-center justify-center w-full py-3 bg-[#0182B5] hover:bg-[#4BB0D9]/90
                          text-white font-bold text-sm rounded-full transition-colors duration-200"
                          href={"/donate"}
                          passHref
                        >
                          {t("nav.donate")}
                        </Link>
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
