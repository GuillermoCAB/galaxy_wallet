import type { RootState } from "../store";

export const selectIsAuthenticated = (state: RootState) =>
  state.config.isAuthenticated;

export const selectHasVault = (state: RootState) => state.config.hasVault;
