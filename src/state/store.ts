import { combineReducers, configureStore } from "@reduxjs/toolkit";
import networksReducer from "./networks/reducer";
import configReducer from "./config/reducer";
import walletsReducer from "./wallets/reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  networks: networksReducer,
  config: configReducer,
  wallets: walletsReducer,
});

const persistConfig = {
  key: "galaxy-wallet",
  storage,
  whitelist: ["config", "wallets"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
