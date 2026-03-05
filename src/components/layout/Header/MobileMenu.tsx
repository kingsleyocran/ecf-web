import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { navLinks } from "@/utils/content";
import Link from "next/link";
import ArrowRightIcon from "../../../../public/assets/icons/menu_arrow_right.svg";
import CloseIcon from "../../../../public/assets/icons/close.svg";
import PrimaryButton from "@/components/button/PrimaryButton";

export default function MobileMenu() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const arrow = (
    <ArrowRightIcon width="13" height="18" viewBox="0 0 13 25" fill="#D64D27" />
  );

  return (
    <>
      <button
        onClick={openModal}
        type="button"
        className="md:hidden text-black text-base md:text-sm lg:text-base tracking-[0px] py-2 rounded-full"
      >
        <PrimaryButton title="Menu" />
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                <Dialog.Panel className="secondarybold text-[#61270A] w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <div className="grid grid-col-1">
                    {/* Title */}
                    <div className="flex flex-row items-center justify-end text-xl md:text-base lg:text-base tracking-[0px] pl-8 pr-5 py-4 font-bold">
                      <button
                        onClick={closeModal}
                        type="button"
                        className="h-[40px] w-[40px] flex flex-col items-center justify-center bg-[#FFB12B] border-[#5C382B] rounded-full border-2 border-b-[6px]  active:border-b-2"
                      >
                        <CloseIcon
                          width="16"
                          height="16"
                          viewBox="0 0 21 21"
                          fill="#5C382B"
                        />
                      </button>
                    </div>

                    {/* For Home */}
                    <button onClick={closeModal} type="button">
                      <Link
                        className="flex flex-row items-center justify-between text-xl md:text-base
                        lg:text-base tracking-[0px] px-8 py-5 active:scale-95"
                        href={"/"}
                        passHref
                      >
                        Home
                        {arrow}
                      </Link>
                    </button>

                    {/* Navigation Links */}
                    {navLinks.slice(0).map((navlink, idx) =>
                      navlink.subPages ? (
                        <div key={idx}>
                          <div className="px-8 pt-5 pb-2 text-xs tracking-[4px] uppercase text-[#61270A]/40 font-semibold">
                            {navlink.title}
                          </div>
                          {navlink.subPages.map((subPage, subIdx) => (
                            <button key={subIdx} onClick={closeModal} type="button" className="w-full">
                              <Link
                                className="flex flex-row items-center justify-between text-base
                                tracking-[0px] pl-12 pr-8 py-4 active:scale-95
                                active:bg-th-menu-highlight-secondary"
                                href={subPage.href}
                                passHref
                              >
                                {subPage.title}
                                {arrow}
                              </Link>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <button key={idx} onClick={closeModal} type="button">
                          <Link
                            className="flex flex-row items-center justify-between text-xl
                            md:text-base lg:text-base tracking-[0px] px-8 py-5 active:scale-95
                            active:bg-th-menu-highlight-secondary  hover:border-th-stroke-primary"
                            href={navlink.href}
                            passHref
                          >
                            {navlink.title}
                            {arrow}
                          </Link>
                        </button>
                      )
                    )}

                    {/* CTA Button */}
                    {/* <Link
                      href={"/get-involved"}
                      passHref
                      className="w-full flex flex-row items-center justify-between text-xl
                      md:text-base lg:text-base tracking-[0px] px-8 py-5 active:scale-95"
                    >
                      <PrimaryButton isWide title="Donate" variant="yellow-brown"/>
                    </Link> */}
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
