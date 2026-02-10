import React, { useEffect, useState, useCallback } from "react";
import BarLoaderComponent from "../components/others/DashboardBarLoader";
import DashboardTable from "../components/others/DashboardTable";
import { DashboardTableCol } from "../components/others/DashboardTable/types";
import DashboardSearchBox from "../components/input/DashboardSearchBox";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import * as teamRedux from "@/redux/features/team";
import {
  FiltersDefault,
  OrderDirectionEnumValues,
  PaginationFilterSchema,
  SortingFilterSchema,
} from "@/backend/models/_shared";
import { CreateTeamModal } from "../forms/team/CreateTeamForm";
import UpdateTeamForm from "../forms/team/UpdateTeamForm";
import DasboardTeamSeeDetails from "../forms/team/DasboardTeamSeeDetails";

type Props = {};

export default function DashboardView({}: Props) {
  const dispatch = useAppDispatch();
  const tableDataStored = useAppSelector(
    teamRedux.reducers.selectTableListData
  );
  const tableFilterOptions = useAppSelector(
    teamRedux.reducers.selectTableFilterOptions
  );
  const tableLoadingState = useAppSelector(
    teamRedux.reducers.selectTableLoadingState
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
    { accessor: "portfolio", header: "Portfolio" },
    { accessor: "bio", header: "Bio" },
    { accessor: "createdAt", header: "Date Created" },
  ];

  async function onPaginationChange(value: PaginationFilterSchema) {
    const data: PaginationFilterSchema = {
      startAfterDocQueue: value?.startAfterDocQueue ?? [],
      limit: value?.limit ?? FiltersDefault.limit,
    };
    dispatch(
      teamRedux.reducers.updateTableFilterOptionsPagination({ data })
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
      teamRedux.reducers.updateTableFilterOptionsSorting({ data })
    );
    fetchTableData(true);
  }

  // Effect to track component mount
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const fetchTableData = useCallback(async (fetchNew: boolean) => {
    if (fetchNew) {
      dispatch(teamRedux.actions.fetchTeamMembersWithFilters());
    } else {
      dispatch(teamRedux.actions.checkBeforeFilterTeamMembers());
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
        teamRedux.reducers.updateTableFilterOptions({
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
            Team
            <CreateTeamModal />
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
                component: DasboardTeamSeeDetails,
              },
              {
                buttonTitle: "Edit",
                component: UpdateTeamForm,
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
