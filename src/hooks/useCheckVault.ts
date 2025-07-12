import { useEffect, useState } from "react";
import { getVault } from "../utils/storage";
import { useDispatch } from "react-redux";
import { setHasVault } from "../state/config/reducer";
import { parseError } from "../utils";

export function useCheckVault() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVault = async () => {
      setIsLoading(true);

      try {
        const storedVault = await getVault();

        const parsedVault = storedVault ? JSON.parse(storedVault) : null;

        if (parsedVault && parsedVault.length) {
          dispatch(setHasVault(true));
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
