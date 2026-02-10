import PrimaryButton from "@/components/button/PrimaryButton";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LeftIcon from "../../../../public/assets/icons/menu_arrow_left.svg";
import Rightcon from "../../../../public/assets/icons/menu_arrow_right.svg";
import { BlogEnumValues, BlogSchema, FilterBlogsSchema } from "@/backend/models/blogs";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import * as blogRedux from "@/redux/features/blogs";
import {
  OrderDirectionEnumValues,
  PaginationFilterSchema,
  SortingFilterSchema,
} from "@/backend/models/_shared";

const dummyPrograms: BlogSchema[] = [
  {
    id: "1",
    name: "ACIEFR Fellowship",
    nameSearch: "aciefr fellowship",
    content: "",
    author: "ECF",
    description:
      "The African Climate Intervention Fellowship for Early-Career Researchers (ACIEFR) grows the ecosystem of researchers with both physical and social science backgrounds, increasing African-led research that informs local and regional decisions on FCT governance.",
    type: "AI",
    imgUrl: "/assets/images/test-image.png",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "2",
    name: "Climate Technology Policy Lab",
    nameSearch: "climate technology policy lab",
    content: "",
    author: "ECF",
    description:
      "A collaborative space for African policymakers, researchers, and civil society to co-develop governance frameworks for frontier climate technologies that center equity and local context.",
    type: "AI",
    imgUrl: "/assets/images/test-image.png",
    createdAt: new Date("2025-02-10"),
    updatedAt: new Date("2025-02-10"),
  },
  {
    id: "3",
    name: "CDR Innovation Hub",
    nameSearch: "cdr innovation hub",
    content: "",
    author: "ECF",
    description:
      "Supporting African entrepreneurs and researchers in developing and scaling nature-based and technological carbon dioxide removal solutions tailored to the continent's diverse ecosystems.",
    type: "CDR",
    imgUrl: "/assets/images/test-image.png",
    createdAt: new Date("2025-03-05"),
    updatedAt: new Date("2025-03-05"),
  },
  {
    id: "4",
    name: "SRM Governance Dialogue Series",
    nameSearch: "srm governance dialogue series",
    content: "",
    author: "ECF",
    description:
      "A series of multi-stakeholder dialogues bringing together African scientists, policymakers, and communities to shape informed positions on Solar Radiation Management research and governance.",
    type: "SRM",
    imgUrl: "/assets/images/test-image.png",
    createdAt: new Date("2025-04-20"),
    updatedAt: new Date("2025-04-20"),
  },
];

function AllProgramsPage() {
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
        behavior: "smooth",
        block: "start",
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

  return (
    <section className="w-full pb-[200px]">
      {/* Hero Section */}
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <Image
          src="/assets/images/test-image.png"
          alt="Our Programs"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4">
          <p className="text-white/80 text-sm md:text-base font-medium tracking-widest uppercase">
            What We Do
          </p>
          <h1 className="text-bold-2xl md:text-bold-3xl text-[#E0C759] text-center">
            Our Programs
          </h1>
          <p className="text-normal-base text-white/80 max-w-lg text-center">
            Explore our initiatives driving African leadership in frontier
            climate technologies.
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        ref={targetDivRef}
        className="z-20 relative flex flex-col max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 pt-12 md:pt-16"
      >
        {/* Filters */}
        <div className="flex flex-wrap md:flex-row items-center justify-center gap-2 mb-12">
          {menuList.map((type, index) => (
            <button
              key={index}
              onClick={() => {
                onMenuFilterChange(type, index);
              }}
              className={`text-bold-lg px-6 py-2 rounded-full ${
                selectedType === index
                  ? "bg-[#E0C759] text-white"
                  : "bg-[#E0C759]/20 text-[#E0C759]"
              } transition-all duration-200`}
            >
              {type.replace(/-/g, " ").toUpperCase()}
            </button>
          ))}
        </div>

        {/* Program Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
          {(tableDataStored.data.length > 0
            ? tableDataStored.data
            : dummyPrograms
          ).map((data) => (
            <ProgramCard key={data.id} program={data} />
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
                <span className="text-bold-lg">Previous</span>
              </div>
            ) : (
              <div></div>
            )}

            {!(
              tableDataStored.data.length < tableFilterOptions.limit! &&
              Boolean(tableDataStored.lastDoc)
            ) || tableDataStored.data.length === 0 ? (
              <div className="flex flex-row items-center justify-center gap-4">
                <span className="text-bold-lg">Next</span>
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
          <div className="p-5 w-full mt-24 mb-12 rounded-full flex flex-row items-center justify-between" />
        )}
      </div>
    </section>
  );
}

function ProgramCard({ program }: { program: BlogSchema }) {
  return (
    <Link
      href={`/blogs/${program.id}`}
      className="group flex flex-col gap-5"
    >
      {/* Image with dashed border */}
      <div className="relative w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-[#024D6B]/30 overflow-hidden bg-neutral-100">
        {program.imgUrl && (
          <Image
            src={program.imgUrl}
            alt={program.name}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        )}

        {/* Arrow icon top-right */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#024D6B] flex items-center justify-center group-hover:bg-[#0182B5] transition-colors duration-200">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12L12 4M12 4H5M12 4V11"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-2">
        <h3 className="text-bold-xl text-[#024D6B] group-hover:text-[#0182B5] transition-colors duration-200">
          {program.name}
        </h3>
        <p className="text-normal-base text-[#535353] line-clamp-3">
          {program.description}
        </p>
      </div>
    </Link>
  );
}

export default AllProgramsPage;
