import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { actions } from "./index";
import * as schemas from "@/backend/models/blogs";
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
  tableListData: schemas.ListResponseBlogsSchema;
  tableFilterOptions: schemas.FilterBlogsSchema;
  tableLoadingState: ComponentStateEnumValues;
  pageTableListData: schemas.ListResponseBlogsSchema;
  pageTableFilterOptions: schemas.FilterBlogsSchema;
  pageTableLoadingState: ComponentStateEnumValues;
  recentSearchCache: schemas.BlogSchema[];
  tableShouldRefresh: boolean;
}
const initialState: InitialState = {
  status: ComponentStateEnum.IDLE,
  tableFilterOptions: FiltersDefault,
  tableListData: fetchListDefaultResponse as schemas.ListResponseBlogsSchema,
  tableLoadingState: ComponentStateEnum.IDLE,
  pageTableFilterOptions: FiltersDefault,
  pageTableListData: fetchListDefaultResponse as schemas.ListResponseBlogsSchema,
  pageTableLoadingState: ComponentStateEnum.IDLE,
  recentSearchCache: [],
  tableShouldRefresh: true,
};

// Utility function to update or insert recent search
// const upsertCache = (
//   cache: schemas.BlogSchema[],
//   newData: schemas.BlogSchema | schemas.BlogSchema
// ): schemas.BlogSchema[] => {
//   const existingIndex = cache.findIndex((item) => item.id === newData.id);

//   if (existingIndex !== -1) {
//     cache[existingIndex] = newData as schemas.BlogSchema;
//   } else {
//     cache.unshift(newData as schemas.BlogSchema);
//   }

//   const uniqueCache = [
//     ...new Map(cache.map((item) => [item.id, item])).values(),
//   ];
//   return uniqueCache.slice(0, 7);
// };

// Utility function to delete from recent search cache
const deleteFromCache = (
  cache: schemas.BlogSchema[],
  id: string
): schemas.BlogSchema[] => {
  return cache.filter((item) => item.id !== id);
};

const BlogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    updateTableFilterOptions: (
      state,
      action: PayloadAction<{
        tableFilterOptions: schemas.FilterBlogsSchema;
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

    updatePageTableFilterOptions: (
      state,
      action: PayloadAction<{
        tableFilterOptions: schemas.FilterBlogsSchema;
      }>
    ) => {
      //let filterData = removeUndefinedValues(action.payload.tableFilterOptions);
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

    // upsertRecentSearch: (
    //   state,
    //   action: PayloadAction<{ data: schemas.BlogSchema }>
    // ) => {
    //   state.recentSearchCache = upsertCache(
    //     state.recentSearchCache,
    //     action.payload.data
    //   );
    // },

    deleteFromRecentSearch: (state, action: PayloadAction<{ id: string }>) => {
      state.recentSearchCache = deleteFromCache(
        state.recentSearchCache,
        action.payload.id
      );
    },
  },

  extraReducers: (builder) => {
    builder
      // For filterBlogPersistAsync
      .addCase(actions.filterBlogPersistAsync.pending, (state) => {
        state.tableLoadingState = ComponentStateEnum.LOADING;
      })
      .addCase(actions.filterBlogPersistAsync.fulfilled, (state, action) => {
        state.tableLoadingState = ComponentStateEnum.IDLE;
        state.tableListData = action.payload!;
        state.tableShouldRefresh = false;
      })
      .addCase(actions.filterBlogPersistAsync.rejected, (state) => {
        state.tableLoadingState = ComponentStateEnum.FAILED;
      })

      // For filterBlogPersistAsync
      .addCase(actions.filterPageBlogPersistAsync.pending, (state) => {
        state.pageTableLoadingState = ComponentStateEnum.LOADING;
      })
      .addCase(
        actions.filterPageBlogPersistAsync.fulfilled,
        (state, action) => {
          state.pageTableLoadingState = ComponentStateEnum.IDLE;
          state.pageTableListData = action.payload!;
        }
      )
      .addCase(actions.filterPageBlogPersistAsync.rejected, (state) => {
        state.pageTableLoadingState = ComponentStateEnum.FAILED;
      })

      // For deleteCustomerAsync
      .addCase(actions.deleteBlogAsync.fulfilled, (state, action) => {
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
} = BlogSlice.actions;

export const selectLoadingState = (state: RootState) => state.blogs.status;
export const selectTableListData = (state: RootState) =>
  state.blogs.tableListData;
export const selectTableFilterOptions = (state: RootState) =>
  state.blogs.tableFilterOptions;
export const selectTableLoadingState = (state: RootState) =>
  state.blogs.tableLoadingState;

export const selectPageTableListData = (state: RootState) =>
  state.blogs.pageTableListData;
export const selectPageTableFilterOptions = (state: RootState) =>
  state.blogs.pageTableFilterOptions;
export const selectPageTableLoadingState = (state: RootState) =>
  state.blogs.pageTableLoadingState;

export const selectTableShouldRefresh = (state: RootState) =>
  state.blogs.tableShouldRefresh;

export default BlogSlice.reducer;
