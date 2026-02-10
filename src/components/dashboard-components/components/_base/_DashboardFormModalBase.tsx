import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { forwardRef, ReactNode, useImperativeHandle } from "react";
import { Fragment, useState } from "react";
import CloseIcon from "../../../../../public/assets/dashboard_assets/close.svg";

type Props = {
  buttonTitle?: string;
  children: ReactNode;
  modalSize?: "medium" | "large";
};

export interface _DashboardFormModalBaseRef {
  closeModal: () => void;
}

const _DashboardFormModalBase = forwardRef<_DashboardFormModalBaseRef, Props>(
  function ({ buttonTitle = "Edit", children, modalSize = "medium" }, ref) {
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
      setIsOpen(false);
    }

    function openModal() {
      setIsOpen(true);
    }

    useImperativeHandle(ref, () => ({
      closeModal,
    }));

    return (
      <>
        <div className="">
          <button
            type="button"
            onClick={openModal}
            className="text-xs bg-neutral-700 text-white py-2 px-5 rounded-full"
          >
            {buttonTitle}
          </button>
        </div>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-[99]" onClose={closeModal}>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/40" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center  text-center">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel
                    
                    className={`${
                      modalSize !== "large" ? "w-full max-w-3xl" : "!w-[98vw]"
                    }  transform overflow-hidden rounded-2xl
                bg-white text-left align-middle shadow-xl transition-all`}
                  >
                    {/* Header */}
                    <DialogTitle>
                      <div className="relative h-[60px] md:h-[50px] w-full p-3 flex flex-row justify-between items-center">
                        <div></div>
                        <button
                          className="bg-neutral-600 p-3 md:p-2 rounded-full"
                          type="button"
                          onClick={closeModal}
                        >
                          <CloseIcon
                            width="10"
                            height="10"
                            viewBox="0 0 27.1 27.1"
                          />
                        </button>
                      </div>
                    </DialogTitle>

                    <div className="h-[90vh]">{children}</div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }
);

_DashboardFormModalBase.displayName = "_DashboardFormModalBase";

export default _DashboardFormModalBase;
