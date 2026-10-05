import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    verifyOtp,
    verifyRegistrationOtp,
    resendRegistrationOtp,
  } = useAuth();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [resending, setResending] = useState(false);
  const email = location.state?.email || "";
  const mode = location.state?.mode || "reset";

  const handleResend = async () => {
    setError("");
    setNotice("");
    setResending(true);

    const result = await resendRegistrationOtp(email);
    if (result.success) {
      setOtp("");
      setNotice(result.message);
    } else {
      setError(result.message);
    }

    setResending(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email not found. Please go back and request a new OTP.");
      return;
    }

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    const result =
      mode === "register"
        ? await verifyRegistrationOtp(email, otp)
        : await verifyOtp(email, otp);

    if (!result.success) {
      setError(result.message);
      return;
    }

    if (mode === "register") {
      navigate("/auth", { state: { verifiedEmail: email } });
      return;
    }

    navigate("/reset-password", { state: { email, otp } });
  };

  return (
    <div className="min-h-screen bg-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Verify OTP</h1>
          <p className="text-gray-500 mt-2">
            Enter the 6-digit OTP sent to {email || "your email"}.
          </p>
        </div>

        {error && <div className="text-red-600 text-sm mb-4 rounded-lg">{error}</div>}
        {notice && <div className="text-green-700 text-sm mb-4">{notice}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="otp" className="block mb-2 font-medium text-gray-700">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter 6-digit OTP"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Verify OTP
          </button>
        </form>

        {mode === "register" && (
          <button
            type="button"
            onClick={handleResend}
            disabled={resending || !email}
            className="w-full mt-4 text-purple-600 hover:underline text-sm disabled:opacity-50"
          >
            {resending ? "Sending..." : "Resend verification code"}
          </button>
        )}

        <div className="text-center mt-5">
          <Link to="/forgot-password" className="text-purple-600 hover:underline text-sm">
            Back to Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;