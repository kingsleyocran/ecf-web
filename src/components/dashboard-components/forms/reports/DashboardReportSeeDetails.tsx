import React, { RefObject } from "react";
import { _DashboardFormModalBaseRef } from "../../components/_base/_DashboardFormModalBase";
import { ReportSchema } from "@/backend/models/reports";
import Image from "next/image";
import DashboardDetailsCard from "../../components/others/DashboardDetailsCard";
import Link from "next/link";
import { convertDateTime } from "@/utils/dayjs_functions";

type Props = {
  data: ReportSchema;
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
};

export default function DashboardReportSeeDetails({
  data,
  dashboardModalRef,
}: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-8 flex flex-col gap-4 h-full overflow-y-scroll">
        {/* Cover Image */}
        <div className="w-full flex flex-col items-center gap-4">
          <div className="h-300 w-500 relative z-0 rounded-2xl bg-neutral-200">
            {data.coverImgUrl && (
              <Image
                src={data.coverImgUrl}
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
            href={`/resources/reports/${data.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="text-white bg-black text-sm font-medium px-4 py-2 rounded-full"
              type="button"
            >
              View Report Page
            </button>
          </Link>
        </div>

        <DashboardDetailsCard title="Title" value={data.title} />

        <div className="gap-x-4 grid grid-cols-2">
          <DashboardDetailsCard
            title="Published Date"
            value={data.publishedDate}
          />
          <DashboardDetailsCard
            title="Date Created"
            value={convertDateTime(data.createdAt)}
          />
        </div>

        <DashboardDetailsCard title="Description" value={data.description} />

        <DashboardDetailsCard
          title="Status"
          value={data.isActive ? "Active" : "Inactive"}
        />
      </div>
    </div>
  );
}
