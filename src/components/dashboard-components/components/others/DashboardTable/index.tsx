import React, { RefObject, useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import _DashboardFormModalBase, {
  _DashboardFormModalBaseRef,
} from "../../_base/_DashboardFormModalBase";
import { DashboardTableCol } from "./types";
import LimitDropdown from "./limitDropdown";
import ChevronLeftIcon from "../../../../../../public/assets/dashboard_assets/chevron_left.svg";
import ChevronRightIcon from "../../../../../../public/assets/dashboard_assets/chevron_right.svg";
import { PaginationFilterSchema } from "@/backend/models/_shared";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { convertDateTime } from "@/utils/dayjs_functions";
import dayjs from "dayjs";

type DashboardTableProps<T> = {
  tableHeight: string;
  columns: DashboardTableCol[];
  data: T[];
  formComponentList: {
    buttonTitle: string;
    modalSize?: "large" | "medium",
    component: React.ComponentType<{
      data: T;
      dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
    }>;
  }[];
  actionButtonTitle?: string;
  paginationData: PaginationFilterSchema;
  onPaginationChange: (value: PaginationFilterSchema) => void;
  lastDoc?: QueryDocumentSnapshot; // for firestore
};

export default function DashboardTable<T>({
  columns,
  data,
  formComponentList,
  tableHeight,
  paginationData,
  onPaginationChange,
  lastDoc,
}: DashboardTableProps<T>) {
  const modalRef = useRef<_DashboardFormModalBaseRef>(null);
  const [paginationVal, setPaginationVal] =
    useState<PaginationFilterSchema>(paginationData);

  useEffect(() => {
    setPaginationVal(paginationData!);
  }, [paginationData]);

  function onHandleFunc(val: PaginationFilterSchema) {
    setPaginationVal({ ...paginationVal, ...val });
    onPaginationChange({ ...paginationVal, ...val });
  }

  return (
    <div
      className={"text-sm rounded-lg overflow-hidden " + styles.scrollableTable}
    >
      <div
        className={`${tableHeight} bg-white overflow-y-scroll overflow-x-aut`}
      >
        <table className="min-w-full border-collapse">
          <thead className="sticky top-[0px] bg-neutral-800">
            <tr className="">
              {columns.map((column: DashboardTableCol) => (
                <th
                  key={column.accessor}
                  className="px-2 py-1.5 text-white text-left"
                >
                  <p className="line-clamp-1">{column.header}</p>
                </th>
              ))}

              {/* Action Column */}
              <th
                key={columns.length}
                className="px-4 py-2 text-white text-left w-200"
              ></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((row: T, rowIndex: number) => (
              <tr key={rowIndex} className="border border-gray-200">
                {columns.map((column: DashboardTableCol, colIndex: number) => (
                  <td key={colIndex} className="px-2 py-2 text-gray-700">
                    <p className="line-clamp-1">
                      {(row as any)[column.accessor] instanceof Date
                        ? dayjs((row as any)[column.accessor]).format("DD - MM - YYYY")
                        : typeof (row as any)[column.accessor] === "boolean"
                        ? (row as any)[column.accessor] ? Boolean((row as any)[column.accessor])
                            .toString()
                            .toLocaleUpperCase() : ""
                        : (row as any)[column.accessor]}
                    </p>
                  </td>
                ))}

                {/* Action Row */}
                <td
                  key={columns.length}
                  className="px-4 py-1.5 text-gray-700 flex flex-row gap-1 justify-end w-200"
                >
                  {formComponentList.map((f, idx) => (
                    <_DashboardFormModalBase
                      key={idx}
                      ref={modalRef}
                      buttonTitle={f.buttonTitle}
                      modalSize={f.modalSize}
                    >
                      <f.component data={row} dashboardModalRef={modalRef} />
                    </_DashboardFormModalBase>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/** Footer */}
      <div className="bg-neutral-400 w-full h-[40px] flex flex-row justify-between items-center px-2">
        <div className="relative  text-sm text-black flex flex-row items-center gap-2 pl-2">
          Showing
          <LimitDropdown
            limitData={paginationData.limit!}
            onLimitChange={(value: number) => {
              onHandleFunc({
                limit: value,
                startAfterDocQueue: [],
              });
            }}
          />
          items
        </div>

        <div className="flex flex-row gap-1.5">
          <button
            type="button"
            onClick={() => {
              let queueArr = paginationVal.startAfterDocQueue!.slice();
              queueArr.pop();
              onHandleFunc({
                //startAfterDoc: newLastDoc,
                startAfterDocQueue: [...queueArr],
              });
            }}
            disabled={
              paginationVal.startAfterDocQueue &&
              paginationVal.startAfterDocQueue!.length === 0
            }
            className={`${
              paginationVal.startAfterDocQueue &&
              paginationVal.startAfterDocQueue!.length === 0
                ? "opacity-30 cursor-not-allowed"
                : ""
            } px-3 py-1 w-[80px] text-sm flex flex-row gap-2 items-center justify-between text-white bg-neutral-800 rounded-full`}
          >
            <ChevronLeftIcon />
            Prev
          </button>

          <button
            type="button"
            onClick={() => {
              onHandleFunc({
                startAfterDocQueue: [
                  ...paginationVal.startAfterDocQueue!,
                  lastDoc!,
                ],
              });
            }}
            disabled={
              (data.length < paginationVal.limit! && Boolean(lastDoc)) ||
              data.length === 0
            }
            className={`${
              (data.length < paginationVal.limit! && Boolean(lastDoc)) ||
              data.length === 0
                ? "opacity-30 cursor-not-allowed"
                : ""
            } px-3 py-1 w-[80px] text-sm flex flex-row gap-2 items-center justify-between text-white bg-neutral-800 rounded-full`}
          >
            Next
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
