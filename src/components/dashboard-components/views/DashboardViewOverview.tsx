import React, { useEffect, useCallback } from "react";
import BarLoaderComponent from "../components/others/DashboardBarLoader";
import { DashboardTableCol } from "../components/others/DashboardTable/types";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import * as dbInfoRedux from "@/redux/features/dbInfo";
import ErrorToast from "@/components/toast/ErrorToast";
import { ComponentStateEnum } from "@/backend/models/_shared";

type Props = {};

export default function DashboardView({}: Props) {
  const dispatch = useAppDispatch();
  const dataStored = useAppSelector(dbInfoRedux.reducers.selectAggregatorData);
  const loadingState = useAppSelector(dbInfoRedux.reducers.selectLoadingState);

  const fetchData = useCallback(
    async (fetchNew: boolean) => {
      dispatch(dbInfoRedux.actions.getDBInfoAggregatorPersistAsync()).then(
        (responseData: any) => {
          if (responseData.meta.requestStatus === "rejected") {
            console.error("Error fetching aggregator data:", responseData);
            console.error("Error payload:", responseData.payload);
            console.error(
              "Error message:",
              responseData.error?.message ||
                responseData.payload?.message ||
                "Unknown error"
            );
            ErrorToast({
              message: "An error occurred while fetching aggregator data",
            });
          }
        }
      );
    },
    [dispatch]
  );

  const columns: DashboardTableCol[] = [
    { accessor: "blogs", header: "Blogs" },
    { accessor: "team", header: "Team" },
    { accessor: "advisoryCircle", header: "Advisory Circle" },
  ];

  useEffect(() => {
    fetchData(false);
  }, [fetchData]);

  useEffect(() => {
    console.log("Aggregator data:", dataStored);
  }, [dataStored]);

  useEffect(() => {
    if (loadingState === ComponentStateEnum.FAILED) {
      console.error(
        "Failed to fetch aggregator data. Loading state:",
        loadingState
      );
      console.error("Current data stored:", dataStored);
    }
  }, [loadingState, dataStored]);

  return (
    <div className="flex flex-col h-full w-full relative">
      <BarLoaderComponent isLoading={loadingState === "loading"} />{" "}
      <div className="p-6 flex flex-col flex-1 h-full ">
        <div className="flex-none h-[55px] flex flex-row items-center justify-between">
          <div className="flex flex-row gap-3 items-center font-medium text-black">
            Overview
          </div>
        </div>

        <div className="flex-1 w-full">
          {dataStored && (
            <div className=" grid grid-cols-3 gap-x-4 gap-y-4">
              {columns.map((data, idx) => (
                <div
                  key={idx}
                  className="bg-white h-150 flex flex-col justify-between rounded-xl p-6"
                >
                  <h6 className="text-black font-medium">{data.header}</h6>
                  <p className="text-5xl text-black line-clamp-1">
                    {(dataStored?.data as any)[data.accessor]}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
