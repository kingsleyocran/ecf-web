import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { actions } from "./index";
import * as schemas from "@/backend/models/news";
import {
  ComponentStateEnum,
  ComponentStateEnumValues,
  fetchListDefaultResponse,
  FiltersDefault,
  PaginationFilterSchema,
  SortingFilterSchema,
} from "@/backend/models/_shared";
import { RootState } from "@/redux/app/store";

interface InitialState {
  status: ComponentStateEnumValues;

  // Admin dashboard table data + filters
  tableListData: schemas.ListResponseNewsSchema;
  tableFilterOptions: schemas.FilterNewsSchema;
  tableLoadingState: ComponentStateEnumValues;
  tableShouldRefresh: boolean;

  // Public page data + filters (all articles, ordered by crawledAt desc)
  pageTableListData: schemas.ListResponseNewsSchema;
  pageTableFilterOptions: schemas.FilterNewsSchema;
  pageTableLoadingState: ComponentStateEnumValues;
}

const initialState: InitialState = {
  status: ComponentStateEnum.IDLE,

  tableListData: fetchListDefaultResponse as schemas.ListResponseNewsSchema,
  tableFilterOptions: {
    ...FiltersDefault,
    orderBy: "crawledAt",
    orderDirection: "desc",
  } as schemas.FilterNewsSchema,
  tableLoadingState: ComponentStateEnum.IDLE,
  tableShouldRefresh: true,

  pageTableListData: fetchListDefaultResponse as schemas.ListResponseNewsSchema,
  pageTableFilterOptions: {
    ...FiltersDefault,
    orderBy: "crawledAt",
    orderDirection: "desc",
  } as schemas.FilterNewsSchema,
  pageTableLoadingState: ComponentStateEnum.IDLE,
};

const NewsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    // ─── Admin table filter updates ───────────────────────────────────────
    updateTableFilterOptions: (
      state,
      action: PayloadAction<{ tableFilterOptions: schemas.FilterNewsSchema }>
    ) => {
      state.tableFilterOptions = {
        ...state.tableFilterOptions,
        ...action.payload.tableFilterOptions,
      };
      state.tableShouldRefresh = true;
    },

    updateTableFilterOptionsPagination: (
      state,
      action: PayloadAction<{ data: PaginationFilterSchema }>
    ) => {
      state.tableFilterOptions = {
        ...state.tableFilterOptions,
        ...action.payload.data,
      };
      state.tableShouldRefresh = true;
    },

    updateTableFilterOptionsSorting: (
      state,
      action: PayloadAction<{ data: SortingFilterSchema }>
    ) => {
      state.tableFilterOptions = {
        ...state.tableFilterOptions,
        ...action.payload.data,
      };
      state.tableShouldRefresh = true;
    },

    // ─── Public page filter updates ───────────────────────────────────────
    updatePageTableFilterOptions: (
      state,
      action: PayloadAction<{ tableFilterOptions: schemas.FilterNewsSchema }>
    ) => {
      state.pageTableFilterOptions = {
        ...state.pageTableFilterOptions,
        ...action.payload.tableFilterOptions,
      };
    },

    updatePageTableFilterOptionsPagination: (
      state,
      action: PayloadAction<{ data: PaginationFilterSchema }>
    ) => {
      state.pageTableFilterOptions = {
        ...state.pageTableFilterOptions,
        ...action.payload.data,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      // Admin table fetch
      .addCase(actions.filterNewsTablePersistAsync.pending, (state) => {
        state.tableLoadingState = ComponentStateEnum.LOADING;
      })
      .addCase(
        actions.filterNewsTablePersistAsync.fulfilled,
        (state, action) => {
          state.tableLoadingState = ComponentStateEnum.IDLE;
          state.tableListData = action.payload!;
          state.tableShouldRefresh = false;
        }
      )
      .addCase(actions.filterNewsTablePersistAsync.rejected, (state) => {
        state.tableLoadingState = ComponentStateEnum.FAILED;
      })

      // Public page fetch
      .addCase(actions.filterNewsPagePersistAsync.pending, (state) => {
        state.pageTableLoadingState = ComponentStateEnum.LOADING;
      })
      .addCase(
        actions.filterNewsPagePersistAsync.fulfilled,
        (state, action) => {
          state.pageTableLoadingState = ComponentStateEnum.IDLE;
          state.pageTableListData = action.payload!;
        }
      )
      .addCase(actions.filterNewsPagePersistAsync.rejected, (state) => {
        state.pageTableLoadingState = ComponentStateEnum.FAILED;
      })

      // After batch create — mark table for refresh so it refetches
      .addCase(actions.batchCreateNewsArticlesAsync.fulfilled, (state) => {
        state.tableShouldRefresh = true;
      })

      // After delete — mark table for refresh
      .addCase(actions.deleteNewsArticleAsync.fulfilled, (state) => {
        state.tableShouldRefresh = true;
      });
  },
});

export const {
  updateTableFilterOptions,
  updateTableFilterOptionsPagination,
  updateTableFilterOptionsSorting,
  updatePageTableFilterOptions,
  updatePageTableFilterOptionsPagination,
} = NewsSlice.actions;

// ─── Selectors ───────────────────────────────────────────────────────────────

export const selectLoadingState = (state: RootState) => state.news.status;

export const selectTableListData = (state: RootState) =>
  state.news.tableListData;
export const selectTableFilterOptions = (state: RootState) =>
  state.news.tableFilterOptions;
export const selectTableLoadingState = (state: RootState) =>
  state.news.tableLoadingState;
export const selectTableShouldRefresh = (state: RootState) =>
  state.news.tableShouldRefresh;

export const selectPageTableListData = (state: RootState) =>
  state.news.pageTableListData;
export const selectPageTableFilterOptions = (state: RootState) =>
  state.news.pageTableFilterOptions;
export const selectPageTableLoadingState = (state: RootState) =>
  state.news.pageTableLoadingState;

export default NewsSlice.reducer;
