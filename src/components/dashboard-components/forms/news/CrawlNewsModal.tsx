import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useAppDispatch } from "@/redux/app/hooks";
import * as newsRedux from "@/redux/features/news";
import { CrawledArticle, CreateNewsArticleSchema } from "@/backend/models/news";
import { NEWS_SOURCES } from "@/utils/newsSources";
import SuccessToast from "@/components/toast/SuccessToast";
import ErrorToast from "@/components/toast/ErrorToast";

type CrawlPhase = "idle" | "crawling" | "done" | "saving" | "error";

type LogLine = {
  message: string;
  level: "info" | "warn" | "error";
};

export default function CrawlNewsModal() {
  const dispatch = useAppDispatch();

  // ─── Modal open/close ──────────────────────────────────────────────────────
  const [isOpen, setIsOpen] = useState(false);

  // ─── Crawl state machine ───────────────────────────────────────────────────
  const [phase, setPhase] = useState<CrawlPhase>("idle");
  const [selectedSourceId, setSelectedSourceId] = useState<string>(
    NEWS_SOURCES[0]?.id ?? ""
  );
  const [logLines, setLogLines] = useState<LogLine[]>([]);
  const [crawledArticles, setCrawledArticles] = useState<CrawledArticle[]>([]);
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Ref to the EventSource so we can close it on unmount
  const eventSourceRef = useRef<EventSource | null>(null);
  // Ref to the log scroll container — auto-scroll to bottom on new logs
  const logScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll log area to bottom whenever new lines arrive
  useEffect(() => {
    if (logScrollRef.current) {
      logScrollRef.current.scrollTop = logScrollRef.current.scrollHeight;
    }
  }, [logLines]);

  // Clean up EventSource on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        console.log("[CrawlModal] Cleanup — closing EventSource on unmount");
        eventSourceRef.current.close();
      }
    };
  }, []);

  function openModal() {
    console.log("[CrawlModal] Opening crawl modal");
    resetState();
    setIsOpen(true);
  }

  function closeModal() {
    console.log("[CrawlModal] Closing crawl modal");
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setIsOpen(false);
  }

  function resetState() {
    setPhase("idle");
    setLogLines([]);
    setCrawledArticles([]);
    setCheckedIds(new Set());
    setErrorMessage(null);
  }

  // ─── Start the SSE crawl ───────────────────────────────────────────────────
  function startCrawl() {
    if (!selectedSourceId) {
      console.warn("[CrawlModal] No source selected");
      return;
    }

    console.log(
      `[CrawlModal] Starting SSE crawl for source: "${selectedSourceId}"`
    );

    setPhase("crawling");
    setLogLines([]);
    setCrawledArticles([]);
    setCheckedIds(new Set());
    setErrorMessage(null);

    const url = `/api/crawl-news?source=${encodeURIComponent(selectedSourceId)}`;
    console.log(`[CrawlModal] Opening EventSource at: ${url}`);

    const es = new EventSource(url);
    eventSourceRef.current = es;

    // ── Named "log" events — real-time console lines ─────────────────────────
    es.addEventListener("log", (e: MessageEvent) => {
      try {
        const parsed = JSON.parse(e.data) as LogLine;
        console.log(`[CrawlModal][SSE log][${parsed.level}] ${parsed.message}`);
        setLogLines((prev) => [...prev, parsed]);
      } catch {
        console.warn("[CrawlModal] Failed to parse log SSE event:", e.data);
      }
    });

    // ── Named "done" event — crawl finished, show article list ───────────────
    es.addEventListener("done", (e: MessageEvent) => {
      try {
        const parsed = JSON.parse(e.data) as { articles: CrawledArticle[] };
        console.log(
          `[CrawlModal][SSE done] Received ${parsed.articles.length} article(s)`
        );
        parsed.articles.forEach((a, i) => {
          console.log(`[CrawlModal]   [${i + 1}] "${a.title}" → ${a.link}`);
        });
        setCrawledArticles(parsed.articles);
        // Pre-check all articles by default
        setCheckedIds(new Set(parsed.articles.map((_, i) => i)));
        setPhase("done");
        es.close();
        eventSourceRef.current = null;
      } catch {
        console.warn("[CrawlModal] Failed to parse done SSE event:", e.data);
      }
    });

    // ── Named "error" event — server sent a domain error ─────────────────────
    // This is DIFFERENT from es.onerror (connection-level failure)
    es.addEventListener("error", (e: MessageEvent) => {
      try {
        const parsed = JSON.parse(e.data) as { message: string };
        console.error(`[CrawlModal][SSE error event] ${parsed.message}`);
        setErrorMessage(parsed.message);
        setPhase("error");
        es.close();
        eventSourceRef.current = null;
      } catch {
        // If we can't parse it, it may be the connection-level onerror firing
        // Don't set error state here — let es.onerror handle connection failures
        console.warn(
          "[CrawlModal] Could not parse SSE error event data (may be connection error):",
          e
        );
      }
    });

    // ── Connection-level error (network failure, 500, CORS, etc.) ────────────
    es.onerror = (e) => {
      // Only fire if we haven't already handled a named "error" event
      if (phase !== "error") {
        console.error("[CrawlModal] EventSource connection-level error:", e);
        setErrorMessage(
          "Connection to the crawl server failed. Check the browser console and server logs for details."
        );
        setPhase("error");
      }
      es.close();
      eventSourceRef.current = null;
    };
  }

  // ─── Save selected articles to Firestore ──────────────────────────────────
  async function handleSave() {
    const selectedArticles: CreateNewsArticleSchema[] = crawledArticles
      .filter((_, i) => checkedIds.has(i))
      .map((a) => ({
        source: selectedSourceId,
        title: a.title,
        titleSearch: a.title.toLowerCase(),
        description: a.description,
        imageUrl: a.imageUrl,
        link: a.link,
      }));

    if (selectedArticles.length === 0) {
      console.warn("[CrawlModal] No articles selected to save");
      return;
    }

    console.log(
      `[CrawlModal] Saving ${selectedArticles.length} selected articles to Firestore...`
    );
    selectedArticles.forEach((a, i) => {
      console.log(`[CrawlModal]   [${i + 1}] "${a.title}"`);
    });

    setPhase("saving");

    try {
      const result = await dispatch(
        newsRedux.actions.batchCreateNewsArticlesAsync({
          articles: selectedArticles,
        })
      );

      if (
        newsRedux.actions.batchCreateNewsArticlesAsync.fulfilled.match(result)
      ) {
        console.log(
          `[CrawlModal] Save successful — ${selectedArticles.length} articles written to Firestore`
        );
        // Refresh the admin table
        dispatch(newsRedux.actions.fetchNewsTableWithFilters());
        SuccessToast({
          message: `${selectedArticles.length} article(s) saved to database.`,
        });
        closeModal();
      } else {
        console.error("[CrawlModal] Save failed:", result.payload);
        ErrorToast({ message: "Failed to save articles. Check console." });
        setPhase("done"); // go back to done so user can retry
      }
    } catch (err: any) {
      console.error("[CrawlModal] Unexpected error during save:", err);
      ErrorToast({ message: `Save error: ${err.message}` });
      setPhase("done");
    }
  }

  // ─── Checkbox helpers ──────────────────────────────────────────────────────
  function toggleCheck(idx: number) {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  }

  function selectAll() {
    setCheckedIds(new Set(crawledArticles.map((_, i) => i)));
  }

  function deselectAll() {
    setCheckedIds(new Set());
  }

  // ─── Log line color class ─────────────────────────────────────────────────
  function logColor(level: string): string {
    if (level === "error") return "text-red-400";
    if (level === "warn") return "text-yellow-400";
    return "text-emerald-400";
  }

  const sourceOptions = NEWS_SOURCES;
  const checkedCount = checkedIds.size;
  const isSaving = phase === "saving";

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={openModal}
        className="text-xs bg-[#034D6B] hover:bg-[#023b53] text-white py-2 px-5 rounded-full transition-colors duration-150"
      >
        Crawl for News ▶
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[99]" onClose={closeModal}>
          {/* Backdrop */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-[700px] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  {/* ── Modal Header ─────────────────────────────────────── */}
                  <DialogTitle className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-200">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Crawl for News
                      </h2>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Fetch and save news articles from external sources
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="bg-neutral-600 hover:bg-neutral-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm transition-colors"
                      disabled={isSaving}
                    >
                      ✕
                    </button>
                  </DialogTitle>

                  <div className="px-6 py-5 space-y-5">
                    {/* ── Source selector + Start button ──────────────────── */}
                    <div className="flex items-end gap-3">
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          News Source
                        </label>
                        <select
                          value={selectedSourceId}
                          onChange={(e) => {
                            console.log(
                              "[CrawlModal] Source changed to:",
                              e.target.value
                            );
                            setSelectedSourceId(e.target.value);
                          }}
                          disabled={
                            phase === "crawling" ||
                            phase === "saving"
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#034D6B] disabled:opacity-50"
                        >
                          {sourceOptions.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.displayName} — {s.url}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={startCrawl}
                        disabled={
                          !selectedSourceId ||
                          phase === "crawling" ||
                          phase === "saving"
                        }
                        className="px-5 py-2 text-sm font-medium rounded-lg bg-[#034D6B] hover:bg-[#023b53] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                      >
                        {phase === "crawling" ? "Crawling..." : "Start Crawl"}
                      </button>
                    </div>

                    {/* ── Console log area ────────────────────────────────── */}
                    {(phase !== "idle" || logLines.length > 0) && (
                      <div>
                        <p className="text-xs font-medium text-gray-600 mb-1">
                          Crawl Log
                        </p>
                        <div
                          ref={logScrollRef}
                          className="bg-[#0d1117] rounded-xl p-3 font-mono text-[11px] h-[180px] overflow-y-auto space-y-0.5 border border-gray-800"
                        >
                          {logLines.length === 0 && phase === "crawling" && (
                            <span className="text-gray-500">
                              Connecting to crawl server...
                            </span>
                          )}
                          {logLines.map((line, i) => (
                            <div key={i} className="flex gap-2">
                              <span className="text-gray-600 select-none">
                                {String(i + 1).padStart(3, " ")}&gt;
                              </span>
                              <span className={logColor(line.level)}>
                                {line.message}
                              </span>
                            </div>
                          ))}
                          {phase === "crawling" && logLines.length > 0 && (
                            <div className="flex gap-2">
                              <span className="text-gray-600 select-none">
                                &nbsp;&nbsp;&nbsp;&gt;
                              </span>
                              <span className="text-gray-400 animate-pulse">
                                ■
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* ── Error state ──────────────────────────────────────── */}
                    {phase === "error" && errorMessage && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-red-800 mb-1">
                          Crawl Failed
                        </p>
                        <p className="text-xs text-red-700">{errorMessage}</p>
                        <button
                          type="button"
                          onClick={resetState}
                          className="mt-3 text-xs text-red-600 underline hover:text-red-800"
                        >
                          Reset and try again
                        </button>
                      </div>
                    )}

                    {/* ── Article checklist (shown after done) ─────────────── */}
                    {(phase === "done" || phase === "saving") &&
                      crawledArticles.length > 0 && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-medium text-gray-700">
                              Found {crawledArticles.length} article
                              {crawledArticles.length !== 1 ? "s" : ""} —{" "}
                              <span className="text-[#034D6B] font-semibold">
                                {checkedCount} selected
                              </span>
                            </p>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={selectAll}
                                className="text-xs text-[#034D6B] hover:underline"
                              >
                                Select all
                              </button>
                              <span className="text-gray-300">|</span>
                              <button
                                type="button"
                                onClick={deselectAll}
                                className="text-xs text-gray-500 hover:underline"
                              >
                                Deselect all
                              </button>
                            </div>
                          </div>

                          <div className="border border-gray-200 rounded-xl overflow-hidden max-h-[240px] overflow-y-auto">
                            {crawledArticles.map((article, i) => (
                              <label
                                key={i}
                                className={`flex items-start gap-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                                  checkedIds.has(i) ? "bg-blue-50/40" : ""
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={checkedIds.has(i)}
                                  onChange={() => toggleCheck(i)}
                                  disabled={isSaving}
                                  className="mt-0.5 accent-[#034D6B] flex-shrink-0"
                                />
                                <div className="flex flex-col gap-0.5 min-w-0">
                                  <p className="text-xs font-medium text-gray-900 line-clamp-2">
                                    {article.title}
                                  </p>
                                  {article.description && (
                                    <p className="text-[11px] text-gray-500 line-clamp-1">
                                      {article.description}
                                    </p>
                                  )}
                                  <a
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-[10px] text-[#034D6B] hover:underline truncate"
                                  >
                                    {article.link}
                                  </a>
                                </div>
                                {article.imageUrl && (
                                  <img
                                    src={article.imageUrl}
                                    alt=""
                                    className="w-14 h-14 object-cover rounded-lg flex-shrink-0 bg-gray-200"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = "none";
                                    }}
                                  />
                                )}
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* ── No articles found after crawl ─────────────────────── */}
                    {phase === "done" && crawledArticles.length === 0 && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                        <p className="text-sm text-yellow-800 font-medium">
                          No articles found
                        </p>
                        <p className="text-xs text-yellow-700 mt-1">
                          The crawl completed but extracted 0 articles. The
                          page selectors may need to be updated to match the
                          site&apos;s HTML structure.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* ── Modal Footer ─────────────────────────────────────── */}
                  <div className="px-6 pb-5 flex items-center justify-between border-t border-gray-200 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      disabled={isSaving}
                      className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-40"
                    >
                      Cancel
                    </button>

                    {(phase === "done" || phase === "saving") &&
                      crawledArticles.length > 0 && (
                        <button
                          type="button"
                          onClick={handleSave}
                          disabled={checkedCount === 0 || isSaving}
                          className="px-6 py-2 text-sm font-medium rounded-lg bg-[#034D6B] hover:bg-[#023b53] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                          {isSaving
                            ? "Saving..."
                            : `Save ${checkedCount} article${checkedCount !== 1 ? "s" : ""} to Database`}
                        </button>
                      )}
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
