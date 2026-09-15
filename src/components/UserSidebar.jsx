import React from "react";
import {
  FaHome,
  FaClipboardCheck,
  FaBookOpen,
  FaUserTie,
  FaLock,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Temporary.
  // Later this will come from the logged-in user's assessment status.
  const hasPassedAssessment = false;

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FaHome,
      locked: false,
    },
    {
      name: "Assessment",
      path: "/assessments",
      icon: FaClipboardCheck,
      locked: false,
    },
    {
      name: "Courses",
      path: "/courses",
      icon: FaBookOpen,
      locked: !hasPassedAssessment,
    },
    {
      name: "Counselling",
      path: "/counselling",
      icon: FaUserTie,
      locked: !hasPassedAssessment,
    },
  ];

  return (
    <aside className="w-64 min-h-[calc(100vh-5rem)] bg-slate-900 text-white p-5 shrink-0 flex flex-col">

      {/* Sidebar Header */}
      <div className="mb-8">
        <h2 className="text-xl font-bold">
          Student Dashboard
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          Learn. Assess. Grow.
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          // Locked item
          if (item.locked) {
            return (
              <div
                key={item.name}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-slate-500 cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <Icon className="text-lg" />

                  <span className="font-medium">
                    {item.name}
                  </span>
                </div>

                <FaLock className="text-sm" />
              </div>
            );
          }

          // Available item
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <Icon className="text-lg" />

              <span className="font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}

      </nav>

      <button
        type="button"
        onClick={() => {
          logout();
          navigate("/auth", { replace: true });
        }}
        className="mt-auto flex w-full items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition"
      >
        <FaSignOutAlt className="text-lg" />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
};

export default UserSidebar;