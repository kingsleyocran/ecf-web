import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { actions } from "./index";
import * as schemas from "@/backend/models/opeds";
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
  tableListData: schemas.ListResponseOpedsSchema;
  tableFilterOptions: schemas.FilterOpedsSchema;
  tableLoadingState: ComponentStateEnumValues;
  pageTableListData: schemas.ListResponseOpedsSchema;
  pageTableFilterOptions: schemas.FilterOpedsSchema;
  pageTableLoadingState: ComponentStateEnumValues;
  recentSearchCache: schemas.OpEdSchema[];
  tableShouldRefresh: boolean;
}
const initialState: InitialState = {
  status: ComponentStateEnum.IDLE,
  tableFilterOptions: FiltersDefault,
  tableListData: fetchListDefaultResponse as schemas.ListResponseOpedsSchema,
  tableLoadingState: ComponentStateEnum.IDLE,
  pageTableFilterOptions: FiltersDefault,
  pageTableListData: fetchListDefaultResponse as schemas.ListResponseOpedsSchema,
  pageTableLoadingState: ComponentStateEnum.IDLE,
  recentSearchCache: [],
  tableShouldRefresh: true,
};

const deleteFromCache = (
  cache: schemas.OpEdSchema[],
  id: string
): schemas.OpEdSchema[] => {
  return cache.filter((item) => item.id !== id);
};

const OpEdSlice = createSlice({
  name: "opeds",
  initialState,
  reducers: {
    updateTableFilterOptions: (
      state,
      action: PayloadAction<{
        tableFilterOptions: schemas.FilterOpedsSchema;
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
        tableFilterOptions: schemas.FilterOpedsSchema;
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
      .addCase(actions.filterOpEdPersistAsync.pending, (state) => {
        state.tableLoadingState = ComponentStateEnum.LOADING;
      })
      .addCase(actions.filterOpEdPersistAsync.fulfilled, (state, action) => {
        state.tableLoadingState = ComponentStateEnum.IDLE;
        state.tableListData = action.payload!;
        state.tableShouldRefresh = false;
      })
      .addCase(actions.filterOpEdPersistAsync.rejected, (state) => {
        state.tableLoadingState = ComponentStateEnum.FAILED;
      })

      .addCase(actions.filterPageOpEdPersistAsync.pending, (state) => {
        state.pageTableLoadingState = ComponentStateEnum.LOADING;
      })
      .addCase(
        actions.filterPageOpEdPersistAsync.fulfilled,
        (state, action) => {
          state.pageTableLoadingState = ComponentStateEnum.IDLE;
          state.pageTableListData = action.payload!;
        }
      )
      .addCase(actions.filterPageOpEdPersistAsync.rejected, (state) => {
        state.pageTableLoadingState = ComponentStateEnum.FAILED;
      })

      .addCase(actions.deleteOpEdAsync.fulfilled, (state, action) => {
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
} = OpEdSlice.actions;

export const selectLoadingState = (state: RootState) => state.opeds.status;
export const selectTableListData = (state: RootState) =>
  state.opeds.tableListData;
export const selectTableFilterOptions = (state: RootState) =>
  state.opeds.tableFilterOptions;
export const selectTableLoadingState = (state: RootState) =>
  state.opeds.tableLoadingState;

export const selectPageTableListData = (state: RootState) =>
  state.opeds.pageTableListData;
export const selectPageTableFilterOptions = (state: RootState) =>
  state.opeds.pageTableFilterOptions;
export const selectPageTableLoadingState = (state: RootState) =>
  state.opeds.pageTableLoadingState;

export const selectTableShouldRefresh = (state: RootState) =>
  state.opeds.tableShouldRefresh;

export default OpEdSlice.reducer;
