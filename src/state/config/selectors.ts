import type { RootState } from "../store";

export const selectIsLoading = (state: RootState) => state.config.isLoading;

export const selectEncryptionKey = (state: RootState) =>
  state.config.encryptionKey;

export const selectHasVault = (state: RootState) => state.config.hasVault;
