import React from "react";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { cb } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "next-themes";
import Link from "next/link";
import rehypeRaw from "rehype-raw";
import { BlogSchema } from "@/backend/models/blogs";
import { convertDateTime } from "@/utils/dayjs_functions";
import TurndownService from "turndown";

// turndownService.addRule("preserveImg", {
//   filter: "img",
//   replacement: function (content, node) {
//     return (node as HTMLElement).outerHTML;
//   },
// });

function BlogArea({ compRef, blog }: { compRef: any; blog: BlogSchema }) {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  
  const turndownService = new TurndownService();
  turndownService.keep(["iframe"]);
  // Custom rule for code blocks
  turndownService.addRule("codeBlock", {
    filter: ["pre"],
    replacement: function (content) {
      return `\n\`\`\`\n${content}\n\`\`\`\n`;
    },
  });
  function convertToMD(content: string) {
    if (!content || typeof content !== "string") {
      console.log("Invalid content provided to convertToMD:", content);
      return "";
    }
    console.log(turndownService.turndown(content));
    return turndownService.turndown(content);
  }

  console.log(blog);
  return (
    <div ref={compRef} className="pt-10 transition-all duration-200 pb-[200px]">
      {/* Blog Title and Tags */}
      <div
        className={`w-full flex flex-col-reverse lg:flex-row px-6 md:px-12 lg:px-16 pt-14 md:py-14
                   max-w-[1000px] lg:mx-auto `}
        onClick={() => {}}
      >
        <div className="lg:ml-4 flex-1 relative w-full overflow-hidden lg:px-4 flex flex-col h-full gap-6 md:gap-10">
          {/* Blog Image */}
          {blog.imgUrl && (
            <div className="h-250 md:h-500 w-full relative image-shadow rounded-[6px]">
              <Image
                src={blog.imgUrl}
                alt={blog.name}
                fill
                style={{ objectFit: "cover", borderRadius: "6px" }}
                priority
              />
            </div>
          )}

          {/* Title */}
          <div
            className={`flex flex-col transition-all duration-200
              h-full w-full relative gap-2 md:gap-12 lg:gap-16`}
          >
            <div className="flex flex-col items-center justify-between  gap-4">
              {/* Title */}
              <h1 className="text-4xl  lg:text-5xl text-center cursor-text text-[#E0C759] secondarybold">
                {blog.name}
              </h1>

              <div className="flex flex-row gap-6">
                {/* Date */}
                <div className="flex flex-row items-center gap-2">
                  <p className="secondarynormal word-spacing-tight text-th-text-secondary">
                    {convertDateTime(blog.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Context and Body*/}
          <div
            className={`w-full flex flex-col items-start transition-all duration-200
                   h-full relative`}
          >
            {/* Content */}
            <div
              className={`markdown-content relative w-full secondarynormal break-words cursor-text text-normal-base word-spacing-tight
                text-th-text-primary pb-24`}
            >
              <Markdown
                components={{
                  h3: ({ node, ...props }) => (
                    <h3
                      className="text-3xl md:text-4xl secondarybold mb-4 mt-20 text-[#024D6B]"
                      {...props}
                    />
                  ),
                  h4: ({ node, ...props }) => (
                    <h4
                      className="text-2xl md:text-3xl secondarybold mb-2 mt-8 text-[#4BB0D9]"
                      {...props}
                    />
                  ),
                  h5: ({ node, ...props }) => (
                    <h5
                      className="text-xl md:text-2xl secondarybold mb-2 mt-5 text-[#E0C759]"
                      {...props}
                    />
                  ),
                  h6: ({ node, ...props }) => (
                    <h5
                      className="text-lg md:text-xl secondarybold mb-2 mt-5 text-[#666666]"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p className=" mb-6 break-words" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong style={{ fontWeight: "bold" }} {...props} />
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-12 max-w-full">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-12 max-w-full">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => <li className="mb-2"> {children}</li>,
                  a: ({ href, children }) => {
                    if (href && href.startsWith("http")) {
                      // External link
                      return (
                        <Link
                          className="text-normal-base underline font-bold text-th-accent-medium"
                          href={href}
                          passHref
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {children}
                        </Link>
                      );
                    }
                    if (href) {
                      // Internal link
                      return (
                        <Link href={href} passHref>
                          <a>{children}</a>
                        </Link>
                      );
                    }
                  },
                  code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <SyntaxHighlighter
                        language={match[1]}
                        PreTag="div"
                        style={currentTheme === "dark" ? cb : cb} // oneLight}
                        customStyle={{
                          marginTop: "10px",
                          marginBottom: "30px",
                          background: "var(--menu-highlight)",
                          borderRadius: "10px",
                          overflowWrap: "break-word",
                        }}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code
                        className={
                          "bg-th-menu-highlight p-1.5 rounded-md break-words"
                        }
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  table: ({ children }) => (
                    <table className="w-full mb-8 table-auto">{children}</table>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-th-menu-highlight primarymedium">
                      {children}
                    </thead>
                  ),
                  tbody: ({ children }) => (
                    <tbody className="bg-background">{children}</tbody>
                  ),
                  tr: ({ children }) => (
                    <tr className="border-none">{children}</tr>
                  ),
                  th: ({ children }) => (
                    <th className="border-[0.5px] border-th-stroke-secondary text-start p-[10px]">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border-[0.5px] border-th-stroke-secondary text-start p-[10px]">
                      {children}
                    </td>
                  ),
                  img: ({ src, alt }) => {
                    const isBase64 = src?.startsWith("data:image");
                    console.log(isBase64, src, alt);
                    // Use Next.js Image for non-base64 images, fallback to img for base64
                    if (isBase64 || !src) {
                      return (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={src}
                          alt={alt || "Blog"}
                          style={{
                            objectFit: "contain",
                            objectPosition: "center",
                            maxWidth: "100%",
                            display: "block",
                            margin: "0 auto",
                          }}
                        />
                      );
                    }
                    return (
                      <div className="relative w-full h-[400px] my-6">
                        <Image
                          src={src}
                          alt={alt || "Blog"}
                          fill
                          style={{
                            objectFit: "contain",
                            objectPosition: "center",
                          }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                        />
                      </div>
                    );
                  },
                  em: ({ children }) => (
                    <em className="underline">{children}</em>
                  ),
                  blockquote: ({ children }) => (
                    <div
                      className="w-full bg-th-menu-highlight px-8 pt-8 pb-2 rounded-lg mb-6
                  border-l-[4px] border-[#E0C759]"
                    >
                      <blockquote className="text-normal-base ">
                        {children}
                      </blockquote>
                    </div>
                  ),
                }}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw as any]}
              >
                {convertToMD(blog.content)}
              </Markdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogArea;
