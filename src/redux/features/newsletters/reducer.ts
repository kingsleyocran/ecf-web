import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { actions } from "./index";
import * as schemas from "@/backend/models/newsletters";
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
  tableListData: schemas.ListResponseNewslettersSchema;
  tableFilterOptions: schemas.FilterNewslettersSchema;
  tableLoadingState: ComponentStateEnumValues;
  pageTableListData: schemas.ListResponseNewslettersSchema;
  pageTableFilterOptions: schemas.FilterNewslettersSchema;
  pageTableLoadingState: ComponentStateEnumValues;
  recentSearchCache: schemas.NewsletterSchema[];
  tableShouldRefresh: boolean;
}
const initialState: InitialState = {
  status: ComponentStateEnum.IDLE,
  tableFilterOptions: FiltersDefault,
  tableListData: fetchListDefaultResponse as schemas.ListResponseNewslettersSchema,
  tableLoadingState: ComponentStateEnum.IDLE,
  pageTableFilterOptions: FiltersDefault,
  pageTableListData: fetchListDefaultResponse as schemas.ListResponseNewslettersSchema,
  pageTableLoadingState: ComponentStateEnum.IDLE,
  recentSearchCache: [],
  tableShouldRefresh: true,
};

const deleteFromCache = (
  cache: schemas.NewsletterSchema[],
  id: string
): schemas.NewsletterSchema[] => {
  return cache.filter((item) => item.id !== id);
};

const NewsletterSlice = createSlice({
  name: "newsletters",
  initialState,
  reducers: {
    updateTableFilterOptions: (
      state,
      action: PayloadAction<{
        tableFilterOptions: schemas.FilterNewslettersSchema;
      }>
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

    updatePageTableFilterOptions: (
      state,
      action: PayloadAction<{
        tableFilterOptions: schemas.FilterNewslettersSchema;
      }>
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

    updatePageTableFilterOptionsSorting: (
      state,
      action: PayloadAction<{ data: SortingFilterSchema }>
    ) => {
      state.pageTableFilterOptions = {
        ...state.pageTableFilterOptions,
        ...action.payload.data,
      };
    },

    deleteFromRecentSearch: (state, action: PayloadAction<{ id: string }>) => {
      state.recentSearchCache = deleteFromCache(
        state.recentSearchCache,
        action.payload.id
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(actions.filterNewsletterPersistAsync.pending, (state) => {
        state.tableLoadingState = ComponentStateEnum.LOADING;
      })
      .addCase(actions.filterNewsletterPersistAsync.fulfilled, (state, action) => {
        state.tableLoadingState = ComponentStateEnum.IDLE;
        state.tableListData = action.payload!;
        state.tableShouldRefresh = false;
      })
      .addCase(actions.filterNewsletterPersistAsync.rejected, (state) => {
        state.tableLoadingState = ComponentStateEnum.FAILED;
      })

      .addCase(actions.filterPageNewsletterPersistAsync.pending, (state) => {
        state.pageTableLoadingState = ComponentStateEnum.LOADING;
      })
      .addCase(
        actions.filterPageNewsletterPersistAsync.fulfilled,
        (state, action) => {
          state.pageTableLoadingState = ComponentStateEnum.IDLE;
          state.pageTableListData = action.payload!;
        }
      )
      .addCase(actions.filterPageNewsletterPersistAsync.rejected, (state) => {
        state.pageTableLoadingState = ComponentStateEnum.FAILED;
      })

      .addCase(actions.deleteNewsletterAsync.fulfilled, (state, action) => {
        state.recentSearchCache = deleteFromCache(
          state.recentSearchCache,
          action.payload.data.id
        );
      });
  },
});

export const {
  updateTableFilterOptions,
  updateTableFilterOptionsPagination,
  updateTableFilterOptionsSorting,
  updatePageTableFilterOptions,
  updatePageTableFilterOptionsPagination,
  updatePageTableFilterOptionsSorting,
} = NewsletterSlice.actions;

export const selectLoadingState = (state: RootState) => state.newsletters.status;
export const selectTableListData = (state: RootState) =>
  state.newsletters.tableListData;
export const selectTableFilterOptions = (state: RootState) =>
  state.newsletters.tableFilterOptions;
export const selectTableLoadingState = (state: RootState) =>
  state.newsletters.tableLoadingState;

export const selectPageTableListData = (state: RootState) =>
  state.newsletters.pageTableListData;
export const selectPageTableFilterOptions = (state: RootState) =>
  state.newsletters.pageTableFilterOptions;
export const selectPageTableLoadingState = (state: RootState) =>
  state.newsletters.pageTableLoadingState;

export const selectTableShouldRefresh = (state: RootState) =>
  state.newsletters.tableShouldRefresh;

export default NewsletterSlice.reducer;
