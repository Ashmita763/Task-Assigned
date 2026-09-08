import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";
import UserSidebar from "./components/UserSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";

import Auth from "./pages/Auth/Auth";
import UserLanding from "./pages/UserLanding";
import Assessment from "./pages/Assessment";
import AdminDash from "./pages/Admin/AdminDash";

import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Routes>

      {/* =========================
          PUBLIC PAGES
      ========================== */}

      <Route path="/auth" element={<Auth />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/verify-otp"
        element={<VerifyOTP />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />


      {/* =========================
          PROTECTED USER PAGES
      ========================== */}

      <Route element={<ProtectedRoute />}>

       <Route
  path="/dashboard"
  element={
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex pt-20">
        <UserSidebar />

        <main className="flex-1 min-w-0">
          <UserLanding />
        </main>
      </div>
    </div>
  }
/>

        <Route
          path="/assessments"
          element={<Assessment />}
        />

      </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route
          path="/admin"
          element={
            <div className="min-h-screen bg-slate-50 flex">
              <AdminSidebar />
              <div className="flex-1">
                <AdminHeader />
                <AdminDash />
              </div>
            </div>
          }
        />
      </Route>


      {/* =========================
          FALLBACK
      ========================== */}

      <Route
        path="*"
        element={<Navigate to="/auth" replace />}
      />

    </Routes>
  );
}

export default App;