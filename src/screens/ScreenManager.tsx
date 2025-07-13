import { GlobalLoader, MainLayout } from "../components";
import { useSelector } from "react-redux";
import { useAutoLock, useConnectToNetwork } from "../hooks";
import {
  selectIsAuthenticated,
  selectHasVault,
} from "../state/config/selectors";
import { useCheckVault } from "../hooks";
import { selectIsConnected } from "../state/networks/selectors";
import { useMemo } from "react";
import { NewUser } from "./NewUser";
import { UnlockWallet } from "./UnlockWallet";
import { Wallet } from "./Wallet";
import { ErrorScreen } from "./ErrorScreen";

export const ScreenManager = () => {
  const { isLoading: vaultIsLoading } = useCheckVault();
  const {
    isLoading: networkIsLoading,
    error: networkError,
    retry: retryConnectToNetwork,
  } = useConnectToNetwork();
  const { isLoading: isAutoLockLoading } = useAutoLock();

  const hasVault = useSelector(selectHasVault);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isConnected = useSelector(selectIsConnected);
  const isLoading = networkIsLoading || vaultIsLoading || isAutoLockLoading;

  const ScreenToRender = useMemo(() => {
    if (!isConnected || networkError)
      return (
        <ErrorScreen
          title="Lost Connection"
          message="We couldn't establish a stable link with the blockchain network. Your spaceship is offline and drifting — no transmissions can be sent or received right now. Please check your internet connection."
          action={() => retryConnectToNetwork()}
          actionText="Retry Connection"
        />
      );

    if (!hasVault) return <NewUser />;

    if (!isAuthenticated) return <UnlockWallet />;

    return <Wallet />;
  }, [isConnected, isAuthenticated, hasVault, isLoading]);

  if (isLoading) {
    return <GlobalLoader />;
  }

  return <MainLayout>{ScreenToRender}</MainLayout>;
};
