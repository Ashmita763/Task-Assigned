import React from 'react';
import { FaUser, FaClock, FaCalendarAlt, FaUsers } from 'react-icons/fa';

const ExpertLanding = () => {
  // Mock runtime data
  const name = "Expert";
  const initials = "EX";

  const statusbar = [
    {
      title: "Profile",
      value: "Active",
      description: "Manage your expert profile",
      icon: FaUser,
      action: () => alert("Navigate to Profile"),
    },
    {
      title: "Availability",
      value: "Set Schedule",
      description: "Manage your available time",
      icon: FaClock,
      action: () => alert("Navigate to Availability"),
    },
    {
      title: "Appointments",
      value: "0",
      description: "Upcoming appointments",
      icon: FaCalendarAlt,
      action: () => alert("Navigate to Appointments"),
    },
    {
      title: "Clients",
      value: "0",
      description: "Your current clients",
      icon: FaUsers,
      action: () => alert("Navigate to Clients"),
    },
  ];

  return (
    <div>
      <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page section will stack vertically inside the container */}
          
          {/* Hero Header */}
          <section className="relative overflow-hidden bg-gray-900 rounded-2xl p-6 sm:p-8 lg:p-10 text-white">
            {/* Background glow overlay effect 1 */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />

            {/* Background glow overlay effect 2 */}
            <div className="absolute -bottom-24 left-1/3 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />

            {/* Content Container */}
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              {/* Left Column */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  <p className="text-sm text-purple-300 font-medium">Expert Dashboard</p>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Welcome back, {name}
                </h1>
                <p className="text-gray-300 mt-3 max-w-xl">
                  Manage your profile, availability, appointments, clients, and earnings from your expert dashboard.
                </p>
              </div>

              {/* Right Column: Initials Badge */}
              <div className="shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-purple-600 flex items-center justify-center text-xl sm:text-2xl font-bold shadow-lg shadow-purple-900/30">
                  {initials}
                </div>
              </div>
            </div>
          </section>

          {/* Quick stats grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {statusbar.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  onClick={stat.action}
                  className="bg-white border border-gray-200 rounded-xl p-5 cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {stat.title}
                      </p>
                      <h2 className="text-xl font-bold text-gray-900 mt-2">
                        {stat.value}
                      </h2>
                      <p className="text-xs text-gray-400 mt-1">
                        {stat.description}
                      </p>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                      <Icon />
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

        </div>
      </main>
    </div>
  );
};

export default ExpertLanding;