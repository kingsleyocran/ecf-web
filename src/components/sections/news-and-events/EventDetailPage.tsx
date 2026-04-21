import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import TurndownService from "turndown";
import { EventSchema } from "@/backend/models/events";
import { formatEventDate, formatEventTime } from "@/utils/eventTimezones";

const typeBadgeColors: Record<string, string> = {
  virtual: "bg-[#034D6B] text-[#7dd4f0]",
  "in-person": "bg-[#034D6B] text-[#7dd4f0]",
  hybrid: "bg-[#1a6b3c] text-[#6ee7a8]",
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-[#034D6B]/50 text-sm primarybold w-24 shrink-0 pt-[2px] uppercase tracking-wider">
        {label}
      </span>
      <span className="text-[#034D6B] text-base secondarynormal leading-snug">{value}</span>
    </div>
  );
}

// ── Calendar link helpers ────────────────────────────────────────────────────

function toCalendarStamp(iso: string) {
  // "2026-04-12T13:00:00.000Z" → "20260412T130000Z"
  return iso.replace(/[-:]/g, "").split(".")[0] + "Z";
}

function buildDetails(event: EventSchema): string {
  const parts = [event.description];
  if (event.registrationUrl) parts.push(`Register: ${event.registrationUrl}`);
  if (event.virtualLink) parts.push(`Join link: ${event.virtualLink}`);
  return parts.join("\n\n");
}

function buildGoogleUrl(event: EventSchema, endIso: string) {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${toCalendarStamp(event.startDateTime!)}/${toCalendarStamp(endIso)}`,
    details: buildDetails(event),
    location: event.location,
  });
  return `https://www.google.com/calendar/render?${p.toString()}`;
}

function buildOutlookUrl(event: EventSchema, endIso: string) {
  const p = new URLSearchParams({
    subject: event.title,
    startdt: event.startDateTime!,
    enddt: endIso,
    body: buildDetails(event),
    location: event.location,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${p.toString()}`;
}

function buildYahooUrl(event: EventSchema, endIso: string) {
  const p = new URLSearchParams({
    v: "60",
    view: "d",
    type: "20",
    title: event.title,
    st: toCalendarStamp(event.startDateTime!),
    et: toCalendarStamp(endIso),
    desc: buildDetails(event),
    in_loc: event.location,
  });
  return `https://calendar.yahoo.com/?${p.toString()}`;
}

function downloadIcs(event: EventSchema, endIso: string) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Emerging Climate Frontiers//Event//EN",
    "BEGIN:VEVENT",
    `DTSTART:${toCalendarStamp(event.startDateTime!)}`,
    `DTEND:${toCalendarStamp(endIso)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${buildDetails(event).replace(/\n/g, "\\n")}`,
    `LOCATION:${event.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.title.replace(/\s+/g, "-").toLowerCase()}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Add to Calendar dropdown ─────────────────────────────────────────────────

const calendarOptions = [
  { label: "Google Calendar",  id: "google" },
  { label: "Apple Calendar",   id: "apple"  },
  { label: "Outlook",          id: "outlook" },
  { label: "Yahoo Calendar",   id: "yahoo"  },
];

function AddToCalendarDropdown({ event }: { event: EventSchema }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // +1 hour default end time
  const endIso = new Date(
    new Date(event.startDateTime!).getTime() + 60 * 60 * 1000
  ).toISOString();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleOption(id: string) {
    setOpen(false);
    if (id === "google")  window.open(buildGoogleUrl(event, endIso), "_blank");
    if (id === "outlook") window.open(buildOutlookUrl(event, endIso), "_blank");
    if (id === "yahoo")   window.open(buildYahooUrl(event, endIso), "_blank");
    if (id === "apple")   downloadIcs(event, endIso);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="px-8 py-4 rounded-full bg-[#034D6B] text-white primarybold
          text-normal-base hover:bg-[#023d57] transition-colors duration-200 flex items-center gap-2"
      >
        Add to Calendar
        <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-52 bg-white rounded-xl
          shadow-lg border border-neutral-100 overflow-hidden py-1">
          {calendarOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleOption(opt.id)}
              className="w-full text-left px-4 py-3 text-sm text-[#034D6B] secondarynormal
                hover:bg-[#034D6B]/5 transition-colors duration-150"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

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

  const hasStarted = event.startDateTime
    ? new Date() >= new Date(event.startDateTime)
    : false;

  const displayDate =
    event.startDateTime && event.timezone
      ? formatEventDate(event.startDateTime, event.timezone)
      : event.date;

  const displayTime =
    event.startDateTime && event.timezone
      ? formatEventTime(event.startDateTime, event.timezone)
      : null;

  return (
    <div className="w-full bg-white min-h-screen flex flex-col-reverse lg:flex-row-reverse  pt-[100px]">

      {/* ── LEFT: scrollable content ── */}
      <div className="flex-1 lg:max-w-[50%] px-6 md:px-12 lg:px-16  pb-32">

        {/* Back link */}
        {/* <Link
          href="/news-and-events/events"
          className="inline-flex items-center gap-2 text-[#034D6B]/50 text-xs primarybold tracking-widest uppercase hover:text-[#034D6B] transition-colors mb-10"
        >
          ← {t("events.label") || "Events"}
        </Link> */}

        {/* Mobile image — square, top of content */}
        {event.imgUrl && (
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-8 lg:hidden">
            <Image src={event.imgUrl} alt={event.title} fill style={{ objectFit: "cover" }} priority />
          </div>
        )}

        {/* Type + date badges */}
        <div className="flex flex-wrap gap-2 items-center mb-5">
          <span
            className={`px-3 py-1 rounded-full text-xs primarybold tracking-wide ${typeBadgeColors[event.type] || "bg-neutral-200 text-neutral-700"}`}
          >
            {typeLabels[event.type] || event.type}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#034D6B]/10 text-[#034D6B] text-xs primarybold">
            {event.date}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-bold-2xl md:text-bold-3xl text-[#034D6B] secondarybold leading-tight pb-6">
          {event.title}
        </h1>

        {/* Description */}
        <p className="text-normal-base text-black/55 leading-relaxed mb-8">
          {event.description}
        </p>

        {/* Info card */}
        <div className="flex flex-col gap-4 rounded-2xl bg-[#034D6B]/5 border border-[#034D6B]/10 px-6 py-5 mb-8">
          <InfoRow label="Date" value={displayDate} />
          {displayTime && (
            <>
              <div className="h-px bg-[#034D6B]/10" />
              <InfoRow label="Time" value={displayTime} />
            </>
          )}
          <div className="h-px bg-[#034D6B]/10" />
          <InfoRow label="Location" value={event.location} />
          <div className="h-px bg-[#034D6B]/10" />
          <InfoRow label="Format" value={typeLabels[event.type] || event.type} />
        </div>

        {/* Smart CTA */}
        <div className="flex flex-wrap gap-3 mb-14">
          {hasStarted ? (
            /* Event is live */
            event.virtualLink ? (
              /* Join link available → Join Now only */
              <Link
                href={event.virtualLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-[#034D6B] text-white primarybold
                  text-normal-base hover:bg-[#023d57] transition-colors duration-200"
              >
                {t("events.joinNow") || "Join Now →"}
              </Link>
            ) : event.registrationUrl ? (
              /* No join link but register link → Register only */
              <Link
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-[#034D6B] text-white primarybold
                  text-normal-base hover:bg-[#023d57] transition-colors duration-200"
              >
                {t("events.registerNow")}
              </Link>
            ) : null
          ) : (
            /* Before start */
            <>
              {event.registrationUrl && (
                /* Register link available → Register only */
                <Link
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full bg-[#034D6B] text-white primarybold
                    text-normal-base hover:bg-[#023d57] transition-colors duration-200"
                >
                  {t("events.registerNow")}
                </Link>
              )}

              {/* Add to Calendar — only when no register link but join link exists */}
              {!event.registrationUrl && event.virtualLink && event.startDateTime && (
                <AddToCalendarDropdown event={event} />
              )}
            </>
          )}
        </div>

        {/* Body content */}
        {event.content && (
          <>
            <div className="h-px w-full bg-black/10 mb-10" />
            <div className="markdown-content w-full secondarynormal break-words text-normal-base text-black/80">
              <Markdown
                components={{
                  h3: ({ node, ...props }) => (
                    <h3 className="text-3xl md:text-4xl secondarybold mb-4 mt-16 text-[#024D6B]" {...props} />
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
                    if (href) return <Link href={href}>{children}</Link>;
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
          </>
        )}
      </div>

      {/* ── RIGHT: sticky image (desktop only) ── */}
      {event.imgUrl && (
        <div className="hidden lg:block lg:w-[50%] pl-4 md:pl-12 lg:pl-16 mb-12">
          <div className="sticky top-[40px]">
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
              <Image
                src={event.imgUrl}
                alt={event.title}
                fill
                style={{ objectFit: "contain", objectPosition: "top" }}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDetailPage;
