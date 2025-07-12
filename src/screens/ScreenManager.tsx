import { GlobalLoader } from "../components";
import { useSelector } from "react-redux";
import { useConnectToNetwork } from "../hooks";
import { selectEncryptionKey, selectHasVault } from "../state/config/selectors";
import { useCheckVault } from "../hooks/useCheckVault";
import { selectIsConnected } from "../state/networks/selectors";
import { useMemo } from "react";

export function ScreenManager() {
  const { isLoading: networkIsLoading } = useConnectToNetwork();
  const { isLoading: vaultIsLoading } = useCheckVault();

  const hasVault = useSelector(selectHasVault);
  const hasPassword = !!useSelector(selectEncryptionKey);
  const isConnected = useSelector(selectIsConnected);
  const isLoading = networkIsLoading || vaultIsLoading;
  const isNewUser = !hasPassword && !hasVault;

  const ScreenToRender = useMemo(() => {
    console.log("loggui ScreenManager rendering", {
      hasVault,
      hasPassword,
      isConnected,
      isNewUser,
    });

    if (!isConnected)
      return (
        <div className="p-4 w-full h-full">
          Network not connected. Please select a network and try again.
        </div>
      );

    if (isNewUser) return "NewPassword";

    if (!hasVault) return "AddWallet";

    if (!hasPassword) return "LoginForm";

    return "Wallet";
  }, [isConnected, isNewUser, hasPassword, hasVault]);

  if (isLoading) {
    return <GlobalLoader />;
  }

  return <div className="w-full h-full flex flex-col">{ScreenToRender}</div>;
}
