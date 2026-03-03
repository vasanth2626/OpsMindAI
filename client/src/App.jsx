import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import ProtectedRoute from "./components/layout/protectedRoute";

import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import UploadPage from "./pages/UploadPage";
import AdminPage from "./pages/AdminPage";
import InspectPage from "./pages/inspectpage";
import ProfilePage from "./pages/ProfilePage";
import EmployeesPage from "./pages/EmployeesPage";   // ✅ NEW

import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

/* ✅ DARK ENTERPRISE LAYOUT */
const AppLayout = () => {
  return (
    <div className="h-screen flex bg-background overflow-hidden">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="h-16 flex-shrink-0">
          <Navbar />
        </div>
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* PROTECTED */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {/* All logged-in users */}
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Admin/Superadmin only */}
            <Route element={<ProtectedRoute requireAdmin />}>
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/inspect" element={<InspectPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/employees" element={<EmployeesPage />} /> {/* ✅ NEW */}
            </Route>
          </Route>
        </Route>

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/chat" replace />} />
        <Route path="*" element={<Navigate to="/chat" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;