// client/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import GetStarted from "./pages/GetStarted/GetStarted";
import ServicesPage from "./pages/Services/ServicesPage";
import HotelManagementSystem from "./pages/Services/HotelManagementSystem";
import SchoolManagementSystem from "./pages/Services/SchoolManagementSystem";
import HospitalManagementSystem from "./pages/Services/HospitalManagementSystem";
import EcommerceManagementSystem from "./pages/Services/EcommerceManagementSystem";
import ERPSystem from "./pages/Services/ERPSystem";
import UIUXDesign from "./pages/Services/UIUXDesign";
import WebDevelopment from "./pages/Services/WebDevelopment";
import MobileAppDevelopment from "./pages/Services/MobileAppDevelopment";
import CustomSoftwareDevelopment from "./pages/Services/CustomSoftwareDevelopment";
import DatabaseSolutions from "./pages/Services/DatabaseSolutions";
import PayrollManagementSystem from "./pages/Services/PayrollManagementSystem";
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy";
import TermsOfService from "./pages/Legal/TermsOfService";
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
import { ThemeProvider } from "./contexts/ThemeContext";
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
    path: "/services",
    element: <ServicesPage />,
  },
  {
    path: "/services/hotel-management-system",
    element: <HotelManagementSystem />,
  },
  {
    path: "/services/school-management-system",
    element: <SchoolManagementSystem />,
  },
  {
    path: "/services/hospital-management-system",
    element: <HospitalManagementSystem />,
  },
  {
    path: "/services/ecommerce-management-system",
    element: <EcommerceManagementSystem />,
  },
  {
    path: "/services/erp-system",
    element: <ERPSystem />,
  },
  {
    path: "/services/ui-ux-design",
    element: <UIUXDesign />,
  },
  {
    path: "/services/web-development",
    element: <WebDevelopment />,
  },
  {
    path: "/services/mobile-app-development",
    element: <MobileAppDevelopment />,
  },
  {
    path: "/services/custom-software-development",
    element: <CustomSoftwareDevelopment />,
  },
  {
    path: "/services/database-solutions",
    element: <DatabaseSolutions />,
  },
  {
    path: "/services/payroll-management-system",
    element: <PayrollManagementSystem />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
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
      <ThemeProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
