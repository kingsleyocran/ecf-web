import { getServerSideSitemapLegacy, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";
import { getDBInfoSitemap } from "@/backend/firebase/db/_dbInfo";
import {
  DBInfoSiteMapSchema,
  ResponseDBInfoSiteMapSchema,
} from "@/backend/models/_dbInfo";
import { ResponseIndicator } from "@/backend/models/_shared";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let dbInfoSitemap = null;
  const [data, status] = await getDBInfoSitemap();
  if (data !== undefined) {
    if (status === ResponseIndicator.SUCCESS) {
      // Convert date fields to strings
      dbInfoSitemap = (data as ResponseDBInfoSiteMapSchema)
        .data as DBInfoSiteMapSchema;
    }
  }

  const lastmod = new Date().toISOString();

  const makeFields = (ids: string[] | undefined, path: string): ISitemapField[] =>
    (ids ?? []).map((id) => ({
      loc: `https://ecfrontiers.org/${path}/${id}`,
      lastmod,
      changefreq: "daily" as const,
      priority: 0.7,
    }));

  const fields: ISitemapField[] = [
    ...makeFields(dbInfoSitemap?.eventIDs,      "events"),
    ...makeFields(dbInfoSitemap?.reportIDs,     "resources/reports"),
    ...makeFields(dbInfoSitemap?.opedIDs,       "resources/opeds"),
    ...makeFields(dbInfoSitemap?.articleIDs,    "resources/hub"),
    ...makeFields(dbInfoSitemap?.newsletterIDs, "resources/newsletters"),
  ];

  return getServerSideSitemapLegacy(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}