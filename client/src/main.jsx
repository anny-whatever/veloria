// src/index.jsx - Updated router configuration
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
import ProjectDetailsForm from "./pages/Admin/ProjectDetailsForm";
import ProjectsCalendar from "./pages/Admin/ProjectsCalendar";
import BookingsCalendar from "./pages/Admin/BookingsCalendar";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";

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
      {
        path: "projects/new",
        element: <ProjectDetailsForm />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetailsForm />,
      },
      {
        path: "projects/calendar",
        element: <ProjectsCalendar />,
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
