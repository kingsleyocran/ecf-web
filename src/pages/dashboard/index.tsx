import type { NextPage } from "next";
import { useState, useEffect } from "react";
import CustomHead from "@/components/layout/CustomHead";
import NavigationAnimation from "@/components/animation/navigationAnimation/Stairs";
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginSection from "@/components/dashboard-components/components/sections/LoginSection";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props {
  metaDataTag: any;
  jsonLd: any;
}

export async function getServerSideProps(context: any) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
      metaDataTag: null,
      jsonLd: null,
    },
  };
}

const DashboardLogin: NextPage<Props> = ({ metaDataTag, jsonLd }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
        <Header />

        <div className="h-[100vh] flex flex-col">
          <div className="flex-1">
            <LoginSection />
          </div>

          <div className="flex-none pt-[200px]">
            <Footer />
          </div>
        </div>
    </>
  );
};

export default DashboardLogin;
