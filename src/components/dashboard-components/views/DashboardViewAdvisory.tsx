import React, { useEffect, useState, useCallback } from "react";
import BarLoaderComponent from "../components/others/DashboardBarLoader";
import DashboardTable from "../components/others/DashboardTable";
import { DashboardTableCol } from "../components/others/DashboardTable/types";
import DashboardSearchBox from "../components/input/DashboardSearchBox";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import * as advisoryRedux from "@/redux/features/advisoryCircle";
import {
  FiltersDefault,
  OrderDirectionEnumValues,
  PaginationFilterSchema,
  SortingFilterSchema,
} from "@/backend/models/_shared";
import { CreateAdvisoryModal } from "../forms/advisory/CreateAdvisoryForm";
import UpdateAdvisoryForm from "../forms/advisory/UpdateAdvisoryForm";
import DasboardAdvisorySeeDetails from "../forms/advisory/DasboardAdvisorySeeDetails";

type Props = {};

export default function DashboardView({}: Props) {
  const dispatch = useAppDispatch();
  const tableDataStored = useAppSelector(
    advisoryRedux.reducers.selectTableListData
  );
  const tableFilterOptions = useAppSelector(
    advisoryRedux.reducers.selectTableFilterOptions
  );
  const tableLoadingState = useAppSelector(
    advisoryRedux.reducers.selectTableLoadingState
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
    { accessor: "name", header: "Name" },
    { accessor: "bio", header: "Bio" },
    { accessor: "createdAt", header: "Date Created" },
  ];

  async function onPaginationChange(value: PaginationFilterSchema) {
    const data: PaginationFilterSchema = {
      startAfterDocQueue: value?.startAfterDocQueue ?? [],
      limit: value?.limit ?? FiltersDefault.limit,
    };
    dispatch(
      advisoryRedux.reducers.updateTableFilterOptionsPagination({ data })
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
    dispatch(
      advisoryRedux.reducers.updateTableFilterOptionsSorting({ data })
    );
    fetchTableData(true);
  }

  // Effect to track component mount
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const fetchTableData = useCallback(async (fetchNew: boolean) => {
    if (fetchNew) {
      dispatch(advisoryRedux.actions.fetchAdvisorysWithFilters());
    } else {
      dispatch(advisoryRedux.actions.checkBeforeFilterAdvisorys());
    }
  }, [dispatch]);

  // Search query logic
  useEffect(() => {
    if (hasMounted) {
      let tableFilterOptions = {
        nameSearch: searchQuery ? searchQuery : undefined,
        startAfterDocQueue: [],
      };
      dispatch(
        advisoryRedux.reducers.updateTableFilterOptions({
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
            Advisory Circle
            <CreateAdvisoryModal />
          </div>

          <div className="w-250">
            <DashboardSearchBox
              onInputChange={(val: string | null) => {
                setSearchQuery(val);
              }}
              value={null}
              searchPlaceholderText="full name"
            />
          </div>
        </div>

        <div className="flex-1  w-full h-full ">
          <DashboardTable
            tableHeight={"h-[calc(100vh-321px)]"}
            columns={columns}
            data={tableDataStored.data}
            formComponentList={[
              {
                buttonTitle: "Details",
                component: DasboardAdvisorySeeDetails,
              },
              {
                buttonTitle: "Edit",
                component: UpdateAdvisoryForm,
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
