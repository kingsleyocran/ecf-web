import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import * as dbInfo from "../features/dbInfo";
import * as team from "../features/team";
import * as blogs from "../features/blogs";
import * as advisoryCircle from "../features/advisoryCircle";

export const store = configureStore({
  reducer: {
    dbInfo: dbInfo.reducers.default,
    team: team.reducers.default,
    blogs: blogs.reducers.default,
    advisoryCircle: advisoryCircle.reducers.default,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
