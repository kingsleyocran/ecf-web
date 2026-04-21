import type { NextPage } from "next";
import { useState, useEffect } from "react";
import CustomHead from "../../components/layout/CustomHead";
import ProtectedRoute from "../../context/ProtectedRoute";
import NavigationAnimation from "@/components/animation/navigationAnimation/Stairs";
import Header from "../../components/layout/Header";
import DashboardMain from "@/components/dashboard-components/components/sections/DashboardMain";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../../next-i18next.config";

interface Props {
  metaDataTag: any;
  jsonLd: any;
}

export async function getServerSideProps(context: any) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"], nextI18NextConfig)),
      metaDataTag: null,
      jsonLd: null,
    },
  };
}

const Dashboard: NextPage<Props> = ({ metaDataTag, jsonLd }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <ProtectedRoute>
        <DashboardMain />
    </ProtectedRoute>
  );
};

export default Dashboard;
