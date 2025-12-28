import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import commentsReducer from "./slices/commentsSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    ui: uiReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
