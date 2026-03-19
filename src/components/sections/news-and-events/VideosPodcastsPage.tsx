import { useTranslation } from "next-i18next";
import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import * as videosRedux from "@/redux/features/videos";
import { VideoSchema } from "@/backend/models/videos";

function VideosPodcastsPage() {
  const { t } = useTranslation("news-events");
  const dispatch = useAppDispatch();

  const tableDataStored = useAppSelector(
    videosRedux.reducers.selectPageTableListData
  );
  const tableLoadingState = useAppSelector(
    videosRedux.reducers.selectPageTableLoadingState
  );

  const fetchTableData = useCallback(
    async (fetchNew: boolean) => {
      if (fetchNew) {
        dispatch(videosRedux.actions.fetchPageVideoWithFilters());
      } else {
        dispatch(videosRedux.actions.checkBeforeFilterPageVideo());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchTableData(false);
  }, [fetchTableData]);

  return (
    <section className="w-full bg-[#034D6B] pb-[120px] flex flex-col">
      {/* Hero */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 py-[180px]">
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-[#E0C759]/60 text-xs primarybold tracking-[6px] uppercase">
            {t("videosPodcasts.label")}
          </p>
          <h1 className="text-bold-2xl md:text-bold-3xl text-[#E0C759]">
            {t("videosPodcasts.heading")}
          </h1>
          <p className="text-normal-base text-white/70 max-w-lg">
            {t("videosPodcasts.description")}
          </p>
        </div>
      </div>

      {/* Media grid */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        {tableLoadingState === "loading" ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#E0C759] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : tableDataStored.data.length === 0 ? (
          <div className="flex justify-center py-20">
            <p className="text-white/40 text-normal-base">No videos or podcasts available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1100px] mx-auto">
            {tableDataStored.data.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function MediaCard({ item }: { item: VideoSchema }) {
  const { t } = useTranslation("news-events");
  const typeLabel = item.type.split("-").pop() ?? item.type;

  return (
    <div className="flex flex-col gap-4">
      {/* Embed */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/30">
        <iframe
          src={item.link}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs primarybold tracking-wide ${
            typeLabel === "video"
              ? "bg-[#E0C759]/20 text-[#E0C759]"
              : "bg-white/10 text-white/80"
          }`}>
            {typeLabel === "video" ? t("typeLabels.video") : t("typeLabels.podcast")}
          </span>
        </div>
        <h3 className="text-bold-xl text-white leading-snug">{item.title}</h3>
        <p className="text-normal-base text-white/60 line-clamp-3">{item.description}</p>
      </div>
    </div>
  );
}

export default VideosPodcastsPage;
