import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ConfigState } from "./types";

const initialState: ConfigState = {
  isAuthenticated: false,
  hasVault: false,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setHasVault(state, action: PayloadAction<boolean>) {
      state.hasVault = action.payload;
    },
    resetConfigState() {
      return initialState;
    },
  },
});

export const { setIsAuthenticated, setHasVault, resetConfigState } =
  configSlice.actions;
export default configSlice.reducer;
