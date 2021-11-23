import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "./characterSlice";

export const store = configureStore({
  reducer: {
    character: characterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
