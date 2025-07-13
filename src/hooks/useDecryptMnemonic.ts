import { useState } from "react";
import { validatePasswordAgainstEncryptedMnemonic } from "../utils";
import { useSelector } from "react-redux";
import { selectWalletEncryptedMnemonic } from "../state/wallets/selectors";

export function useDecryptMnemonic() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const encryptedMnemonic = useSelector(selectWalletEncryptedMnemonic);

  const validate = async (password: string) => {
    if (!encryptedMnemonic)
      throw new Error("No wallet found. Please refresh the app and try again.");

    setIsLoading(true);
    setError("");

    let isValid = false;
    let decryptedMnemonic = null;

    try {
      decryptedMnemonic = validatePasswordAgainstEncryptedMnemonic(
        encryptedMnemonic,
        password
      );

      if (!decryptedMnemonic) {
        throw new Error("Incorrect password. Unable to unlock wallet.");
      }

      isValid = true;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);

      return {
        isValid,
        decryptedMnemonic,
      };
    }
  };

  return {
    isLoading,
    error,
    validate,
  };
}
