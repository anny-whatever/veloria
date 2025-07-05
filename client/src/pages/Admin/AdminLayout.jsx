import React from "react";
import { Outlet } from "react-router-dom";
import {
  AdminAuthProvider,
  useAdminAuth,
} from "../../contexts/AdminAuthContext";
import AdminLoginPage from "./AdminLoginPage";

const AdminContent = () => {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  return <Outlet />;
};

const AdminLayout = () => {
  return (
    <AdminAuthProvider>
      <AdminContent />
    </AdminAuthProvider>
  );
};

export default AdminLayout;
