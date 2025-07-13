/// <reference types="vitest" />
import { renderHook, act } from "@testing-library/react";
import { useWallet } from "../useWallet";
import { configureStore } from "@reduxjs/toolkit";
import walletsReducer from "../../state/wallets/reducer";
import configReducer from "../../state/config/reducer";
import { Provider } from "react-redux";
import CryptoJS from "crypto-js";
import { MOCKED_VALID_MNEMONIC } from "../../constants";

const store = configureStore({
  reducer: {
    wallets: walletsReducer,
    config: configReducer,
  },
});

vi.mock("../../services", () => ({
  getBalance: vi.fn(() => Promise.resolve("42")),
}));

vi.mock("crypto-js", async () => {
  const actual = await vi.importActual<typeof import("crypto-js")>("crypto-js");
  return {
    ...actual,
  };
});

vi.mock("@polkadot/util-crypto", () => ({
  cryptoWaitReady: vi.fn(() => Promise.resolve(true)),
  mnemonicGenerate: vi.fn(() => MOCKED_VALID_MNEMONIC),
}));

function Wrapper({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

describe("useWallet", () => {
  it("creates a wallet and returns it with mnemonic", async () => {
    const { result } = renderHook(() => useWallet(), { wrapper: Wrapper });

    let newWallet, mnemonic;

    await act(async () => {
      const res = await result.current.createWallet("MyStrongPass1!");
      newWallet = res?.wallet;
      mnemonic = res?.mnemonic;
    });

    expect(mnemonic).toBe(MOCKED_VALID_MNEMONIC);
    expect(newWallet).toEqual({
      address: expect.any(String),
      balance: "42",
      encryptedMnemonic: expect.any(String),
    });
  });

  it("encrypts the mnemonic with the password", async () => {
    const { result } = renderHook(() => useWallet(), { wrapper: Wrapper });

    let encryptedMnemonic;

    await act(async () => {
      const res = await result.current.createWallet("MyStrongPass1!");
      encryptedMnemonic = res?.wallet.encryptedMnemonic;
    });

    expect(encryptedMnemonic).toBeDefined();

    const decrypted = CryptoJS.AES.decrypt(
      encryptedMnemonic || "",
      "MyStrongPass1!"
    ).toString(CryptoJS.enc.Utf8);

    expect(decrypted).toBe(MOCKED_VALID_MNEMONIC);
  });

  it("returns nothing if password is missing", async () => {
    const { result } = renderHook(() => useWallet(), { wrapper: Wrapper });

    let response;
    await act(async () => {
      response = await result.current.createWallet("");
    });

    expect(response).toBeUndefined();
  });
});
