import React, { useState, type KeyboardEvent } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  onEnterPress?: () => void;
  placeholder?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  onEnterPress,
  placeholder,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnterPress?.();
    }
  };

  return (
    <div className="relative w-full mb-2">
      <label className="text-xs font-semibold" htmlFor="password">
        Password
      </label>
      <input
        type={showPassword ? "text" : "password"}
        className="w-full py-2 pl-2 pr-10 text-xl border-b border-gray-300 focus:border-b-2 focus:border-primary-500 focus:outline-none"
        placeholder={placeholder || "xg5#@!fg4"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        name="password"
        required
        minLength={8}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Eye className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
};
