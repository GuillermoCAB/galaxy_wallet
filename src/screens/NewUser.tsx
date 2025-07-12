import { useState } from "react";
import { PasswordInput, Button } from "../components";
import { validatePassword } from "../utils";
import { setEncryptionKey } from "../state/config/reducer";
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
      dispatch(setEncryptionKey(password));
    } catch (error) {
      const parsedError = parseError(error);
      console.error("Password validation error:", parsedError);
      setError(parsedError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-2">
      <img className="w-20" src={NewUserBG} />
      <h1 className="text-3xl font-semibold">Add Password</h1>
      <p className="text-sm text-gray-700 mb-auto">
        To get started and be able to explore our cosmos, please set a password
        for your wallets. This will helps secure your assets and provide a safe
        experience.
      </p>
      <div className="w-full h-full flex flex-col">
        <form onSubmit={handleSubmit} className="w-full h-full flex flex-col">
          <PasswordInput
            value={password}
            onChange={(newValue) => setPassword(newValue)}
          />
          <span className="w-full text-red-500 text-xs font-semibold mt-1">
            {error}
          </span>
          <Button
            disabled={isLoading}
            type="submit"
            customClasses="w-full mt-2"
          >
            {isLoading ? "LOADING" : "SUBMIT"}
          </Button>
        </form>
      </div>
    </div>
  );
}
