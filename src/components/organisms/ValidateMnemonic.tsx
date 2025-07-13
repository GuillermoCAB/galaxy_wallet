import React, { useMemo, useState } from "react";
import { pickTwoRandomIndices } from "../../utils";
import ConfirmMnemonicImg from "../../assets/confirmMnemonicImg.png";
import { Button } from "../atoms";
import { useWallet } from "../../hooks";
import type { Wallet } from "../../state/wallets/types";

type MnemonicCheckpointProps = {
  mnemonic: string;
  goBack: () => void;
  draftWallet: Wallet | null;
};

export function ValidateMnemonic({
  mnemonic,
  goBack,
  draftWallet,
}: MnemonicCheckpointProps) {
  const words = useMemo(() => mnemonic.trim().split(/\s+/), [mnemonic]);
  const [missingIndices] = useState(() => pickTwoRandomIndices());
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { storeWallet, isLoading: isWalletLoading } = useWallet();

  const handleInputChange = (index: number, value: string) => {
    setUserInputs((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const isValid = missingIndices.every(
      (i) => userInputs[i]?.trim().toLowerCase() === words[i].toLowerCase()
    );

    if (isValid && draftWallet) {
      const finalWords = words.map((word, i) =>
        missingIndices.includes(i) ? userInputs[i].trim() : word
      );

      const finalMnemonic = finalWords.join(" ");

      await storeWallet(draftWallet, finalMnemonic);
    } else {
      setError("Galactic mismatch! Please double-check your coordinates.");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-1">
      <h1 className="text-2xl font-semibold">Mnemonic Checkpoint</h1>
      <p className="text-sm text-gray-500 mb-auto text-center">
        To finalize your Galaxy Wallet launch, confirm the missing coordinates
        below. This ensures you've securely saved your recovery phrase.
      </p>
      <img className="w-44" src={ConfirmMnemonicImg} />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <div className="grid grid-cols-3 gap-2 text-left">
          {words.map((word, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-gray-400 w-5">{i + 1}.</span>
              {missingIndices.includes(i) ? (
                <input
                  type="text"
                  value={userInputs[i] || ""}
                  onChange={(e) => handleInputChange(i, e.target.value)}
                  placeholder="???"
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              ) : (
                <span className="text-sm font-mono">{word}</span>
              )}
            </div>
          ))}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          disabled={isLoading || isWalletLoading}
          type="submit"
          customClasses="w-full mt-2"
        >
          Confirm Coordinates
        </Button>
      </form>

      <Button
        disabled={isLoading || isWalletLoading}
        onClick={() => goBack()}
        variant="invisible"
        customClasses="w-full mb-2"
      >
        Back
      </Button>
    </div>
  );
}
