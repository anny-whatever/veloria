// client/src/pages/Admin/components/FontSelectionModal.jsx
import { useState, useRef, useEffect } from "react";
import {
  X,
  PlusCircle,
  FileType,
  Search,
  Check,
  RefreshCw,
  Upload,
  Link,
  AlertTriangle,
} from "lucide-react";
import InputModal from "./InputModal";

/**
 * Enhanced component for managing project fonts with a modal for adding fonts
 * Includes Google Fonts integration, font previews, and direct font uploads
 *
 * @param {Object} project - The project object
 * @param {Function} handleNestedChange - Function to update nested project properties
 */
const FontSelectionModal = ({ project, handleNestedChange }) => {
  const [showFontModal, setShowFontModal] = useState(false);
  const [fontInput, setFontInput] = useState("");
  const [fontCategory, setFontCategory] = useState("heading");
  const [fontError, setFontError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [googleFonts, setGoogleFonts] = useState([]);
  const [filteredFonts, setFilteredFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("popular");
  const [activeTab, setActiveTab] = useState("search");

  // New states for enhanced font handling
  const [selectedFontFile, setSelectedFontFile] = useState(null);
  const [showCustomOptions, setShowCustomOptions] = useState(false);
  const [fontUrl, setFontUrl] = useState("");
  const [fontFamily, setFontFamily] = useState("");

  const initialFocusRef = useRef(null);
  const fileInputRef = useRef(null);

  // Google Fonts API Key - Consider moving this to environment variables
  const GOOGLE_FONTS_API_KEY = import.meta.env.VITE_FONT_API_KEY;

  // Make sure fonts structure exists with categories
  useEffect(() => {
    if (!project.designChoices.fonts) {
      handleNestedChange("designChoices", "fonts", []);
    }

    // Migrate old format if needed (array of strings to array of objects)
    if (
      Array.isArray(project.designChoices.fonts) &&
      project.designChoices.fonts.length > 0 &&
      typeof project.designChoices.fonts[0] === "string"
    ) {
      const migratedFonts = project.designChoices.fonts.map((font) => ({
        family: font,
        category: "heading",
        variants: ["regular"],
      }));
      handleNestedChange("designChoices", "fonts", migratedFonts);
    }
  }, [project.designChoices.fonts, handleNestedChange]);

  // Fetch Google Fonts
  const fetchGoogleFonts = async () => {
    try {
      setLoading(true);

      // First try to use Google Fonts API
      try {
        const response = await fetch(
          `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}&sort=popularity`
        );

        if (response.ok) {
          const data = await response.json();
          setGoogleFonts(data.items || []);
          setFilteredFonts(data.items || []);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.warn("Failed to fetch from Google Fonts API:", error);
      }

      // Fallback to a list of common fonts if API fails
      setGoogleFonts(commonFonts);
      setFilteredFonts(commonFonts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching fonts:", error);
      setGoogleFonts(commonFonts);
      setFilteredFonts(commonFonts);
      setLoading(false);
    }
  };

  // Initial fonts load
  useEffect(() => {
    fetchGoogleFonts();

    // Load Google Fonts CSS for previews
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Open+Sans:wght@400;700&family=Lato:wght@400;700&family=Montserrat:wght@400;700&family=Poppins:wght@400;700&family=Raleway:wght@400;700&family=Source+Sans+Pro:wght@400;700&family=Oswald:wght@400;700&display=swap";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Filter fonts when search term or category changes
  useEffect(() => {
    if (!googleFonts.length) return;

    let results = [...googleFonts];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter((font) =>
        font.family.toLowerCase().includes(term)
      );
    }

    // Apply category filter
    if (activeCategory !== "all") {
      if (activeCategory === "popular") {
        // Popular is already sorted by popularity, so just take the top 20
        results = results.slice(0, 20);
      } else if (
        activeCategory === "serif" ||
        activeCategory === "sans-serif" ||
        activeCategory === "display" ||
        activeCategory === "monospace" ||
        activeCategory === "handwriting"
      ) {
        results = results.filter((font) => font.category === activeCategory);
      }
    }

    setFilteredFonts(results);
  }, [googleFonts, searchTerm, activeCategory]);

  /**
   * Handle font selection
   */
  const handleFontSelect = (font) => {
    setSelectedFont(font);
    setFontInput(font.family);

    // Dynamically load the selected font for preview
    if (font.family) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${font.family.replace(
        / /g,
        "+"
      )}:wght@400;700&display=swap`;
      document.head.appendChild(link);
    }
  };

  /**
   * Handle file input change for font upload
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if it's a valid font file
      const validTypes = [
        "font/ttf",
        "font/otf",
        "font/woff",
        "font/woff2",
        "application/x-font-ttf",
        "application/x-font-otf",
        "application/font-woff",
        "application/font-woff2",
        "application/vnd.ms-fontobject", // .eot files
      ];

      // Allow any font files even if MIME type is not recognized
      if (
        !validTypes.includes(file.type) &&
        !file.name.match(/\.(ttf|otf|woff|woff2|eot)$/i)
      ) {
        setFontError(
          "Please upload a valid font file (.ttf, .otf, .woff, .woff2, .eot)"
        );
        setSelectedFontFile(null);
        return;
      }

      setSelectedFontFile(file);
      setFontError("");

      // Try to extract a sensible font family name from the filename
      const fileName = file.name.replace(/\.(ttf|otf|woff|woff2|eot)$/i, "");
      const formattedName = fileName
        .replace(/[-_]/g, " ")
        .replace(/(\b\w)/g, (char) => char.toUpperCase());

      setFontFamily(formattedName);
      setFontInput(formattedName);
    }
  };

  /**
   * Handle form submission for adding a new font
   */
  const handleFontSubmit = (e) => {
    e.preventDefault();
    setFontError("");

    if (activeTab === "search") {
      // Google Fonts selection
      if (!fontInput || fontInput.trim() === "") {
        setFontError("Please select a font");
        return;
      }

      // Create new font object
      let newFont;

      if (selectedFont) {
        newFont = {
          family: selectedFont.family,
          category: fontCategory,
          variants: selectedFont.variants || ["regular"],
          source: "google",
          files: selectedFont.files,
        };
      } else {
        // Manual entry
        newFont = {
          family: fontInput.trim(),
          category: fontCategory,
          variants: ["regular"],
          source: "manual",
        };
      }

      // Add font to list
      handleNestedChange("designChoices", "fonts", [
        ...(project.designChoices.fonts || []),
        newFont,
      ]);
    } else if (activeTab === "upload") {
      // Font file upload
      if (!selectedFontFile && !showCustomOptions) {
        setFontError("Please upload a font file or provide font details");
        return;
      }

      if (showCustomOptions && !fontInput && !fontUrl) {
        setFontError("Please provide a font name or URL");
        return;
      }

      let newFont = {
        family: fontFamily || fontInput.trim(),
        category: fontCategory,
        variants: ["regular"],
        source: "custom",
      };

      // If a file was uploaded, store file information
      if (selectedFontFile) {
        newFont.fileName = selectedFontFile.name;
        newFont.fileSize = selectedFontFile.size;
        newFont.fileType = selectedFontFile.type;
        // In a real implementation, you would upload this file to a server
        // and store the URL to the uploaded file
        newFont.uploadedFile = true;
      }

      // If custom font options are provided
      if (showCustomOptions) {
        if (fontUrl) {
          newFont.url = fontUrl.trim();
        }
      }

      // Add font to list
      handleNestedChange("designChoices", "fonts", [
        ...(project.designChoices.fonts || []),
        newFont,
      ]);
    }

    // Reset and close modal
    resetForm();
    setShowFontModal(false);
  };

  /**
   * Reset form state
   */
  const resetForm = () => {
    setFontInput("");
    setFontError("");
    setSelectedFont(null);
    setSelectedFontFile(null);
    setShowCustomOptions(false);
    setFontUrl("");
    setFontFamily("");
    setSearchTerm("");
    setActiveCategory("popular");
    setActiveTab("search");
  };

  // Common web-safe and Google fonts as a fallback
  const commonFonts = [
    { family: "Arial", category: "sans-serif", variants: ["regular", "700"] },
    { family: "Roboto", category: "sans-serif", variants: ["regular", "700"] },
    {
      family: "Open Sans",
      category: "sans-serif",
      variants: ["regular", "700"],
    },
    { family: "Lato", category: "sans-serif", variants: ["regular", "700"] },
    {
      family: "Montserrat",
      category: "sans-serif",
      variants: ["regular", "700"],
    },
    { family: "Poppins", category: "sans-serif", variants: ["regular", "700"] },
    { family: "Raleway", category: "sans-serif", variants: ["regular", "700"] },
    { family: "Oswald", category: "sans-serif", variants: ["regular", "700"] },
    { family: "Merriweather", category: "serif", variants: ["regular", "700"] },
    {
      family: "Playfair Display",
      category: "serif",
      variants: ["regular", "700"],
    },
    {
      family: "Source Sans Pro",
      category: "sans-serif",
      variants: ["regular", "700"],
    },
    { family: "PT Sans", category: "sans-serif", variants: ["regular", "700"] },
    { family: "Georgia", category: "serif", variants: ["regular", "700"] },
  ];

  // Group fonts by category
  const groupedFonts = () => {
    const grouped = {
      heading: [],
      body: [],
      accent: [],
      other: [],
    };

    if (project.designChoices.fonts) {
      project.designChoices.fonts.forEach((fontObj, index) => {
        if (typeof fontObj === "string") {
          // Handle old format (just strings)
          grouped.heading.push({ family: fontObj, index });
        } else if (fontObj.category && grouped[fontObj.category]) {
          grouped[fontObj.category].push({ ...fontObj, index });
        } else {
          grouped.other.push({ ...fontObj, index });
        }
      });
    }

    return grouped;
  };

  // Delete a font from the list
  const handleDeleteFont = (index) => {
    const updatedFonts = [...project.designChoices.fonts];
    updatedFonts.splice(index, 1);
    handleNestedChange("designChoices", "fonts", updatedFonts);
  };

  /**
   * Generate a font source label for display
   */
  const getFontSourceLabel = (font) => {
    if (typeof font === "string") return "";

    if (font.source === "google") return "(Google Font)";
    if (font.source === "custom" && font.uploadedFile) return "(Uploaded)";
    if (font.source === "custom" && font.url) return "(External)";
    return "";
  };

  /**
   * Trigger file input click
   */
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Fonts
      </label>

      {/* Display fonts by category */}
      <div className="mb-4 space-y-4">
        {Object.entries(groupedFonts()).map(([category, fonts]) => {
          if (fonts.length === 0) return null;

          return (
            <div key={category} className="space-y-2">
              <h4 className="text-sm font-medium text-gray-500 capitalize">
                {category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {fonts.map(({ family, index, source }) => (
                  <div
                    key={index}
                    className="flex items-center p-1 px-2 bg-white border border-gray-300 rounded-md group hover:border-accent"
                  >
                    <span
                      className="text-sm font-medium"
                      style={{
                        fontFamily:
                          typeof family === "string"
                            ? family
                            : family.family || family,
                      }}
                    >
                      {typeof family === "string"
                        ? family
                        : family.family || family}
                    </span>
                    <span className="ml-1 text-xs text-gray-500">
                      {getFontSourceLabel(fonts[index])}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteFont(index)}
                      className="p-1 ml-2 text-red-600 transition-opacity rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-50"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Font Button */}
      <button
        type="button"
        onClick={() => setShowFontModal(true)}
        className="flex items-center justify-center px-4 py-2 text-sm bg-white border rounded-md text-accent border-accent hover:bg-accent/10"
      >
        <PlusCircle size={16} className="mr-2" />
        Add Font
      </button>

      {/* Font Input Modal */}
      <InputModal
        isOpen={showFontModal}
        onClose={() => {
          setShowFontModal(false);
          resetForm();
        }}
        onSubmit={handleFontSubmit}
        title="Add Font"
        submitText="Add Font"
        icon={<FileType size={20} className="text-accent" />}
      >
        <div className="space-y-4">
          {/* Tabs for different font addition methods */}
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              onClick={() => setActiveTab("search")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "search"
                  ? "border-b-2 border-accent text-accent"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Google Fonts
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("upload")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "upload"
                  ? "border-b-2 border-accent text-accent"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Upload Font
            </button>
          </div>

          {/* Google Fonts Search Tab */}
          {activeTab === "search" && (
            <>
              {/* Search Box */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  ref={initialFocusRef}
                  placeholder="Search fonts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>

              {/* Category Tabs */}
              <div className="flex pb-2 space-x-2 overflow-x-auto">
                {[
                  "popular",
                  "all",
                  "sans-serif",
                  "serif",
                  "display",
                  "monospace",
                  "handwriting",
                ].map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
                      activeCategory === category
                        ? "bg-accent text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category === "popular"
                      ? "Popular"
                      : category === "all"
                      ? "All Fonts"
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <RefreshCw size={24} className="text-accent animate-spin" />
                  <span className="ml-2 text-gray-600">Loading fonts...</span>
                </div>
              ) : (
                <>
                  {/* Font Grid with Preview */}
                  <div className="grid grid-cols-1 gap-2 p-2 overflow-y-auto border border-gray-200 rounded-md sm:grid-cols-2 max-h-60">
                    {filteredFonts.length === 0 ? (
                      <div className="flex items-center justify-center col-span-2 py-8 text-gray-500">
                        No fonts found. Try a different search term.
                      </div>
                    ) : (
                      filteredFonts.map((font) => (
                        <button
                          key={font.family}
                          type="button"
                          onClick={() => handleFontSelect(font)}
                          className={`p-2 text-left border rounded-md hover:border-accent transition-colors ${
                            selectedFont?.family === font.family
                              ? "border-accent bg-accent/10"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              {font.category}
                            </span>
                            {selectedFont?.family === font.family && (
                              <Check size={16} className="text-accent" />
                            )}
                          </div>
                          <p
                            className="mt-1 text-base font-medium"
                            style={{ fontFamily: font.family }}
                          >
                            {font.family}
                          </p>
                          <p
                            className="mt-1 text-sm"
                            style={{ fontFamily: font.family }}
                          >
                            The quick brown fox jumps over the lazy dog
                          </p>
                        </button>
                      ))
                    )}
                  </div>

                  {/* Selected Font Preview */}
                  {selectedFont && (
                    <div className="p-4 border border-gray-200 rounded-md">
                      <h3 className="mb-2 text-sm font-medium text-gray-700">
                        Selected Font Preview
                      </h3>
                      <div className="space-y-2">
                        <p
                          className="text-2xl"
                          style={{ fontFamily: selectedFont.family }}
                        >
                          {selectedFont.family} - Heading
                        </p>
                        <p
                          className="text-base"
                          style={{ fontFamily: selectedFont.family }}
                        >
                          This is how your body text will look like with{" "}
                          {selectedFont.family}. The quick brown fox jumps over
                          the lazy dog.
                        </p>
                        <p
                          className="text-sm"
                          style={{ fontFamily: selectedFont.family }}
                        >
                          Small text example with numbers: 1234567890
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Font Details */}
                  <div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Font Name
                        </label>
                        <input
                          type="text"
                          value={fontInput}
                          onChange={(e) => {
                            setFontInput(e.target.value);
                            // Clear selected font if user types manually
                            if (
                              selectedFont &&
                              selectedFont.family !== e.target.value
                            ) {
                              setSelectedFont(null);
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                          placeholder="e.g. Roboto, Open Sans"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Usage Category
                        </label>
                        <select
                          value={fontCategory}
                          onChange={(e) => setFontCategory(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        >
                          <option value="heading">Heading</option>
                          <option value="body">Body Text</option>
                          <option value="accent">Accent</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Font variants info - for future use */}
                    {selectedFont &&
                      selectedFont.variants &&
                      selectedFont.variants.length > 0 && (
                        <div className="mt-4">
                          <label className="block mb-1 text-sm font-medium text-gray-700">
                            Available Variants
                          </label>
                          <div className="text-sm text-gray-600">
                            {selectedFont.variants.join(", ")}
                          </div>
                        </div>
                      )}
                  </div>
                </>
              )}
            </>
          )}

          {/* Upload Font Tab */}
          {activeTab === "upload" && (
            <>
              {/* Font File Upload */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Upload Font File (.ttf, .otf, .woff, .woff2)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".ttf,.otf,.woff,.woff2,.eot"
                  className="hidden"
                />
                <div className="flex flex-col items-center p-4 border-2 border-gray-300 border-dashed rounded-md hover:border-accent">
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="flex items-center justify-center p-3 mb-2 rounded-full text-accent bg-accent/10"
                  >
                    <Upload size={24} />
                  </button>
                  <p className="mb-1 text-sm text-gray-700">
                    {selectedFontFile
                      ? `Selected: ${selectedFontFile.name}`
                      : "Click to select or drag a font file here"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Supported formats: TTF, OTF, WOFF, WOFF2
                  </p>
                </div>
              </div>

              {/* Custom Font Options Checkbox */}
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="customFontOptions"
                  checked={showCustomOptions}
                  onChange={(e) => setShowCustomOptions(e.target.checked)}
                  className="w-4 h-4 border-gray-300 rounded text-accent focus:ring-accent"
                />
                <label
                  htmlFor="customFontOptions"
                  className="ml-2 text-sm text-gray-700"
                >
                  Font not available for upload? Provide details below
                </label>
              </div>

              {/* Custom Font Options (conditionally shown) */}
              {showCustomOptions && (
                <div className="p-4 mt-2 border border-gray-200 rounded-md bg-gray-50">
                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Font Name
                    </label>
                    <input
                      type="text"
                      value={selectedFontFile ? fontFamily : fontInput}
                      onChange={(e) =>
                        selectedFontFile
                          ? setFontFamily(e.target.value)
                          : setFontInput(e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                      placeholder="e.g. My Custom Font"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Font URL (optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Link size={16} className="text-gray-400" />
                      </div>
                      <input
                        type="url"
                        value={fontUrl}
                        onChange={(e) => setFontUrl(e.target.value)}
                        className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        placeholder="https://example.com/fonts/my-font.ttf"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Link to the font file or a CDN URL (e.g., Google Fonts
                      URL)
                    </p>
                  </div>
                </div>
              )}

              {/* Font Category */}
              <div className="mt-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Usage Category
                </label>
                <select
                  value={fontCategory}
                  onChange={(e) => setFontCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                  <option value="heading">Heading</option>
                  <option value="body">Body Text</option>
                  <option value="accent">Accent</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Preview notice */}
              <div className="p-3 mt-4 border border-yellow-200 rounded-md bg-yellow-50">
                <div className="flex items-start">
                  <AlertTriangle
                    size={18}
                    className="mr-2 text-yellow-500 mt-0.5"
                  />
                  <div>
                    <p className="text-sm text-yellow-700">
                      <strong>Note:</strong> Font preview is not available for
                      uploaded or custom fonts. The font will be available after
                      saving the project.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {fontError && (
            <p className="mt-1 text-sm text-red-600">{fontError}</p>
          )}

          <div className="p-3 mt-4 rounded-md bg-gray-50">
            <p className="text-xs text-gray-500">
              <strong>Tip:</strong> For best results, choose web-safe fonts or
              popular Google Fonts that are likely to be available on most
              devices. For custom fonts, make sure you have proper licensing to
              use them.
            </p>
          </div>
        </div>
      </InputModal>
    </div>
  );
};

export default FontSelectionModal;
