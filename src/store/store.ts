
// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import fileExplorerReducer from "../redux/fileExplorerSlice";

export const store = configureStore({
  reducer: {
    fileExplorer: fileExplorerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
