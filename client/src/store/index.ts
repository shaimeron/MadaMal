import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import reportsReducer from "./reports";
import addReportsReducer from "./addReport";
// ...

export const store = configureStore({
  reducer: {
    user: userReducer,
    reports: reportsReducer,
    reportDialog: addReportsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
