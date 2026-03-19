import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { actions } from "./index";
import * as schemas from "@/backend/models/reports";
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
  tableListData: schemas.ListResponseReportsSchema;
  tableFilterOptions: schemas.FilterReportsSchema;
  tableLoadingState: ComponentStateEnumValues;
  pageTableListData: schemas.ListResponseReportsSchema;
  pageTableFilterOptions: schemas.FilterReportsSchema;
  pageTableLoadingState: ComponentStateEnumValues;
  recentSearchCache: schemas.ReportSchema[];
  tableShouldRefresh: boolean;
}
const initialState: InitialState = {
  status: ComponentStateEnum.IDLE,
  tableFilterOptions: FiltersDefault,
  tableListData: fetchListDefaultResponse as schemas.ListResponseReportsSchema,
  tableLoadingState: ComponentStateEnum.IDLE,
  pageTableFilterOptions: FiltersDefault,
  pageTableListData: fetchListDefaultResponse as schemas.ListResponseReportsSchema,
  pageTableLoadingState: ComponentStateEnum.IDLE,
  recentSearchCache: [],
  tableShouldRefresh: true,
};

const deleteFromCache = (
  cache: schemas.ReportSchema[],
  id: string
): schemas.ReportSchema[] => {
  return cache.filter((item) => item.id !== id);
};

const ReportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    updateTableFilterOptions: (
      state,
      action: PayloadAction<{
        tableFilterOptions: schemas.FilterReportsSchema;
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
        tableFilterOptions: schemas.FilterReportsSchema;
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
      .addCase(actions.filterReportPersistAsync.pending, (state) => {
        state.tableLoadingState = ComponentStateEnum.LOADING;
      })
      .addCase(actions.filterReportPersistAsync.fulfilled, (state, action) => {
        state.tableLoadingState = ComponentStateEnum.IDLE;
        state.tableListData = action.payload!;
        state.tableShouldRefresh = false;
      })
      .addCase(actions.filterReportPersistAsync.rejected, (state) => {
        state.tableLoadingState = ComponentStateEnum.FAILED;
      })

      .addCase(actions.filterPageReportPersistAsync.pending, (state) => {
        state.pageTableLoadingState = ComponentStateEnum.LOADING;
      })
      .addCase(
        actions.filterPageReportPersistAsync.fulfilled,
        (state, action) => {
          state.pageTableLoadingState = ComponentStateEnum.IDLE;
          state.pageTableListData = action.payload!;
        }
      )
      .addCase(actions.filterPageReportPersistAsync.rejected, (state) => {
        state.pageTableLoadingState = ComponentStateEnum.FAILED;
      })

      .addCase(actions.deleteReportAsync.fulfilled, (state, action) => {
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
} = ReportSlice.actions;

export const selectLoadingState = (state: RootState) => state.reports.status;
export const selectTableListData = (state: RootState) =>
  state.reports.tableListData;
export const selectTableFilterOptions = (state: RootState) =>
  state.reports.tableFilterOptions;
export const selectTableLoadingState = (state: RootState) =>
  state.reports.tableLoadingState;

export const selectPageTableListData = (state: RootState) =>
  state.reports.pageTableListData;
export const selectPageTableFilterOptions = (state: RootState) =>
  state.reports.pageTableFilterOptions;
export const selectPageTableLoadingState = (state: RootState) =>
  state.reports.pageTableLoadingState;

export const selectTableShouldRefresh = (state: RootState) =>
  state.reports.tableShouldRefresh;

export default ReportSlice.reducer;
