import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, Lock } from "lucide-react";
import { Button, Overlay } from "../atoms";
import { ConfirmLockWalletModal } from "./modals/ConfirmLockWalletModal";

export const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [isLockModalOpen, setisLockModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLockWallet = () => {
    setIsOpen(false);
    setisLockModalOpen(true);
  };

  return (
    <>
      <Button
        variant="invisible"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        size="sm"
      >
        <MenuIcon size={20} />
      </Button>

      {isOpen && <Overlay />}

      <div
        ref={sidebarRef}
        className={`fixed top-10 right-0 h-fit w-50 bg-background-light shadow-lg z-50 transform transition-transform duration-300 rounded-bl-lg rounded-tl-lg ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="py-4 text-gray-100">
          <li
            onClick={handleLockWallet}
            className="p-4 flex items-center gap-2 text-lg text-gray-300 hover:text-secondary-500 hover:bg-gray-100/10 transition-colors font-semibold cursor-pointer"
          >
            <Lock size={20} />
            Lock Wallet
          </li>
        </ul>
      </div>

      <ConfirmLockWalletModal
        isOpen={isLockModalOpen}
        close={() => setisLockModalOpen(false)}
      />
    </>
  );
};
