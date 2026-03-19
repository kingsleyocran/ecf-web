import React, { RefObject } from "react";
import { _DashboardFormModalBaseRef } from "../../components/_base/_DashboardFormModalBase";
import { CareerSchema } from "@/backend/models/careers";
import Image from "next/image";
import DashboardDetailsCard from "../../components/others/DashboardDetailsCard";
import Link from "next/link";
import { convertDateTime } from "@/utils/dayjs_functions";

type Props = {
  data: CareerSchema;
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
};

export default function DashboardCareerSeeDetails({
  data,
  dashboardModalRef,
}: Props) {
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

          <Link
            href={`/careers/${data.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="text-white bg-black text-sm font-medium px-4 py-2 rounded-full"
              type="button"
            >
              Open career in New Tab
            </button>
          </Link>
        </div>

        <DashboardDetailsCard title="Title" value={data.title} />

        <div className="gap-x-4 grid grid-cols-2">
          <DashboardDetailsCard title="Date Created" value={convertDateTime(data.createdAt)} />

          <DashboardDetailsCard
            title="Type"
            value={
              data.type.charAt(0).toUpperCase() +
              data.type
                .slice(1)
                .replace(/-([a-z])/g, (_, c) => " " + c.toUpperCase())
            }
          />
        </div>

        <div className="gap-x-4 grid grid-cols-2">
          <DashboardDetailsCard title="Location" value={data.location} />
          <DashboardDetailsCard title="Status" value={data.isActive ? "Active" : "Inactive"} />
        </div>

        <DashboardDetailsCard title="Description" value={data.description} />

        {data.applyUrl && (
          <DashboardDetailsCard title="Apply URL" value={data.applyUrl} />
        )}
      </div>
    </div>
  );
}
