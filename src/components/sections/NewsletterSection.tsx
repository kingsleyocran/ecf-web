// components/NewsletterForm.tsx
import { useState } from "react";
import PrimaryButton from "../button/PrimaryButton";
import SuccessToast from "../toast/SuccessToast";
import ErrorToast from "../toast/ErrorToast";
import Image from "next/image";
import { useTranslation } from "next-i18next";

function NewsletterForm() {
  const { t } = useTranslation("common");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, firstName, lastName }),
    });

    const result = await res.json();
    if (res.ok) {
      setStatus("success");
      SuccessToast({ message: t("newsletter.successMessage") });
      setEmail("");
      setFirstName("");
      setLastName("");
    } else {
      setStatus("error");
      ErrorToast({
        message: result.error || t("newsletter.errorMessage"),
      });
    }
  };

  return (
    <form onSubmit={subscribe} className="space-y-2 flex flex-col items-start">
      <h6 className="secondarybold text-[#E0C759] text-bold-2xl md:text-start">
        {t("newsletter.heading")}
      </h6>
      <p className="text-normal-base text-white pb-[10px]">
        {t("newsletter.description")}
      </p>
      <input
        type="text"
        placeholder={t("newsletter.firstName")}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        className="text-input"
      />
      <input
        type="text"
        placeholder={t("newsletter.lastName")}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        className="text-input"
      />
      <input
        type="email"
        placeholder={t("newsletter.email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="text-input"
      />
      <div className="h-[0px]"></div>
      <PrimaryButton
        isWide={false}
        title={t("newsletter.subscribe")}
        type="submit"
        isLoading={status === "loading"}
        variant="yellow-light"
      />
    </form>
  );
}

export { NewsletterForm };

function NewsletterSection() {
  return (
    <section className="w-full flex flex-col my-6 md:my-20">
      {/* Content */}
      <div className=" flex flex-row justify-between w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 ">
        <div className="flex flex-col md:flex-row w-full bg-[#025C7F] overflow-hidden rounded-2xl md:rounded-[40px]">
          <div className="basis-1/2 relative  rounded-2xl md:rounded-[40px] w-full h-full flex flex-col items-center justify-center">
            <Image
              src="/assets/images/test-image.png"
              alt="Newsletter"
              fill
              style={{ objectFit: "cover" }}
              priority
              className="w-full h-auto rounded-2xl md:rounded-[40px]"
            />
          </div>

          <div className="basis-1/2 p-6 md:p-12">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsletterSection;
