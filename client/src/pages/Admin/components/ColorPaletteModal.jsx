// client/src/pages/Admin/components/ColorPaletteModal.jsx
import { useState, useRef, useEffect } from "react";
import {
  X,
  PlusCircle,
  Palette,
  Check,
  Edit,
  Trash2,
  Save,
} from "lucide-react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import InputModal from "./InputModal";

/**
 * Enhanced component for managing project color palette with a modal for adding colors
 * Includes advanced color picker, categorization, and editing capabilities
 *
 * @param {Object} project - The project object
 * @param {Function} handleNestedChange - Function to update nested project properties
 * @param {string} buttonClassName - Optional class name for the button
 * @param {number} iconSize - Optional icon size for the button
 */
const ColorPaletteModal = ({
  project,
  handleNestedChange,
  buttonClassName = "inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-md bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent",
  iconSize = 16,
}) => {
  // Common color presets organized by category
  const colorPresets = {
    vibrant: [
      { color: "#FF3B30", name: "Red", category: "primary" },
      { color: "#FF9500", name: "Orange", category: "secondary" },
      { color: "#FFCC00", name: "Yellow", category: "accent" },
      { color: "#34C759", name: "Green", category: "primary" },
      { color: "#007AFF", name: "Blue", category: "secondary" },
      { color: "#5856D6", name: "Purple", category: "accent" },
    ],
    pastel: [
      { color: "#FFB3B3", name: "Pastel Red", category: "primary" },
      { color: "#FFDAB3", name: "Pastel Orange", category: "secondary" },
      { color: "#FFFFB3", name: "Pastel Yellow", category: "accent" },
      { color: "#B3FFB3", name: "Pastel Green", category: "primary" },
      { color: "#B3D9FF", name: "Pastel Blue", category: "secondary" },
      { color: "#D9B3FF", name: "Pastel Purple", category: "accent" },
    ],
    neutral: [
      { color: "#F2F2F7", name: "Light Gray", category: "neutral" },
      { color: "#E5E5EA", name: "Light Gray 2", category: "neutral" },
      { color: "#C7C7CC", name: "Mid Gray", category: "neutral" },
      { color: "#8E8E93", name: "Gray", category: "neutral" },
      { color: "#636366", name: "Dark Gray", category: "neutral" },
      { color: "#1C1C1E", name: "Almost Black", category: "neutral" },
    ],
    monochrome: [
      { color: "#000000", name: "Black", category: "neutral" },
      { color: "#333333", name: "Dark Gray", category: "neutral" },
      { color: "#666666", name: "Medium Gray", category: "neutral" },
      { color: "#999999", name: "Light Gray", category: "neutral" },
      { color: "#CCCCCC", name: "Very Light Gray", category: "neutral" },
      { color: "#FFFFFF", name: "White", category: "neutral" },
    ],
  };

  const [showColorModal, setShowColorModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [colorInput, setColorInput] = useState("#000000");
  const [colorCategory, setColorCategory] = useState("primary");
  const [colorName, setColorName] = useState("");
  const [colorError, setColorError] = useState("");
  const [activeTab, setActiveTab] = useState("picker");
  const [editingColor, setEditingColor] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const initialFocusRef = useRef(null);
  const [selectedPalette, setSelectedPalette] = useState(colorPresets.neutral);

  // Update state only when project data is available and different
  useEffect(() => {
    console.log(
      "Project colorPalette updated:",
      project?.designChoices?.colorPalette
    );
    if (project?.designChoices?.colorPalette) {
      setSelectedPalette(project.designChoices.colorPalette);
    }
  }, [project?.designChoices?.colorPalette]); // Depend specifically on the palette data

  // Make sure colorPalette structure exists with categories
  useEffect(() => {
    if (!project?.designChoices?.colorPalette) {
      console.log("Initializing colorPalette as empty array");
      handleNestedChange("designChoices", "colorPalette", []);
    }

    // Migrate old format if needed (array of strings to array of objects)
    if (
      Array.isArray(project?.designChoices?.colorPalette) &&
      project?.designChoices?.colorPalette.length > 0 &&
      typeof project?.designChoices?.colorPalette[0] === "string"
    ) {
      console.log("Migrating colorPalette from old format");
      const migratedPalette = project?.designChoices?.colorPalette.map(
        (color) => ({
          color,
          category: "primary",
          name: "",
        })
      );
      handleNestedChange("designChoices", "colorPalette", migratedPalette);
    }
  }, [project?.designChoices?.colorPalette, handleNestedChange]);

  /**
   * Validates if a string is a proper hex color code
   */
  const validateHexColor = (color) => {
    const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return regex.test(color);
  };

  // Direct function to add a color to the palette - simplest implementation
  const addColorToPalette = (newColorObj) => {
    try {
      // Ensure we have the color object
      if (!newColorObj || !newColorObj.color) {
        console.error("Invalid color object:", newColorObj);
        return;
      }

      console.log("Adding color directly to palette:", newColorObj);

      // Get current palette or create new one
      const currentPalette = Array.isArray(project?.designChoices?.colorPalette)
        ? [...project.designChoices.colorPalette]
        : [];

      // Add the new color
      const updatedPalette = [...currentPalette, newColorObj];

      console.log("Palette BEFORE update:", currentPalette);
      console.log("Palette AFTER update:", updatedPalette);

      // Update the project with new palette
      handleNestedChange("designChoices", "colorPalette", updatedPalette);

      return updatedPalette;
    } catch (err) {
      console.error("Error adding color to palette:", err);
      return null;
    }
  };

  /**
   * Handle color selection form submission
   * Adds a new color to the palette
   */
  const handleColorSubmit = (e) => {
    // Always prevent form submission!
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    console.log("handleColorSubmit called with colorInput:", colorInput);

    if (!colorInput) {
      console.error("No color input provided");
      setColorError("Please select a color");
      return;
    }

    // Validate hex color format
    if (!validateHexColor(colorInput)) {
      console.error("Invalid hex color format:", colorInput);
      setColorError("Please enter a valid hex color (e.g. #FF5733)");
      return;
    }

    try {
      // Create new color object
      const newColor = {
        color: colorInput,
        category: colorCategory,
        name: colorName || generateColorName(colorInput),
      };

      // Add color directly to palette
      const success = addColorToPalette(newColor);

      if (success) {
        // Reset and close modal
        setColorInput("#000000");
        setColorName("");
        setColorCategory("primary");
        setColorError("");
        setShowColorModal(false);
      }
    } catch (err) {
      console.error("Error in handleColorSubmit:", err);
      setColorError("An error occurred. Please try again.");
    }

    return false;
  };

  /**
   * Open edit modal for a color
   */
  const handleEditColor = (color, index) => {
    console.log("Editing color:", color, "at index:", index);
    setEditingColor({
      color: color.color,
      category: color.category,
      name: color.name,
    });
    setEditingIndex(index);
    setShowEditModal(true);
  };

  /**
   * Save edited color
   */
  const handleSaveEdit = (e) => {
    // Prevent form submission and event propagation
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    console.log("handleSaveEdit called with editingColor:", editingColor);

    if (!editingColor.color) {
      console.error("No editing color provided");
      return;
    }

    // Validate hex color format
    if (!validateHexColor(editingColor.color)) {
      console.error("Invalid hex color format for edit:", editingColor.color);
      return;
    }

    // Update the color at the specific index
    const updatedColors = [...project?.designChoices?.colorPalette];
    updatedColors[editingIndex] = {
      ...editingColor,
      name: editingColor.name || generateColorName(editingColor.color),
    };

    console.log("Saving updated colors:", updatedColors);
    handleNestedChange("designChoices", "colorPalette", updatedColors);
    setShowEditModal(false);
  };

  /**
   * Delete a color from the palette
   */
  const handleDeleteColor = (index) => {
    console.log("Deleting color at index:", index);
    const updatedColors = [...project?.designChoices?.colorPalette];
    updatedColors.splice(index, 1);
    handleNestedChange("designChoices", "colorPalette", updatedColors);
  };

  /**
   * Generate a descriptive name for a color based on its hex value
   */
  const generateColorName = (hex) => {
    // Simple algorithm to determine if a color is dark or light
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // Calculate brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Calculate hue
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          h = 0;
      }
      h /= 6;
    }

    h = Math.round(h * 360);

    // Determine the color name based on hue
    let colorName = "";
    if (brightness < 60) colorName = "Dark ";
    else if (brightness > 200) colorName = "Light ";

    if (h >= 345 || h < 15) colorName += "Red";
    else if (h >= 15 && h < 45) colorName += "Orange";
    else if (h >= 45 && h < 75) colorName += "Yellow";
    else if (h >= 75 && h < 155) colorName += "Green";
    else if (h >= 155 && h < 195) colorName += "Cyan";
    else if (h >= 195 && h < 255) colorName += "Blue";
    else if (h >= 255 && h < 285) colorName += "Indigo";
    else if (h >= 285 && h < 345) colorName += "Magenta";

    return colorName;
  };

  // Group colors by category
  const groupedColors = () => {
    const grouped = {
      primary: [],
      secondary: [],
      accent: [],
      neutral: [],
      other: [],
    };

    // Use optional chaining and default to empty array before accessing colorPalette
    const colorPalette = project?.designChoices?.colorPalette || [];

    if (colorPalette.length > 0) {
      colorPalette.forEach((colorObj, index) => {
        if (typeof colorObj === "string") {
          // Handle old format (just strings)
          grouped.primary.push({ color: colorObj, index });
        } else if (colorObj?.category && grouped[colorObj.category]) {
          grouped[colorObj.category].push({ ...colorObj, index });
        } else {
          grouped.other.push({ ...colorObj, index });
        }
      });
    }

    return grouped;
  };

  // Update the preset color adding function to use the direct method
  const handlePresetColorClick = (preset, e) => {
    // Always prevent form submission!
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    try {
      // Create the color object from preset
      const newColor = {
        color: preset.color,
        category: preset.category || "primary",
        name: preset.name,
      };

      console.log("Adding preset color:", newColor);

      // Add directly to palette
      addColorToPalette(newColor);
    } catch (err) {
      console.error("Error adding preset color:", err);
      alert("Failed to add color. Please try again.");
    }
  };

  // Color schemes (complementary, analogous, etc.)
  const generateColorScheme = (baseColor, schemeType) => {
    // Convert hex to HSL
    const r = parseInt(baseColor.slice(1, 3), 16) / 255;
    const g = parseInt(baseColor.slice(3, 5), 16) / 255;
    const b = parseInt(baseColor.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          h = 0;
      }
      h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    // Convert HSL back to hex
    const hslToHex = (h, s, l) => {
      h /= 360;
      s /= 100;
      l /= 100;
      let r, g, b;

      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }

      const toHex = (x) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      };

      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    // Generate schemes based on type
    const schemes = {
      complementary: [
        { color: baseColor, name: "Base", category: "primary" },
        {
          color: hslToHex((h + 180) % 360, s, l),
          name: "Complementary",
          category: "secondary",
        },
      ],
      analogous: [
        {
          color: hslToHex((h - 30 + 360) % 360, s, l),
          name: "Analogous 1",
          category: "primary",
        },
        { color: baseColor, name: "Base", category: "primary" },
        {
          color: hslToHex((h + 30) % 360, s, l),
          name: "Analogous 2",
          category: "secondary",
        },
      ],
      triadic: [
        { color: baseColor, name: "Base", category: "primary" },
        {
          color: hslToHex((h + 120) % 360, s, l),
          name: "Triadic 1",
          category: "secondary",
        },
        {
          color: hslToHex((h + 240) % 360, s, l),
          name: "Triadic 2",
          category: "accent",
        },
      ],
      monochromatic: [
        {
          color: hslToHex(h, s, Math.max(l - 30, 0)),
          name: "Darker",
          category: "primary",
        },
        { color: baseColor, name: "Base", category: "primary" },
        {
          color: hslToHex(h, s, Math.min(l + 30, 100)),
          name: "Lighter",
          category: "secondary",
        },
      ],
    };

    return schemes[schemeType] || [];
  };

  // Add an entire color scheme to the palette
  const addColorScheme = (scheme) => {
    const currentPalette = [...(project?.designChoices?.colorPalette || [])];
    const newPalette = [...currentPalette, ...scheme];
    handleNestedChange("designChoices", "colorPalette", newPalette);
  };

  // Safe handler for opening the color modal
  const openColorModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowColorModal(true);
  };

  // Safe handler for closing the color modal
  const closeColorModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowColorModal(false);
    setColorInput("#000000");
    setColorName("");
    setColorCategory("primary");
    setColorError("");
    setActiveTab("picker");
  };

  // Safe handler for changing tabs
  const handleTabChange = (tab, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveTab(tab);
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={openColorModal}
        className={buttonClassName}
      >
        <Palette size={iconSize} className="mr-1.5" /> Manage Colors
      </button>

      {/* Color Picker Modal */}
      <InputModal
        isOpen={showColorModal}
        onClose={closeColorModal}
        onSubmit={handleColorSubmit}
        title="Add Color to Palette"
        submitText="Add Color"
        initialFocusRef={initialFocusRef}
        icon={
          <Palette size={20} className="text-purple-600 dark:text-purple-400" />
        }
      >
        <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
          {/* Selected Colors Preview */}
          {project?.designChoices?.colorPalette &&
            project.designChoices.colorPalette.length > 0 && (
              <div className="mb-4">
                <h5 className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  Selected Colors
                </h5>
                <div className="flex flex-wrap gap-2">
                  {project.designChoices.colorPalette.map((colorObj, index) => (
                    <div
                      key={`selected-${colorObj.color}-${index}`}
                      className="flex items-center px-2 py-1 space-x-2 border border-gray-200 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 group"
                    >
                      <div
                        className="w-4 h-4 border border-gray-300 rounded-full dark:border-gray-500"
                        style={{ backgroundColor: colorObj.color }}
                      ></div>
                      <span className="text-xs text-gray-700 dark:text-gray-300">
                        {colorObj.name || colorObj.color}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteColor(index);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                        aria-label="Remove color"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Tabs for Picker / Presets */}
          <div className="flex p-1 mb-3 space-x-1 bg-gray-100 rounded-lg dark:bg-gray-700">
            <button
              type="button"
              onClick={(e) => handleTabChange("picker", e)}
              className={`flex-1 px-3 py-1 text-sm rounded-md ${
                activeTab === "picker"
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              }`}
            >
              Color Picker
            </button>
            <button
              type="button"
              onClick={(e) => handleTabChange("presets", e)}
              className={`flex-1 px-3 py-1 text-sm rounded-md ${
                activeTab === "presets"
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              }`}
            >
              Presets
            </button>
          </div>

          {/* Color Picker Tab */}
          {activeTab === "picker" && (
            <div className="space-y-4">
              {/* Color Preview */}
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 border border-gray-300 rounded-md dark:border-gray-500"
                  style={{ backgroundColor: editingColor?.color || colorInput }}
                ></div>
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                    Hex Value
                  </label>
                  <HexColorInput
                    color={editingColor?.color || colorInput}
                    onChange={(newColor) =>
                      showEditModal
                        ? setEditingColor({ ...editingColor, color: newColor })
                        : setColorInput(newColor)
                    }
                    className="w-24 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    prefixed
                    alpha={false}
                  />
                </div>
              </div>

              {/* Color Picker Component - Dark Mode Compatible */}
              <div className="p-2 bg-white rounded-md dark:bg-gray-700">
                <HexColorPicker
                  color={editingColor?.color || colorInput}
                  onChange={(newColor) =>
                    showEditModal
                      ? setEditingColor({ ...editingColor, color: newColor })
                      : setColorInput(newColor)
                  }
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          )}

          {/* Presets Tab */}
          {activeTab === "presets" && (
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {Object.entries(colorPresets).map(([presetCategory, presets]) => (
                <div key={presetCategory}>
                  <h5 className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                    {presetCategory}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {presets.map((preset, index) => (
                      <button
                        type="button"
                        key={`${preset.color}-${index}`}
                        onClick={(e) => handlePresetColorClick(preset, e)}
                        className="flex items-center p-2 space-x-2 border border-gray-200 rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
                      >
                        <div
                          className="w-5 h-5 border border-gray-300 rounded dark:border-gray-500"
                          style={{ backgroundColor: preset.color }}
                        ></div>
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {preset.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Color Name (Optional) */}
          <div onClick={(e) => e.stopPropagation()}>
            <label
              htmlFor="colorName"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Color Name (Optional)
            </label>
            <input
              id="colorName"
              type="text"
              value={editingColor?.name || colorName}
              onChange={(e) => {
                e.stopPropagation();
                showEditModal
                  ? setEditingColor({ ...editingColor, name: e.target.value })
                  : setColorName(e.target.value);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="e.g., Primary Blue, Accent Orange"
            />
          </div>

          {/* Color Category */}
          <div onClick={(e) => e.stopPropagation()}>
            <label
              htmlFor="colorCategory"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Category
            </label>
            <select
              id="colorCategory"
              value={editingColor?.category || colorCategory}
              onChange={(e) => {
                e.stopPropagation();
                showEditModal
                  ? setEditingColor({
                      ...editingColor,
                      category: e.target.value,
                    })
                  : setColorCategory(e.target.value);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="accent">Accent</option>
              <option value="neutral">Neutral</option>
              <option value="background">Background</option>
              <option value="text">Text</option>
            </select>
          </div>

          {colorError && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {colorError}
            </p>
          )}
        </div>
      </InputModal>

      {/* Edit Color Modal */}
      <InputModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleSaveEdit}
        title="Edit Color"
        submitText="Save Changes"
        icon={<Edit size={20} className="text-amber-600 dark:text-amber-400" />}
      >
        <div className="space-y-4">
          {/* Color Preview */}
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 border border-gray-300 rounded-md dark:border-gray-500"
              style={{ backgroundColor: editingColor?.color || colorInput }}
            ></div>
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                Hex Value
              </label>
              <HexColorInput
                color={editingColor?.color || colorInput}
                onChange={(newColor) =>
                  setEditingColor({ ...editingColor, color: newColor })
                }
                className="w-24 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                prefixed
                alpha={false}
              />
            </div>
          </div>

          {/* Color Picker Component - Dark Mode Compatible */}
          <div className="p-2 bg-white rounded-md dark:bg-gray-700">
            <HexColorPicker
              color={editingColor?.color || colorInput}
              onChange={(newColor) =>
                setEditingColor({ ...editingColor, color: newColor })
              }
              style={{ width: "100%" }}
            />
          </div>

          {/* Color Name (Optional) */}
          <div onClick={(e) => e.stopPropagation()}>
            <label
              htmlFor="colorName"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Color Name (Optional)
            </label>
            <input
              id="colorName"
              type="text"
              value={editingColor?.name || colorName}
              onChange={(e) => {
                e.stopPropagation();
                showEditModal
                  ? setEditingColor({ ...editingColor, name: e.target.value })
                  : setColorName(e.target.value);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="e.g., Primary Blue, Accent Orange"
            />
          </div>

          {/* Color Category */}
          <div onClick={(e) => e.stopPropagation()}>
            <label
              htmlFor="colorCategory"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Category
            </label>
            <select
              id="colorCategory"
              value={editingColor?.category || colorCategory}
              onChange={(e) => {
                e.stopPropagation();
                showEditModal
                  ? setEditingColor({
                      ...editingColor,
                      category: e.target.value,
                    })
                  : setColorCategory(e.target.value);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="accent">Accent</option>
              <option value="neutral">Neutral</option>
              <option value="background">Background</option>
              <option value="text">Text</option>
            </select>
          </div>
        </div>
      </InputModal>
    </div>
  );
};

export default ColorPaletteModal;
