import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Wallet, WalletsState } from "./types";

const initialState: WalletsState = {
  wallet: null,
  decryptedMnemonic: null,
};

const walletsSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    setWallet(state, action: PayloadAction<Wallet>) {
      state.wallet = action.payload;
    },
    updateWallet(
      state,
      action: PayloadAction<{
        address: string;
        changes: Partial<Omit<Wallet, "address">>;
      }>
    ) {
      const { changes } = action.payload;
      const w = state.wallet;
      if (w) Object.assign(w, changes);
    },
    setDecryptedMnemonic(state, action: PayloadAction<string | null>) {
      state.decryptedMnemonic = action.payload;
    },
    resetWalletState() {
      return initialState;
    },
  },
});

export const {
  setWallet,
  updateWallet,
  setDecryptedMnemonic,
  resetWalletState,
} = walletsSlice.actions;

export default walletsSlice.reducer;
