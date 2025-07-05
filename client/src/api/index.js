// client/src/api/index.js - Updated API configuration
import axios from "axios";

// Check if code is running in browser environment
const isBrowser = typeof window !== "undefined";

// Determine base URL for API requests
const getBaseUrl = () => {
  // In browser, use the environment variable or default
  if (isBrowser) {
    return import.meta.env.VITE_API_URL || "http://localhost:5000";
  }
  // In server environment, use a known default
  return process.env.VITE_API_URL || "http://localhost:5000";
};

// Create axios instance with default config
const API = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 seconds timeout for all requests
});

// Add request interceptor for debugging
API.interceptors.request.use(
  (config) => {
    if (isBrowser) {
      console.log(`Making request to: ${config.baseURL}${config.url}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (isBrowser) {
      console.error("API Error:", error.message);
      // Log additional details when available
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

// Health Check API
export const checkHealth = async () => {
  try {
    const response = await API.get("/api/health");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Health check failed";
  }
};

// Contact Form API
export const submitContactForm = async (contactData) => {
  try {
    const response = await API.post("/api/contact", contactData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error submitting contact form";
  }
};

// Get Started Form API (previously called project form)
export const submitGetStartedForm = async (formData) => {
  try {
    const response = await API.post("/api/get-started", formData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error submitting get started form";
  }
};

// Book Call API (previously called booking)
export const submitBookCallForm = async (bookingData) => {
  try {
    const response = await API.post("/api/book-call", bookingData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error booking call";
  }
};

// Admin API
export const getAdminSubmissions = async () => {
  try {
    const response = await API.get("/api/admin/submissions");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error fetching admin submissions";
  }
};

// Legacy function names for backward compatibility
export const submitProjectForm = submitGetStartedForm;
export const scheduleDiscoveryCall = submitBookCallForm;

// Legacy booking cancellation (keeping in case it's used elsewhere)
export const cancelBooking = async (bookingId, email) => {
  try {
    const response = await API.patch(`/api/bookings/cancel/${bookingId}`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error cancelling booking";
  }
};

export default API;
