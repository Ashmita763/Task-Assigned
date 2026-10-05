import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";
import UserSidebar from "./components/UserSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";

// Public / User pages
import Auth from "./pages/Auth/Auth";
import UserLanding from "./pages/UserLanding";
import Assessment from "./pages/Assessment";  
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

// Admin
import AdminDash from "./pages/Admin/AdminDash";

// Expert layout
import ExpertLayout from "./pages/Expert/ExpertLayout";

// Expert pages
import Overview from "./pages/Overview";

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

      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>

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
          element={
            <div className="min-h-screen bg-slate-50">
              <Navbar />

              <div className="flex pt-20">
                <UserSidebar />

                <main className="flex-1 min-w-0">
                  <Assessment />
                </main>
              </div>
            </div>
          }
        />

      </Route>


      {/* =========================
          PROTECTED EXPERT PAGES
      ========================== */}

      <Route element={<ProtectedRoute allowedRoles={["expert"]} />}>

        <Route element={<ExpertLayout />}>

          <Route
            path="/expert-dashboard"
            element={<Overview />}
          />

        </Route>

      </Route>


      {/* =========================
          PROTECTED ADMIN PAGES
      ========================== */}

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
