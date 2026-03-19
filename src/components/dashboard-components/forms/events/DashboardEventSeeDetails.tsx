import React, { RefObject } from "react";
import { _DashboardFormModalBaseRef } from "../../components/_base/_DashboardFormModalBase";
import { EventSchema } from "@/backend/models/events";
import Image from "next/image";
import DashboardDetailsCard from "../../components/others/DashboardDetailsCard";
import Link from "next/link";
import { convertDateTime } from "@/utils/dayjs_functions";

type Props = {
  data: EventSchema;
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
};

export default function DashboardEventSeeDetails({
  data,
  dashboardModalRef,
}: Props) {
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
            href={`/news-and-events/events/${data.id}`}
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

        <div className="gap-x-4 grid grid-cols-2">
          <DashboardDetailsCard title="Location" value={data.location} />
          <DashboardDetailsCard title="Date Created" value={convertDateTime(data.createdAt)} />
        </div>

        <DashboardDetailsCard title="Description" value={data.description} />

        {data.registrationUrl && (
          <DashboardDetailsCard title="Registration URL" value={data.registrationUrl} />
        )}
      </div>
    </div>
  );
}
