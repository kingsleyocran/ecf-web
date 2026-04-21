import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../backend/firebase/db/api/news_api";
import * as schemas from "../../../backend/models/news";
import { reducers } from ".";
import { ResponseIndicator } from "@/backend/models/_shared";
import { AppThunk } from "@/redux/app/store";
import ErrorToast from "@/components/toast/ErrorToast";

const urlPrefix = "/news";

// ─── Admin dashboard table fetch ────────────────────────────────────────────

export const filterNewsTablePersistAsync = createAsyncThunk(
  `get:${urlPrefix}/table-filter-persist`,
  async (request: { data: schemas.FilterNewsSchema }, ThunkApi) => {
    try {
      console.log(
        "[NewsActions] filterNewsTablePersistAsync — filter:",
        request.data
      );
      const [data, status] = await api.filterNewsArticlesApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseNewsSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      console.error("[NewsActions] filterNewsTablePersistAsync error:", error);
      return ThunkApi.rejectWithValue(error);
    }
  }
);

// ─── Public page fetch ──────────────────────────────────────────────────────

export const filterNewsPagePersistAsync = createAsyncThunk(
  `get:${urlPrefix}/page-filter-persist`,
  async (request: { data: schemas.FilterNewsSchema }, ThunkApi) => {
    try {
      console.log(
        "[NewsActions] filterNewsPagePersistAsync — filter:",
        request.data
      );
      const [data, status] = await api.filterNewsArticlesApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseNewsSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      console.error("[NewsActions] filterNewsPagePersistAsync error:", error);
      return ThunkApi.rejectWithValue(error);
    }
  }
);

// ─── Batch create (save crawled articles) ───────────────────────────────────

export const batchCreateNewsArticlesAsync = createAsyncThunk(
  `post:${urlPrefix}/batch`,
  async (
    request: { articles: schemas.CreateNewsArticleSchema[] },
    ThunkApi
  ) => {
    try {
      console.log(
        `[NewsActions] batchCreateNewsArticlesAsync — saving ${request.articles.length} articles`
      );
      const [data, status] = await api.batchCreateNewsArticlesApi(
        request.articles
      );
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          console.log("[NewsActions] batchCreateNewsArticlesAsync success:", data);
          return data as { data: number; message: string };
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      console.error("[NewsActions] batchCreateNewsArticlesAsync error:", error);
      return ThunkApi.rejectWithValue(error);
    }
  }
);

// ─── Delete a single article ─────────────────────────────────────────────────

export const deleteNewsArticleAsync = createAsyncThunk(
  `delete:${urlPrefix}/:id`,
  async (request: schemas.NewsArticleSchema, ThunkApi) => {
    console.log(
      `[NewsActions] deleteNewsArticleAsync — deleting id: ${request.id}`
    );
    const [data, status] = await api.deleteNewsArticleApi(request);
    if (status === ResponseIndicator.SUCCESS) {
      return data as schemas.ResponseNewsSchema;
    }
    return ThunkApi.rejectWithValue(data);
  }
);

// ─── AppThunk helpers ────────────────────────────────────────────────────────

/** Fetch table data using current Redux filter options */
export const fetchNewsTableWithFilters = (): AppThunk => (dispatch, getState) => {
  let currentFilter = reducers.selectTableFilterOptions(getState());
  // Remove 'id' key like the blogs pattern does
  currentFilter = Object.fromEntries(
    Object.entries(currentFilter).filter(([key]) => !["id"].includes(key))
  ) as schemas.FilterNewsSchema;

  console.log(
    "[NewsActions] fetchNewsTableWithFilters — filter:",
    currentFilter
  );

  dispatch(filterNewsTablePersistAsync({ data: currentFilter })).then(
    async (responseData: any) => {
      if (responseData.meta.requestStatus === "rejected") {
        console.error(
          "[NewsActions] fetchNewsTableWithFilters rejected:",
          responseData
        );
        ErrorToast({ message: "Failed to fetch news articles" });
      }
    }
  );
};

/** Only fetch if there's no data in the store yet */
export const checkBeforeFilterNews = (): AppThunk => (dispatch, getState) => {
  const currentData = reducers.selectTableListData(getState());
  console.log(
    "[NewsActions] checkBeforeFilterNews — existing data count:",
    currentData?.data?.length ?? 0
  );
  if (!currentData || currentData.data?.length === 0) {
    dispatch(fetchNewsTableWithFilters());
  }
};

/** Fetch public page news (all articles, no source filter, ordered by crawledAt desc) */
export const fetchPageNewsWithFilters = (): AppThunk => (dispatch, getState) => {
  let currentFilter = reducers.selectPageTableFilterOptions(getState());
  currentFilter = Object.fromEntries(
    Object.entries(currentFilter).filter(([key]) => !["id"].includes(key))
  ) as schemas.FilterNewsSchema;

  console.log(
    "[NewsActions] fetchPageNewsWithFilters — filter:",
    currentFilter
  );

  dispatch(filterNewsPagePersistAsync({ data: currentFilter })).then(
    async (responseData: any) => {
      if (responseData.meta.requestStatus === "rejected") {
        console.error(
          "[NewsActions] fetchPageNewsWithFilters rejected:",
          responseData
        );
        ErrorToast({ message: "Failed to load latest news" });
      }
    }
  );
};

/** Only fetch public page news if no data yet */
export const checkBeforeFilterPageNews = (): AppThunk => (dispatch, getState) => {
  const currentData = reducers.selectPageTableListData(getState());
  console.log(
    "[NewsActions] checkBeforeFilterPageNews — existing data count:",
    currentData?.data?.length ?? 0
  );
  if (!currentData || currentData.data?.length === 0) {
    dispatch(fetchPageNewsWithFilters());
  }
};
