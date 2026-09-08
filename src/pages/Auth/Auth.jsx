
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Get functions from AuthContext
  const { login, register } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    const destination = result.user?.role === "admin" ? "/admin" : "/dashboard";
    navigate(destination);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    if (!/\d/.test(password)) {
      setError("Password must contain at least one number.");
      return;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      setError("Password must contain at least one special character.");
      return;
    }

    const result = await register(name, email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setPassword("");
    setConfirmPassword("");
    navigate("/verify-otp", { state: { email, mode: "register" } });
  };

  return (
    <div className="min-h-screen bg-purple-100 flex items-center justify-center px-4 sm:px-6 py-8">

      {/* Main Container */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16">

        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 text-center">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Learn, Grow and Connect with Experts!!
          </h1>

          <p className="mt-5 text-gray-500 text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl mx-auto leading-relaxed">
            Explore courses and assessments from different categories for free,
            build your skills, and connect with experts whenever you need
            personalized guidance.
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 max-w-md bg-white rounded-2xl shadow-xl p-5 sm:p-7 md:p-8">

          {/* Login / Signup Tabs */}
          <div className="flex border-b border-gray-200 mb-7">

            {/* Login */}
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setError("");
              }}
              className={`w-1/2 py-3 font-semibold transition ${
                isLogin
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Login
            </button>

            {/* Signup */}
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setError("");
              }}
              className={`w-1/2 py-3 font-semibold transition ${
                !isLogin
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Sign Up
            </button>

          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* ================= LOGIN FORM ================= */}
          {isLogin && (
            <form onSubmit={handleLogin} className="space-y-5">

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome Back!!
                </h2>

                <p className="text-gray-500 mt-2">
                  Login to continue learning.
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                  required
                />
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-purple-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Login
              </button>

              {/* Google Login */}
              <button
                type="button"
                className="w-full border border-gray-300 flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <FcGoogle size={20} />
                <span>Continue with Google</span>
              </button>

            </form>
          )}

          {/* ================= SIGNUP FORM ================= */}
          {!isLogin && (
            <form onSubmit={handleRegister} className="space-y-5">

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Create Account
                </h2>

                <p className="text-gray-500 mt-2">
                  Join us and start learning.
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="e.g. Abc@1234"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                  required
                />
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Create Account
              </button>

              {/* Google Signup */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition"
              >
                <FcGoogle size={20} />
                <span>Continue with Google</span>
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};

export default Auth;

