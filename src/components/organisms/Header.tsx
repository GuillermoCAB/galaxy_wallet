import { useSelector } from "react-redux";
import Logo from "../../assets/Logo.png";
import { selectIsAuthenticated } from "../../state/config/selectors";
import { SideMenu } from "./SideMenu";

export const Header = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated)
    return (
      <div className="w-full h-16 flex">
        <div className="w-full flex items-center justify-center gap-2 p-4">
          <img src={Logo} alt="Galaxy Wallet Logo" className="h-10" />
          <p className="text-xl font-semibold text-primary-700 m-0">
            Galaxy Wallet
          </p>
        </div>
      </div>
    );

  return (
    <div className="w-full h-16 flex">
      <div className="w-full flex items-center justify-between p-4">
        <img src={Logo} alt="Galaxy Wallet Logo" className="h-10" />
        <SideMenu />
      </div>
    </div>
  );
};
