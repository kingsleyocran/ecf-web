import React, { useRef } from "react";
import Footer from "@/components/layout/Footer";
import CustomHead from "@/components/layout/CustomHead";
import Header from "@/components/layout/Header";
import { NextPage } from "next";
import { BlogSchema, ResponseBlogSchema } from "@/backend/models/blogs";
import { getBlogApi } from "@/backend/firebase/db/api/blogs_api";
import { ResponseIndicator } from "@/backend/models/_shared";
import BlogArea from "@/components/sections/blogs/BlogArea";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props {
  blog: BlogSchema;
  metaDataTag: any;
  jsonLd: any;
}

export async function getServerSideProps(context: any) {
  const { blogID } = context.query;
  const { locale } = context;

  let blogPageContent = null;
  const [data, status] = await getBlogApi(blogID);
  if (data !== undefined) {
    if (status === ResponseIndicator.SUCCESS) {
      blogPageContent = (data as ResponseBlogSchema).data as BlogSchema;
    }
  }

  function metaDataTagRes(blog: BlogSchema | null) {
    if (blog) {
      return {
        title: `${blog.name} | ECF`,
        authors: ["ECF"],
        description: blog.description,
        keywords: blog.name,
        openGraph: {
          site_name: "Emerging Climate Frontiers",
          title: `${blog.name} | ECF`,
          description: blog.description,
          type: "article",
          url: `https://www.ecfrontiers.org/blogs/${blog.id}`,
          publishedTime: blog.createdAt.toISOString(),
          modifiedTime: blog.updatedAt.toISOString(),
          authors: `https://www.ecfrontiers.org`,
          tags: blog.type,
          images: [
            {
              url: blog.imgUrl,
              width: 1024,
              height: 459,
              alt: blog.name,
              type: "image/png",
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          site: "@ecfrontiers",
          creator: "@ecfrontiers",
          title: `${blog.name} | ECF`,
          description: blog.description,
          images: [
            {
              url: blog.imgUrl,
              width: 1024,
              height: 459,
              alt: blog.name,
            },
          ],
        },
        alternates: {
          canonical: `https://www.ecfrontiers.org/blogs/${blog.id}`,
        },
      };
    }

    return null;
  }

  function jsonLdRes(blog: BlogSchema | null) {
    if (blog) {
      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://www.ecfrontiers.org/blogs/${blog.id}`,
        },
        headline: blog.name,
        description: blog.description,
        image: blog.imgUrl,
        dateCreated: blog.createdAt.toISOString(),
        datePublished: blog.createdAt.toISOString(),
        dateModified: blog.updatedAt.toISOString(),
        author: {
          "@type": "Organization",
          name: "ECF",
          url: `https://www.ecfrontiers.org`,
        },
        publisher: {
          "@type": "Organization",
          name: "ECF",
          logo: {
            "@type": "ImageObject",
            url: `https://www.ecfrontiers.org`,
          },
        },
        inLanguage: "en-US",
        isFamilyFriendly: "true",
      };
    }
    return null;
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
      blog: {
        ...blogPageContent,
        createdAt: blogPageContent?.createdAt.toISOString() ?? "",
        updatedAt: blogPageContent?.updatedAt.toISOString() ?? "",
      },
      metaDataTag: metaDataTagRes(blogPageContent),
      jsonLd: jsonLdRes(blogPageContent),
    },
  };
}

const Blog: NextPage<Props> = ({ blog, jsonLd, metaDataTag }) => {
  // Scroll Indicator
  const blogRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <CustomHead jsonLd={jsonLd} metaDataTag={metaDataTag} />

      {/* <NavigationAnimation>
      </NavigationAnimation> */}

      <Header />

      {/* Blog Area */}
      <BlogArea compRef={blogRef} blog={blog} />

      <Footer />
    </>
  );
};

export default Blog;
