import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  loading,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="text-justify mb-6">
        <p className="text-2xl text-gray-800 leading-relaxed max-w-xs">
          {message}
        </p>
      </div>

      <div className="h-px bg-gray-100 mb-5" />

      <div className="flex gap-3">
        <Button
          variant="secondary"
          size="lg"
          onClick={onClose}
          disabled={loading}
          className="flex-1 rounded-xl! text-lg!"
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          size="lg"
          onClick={onConfirm}
          loading={loading}
          className="flex-1 rounded-xl! text-lg!"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </Button>
      </div>
    </Modal>
  );
}
