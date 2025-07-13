import { useMemo, useState } from "react";
import type { Wallet } from "../state/wallets/types";
import { CreateWallet, ShowMnemonic, ValidateMnemonic } from "../components";

const NEW_USER_STEPS = {
  CREATE_WALLET: "CREATE_WALLET",
  SHOW_MNEMONIC: "SHOW_MNEMONIC",
  VALIDATE_MNEMONIC: "VALIDATE_MNEMONIC",
};

export const NewUser = () => {
  const [currentStep, setCurrentStep] = useState(NEW_USER_STEPS.CREATE_WALLET);
  const [mnemonic, setMnemonic] = useState("");
  const [draftWallet, setDraftWallet] = useState<Wallet | null>(null);

  const onCreateWallet = (wallet: Wallet, mnemonic: string) => {
    setDraftWallet(wallet);
    setMnemonic(mnemonic);
    setCurrentStep(NEW_USER_STEPS.SHOW_MNEMONIC);
  };

  const onContinueToValidation = () => {
    setCurrentStep(NEW_USER_STEPS.VALIDATE_MNEMONIC);
  };

  const backToShowMnemonic = () => {
    setCurrentStep(NEW_USER_STEPS.SHOW_MNEMONIC);
  };

  const RenderStep = useMemo(() => {
    switch (currentStep) {
      default:
      case NEW_USER_STEPS.CREATE_WALLET:
        return <CreateWallet onCreateWallet={onCreateWallet} />;

      case NEW_USER_STEPS.SHOW_MNEMONIC:
        return (
          <ShowMnemonic
            mnemonic={mnemonic}
            onContinue={onContinueToValidation}
          />
        );

      case NEW_USER_STEPS.VALIDATE_MNEMONIC:
        return (
          <ValidateMnemonic
            mnemonic={mnemonic}
            goBack={backToShowMnemonic}
            draftWallet={draftWallet}
          />
        );
    }
  }, [currentStep]);

  return RenderStep;
};
