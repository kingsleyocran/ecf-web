import type { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from "cheerio";
import { NEWS_SOURCES_MAP } from "@/utils/newsSources";
import type { CrawledArticle } from "@/backend/models/news";

/**
 * Required: disable Next.js response size limit so SSE can stream continuously.
 */
export const config = {
  api: {
    responseLimit: false,
  },
};

/**
 * SSE Crawl API — GET /api/crawl-news?source=srm360
 *
 * Streams Server-Sent Events (SSE) back to the client:
 *   event: log    — real-time progress log line
 *   event: done   — final article list (crawl complete)
 *   event: error  — fatal domain error (connection stays open until res.end())
 *
 * Client usage:
 *   const es = new EventSource('/api/crawl-news?source=srm360');
 *   es.addEventListener('log', (e) => console.log(JSON.parse(e.data).message));
 *   es.addEventListener('done', (e) => handleArticles(JSON.parse(e.data).articles));
 *   es.addEventListener('error', (e) => handleError(JSON.parse(e.data).message));
 *   es.onerror = () => handleConnectionFailure();
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed — use GET" });
    return;
  }

  const sourceId =
    typeof req.query.source === "string" ? req.query.source : null;

  // ─── Set SSE headers BEFORE any write ─────────────────────────────────────
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  // Disable nginx/proxy buffering if behind a reverse proxy
  res.setHeader("X-Accel-Buffering", "no");

  // CRITICAL: flush headers immediately so the browser starts receiving events
  res.flushHeaders();

  /**
   * Helper — write a named SSE event.
   * Format: "event: <name>\ndata: <json>\n\n"
   */
  const sendEvent = (
    eventName: string,
    data: Record<string, unknown>
  ) => {
    res.write(`event: ${eventName}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  const log = (message: string, level: "info" | "warn" | "error" = "info") => {
    console.log(`[CrawlAPI][${level.toUpperCase()}] ${message}`);
    sendEvent("log", { message, level });
  };

  try {
    console.log(`[CrawlAPI] === New crawl request — source: "${sourceId}" ===`);
    log(`Starting crawl for source: "${sourceId ?? "unknown"}"`, "info");

    // ─── Validate source ────────────────────────────────────────────────────
    if (!sourceId) {
      log('Missing "source" query parameter', "error");
      sendEvent("error", {
        message: 'Missing "source" query parameter. Usage: /api/crawl-news?source=srm360',
      });
      res.end();
      return;
    }

    const source = NEWS_SOURCES_MAP[sourceId];
    if (!source) {
      log(`Unknown source id: "${sourceId}"`, "error");
      sendEvent("error", {
        message: `Unknown source: "${sourceId}". Check src/utils/newsSources.ts for valid source IDs.`,
      });
      res.end();
      return;
    }

    log(`Source: ${source.displayName}`, "info");

    if (!source.url) {
      log("Source URL is not configured", "error");
      sendEvent("error", {
        message: `Source URL for "${source.displayName}" is empty. Edit src/utils/newsSources.ts to set the URL.`,
      });
      res.end();
      return;
    }

    log(`Target URL: ${source.url}`, "info");

    // ─── Fetch the page HTML ─────────────────────────────────────────────────
    log("Sending HTTP GET request to source...", "info");
    let html: string;
    try {
      const fetchRes = await fetch(source.url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; ECF-Crawler/1.0; +https://emergingclimatefrontiers.org)",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
        },
      });

      console.log(
        `[CrawlAPI] HTTP response: ${fetchRes.status} ${fetchRes.statusText}`
      );

      if (!fetchRes.ok) {
        throw new Error(
          `HTTP ${fetchRes.status} ${fetchRes.statusText} from ${source.url}`
        );
      }

      html = await fetchRes.text();
      console.log(`[CrawlAPI] Fetched ${html.length} bytes of HTML`);
      log(
        `Fetched ${(html.length / 1024).toFixed(1)} KB of HTML — parsing...`,
        "info"
      );
    } catch (fetchErr: any) {
      console.error("[CrawlAPI] Fetch failed:", fetchErr.message);
      log(`Failed to fetch source page: ${fetchErr.message}`, "error");
      sendEvent("error", {
        message: `Network error fetching ${source.url}: ${fetchErr.message}`,
      });
      res.end();
      return;
    }

    // ─── Parse HTML with Cheerio ─────────────────────────────────────────────
    log("Parsing HTML structure...", "info");
    const $ = cheerio.load(html);
    const articles: CrawledArticle[] = [];
    const seenLinks = new Set<string>(); // deduplicate by URL

    const sourceOrigin = new URL(source.url).origin;

    console.log("[CrawlAPI] Running CSS selectors...");

    /**
     * SRM360 SELECTOR STRATEGY
     * URL: https://srm360.org/library/?post-type=news-reaction
     *
     * Verified HTML structure (inspected April 2026):
     *
     *   <div class="archive-card">
     *     <div class="archive-card__top">
     *       <div class="archive-card__meta"><h6>News Reaction</h6></div>
     *       <div class="archive-card__img">
     *         <a href="https://srm360.org/news-reaction/..."><img src="https://srm360.org/wp-content/uploads/..."/></a>
     *       </div>
     *       <h4><a href="https://srm360.org/news-reaction/...">Article Title</a></h4>
     *     </div>
     *     <div class="archive-card__bottom">
     *       <p class="archive-read-time">6 mins</p>
     *     </div>
     *   </div>
     *
     * Note: No description/excerpt is present in the card HTML.
     */

    const postElements = $("div.archive-card");
    console.log(
      `[CrawlAPI] Selector "div.archive-card": found ${postElements.length} card elements`
    );
    log(`Found ${postElements.length} "archive-card" elements on the page`, "info");

    if (postElements.length === 0) {
      log(
        "No archive-card elements found. The page structure may have changed. " +
          "Check the HTML at " + source.url,
        "warn"
      );
    }

    postElements.each((i, el) => {
      const $el = $(el);

      // ── Extract title — from h4 > a inside the card ────────────────────────
      const titleEl = $el.find("h4 a").first();
      const title = titleEl.text().trim();

      // ── Extract link — href on the h4 > a element ─────────────────────────
      const rawLink = titleEl.attr("href") || "";
      const link = rawLink.startsWith("http")
        ? rawLink
        : rawLink.startsWith("/")
        ? `${sourceOrigin}${rawLink}`
        : rawLink
        ? `${sourceOrigin}/${rawLink}`
        : "";

      // ── Extract image — img src inside .archive-card__img ─────────────────
      const rawImageUrl =
        $el.find(".archive-card__img img").first().attr("src") || "";
      const imageUrl = rawImageUrl
        ? rawImageUrl.startsWith("http")
          ? rawImageUrl
          : `${sourceOrigin}${rawImageUrl}`
        : null;

      // ── Read time (stored as description since no excerpt exists) ──────────
      const readTime = $el.find(".archive-read-time").first().text().trim();
      // Use read time as a lightweight description (e.g. "6 mins read")
      const description = readTime ? `${readTime} read` : null;

      console.log(
        `[CrawlAPI] Card [${i + 1}]: title="${title}", link="${link}", image="${rawImageUrl}", readTime="${readTime}"`
      );

      // ── Validate and deduplicate ───────────────────────────────────────────
      if (!title) {
        console.log(`[CrawlAPI]   Skipping card [${i + 1}] — no title`);
        log(`Skipping card ${i + 1} — no title found`, "warn");
        return;
      }

      if (!link) {
        console.log(`[CrawlAPI]   Skipping card [${i + 1}] — no link`);
        log(`Skipping card ${i + 1} ("${title.slice(0, 40)}") — no link found`, "warn");
        return;
      }

      if (seenLinks.has(link)) {
        console.log(`[CrawlAPI]   Skipping card [${i + 1}] — duplicate link`);
        return;
      }
      seenLinks.add(link);

      console.log(
        `[CrawlAPI]   ✓ Article [${articles.length + 1}]: "${title.slice(0, 60)}"`
      );
      log(
        `Found: "${title.slice(0, 60)}${title.length > 60 ? "..." : ""}"`,
        "info"
      );

      articles.push({ title, description, imageUrl, link });
    });

    console.log(`[CrawlAPI] === Crawl complete. Found ${articles.length} articles ===`);
    log(`Crawl complete. Found ${articles.length} article(s).`, "info");

    if (articles.length === 0) {
      log(
        "No articles were extracted. The page structure may not match the expected selectors. " +
          "Inspect the page HTML and update the selectors in src/pages/api/crawl-news.ts.",
        "warn"
      );
    }

    // ─── Send final result ───────────────────────────────────────────────────
    sendEvent("done", { articles });
    res.end();
  } catch (err: any) {
    console.error("[CrawlAPI] Unexpected error:", err);
    sendEvent("error", {
      message: `Unexpected server error: ${err.message}`,
    });
    res.end();
  }
}
