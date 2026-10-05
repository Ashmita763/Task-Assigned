import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles = [] }) => {

  // Get authentication information
  const { user, isAuthenticated, loading } = useAuth();

  // Get the current page URL
  const location = useLocation();

  // Wait until authentication check is complete
  if (loading) {
    return (  
    
         
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }  

  // If user is not logged in, redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/auth"
        state={{ from: location }}
        replace
      />
    );
  }    

  // If the user's role is not allowed, redirect to dashboard
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user?.role)
  ) {
    const homeByRole = {
      admin: "/admin",
      expert: "/expert-dashboard",
      student: "/dashboard",
    };

    return (
      <Navigate
        to={homeByRole[user?.role] || "/auth"}
        replace
      />
    );
  }

  // User is authenticated and has permission
  return <Outlet />;
};

export default ProtectedRoute;
