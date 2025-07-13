import ErrorImg from "../assets/errorScreenImg.png";
import { Button } from "../components";

interface ErrorScreenProps {
  title: string;
  message: string;
  action?: () => void;
  actionText?: string;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  title,
  message,
  action,
  actionText,
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-1">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-sm text-gray-500 text-center">{message}</p>
      <img className="w-44 mb-auto" src={ErrorImg} />
      {action && (
        <Button onClick={action} customClasses="w-full my-2">
          {actionText || "Retry"}
        </Button>
      )}
    </div>
  );
};
