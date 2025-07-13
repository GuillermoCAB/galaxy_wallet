import { Header } from "./Header";

function MainLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col overflow-y-auto">
      <Header />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}

export default MainLayout;
