import PrimaryButton from "@/components/button/PrimaryButton";
import { homeContent } from "@/utils/content";
import React, { useEffect, useState } from "react";
import {NewsletterForm} from "../NewsletterSection";
import LogoSvg from "../../../../public/assets/brand/logo-1.svg";
import BackgroundSvg from "../../../../public/assets/brand/ECF back 1.svg";
import Link from "next/link";
import { socialLinks } from "@/utils/content";
import Image from "next/image";
import { BlogSchema, FilterBlogsSchema } from "@/backend/models/blogs";
import { filterBlogsApi } from "@/backend/firebase/db/api/blogs_api";
import { ResponseIndicator } from "@/backend/models/_shared";
import BlogCard from "@/components/cards/BlogCard";
import HomeECFInfoSection from "./HomeECFInfoSection";

function HomeHeroSection() {
  const [blogs, setBlogs] = useState<BlogSchema[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const filterData: FilterBlogsSchema = {
        limit: 6,
        startAfterDocQueue: [],
        orderBy: "createdAt",
        orderDirection: "desc",
      };

      const [data, status] = await filterBlogsApi(filterData);

      if (
        status === ResponseIndicator.SUCCESS &&
        data &&
        typeof data !== "string" &&
        !(data instanceof Error)
      ) {
        setBlogs(data.data);
      }
    };

    fetchBlogs();
  }, []);
  const blogCount = blogs.length;

  // Determine grid columns based on blog count
  const getGridColumns = () => {
    if (blogCount === 1) return "grid-cols-1";
    if (blogCount === 2) return "grid-cols-1 md:grid-cols-2";
    if (blogCount === 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

    // For even numbers, use 2 columns
    if (blogCount % 2 === 0) return "grid-cols-1 md:grid-cols-2";

    // For numbers divisible by 3, use 3 columns
    if (blogCount % 3 === 0) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

    // Default: 3 columns
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  };
  return (
    <section className="w-full ">
      <section className="bg-[#024D6B] w-full flex flex-col items-center justify-center">
        <div className="z-10 w-[60vw] h-[100vh]  absolute top-0 right-0 flex items-center justify-end">
          <BackgroundSvg
            width="831"
            height="1492"
            viewBox="0 0 831 1492"
            className="opacity-50 h-[1200px] w-[650px]"
          />
        </div>

        {/* Content */}
        <div className="md:h-[100vh] z-20 relative flex flex-row justify-between w-full max-w-[1300px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
          <div className="w-full flex md:flex-row flex-col items-center justify-center gap-12 md:gap-24">
            <div className="pt-24 md:mt-0 basis-1/2 gap-4 w-full h-full flex flex-col justify-center text-start max-w-[900px] mb-4">
              <div>
                {/* <div>
                  <LogoSvg
                    width="315"
                    height="159"
                    viewBox="0 0 315 159"
                    className="w-[220px]"
                  />
                </div> */}

                <h1
                  style={{ lineHeight: "1.2", letterSpacing: "0.02em" }}
                  className="text-bold-xl md:text-bold-2xl text-white/90 mb-4"
                >
                  Empowering African Voices in Climate Technologies
                </h1>
              </div>
              <p className="text-normal-base text-white/60 mb-4">
                Empowering African institutions and policymakers to drive
                Frontier Climate Technologies through inclusive, science-driven
                approaches. Stay connected for updates on research, capacity
                building, and opportunities to engage with FCTs including AI,
                CDR, and SRM.
              </p>

              {/* Socials */}
              <div className="flex flex-col gap-2">
                <p className="text-normal-base text-white/60">
                  Connect with us:
                </p>

                <div className="flex flex-row lg:gap-2 gap-3">
                  <Link href={socialLinks.linkedin} passHref legacyBehavior>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-[40px] w-[40px] inline-flex items-center justify-center rounded-xl"
                    >
                      <Image
                        src="/assets/socials/in.svg"
                        alt="linkedin icon"
                        width={20}
                        height={20}
                        priority
                      />
                    </a>
                  </Link>

                  <Link href={socialLinks.twitter} passHref legacyBehavior>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-[40px] w-[40px] inline-flex items-center justify-center rounded-xl"
                    >
                      <Image
                        src="/assets/socials/x.svg"
                        alt="twitter icon"
                        width={20}
                        height={20}
                        priority
                      />
                    </a>
                  </Link>

                  <Link href={socialLinks.instagram} passHref legacyBehavior>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-[40px] w-[40px] inline-flex items-center justify-center rounded-xl"
                    >
                      <Image
                        src="/assets/socials/ig.svg"
                        alt="instagram icon"
                        width={20}
                        height={20}
                        priority
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="basis-1/2 w-full h-full flex flex-col items-center justify-center">
              <div className="bg-white rounded-2xl md:rounded-[40px] p-6 md:p-12 w-full">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>

        {blogs.length > 0 && (
          <div className="pt-12 md:pt-0 z-20 w-full pb-12 md:pb-24">
            <div className="w-full max-w-[1300px] mx-auto px-4 md:px-8 lg:px-16">
              {/* Header */}
              <div className="mb-8 md:mb-12 flex flex-row items-center justify-between">
                <h2 className="text-section-header text-white mb-4">BLOGS</h2>

                <Link href={"/blogs"} passHref>
                  <PrimaryButton title={"See all"} />
                </Link>
              </div>

              {/* Blog Grid */}
              <div className={`grid ${getGridColumns()} gap-6 md:gap-8`}>
                {blogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ECF Info Section - Thematic Areas & Achievements */}
      <HomeECFInfoSection />
    </section>
  );
}

export default HomeHeroSection;
