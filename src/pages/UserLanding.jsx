import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaArrowRight,
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaClipboardCheck,
  FaClock,
  FaGraduationCap,
  FaLock,
  FaUserTie,
} from "react-icons/fa";

const UserLanding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const name = user?.name || "User";

  // Temporary value.
  // Later:
  // const hasPassedAssessment = user?.hasPassedAssessment;
  const hasPassedAssessment = false;

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const stats = [
    {
      title: "Assessment",
      value: hasPassedAssessment ? "Passed" : "Pending",
      description: hasPassedAssessment
        ? "Assessment completed"
        : "Complete your free assessment",
      icon: FaClipboardCheck,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      action: () => navigate("/assessments"),
    },
    {
      title: "My Courses",
      value: hasPassedAssessment ? "0" : "Locked",
      description: hasPassedAssessment
        ? "Courses enrolled"
        : "Pass assessment to unlock",
      icon: hasPassedAssessment ? FaBookOpen : FaLock,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      action: hasPassedAssessment
        ? () => navigate("/courses")
        : undefined,
    },
    {
      title: "Counselling",
      value: hasPassedAssessment ? "Available" : "Locked",
      description: hasPassedAssessment
        ? "Find your expert"
        : "Pass assessment to unlock",
      icon: hasPassedAssessment ? FaUserTie : FaLock,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      action: hasPassedAssessment
        ? () => navigate("/counselling")
        : undefined,
    },
    {
      title: "Consultations",
      value: "0",
      description: "Upcoming consultations",
      icon: FaCalendarAlt,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      action: undefined,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* =========================
            WELCOME HEADER
        ========================== */}
        <section className="relative overflow-hidden bg-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 text-white">
          
          {/* Decorative background */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <p className="text-sm text-purple-300 font-medium">
                  Student Dashboard
                </p>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Welcome back, {name} 👋
              </h1>

              <p className="text-slate-300 mt-3 max-w-xl">
                Continue your learning journey, build your skills,
                and take the next step toward your goals.
              </p>
            </div>

            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-purple-600 flex items-center justify-center text-xl sm:text-2xl font-bold shadow-lg shadow-purple-900/30">
                {initials}
              </div>
            </div>

          </div>
        </section>


        {/* =========================
            QUICK STATS
        ========================== */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                onClick={stat.action}
                className={`bg-white border border-slate-200 rounded-2xl p-5 transition-all duration-200 ${
                  stat.action
                    ? "cursor-pointer hover:-translate-y-1 hover:shadow-md"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <h2 className="text-xl font-bold text-slate-900 mt-2">
                      {stat.value}
                    </h2>

                    <p className="text-xs text-slate-400 mt-1">
                      {stat.description}
                    </p>
                  </div>

                  <div
                    className={`w-11 h-11 rounded-xl ${stat.iconBg} ${stat.iconColor} flex items-center justify-center`}
                  >
                    <Icon />
                  </div>

                </div>
              </div>
            );
          })}

        </section>


        {/* =========================
            MAIN DASHBOARD GRID
        ========================== */}
        <section className="grid lg:grid-cols-3 gap-6 mt-6">

          {/* =====================
              NEXT STEP
          ====================== */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-purple-600">
                  YOUR NEXT STEP
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  {hasPassedAssessment
                    ? "Start your learning journey"
                    : "Complete your free assessment"}
                </h2>

                <p className="text-slate-500 mt-2 max-w-xl">
                  {hasPassedAssessment
                    ? "Explore courses and connect with experts to continue developing your skills."
                    : "Complete the assessment to understand your skills and unlock courses and counselling."}
                </p>
              </div>

              <div className="hidden sm:flex w-12 h-12 rounded-xl bg-purple-100 text-purple-600 items-center justify-center shrink-0">
                {hasPassedAssessment ? (
                  <FaGraduationCap className="text-xl" />
                ) : (
                  <FaClipboardCheck className="text-xl" />
                )}
              </div>
            </div>


            {!hasPassedAssessment && (
              <div className="mt-6">

                {/* Progress */}
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-500">
                    Assessment progress
                  </span>

                  <span className="font-semibold text-slate-700">
                    0%
                  </span>
                </div>

                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-purple-600 rounded-full" />
                </div>

                {/* Assessment information */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">

                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <FaClock className="text-purple-500" />
                    <span>Timed assessment</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <FaCheckCircle className="text-emerald-500" />
                    <span>Free to take</span>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
                    <FaGraduationCap className="text-blue-500" />
                    <span>Unlock learning</span>
                  </div>

                </div>

                <button
                  onClick={() => navigate("/assessments")}
                  className="mt-6 inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  Start Assessment
                  <FaArrowRight className="text-sm" />
                </button>

              </div>
            )}

            {hasPassedAssessment && (
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/courses")}
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl font-semibold transition"
                >
                  Browse Courses
                  <FaArrowRight className="text-sm" />
                </button>

                <button
                  onClick={() => navigate("/counselling")}
                  className="inline-flex items-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-3 rounded-xl font-semibold transition"
                >
                  Find an Expert
                </button>
              </div>
            )}

          </div>


          {/* =====================
              ACCOUNT STATUS
          ====================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <h2 className="text-lg font-bold text-slate-900">
              Your Progress
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Your current learning status
            </p>

            <div className="mt-6 space-y-4">

              {/* Assessment */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                    <FaClipboardCheck />
                  </div>

                  <span className="text-sm font-medium text-slate-700">
                    Assessment
                  </span>
                </div>

                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    hasPassedAssessment
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {hasPassedAssessment ? "Passed" : "Pending"}
                </span>
              </div>


              {/* Courses */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <FaBookOpen />
                  </div>

                  <span className="text-sm font-medium text-slate-700">
                    Courses
                  </span>
                </div>

                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    hasPassedAssessment
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {hasPassedAssessment ? "Unlocked" : "Locked"}
                </span>
              </div>


              {/* Counselling */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <FaUserTie />
                  </div>

                  <span className="text-sm font-medium text-slate-700">
                    Counselling
                  </span>
                </div>

                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    hasPassedAssessment
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {hasPassedAssessment ? "Available" : "Locked"}
                </span>
              </div>

            </div>

          </div>

        </section>


        {/* =========================
            LOCKED FEATURES
        ========================== */}
        {!hasPassedAssessment && (
          <section className="grid md:grid-cols-2 gap-6 mt-6">

            {/* Courses */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <FaBookOpen />
                  </div>

                  <div>
                    <h2 className="font-bold text-lg text-slate-900">
                      Courses
                    </h2>

                    <p className="text-sm text-slate-500">
                      Build your skills
                    </p>
                  </div>

                </div>

                <FaLock className="text-slate-300" />
              </div>

              <div className="mt-6 bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-600">
                  Courses will become available after you complete
                  and pass the free assessment.
                </p>
              </div>

              <button
                onClick={() => navigate("/assessments")}
                className="mt-4 text-purple-600 hover:text-purple-700 font-semibold text-sm inline-flex items-center gap-2"
              >
                Complete Assessment
                <FaArrowRight />
              </button>

            </div>


            {/* Counselling */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <FaUserTie />
                  </div>

                  <div>
                    <h2 className="font-bold text-lg text-slate-900">
                      Counselling
                    </h2>

                    <p className="text-sm text-slate-500">
                      Connect with an expert
                    </p>
                  </div>

                </div>

                <FaLock className="text-slate-300" />
              </div>

              <div className="mt-6 bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-600">
                  Get personalized guidance from experts after
                  completing your assessment.
                </p>
              </div>

              <button
                onClick={() => navigate("/assessments")}
                className="mt-4 text-purple-600 hover:text-purple-700 font-semibold text-sm inline-flex items-center gap-2"
              >
                Take Assessment
                <FaArrowRight />
              </button>

            </div>

          </section>
        )}


        {/* =========================
            RECENT ACTIVITY
        ========================== */}
        <section className="mt-6 bg-white border border-slate-200 rounded-2xl p-6">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Recent Activity
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Keep track of your learning journey
              </p>
            </div>
          </div>

          <div className="mt-6 border border-dashed border-slate-200 rounded-xl py-10 text-center">

            <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
              <FaGraduationCap className="text-2xl text-slate-300" />
            </div>

            <h3 className="font-semibold text-slate-700 mt-4">
              No recent activity
            </h3>

            <p className="text-sm text-slate-400 mt-1">
              Complete your assessment to begin your journey.
            </p>

          </div>

        </section>

      </div>
    </main>
  );
};

export default UserLanding;