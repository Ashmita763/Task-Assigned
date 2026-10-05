
import React from "react";
import {
  FaUser,
  FaClock,
  FaCalendarAlt,
  FaUsers,
  FaBook,
  FaCheckCircle,
  FaUserFriends,
  FaMoneyBillWave,
} from "react-icons/fa";

import ExpertHeader from "./Expert/ExpertHeader";
import StatCard from "./Admin/StatCard";
import { useAuth } from "../context/AuthContext";

const Overview = () => {
  const { user } = useAuth();
  const name = user?.name || "Expert";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const stats = [
    {
      label: "Courses",
      value: "8",
      hint: "Courses you have created",
      icon: FaBook,
    },
    {
      label: "Enrolled Students",
      value: "124",
      hint: "Students in your courses",
      icon: FaUsers,
    },
    {
      label: "Upcoming Consultations",
      value: "6",
      hint: "Scheduled consultations",
      icon: FaCalendarAlt,
    },
    {
      label: "Completed Consultations",
      value: "42",
      hint: "Completed sessions",
      icon: FaCheckCircle,
    },
    {
      label: "Consultation Students",
      value: "31",
      hint: "Students you consulted",
      icon: FaUserFriends,
    },
    {
      label: "Earnings",
      value: "NPR 48,500",
      hint: "Total consultation earnings",
      icon: FaMoneyBillWave,
    },
    {
      label: "Profile",
      value: "Active",
      hint: "Manage your expert profile",
      icon: FaUser,
    },
    {
      label: "Availability",
      value: "Set Schedule",
      hint: "Manage your available time",
      icon: FaClock,
    },
  ];

  return (
    <main className="min-h-screen bg-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <ExpertHeader
          name={name}
          initials={initials}
        />

        {/* Overview */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Here's a quick overview of your expert activities.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.title}
                label={stat.label}
                value={stat.value}
                hint={stat.hint}
                icon={stat.icon}
              />
            ))}
          </div>
        </section>

        {/* Bottom cards */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Expert Profile */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Expert Profile
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your professional information
                </p>
              </div>

              <button className="text-sm font-medium text-purple-600 hover:text-purple-700">
                View Profile
              </button>
            </div>

            <div className="mt-6 flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-lg font-bold text-purple-600">
                {initials}
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  {name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Web Development Expert
                </p>

                <span className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Approved Expert
                </span>
              </div>

            </div>

            <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Qualification
                </span>

                <span className="text-sm font-medium text-gray-900">
                  Master's Degree
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Experience
                </span>

                <span className="text-sm font-medium text-gray-900">
                  5+ Years
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Expertise
                </span>

                <span className="text-sm font-medium text-gray-900">
                  React & Node.js
                </span>
              </div>

            </div>
          </div>

          {/* Availability */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Availability
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your consultation schedule
                </p>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Available
              </span>

            </div>

            <div className="mt-6 space-y-4">

              {[
                ["Monday", "10:00 AM - 5:00 PM"],
                ["Tuesday", "10:00 AM - 5:00 PM"],
                ["Wednesday", "10:00 AM - 5:00 PM"],
                ["Thursday", "10:00 AM - 5:00 PM"],
                ["Friday", "10:00 AM - 3:00 PM"],
              ].map(([day, time]) => (
                <div
                  key={day}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-gray-600">
                    {day}
                  </span>

                  <span className="text-sm font-medium text-gray-900">
                    {time}
                  </span>
                </div>
              ))}

            </div>

            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 py-3 text-sm font-medium text-white transition hover:bg-purple-700">
              <FaClock />
              Manage Availability
            </button>

          </div>

        </section>

      </div>
    </main>
  );
};

export default Overview;
