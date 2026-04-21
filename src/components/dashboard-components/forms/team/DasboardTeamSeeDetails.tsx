import React, { RefObject } from "react";
import { _DashboardFormModalBaseRef } from "../../components/_base/_DashboardFormModalBase";
import Image from "next/image";
import DashboardDetailsCard from "../../components/others/DashboardDetailsCard";
import { TeamMemberSchema } from "@/backend/models/team";

type Props = {
  data: TeamMemberSchema;
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
};

export default function DasboardBlogSeeDetails({
  data,
  dashboardModalRef,
}: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-8 flex flex-col gap-4 h-full overflow-y-scroll">
        {/* Image */}
        <div className="w-full flex flex-col items-center gap-4">
          <div className="h-300 w-300 relative z-0 rounded-2xl bg-neutral-200">
            {data.imgUrl && (
              <Image
                src={data.imgUrl}
                alt={data.name}
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
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DashboardDetailsCard title="Name" value={data.name} />
          <DashboardDetailsCard title="Portfolio" value={data.portfolio} />
        </div>

        <DashboardDetailsCard title="LinkedIn" value={data.linkedinUrl} />

        <DashboardDetailsCard title="Bio" value={data.bio} />
      </div>
    </div>
  );
}
