import type { RootState } from "../store";
import type { WalletsState } from "./types";

export const selectWallet = (state: RootState) => state.wallets.wallet;

export const selectWalletAddress = (state: RootState) =>
  state.wallets.wallet?.address;

export const selectWalletBalance = (state: RootState) =>
  state.wallets.wallet?.balance;

export const selectWalletEncryptedMnemonic = (state: {
  wallets: WalletsState;
}) => state.wallets.wallet?.encryptedMnemonic;

export const selectDecryptedMnemonic = (state: RootState) =>
  state.wallets.decryptedMnemonic;
