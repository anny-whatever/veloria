// client/src/pages/Admin/components/InputModal.jsx
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/**
 * A versatile input modal component that can be used for various types of inputs
 *
 * @param {boolean} isOpen - Whether the modal is open
 * @param {function} onClose - Function to call when modal is closed
 * @param {function} onSubmit - Function to call when form is submitted
 * @param {string} title - Modal title
 * @param {React.ReactNode} children - Modal content (form fields)
 * @param {string} submitText - Text for the submit button
 * @param {string} cancelText - Text for the cancel button
 * @param {string} icon - Optional icon component to display next to the title
 * @param {object} initialFocusRef - Ref to the element that should be focused when modal opens
 * @param {string} className - Additional class name for the modal
 */
const InputModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  submitText = "Submit",
  cancelText = "Cancel",
  icon = null,
  initialFocusRef = null,
  className = "",
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      // Disable scrolling on body
      document.body.style.overflow = "hidden";

      // Focus the first form element
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      // Re-enable scrolling
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose, initialFocusRef]);

  const handleSubmitClick = (e) => {
    // Prevent default behavior
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    console.log("InputModal: direct submit button clicked");

    if (typeof onSubmit === "function") {
      try {
        console.log("InputModal: Calling onSubmit function directly");
        onSubmit(e);
      } catch (err) {
        console.error("InputModal: Error in onSubmit handler:", err);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 dark:bg-black/70"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={modalRef}
          className={`w-full max-w-md overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-xl ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              {icon && <span className="mr-2">{icon}</span>}
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {title}
              </h3>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              className="p-1 text-gray-500 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div
            className="px-6 py-4 dark:text-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>

          {/* Actions */}
          <div className="flex justify-end px-6 py-4 space-x-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              className="px-4 py-2 text-gray-700 dark:text-gray-200 transition-colors bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={handleSubmitClick}
              className="px-4 py-2 text-white transition-colors rounded-md bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              {submitText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputModal;
