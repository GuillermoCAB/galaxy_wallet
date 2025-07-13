import { useState } from "react";

import NewUserBG from "../../assets/newUserBG.png";
import { PasswordInput } from "../molecules";
import { Button } from "../atoms";
import { parseError, validatePassword } from "../../utils";
import { useWallet } from "../../hooks";
import type { Wallet } from "../../state/wallets/types";

interface CreateWalletProps {
  onCreateWallet: (wallet: Wallet, mnemonic: string) => void;
}

export const CreateWallet: React.FC<CreateWalletProps> = ({
  onCreateWallet,
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { createWallet, isLoading: isWalletLoading } = useWallet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      validatePassword(password);

      const walletResponse = await createWallet(password);
      if (!walletResponse) {
        throw new Error("Failed to create wallet");
      }

      const { wallet, mnemonic } = walletResponse;
      onCreateWallet(wallet, mnemonic);
    } catch (error) {
      const parsedError = parseError(error);
      console.error("Password validation error:", parsedError);
      setError(parsedError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-1">
      <h1 className="text-2xl font-semibold">Secure Your Launch</h1>
      <p className="text-sm text-gray-500 mb-auto text-center">
        Before we lift off, you need to set a strong password. This will be used
        to create and encrypt your Galaxy Wallet — your secure vessel to explore
        the Bittensor universe.
      </p>
      <img className="w-44" src={NewUserBG} />
      <div className="w-full h-full flex flex-col mt-4">
        <form onSubmit={handleSubmit} className="w-full h-full flex flex-col">
          <PasswordInput
            value={password}
            onChange={(newValue) => setPassword(newValue)}
          />
          <span className="w-full text-red-500 text-xs font-semibold mt-1 mb-auto">
            {error}
          </span>
          <Button
            disabled={isLoading || isWalletLoading}
            type="submit"
            customClasses="w-full my-2"
          >
            {isLoading || isWalletLoading
              ? "Initializing Wallet..."
              : "Launch Wallet"}
          </Button>
        </form>
      </div>
    </div>
  );
};
