import { GlobalLoader } from "../components";
import { useSelector } from "react-redux";
import { useConnectToNetwork } from "../hooks";
import {
  selectIsAuthenticated,
  selectHasVault,
} from "../state/config/selectors";
import { useCheckVault } from "../hooks/useCheckVault";
import { selectIsConnected } from "../state/networks/selectors";
import { useMemo } from "react";
import { NewUser } from "./NewUser";
import MainLayout from "../components/MainLayout";

export function ScreenManager() {
  const { isLoading: networkIsLoading } = useConnectToNetwork();
  const { isLoading: vaultIsLoading } = useCheckVault();

  const hasVault = useSelector(selectHasVault);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isConnected = useSelector(selectIsConnected);
  const isLoading = networkIsLoading || vaultIsLoading;

  const ScreenToRender = useMemo(() => {
    console.log("loggui ScreenManager rendering", {
      hasVault,
      isAuthenticated,
      isConnected,
    });

    if (!isConnected)
      return (
        <div className="p-4 w-full h-full">
          Network not connected. Please select a network and try again.
        </div>
      );

    if (!hasVault) return <NewUser />;

    if (!isAuthenticated) return "UnlockWallet";

    return "Wallet";
  }, [isConnected, isAuthenticated, hasVault]);

  if (isLoading) {
    return <GlobalLoader />;
  }

  return <MainLayout>{ScreenToRender}</MainLayout>;
}
