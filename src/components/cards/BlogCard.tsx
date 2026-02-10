import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogSchema } from "@/backend/models/blogs";
import PrimaryButton from "@/components/button/PrimaryButton";
import { convertDateTime } from "@/utils/dayjs_functions";

type BlogCardProps = {
  blog: BlogSchema;
};

// Format blog type for display
const formatBlogType = (type: string) => {
  // Convert enum key (e.g., "NEWS") to readable format
  return type
    .replace(/([A-Z])/g, " $1")
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function BlogCard({ blog }: BlogCardProps) {


  // HomeHeroSection style (compact)
  return (
    <Link
      href={`/blogs/${blog.id}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      {/* Blog Image */}
      {blog.imgUrl && (
        <div className="relative w-full h-48 md:h-64 overflow-hidden bg-neutral-200">
          <Image
            src={blog.imgUrl}
            alt={blog.name}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Blog Content */}
      <div className="flex flex-col gap-3 p-6">
        {/* Blog Type */}
        {blog.type && (
          <span className="text-normal-sm text-[#024D6B] uppercase tracking-wider">
            {formatBlogType(blog.type)}
          </span>
        )}

        {/* Blog Title */}
        <h3 className="text-bold-lg text-[#024D6B] group-hover:text-[#024D6B]/80 transition-colors">
          {blog.name}
        </h3>

        {/* Blog Description */}
        <p className="text-normal-base text-[#535353] line-clamp-3">
          {blog.description}
        </p>

        {/* Blog Meta */}
        <div className="flex flex-row items-center justify-between pt-2 border-t border-neutral-200">
          <span className="text-normal-sm text-[#535353]">{blog.author}</span>
          <span className="text-normal-sm text-[#535353]">
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}
