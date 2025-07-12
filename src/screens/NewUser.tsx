import { useState } from "react";
import { PasswordInput, Button } from "../components";
import { validatePassword } from "../utils";
import { setIsAuthenticated } from "../state/config/reducer";
import { parseError } from "../utils/error";
import { useDispatch } from "react-redux";

import NewUserBG from "../assets/newUserBG.png";

export function NewUser() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      validatePassword(password);
      dispatch(setIsAuthenticated(true));
    } catch (error) {
      const parsedError = parseError(error);
      console.error("Password validation error:", parsedError);
      setError(parsedError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-1">
      <img className="w-44" src={NewUserBG} />
      <h1 className="text-2xl font-semibold">Secure Your Launch</h1>
      <p className="text-sm text-gray-500 mb-auto text-center">
        Before we lift off, you need to set a strong password. This will be used
        to create and encrypt your Galaxy Wallet — your secure vessel to explore
        the Bittensor universe.
      </p>
      <div className="w-full h-full flex flex-col mt-4">
        <form onSubmit={handleSubmit} className="w-full h-full flex flex-col">
          <PasswordInput
            value={password}
            onChange={(newValue) => setPassword(newValue)}
          />
          <span className="w-full text-red-500 text-xs font-semibold mt-1 mb-auto">
            {error}
          </span>
          <Button
            disabled={isLoading}
            type="submit"
            customClasses="w-full my-2"
          >
            {isLoading ? "Initializing Wallet..." : "Launch Wallet"}
          </Button>
        </form>
      </div>
    </div>
  );
}
