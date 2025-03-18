// client/src/pages/Admin/components/FontSelectionModal.jsx
import { useState, useRef } from "react";
import { X, PlusCircle, FileType } from "lucide-react";
import InputModal from "./InputModal";

/**
 * Component for managing project fonts with a modal for adding fonts
 *
 * @param {Object} project - The project object
 * @param {Function} handleNestedChange - Function to update nested project properties
 */
const FontSelectionModal = ({ project, handleNestedChange }) => {
  const [showFontModal, setShowFontModal] = useState(false);
  const [fontInput, setFontInput] = useState("");
  const [fontError, setFontError] = useState("");
  const initialFocusRef = useRef(null);

  /**
   * Handle form submission for adding a new font
   */
  const handleFontSubmit = (e) => {
    e.preventDefault();

    if (!fontInput || fontInput.trim() === "") {
      setFontError("Please enter a font name");
      return;
    }

    // Add font to list
    handleNestedChange("designChoices", "fonts", [
      ...(project.designChoices.fonts || []),
      fontInput.trim(),
    ]);

    // Reset and close modal
    setFontInput("");
    setFontError("");
    setShowFontModal(false);
  };

  // Common web-safe and Google fonts
  const commonFonts = [
    "Arial",
    "Roboto",
    "Open Sans",
    "Lato",
    "Montserrat",
    "Poppins",
    "Raleway",
    "Oswald",
    "Merriweather",
    "Playfair Display",
    "Source Sans Pro",
    "PT Sans",
    "Georgia",
  ];

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Fonts
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {project.designChoices.fonts &&
          project.designChoices.fonts.map((font, index) => (
            <div
              key={index}
              className="flex items-center p-1 px-2 bg-white border border-gray-300 rounded-md"
            >
              <span
                className="text-sm font-medium"
                style={{ fontFamily: font }}
              >
                {font}
              </span>
              <button
                type="button"
                onClick={() => {
                  const updatedFonts = [...project.designChoices.fonts];
                  updatedFonts.splice(index, 1);
                  handleNestedChange("designChoices", "fonts", updatedFonts);
                }}
                className="p-1 ml-1 text-red-600 rounded-md hover:bg-red-50"
              >
                <X size={14} />
              </button>
            </div>
          ))}

        <button
          type="button"
          onClick={() => setShowFontModal(true)}
          className="flex items-center justify-center w-8 h-8 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <PlusCircle size={16} />
        </button>
      </div>

      {/* Font Input Modal */}
      <InputModal
        isOpen={showFontModal}
        onClose={() => {
          setShowFontModal(false);
          setFontError("");
          setFontInput("");
        }}
        onSubmit={handleFontSubmit}
        title="Add Font"
        submitText="Add Font"
        icon={<FileType size={20} className="text-accent" />}
      >
        <div>
          <label
            htmlFor="fontName"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Font Name
          </label>
          <input
            id="fontName"
            ref={initialFocusRef}
            type="text"
            placeholder="Roboto, Open Sans, etc."
            value={fontInput}
            onChange={(e) => setFontInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
          {fontError && (
            <p className="mt-1 text-sm text-red-600">{fontError}</p>
          )}

          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700">
              Common Font Suggestions:
            </p>
            <div className="grid grid-cols-2 gap-2 mt-2 overflow-y-auto max-h-48">
              {commonFonts.map((font) => (
                <button
                  key={font}
                  type="button"
                  onClick={() => setFontInput(font)}
                  className="px-2 py-1 text-xs text-left text-gray-700 border border-gray-200 rounded hover:bg-gray-50"
                  style={{ fontFamily: font }}
                >
                  {font}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 mt-4 rounded-md bg-gray-50">
            <p className="text-xs text-gray-500">
              <strong>Tip:</strong> For best results, choose web-safe fonts or
              popular Google Fonts that are likely to be available on most
              devices. You can verify font availability at{" "}
              <a
                href="https://fonts.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Google Fonts
              </a>
              .
            </p>
          </div>
        </div>
      </InputModal>
    </div>
  );
};

export default FontSelectionModal;
