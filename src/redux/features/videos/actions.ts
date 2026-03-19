import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../backend/firebase/db/api/videos_api";
import * as schemas from "../../../backend/models/videos";
import { reducers } from ".";
import { ResponseIndicator } from "@/backend/models/_shared";
import { AppThunk } from "@/redux/app/store";
import ErrorToast from "@/components/toast/ErrorToast";

const urlPrefix = "/video";

export const filterVideoAsync = createAsyncThunk(
  `get:${urlPrefix}/filter`,
  async (request: { data: schemas.FilterVideosSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterVideosApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseVideosSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const filterVideoPersistAsync = createAsyncThunk(
  `get:${urlPrefix}/filter-persist`,
  async (request: { data: schemas.FilterVideosSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterVideosApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseVideosSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const filterPageVideoPersistAsync = createAsyncThunk(
  `get:${urlPrefix}/filter-page-persist`,
  async (request: { data: schemas.FilterVideosSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterVideosApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseVideosSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const createVideoAsync = createAsyncThunk(
  `post:${urlPrefix}`,
  async (request: { data: schemas.CreateVideoWithFileSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.createVideoApi(request.data);

      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ResponseVideoSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const getVideoAsync = createAsyncThunk(
  `get:${urlPrefix}/:id`,
  async (id: string, ThunkApi) => {
    const [data, status] = await api.getVideoApi(id);
    if (status === ResponseIndicator.SUCCESS) {
      return data as schemas.ResponseVideoSchema;
    }
    return ThunkApi.rejectWithValue(data);
  }
);

export const deleteVideoAsync = createAsyncThunk(
  `delete:${urlPrefix}/:id`,
  async (request: schemas.VideoSchema, ThunkApi) => {
    const [data, status] = await api.deleteVideoApi(request);
    if (status === ResponseIndicator.SUCCESS) {
      return data as schemas.ResponseVideoSchema;
    }
    return ThunkApi.rejectWithValue(data);
  }
);

export const updateVideoAsync = createAsyncThunk(
  `patch:${urlPrefix}/:id`,
  async (request: { data: schemas.UpdateVideoWithFileSchema }, ThunkApi) => {
    const [result, status] = await api.updateVideoApi(request.data);
    if (status === ResponseIndicator.SUCCESS) {
      return result as schemas.ResponseVideoSchema;
    }
    return ThunkApi.rejectWithValue(result);
  }
);

//THUNK LOGICS
export const fetchVideoWithFilters = (): AppThunk => (dispatch, getState) => {
  let currentValue = reducers.selectTableFilterOptions(getState());
  currentValue = Object.fromEntries(
    Object.entries(currentValue).filter(([key]) => !["id"].includes(key))
  );

  dispatch(filterVideoPersistAsync({ data: currentValue })).then(
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

export const checkBeforeFilterVideo =
  (): AppThunk => (dispatch, getState) => {
    const currentValue = reducers.selectTableListData(getState());

    if (!currentValue || currentValue.data?.length === 0) {
      dispatch(fetchVideoWithFilters());
    }
  };

export const fetchPageVideoWithFilters =
  (): AppThunk => (dispatch, getState) => {
    let currentValue = reducers.selectPageTableFilterOptions(getState());
    currentValue = Object.fromEntries(
      Object.entries(currentValue).filter(([key]) => !["id"].includes(key))
    );

    dispatch(filterPageVideoPersistAsync({ data: currentValue })).then(
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

export const checkBeforeFilterPageVideo =
  (): AppThunk => (dispatch, getState) => {
    const currentValue = reducers.selectPageTableListData(getState());

    if (!currentValue || currentValue.data?.length === 0) {
      dispatch(fetchPageVideoWithFilters());
    }
  };
