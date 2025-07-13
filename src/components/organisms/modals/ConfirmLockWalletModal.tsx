import { Overlay } from "../../atoms";
import { Modal } from "../../molecules/Modal";

import LockWalletWallet from "../../../assets/lockWalletImage.png";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../../../state/config/reducer";
import { setDecryptedMnemonic } from "../../../state/wallets/reducer";

interface ConfirmLockWalletModalProps {
  isOpen: boolean;
  close: () => void;
}

export const ConfirmLockWalletModal: React.FC<ConfirmLockWalletModalProps> = ({
  isOpen,
  close,
}) => {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleConfirm = () => {
    dispatch(setIsAuthenticated(false));
    dispatch(setDecryptedMnemonic(null));
    close();
  };

  return (
    <>
      <Overlay />
      <Modal
        isOpen={isOpen}
        title="Secure the Hatch?"
        text="Locking your wallet will shut down your session and protect your keys in orbit. You’ll need your password to regain access later. Be sure all your transactions are complete before proceeding."
        onCancel={close}
        onConfirm={handleConfirm}
        image={LockWalletWallet}
        confirmText="Engage Lockdown"
        cancelText="Go Back"
      />
    </>
  );
};
