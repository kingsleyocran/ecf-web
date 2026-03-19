import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { useTranslation } from "next-i18next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { cb } from "react-syntax-highlighter/dist/cjs/styles/prism";
import TurndownService from "turndown";
import { CareerSchema } from "@/backend/models/careers";

function CareerPage({ career }: { career: CareerSchema }) {
  const { t } = useTranslation("careers");
  const compRef = useRef<HTMLDivElement>(null);

  const turndownService = new TurndownService();
  turndownService.keep(["iframe"]);
  turndownService.addRule("codeBlock", {
    filter: ["pre"],
    replacement: function (content) {
      return `\n\`\`\`\n${content}\n\`\`\`\n`;
    },
  });

  function convertToMD(content: string) {
    if (!content || typeof content !== "string") return "";
    return turndownService.turndown(content);
  }

  const applyHref = career.applyUrl || "mailto:hello@ecfrontiers.org";

  return (
    <div ref={compRef} className="pt-10 pb-[200px] bg-white min-h-screen">
      <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12 lg:px-16 pt-14 md:py-14 flex flex-col gap-8">

        {/* Hero: badges + title */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex flex-wrap gap-2 items-center justify-center">
            <span className="px-3 py-1 rounded-full bg-[#034D6B] text-white text-xs primarybold tracking-wide">
              {career.type}
            </span>
            <span className="text-black/40 text-xs">{career.location}</span>
          </div>
          <h1 className="text-bold-2xl text-[#034D6B] secondarybold">
            {career.title}
          </h1>
          <p className="text-normal-base text-black/60 max-w-xl">
            {career.description}
          </p>
        </div>

        {/* Image */}
        {career.imgUrl && (
          <div className="relative w-full h-[280px] md:h-[400px] rounded-2xl overflow-hidden">
            <Image
              src={career.imgUrl}
              alt={career.title}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        )}

        {/* Body content */}
        {career.content && (
          <div
            className="markdown-content relative w-full secondarynormal break-words text-normal-base
              text-black/80 pb-12"
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
                p: ({ node, ...props }) => (
                  <p className="mb-6 break-words" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong style={{ fontWeight: "bold" }} {...props} />
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-12 max-w-full">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-12 max-w-full">{children}</ol>
                ),
                li: ({ children }) => <li className="mb-2">{children}</li>,
                a: ({ href, children }) => {
                  if (href && href.startsWith("http")) {
                    return (
                      <Link
                        className="text-normal-base underline font-bold text-[#034D6B]"
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
                      style={cb}
                      customStyle={{
                        marginTop: "10px",
                        marginBottom: "30px",
                        borderRadius: "10px",
                      }}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-gray-100 p-1.5 rounded-md break-words" {...props}>
                      {children}
                    </code>
                  );
                },
                blockquote: ({ children }) => (
                  <div className="w-full bg-gray-50 px-8 pt-8 pb-2 rounded-lg mb-6 border-l-[4px] border-[#E0C759]">
                    <blockquote className="text-normal-base">{children}</blockquote>
                  </div>
                ),
              }}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw as any]}
            >
              {convertToMD(career.content)}
            </Markdown>
          </div>
        )}

        {/* Apply button */}
        <div className="flex justify-center">
          <Link
            href={applyHref}
            target={career.applyUrl ? "_blank" : undefined}
            rel={career.applyUrl ? "noopener noreferrer" : undefined}
            className="px-8 py-4 rounded-full bg-[#034D6B] text-white primarybold text-normal-base
              hover:bg-[#023d57] transition-colors duration-200"
          >
            {t("applyNow")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CareerPage;
