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
}) => {
  const modalRef = useRef(null);
  const initialFocusRef = useRef(null);

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
      if (initialFocusRef.current) {
        initialFocusRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      // Re-enable scrolling
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-gray-50">
                <div className="flex items-center">
                  {icon && <span className="mr-2">{icon}</span>}
                  <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 text-gray-500 rounded-full hover:bg-gray-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Content */}
                <div className="px-6 py-4">{children}</div>

                {/* Actions */}
                <div className="flex justify-end px-6 py-4 space-x-3 bg-gray-50">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    {cancelText}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white transition-colors rounded-md bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    {submitText}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InputModal;
