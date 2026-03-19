import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../backend/firebase/db/api/reports_api";
import * as schemas from "../../../backend/models/reports";
import { reducers } from ".";
import { ResponseIndicator } from "@/backend/models/_shared";
import { AppThunk } from "@/redux/app/store";
import ErrorToast from "@/components/toast/ErrorToast";

const urlPrefix = "/report";

export const filterReportAsync = createAsyncThunk(
  `get:${urlPrefix}/filter`,
  async (request: { data: schemas.FilterReportsSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterReportsApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseReportsSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const filterReportPersistAsync = createAsyncThunk(
  `get:${urlPrefix}/filter-persist`,
  async (request: { data: schemas.FilterReportsSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterReportsApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseReportsSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const filterPageReportPersistAsync = createAsyncThunk(
  `get:${urlPrefix}/filter-page-persist`,
  async (request: { data: schemas.FilterReportsSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterReportsApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseReportsSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const createReportAsync = createAsyncThunk(
  `post:${urlPrefix}`,
  async (request: { data: schemas.CreateReportWithFilesSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.createReportApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ResponseReportSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const getReportAsync = createAsyncThunk(
  `get:${urlPrefix}/:id`,
  async (id: string, ThunkApi) => {
    const [data, status] = await api.getReportApi(id);
    if (status === ResponseIndicator.SUCCESS) {
      return data as schemas.ResponseReportSchema;
    }
    return ThunkApi.rejectWithValue(data);
  }
);

export const deleteReportAsync = createAsyncThunk(
  `delete:${urlPrefix}/:id`,
  async (request: schemas.ReportSchema, ThunkApi) => {
    const [data, status] = await api.deleteReportApi(request);
    if (status === ResponseIndicator.SUCCESS) {
      return data as schemas.ResponseReportSchema;
    }
    return ThunkApi.rejectWithValue(data);
  }
);

export const updateReportAsync = createAsyncThunk(
  `patch:${urlPrefix}/:id`,
  async (request: { data: schemas.UpdateReportWithFilesSchema }, ThunkApi) => {
    const [result, status] = await api.updateReportApi(request.data);
    if (status === ResponseIndicator.SUCCESS) {
      return result as schemas.ResponseReportSchema;
    }
    return ThunkApi.rejectWithValue(result);
  }
);

//THUNK LOGICS
export const fetchReportWithFilters = (): AppThunk => (dispatch, getState) => {
  let currentValue = reducers.selectTableFilterOptions(getState());
  currentValue = Object.fromEntries(
    Object.entries(currentValue).filter(([key]) => !["id"].includes(key))
  );

  dispatch(filterReportPersistAsync({ data: currentValue })).then(
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

export const checkBeforeFilterReport =
  (): AppThunk => (dispatch, getState) => {
    const currentValue = reducers.selectTableListData(getState());

    if (!currentValue || currentValue.data?.length === 0) {
      dispatch(fetchReportWithFilters());
    }
  };

export const fetchPageReportWithFilters =
  (): AppThunk => (dispatch, getState) => {
    let currentValue = reducers.selectPageTableFilterOptions(getState());
    currentValue = Object.fromEntries(
      Object.entries(currentValue).filter(([key]) => !["id"].includes(key))
    );

    dispatch(filterPageReportPersistAsync({ data: currentValue })).then(
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

export const checkBeforeFilterPageReport =
  (): AppThunk => (dispatch, getState) => {
    const currentValue = reducers.selectPageTableListData(getState());

    if (!currentValue || currentValue.data?.length === 0) {
      dispatch(fetchPageReportWithFilters());
    }
  };
