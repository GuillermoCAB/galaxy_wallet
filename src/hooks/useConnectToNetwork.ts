import { useCallback, useEffect, useState } from "react";
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
  const [error, setError] = useState<string | null>(null);

  const selectedNetwork = useSelector(selectSelectedNetwork);
  const isConnected = useSelector(selectIsConnected);

  const dispatch = useDispatch();

  const tryConnect = useCallback(async () => {
    if (!selectedNetwork?.url) return;

    setIsLoading(true);
    setError(null);

    try {
      await connect(selectedNetwork.url);
      dispatch(setIsConnected(true));
    } catch (err) {
      const parsedError = parseError(err);
      console.error("Error connecting to network", parsedError);

      dispatch(setIsConnected(false));
      setError(parsedError);
    } finally {
      setIsLoading(false);
    }
  }, [selectedNetwork?.url, dispatch]);

  useEffect(() => {
    if (!selectedNetwork?.url || isConnected) return;
    tryConnect();
  }, [isConnected, selectedNetwork?.url, dispatch]);

  return {
    isLoading,
    error,
    retry: tryConnect,
  };
}
