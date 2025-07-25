import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { NetworksState } from "./types";
import { NETWORK_OPTIONS } from "../../constants";

const initialState: NetworksState = {
  selectedKey: NETWORK_OPTIONS[0].key,
  isConnected: false,
};

const networksSlice = createSlice({
  name: "networks",
  initialState,
  reducers: {
    setSelectedKey(state, action: PayloadAction<string>) {
      state.selectedKey = action.payload;
      state.isConnected = false;
    },
    setIsConnected(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
  },
});

export const { setSelectedKey, setIsConnected } = networksSlice.actions;
export default networksSlice.reducer;
