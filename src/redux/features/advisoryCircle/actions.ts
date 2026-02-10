import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../backend/firebase/db/api/advisory_api";
import * as schemas from "../../../backend/models/advisory";
import { reducers } from ".";
import { ResponseIndicator } from "@/backend/models/_shared";
import { AppThunk } from "@/redux/app/store";
import ErrorToast from "@/components/toast/ErrorToast";

const urlPrefix = "/advisory-circle";

export const filterAdvisorysAsync = createAsyncThunk(
  `get:${urlPrefix}/filter`,
  async (request: { data: schemas.FilterAdvisorysSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterAdvisorysApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseAdvisorysSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const filterAdvisorysPersistAsync = createAsyncThunk(
  `get:${urlPrefix}/filter-persist`,
  async (request: { data: schemas.FilterAdvisorysSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterAdvisorysApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseAdvisorysSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);


export const createAdvisoryAsync = createAsyncThunk(
  `post:${urlPrefix}`,
  async (
    request: { data: schemas.CreateAdvisoryWithFileSchema },
    ThunkApi
  ) => {
    try {
      const [data, status] = await api.createAdvisoryApi(request.data);

      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ResponseAdvisorySchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const getAdvisoryAsync = createAsyncThunk(
  `get:${urlPrefix}/:id`,
  async (id: string, ThunkApi) => {
    const [data, status] = await api.getAdvisoryApi(id);
    if (status === ResponseIndicator.SUCCESS) {
      return data as schemas.ResponseAdvisorySchema;
    }
    return ThunkApi.rejectWithValue(data);
  }
);

export const deleteAdvisoryAsync = createAsyncThunk(
  `delete:${urlPrefix}/:id`,
  async (request: schemas.AdvisorySchema, ThunkApi) => {
    const [data, status] = await api.deleteAdvisoryApi(request);
    if (status === ResponseIndicator.SUCCESS) {
      return data as schemas.ResponseAdvisorySchema;
    }
    return ThunkApi.rejectWithValue(data);
  }
);

export const updateAdvisoryAsync = createAsyncThunk(
  `patch:${urlPrefix}/:id`,
  async (
    request: { data: schemas.UpdateAdvisoryWithFileSchema },
    ThunkApi
  ) => {
    const [result, status] = await api.updateAdvisoryApi(request.data);
    if (status === ResponseIndicator.SUCCESS) {
      return result as schemas.ResponseAdvisorySchema;
    }
    return ThunkApi.rejectWithValue(result);
  }
);

//THUNK LOGICS
export const fetchAdvisorysWithFilters =
  (): AppThunk => (dispatch, getState) => {
    let currentValue = reducers.selectTableFilterOptions(getState());
    currentValue = Object.fromEntries(
      Object.entries(currentValue).filter(([key]) => !["id"].includes(key))
    );

    dispatch(filterAdvisorysPersistAsync({ data: currentValue })).then(
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

export const checkBeforeFilterAdvisorys =
  (): AppThunk => (dispatch, getState) => {
    const currentValue = reducers.selectTableListData(getState());

    if (!currentValue || currentValue.data?.length === 0) {
      dispatch(fetchAdvisorysWithFilters());
    }
  };
