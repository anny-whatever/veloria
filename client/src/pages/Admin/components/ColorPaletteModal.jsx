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
 */
const ColorPaletteModal = ({ project, handleNestedChange }) => {
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

  // Make sure colorPalette structure exists with categories
  useEffect(() => {
    if (!project.designChoices.colorPalette) {
      handleNestedChange("designChoices", "colorPalette", []);
    }

    // Migrate old format if needed (array of strings to array of objects)
    if (
      Array.isArray(project.designChoices.colorPalette) &&
      project.designChoices.colorPalette.length > 0 &&
      typeof project.designChoices.colorPalette[0] === "string"
    ) {
      const migratedPalette = project.designChoices.colorPalette.map(
        (color) => ({
          color,
          category: "primary",
          name: "",
        })
      );
      handleNestedChange("designChoices", "colorPalette", migratedPalette);
    }
  }, [project.designChoices.colorPalette, handleNestedChange]);

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
      setColorError("Please select a color");
      return;
    }

    // Validate hex color format
    if (!validateHexColor(colorInput)) {
      setColorError("Please enter a valid hex color (e.g. #FF5733)");
      return;
    }

    // Create new color object
    const newColor = {
      color: colorInput,
      category: colorCategory,
      name: colorName || generateColorName(colorInput),
    };

    // Add color to palette
    handleNestedChange("designChoices", "colorPalette", [
      ...(project.designChoices.colorPalette || []),
      newColor,
    ]);

    // Reset and close modal
    setColorInput("#000000");
    setColorName("");
    setColorCategory("primary");
    setColorError("");
    setShowColorModal(false);
  };

  /**
   * Open edit modal for a color
   */
  const handleEditColor = (color, index) => {
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
    e.preventDefault();

    if (!editingColor.color) {
      return;
    }

    // Validate hex color format
    if (!validateHexColor(editingColor.color)) {
      return;
    }

    // Update the color at the specific index
    const updatedColors = [...project.designChoices.colorPalette];
    updatedColors[editingIndex] = {
      ...editingColor,
      name: editingColor.name || generateColorName(editingColor.color),
    };

    handleNestedChange("designChoices", "colorPalette", updatedColors);
    setShowEditModal(false);
  };

  /**
   * Delete a color from the palette
   */
  const handleDeleteColor = (index) => {
    const updatedColors = [...project.designChoices.colorPalette];
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

    if (project.designChoices.colorPalette) {
      project.designChoices.colorPalette.forEach((colorObj, index) => {
        if (typeof colorObj === "string") {
          // Handle old format (just strings)
          grouped.primary.push({ color: colorObj, index });
        } else if (colorObj.category && grouped[colorObj.category]) {
          grouped[colorObj.category].push({ ...colorObj, index });
        } else {
          grouped.other.push({ ...colorObj, index });
        }
      });
    }

    return grouped;
  };

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

  // Add preset color to palette with its category
  const addPresetColor = (preset) => {
    handleNestedChange("designChoices", "colorPalette", [
      ...(project.designChoices.colorPalette || []),
      {
        color: preset.color,
        category: preset.category || colorCategory,
        name: preset.name,
      },
    ]);
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
    const currentPalette = [...(project.designChoices.colorPalette || [])];
    const newPalette = [...currentPalette, ...scheme];
    handleNestedChange("designChoices", "colorPalette", newPalette);
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Color Palette
      </label>

      {/* Display colors by category */}
      <div className="mb-4 space-y-4">
        {Object.entries(groupedColors()).map(([category, colors]) => {
          if (colors.length === 0) return null;

          return (
            <div key={category} className="space-y-2">
              <h4 className="text-sm font-medium text-gray-500 capitalize">
                {category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {colors.map(({ color, name, index }) => (
                  <div
                    key={index}
                    className="flex items-center p-1 px-2 bg-white border border-gray-300 rounded-md group hover:border-accent"
                  >
                    <div
                      className="w-6 h-6 mr-2 rounded-md"
                      style={{
                        backgroundColor:
                          typeof color === "string"
                            ? color
                            : color.color || color,
                      }}
                    ></div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium">
                        {typeof color === "string" ? color : name || color}
                      </span>
                      {name && (
                        <span className="text-xs text-gray-400">
                          {typeof color === "string" ? "" : color}
                        </span>
                      )}
                    </div>
                    <div className="flex ml-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleEditColor(
                            typeof color === "string"
                              ? { color, name: "", category }
                              : { color: color.color || color, name, category },
                            index
                          )
                        }
                        className="p-1 mr-1 text-blue-600 transition-opacity rounded-md opacity-0 group-hover:opacity-100 hover:bg-blue-50"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteColor(index)}
                        className="p-1 text-red-600 transition-opacity rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-50"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Color Button */}
      <button
        type="button"
        onClick={() => setShowColorModal(true)}
        className="flex items-center justify-center px-4 py-2 text-sm bg-white border rounded-md text-accent border-accent hover:bg-accent/10"
      >
        <PlusCircle size={16} className="mr-2" />
        Add Color
      </button>

      {/* Color Input Modal */}
      <InputModal
        isOpen={showColorModal}
        onClose={() => {
          setColorError("");
          setColorInput("#000000");
          setColorName("");
          setActiveTab("picker");
        }}
        onSubmit={handleColorSubmit}
        title="Add Color to Palette"
        submitText="Add Color"
        icon={<Palette size={20} className="text-accent" />}
      >
        <div className="space-y-4">
          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              onClick={() => setActiveTab("picker")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "picker"
                  ? "border-b-2 border-accent text-accent"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Color Picker
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("presets")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "presets"
                  ? "border-b-2 border-accent text-accent"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Presets
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("schemes")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "schemes"
                  ? "border-b-2 border-accent text-accent"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Schemes
            </button>
          </div>

          {/* Color Picker Tab */}
          {activeTab === "picker" && (
            <>
              <div className="flex flex-col items-center">
                <HexColorPicker
                  color={colorInput}
                  onChange={setColorInput}
                  className="mb-4"
                />

                <div className="flex items-center w-full space-x-2">
                  <div
                    className="w-12 h-12 border border-gray-300 rounded-md"
                    style={{ backgroundColor: colorInput }}
                  />
                  <div className="flex-1">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Hex Color
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                        #
                      </span>
                      <HexColorInput
                        color={colorInput}
                        onChange={setColorInput}
                        className="flex-1 block w-full border-gray-300 rounded-none rounded-r-md focus:ring-accent focus:border-accent sm:text-sm"
                        prefixed={false}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Color Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={colorName}
                    onChange={(e) => setColorName(e.target.value)}
                    placeholder={generateColorName(colorInput)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    value={colorCategory}
                    onChange={(e) => setColorCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="accent">Accent</option>
                    <option value="neutral">Neutral</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Presets Tab */}
          {activeTab === "presets" && (
            <div className="space-y-4">
              {Object.entries(colorPresets).map(([category, colors]) => (
                <div key={category} className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700 capitalize">
                    {category}
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {colors.map((preset) => (
                      <button
                        key={preset.color}
                        type="button"
                        onClick={() => {
                          // Option 1: Select the color for editing in the picker
                          setColorInput(preset.color);
                          setColorName(preset.name);
                          setColorCategory(preset.category || "primary");
                          setActiveTab("picker");

                          // Option 2: Add directly to palette (comment this out if using option 1)
                          // addPresetColor(preset);
                        }}
                        className="flex flex-col items-center p-2 border border-gray-200 rounded-md hover:border-accent"
                      >
                        <div
                          className="w-8 h-8 mb-1 rounded-full"
                          style={{ backgroundColor: preset.color }}
                        ></div>
                        <span className="text-xs">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Schemes Tab */}
          {activeTab === "schemes" && (
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Base Color
                </label>
                <div className="flex space-x-2">
                  <div
                    className="w-10 h-10 border border-gray-300 rounded-md"
                    style={{ backgroundColor: colorInput }}
                  ></div>
                  <HexColorInput
                    color={colorInput}
                    onChange={setColorInput}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                    prefixed={true}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {["complementary", "analogous", "triadic", "monochromatic"].map(
                  (schemeType) => {
                    const scheme = generateColorScheme(colorInput, schemeType);

                    return (
                      <div
                        key={schemeType}
                        className="p-3 border border-gray-200 rounded-md"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium text-gray-700 capitalize">
                            {schemeType}
                          </h3>
                          <button
                            type="button"
                            onClick={() => addColorScheme(scheme)}
                            className="flex items-center text-xs text-accent hover:underline"
                          >
                            <PlusCircle size={12} className="mr-1" />
                            Add All
                          </button>
                        </div>
                        <div className="flex space-x-2">
                          {scheme.map((color, index) => (
                            <div
                              key={index}
                              className="flex flex-col items-center flex-1"
                            >
                              <div
                                className="w-full h-8 mb-1 rounded-md"
                                style={{ backgroundColor: color.color }}
                              ></div>
                              <span className="text-xs text-gray-600">
                                {color.name}
                              </span>
                              <span className="text-xs text-gray-400">
                                {color.color}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {colorError && (
            <p className="mt-1 text-sm text-red-600">{colorError}</p>
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
        icon={<Edit size={20} className="text-accent" />}
      >
        {editingColor && (
          <div className="space-y-4">
            <div className="flex flex-col items-center mb-4">
              <HexColorPicker
                color={editingColor.color}
                onChange={(color) =>
                  setEditingColor({ ...editingColor, color })
                }
                className="mb-4"
              />

              <div className="flex items-center w-full space-x-2">
                <div
                  className="w-12 h-12 border border-gray-300 rounded-md"
                  style={{ backgroundColor: editingColor.color }}
                />
                <div className="flex-1">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Hex Color
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                      #
                    </span>
                    <HexColorInput
                      color={editingColor.color}
                      onChange={(color) =>
                        setEditingColor({ ...editingColor, color })
                      }
                      className="flex-1 block w-full border-gray-300 rounded-none rounded-r-md focus:ring-accent focus:border-accent sm:text-sm"
                      prefixed={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Color Name (Optional)
                </label>
                <input
                  type="text"
                  value={editingColor.name}
                  onChange={(e) =>
                    setEditingColor({ ...editingColor, name: e.target.value })
                  }
                  placeholder={generateColorName(editingColor.color)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={editingColor.category}
                  onChange={(e) =>
                    setEditingColor({
                      ...editingColor,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="accent">Accent</option>
                  <option value="neutral">Neutral</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </InputModal>
    </div>
  );
};

export default ColorPaletteModal;
