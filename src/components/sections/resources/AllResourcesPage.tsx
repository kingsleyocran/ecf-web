import PrimaryButton from "@/components/button/PrimaryButton";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

type ResourceData = {
  id: string;
  name: string;
  description: string;
  imgUrl?: string | null;
};

const dummyResources: ResourceData[] = [
  {
    id: "1",
    name: "ACIFER Fellowship",
    description:
      "The African Climate Intervention Fellowship for Early-Career Researchers provides funding and mentorship to support locally-led research projects.",
    imgUrl: "/assets/images/test-image.png",
  },
  {
    id: "2",
    name: "ACIFER Fellowship",
    description:
      "The African Climate Intervention Fellowship for Early-Career Researchers provides funding and mentorship to support locally-led research projects.",
    imgUrl: "/assets/images/test-image.png",
  },
  {
    id: "3",
    name: "ACIFER Fellowship",
    description:
      "The African Climate Intervention Fellowship for Early-Career Researchers provides funding and mentorship to support locally-led research projects.",
    imgUrl: "/assets/images/test-image.png",
  },
  {
    id: "4",
    name: "ACIFER Fellowship",
    description:
      "The African Climate Intervention Fellowship for Early-Career Researchers provides funding and mentorship to support locally-led research projects.",
    imgUrl: "/assets/images/test-image.png",
  },
  {
    id: "5",
    name: "ACIFER Fellowship",
    description:
      "The African Climate Intervention Fellowship for Early-Career Researchers provides funding and mentorship to support locally-led research projects.",
    imgUrl: "/assets/images/test-image.png",
  },
  {
    id: "6",
    name: "ACIFER Fellowship",
    description:
      "The African Climate Intervention Fellowship for Early-Career Researchers provides funding and mentorship to support locally-led research projects.",
    imgUrl: "/assets/images/test-image.png",
  },
];

function AllResourcesPage() {
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

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const targetDivRef = useRef<HTMLDivElement>(null);

  const scrollToDiv = useCallback(async () => {
    if (targetDivRef!.current) {
      targetDivRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  const fetchTableData = useCallback(
    async (fetchNew: boolean) => {
      if (fetchNew) {
        await scrollToDiv();
        dispatch(blogRedux.actions.fetchPageBlogWithFilters());
      } else {
        dispatch(blogRedux.actions.checkBeforeFilterPageBlog());
      }
    },
    [dispatch, scrollToDiv]
  );

  useEffect(() => {
    fetchTableData(false);
  }, [fetchTableData]);

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

  return (
    <section ref={targetDivRef} className="w-full bg-[#034D6B] pb-[100px] -mb-[20px] flex flex-col">
      {/* Hero Section */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 py-[180px]">
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-white/80 text-sm md:text-base font-medium tracking-widest uppercase">
            Resources
          </p>
          <h1 className="text-bold-2xl md:text-bold-3xl text-[#E0C759]">
            ECF Knowledge Hub
          </h1>
          <p className="text-normal-base text-white/80 max-w-lg">
            AI, Carbon Dioxide Removal, and Solar Radiation Management;
            explored through an African lens.
          </p>
        </div>
      </div>

      {/* Resource Cards */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col gap-10 max-w-[800px] mx-auto">
          {(tableDataStored.data.length > 0
            ? tableDataStored.data.map((d) => ({
                id: d.id,
                name: d.name,
                description: d.description,
                imgUrl: d.imgUrl,
              }))
            : dummyResources
          ).map((data) => (
            <ResourceCard key={data.id} resource={data} />
          ))}
        </div>

        {/* Pagination */}
        {!(
          tableFilterOptions.startAfterDocQueue &&
          tableFilterOptions.startAfterDocQueue!.length === 0
        ) &&
        !(
          tableDataStored.data.length < tableFilterOptions.limit! &&
          Boolean(tableDataStored.lastDoc)
        ) ? (
          <div className="bg-white/10 p-5 w-full max-w-[800px] mx-auto mt-16 mb-12 rounded-full flex flex-row items-center justify-between">
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
                <span className="text-bold-lg text-white">Previous</span>
              </div>
            ) : (
              <div></div>
            )}

            {!(
              tableDataStored.data.length < tableFilterOptions.limit! &&
              Boolean(tableDataStored.lastDoc)
            ) || tableDataStored.data.length === 0 ? (
              <div className="flex flex-row items-center justify-center gap-4">
                <span className="text-bold-lg text-white">Next</span>
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
        ) : null}
      </div>
    </section>
  );
}

function ResourceCard({ resource }: { resource: ResourceData }) {
  return (
    <Link
      href={`/resources/${resource.id}`}
      className="group flex flex-col md:flex-row gap-6 items-center bg-transparent hover:bg-white/10
      transition-colors duration-200 p-4 rounded-lg"
    >
      {/* Image */}
      <div className="relative shrink-0 w-full md:w-[180px] aspect-square rounded-xl overflow-hidden bg-[#C7B14E]">
        {resource.imgUrl && (
          <Image
            src={resource.imgUrl}
            alt={resource.name}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 pt-1">
        <h3 className="text-bold-xl text-[#E0C759] group-hover:text-[#E0C759]/80 transition-colors duration-200">
          {resource.name}
        </h3>
        <p className="text-normal-base text-white/70 line-clamp-3">
          {resource.description}
        </p>
      </div>
    </Link>
  );
}

export default AllResourcesPage;
