import React from "react";
import {
    FaBookOpen,
    FaCalendarCheck,
    FaChartBar,
    FaClipboardCheck,
    FaCog,
    FaSignOutAlt,
    FaTags,
    FaUserShield,
    FaUsers,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const menuItems = [
    { name: "Dashboard", path: "/admin", icon: FaChartBar },
    { name: "Users", path: "/admin?section=users", icon: FaUsers },
    { name: "Experts", path: "/admin?section=experts", icon: FaUserShield },
    { name: "Courses", path: "/admin?section=courses", icon: FaBookOpen },
    { name: "Assessments", path: "/admin?section=assessments", icon: FaClipboardCheck },
    { name: "Consultations", path: "/admin?section=consultations", icon: FaCalendarCheck },
    { name: "Categories", path: "/admin?section=categories", icon: FaTags },
    { name: "Settings", path: "/admin?section=settings", icon: FaCog },
];

const AdminSidebar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

  return (
        <aside className="w-64 min-h-screen bg-purple-700 text-white p-5 flex flex-col shrink-0">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">CodAcademy</h1>
                <p className="text-sm text-purple-200 mt-1">Admin Panel</p>
            </div>

            <nav className="space-y-2" aria-label="Admin navigation">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.name === "Dashboard"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                    isActive
                                        ? "bg-purple-600 text-white"
                                        : "text-purple-100 hover:bg-purple-600/70"
                                }`
                            }
                        >
                            <Icon className="text-base" />
                            <span className="font-medium">{item.name}</span>
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
                className="mt-auto flex items-center gap-3 px-4 py-3 rounded-lg text-purple-100 hover:bg-red-600 hover:text-white transition"
            >
                <FaSignOutAlt />
                <span className="font-medium">Logout</span>
            </button>
    </aside>
    );
};

export default AdminSidebar;