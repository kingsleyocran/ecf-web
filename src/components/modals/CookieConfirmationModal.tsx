import {
  Transition,
} from "@headlessui/react";
import { Fragment, useState } from "react";

export default function CookieConfirmationModal() {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="relative transition-all duration-200">
      <Transition
        appear
        show={isOpen}
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="fixed bottom-6 right-6 z-10">
          <div
            className="flex flex-row gap-4 w-full max-w-md transform overflow-hidden
              rounded-2xl bg-th-theme-alternate p-8 text-left align-middle shadow-xl
              transition-all"
          >
            <p className="text-th-background paragraph-text-small ">
              We use third party cookies in order to personalise your site
              expierence.
            </p>

            <button
              type="button"
              className="inline-flex justify-center border border-transparent text-th-text-primary
                      px-6 py-3 text-sm font-medium bg-th-background focus:outline-none rounded-full"
              onClick={closeModal}
            >
              OK!
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
}
