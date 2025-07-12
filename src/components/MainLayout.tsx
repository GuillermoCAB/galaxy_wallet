import Logo from "../assets/Logo.png";

function MainLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col overflow-y-auto">
      <div className="w-full flex items-center justify-center gap-2 p-4">
        <img src={Logo} alt="Logo" className="h-10" />
        <p className="text-xl font-semibold text-primary-700 m-0">
          Galaxy Wallet
        </p>
      </div>
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}

export default MainLayout;
