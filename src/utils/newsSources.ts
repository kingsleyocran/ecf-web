// Hardcoded news source configurations.
// Each source defines where to crawl for news articles.
// To add a new source: push a new entry to NEWS_SOURCES and rebuild.
// The `id` field is stored in every news_articles Firestore document as `source`.

export interface NewsSource {
  id: string;           // Stored in Firestore as the `source` field
  displayName: string;  // Human-readable name shown in the dashboard
  url: string;          // URL the crawl API fetches
  description: string;
}

export const NEWS_SOURCES: NewsSource[] = [
  {
    id: "srm360",
    displayName: "SRM360",
    url: "https://srm360.org/library/?post-type=news-reaction",
    description: "SRM360 climate and sustainability news feed",
  },
];

// O(1) lookup map — use NEWS_SOURCES_MAP[sourceId] to get source config
export const NEWS_SOURCES_MAP: Record<string, NewsSource> = Object.fromEntries(
  NEWS_SOURCES.map((s) => [s.id, s])
);
