import Loader from "../assets/animations/LoaderAnimation.svg";

export function GlobalLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center z-50">
      <img src={Loader} alt="Loading..." />
    </div>
  );
}
