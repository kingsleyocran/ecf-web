import React, { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useRouter } from "next/router";
import { dashboardViews } from "../../_constants";

function DashboardMain() {
  const { logOut } = useAuth();
  const router = useRouter();
  const [tabIndex, settabIndex] = useState(0);

  return (
    <div className="flex flex-col h-[100vh] pt-[70px] gap-4 justify-between max-w-7xl mx-5 py-4 xl:mx-auto ">
      {/* Header  */}
      <div className="flex flex-row justify-between">
        <h3 className={`text-2xl `}>Dashboard</h3>

        {/* Log out Button */}
        <button
          onClick={async () => {
            await logOut();
            router.push("/dashboard");
          }}
          type="button"
          className="px-4 py-1 rounded-full bg-neutral-600 text-white text-xs"
        >
          Log out
        </button>
      </div>

      {/* Body  */}
      <div className="flex flex-row bg-neutral-50 h-full w-full p-4 rounded-xl">
        {/* Side Menu */}
        <div
          className="flex flex-col bg-th-container-surface 
        h-full w-[230px] flex-none"
        >
          {/* Menu */}
          {dashboardViews.map((view, idx) => (
            <div
              key={idx}
              className={`${
                idx == tabIndex
                  ? "bg-neutral-200 "
                  : "bg-transparent hover:bg-neutral-100"
              } flex flex-row overflow-hidden rounded-l-lg font-medium text-black hover:cursor-pointer text-sm `}
              onClick={() => {
                settabIndex(idx);
              }}
            >
              <div
                key={idx}
                className={`${
                  idx == tabIndex ? "bg-neutral-900 " : "bg-transparent"
                } h-full w-[5px] `}
              ></div>

              <h4 className="p-4  h-full w-full flex-1 flex flex-row items-center">
                {view.pageName}
              </h4>
            </div>
          ))}
        </div>

        {/* Page View */}
        <div className="bg-neutral-200 overflow-hidden rounded-b-lg  rounded-r-lg  h-full flex-1">
          {dashboardViews[tabIndex].view}
        </div>
      </div>
    </div>
  );
}

export default DashboardMain;
