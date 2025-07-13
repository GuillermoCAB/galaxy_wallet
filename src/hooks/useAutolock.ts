import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setDecryptedMnemonic } from "../state/wallets/reducer";
import { setIsAuthenticated } from "../state/config/reducer";

const INACTIVITY_THRESHOLD = 30_000; // 30s of no activity
const LOCK_DELAY = 10 * 60 * 1000; // 10 min to lock wallet
const LAST_ACTIVITY_KEY = "galaxy-wallet-last-activity";

export function useAutoLock() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const lockTimer = useRef<NodeJS.Timeout | null>(null);

  const lockSession = () => {
    dispatch(setIsAuthenticated(false));
    dispatch(setDecryptedMnemonic(null));
  };

  const handleActivity = () => {
    setIsLoading(true);

    const now = Date.now();
    localStorage.setItem(LAST_ACTIVITY_KEY, now.toString());

    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (lockTimer.current) clearTimeout(lockTimer.current);

    inactivityTimer.current = setTimeout(() => {
      lockTimer.current = setTimeout(() => {
        lockSession();
      }, LOCK_DELAY);
    }, INACTIVITY_THRESHOLD);

    setIsLoading(false);
  };

  useEffect(() => {
    const lastActivity = parseInt(
      localStorage.getItem(LAST_ACTIVITY_KEY) || "0",
      10
    );
    const now = Date.now();

    const timeSinceLastActivity = now - lastActivity;

    if (lastActivity && timeSinceLastActivity > LOCK_DELAY) {
      lockSession();
    }

    const events = ["mousemove", "keydown", "click", "touchstart"];

    events.forEach((event) => window.addEventListener(event, handleActivity));
    handleActivity();

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      if (lockTimer.current) clearTimeout(lockTimer.current);
    };
  }, []);

  return {
    isLoading,
  };
}
