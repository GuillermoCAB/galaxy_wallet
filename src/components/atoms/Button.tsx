import React from "react";
import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "outlined" | "invisible";
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary";
  disabled?: boolean;
  onClick?: () => void;
  customClasses?: string;
  type?: "button" | "submit" | "reset";
}
const baseStyles =
  "inline-flex items-center justify-center font-medium rounded-md focus:outline-none transition";

const sizeStyles = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

const colorStyles: Record<string, Record<string, string>> = {
  default: {
    primary: "bg-primary-500 text-white hover:opacity-80",
    secondary: "bg-secondary-500 text-white hover:opacity-80",
  },
  outlined: {
    primary: "border border-primary-500 text-primary-500 hover:opacity-80",
    secondary:
      "border border-secondary-500 text-secondary-500 hover:opacity-80",
  },
  invisible: {
    primary: "text-primary-500 hover:bg-gray-100/10 transition-all",
    secondary: "text-secondary-500 hover:bg-gray-100/10 transition-all",
  },
};

const disabledStyles =
  "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed opacity-50";

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "md",
  color = "primary",
  disabled = false,
  onClick,
  customClasses,
  type = "button",
}) => {
  const finalClassName = classNames(
    baseStyles,
    sizeStyles[size],
    disabled ? disabledStyles : colorStyles[variant][color]
  );

  return (
    <button
      className={`${finalClassName} ${customClasses}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
