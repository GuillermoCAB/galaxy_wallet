import { useEffect, useState } from "react";
import { getVault } from "../utils/storage";
import { useDispatch } from "react-redux";
import { setHasVault } from "../state/config/reducer";
import { parseError } from "../utils";
import type { Wallet } from "../state/wallets/types";
import { setWallet } from "../state/wallets/reducer";

export function useCheckVault() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVault = async () => {
      setIsLoading(true);

      try {
        const storedVault = await getVault();

        const parsedVault: Wallet | null = storedVault
          ? JSON.parse(storedVault)
          : null;

        if (parsedVault) {
          dispatch(setHasVault(true));
          dispatch(setWallet({ ...parsedVault }));
        }
      } catch (error) {
        const parsedError = parseError(error);
        console.error("Error fetching vault:", parsedError);

        dispatch(setHasVault(false));
      } finally {
        setIsLoading(false);
      }
    };

    fetchVault();
  }, [dispatch]);

  return { isLoading };
}
