import { Header } from "./Header";

export const MainLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-full h-full flex flex-col overflow-y-auto">
      <Header />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};
