import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import TurndownService from "turndown";

interface ContentDetailProps {
  title: string;
  author: string;
  publishedDate: string;
  imgUrl?: string | null;
  content: string;
  badge?: string;
}

function ContentDetailPage({ title, author, publishedDate, imgUrl, content, badge }: ContentDetailProps) {
  const turndownService = new TurndownService();
  turndownService.keep(["iframe"]);
  turndownService.addRule("codeBlock", {
    filter: ["pre"],
    replacement: (c) => `\n\`\`\`\n${c}\n\`\`\`\n`,
  });

  function convertToMD(html: string) {
    if (!html || typeof html !== "string") return "";
    return turndownService.turndown(html);
  }

  return (
    <div className="pt-10 pb-[200px] bg-white min-h-screen">
      <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12 lg:px-16 pt-14 md:py-14 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex flex-wrap gap-2 items-center justify-center">
            {badge && (
              <span className="px-3 py-1 rounded-full bg-[#034D6B]/10 text-[#034D6B] text-xs primarybold">
                {badge}
              </span>
            )}
            <span className="text-black/40 text-xs">{author}</span>
            <span className="text-black/30 text-xs">· {publishedDate}</span>
          </div>
          <h1 className="text-bold-2xl text-[#034D6B] secondarybold">{title}</h1>
        </div>

        {/* Image */}
        {imgUrl && (
          <div className="relative w-full h-[280px] md:h-[400px] rounded-2xl overflow-hidden">
            <Image src={imgUrl} alt={title} fill style={{ objectFit: "cover" }} priority />
          </div>
        )}

        {/* Body */}
        {content && (
          <div className="markdown-content w-full secondarynormal break-words text-normal-base text-black/80 pb-12">
            <Markdown
              components={{
                h3: ({ node, ...props }) => <h3 className="text-3xl md:text-4xl secondarybold mb-4 mt-20 text-[#024D6B]" {...props} />,
                h4: ({ node, ...props }) => <h4 className="text-2xl md:text-3xl secondarybold mb-2 mt-8 text-[#4BB0D9]" {...props} />,
                p: ({ node, ...props }) => <p className="mb-6 break-words" {...props} />,
                strong: ({ node, ...props }) => <strong style={{ fontWeight: "bold" }} {...props} />,
                ul: ({ children }) => <ul className="list-disc pl-12 max-w-full">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-12 max-w-full">{children}</ol>,
                li: ({ children }) => <li className="mb-2">{children}</li>,
                a: ({ href, children }) => {
                  if (href?.startsWith("http"))
                    return <Link className="underline font-bold text-[#034D6B]" href={href} rel="noopener noreferrer" target="_blank">{children}</Link>;
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
              {convertToMD(content)}
            </Markdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContentDetailPage;
