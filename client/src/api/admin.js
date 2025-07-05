// client/src/api/admin.js
import axios from "axios";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/api\/?$/, "");
const API_URL = `${API_BASE_URL}/api`;

const getAuthHeaders = (username, password) => {
  const token = btoa(`${username}:${password}`);
  return {
    Authorization: `Basic ${token}`,
  };
};

export const login = async (username, password) => {
  try {
    // We can't really "log in" with Basic Auth in a stateless way.
    // We just check if the credentials are valid by making a request
    // to a protected endpoint.
    await axios.get(`${API_URL}/admin/submissions`, {
      headers: getAuthHeaders(username, password),
    });
    return { success: true };
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      return { success: false, error: "Invalid credentials" };
    }
    return { success: false, error: "An unknown error occurred." };
  }
};

export const getSubmissions = async (type, auth) => {
  const { username, password } = auth;
  if (!username || !password) {
    return { success: false, error: "Not authenticated" };
  }

  const url = `${API_URL}/admin/submissions${type ? `/${type}` : ""}`;

  try {
    const response = await axios.get(url, {
      headers: getAuthHeaders(username, password),
    });
    return { success: true, data: response.data.data };
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      return { success: false, error: "Authentication failed" };
    }
    return { success: false, error: "Failed to fetch submissions." };
  }
};
