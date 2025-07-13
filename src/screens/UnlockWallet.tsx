import { useState } from "react";
import { parseError, validatePassword } from "../utils";
import UnlockWalletImg from "../assets/unlockWalletImg.png";
import { Button, PasswordInput } from "../components";
import { useDecryptMnemonic } from "../hooks";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../state/config/reducer";
import { setDecryptedMnemonic } from "../state/wallets/reducer";

export const UnlockWallet = () => {
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { validate, isLoading: isDecryptLoading } = useDecryptMnemonic();

  const isLoading = isSubmitting || isDecryptLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    if (isLoading) return;

    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      validatePassword(password);
      const { isValid, decryptedMnemonic } = await validate(password);

      if (!isValid) {
        throw new Error("Incorrect password. Unable to unlock wallet.");
      }

      dispatch(setIsAuthenticated(true));
      dispatch(setDecryptedMnemonic(decryptedMnemonic));
    } catch (error) {
      const parsedError = parseError(error);
      console.error("Password validation error:", parsedError);

      setError(parsedError);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-1">
      <h1 className="text-2xl font-semibold">Unlock Spaceship</h1>
      <p className="text-sm text-gray-500 mb-auto text-center">
        Your Galaxy Wallet is locked and secure. To regain access and resume
        your journey through the Bittensor universe, please enter your password.
      </p>
      <img className="w-44" src={UnlockWalletImg} />
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
            disabled={isLoading}
            type="submit"
            customClasses="w-full my-2"
          >
            {isLoading ? "Unlocking Wallet..." : "Unlock Wallet"}
          </Button>
        </form>
      </div>
    </div>
  );
};
