import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { navLinks, languages } from "@/utils/content";
import Link from "next/link";
import CloseIcon from "../../../../public/assets/icons/close.svg";
import HamburgerIcon from "../../../../public/assets/icons/hamburger.svg";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const { t } = useTranslation("common");
  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
    setExpandedIdx(null);
  }

  function toggleExpanded(idx: number) {
    setExpandedIdx((prev) => (prev === idx ? null : idx));
  }

  return (
    <>
      {/* Trigger — rounded bubble with "Menu" + hamburger icon */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        aria-label="Open menu"
        className="md:hidden flex items-center gap-2 px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25
          transition-colors duration-200 text-white primarybold text-sm"
      >
        <span>Menu</span>
        <HamburgerIcon width="20" height="20" viewBox="0 -960 960 960" fill="white" />
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
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center p-4 pt-12">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white text-left shadow-xl overflow-hidden">

                  {/* Header */}
                  <div className="flex items-center justify-between pl-6 pr-4 py-3 border-b border-gray-100">
                    <span className="text-[#024D6B] primarybold text-lg">Menu</span>
                    <button
                      onClick={closeModal}
                      type="button"
                      aria-label="Close menu"
                      className="h-[36px] w-[36px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
                    >
                      <CloseIcon width="14" height="14" viewBox="0 0 21 21" fill="#024D6B" />
                    </button>
                  </div>

                  {/* Home */}
                  <Link
                    href="/"
                    onClick={closeModal}
                    className="flex items-center justify-between text-[#024D6B] font-semibold
                      text-base px-6 py-4 active:bg-[#024D6B]/5 transition-colors duration-150"
                  >
                    {t("nav.home", "Home")}
                  </Link>

                  {/* Nav links — accordion for subPages */}
                  {navLinks.map((navlink, idx) =>
                    navlink.subPages ? (
                      <div key={idx} className="border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => toggleExpanded(idx)}
                          className="w-full flex items-center justify-between px-6 py-4 text-[#024D6B]
                            font-semibold text-base active:bg-[#024D6B]/5 transition-colors duration-150"
                        >
                          <span>{t(navlink.tKey)}</span>
                          <span
                            className={`text-[#024D6B]/40 text-sm transition-transform duration-200 ${
                              expandedIdx === idx ? "rotate-180" : ""
                            }`}
                          >
                            ▾
                          </span>
                        </button>

                        {/* Sublinks */}
                        {expandedIdx === idx && (
                          <div className="pb-2">
                            {navlink.clickable && (
                              <Link
                                href={navlink.href}
                                onClick={closeModal}
                                className="flex items-center justify-between pl-8 pr-6 py-3
                                  text-[#024D6B] font-semibold text-sm active:bg-[#024D6B]/5 transition-colors duration-150"
                              >
                                {t(navlink.tKey)}
                                <span className="text-[#024D6B]/30 text-xs">→</span>
                              </Link>
                            )}
                            {navlink.subPages.map((sub, subIdx) => (
                              <Link
                                key={subIdx}
                                href={sub.href}
                                onClick={closeModal}
                                className="flex items-center justify-between pl-8 pr-6 py-3
                                  text-[#024D6B]/70 text-sm active:bg-[#024D6B]/5 transition-colors duration-150"
                              >
                                {t(sub.tKey)}
                                <span className="text-[#024D6B]/30 text-xs">→</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        key={idx}
                        href={navlink.href}
                        onClick={closeModal}
                        className="flex items-center justify-between text-[#024D6B] font-semibold
                          text-base px-6 py-4 border-t border-gray-100 active:bg-[#024D6B]/5 transition-colors duration-150"
                      >
                        {t(navlink.tKey)}
                      </Link>
                    )
                  )}

                  {/* Language selector */}
                  <div className="border-t border-gray-100 px-6 py-4">
                    <p className="text-[#024D6B]/40 text-xs primarybold uppercase tracking-widest mb-3">
                      Language
                    </p>
                    <div className="flex flex-row gap-2 flex-wrap">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            router.push(router.asPath, router.asPath, { locale: lang.code });
                            closeModal();
                          }}
                          className={`px-4 py-2 rounded-full text-sm primarybold transition-colors duration-150
                            ${lang.code === router.locale
                              ? "bg-[#034D6B] text-white"
                              : "bg-[#034D6B]/8 text-[#034D6B] hover:bg-[#034D6B]/15"
                            }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Donate */}
                  <div className="border-t border-gray-100 p-4">
                    <Link
                      href="/donate"
                      onClick={closeModal}
                      className="flex items-center justify-center w-full py-3 bg-[#0182B5] hover:bg-[#4BB0D9]/90
                        text-white primarybold text-sm rounded-full transition-colors duration-200"
                    >
                      {t("nav.donate")}
                    </Link>
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
