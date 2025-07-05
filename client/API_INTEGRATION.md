# API Integration Documentation

## Overview

This document explains how the frontend components integrate with the backend API endpoints.

## API Endpoints

The backend provides the following endpoints:

- `GET /api/health` - Health check endpoint
- `POST /api/contact` - Contact form submission
- `POST /api/get-started` - Get started form submission
- `POST /api/book-call` - Book call form submission
- `GET /api/admin/submissions` - Get all submissions (admin)

## Frontend Components

### 1. API Configuration (`src/api/index.js`)

The main API configuration file that provides:

- Axios instance with proper base URL
- Request/response interceptors for error handling
- All API functions for form submissions

### 2. Form Components

All form components use the API service:

- `ContactForm.jsx` - Uses `submitContactForm()`
- `ProjectForm.jsx` - Uses `submitGetStartedForm()`
- `CalendarBooking.jsx` - Uses `submitBookCallForm()`

### 3. Utility Components

- `HealthCheck.jsx` - Monitors API health status
- `AdminPanel.jsx` - Displays form submissions
- `ApiDemo.jsx` - Interactive demo of all integrations

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the client directory:

```
VITE_API_URL=http://localhost:5000
```

### 2. Install Dependencies

The integration uses existing dependencies:

- axios (for HTTP requests)
- framer-motion (for animations)
- lucide-react (for icons)

### 3. Import API Functions

```javascript
import {
  submitContactForm,
  submitGetStartedForm,
  submitBookCallForm,
  checkHealth,
  getAdminSubmissions,
} from "../api";
```

### 4. Usage Examples

#### Contact Form

```javascript
const handleSubmit = async (formData) => {
  try {
    const response = await submitContactForm(formData);
    console.log("Success:", response);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

#### Health Check

```javascript
const checkApiHealth = async () => {
  try {
    const health = await checkHealth();
    console.log("API Status:", health);
  } catch (error) {
    console.error("API Unavailable:", error);
  }
};
```

#### Admin Submissions

```javascript
const fetchSubmissions = async () => {
  try {
    const data = await getAdminSubmissions();
    console.log("Submissions:", data.submissions);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

## Error Handling

All API functions include proper error handling:

- Network errors are caught and handled
- Server errors are properly formatted
- User-friendly error messages are provided

## Testing

Use the `ApiDemo` component to test all integrations:

```javascript
import ApiDemo from "./components/ApiDemo";

function App() {
  return <ApiDemo />;
}
```

## Production Deployment

1. Update the `VITE_API_URL` in your `.env` file
2. Ensure CORS is configured on your server
3. Verify all endpoints are working with the health check

## Legacy Support

The API service maintains backward compatibility with existing function names:

- `submitProjectForm` → `submitGetStartedForm`
- `scheduleDiscoveryCall` → `submitBookCallForm`
