import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../backend/firebase/db/api/blogs_api";
import * as schemas from "../../../backend/models/blogs";
import { reducers } from ".";
import { ResponseIndicator } from "@/backend/models/_shared";
import { AppThunk } from "@/redux/app/store";
import ErrorToast from "@/components/toast/ErrorToast";

const urlPrefix = "/blog";

export const filterBlogAsync = createAsyncThunk(
  `get:${urlPrefix}/filter`,
  async (request: { data: schemas.FilterBlogsSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterBlogsApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseBlogsSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const filterBlogPersistAsync = createAsyncThunk(
  `get:${urlPrefix}/filter-persist`,
  async (request: { data: schemas.FilterBlogsSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterBlogsApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseBlogsSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const filterPageBlogPersistAsync = createAsyncThunk(
  `get:${urlPrefix}/filter-page-persist`,
  async (request: { data: schemas.FilterBlogsSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterBlogsApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseBlogsSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const createBlogAsync = createAsyncThunk(
  `post:${urlPrefix}`,
  async (request: { data: schemas.CreateBlogWithFileSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.createBlogApi(request.data);

      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ResponseBlogSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const getBlogAsync = createAsyncThunk(
  `get:${urlPrefix}/:id`,
  async (id: string, ThunkApi) => {
    const [data, status] = await api.getBlogApi(id);
    if (status === ResponseIndicator.SUCCESS) {
      return data as schemas.ResponseBlogSchema;
    }
    return ThunkApi.rejectWithValue(data);
  }
);

export const deleteBlogAsync = createAsyncThunk(
  `delete:${urlPrefix}/:id`,
  async (request: schemas.BlogSchema, ThunkApi) => {
    const [data, status] = await api.deleteBlogApi(request);
    if (status === ResponseIndicator.SUCCESS) {
      return data as schemas.ResponseBlogSchema;
    }
    return ThunkApi.rejectWithValue(data);
  }
);

export const updateBlogAsync = createAsyncThunk(
  `patch:${urlPrefix}/:id`,
  async (request: { data: schemas.UpdateBlogWithFileSchema }, ThunkApi) => {
    const [result, status] = await api.updateBlogApi(request.data);
    if (status === ResponseIndicator.SUCCESS) {
      return result as schemas.ResponseBlogSchema;
    }
    return ThunkApi.rejectWithValue(result);
  }
);

//THUNK LOGICS
export const fetchBlogWithFilters = (): AppThunk => (dispatch, getState) => {
  let currentValue = reducers.selectTableFilterOptions(getState());
  currentValue = Object.fromEntries(
    Object.entries(currentValue).filter(([key]) => !["id"].includes(key))
  );

  dispatch(filterBlogPersistAsync({ data: currentValue })).then(
    async (responseData: any) => {
      if (responseData.meta.requestStatus === "rejected") {
        console.log(responseData);
        ErrorToast({
          message: "An error occurred while fetch data",
        });
      }
    }
  );
};

export const checkBeforeFilterBlog = (): AppThunk => (dispatch, getState) => {
  const currentValue = reducers.selectTableListData(getState());

  if (!currentValue || currentValue.data?.length === 0) {
    dispatch(fetchBlogWithFilters());
  }
};

export const fetchPageBlogWithFilters =
  (): AppThunk => (dispatch, getState) => {
    let currentValue = reducers.selectPageTableFilterOptions(getState());
    currentValue = Object.fromEntries(
      Object.entries(currentValue).filter(([key]) => !["id"].includes(key))
    );

    dispatch(filterPageBlogPersistAsync({ data: currentValue })).then(
      async (responseData: any) => {
        if (responseData.meta.requestStatus === "rejected") {
          console.log(responseData);
          ErrorToast({
            message: "An error occurred while fetch data",
          });
        }
      }
    );
  };

export const checkBeforeFilterPageBlog =
  (): AppThunk => (dispatch, getState) => {
    const currentValue = reducers.selectPageTableListData(getState());

    if (!currentValue || currentValue.data?.length === 0) {
      dispatch(fetchPageBlogWithFilters());
    }
  };
