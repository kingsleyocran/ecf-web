import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../backend/firebase/db/api/opeds_api";
import * as schemas from "../../../backend/models/opeds";
import { reducers } from ".";
import { ResponseIndicator } from "@/backend/models/_shared";
import { AppThunk } from "@/redux/app/store";
import ErrorToast from "@/components/toast/ErrorToast";

const urlPrefix = "/oped";

export const filterOpEdAsync = createAsyncThunk(
  `get:${urlPrefix}/filter`,
  async (request: { data: schemas.FilterOpedsSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterOpedsApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseOpedsSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const filterOpEdPersistAsync = createAsyncThunk(
  `get:${urlPrefix}/filter-persist`,
  async (request: { data: schemas.FilterOpedsSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterOpedsApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseOpedsSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const filterPageOpEdPersistAsync = createAsyncThunk(
  `get:${urlPrefix}/filter-page-persist`,
  async (request: { data: schemas.FilterOpedsSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterOpedsApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseOpedsSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const createOpEdAsync = createAsyncThunk(
  `post:${urlPrefix}`,
  async (request: { data: schemas.CreateOpEdWithFileSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.createOpEdApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ResponseOpEdSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const getOpEdAsync = createAsyncThunk(
  `get:${urlPrefix}/:id`,
  async (id: string, ThunkApi) => {
    const [data, status] = await api.getOpedApi(id);
    if (status === ResponseIndicator.SUCCESS) {
      return data as schemas.ResponseOpEdSchema;
    }
    return ThunkApi.rejectWithValue(data);
  }
);

export const deleteOpEdAsync = createAsyncThunk(
  `delete:${urlPrefix}/:id`,
  async (request: schemas.OpEdSchema, ThunkApi) => {
    const [data, status] = await api.deleteOpEdApi(request);
    if (status === ResponseIndicator.SUCCESS) {
      return data as schemas.ResponseOpEdSchema;
    }
    return ThunkApi.rejectWithValue(data);
  }
);

export const updateOpEdAsync = createAsyncThunk(
  `patch:${urlPrefix}/:id`,
  async (request: { data: schemas.UpdateOpEdWithFileSchema }, ThunkApi) => {
    const [result, status] = await api.updateOpEdApi(request.data);
    if (status === ResponseIndicator.SUCCESS) {
      return result as schemas.ResponseOpEdSchema;
    }
    return ThunkApi.rejectWithValue(result);
  }
);

// THUNK LOGICS
export const fetchOpEdWithFilters = (): AppThunk => (dispatch, getState) => {
  let currentValue = reducers.selectTableFilterOptions(getState());
  currentValue = Object.fromEntries(
    Object.entries(currentValue).filter(([key]) => !["id"].includes(key))
  );

  dispatch(filterOpEdPersistAsync({ data: currentValue })).then(
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

export const checkBeforeFilterOpEd =
  (): AppThunk => (dispatch, getState) => {
    const currentValue = reducers.selectTableListData(getState());

    if (!currentValue || currentValue.data?.length === 0) {
      dispatch(fetchOpEdWithFilters());
    }
  };

export const fetchPageOpEdWithFilters =
  (): AppThunk => (dispatch, getState) => {
    let currentValue = reducers.selectPageTableFilterOptions(getState());
    currentValue = Object.fromEntries(
      Object.entries(currentValue).filter(([key]) => !["id"].includes(key))
    );

    dispatch(filterPageOpEdPersistAsync({ data: currentValue })).then(
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

export const checkBeforeFilterPageOpEd =
  (): AppThunk => (dispatch, getState) => {
    const currentValue = reducers.selectPageTableListData(getState());

    if (!currentValue || currentValue.data?.length === 0) {
      dispatch(fetchPageOpEdWithFilters());
    }
  };
