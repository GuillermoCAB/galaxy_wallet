import { configureStore } from "@reduxjs/toolkit";
import networksReducer from "./networks/reducer";
import configReducer from "./config/reducer";

export const store = configureStore({
  reducer: {
    networks: networksReducer,
    config: configReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
