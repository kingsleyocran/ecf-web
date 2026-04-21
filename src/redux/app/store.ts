import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import * as dbInfo from "../features/dbInfo";
import * as team from "../features/team";
import * as blogs from "../features/blogs";
import * as advisoryCircle from "../features/advisoryCircle";
import * as videos from "../features/videos";
import * as reports from "../features/reports";
import * as articles from "../features/articles";
import * as opeds from "../features/opeds";
import * as events from "../features/events";
import * as newsletters from "../features/newsletters";
import * as careers from "../features/careers";
import * as news from "../features/news";

export const store = configureStore({
  reducer: {
    dbInfo: dbInfo.reducers.default,
    team: team.reducers.default,
    blogs: blogs.reducers.default,
    advisoryCircle: advisoryCircle.reducers.default,
    videos: videos.reducers.default,
    reports: reports.reducers.default,
    articles: articles.reducers.default,
    opeds: opeds.reducers.default,
    events: events.reducers.default,
    newsletters: newsletters.reducers.default,
    careers: careers.reducers.default,
    news: news.reducers.default,
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
