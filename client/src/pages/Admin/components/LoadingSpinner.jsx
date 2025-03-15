// client/src/pages/Admin/components/LoadingSpinner.jsx
import React from "react";

/**
 * Reusable loading spinner component
 */
const LoadingSpinner = ({ size = "large", message = null }) => {
  const spinnerSizes = {
    small: "w-6 h-6 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4",
  };

  const sizeClass = spinnerSizes[size] || spinnerSizes.large;

  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div
        className={`${sizeClass} border-gray-300 rounded-full border-t-primary animate-spin`}
      ></div>
      {message && <p className="mt-4 text-sm text-gray-500">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
