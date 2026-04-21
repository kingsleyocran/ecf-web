import CustomHead from "@/components/layout/CustomHead";
import NavigationAnimation from "@/components/animation/navigationAnimation/Stairs";
import React from "react";
import Header from "@/components/layout/Header";
import PageEmptySection from "@/components/layout/PageEmptySection";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../next-i18next.config";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"], nextI18NextConfig)),
    },
  };
}

export default function PageEmpty() {
  return (
    <>
      <Header />

      <div className="h-[100vh] flex flex-col">
        <div className="flex-1">
          <PageEmptySection />
        </div>
      </div>
    </>
  );
}


