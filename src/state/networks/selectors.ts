import { createSelector } from "@reduxjs/toolkit";
import { NETWORK_OPTIONS, type NetworksState } from "./reducer";

export const selectSelectedKey = (state: { networks: NetworksState }) =>
  state.networks.selectedKey;

export const selectSelectedNetwork = createSelector(
  selectSelectedKey,
  (selectedKey) =>
    NETWORK_OPTIONS.find((opt) => opt.key === selectedKey) ?? null
);

export const selectIsConnected = (state: { networks: NetworksState }) =>
  state.networks.isConnected;

export const selectNetworkError = (state: { networks: NetworksState }) =>
  state.networks.error;
