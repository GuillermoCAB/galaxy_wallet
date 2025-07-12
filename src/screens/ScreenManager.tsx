import { useState } from "react";
import { GlobalLoader } from "../components";

export function ScreenManager() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <GlobalLoader />;
  }

  return <div className="w-full h-full flex flex-col">Hello</div>;
}
