import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../backend/firebase/db/_dbInfo";
import * as schemas from "../../../backend/models/_dbInfo";
import { reducers } from ".";
import { ResponseIndicator } from "@/backend/models/_shared";
import { AppThunk } from "@/redux/app/store";

const urlPrefix = "/dbInfo";

export const getDBInfoAggregatorPersistAsync = createAsyncThunk(
  `get:${urlPrefix}/:id`,
  async (_, ThunkApi) => {
    const [data, status] = await api.getDBInfoAggregator();
    if (status === ResponseIndicator.SUCCESS) {
      return data as schemas.ResponseDBInfoAggregatorSchema;
    }
    return ThunkApi.rejectWithValue(data);
  }
);

//THUNK LOGICS
export const checkBeforeFetchAggregator =
  (): AppThunk => (dispatch, getState) => {
    const currentValue = reducers.selectAggregatorData(getState());

    if (!currentValue) {
      dispatch(getDBInfoAggregatorPersistAsync());
    }
  };
