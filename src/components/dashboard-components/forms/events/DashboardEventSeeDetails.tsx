import React, { RefObject, useRef, useCallback } from "react";
import { _DashboardFormModalBaseRef } from "../../components/_base/_DashboardFormModalBase";
import { EventSchema } from "@/backend/models/events";
import Image from "next/image";
import DashboardDetailsCard from "../../components/others/DashboardDetailsCard";
import Link from "next/link";
import { convertDateTime } from "@/utils/dayjs_functions";
import QRCode from "react-qr-code";

type Props = {
  data: EventSchema;
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
};

export default function DashboardEventSeeDetails({
  data,
  dashboardModalRef,
}: Props) {
  const qrUrl = data.shortLink
    ? `https://ecfrontiers.org/e/${data.shortLink}`
    : `https://ecfrontiers.org/events/${data.id}`;

  const qrWrapperRef = useRef<HTMLDivElement>(null);

  const downloadQR = useCallback(() => {
    const svg = qrWrapperRef.current?.querySelector("svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const size = 400;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);
    const img = new window.Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      const a = document.createElement("a");
      a.download = `ecf-event-${data.id}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
  }, [data.id]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-8 flex flex-col gap-4 h-full overflow-y-scroll">
        <div className="w-full flex flex-col items-center gap-4">
          <div className="h-300 w-500 relative z-0 rounded-2xl bg-neutral-200">
            {data.imgUrl && (
              <Image
                src={data.imgUrl}
                alt={data.title}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "top",
                  borderRadius: "16px",
                }}
                priority
              />
            )}
          </div>

          <Link
            href={`/events/${data.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="text-white bg-black text-sm font-medium px-4 py-2 rounded-full"
              type="button"
            >
              Open Event in New Tab
            </button>
          </Link>
        </div>

        <DashboardDetailsCard title="Title" value={data.title} />

        <div className="gap-x-4 grid grid-cols-2">
          <DashboardDetailsCard title="Date" value={data.date} />
          <DashboardDetailsCard
            title="Type"
            value={data.type.charAt(0).toUpperCase() + data.type.slice(1)}
          />
        </div>

        {data.startDateTime && (
          <div className="gap-x-4 grid grid-cols-2">
            <DashboardDetailsCard title="Start (UTC)" value={new Date(data.startDateTime).toLocaleString()} />
            <DashboardDetailsCard title="Timezone" value={data.timezone ?? "—"} />
          </div>
        )}

        <div className="gap-x-4 grid grid-cols-2">
          <DashboardDetailsCard title="Location" value={data.location} />
          <DashboardDetailsCard title="Date Created" value={convertDateTime(data.createdAt)} />
        </div>

        <DashboardDetailsCard title="Description" value={data.description} />

        {data.registrationUrl && (
          <DashboardDetailsCard title="Registration URL" value={data.registrationUrl} />
        )}

        {data.virtualLink && (
          <DashboardDetailsCard title="Virtual Join Link" value={data.virtualLink} />
        )}

        {data.shortLink && (
          <DashboardDetailsCard title="Short Link" value={`ecfrontiers.org/e/${data.shortLink}`} />
        )}

        {/* QR Code */}
        <div className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl mt-2">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider self-start">Event QR Code</p>
          <div ref={qrWrapperRef}>
            <QRCode value={qrUrl} size={180} />
          </div>
          <p className="text-xs text-neutral-400 text-center break-all">{qrUrl}</p>
          <button
            type="button"
            onClick={downloadQR}
            className="text-white bg-black text-sm font-medium px-4 py-2 rounded-full"
          >
            Download QR as PNG
          </button>
        </div>
      </div>
    </div>
  );
}
