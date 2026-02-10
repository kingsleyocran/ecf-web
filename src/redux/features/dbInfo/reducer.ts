import { createSlice } from "@reduxjs/toolkit";
import { actions } from "./index";
import * as schemas from "@/backend/models/_dbInfo";
import {
  ComponentStateEnum,
  ComponentStateEnumValues,
} from "@/backend/models/_shared";
import { RootState } from "@/redux/app/store";

interface InitialState {
  status: ComponentStateEnumValues;
  aggregatorData: schemas.ResponseDBInfoAggregatorSchema | null;
}
const initialState: InitialState = {
  status: ComponentStateEnum.IDLE,
  aggregatorData: null,
};

const DBInfoSlice = createSlice({
  name: "dbInfo",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // For getDBInfoAggregatorPersistAsync
      .addCase(actions.getDBInfoAggregatorPersistAsync.pending, (state) => {
        state.status = ComponentStateEnum.LOADING;
      })
      .addCase(
        actions.getDBInfoAggregatorPersistAsync.fulfilled,
        (state, action) => {
          state.status = ComponentStateEnum.IDLE;
          state.aggregatorData = action.payload!;
        }
      )
      .addCase(actions.getDBInfoAggregatorPersistAsync.rejected, (state) => {
        state.status = ComponentStateEnum.FAILED;
      });
  },
});

export const selectAggregatorData = (state: RootState) =>
  state.dbInfo.aggregatorData;
export const selectLoadingState = (state: RootState) =>
  state.dbInfo.status;

export default DBInfoSlice.reducer;
