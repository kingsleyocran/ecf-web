import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";

import DropdownIcon from "../../../../../../public/assets/dashboard_assets/dropdown.svg";

export default function DashboardDropdown({
  limitData,
  onLimitChange,
}: {
  limitData: number;
  onLimitChange: (value: number) => void;
}) {
  const menuItems = [100, 75, 50, 24];
  const [limitVal, setLimitVal] = useState<number>(limitData);

  useEffect(() => {
    setLimitVal(limitData);
  }, [limitData]);

  return (
    <div className="">
      <Menu as="div" className="">
        <div>
          <MenuButton className="flex flex-row gap-1 items-center justify-between px-2 text-sm text-white bg-neutral-800 py-1 rounded-lg w-[70px]">
            {limitVal} <DropdownIcon />
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems
            className="absolute  mt-2 w-[70px] origin-top-left -translate-y-full -top-[13px]
          divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none"
          >
            <div className="px-1 py-1 ">
              {menuItems.map((item, idx) => (
                <MenuItem key={idx}>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        setLimitVal(item);
                        onLimitChange(item);
                      }}
                      className={`${
                        active ? "bg-neutral-200 text-black" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {item}
                    </button>
                  )}
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}
