import { useTransactions } from "../../hooks";
import { formatDate, formatWalletAddress } from "../../utils";
import { TransactionHistorySkeleton } from "../molecules";

export type Transaction = {
  id: string;
  type: "sent" | "received";
  amount: string;
  timestamp: string;
  to?: string;
  from?: string;
};

export function TransactionHistory() {
  const { transactions, isLoading } = useTransactions();

  if (isLoading) {
    return <TransactionHistorySkeleton />;
  }

  return (
    <div className="w-full max-w-sm mt-4">
      <h2 className="text-sm font-semibold text-gray-500 mb-2">
        Transaction History
      </h2>
      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
        {transactions.length === 0 ? (
          <p className="text-sm text-gray-400">No transactions yet.</p>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between items-start bg-white/5 border border-white/10 rounded px-3 py-2 text-sm"
            >
              <div className="flex flex-col">
                <span className="font-semibold">
                  {tx.type === "received" ? "Received" : "Sent"}
                </span>
                <span className="text-gray-400 text-xs">
                  {formatDate(tx.timestamp)}
                </span>
              </div>
              <div className="text-right">
                <span
                  className={`font-bold ${
                    tx.type === "received" ? "text-green-500" : "text-red-400"
                  }`}
                >
                  {tx.type === "received" ? "+" : "-"}
                  {tx.amount}
                </span>
                <div className="text-xs text-gray-400">
                  {tx.type === "received" && tx.from
                    ? `From: ${formatWalletAddress(tx.from)}`
                    : ""}
                  {tx.type === "sent" && tx.to
                    ? `To: ${formatWalletAddress(tx.to)}`
                    : ""}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
