import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../backend/firebase/db/api/careers_api";
import * as schemas from "../../../backend/models/careers";
import { reducers } from ".";
import { ResponseIndicator } from "@/backend/models/_shared";
import { AppThunk } from "@/redux/app/store";
import ErrorToast from "@/components/toast/ErrorToast";

const urlPrefix = "/career";

export const filterCareerAsync = createAsyncThunk(
  `get:${urlPrefix}/filter`,
  async (request: { data: schemas.FilterCareersSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterCareersApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseCareersSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const filterCareerPersistAsync = createAsyncThunk(
  `get:${urlPrefix}/filter-persist`,
  async (request: { data: schemas.FilterCareersSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterCareersApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseCareersSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const filterPageCareerPersistAsync = createAsyncThunk(
  `get:${urlPrefix}/filter-page-persist`,
  async (request: { data: schemas.FilterCareersSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterCareersApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseCareersSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const createCareerAsync = createAsyncThunk(
  `post:${urlPrefix}`,
  async (request: { data: schemas.CreateCareerWithFileSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.createCareerApi(request.data);

      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ResponseCareerSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const getCareerAsync = createAsyncThunk(
  `get:${urlPrefix}/:id`,
  async (id: string, ThunkApi) => {
    const [data, status] = await api.getCareerApi(id);
    if (status === ResponseIndicator.SUCCESS) {
      return data as schemas.ResponseCareerSchema;
    }
    return ThunkApi.rejectWithValue(data);
  }
);

export const deleteCareerAsync = createAsyncThunk(
  `delete:${urlPrefix}/:id`,
  async (request: schemas.CareerSchema, ThunkApi) => {
    const [data, status] = await api.deleteCareerApi(request);
    if (status === ResponseIndicator.SUCCESS) {
      return data as schemas.ResponseCareerSchema;
    }
    return ThunkApi.rejectWithValue(data);
  }
);

export const updateCareerAsync = createAsyncThunk(
  `patch:${urlPrefix}/:id`,
  async (request: { data: schemas.UpdateCareerWithFileSchema }, ThunkApi) => {
    const [result, status] = await api.updateCareerApi(request.data);
    if (status === ResponseIndicator.SUCCESS) {
      return result as schemas.ResponseCareerSchema;
    }
    return ThunkApi.rejectWithValue(result);
  }
);

//THUNK LOGICS
export const fetchCareerWithFilters = (): AppThunk => (dispatch, getState) => {
  let currentValue = reducers.selectTableFilterOptions(getState());
  currentValue = Object.fromEntries(
    Object.entries(currentValue).filter(([key]) => !["id"].includes(key))
  );

  dispatch(filterCareerPersistAsync({ data: currentValue })).then(
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

export const checkBeforeFilterCareer = (): AppThunk => (dispatch, getState) => {
  const currentValue = reducers.selectTableListData(getState());

  if (!currentValue || currentValue.data?.length === 0) {
    dispatch(fetchCareerWithFilters());
  }
};

export const fetchPageCareerWithFilters =
  (): AppThunk => (dispatch, getState) => {
    let currentValue = reducers.selectPageTableFilterOptions(getState());
    currentValue = Object.fromEntries(
      Object.entries(currentValue).filter(([key]) => !["id"].includes(key))
    );

    dispatch(filterPageCareerPersistAsync({ data: currentValue })).then(
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

export const checkBeforeFilterPageCareer =
  (): AppThunk => (dispatch, getState) => {
    const currentValue = reducers.selectPageTableListData(getState());

    if (!currentValue || currentValue.data?.length === 0) {
      dispatch(fetchPageCareerWithFilters());
    }
  };
