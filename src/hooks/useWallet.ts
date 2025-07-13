import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { Keyring } from "@polkadot/api";
import {
  mnemonicGenerate,
  cryptoWaitReady,
  mnemonicValidate,
} from "@polkadot/util-crypto";
import CryptoJS from "crypto-js";

import { parseError, saveVault } from "../utils";
import { getBalance } from "../services";
import {
  setDecryptedMnemonic,
  setWallet,
  updateWallet,
} from "../state/wallets/reducer";
import { setHasVault, setIsAuthenticated } from "../state/config/reducer";
import type { Wallet } from "../state/wallets/types";

export function useWallet() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createWallet = useCallback(
    async (
      password: string
    ): Promise<{ mnemonic: string; wallet: Wallet } | undefined> => {
      if (!password || isLoading) return;

      setIsLoading(true);

      try {
        await cryptoWaitReady();

        const mnemonic = mnemonicGenerate();

        const keyring = new Keyring({ type: "sr25519" });
        const { address } = keyring.addFromUri(mnemonic);

        const balance = await getBalance(address);
        const encryptedMnemonic = CryptoJS.AES.encrypt(
          mnemonic,
          password
        ).toString();

        const wallet = {
          address,
          balance,
          encryptedMnemonic,
        };

        return { wallet, mnemonic };
      } catch (error) {
        const parsedError = parseError(error);
        console.error("Error creating wallet:", parsedError);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  const storeWallet = useCallback(
    async (wallet: Wallet, mnemonic: string): Promise<void> => {
      if (!wallet || !mnemonic || isLoading) return;

      setIsLoading(true);

      try {
        await cryptoWaitReady();

        if (!mnemonicValidate(mnemonic)) {
          throw new Error(
            "Generated mnemonic failed validation—this should never happen"
          );
        }

        await saveVault(JSON.stringify(wallet));

        dispatch(setHasVault(true));
        dispatch(setWallet(wallet));
        dispatch(setIsAuthenticated(true));
        dispatch(setDecryptedMnemonic(mnemonic));
      } catch (error) {
        const parsedError = parseError(error);
        console.error("Error creating wallet:", parsedError);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, isLoading]
  );

  const updateBalance = useCallback(
    async (address: string): Promise<void> => {
      if (!address) return;

      setIsLoading(true);

      try {
        const balance = await getBalance(address);
        dispatch(updateWallet({ address, changes: { balance } }));
      } catch (error) {
        const parsedError = parseError(error);
        console.error("Error updating wallet balance:", parsedError);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, isLoading]
  );

  return { createWallet, storeWallet, updateBalance, isLoading };
}
