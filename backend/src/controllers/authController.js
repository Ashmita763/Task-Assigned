const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key";

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      isEmailVerified: false,
      verificationOtp: otp,
      verificationOtpExpiresAt: Date.now() + 10 * 60 * 1000,
    });

    return res.status(201).json({
      message: "OTP sent successfully. Please verify your email to complete registration.",
      otp,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({ message: "Please verify your email before logging in." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Login failed" });
  }
};

const verifyRegistrationOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: "Email is already verified." });
    }

    if (!user.verificationOtp) {
      return res.status(400).json({ message: "No verification OTP found for this email." });
    }

    if (user.verificationOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    if (user.verificationOtpExpiresAt < Date.now()) {
      user.verificationOtp = null;
      user.verificationOtpExpiresAt = null;
      await user.save();
      return res.status(400).json({ message: "OTP has expired. Please register again." });
    }

    user.isEmailVerified = true;
    user.verificationOtp = null;
    user.verificationOtpExpiresAt = null;
    await user.save();

    return res.status(200).json({
      message: "Email verified successfully. You can now login.",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "OTP verification failed." });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "No account found with this email." });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({ message: "Please verify your email before resetting the password." });
    }

    const otp = generateOtp();
    user.resetOtp = otp;
    user.resetOtpExpiresAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    return res.status(200).json({
      message: "OTP sent successfully. Please verify it to reset your password.",
      otp,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Failed to send OTP." });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !user.resetOtp) {
      return res.status(400).json({ message: "No OTP found for this email." });
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    if (user.resetOtpExpiresAt < Date.now()) {
      user.resetOtp = null;
      user.resetOtpExpiresAt = null;
      await user.save();
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    return res.status(200).json({
      message: "OTP verified successfully.",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "OTP verification failed." });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Email, OTP, and new password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !user.resetOtp) {
      return res.status(400).json({ message: "No OTP found for this email." });
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    if (user.resetOtpExpiresAt < Date.now()) {
      user.resetOtp = null;
      user.resetOtpExpiresAt = null;
      await user.save();
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = null;
    user.resetOtpExpiresAt = null;
    await user.save();

    return res.status(200).json({
      message: "Password reset successfully. Please login again.",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Password reset failed." });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    return res.status(200).json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch current user" });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getCurrentUser,
};