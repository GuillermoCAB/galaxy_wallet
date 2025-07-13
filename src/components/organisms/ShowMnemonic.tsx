import { Button } from "../atoms";
import ShowMnemonicImg from "../../assets/showMnemonicImg.png";

type ShowMnemonicScreenProps = {
  mnemonic: string;
  onContinue: () => void;
};

export function ShowMnemonic({
  mnemonic,
  onContinue,
}: ShowMnemonicScreenProps) {
  const words = mnemonic.trim().split(/\s+/);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-1">
      <h1 className="text-2xl font-semibold">Recovery Phrase</h1>
      <p className="text-sm text-gray-500 mb-auto text-center">
        These 12 words are your access to the Galaxy. Write them down and store
        them in a safe place. Anyone with these words can control your wallet.
        There's no way to recover them if lost.
      </p>
      <img className="w-44" src={ShowMnemonicImg} />

      <div className="grid grid-cols-3 gap-3 max-w-md w-full text-left text-sm font-mono bg-gray-100 p-2 rounded">
        {words.map((word, index) => (
          <div
            key={index}
            className="flex items-center text-gray-900 dark:text-white"
          >
            <span className="text-gray-400 w-6">{index + 1}.</span>
            <span>{word}</span>
          </div>
        ))}
      </div>

      <Button onClick={onContinue} customClasses="w-full my-2">
        I’ve saved my phrase
      </Button>
    </div>
  );
}
