// client/src/hooks/useFetchData.js - With improved error handling
import { useState, useEffect, useCallback } from "react";
import API from "../api";

/**
 * Custom hook for fetching data with proper error handling
 * @param {string} endpoint - API endpoint path (without the ID)
 * @param {string|null} id - Resource ID (can be null, undefined, or 'new' for creation screens)
 * @param {boolean} fetchOnMount - Whether to fetch automatically on component mount
 * @param {Object} initialData - Initial data structure
 * @param {function} dataTransformer - Function to transform API response before setting state
 * @returns {Object} - Contains state and utility functions
 */
const useFetchData = ({
  endpoint,
  id = null,
  fetchOnMount = true,
  initialData = null,
  dataTransformer = (data) => data,
}) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Clear the error state
  const clearError = () => setError(null);

  // Main fetch function
  const fetchData = useCallback(
    async (specificId = id) => {
      // If id is null, undefined, 'new', or 'undefined' string, we don't fetch
      if (!specificId || specificId === "new" || specificId === "undefined") {
        setLoading(false);
        return null;
      }

      try {
        setLoading(true);
        clearError();

        // Make sure API.defaults.baseURL is properly set
        console.log(`Making request to: ${endpoint}/${specificId}`);
        const fullUrl = API.defaults.baseURL
          ? `${API.defaults.baseURL}${endpoint}/${specificId}`
          : `${endpoint}/${specificId}`;
        console.log(`Full URL: ${fullUrl}`);

        // Add a timeout to prevent hanging requests
        const response = await API.get(`${endpoint}/${specificId}`, {
          timeout: 10000, // 10 seconds timeout
        });

        const transformedData = dataTransformer(response.data);
        setData(transformedData);
        return transformedData;
      } catch (err) {
        console.error(
          `Error fetching data from ${endpoint}/${specificId}:`,
          err
        );

        // Handle different error types
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          switch (err.response.status) {
            case 400:
              setError("Bad request. Please check your input.");
              break;
            case 401:
              setError("You are not authorized to access this resource.");
              break;
            case 403:
              setError(
                "Access forbidden. You don't have permission to view this resource."
              );
              break;
            case 404:
              setError("The requested resource was not found.");
              break;
            case 500:
              setError("A server error occurred. Please try again later.");
              break;
            default:
              setError(
                `Error: ${err.response.status} - ${
                  err.response?.data?.message || "Unknown error"
                }`
              );
          }
        } else if (err.request) {
          // The request was made but no response was received
          if (!navigator.onLine) {
            setError(
              "You appear to be offline. Please check your internet connection."
            );
          } else if (err.code === "ECONNABORTED") {
            setError(
              "Request timed out. The server is taking too long to respond."
            );
          } else {
            setError(
              "No response received from server. Please check your API configuration."
            );
          }
        } else {
          // Something happened in setting up the request that triggered an Error
          setError(`Failed to load data: ${err.message}`);
        }

        return null;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, id, dataTransformer]
  );

  // Retry function
  const retry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
    return fetchData();
  }, [fetchData]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (fetchOnMount && id) {
      fetchData();
    }
  }, [fetchOnMount, id, fetchData]);

  // Auto-fetch when retry count changes
  useEffect(() => {
    if (retryCount > 0) {
      fetchData();
    }
  }, [retryCount, fetchData]);

  return {
    data,
    loading,
    error,
    fetchData,
    setData,
    clearError,
    retry,
    retryCount,
  };
};

export default useFetchData;
