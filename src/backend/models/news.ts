import {
  FetchMultiDataResponse,
  FilterDataRequest,
  SuccessMessageResponse,
} from "./_shared";

// Schema for creating a news article in Firestore
export interface CreateNewsArticleSchema {
  source: string;        // e.g. "srm360"
  title: string;
  titleSearch: string;   // lowercase for search (matches ecf_web pattern)
  description: string | null;
  imageUrl: string | null;
  link: string;          // original article URL
}

// Full Firestore document shape (includes generated fields)
export interface NewsArticleSchema extends CreateNewsArticleSchema {
  id: string;
  crawledAt: any;   // Firestore Timestamp (when it was crawled)
  createdAt: any;
  updatedAt: any;
}

// Transient shape used only inside CrawlNewsModal / API response
// NOT stored as-is — source, crawledAt, createdAt, updatedAt are injected on save
export interface CrawledArticle {
  title: string;
  description: string | null;
  imageUrl: string | null;
  link: string;
}

// Filter schema for Firestore queries
export interface FilterNewsSchema extends FilterDataRequest {
  titleSearch?: string;  // prefix search on titleSearch field
  source?: string;       // exact match on source field
}

export interface ResponseNewsSchema extends SuccessMessageResponse {
  data: NewsArticleSchema;
}

export interface ListResponseNewsSchema extends FetchMultiDataResponse {
  data: NewsArticleSchema[];
}
