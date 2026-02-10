import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { actions } from "./index";
import * as schemas from "@/backend/models/advisory";
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
  data: schemas.AdvisorySchema | null;
  dataLoadingState: ComponentStateEnumValues;
  tableListData: schemas.ListResponseAdvisorysSchema;
  tableFilterOptions: schemas.FilterAdvisorysSchema;
  recentSearchCache: schemas.AdvisorySchema[];
  tableLoadingState: ComponentStateEnumValues;
  tableShouldRefresh: boolean;
}
const initialState: InitialState = {
  status: ComponentStateEnum.IDLE,
  tableFilterOptions: FiltersDefault,
  tableListData:
    fetchListDefaultResponse as schemas.ListResponseAdvisorysSchema,
  recentSearchCache: [],
  tableLoadingState: ComponentStateEnum.IDLE,
  tableShouldRefresh: true,
  data: null,
  dataLoadingState: ComponentStateEnum.IDLE,
};

// Utility function to update or insert recent search
const upsertCache = (
  cache: schemas.AdvisorySchema[],
  newData: schemas.AdvisorySchema
): schemas.AdvisorySchema[] => {
  const existingIndex = cache.findIndex((item) => item.id === newData.id);

  if (existingIndex !== -1) {
    cache[existingIndex] = newData as schemas.AdvisorySchema;
  } else {
    cache.unshift(newData as schemas.AdvisorySchema);
  }

  const uniqueCache = [
    ...new Map(cache.map((item) => [item.id, item])).values(),
  ];
  return uniqueCache.slice(0, 7);
};

// Utility function to delete from recent search cache
const deleteFromCache = (
  cache: schemas.AdvisorySchema[],
  id: string
): schemas.AdvisorySchema[] => {
  return cache.filter((item) => item.id !== id);
};

const advisorySlice = createSlice({
  name: "advisory",
  initialState,
  reducers: {
    updateTableFilterOptions: (
      state,
      action: PayloadAction<{
        tableFilterOptions: schemas.FilterAdvisorysSchema;
      }>
    ) => {
      //let filterData = removeUndefinedValues(action.payload.tableFilterOptions);
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

    upsertRecentSearch: (
      state,
      action: PayloadAction<{ data: schemas.AdvisorySchema }>
    ) => {
      state.recentSearchCache = upsertCache(
        state.recentSearchCache,
        action.payload.data
      );
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
      // For filterPersistAsync
      .addCase(actions.filterAdvisorysPersistAsync.pending, (state) => {
        state.tableLoadingState = ComponentStateEnum.LOADING;
      })
      .addCase(
        actions.filterAdvisorysPersistAsync.fulfilled,
        (state, action) => {
          state.tableLoadingState = ComponentStateEnum.IDLE;
          state.tableListData = action.payload!;
          state.tableShouldRefresh = false;
        }
      )
      .addCase(actions.filterAdvisorysPersistAsync.rejected, (state) => {
        state.tableLoadingState = ComponentStateEnum.FAILED;
      })

      // For deleteAsync
      .addCase(actions.deleteAdvisoryAsync.fulfilled, (state, action) => {
        state.recentSearchCache = deleteFromCache(
          state.recentSearchCache,
          action.payload.data.id
        );
      });
  },
});

export const {
  updateTableFilterOptions,
  upsertRecentSearch,
  updateTableFilterOptionsPagination,
  updateTableFilterOptionsSorting,
} = advisorySlice.actions;

export const selectTableListData = (state: RootState) =>
  state.advisoryCircle.tableListData;
export const selectLoadingState = (state: RootState) => state.advisoryCircle.status;
export const selectTableFilterOptions = (state: RootState) =>
  state.advisoryCircle.tableFilterOptions;

export const selectTableLoadingState = (state: RootState) =>
  state.advisoryCircle.tableLoadingState;
export const selectTableShouldRefresh = (state: RootState) =>
  state.advisoryCircle.tableShouldRefresh;

export const selectdata = (state: RootState) => state.advisoryCircle.data;
export const selectProfileLoadingState = (state: RootState) =>
  state.advisoryCircle.dataLoadingState;

export default advisorySlice.reducer;
