import React from "react";

interface OverlayProps {
  customClasses?: string;
}

export const Overlay: React.FC<OverlayProps> = ({ customClasses }) => {
  return (
    <div
      className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity ${customClasses}`}
    />
  );
};
