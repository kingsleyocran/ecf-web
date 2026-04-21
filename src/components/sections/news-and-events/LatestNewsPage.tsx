import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import * as newsRedux from "@/redux/features/news";
import { NewsArticleSchema } from "@/backend/models/news";
import { NEWS_SOURCES_MAP } from "@/utils/newsSources";

function LatestNewsPage() {
  const { t } = useTranslation("news-events");
  const dispatch = useAppDispatch();

  const pageListData = useAppSelector(newsRedux.reducers.selectPageTableListData);
  const pageLoadingState = useAppSelector(
    newsRedux.reducers.selectPageTableLoadingState
  );

  const articles = pageListData?.data ?? [];
  const isLoading = pageLoadingState === "loading";

  useEffect(() => {
    console.log("[LatestNewsPage] Mounted — fetching news articles from Firestore");
    dispatch(newsRedux.actions.fetchPageNewsWithFilters());
  }, [dispatch]);

  useEffect(() => {
    console.log(
      `[LatestNewsPage] Articles updated — count: ${pageListData?.data?.length ?? 0}, loadingState: ${pageLoadingState}`
    );
  }, [pageListData, pageLoadingState]);

  return (
    <section className="w-full bg-[#034D6B] pb-[100px] flex flex-col">
      {/* Hero */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 py-[180px]">
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-[#E0C759]/60 text-xs primarybold tracking-[6px] uppercase">
            {t("latestNews.label")}
          </p>
          <h1 className="text-bold-2xl md:text-bold-3xl text-[#E0C759]">
            {t("latestNews.heading")}
          </h1>
          <p className="text-normal-base text-white/70 max-w-lg">
            {t("latestNews.description")}
          </p>
        </div>
      </div>

      {/* News list */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col gap-10 max-w-[800px] mx-auto">
          {/* Loading state */}
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[#E0C759]/40 border-t-[#E0C759] rounded-full animate-spin" />
                <p className="text-white/60 text-sm">Loading latest news...</p>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && articles.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <p className="text-white/60 text-sm">
                No news articles yet. Check back soon.
              </p>
            </div>
          )}

          {/* Article cards */}
          {!isLoading &&
            articles.map((item, i) => (
              <NewsCard key={item.id ?? i} item={item} />
            ))}
        </div>
      </div>
    </section>
  );
}

function NewsCard({ item }: { item: NewsArticleSchema }) {
  const sourceName =
    NEWS_SOURCES_MAP[item.source]?.displayName ?? item.source;

  // Format the crawledAt date for display
  let dateStr = "";
  try {
    const d = item.crawledAt instanceof Date ? item.crawledAt : new Date(item.crawledAt);
    dateStr = d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    dateStr = "";
  }

  return (
    <Link
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col md:flex-row gap-6 items-center bg-transparent hover:bg-white/10
      transition-colors duration-200 p-4 rounded-lg"
    >
      {/* Image */}
      <div className="relative shrink-0 w-full md:w-[180px] aspect-square rounded-xl overflow-hidden bg-[#C7B14E]">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Replace broken image with placeholder
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#023b53]">
            <span className="text-[#E0C759]/40 text-4xl">📰</span>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-3 pt-1">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="px-3 py-1 rounded-full text-xs primarybold tracking-wide bg-[#034D6B] text-white border border-white/20">
            {sourceName}
          </span>
          
        </div>
        <h3 className="text-bold-xl text-white group-hover:text-[#E0C759]/80 transition-colors duration-200">
          {item.title}
        </h3>
        {/* {item.description && (
          <p className="text-normal-base text-white/70 line-clamp-3">
            {item.description}
          </p>
        )} */}
        {dateStr && (
            <span className="text-white/40 text-xs">· {dateStr}</span>
          )}
      </div>
    </Link>
  );
}

export default LatestNewsPage;
