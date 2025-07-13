import { useSelector } from "react-redux";
import WalletImg from "../assets/walletImg.png";
import { selectWallet } from "../state/wallets/selectors";
import { BalanceSkeleton, Button, TransactionHistory } from "../components";
import { useEffect, useState } from "react";
import { useWallet } from "../hooks";
import { Copy } from "lucide-react";

export function Wallet() {
  const [copied, setCopied] = useState(false);
  const wallet = useSelector(selectWallet);

  const { updateBalance, isLoading } = useWallet();

  useEffect(() => {
    if (!wallet?.address) return;
    updateBalance(wallet.address);
  }, [wallet?.address]);

  const handleCopy = async () => {
    if (wallet?.address) {
      await navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!wallet) {
    return (
      <p className="text-center text-sm text-gray-400">Wallet not loaded.</p>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-1">
      <h1 className="text-2xl font-semibold">My Wallet</h1>
      <p className="text-sm text-gray-500 mb-auto text-center">
        Your assets in orbit. View your balance, address, and recent
        transactions.
      </p>

      <img src={WalletImg} className="w-44" />

      <div className="bg-gray-100 rounded p-4 w-full max-w-sm">
        <div className="flex justify-between items-center gap-2">
          <div className="text-sm text-gray-500 mb-1 font-semibold">
            Address
          </div>
          <div className="flex items-center gap-2">
            {copied && (
              <span className="text-xs text-green-600 font-medium ml-1">
                Copied!
              </span>
            )}
            <Button
              onClick={handleCopy}
              disabled={copied}
              customClasses="text-primary-600 hover:text-primary-800 transition"
              variant="invisible"
            >
              <Copy size={16} />
            </Button>
          </div>
        </div>
        <div className="text-sm font-mono break-all text-primary-500 flex-1">
          {wallet.address}
        </div>
      </div>

      <div className="w-full max-w-sm flex justify-between items-center bg-primary-100 rounded px-4 py-3 mt-2">
        <span className="text-sm font-medium text-gray-600 ">
          Total Balance
        </span>
        {!isLoading ? (
          <span className="text-lg font-bold text-primary-600">
            {wallet.balance} TAO
          </span>
        ) : (
          <BalanceSkeleton />
        )}
      </div>

      <TransactionHistory />
    </div>
  );
}
