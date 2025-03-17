// client/src/api/index.js - Updated API configuration
import axios from "axios";

// Create axios instance with default config
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 seconds timeout for all requests
});

// Add request interceptor for debugging
API.interceptors.request.use(
  (config) => {
    console.log(`Making request to: ${config.baseURL}${config.url}`);
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
    console.error("API Error:", error.message);
    // Log additional details when available
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    return Promise.reject(error);
  }
);

// Project Form API
export const submitProjectForm = async (formData) => {
  try {
    const response = await API.post("/projects", formData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error submitting project form";
  }
};

// Booking API
export const scheduleDiscoveryCall = async (bookingData) => {
  try {
    const response = await API.post("/bookings", bookingData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error scheduling discovery call";
  }
};

export const cancelBooking = async (bookingId, email) => {
  try {
    const response = await API.patch(`/bookings/cancel/${bookingId}`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error cancelling booking";
  }
};

// Contact API
export const submitContactForm = async (contactData) => {
  try {
    const response = await API.post("/contact", contactData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error submitting contact form";
  }
};

export default API;
