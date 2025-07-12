import { createSelector } from "@reduxjs/toolkit";
import type { NetworksState } from "./types";
import { NETWORK_OPTIONS } from "../../constants";

export const selectSelectedKey = (state: { networks: NetworksState }) =>
  state.networks.selectedKey;

export const selectSelectedNetwork = createSelector(
  selectSelectedKey,
  (selectedKey) =>
    NETWORK_OPTIONS.find((opt) => opt.key === selectedKey) ?? null
);

export const selectIsConnected = (state: { networks: NetworksState }) =>
  state.networks.isConnected;
