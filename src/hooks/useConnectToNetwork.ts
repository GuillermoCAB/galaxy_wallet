import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../services";
import {
  selectIsConnected,
  selectSelectedNetwork,
} from "../state/networks/selectors";
import { setIsConnected } from "../state/networks/reducer";
import { parseError } from "../utils";

export function useConnectToNetwork() {
  const [isLoading, setIsLoading] = useState(false);

  const selectedNetwork = useSelector(selectSelectedNetwork);
  const isConnected = useSelector(selectIsConnected);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedNetwork?.url || isConnected) return;

    const fetchVault = async () => {
      setIsLoading(true);

      try {
        await connect(selectedNetwork.url);

        dispatch(setIsConnected(true));
      } catch (error) {
        const parsedError = parseError(error);
        console.error("Error connecting to network", parsedError);

        dispatch(setIsConnected(false));
      } finally {
        setIsLoading(false);
      }
    };

    fetchVault();
  }, [isConnected, selectedNetwork?.url, dispatch]);

  return { isLoading };
}
