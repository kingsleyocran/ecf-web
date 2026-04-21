import { useTranslation } from "next-i18next";
import { useEffect, useCallback, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import * as videosRedux from "@/redux/features/videos";
import { VideoSchema } from "@/backend/models/videos";

// ── URL helpers ───────────────────────────────────────────────────────────────

function getYouTubeId(url: string): string | null {
  const ytWatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (ytWatch) return ytWatch[1];
  const ytShort = url.match(/youtu\.be\/([^?]+)/);
  if (ytShort) return ytShort[1];
  return null;
}

function toEmbedUrl(url: string, autoplay = false): string {
  const ytId = getYouTubeId(url);
  if (ytId) return `https://www.youtube.com/embed/${ytId}?autoplay=${autoplay ? 1 : 0}&rel=0`;
  const spotifyMatch = url.match(/open\.spotify\.com\/(episode|show)\/([^?]+)/);
  if (spotifyMatch) return `https://open.spotify.com/embed/${spotifyMatch[1]}/${spotifyMatch[2]}`;
  return url;
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function VideoModal({ item, onClose }: { item: VideoSchema; onClose: () => void }) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const isSpotify = item.link.includes("spotify.com");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={backdropRef}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
    >
      <div className="relative w-full max-w-[900px]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/60 hover:text-white text-sm primarybold tracking-widest uppercase flex items-center gap-2 transition-colors cursor-pointer"
        >
          Close ✕
        </button>

        {/* Player */}
        <div className={`relative w-full rounded-2xl overflow-hidden bg-black ${isSpotify ? "h-[152px]" : "aspect-video"}`}>
          <iframe
            src={toEmbedUrl(item.link, true)}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Title below player */}
        <div className="mt-4 px-1">
          <h3 className="text-white text-bold-xl leading-snug">{item.title}</h3>
          {item.description && (
            <p className="text-white/50 text-sm mt-1 line-clamp-2">{item.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────

function MediaCard({ item, onPlay }: { item: VideoSchema; onPlay: () => void }) {
  const { t } = useTranslation("news-events");
  const typeLabel = item.type.split("-").pop() ?? item.type;
  const ytId = getYouTubeId(item.link);
  const isSpotify = item.link.includes("spotify.com");
  const thumbnailUrl = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;

  return (
    <div className="flex flex-col gap-4 cursor-pointer group" onClick={onPlay}>
      {/* Thumbnail */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#023d57]">
        {thumbnailUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailUrl}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
          </>
        ) : isSpotify ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 168 168" fill="none">
              <circle cx="84" cy="84" r="84" fill="#1DB954" />
              <path d="M116.9 121.5c-1.5 2.4-4.6 3.2-7 1.7-19.2-11.7-43.4-14.4-71.9-7.9-2.7.6-5.4-1.1-6-3.8-.6-2.7 1.1-5.4 3.8-6 31.2-7.1 58-4.1 79.6 9.1 2.4 1.5 3.2 4.6 1.5 6.9z" fill="white" />
              <path d="M126.8 101.8c-1.9 3-5.9 4-8.9 2.1-22-13.5-55.5-17.4-81.5-9.5-3.4 1-6.9-.9-7.9-4.3-1-3.4.9-6.9 4.3-7.9 29.7-9 66.6-4.6 91.9 10.8 3 1.9 4 5.9 2.1 8.8z" fill="white" />
              <path d="M127.6 81.4c-26.3-15.6-69.8-17.1-95-9.4-4 1.2-8.3-1.1-9.5-5.1-1.2-4 1.1-8.3 5.1-9.5 28.9-8.8 76.9-7 107.2 10.9 3.7 2.2 4.9 6.9 2.7 10.6-2.2 3.6-7 4.8-10.5 2.5z" fill="white" />
            </svg>
          </div>
        ) : (
          <div className="absolute inset-0 bg-[#034D6B]" />
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center
            group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 border border-white/30">
            <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
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
        <h3 className="text-bold-xl text-white leading-snug group-hover:text-[#E0C759] transition-colors duration-200">
          {item.title}
        </h3>
        <p className="text-normal-base text-white/60 line-clamp-3">{item.description}</p>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

function VideosPodcastsPage() {
  const { t } = useTranslation("news-events");
  const dispatch = useAppDispatch();
  const [activeItem, setActiveItem] = useState<VideoSchema | null>(null);

  const tableDataStored = useAppSelector(videosRedux.reducers.selectPageTableListData);
  const tableLoadingState = useAppSelector(videosRedux.reducers.selectPageTableLoadingState);

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
    <>
      <section className="w-full bg-[#034D6B] pb-[120px] flex flex-col">
        {/* Hero */}
        <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 py-[100px] md:py-[170px]">
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
                <MediaCard key={item.id} item={item} onPlay={() => setActiveItem(item)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {activeItem && (
        <VideoModal item={activeItem} onClose={() => setActiveItem(null)} />
      )}
    </>
  );
}

export default VideosPodcastsPage;
