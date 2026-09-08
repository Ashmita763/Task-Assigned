const express = require("express");
const {
  register,
  login,
  getCurrentUser,
  verifyRegistrationOtp,
  forgotPassword,
  verifyOtp,
  resetPassword,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-registration-otp", verifyRegistrationOtp);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;