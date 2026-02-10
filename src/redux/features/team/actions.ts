import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../backend/firebase/db/api/team_api";
import * as schemas from "../../../backend/models/team";
import { reducers } from ".";
import { ResponseIndicator } from "@/backend/models/_shared";
import { AppThunk } from "@/redux/app/store";
import ErrorToast from "@/components/toast/ErrorToast";

const urlPrefix = "/team-members";

export const filterTeamMembersAsync = createAsyncThunk(
  `get:${urlPrefix}/filter`,
  async (request: { data: schemas.FilterTeamMembersSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterTeamMembersApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseTeamMembersSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const filterTeamMembersPersistAsync = createAsyncThunk(
  `get:${urlPrefix}/filter-persist`,
  async (request: { data: schemas.FilterTeamMembersSchema }, ThunkApi) => {
    try {
      const [data, status] = await api.filterTeamMembersApi(request.data);
      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ListResponseTeamMembersSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);


export const createTeamMemberAsync = createAsyncThunk(
  `post:${urlPrefix}`,
  async (
    request: { data: schemas.CreateTeamMemberWithFileSchema },
    ThunkApi
  ) => {
    try {
      const [data, status] = await api.createTeamMemberApi(request.data);

      if (data !== undefined) {
        if (status === ResponseIndicator.SUCCESS) {
          return data as schemas.ResponseTeamMemberSchema;
        } else if (status === ResponseIndicator.ERROR) {
          return ThunkApi.rejectWithValue(data);
        }
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const getTeamMemberAsync = createAsyncThunk(
  `get:${urlPrefix}/:id`,
  async (id: string, ThunkApi) => {
    const [data, status] = await api.getTeamMemberApi(id);
    if (status === ResponseIndicator.SUCCESS) {
      return data as schemas.ResponseTeamMemberSchema;
    }
    return ThunkApi.rejectWithValue(data);
  }
);

export const deleteTeamMemberAsync = createAsyncThunk(
  `delete:${urlPrefix}/:id`,
  async (request: schemas.TeamMemberSchema, ThunkApi) => {
    const [data, status] = await api.deleteTeamMemberApi(request);
    if (status === ResponseIndicator.SUCCESS) {
      return data as schemas.ResponseTeamMemberSchema;
    }
    return ThunkApi.rejectWithValue(data);
  }
);

export const updateTeamMemberAsync = createAsyncThunk(
  `patch:${urlPrefix}/:id`,
  async (
    request: { data: schemas.UpdateTeamMemberWithFileSchema },
    ThunkApi
  ) => {
    const [result, status] = await api.updateTeamMemberApi(request.data);
    if (status === ResponseIndicator.SUCCESS) {
      return result as schemas.ResponseTeamMemberSchema;
    }
    return ThunkApi.rejectWithValue(result);
  }
);

//THUNK LOGICS
export const fetchTeamMembersWithFilters =
  (): AppThunk => (dispatch, getState) => {
    let currentValue = reducers.selectTableFilterOptions(getState());
    currentValue = Object.fromEntries(
      Object.entries(currentValue).filter(([key]) => !["id"].includes(key))
    );

    dispatch(filterTeamMembersPersistAsync({ data: currentValue })).then(
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

export const checkBeforeFilterTeamMembers =
  (): AppThunk => (dispatch, getState) => {
    const currentValue = reducers.selectTableListData(getState());

    if (!currentValue || currentValue.data?.length === 0) {
      dispatch(fetchTeamMembersWithFilters());
    }
  };
