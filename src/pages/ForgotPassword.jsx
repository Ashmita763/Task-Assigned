import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    const result = await forgotPassword(email);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setSuccess(result.message);
    setTimeout(() => navigate("/verify-otp", { state: { email } }), 1000);
  };

  return (
    <div className="min-h-screen bg-purple-100 flex items-center justify-center px-4 sm:px-6 py-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
          <p className="mt-2 text-gray-500">
            Enter your email address and we&apos;ll send you an OTP to reset your password.
          </p>
        </div>

        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
        {success && <div className="mb-4 text-sm text-green-600">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Send OTP
          </button>
        </form>

        <div className="text-center mt-5">
          <Link to="/auth" className="text-purple-600 hover:underline text-sm">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;