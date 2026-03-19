import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../backend/firebase/db/api/articles_api";
import * as schemas from "../../../backend/models/articles";
import { reducers } from ".";
import { ResponseIndicator } from "@/backend/models/_shared";
import { AppThunk } from "@/redux/app/store";
import ErrorToast from "@/components/toast/ErrorToast";

const urlPrefix = "/article";

export const filterArticleAsync = createAsyncThunk(
  `get:${urlPrefix}/filter`,
  async (request: { data: schemas.FilterArticlesSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterArticlesApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseArticlesSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const filterArticlePersistAsync = createAsyncThunk(
  `get:${urlPrefix}/filter-persist`,
  async (request: { data: schemas.FilterArticlesSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterArticlesApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseArticlesSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const filterPageArticlePersistAsync = createAsyncThunk(
  `get:${urlPrefix}/filter-page-persist`,
  async (request: { data: schemas.FilterArticlesSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterArticlesApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseArticlesSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const createArticleAsync = createAsyncThunk(
  `post:${urlPrefix}`,
  async (request: { data: schemas.CreateArticleWithFileSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.createArticleApi(request.data);

      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ResponseArticleSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const getArticleAsync = createAsyncThunk(
  `get:${urlPrefix}/:id`,
  async (id: string, ThunkApi) => {
    const [data, status] = await api.getArticleApi(id);
    if (status === ResponseIndicator.SUCCESS) {
      return data as schemas.ResponseArticleSchema;
    }
    return ThunkApi.rejectWithValue(data);
  }
);

export const deleteArticleAsync = createAsyncThunk(
  `delete:${urlPrefix}/:id`,
  async (request: schemas.ArticleSchema, ThunkApi) => {
    const [data, status] = await api.deleteArticleApi(request);
    if (status === ResponseIndicator.SUCCESS) {
      return data as schemas.ResponseArticleSchema;
    }
    return ThunkApi.rejectWithValue(data);
  }
);

export const updateArticleAsync = createAsyncThunk(
  `patch:${urlPrefix}/:id`,
  async (request: { data: schemas.UpdateArticleWithFileSchema }, ThunkApi) => {
    const [result, status] = await api.updateArticleApi(request.data);
    if (status === ResponseIndicator.SUCCESS) {
      return result as schemas.ResponseArticleSchema;
    }
    return ThunkApi.rejectWithValue(result);
  }
);

//THUNK LOGICS
export const fetchArticleWithFilters =
  (): AppThunk => (dispatch, getState) => {
    let currentValue = reducers.selectTableFilterOptions(getState());
    currentValue = Object.fromEntries(
      Object.entries(currentValue).filter(([key]) => !["id"].includes(key))
    );

    dispatch(filterArticlePersistAsync({ data: currentValue })).then(
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

export const checkBeforeFilterArticle =
  (): AppThunk => (dispatch, getState) => {
    const currentValue = reducers.selectTableListData(getState());

    if (!currentValue || currentValue.data?.length === 0) {
      dispatch(fetchArticleWithFilters());
    }
  };

export const fetchPageArticleWithFilters =
  (): AppThunk => (dispatch, getState) => {
    let currentValue = reducers.selectPageTableFilterOptions(getState());
    currentValue = Object.fromEntries(
      Object.entries(currentValue).filter(([key]) => !["id"].includes(key))
    );

    dispatch(filterPageArticlePersistAsync({ data: currentValue })).then(
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

export const checkBeforeFilterPageArticle =
  (): AppThunk => (dispatch, getState) => {
    const currentValue = reducers.selectPageTableListData(getState());

    if (!currentValue || currentValue.data?.length === 0) {
      dispatch(fetchPageArticleWithFilters());
    }
  };
