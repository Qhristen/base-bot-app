import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./feature/user";
import taskReducer from "./feature/task";
import boostReducer from "./feature/boost";

export const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
    boost: boostReducer
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
