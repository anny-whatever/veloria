// client/src/pages/Admin/components/ErrorDisplay.jsx
import React from "react";
import { AlertTriangle } from "lucide-react";

/**
 * Reusable error display component with retry and go back options
 */
const ErrorDisplay = ({
  error,
  title = "Error",
  onRetry = null,
  onGoBack = null,
}) => {
  return (
    <div className="p-6 text-red-700 border border-red-200 rounded-lg bg-red-50">
      <div className="flex items-center mb-3">
        <AlertTriangle size={24} className="mr-2" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p>{error}</p>

      <div className="flex flex-wrap gap-3 mt-4">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 text-red-700 transition-colors bg-red-100 rounded-md hover:bg-red-200"
          >
            Retry
          </button>
        )}

        {onGoBack && (
          <button
            onClick={onGoBack}
            className="px-4 py-2 text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;
