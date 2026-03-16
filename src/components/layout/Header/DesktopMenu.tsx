import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import ArrowDownIcon from "../../../../public/assets/icons/menu_arrow_down.svg";
import ArrowRightIcon from "../../../../public/assets/icons/menu_arrow_right.svg";
import { useRouter } from "next/router";
import { NavLink } from "@/utils/content";
import { useTranslation } from "next-i18next";

export default function DesktopMenu({ navlink }: { navlink: NavLink }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const { t } = useTranslation("common");

  const isActive = router.pathname.startsWith(navlink.href);

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
              className={`flex flex-row primarybold paragraph-text-small tracking-[0px]
                rounded-full items-center gap-2 px-4 lg:px-5 py-2 outline-none ring-transparent border-0 transition-all duration-200
                ${navlink.subPages?.length && !navlink.clickable ? "cursor-default" : "cursor-pointer"}
                ${
                  isActive
                    ? "text-[#E0C759] hover:text-[#E0C759]"
                    : "text-white hover:bg-white/20"
                }`}
              onClick={() => { if (!navlink.subPages?.length || navlink.clickable) router.push(navlink.href); }}
            >
              <p className="line-clamp-1">{t(navlink.tKey)}</p>
              <ArrowDownIcon
                width="13"
                height="7"
                fill="#E0C759"
                viewBox="0 0 13 7"
              />
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
                className="rounded-2xl absolute left-1/2 z-10 mt-3 w-max min-w-[220px] grid grid-cols-1 bg-[#a69442]
              -translate-x-1/2 transform overflow-hidden shadow-lg"
              >
                {navlink.subPages?.map(
                  (link, idx: number) => {
                    return (
                      <DesktopMenuLinkButton
                        key={idx}
                        navlink={navlink}
                        idx={idx}
                        link={link}
                      />
                    );
                  },
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
  link: { href: string; title: string; tKey: string };
}) {
  const { t } = useTranslation("common");

  const navigateToPage = () => {
    window.location.href = link.href;
  };

  return (
    <button key={idx} type="button" onClick={() => navigateToPage()}>
      <div
        className="secondarybold text-normal-base transition-all duration-200 text-white fill-white hover:bg-[#034D6B]/80 flex flex-row items-center justify-between tracking-[0px] px-4 py-4"
      >
        <span className="whitespace-nowrap">{t(link.tKey)}</span>
        <ArrowRightIcon width="13" height="10" viewBox="0 0 13 25" />
      </div>
    </button>
  );
}
