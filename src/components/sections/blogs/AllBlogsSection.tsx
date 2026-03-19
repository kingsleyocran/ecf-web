import PrimaryButton from "@/components/button/PrimaryButton";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import LeftIcon from "../../../../public/assets/icons/menu_arrow_left.svg";
import Rightcon from "../../../../public/assets/icons/menu_arrow_right.svg";
import { BlogEnumValues, FilterBlogsSchema } from "@/backend/models/blogs";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import * as blogRedux from "@/redux/features/blogs";
import {
  OrderDirectionEnumValues,
  PaginationFilterSchema,
  SortingFilterSchema,
} from "@/backend/models/_shared";
import BlogCard from "@/components/cards/BlogCard";

function AllBlogsSection() {
  const { t } = useTranslation(["blogs", "common"]);
  const [selectedType, setSelectedType] = useState<number>(0);

  const dispatch = useAppDispatch();
  const tableDataStored = useAppSelector(
    blogRedux.reducers.selectPageTableListData
  );
  const tableFilterOptions = useAppSelector(
    blogRedux.reducers.selectPageTableFilterOptions
  );
  const tableLoadingState = useAppSelector(
    blogRedux.reducers.selectPageTableLoadingState
  );
  const [sortColumns, setSortColumns] = useState<any[]>([
    {
      columnKey: tableFilterOptions?.orderBy!,
      direction: tableFilterOptions?.orderDirection ?? "asc",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const menuList = ["all", ...BlogEnumValues];

  async function onPaginationChange(value: PaginationFilterSchema) {
    const data: PaginationFilterSchema = {
      startAfterDocQueue: value?.startAfterDocQueue ?? [],
      limit: value?.limit ?? undefined,
    };
    dispatch(
      blogRedux.reducers.updatePageTableFilterOptionsPagination({ data })
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
    dispatch(blogRedux.reducers.updatePageTableFilterOptionsSorting({ data }));
    fetchTableData(true);
  }

  async function onMenuFilterChange(value: string, idx: number) {
    const data: FilterBlogsSchema = {
      type: value === "all" ? undefined : (value as string),
      startAfterDocQueue: [],
      limit: tableFilterOptions?.limit,
    };
    dispatch(
      blogRedux.reducers.updatePageTableFilterOptionsPagination({ data })
    );
    fetchTableData(true);
    setSelectedType(idx);
  }

  // Effect to track component mount
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Create a ref for the div you want to scroll to
  const targetDivRef = useRef<HTMLDivElement>(null);

  // Function to trigger the smooth scroll
  const scrollToDiv = useCallback(async () => {
    if (targetDivRef!.current) {
      targetDivRef.current.scrollIntoView({
        behavior: "smooth", // Enables smooth scrolling
        block: "start", // Aligns the div to the top of the scrollable area
      });
    }
  }, []);

  const fetchTableData = useCallback(async (fetchNew: boolean) => {
    if (fetchNew) {
      await scrollToDiv();
      dispatch(blogRedux.actions.fetchPageBlogWithFilters());
    } else {
      dispatch(blogRedux.actions.checkBeforeFilterPageBlog());
    }
  }, [dispatch, scrollToDiv]);

  useEffect(() => {
    fetchTableData(false);
  }, [fetchTableData]);

  // Search query logic
  useEffect(() => {
    if (hasMounted) {
      let tableFilterOptions = {
        titleSearch: searchQuery ? searchQuery : undefined,
        startAfterDocQueue: [],
      };
      dispatch(
        blogRedux.reducers.updateTableFilterOptions({
          tableFilterOptions,
        })
      );
      fetchTableData(true);
    }
  }, [searchQuery, hasMounted, dispatch, fetchTableData]);

  useEffect(() => {
    console.log(tableDataStored);
  }, [tableDataStored]);

  return (
    <section className="w-full pb-[200px] pt-[130px]">
      {/* Content */}
      <div className="z-20 relative items-center flex flex-col max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        {/* Hero Content */}
        <div className=" flex flex-col items-center gap-2">
          <h1 className="text-bold-2xl text-[#E0C759] text-center md:text-start">
            {t("heading")}
          </h1>

          <p className="text-normal-base">
            {t("description")}
          </p>

          {/* Menus */}
          <div className="flex flex-wrap mt-4 md:flex-row items-center justify-center gap-2 ">
            {menuList.map((type, index) => (
              <button
                key={index}
                onClick={() => {
                  onMenuFilterChange(type, index);
                }}
                className={`text-bold-lg   px-6 py-2 rounded-full ${
                  selectedType === index
                    ? "bg-[#E0C759] text-white"
                    : "bg-[#E0C759]/20 text-[#E0C759]"
                } transition-all duration-200`}
              >
                {type.replace(/-/g, " ").toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Blog List */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-12  mt-8">
          {tableDataStored.data.map((data) => (
            <BlogCard key={data.id} blog={data} />
          ))}
        </div>

        {!(
          tableFilterOptions.startAfterDocQueue &&
          tableFilterOptions.startAfterDocQueue!.length === 0
        ) &&
        !(
          tableDataStored.data.length < tableFilterOptions.limit! &&
          Boolean(tableDataStored.lastDoc)
        ) ? (
          <div className="bg-[#FFF0D7] p-5 w-full mt-24 mb-12 rounded-full flex flex-row items-center justify-between">
            {!(
              tableFilterOptions.startAfterDocQueue &&
              tableFilterOptions.startAfterDocQueue!.length === 0
            ) ? (
              <div className="flex flex-row items-center justify-center gap-4">
                <PrimaryButton
                  onClick={() => {
                    let queueArr =
                      tableFilterOptions.startAfterDocQueue!.slice();
                    queueArr.pop();
                    onPaginationChange({
                      ...tableFilterOptions,
                      startAfterDocQueue: [...queueArr],
                    });
                  }}
                  icon={<LeftIcon width="11" height="22" viewBox="0 0 13 25" />}
                />

                <span className="text-bold-lg">{t("shared.previous", { ns: "common" })}</span>
              </div>
            ) : (
              <div></div>
            )}

            {!(
              tableDataStored.data.length < tableFilterOptions.limit! &&
              Boolean(tableDataStored.lastDoc)
            ) || tableDataStored.data.length === 0 ? (
              <div className="flex flex-row items-center justify-center gap-4">
                <span className="text-bold-lg">{t("shared.next", { ns: "common" })}</span>
                <PrimaryButton
                  onClick={() => {
                    onPaginationChange({
                      ...tableFilterOptions,
                      startAfterDocQueue: [
                        ...tableFilterOptions.startAfterDocQueue!,
                        tableDataStored.lastDoc!,
                      ],
                    });
                  }}
                  icon={<Rightcon width="11" height="22" viewBox="0 0 13 25" />}
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div className=" p-5 w-full mt-24 mb-12 rounded-full flex flex-row items-center justify-between" />
        )}
      </div>
    </section>
  );
}

export default AllBlogsSection;
