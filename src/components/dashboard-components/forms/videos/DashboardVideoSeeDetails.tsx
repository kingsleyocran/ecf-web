import React, { RefObject } from "react";
import { _DashboardFormModalBaseRef } from "../../components/_base/_DashboardFormModalBase";
import { VideoSchema } from "@/backend/models/videos";
import Image from "next/image";
import DashboardDetailsCard from "../../components/others/DashboardDetailsCard";
import { convertDateTime } from "@/utils/dayjs_functions";

type Props = {
  data: VideoSchema;
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
};

export default function DashboardVideoSeeDetails({
  data,
  dashboardModalRef,
}: Props) {
  const typeLabel = data.type.split("-").pop() ?? data.type;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-8 flex flex-col gap-4 h-full overflow-y-scroll">
        {/* Image */}
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

          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="text-white bg-black text-sm font-medium px-4 py-2 rounded-full"
              type="button"
            >
              Open Link in New Tab
            </button>
          </a>
        </div>

        <DashboardDetailsCard title="Title" value={data.title} />

        <div className="gap-x-4 grid grid-cols-2">
          <DashboardDetailsCard title="Date Created" value={convertDateTime(data.createdAt)} />

          <DashboardDetailsCard
            title="Type"
            value={typeLabel.charAt(0).toUpperCase() + typeLabel.slice(1)}
          />
        </div>

        <DashboardDetailsCard title="Description" value={data.description} />

        <DashboardDetailsCard title="Embed Link" value={data.link} />
      </div>
    </div>
  );
}
