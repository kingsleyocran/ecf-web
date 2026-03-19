import React, { useEffect, useState, useCallback } from "react";
import BarLoaderComponent from "../components/others/DashboardBarLoader";
import DashboardTable from "../components/others/DashboardTable";
import { DashboardTableCol } from "../components/others/DashboardTable/types";
import DashboardSearchBox from "../components/input/DashboardSearchBox";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import * as eventsRedux from "@/redux/features/events";
import {
  FiltersDefault,
  OrderDirectionEnumValues,
  PaginationFilterSchema,
  SortingFilterSchema,
} from "@/backend/models/_shared";
import { CreateEventModal } from "../forms/events/CreateEventForm";
import UpdateEventForm from "../forms/events/UpdateEventForm";
import DashboardEventSeeDetails from "../forms/events/DashboardEventSeeDetails";

type Props = {};

export default function DashboardViewEvents({}: Props) {
  const dispatch = useAppDispatch();
  const tableDataStored = useAppSelector(
    eventsRedux.reducers.selectTableListData
  );
  const tableFilterOptions = useAppSelector(
    eventsRedux.reducers.selectTableFilterOptions
  );
  const tableLoadingState = useAppSelector(
    eventsRedux.reducers.selectTableLoadingState
  );
  const [sortColumns, setSortColumns] = useState<any[]>([
    {
      columnKey: tableFilterOptions?.orderBy!,
      direction: tableFilterOptions?.orderDirection ?? "asc",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  const columns: DashboardTableCol[] = [
    { accessor: "title", header: "Title" },
    { accessor: "type", header: "Type" },
    { accessor: "createdAt", header: "Date Created" },
  ];

  async function onPaginationChange(value: PaginationFilterSchema) {
    const data: PaginationFilterSchema = {
      startAfterDocQueue: value?.startAfterDocQueue ?? [],
      limit: value?.limit ?? FiltersDefault.limit,
    };
    dispatch(
      eventsRedux.reducers.updateTableFilterOptionsPagination({ data })
    );
    fetchTableData(true);
  }

  function onSortingChange(value: any[]) {
    setSortColumns([...value]);
    const data: SortingFilterSchema = {
      orderBy: value[0]?.columnKey,
      orderDirection:
        value[0]?.direction?.toLowerCase() as OrderDirectionEnumValues,
    };
    dispatch(eventsRedux.reducers.updateTableFilterOptionsSorting({ data }));
    fetchTableData(true);
  }

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const fetchTableData = useCallback(
    async (fetchNew: boolean) => {
      if (fetchNew) {
        dispatch(eventsRedux.actions.fetchEventWithFilters());
      } else {
        dispatch(eventsRedux.actions.checkBeforeFilterEvent());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (hasMounted) {
      let tableFilterOptions = {
        fullNameSearch: searchQuery ? searchQuery : undefined,
        startAfterDocQueue: [],
      };
      dispatch(
        eventsRedux.reducers.updateTableFilterOptions({
          tableFilterOptions,
        })
      );
      fetchTableData(true);
    }
  }, [searchQuery, hasMounted, dispatch, fetchTableData]);

  useEffect(() => {
    fetchTableData(false);
  }, [fetchTableData]);

  return (
    <div className="flex flex-col h-full w-full relative">
      <BarLoaderComponent isLoading={tableLoadingState === "loading"} />
      <div className="p-6 flex flex-col flex-1 h-full ">
        <div className="flex-none h-[55px] flex flex-row items-center justify-between">
          <div className="flex flex-row gap-3 items-center font-medium text-black">
            Events
            <CreateEventModal />
          </div>

          <div className="w-250">
            <DashboardSearchBox
              onInputChange={(val: string | null) => {
                setSearchQuery(val);
              }}
              value={null}
              searchPlaceholderText="title"
            />
          </div>
        </div>

        <div className="flex-1 w-full h-full">
          <DashboardTable
            tableHeight={"h-[calc(100vh-321px)]"}
            columns={columns}
            data={tableDataStored.data}
            formComponentList={[
              {
                buttonTitle: "Details",
                component: DashboardEventSeeDetails,
              },
              {
                buttonTitle: "Edit",
                modalSize: "large",
                component: UpdateEventForm,
              },
            ]}
            paginationData={tableFilterOptions}
            lastDoc={tableDataStored.lastDoc}
            onPaginationChange={async (val: PaginationFilterSchema) => {
              onPaginationChange(val);
            }}
          />
        </div>
      </div>
    </div>
  );
}
