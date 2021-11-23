import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "./characterSlice";
import combatReducer from "./combatSlice";
import encounterReducer from "./encounterSlice";

export const store = configureStore({
  reducer: {
    character: characterReducer,
    combat: combatReducer,
    encounter: encounterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
