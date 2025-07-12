import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ConfigState } from "./types";

const initialState: ConfigState = {
  encryptionKey: null,
  hasVault: false,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setEncryptionKey(state, action: PayloadAction<String>) {
      state.encryptionKey = action.payload;
    },
    setHasVault(state, action: PayloadAction<boolean>) {
      state.hasVault = action.payload;
    },
    resetConfigState(state) {
      state = initialState;
    },
  },
});

export const { setEncryptionKey, setHasVault, resetConfigState } =
  configSlice.actions;
export default configSlice.reducer;
