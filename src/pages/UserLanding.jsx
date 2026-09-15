// pages/UserLanding.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  FaAward,
} from "react-icons/fa";

const UserLanding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState(null);

  const name = user?.name || "User";
  const hasPassedAssessment = user?.hasPassedAssessment || false;

  useEffect(() => {
    if (location.state?.assessmentPassed) {
      setShowSuccess(true);
      setAssessmentScore(location.state.score);
      window.history.replaceState({}, document.title);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [location]);

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
        ? `Score: ${user?.assessmentScore || 0}%`
        : "Complete your free assessment",
      icon: hasPassedAssessment ? FaAward : FaClipboardCheck,
      action: () => navigate("/assessments"),
    },
    {
      title: "My Courses",
      value: hasPassedAssessment ? "Enrolled" : "Locked",
      description: hasPassedAssessment
        ? "Access your courses"
        : "Pass assessment to unlock",
      icon: hasPassedAssessment ? FaBookOpen : FaLock,
      action: hasPassedAssessment ? () => navigate("/courses") : undefined,
    },
    {
      title: "Counselling",
      value: hasPassedAssessment ? "Available" : "Locked",
      description: hasPassedAssessment
        ? "Find your expert"
        : "Pass assessment to unlock",
      icon: hasPassedAssessment ? FaUserTie : FaLock,
      action: hasPassedAssessment ? () => navigate("/counselling") : undefined,
    },
    {
      title: "Consultations",
      value: hasPassedAssessment ? "0" : "Locked",
      description: hasPassedAssessment
        ? "Upcoming consultations"
        : "Pass assessment to unlock",
      icon: FaCalendarAlt,
      action: undefined,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Success Toast */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 animate-slideDown">
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-xl text-green-600" />
              <div>
                <p className="font-semibold text-green-800">
                  Assessment Passed!
                </p>
                <p className="text-sm text-green-700">
                  You scored {assessmentScore}% — all features are now unlocked.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Header */}
        <section className="relative overflow-hidden bg-gray-900 rounded-2xl p-6 sm:p-8 lg:p-10 text-white">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />

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

              <p className="text-gray-300 mt-3 max-w-xl">
                {hasPassedAssessment 
                  ? "Continue your learning journey and explore unlocked courses."
                  : "Complete your free assessment to unlock courses and counselling."}
              </p>
            </div>

            <div className="shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-purple-600 flex items-center justify-center text-xl sm:text-2xl font-bold shadow-lg shadow-purple-900/30">
                {initials}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                onClick={stat.action}
                className={`bg-white border border-gray-200 rounded-xl p-5 transition-all duration-200 ${
                  stat.action
                    ? "cursor-pointer hover:shadow-md hover:-translate-y-0.5"
                    : "opacity-70"
                }`}
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

        {/* Main Dashboard Grid */}
        <section className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* Next Step */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-purple-600">
                  YOUR NEXT STEP
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                  {hasPassedAssessment
                    ? "Start your learning journey"
                    : "Complete your free assessment"}
                </h2>
                <p className="text-gray-500 mt-2 max-w-xl">
                  {hasPassedAssessment
                    ? "Explore courses and connect with experts to continue developing your skills."
                    : "Complete the assessment to understand your skills and unlock courses and counselling."}
                </p>
              </div>
              <div className="hidden sm:flex w-12 h-12 rounded-xl bg-gray-100 text-gray-600 items-center justify-center shrink-0">
                {hasPassedAssessment ? (
                  <FaGraduationCap className="text-xl" />
                ) : (
                  <FaClipboardCheck className="text-xl" />
                )}
              </div>
            </div>

            {!hasPassedAssessment && (
              <button
                onClick={() => navigate("/assessments")}
                className="mt-6 inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Start Assessment
                <FaArrowRight className="text-sm" />
              </button>
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
                  className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-3 rounded-xl font-semibold transition"
                >
                  Find an Expert
                </button>
              </div>
            )}
          </div>

          {/* Account Status */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900">Your Progress</h2>
            <p className="text-sm text-gray-500 mt-1">
              {hasPassedAssessment 
                ? "All features unlocked" 
                : "Complete assessment to unlock all features"}
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                    <FaClipboardCheck />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Assessment</span>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  hasPassedAssessment ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                }`}>
                  {hasPassedAssessment ? "Passed" : "Pending"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                    <FaBookOpen />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Courses</span>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  hasPassedAssessment ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                }`}>
                  {hasPassedAssessment ? "Unlocked" : "Locked"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                    <FaUserTie />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Counselling</span>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  hasPassedAssessment ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                }`}>
                  {hasPassedAssessment ? "Available" : "Locked"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Locked Features */}
        {!hasPassedAssessment && (
          <section className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                    <FaBookOpen />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-gray-900">Courses</h2>
                    <p className="text-sm text-gray-500">Build your skills</p>
                  </div>
                </div>
                <FaLock className="text-gray-400" />
              </div>

              <div className="mt-6 bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">
                  Courses will become available after you complete and pass the free assessment.
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

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                    <FaUserTie />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-gray-900">Counselling</h2>
                    <p className="text-sm text-gray-500">Connect with an expert</p>
                  </div>
                </div>
                <FaLock className="text-gray-400" />
              </div>

              <div className="mt-6 bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">
                  Get personalized guidance from experts after completing your assessment.
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

        {/* Recent Activity */}
        <section className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <p className="text-sm text-gray-500 mt-1">Keep track of your learning journey</p>
            </div>
          </div>

          <div className="mt-6 border border-dashed border-gray-200 rounded-xl py-10 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
              <FaGraduationCap className="text-2xl text-gray-300" />
            </div>
            <h3 className="font-semibold text-gray-700 mt-4">
              {hasPassedAssessment ? "Start exploring your courses" : "No recent activity"}
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              {hasPassedAssessment 
                ? "Browse courses and begin your learning journey"
                : "Complete your assessment to begin your journey"}
            </p>
          </div>
        </section>

      </div>
    </main>
  );
};

export default UserLanding;