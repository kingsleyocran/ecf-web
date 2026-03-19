import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { actions } from "./index";
import * as schemas from "@/backend/models/events";
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
  tableListData: schemas.ListResponseEventsSchema;
  tableFilterOptions: schemas.FilterEventsSchema;
  tableLoadingState: ComponentStateEnumValues;
  pageTableListData: schemas.ListResponseEventsSchema;
  pageTableFilterOptions: schemas.FilterEventsSchema;
  pageTableLoadingState: ComponentStateEnumValues;
  recentSearchCache: schemas.EventSchema[];
  tableShouldRefresh: boolean;
}
const initialState: InitialState = {
  status: ComponentStateEnum.IDLE,
  tableFilterOptions: FiltersDefault,
  tableListData: fetchListDefaultResponse as schemas.ListResponseEventsSchema,
  tableLoadingState: ComponentStateEnum.IDLE,
  pageTableFilterOptions: FiltersDefault,
  pageTableListData: fetchListDefaultResponse as schemas.ListResponseEventsSchema,
  pageTableLoadingState: ComponentStateEnum.IDLE,
  recentSearchCache: [],
  tableShouldRefresh: true,
};

const deleteFromCache = (
  cache: schemas.EventSchema[],
  id: string
): schemas.EventSchema[] => {
  return cache.filter((item) => item.id !== id);
};

const EventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    updateTableFilterOptions: (
      state,
      action: PayloadAction<{
        tableFilterOptions: schemas.FilterEventsSchema;
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
        tableFilterOptions: schemas.FilterEventsSchema;
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
      .addCase(actions.filterEventPersistAsync.pending, (state) => {
        state.tableLoadingState = ComponentStateEnum.LOADING;
      })
      .addCase(actions.filterEventPersistAsync.fulfilled, (state, action) => {
        state.tableLoadingState = ComponentStateEnum.IDLE;
        state.tableListData = action.payload!;
        state.tableShouldRefresh = false;
      })
      .addCase(actions.filterEventPersistAsync.rejected, (state) => {
        state.tableLoadingState = ComponentStateEnum.FAILED;
      })

      .addCase(actions.filterPageEventPersistAsync.pending, (state) => {
        state.pageTableLoadingState = ComponentStateEnum.LOADING;
      })
      .addCase(
        actions.filterPageEventPersistAsync.fulfilled,
        (state, action) => {
          state.pageTableLoadingState = ComponentStateEnum.IDLE;
          state.pageTableListData = action.payload!;
        }
      )
      .addCase(actions.filterPageEventPersistAsync.rejected, (state) => {
        state.pageTableLoadingState = ComponentStateEnum.FAILED;
      })

      .addCase(actions.deleteEventAsync.fulfilled, (state, action) => {
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
} = EventSlice.actions;

export const selectLoadingState = (state: RootState) => state.events.status;
export const selectTableListData = (state: RootState) =>
  state.events.tableListData;
export const selectTableFilterOptions = (state: RootState) =>
  state.events.tableFilterOptions;
export const selectTableLoadingState = (state: RootState) =>
  state.events.tableLoadingState;

export const selectPageTableListData = (state: RootState) =>
  state.events.pageTableListData;
export const selectPageTableFilterOptions = (state: RootState) =>
  state.events.pageTableFilterOptions;
export const selectPageTableLoadingState = (state: RootState) =>
  state.events.pageTableLoadingState;

export const selectTableShouldRefresh = (state: RootState) =>
  state.events.tableShouldRefresh;

export default EventSlice.reducer;
