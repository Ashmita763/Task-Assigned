import React from "react";
import { FaBell } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const AdminHeader = () => {
  const { user } = useAuth();
  const initials = user?.name
    ?.split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "A";

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-6 lg:px-8 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">Workspace</p>
        <h2 className="text-lg font-bold text-slate-900">Admin Panel</h2>
      </div>

      <div className="flex items-center gap-5">
        <button type="button" aria-label="View notifications" className="text-slate-500 hover:text-purple-600 transition">
          <FaBell />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-700 text-white flex items-center justify-center font-semibold">
            {initials}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">{user?.name || "Admin"}</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;