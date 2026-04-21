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

  const blogSitemapFields: ISitemapField[] = dbInfoSitemap!.blogIDs.map(
    (b: string) => ({
      loc: `https://ecfrontiers.org/blogs/${b}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    })
  );
  
  return getServerSideSitemapLegacy(ctx, [
    ...blogSitemapFields,
  ]);
};

// Default export to prevent next.js errors
export default function Sitemap() {}