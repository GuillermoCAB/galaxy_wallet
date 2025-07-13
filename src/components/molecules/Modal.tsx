import { Button, Overlay } from "../atoms";

interface ModalProps {
  isOpen: boolean;
  title: string;
  text?: string;
  image?: string;
  onConfirm?: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  text,
  image,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <>
      <Overlay />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-gray-900 rounded-lg shadow-lg max-w-md w-full mx-4 p-6 relative animate-fade-in">
          {image && (
            <img src={image} alt="modal visual" className="w-44 mx-auto" />
          )}
          {title && (
            <h2 className="text-xl font-bold text-center text-white mb-2">
              {title}
            </h2>
          )}
          {text && (
            <p className="text-sm text-center text-gray-300 mb-6">{text}</p>
          )}
          <div className="flex flex-col justify-end gap-3">
            {onConfirm && (
              <Button size="sm" variant="default" onClick={onConfirm}>
                {confirmText}
              </Button>
            )}
            <Button size="sm" variant="invisible" onClick={onCancel}>
              {cancelText}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
