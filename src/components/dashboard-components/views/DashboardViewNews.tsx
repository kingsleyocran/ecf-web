import React, { useEffect, useState, useCallback, RefObject } from "react";
import BarLoaderComponent from "../components/others/DashboardBarLoader";
import DashboardTable from "../components/others/DashboardTable";
import { DashboardTableCol } from "../components/others/DashboardTable/types";
import DashboardSearchBox from "../components/input/DashboardSearchBox";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import * as newsRedux from "@/redux/features/news";
import {
  FiltersDefault,
  OrderDirectionEnumValues,
  PaginationFilterSchema,
  SortingFilterSchema,
} from "@/backend/models/_shared";
import { NewsArticleSchema } from "@/backend/models/news";
import { NEWS_SOURCES_MAP } from "@/utils/newsSources";
import { _DashboardFormModalBaseRef } from "../components/_base/_DashboardFormModalBase";
import CrawlNewsModal from "../forms/news/CrawlNewsModal";
import ErrorToast from "@/components/toast/ErrorToast";
import SuccessToast from "@/components/toast/SuccessToast";

// ─── Delete confirmation component (rendered inside DashboardTable modal) ─────

function DeleteNewsArticleForm({
  data,
  dashboardModalRef,
}: {
  data: NewsArticleSchema;
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
}) {
  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    console.log(
      `[DashboardViewNews] Deleting article id: ${data.id}, title: "${data.title}"`
    );
    setIsDeleting(true);
    try {
      const result = await dispatch(
        newsRedux.actions.deleteNewsArticleAsync(data)
      );
      if (newsRedux.actions.deleteNewsArticleAsync.fulfilled.match(result)) {
        console.log("[DashboardViewNews] Article deleted successfully");
        SuccessToast({ message: "Article deleted." });
        dispatch(newsRedux.actions.fetchNewsTableWithFilters());
        dashboardModalRef.current?.closeModal();
      } else {
        console.error("[DashboardViewNews] Delete failed:", result.payload);
        ErrorToast({ message: "Failed to delete article." });
        setIsDeleting(false);
      }
    } catch (err: any) {
      console.error("[DashboardViewNews] Delete error:", err);
      ErrorToast({ message: `Delete error: ${err.message}` });
      setIsDeleting(false);
    }
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      <h3 className="text-base font-semibold text-gray-900">Delete Article</h3>
      <p className="text-sm text-gray-600">
        Are you sure you want to delete this article?
      </p>
      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
        <p className="text-sm font-medium text-gray-800 line-clamp-2">
          {data.title}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Source:{" "}
          {NEWS_SOURCES_MAP[data.source]?.displayName ?? data.source}
        </p>
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#034D6B] hover:underline truncate block mt-1"
        >
          {data.link}
        </a>
      </div>
      <p className="text-xs text-red-600">
        This action cannot be undone.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => dashboardModalRef.current?.closeModal()}
          disabled={isDeleting}
          className="flex-1 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex-1 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium disabled:opacity-40 transition-colors"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

// ─── Article details / view component ────────────────────────────────────────

function ViewNewsArticleForm({
  data,
  dashboardModalRef,
}: {
  data: NewsArticleSchema;
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
}) {
  return (
    <div className="p-6 flex flex-col gap-4">
      <h3 className="text-base font-semibold text-gray-900">Article Details</h3>

      {data.imageUrl && (
        <div className="w-full h-[180px] rounded-xl overflow-hidden bg-gray-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.imageUrl}
            alt={data.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}

      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Title
          </p>
          <p className="text-sm font-medium text-gray-900 mt-0.5">
            {data.title}
          </p>
        </div>

        {data.description && (
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Description
            </p>
            <p className="text-sm text-gray-700 mt-0.5">{data.description}</p>
          </div>
        )}

        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Source
          </p>
          <p className="text-sm text-gray-700 mt-0.5">
            {NEWS_SOURCES_MAP[data.source]?.displayName ?? data.source}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Original Link
          </p>
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#034D6B] hover:underline break-all mt-0.5 block"
          >
            {data.link}
          </a>
        </div>
      </div>

      <div className="pt-2">
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2.5 text-sm font-medium rounded-lg bg-[#034D6B] hover:bg-[#023b53] text-white transition-colors"
        >
          Open Article ↗
        </a>
      </div>
    </div>
  );
}

// ─── Main DashboardViewNews component ────────────────────────────────────────

type Props = {};

export default function DashboardViewNews({}: Props) {
  const dispatch = useAppDispatch();

  const tableDataStored = useAppSelector(newsRedux.reducers.selectTableListData);
  const tableFilterOptions = useAppSelector(
    newsRedux.reducers.selectTableFilterOptions
  );
  const tableLoadingState = useAppSelector(
    newsRedux.reducers.selectTableLoadingState
  );
  const tableShouldRefresh = useAppSelector(
    newsRedux.reducers.selectTableShouldRefresh
  );

  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [sortColumns, setSortColumns] = useState<any[]>([
    {
      columnKey: tableFilterOptions?.orderBy ?? "crawledAt",
      direction: tableFilterOptions?.orderDirection ?? "desc",
    },
  ]);

  const columns: DashboardTableCol[] = [
    { accessor: "source", header: "Source" },
    { accessor: "title", header: "Title" },
    { accessor: "crawledAt", header: "Crawled At" },
  ];

  // Track mount so we don't dispatch on initial render from search effect
  useEffect(() => {
    console.log("[DashboardViewNews] Component mounted");
    setHasMounted(true);
  }, []);

  const fetchTableData = useCallback(
    async (fetchNew: boolean) => {
      if (fetchNew) {
        console.log("[DashboardViewNews] fetchTableData — forcing new fetch");
        dispatch(newsRedux.actions.fetchNewsTableWithFilters());
      } else {
        console.log(
          "[DashboardViewNews] fetchTableData — checking before fetch"
        );
        dispatch(newsRedux.actions.checkBeforeFilterNews());
      }
    },
    [dispatch]
  );

  // Initial load
  useEffect(() => {
    fetchTableData(false);
  }, [fetchTableData]);

  // Refresh when tableShouldRefresh is set (e.g. after save/delete)
  useEffect(() => {
    if (hasMounted && tableShouldRefresh) {
      console.log("[DashboardViewNews] tableShouldRefresh triggered — refetching");
      dispatch(newsRedux.actions.fetchNewsTableWithFilters());
    }
  }, [tableShouldRefresh, hasMounted, dispatch]);

  // Search query logic
  useEffect(() => {
    if (hasMounted) {
      console.log("[DashboardViewNews] Search query changed:", searchQuery);
      const filterUpdate = {
        titleSearch: searchQuery ?? undefined,
        startAfterDocQueue: [],
      };
      dispatch(
        newsRedux.reducers.updateTableFilterOptions({
          tableFilterOptions: filterUpdate,
        })
      );
      fetchTableData(true);
    }
  }, [searchQuery, hasMounted, dispatch, fetchTableData]);

  function onPaginationChange(value: PaginationFilterSchema) {
    console.log("[DashboardViewNews] Pagination change:", value);
    const data: PaginationFilterSchema = {
      startAfterDocQueue: value?.startAfterDocQueue ?? [],
      limit: value?.limit ?? FiltersDefault.limit,
    };
    dispatch(
      newsRedux.reducers.updateTableFilterOptionsPagination({ data })
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
    console.log("[DashboardViewNews] Sorting change:", data);
    dispatch(newsRedux.reducers.updateTableFilterOptionsSorting({ data }));
    fetchTableData(true);
  }

  const articleCount = tableDataStored?.data?.length ?? 0;
  console.log(
    `[DashboardViewNews] Rendering — ${articleCount} articles, loadingState: ${tableLoadingState}`
  );

  return (
    <div className="flex flex-col h-full w-full relative">
      <BarLoaderComponent isLoading={tableLoadingState === "loading"} />

      <div className="p-6 flex flex-col flex-1 h-full">
        {/* Header */}
        <div className="flex-none h-[55px] flex flex-row items-center justify-between">
          <div className="flex flex-row gap-3 items-center font-medium text-black">
            News Articles
            <span className="text-xs text-gray-500 font-normal">
              ({articleCount} article{articleCount !== 1 ? "s" : ""})
            </span>
            <CrawlNewsModal />
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

        {/* Table */}
        <div className="flex-1 w-full h-full">
          <DashboardTable
            tableHeight={"h-[calc(100vh-321px)]"}
            columns={columns}
            data={tableDataStored.data}
            formComponentList={[
              {
                buttonTitle: "View",
                component: ViewNewsArticleForm,
              },
              {
                buttonTitle: "Delete",
                component: DeleteNewsArticleForm,
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
