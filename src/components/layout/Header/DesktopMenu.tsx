import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import ArrowDownIcon from "../../../../public/assets/icons/menu_arrow_down.svg";
import ArrowRightIcon from "../../../../public/assets/icons/menu_arrow_right.svg";
import { useRouter } from "next/router";
import { NavLink } from "@/utils/content";

export default function DesktopMenu({ navlink }: { navlink: NavLink }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsPopoverOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsPopoverOpen(false);
    }, 200);
  };

  return (
    <div
      className=""
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Popover className="relative">
        {({ open }) => (
          <>
            <PopoverButton
              className={`${!isPopoverOpen ? "" : "bg-[#FFB12B]/20"}
                flex flex-row secondarybold text-th-text-primary paragraph-text-small tracking-[0px]
                  rounded-full items-center gap-2 px-6 py-2 ring-transparent border-0 outline-none`}
              onClick={() => router.push(navlink.href)}
            >
              <p className="line-clamp-1">{navlink.title}</p>
              <ArrowDownIcon width="13" height="7" viewBox="0 0 13 7" />
            </PopoverButton>

            <Transition
              as={Fragment}
              show={isPopoverOpen}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel
                className="border-2 border-b-[6px] border-l-[6px] border-[#5C382B]
              rounded-2xl absolute left-1/2 z-10 mt-3 w-500 grid grid-cols-1 bg-[#FCFAF4]
              -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl overflow-hidden"
              >
                {navlink.subPages?.map(
                  (link: { href: string; title: string }, idx: number) => {
                    return (
                      <DesktopMenuLinkButton
                        key={idx}
                        navlink={navlink}
                        idx={idx}
                        link={link}
                      />
                    );
                  }
                )}
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

function DesktopMenuLinkButton({
  navlink,
  idx,
  link,
}: {
  idx: React.Key;
  navlink: NavLink;
  link: { href: string; title: string };
}) {
  const navigateToPage = () => {
    window.location.href = `${navlink.href}/${link.href}`;
  };

  return (
    <button key={idx} type="button" onClick={() => navigateToPage()}>
      <div
        className={`secondarybold text-normal-base transition-all duration-200 text-black
          hover:text-white fill-[#FFB12B] hover:fill-white flex flex-row items-center
          justify-between  tracking-[0px] px-4 py-4 hover:bg-[#D64D27]`}
      >
        {link.title}
        <ArrowRightIcon width="13" height="10" viewBox="0 0 13 25" />
      </div>
    </button>
  );
}
