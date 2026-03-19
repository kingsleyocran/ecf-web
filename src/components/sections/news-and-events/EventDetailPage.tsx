import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "next-i18next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import TurndownService from "turndown";
import { EventSchema } from "@/backend/models/events";

const typeBadgeColors: Record<string, string> = {
  virtual: "bg-[#5b3d8a] text-[#c7a8ff]",
  "in-person": "bg-[#034D6B] text-[#7dd4f0]",
  hybrid: "bg-[#1a6b3c] text-[#6ee7a8]",
};

function EventDetailPage({ event }: { event: EventSchema }) {
  const { t } = useTranslation("news-events");

  const typeLabels: Record<string, string> = {
    virtual: t("typeLabels.virtual"),
    "in-person": t("typeLabels.in-person"),
    hybrid: t("typeLabels.hybrid"),
  };

  const turndownService = new TurndownService();
  turndownService.keep(["iframe"]);
  turndownService.addRule("codeBlock", {
    filter: ["pre"],
    replacement: (content) => `\n\`\`\`\n${content}\n\`\`\`\n`,
  });

  function convertToMD(content: string) {
    if (!content || typeof content !== "string") return "";
    return turndownService.turndown(content);
  }

  const registerHref = event.registrationUrl || "mailto:hello@ecfrontiers.org";

  return (
    <div className="pt-10 pb-[200px] bg-white min-h-screen">
      <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12 lg:px-16 pt-14 md:py-14 flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex flex-wrap gap-2 items-center justify-center">
            <span className={`px-3 py-1 rounded-full text-xs primarybold tracking-wide ${typeBadgeColors[event.type]}`}>
              {typeLabels[event.type]}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#034D6B]/10 text-[#034D6B] text-xs primarybold">
              {event.date}
            </span>
            <span className="text-black/40 text-xs">{event.location}</span>
          </div>
          <h1 className="text-bold-2xl text-[#034D6B] secondarybold">{event.title}</h1>
          <p className="text-normal-base text-black/60 max-w-xl">{event.description}</p>
        </div>

        {/* Image */}
        {event.imgUrl && (
          <div className="relative w-full h-[280px] md:h-[400px] rounded-2xl overflow-hidden">
            <Image
              src={event.imgUrl}
              alt={event.title}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        )}

        {/* Body */}
        {event.content && (
          <div className="markdown-content w-full secondarynormal break-words text-normal-base text-black/80 pb-12">
            <Markdown
              components={{
                h3: ({ node, ...props }) => (
                  <h3 className="text-3xl md:text-4xl secondarybold mb-4 mt-20 text-[#024D6B]" {...props} />
                ),
                h4: ({ node, ...props }) => (
                  <h4 className="text-2xl md:text-3xl secondarybold mb-2 mt-8 text-[#4BB0D9]" {...props} />
                ),
                p: ({ node, ...props }) => <p className="mb-6 break-words" {...props} />,
                strong: ({ node, ...props }) => <strong style={{ fontWeight: "bold" }} {...props} />,
                ul: ({ children }) => <ul className="list-disc pl-12 max-w-full">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-12 max-w-full">{children}</ol>,
                li: ({ children }) => <li className="mb-2">{children}</li>,
                a: ({ href, children }) => {
                  if (href?.startsWith("http")) {
                    return (
                      <Link className="underline font-bold text-[#034D6B]" href={href} rel="noopener noreferrer" target="_blank">
                        {children}
                      </Link>
                    );
                  }
                  if (href) return <Link href={href}><a>{children}</a></Link>;
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
              {convertToMD(event.content)}
            </Markdown>
          </div>
        )}

        {/* Register button */}
        <div className="flex justify-center">
          <Link
            href={registerHref}
            target={event.registrationUrl ? "_blank" : undefined}
            rel={event.registrationUrl ? "noopener noreferrer" : undefined}
            className="px-8 py-4 rounded-full bg-[#034D6B] text-white primarybold text-normal-base
              hover:bg-[#023d57] transition-colors duration-200"
          >
            {t("events.registerNow")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;
