// client/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import GetStarted from "./pages/GetStarted/GetStarted";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminHome from "./pages/Admin/AdminHome";
import BookingsList from "./pages/Admin/BookingsList";
import BookingDetails from "./pages/Admin/BookingDetails";
import ContactsList from "./pages/Admin/ContactsList";
import ContactDetails from "./pages/Admin/ContactDetails";
import ProjectPipeline from "./pages/Admin/ProjectPipeline";
import CreateProjectForm from "./pages/Admin/CreateProjectForm";
import EditProjectForm from "./pages/Admin/EditProjectForm";
import ProjectDetails from "./pages/Admin/ProjectDetails";
import ProjectsCalendar from "./pages/Admin/ProjectsCalendar";
import ProjectsList from "./pages/Admin/ProjectsList"; // Make sure this is imported
import BookingsCalendar from "./pages/Admin/BookingsCalendar";
import Finance from "./pages/Admin/Finance";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";

// Import placeholder components for the settings
const AdminSettings = () => (
  <div className="p-6">
    <h1 className="mb-4 text-2xl font-bold">Admin Settings</h1>
    <p>
      This page is under construction. Admin settings will be available soon.
    </p>
  </div>
);

const AdminProfile = () => (
  <div className="p-6">
    <h1 className="mb-4 text-2xl font-bold">Admin Profile</h1>
    <p>
      This page is under construction. Admin profile settings will be available
      soon.
    </p>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/get-started",
    element: <GetStarted />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      {
        path: "",
        element: <AdminHome />,
      },
      {
        path: "bookings",
        element: <BookingsList />,
      },
      // Important: Place "new" route BEFORE the :id route to avoid matching issues
      {
        path: "bookings/new",
        element: <BookingDetails />,
      },
      {
        path: "bookings/:id",
        element: <BookingDetails />,
      },
      {
        path: "bookings/calendar",
        element: <BookingsCalendar />,
      },
      {
        path: "contacts",
        element: <ContactsList />,
      },
      {
        path: "contacts/:id",
        element: <ContactDetails />,
      },
      {
        path: "projects",
        element: <ProjectPipeline />,
      },
      // Project routes - important to have the right order
      {
        path: "projects/list",
        element: <ProjectsList />,
      },
      {
        path: "projects/new",
        element: <CreateProjectForm />, // Use the dedicated create form component
      },
      {
        path: "projects/calendar",
        element: <ProjectsCalendar />,
      },
      {
        path: "projects/:id/edit",
        element: <EditProjectForm />, // Use the dedicated edit form component
      },
      {
        path: "projects/:id",
        element: <ProjectDetails />,
      },
      {
        path: "finance",
        element: <Finance />,
      },
      {
        path: "settings",
        element: <AdminSettings />,
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
