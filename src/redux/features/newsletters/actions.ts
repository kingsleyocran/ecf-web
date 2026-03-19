import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../backend/firebase/db/api/newsletters_api";
import * as schemas from "../../../backend/models/newsletters";
import { reducers } from ".";
import { ResponseIndicator } from "@/backend/models/_shared";
import { AppThunk } from "@/redux/app/store";
import ErrorToast from "@/components/toast/ErrorToast";

const urlPrefix = "/newsletter";

export const filterNewsletterAsync = createAsyncThunk(
  `get:${urlPrefix}/filter`,
  async (request: { data: schemas.FilterNewslettersSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterNewslettersApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseNewslettersSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const filterNewsletterPersistAsync = createAsyncThunk(
  `get:${urlPrefix}/filter-persist`,
  async (request: { data: schemas.FilterNewslettersSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterNewslettersApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseNewslettersSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const filterPageNewsletterPersistAsync = createAsyncThunk(
  `get:${urlPrefix}/filter-page-persist`,
  async (request: { data: schemas.FilterNewslettersSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterNewslettersApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseNewslettersSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const createNewsletterAsync = createAsyncThunk(
  `post:${urlPrefix}`,
  async (request: { data: schemas.CreateNewsletterWithFileSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.createNewsletterApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ResponseNewsletterSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const getNewsletterAsync = createAsyncThunk(
  `get:${urlPrefix}/:id`,
  async (id: string, ThunkApi) => {
    const [data, status] = await api.getNewsletterApi(id);
    if (status === ResponseIndicator.SUCCESS) {
      return data as schemas.ResponseNewsletterSchema;
    }
    return ThunkApi.rejectWithValue(data);
  }
);

export const deleteNewsletterAsync = createAsyncThunk(
  `delete:${urlPrefix}/:id`,
  async (request: schemas.NewsletterSchema, ThunkApi) => {
    const [data, status] = await api.deleteNewsletterApi(request);
    if (status === ResponseIndicator.SUCCESS) {
      return data as schemas.ResponseNewsletterSchema;
    }
    return ThunkApi.rejectWithValue(data);
  }
);

export const updateNewsletterAsync = createAsyncThunk(
  `patch:${urlPrefix}/:id`,
  async (request: { data: schemas.UpdateNewsletterWithFileSchema }, ThunkApi) => {
    const [result, status] = await api.updateNewsletterApi(request.data);
    if (status === ResponseIndicator.SUCCESS) {
      return result as schemas.ResponseNewsletterSchema;
    }
    return ThunkApi.rejectWithValue(result);
  }
);

// THUNK LOGICS
export const fetchNewsletterWithFilters = (): AppThunk => (dispatch, getState) => {
  let currentValue = reducers.selectTableFilterOptions(getState());
  currentValue = Object.fromEntries(
    Object.entries(currentValue).filter(([key]) => !["id"].includes(key))
  );

  dispatch(filterNewsletterPersistAsync({ data: currentValue })).then(
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

export const checkBeforeFilterNewsletter =
  (): AppThunk => (dispatch, getState) => {
    const currentValue = reducers.selectTableListData(getState());

    if (!currentValue || currentValue.data?.length === 0) {
      dispatch(fetchNewsletterWithFilters());
    }
  };

export const fetchPageNewsletterWithFilters =
  (): AppThunk => (dispatch, getState) => {
    let currentValue = reducers.selectPageTableFilterOptions(getState());
    currentValue = Object.fromEntries(
      Object.entries(currentValue).filter(([key]) => !["id"].includes(key))
    );

    dispatch(filterPageNewsletterPersistAsync({ data: currentValue })).then(
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

export const checkBeforeFilterPageNewsletter =
  (): AppThunk => (dispatch, getState) => {
    const currentValue = reducers.selectPageTableListData(getState());

    if (!currentValue || currentValue.data?.length === 0) {
      dispatch(fetchPageNewsletterWithFilters());
    }
  };
