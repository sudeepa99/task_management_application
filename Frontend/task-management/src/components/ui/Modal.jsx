"use client";
import { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-xl",
}) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative w-full ${maxWidth} bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden`}
      >
        <div className="h-1.5 w-full bg-linear-to-r from-blue-500 via-indigo-500 to-blue-600" />

        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-100">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-3 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-150"
            aria-label="Close modal"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-10 py-8">{children}</div>
      </div>
    </div>
  );
}
