import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { actions } from "./index";
import * as schemas from "@/backend/models/team";
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
  data: schemas.TeamMemberSchema | null;
  dataLoadingState: ComponentStateEnumValues;
  tableListData: schemas.ListResponseTeamMembersSchema;
  tableFilterOptions: schemas.FilterTeamMembersSchema;
  recentSearchCache: schemas.TeamMemberSchema[];
  tableLoadingState: ComponentStateEnumValues;
  tableShouldRefresh: boolean;
}
const initialState: InitialState = {
  status: ComponentStateEnum.IDLE,
  tableFilterOptions: FiltersDefault,
  tableListData:
    fetchListDefaultResponse as schemas.ListResponseTeamMembersSchema,
  recentSearchCache: [],
  tableLoadingState: ComponentStateEnum.IDLE,
  tableShouldRefresh: true,
  data: null,
  dataLoadingState: ComponentStateEnum.IDLE,
};

// Utility function to update or insert recent search
const upsertCache = (
  cache: schemas.TeamMemberSchema[],
  newData: schemas.TeamMemberSchema
): schemas.TeamMemberSchema[] => {
  const existingIndex = cache.findIndex((item) => item.id === newData.id);

  if (existingIndex !== -1) {
    cache[existingIndex] = newData as schemas.TeamMemberSchema;
  } else {
    cache.unshift(newData as schemas.TeamMemberSchema);
  }

  const uniqueCache = [
    ...new Map(cache.map((item) => [item.id, item])).values(),
  ];
  return uniqueCache.slice(0, 7);
};

// Utility function to delete from recent search cache
const deleteFromCache = (
  cache: schemas.TeamMemberSchema[],
  id: string
): schemas.TeamMemberSchema[] => {
  return cache.filter((item) => item.id !== id);
};

const teamlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    updateTableFilterOptions: (
      state,
      action: PayloadAction<{
        tableFilterOptions: schemas.FilterTeamMembersSchema;
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
      action: PayloadAction<{ data: schemas.TeamMemberSchema }>
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
      .addCase(actions.filterTeamMembersPersistAsync.pending, (state) => {
        state.tableLoadingState = ComponentStateEnum.LOADING;
      })
      .addCase(
        actions.filterTeamMembersPersistAsync.fulfilled,
        (state, action) => {
          state.tableLoadingState = ComponentStateEnum.IDLE;
          state.tableListData = action.payload!;
          state.tableShouldRefresh = false;
        }
      )
      .addCase(actions.filterTeamMembersPersistAsync.rejected, (state) => {
        state.tableLoadingState = ComponentStateEnum.FAILED;
      })

      // For deleteAsync
      .addCase(actions.deleteTeamMemberAsync.fulfilled, (state, action) => {
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
} = teamlice.actions;

export const selectTableListData = (state: RootState) =>
  state.team.tableListData;
export const selectLoadingState = (state: RootState) => state.team.status;
export const selectTableFilterOptions = (state: RootState) =>
  state.team.tableFilterOptions;

export const selectTableLoadingState = (state: RootState) =>
  state.team.tableLoadingState;
export const selectTableShouldRefresh = (state: RootState) =>
  state.team.tableShouldRefresh;

export const selectdata = (state: RootState) => state.team.data;
export const selectProfileLoadingState = (state: RootState) =>
  state.team.dataLoadingState;

export default teamlice.reducer;
