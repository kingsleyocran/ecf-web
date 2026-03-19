"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "next-i18next";

const presetAmounts = [25, 50, 100, 250, 500];

function DonateTiersSection() {
  const { t } = useTranslation("donate");
  const [selected, setSelected] = useState<number | null>(100);
  const [custom, setCustom] = useState("");

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const activeAmount = custom ? Number(custom) : selected;

  const benefits = t("tiers.benefits", { returnObjects: true }) as string[];

  return (
    <section
      id="donate-tiers"
      className="w-full py-16 md:py-24 bg-[#034D6B]"
    >
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left — text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:basis-5/12 flex flex-col gap-6"
          >
            <p className="text-[#E0C759]/80 text-sm md:text-base font-medium tracking-widest uppercase">
              {t("tiers.label")}
            </p>
            <h2 className="text-bold-2xl text-white">
              {t("tiers.heading")}
            </h2>
            <p className="text-white/70 text-normal-base leading-relaxed">
              {t("tiers.description")}
            </p>

            <div className="flex flex-col gap-3 mt-4">
              {benefits.map((point, i) => (
                <div key={i} className="flex flex-row items-start gap-3">
                  <span className="mt-1 h-4 w-4 flex-shrink-0 rounded-full bg-[#E0C759]" />
                  <p className="text-white/80 text-normal-base">{point}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — donation form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="lg:basis-7/12 w-full bg-[#FCFAF4] rounded-3xl p-6 md:p-10 flex flex-col gap-6"
          >
            {/* Preset amounts */}
            <div>
              <p className="text-[#025C7F] secondarybold text-sm tracking-widest uppercase mb-3">
                {t("tiers.selectAmount")}
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 md:gap-3">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => {
                      setSelected(amount);
                      setCustom("");
                    }}
                    className={`rounded-2xl py-3 primarybold text-base md:text-lg transition-all duration-200
                      ${
                        selected === amount && !custom
                          ? "bg-[#025C7F] text-white shadow-md"
                          : "bg-white border-2 border-[#025C7F]/20 text-[#025C7F] hover:border-[#025C7F]/60"
                      }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom amount */}
            <div>
              <p className="text-[#025C7F] secondarybold text-sm tracking-widest uppercase mb-3">
                {t("tiers.customAmount")}
              </p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#025C7F] primarybold text-lg">
                  $
                </span>
                <input
                  type="number"
                  min="1"
                  placeholder="0"
                  value={custom}
                  onChange={(e) => {
                    setCustom(e.target.value);
                    setSelected(null);
                  }}
                  className="w-full pl-8 pr-4 py-3 rounded-2xl border-2 border-[#025C7F]/20 focus:border-[#025C7F]
                    outline-none text-[#025C7F] primarybold text-lg bg-white transition-colors duration-200"
                />
              </div>
            </div>

            {/* Summary + CTA */}
            <div className="flex flex-col gap-4 pt-2 border-t border-[#025C7F]/10">
              {activeAmount && activeAmount > 0 && (
                <p className="text-[#025C7F]/70 text-normal-base">
                  {t("tiers.donating")}{" "}
                  <span className="text-[#025C7F] primarybold">
                    ${activeAmount}
                  </span>{" "}
                  {t("tiers.oneTimeGift")}
                </p>
              )}

              <button
                type="button"
                disabled={!activeAmount || activeAmount <= 0}
                className="w-full bg-[#0182B5] hover:bg-[#4BB0D9]/90 text-white primarybold
                  rounded-[20px] py-4 text-base md:text-lg transition-all duration-200
                  disabled:opacity-40 disabled:pointer-events-none shadow-md"
              >
                {activeAmount && activeAmount > 0
                  ? t("tiers.donateCta", { amount: activeAmount })
                  : t("tiers.selectAnAmount")}
              </button>

              <p className="text-center text-black/40 text-sm">
                {t("tiers.securePayment")}{" "}
                <a
                  href="mailto:hello@ecfrontiers.org"
                  className="underline hover:text-[#025C7F] transition-colors"
                >
                  hello@ecfrontiers.org
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default DonateTiersSection;
