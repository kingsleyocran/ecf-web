import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { actions } from "./index";
import * as schemas from "@/backend/models/videos";
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
  tableListData: schemas.ListResponseVideosSchema;
  tableFilterOptions: schemas.FilterVideosSchema;
  tableLoadingState: ComponentStateEnumValues;
  pageTableListData: schemas.ListResponseVideosSchema;
  pageTableFilterOptions: schemas.FilterVideosSchema;
  pageTableLoadingState: ComponentStateEnumValues;
  recentSearchCache: schemas.VideoSchema[];
  tableShouldRefresh: boolean;
}
const initialState: InitialState = {
  status: ComponentStateEnum.IDLE,
  tableFilterOptions: FiltersDefault,
  tableListData: fetchListDefaultResponse as schemas.ListResponseVideosSchema,
  tableLoadingState: ComponentStateEnum.IDLE,
  pageTableFilterOptions: FiltersDefault,
  pageTableListData: fetchListDefaultResponse as schemas.ListResponseVideosSchema,
  pageTableLoadingState: ComponentStateEnum.IDLE,
  recentSearchCache: [],
  tableShouldRefresh: true,
};

const deleteFromCache = (
  cache: schemas.VideoSchema[],
  id: string
): schemas.VideoSchema[] => {
  return cache.filter((item) => item.id !== id);
};

const VideoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    updateTableFilterOptions: (
      state,
      action: PayloadAction<{
        tableFilterOptions: schemas.FilterVideosSchema;
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
        tableFilterOptions: schemas.FilterVideosSchema;
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
      .addCase(actions.filterVideoPersistAsync.pending, (state) => {
        state.tableLoadingState = ComponentStateEnum.LOADING;
      })
      .addCase(actions.filterVideoPersistAsync.fulfilled, (state, action) => {
        state.tableLoadingState = ComponentStateEnum.IDLE;
        state.tableListData = action.payload!;
        state.tableShouldRefresh = false;
      })
      .addCase(actions.filterVideoPersistAsync.rejected, (state) => {
        state.tableLoadingState = ComponentStateEnum.FAILED;
      })

      .addCase(actions.filterPageVideoPersistAsync.pending, (state) => {
        state.pageTableLoadingState = ComponentStateEnum.LOADING;
      })
      .addCase(
        actions.filterPageVideoPersistAsync.fulfilled,
        (state, action) => {
          state.pageTableLoadingState = ComponentStateEnum.IDLE;
          state.pageTableListData = action.payload!;
        }
      )
      .addCase(actions.filterPageVideoPersistAsync.rejected, (state) => {
        state.pageTableLoadingState = ComponentStateEnum.FAILED;
      })

      .addCase(actions.deleteVideoAsync.fulfilled, (state, action) => {
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
} = VideoSlice.actions;

export const selectLoadingState = (state: RootState) => state.videos.status;
export const selectTableListData = (state: RootState) =>
  state.videos.tableListData;
export const selectTableFilterOptions = (state: RootState) =>
  state.videos.tableFilterOptions;
export const selectTableLoadingState = (state: RootState) =>
  state.videos.tableLoadingState;

export const selectPageTableListData = (state: RootState) =>
  state.videos.pageTableListData;
export const selectPageTableFilterOptions = (state: RootState) =>
  state.videos.pageTableFilterOptions;
export const selectPageTableLoadingState = (state: RootState) =>
  state.videos.pageTableLoadingState;

export const selectTableShouldRefresh = (state: RootState) =>
  state.videos.tableShouldRefresh;

export default VideoSlice.reducer;
