// client/src/pages/Admin/components/ColorPaletteModal.jsx
import { useState, useRef } from "react";
import { X, PlusCircle, Palette } from "lucide-react";
import InputModal from "./InputModal";

/**
 * Component for managing project color palette with a modal for adding colors
 *
 * @param {Object} project - The project object
 * @param {Function} handleNestedChange - Function to update nested project properties
 */
const ColorPaletteModal = ({ project, handleNestedChange }) => {
  const [showColorModal, setShowColorModal] = useState(false);
  const [colorInput, setColorInput] = useState("");
  const [colorError, setColorError] = useState("");
  const initialFocusRef = useRef(null);

  /**
   * Validates if a string is a proper hex color code
   */
  const validateHexColor = (color) => {
    const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return regex.test(color);
  };

  /**
   * Handle form submission for adding a new color
   */
  const handleColorSubmit = (e) => {
    e.preventDefault();

    if (!colorInput) {
      setColorError("Please enter a color hex code");
      return;
    }

    // Validate hex color format
    if (!validateHexColor(colorInput)) {
      setColorError("Please enter a valid hex color (e.g. #FF5733)");
      return;
    }

    // Add color to palette
    handleNestedChange("designChoices", "colorPalette", [
      ...(project.designChoices.colorPalette || []),
      colorInput,
    ]);

    // Reset and close modal
    setColorInput("");
    setColorError("");
    setShowColorModal(false);
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Color Palette
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {project.designChoices.colorPalette &&
          project.designChoices.colorPalette.map((color, index) => (
            <div
              key={index}
              className="flex items-center p-1 bg-white border border-gray-300 rounded-md"
            >
              <div
                className="w-6 h-6 mr-2 rounded-md"
                style={{ backgroundColor: color }}
              ></div>
              <span className="text-xs">{color}</span>
              <button
                type="button"
                onClick={() => {
                  const updatedColors = [...project.designChoices.colorPalette];
                  updatedColors.splice(index, 1);
                  handleNestedChange(
                    "designChoices",
                    "colorPalette",
                    updatedColors
                  );
                }}
                className="p-1 ml-1 text-red-600 rounded-md hover:bg-red-50"
              >
                <X size={14} />
              </button>
            </div>
          ))}

        <button
          type="button"
          onClick={() => setShowColorModal(true)}
          className="flex items-center justify-center w-8 h-8 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <PlusCircle size={16} />
        </button>
      </div>

      {/* Color Input Modal */}
      <InputModal
        isOpen={showColorModal}
        onClose={() => {
          setShowColorModal(false);
          setColorError("");
          setColorInput("");
        }}
        onSubmit={handleColorSubmit}
        title="Add Color to Palette"
        submitText="Add Color"
        icon={<Palette size={20} className="text-accent" />}
      >
        <div>
          <label
            htmlFor="colorHex"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Color Hex Code
          </label>
          <div className="flex space-x-2">
            <input
              id="colorHex"
              ref={initialFocusRef}
              type="text"
              placeholder="#FF5733"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            {colorInput && validateHexColor(colorInput) && (
              <div
                className="w-10 h-10 border border-gray-300 rounded-md"
                style={{ backgroundColor: colorInput }}
              ></div>
            )}
          </div>
          {colorError && (
            <p className="mt-1 text-sm text-red-600">{colorError}</p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            Enter a valid hex color code (e.g. #FF5733)
          </p>

          {/* Common color suggestions */}
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700">Common Colors:</p>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[
                { name: "Red", value: "#FF0000" },
                { name: "Blue", value: "#0000FF" },
                { name: "Green", value: "#00FF00" },
                { name: "Yellow", value: "#FFFF00" },
                { name: "Purple", value: "#800080" },
                { name: "Orange", value: "#FFA500" },
                { name: "Pink", value: "#FFC0CB" },
                { name: "Teal", value: "#008080" },
              ].map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setColorInput(color.value)}
                  className="flex flex-col items-center p-1 text-xs border border-gray-200 rounded hover:bg-gray-50"
                >
                  <div
                    className="w-6 h-6 mb-1 border border-gray-300 rounded"
                    style={{ backgroundColor: color.value }}
                  ></div>
                  {color.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </InputModal>
    </div>
  );
};

export default ColorPaletteModal;
