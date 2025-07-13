import { useEffect, useState } from "react";
import { getTransactions } from "../services";
import type { Transaction } from "../components";
import { useSelector } from "react-redux";
import { selectWalletAddress } from "../state/wallets/selectors";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const address = useSelector(selectWalletAddress);

  useEffect(() => {
    if (!address) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      console.log("Fetching transactions for address:", address);

      try {
        const txs = await getTransactions(address);
        setTransactions(txs);
      } catch (err) {
        setError("Failed to load transactions.");
        console.error(err);
      } finally {
        setIsLoading(false);
        console.log("Transactions fetched:", transactions);
      }
    };

    fetchData();
  }, [address]);

  return {
    transactions,
    isLoading,
    error,
  };
}
