const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { query } = require("../config/db");
const { sendRegistrationOtp } = require("../services/emailService");

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key";

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();    

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (!context.user) return null;

      try {
        const [rows] = await query(
          "SELECT id, name, email, role FROM users WHERE id = ?",
          [context.user.userId]
        );

        return rows[0] || null;
      } catch (error) {
        console.error("Error fetching user:", error);
        return null;
      }
    },
  },

  Mutation: {
    register: async (_, { name, email, password }) => {
      try {
        if (!name || !email || !password) {
          return { success: false, message: "Name, email, and password are required." };
        }

        if (password.length < 8) {
          return { success: false, message: "Password must be at least 8 characters long." };
        }

        if (!/[A-Z]/.test(password)) {
          return { success: false, message: "Password must contain at least one uppercase letter." };
        }

        if (!/[a-z]/.test(password)) {
          return { success: false, message: "Password must contain at least one lowercase letter." };
        }

        if (!/\d/.test(password)) {
          return { success: false, message: "Password must contain at least one number." };
        }

        if (!/[^A-Za-z0-9]/.test(password)) {
          return { success: false, message: "Password must contain at least one special character." };
        }

        const normalizedEmail = email.toLowerCase();

        const [existingRows] = await query(
          "SELECT id FROM users WHERE email = ?",
          [normalizedEmail]
        );

        if (existingRows.length > 0) {
          return { success: false, message: "User already exists." };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOtp();

        await sendRegistrationOtp(normalizedEmail, otp);

        await query(
          `
            INSERT INTO users (name, email, password, role, is_email_verified, verification_otp, verification_otp_expires_at)
            VALUES (?, ?, ?, 'user', false, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE))
          `,
          [name, normalizedEmail, hashedPassword, otp]
        );

        return {
          success: true,
          message: "OTP sent successfully. Please verify your email to complete registration.",
        };
      } catch (error) {
        console.error("Register error:", error);
        if (error.message?.startsWith("Missing email configuration:")) {
          return {
            success: false,
            message: "Email service is not configured. Add SMTP settings to backend/.env.",
          };
        }

        if (error.code === "EAUTH" || error.responseCode === 535) {
          return {
            success: false,
            message: "Email authentication failed. For Gmail, use a Google App Password in SMTP_PASS.",
          };
        }

        if (["ECONNECTION", "ETIMEDOUT", "ENOTFOUND"].includes(error.code)) {
          return {
            success: false,
            message: "Could not connect to the email server. Check SMTP_HOST and SMTP_PORT.",
          };
        }

        if (error.code === "ER_DUP_ENTRY") {
          return { success: false, message: "This email is already registered." };
        }

        if (error.code === "ER_NO_SUCH_TABLE") {
          return { success: false, message: "Registration database table is missing. Check the MySQL setup." };
        }

        if (error.code === "ER_BAD_FIELD_ERROR") {
          return { success: false, message: "Registration database columns are missing. Check the users table schema." };
        }

        if (["ECONNREFUSED", "PROTOCOL_CONNECTION_LOST"].includes(error.code)) {
          return { success: false, message: "Could not connect to the registration database. Check MySQL is running." };
        }

        return {
          success: false,
          message: `Registration failed: ${error.message || "Unknown server error."}`,
        };
      }
    },

    verifyRegistrationOtp: async (_, { email, otp }) => {
      try {
        if (!email || !otp) {
          return { success: false, message: "Email and OTP are required." };
        }

        const normalizedEmail = email.toLowerCase();

        const [rows] = await query(
          `SELECT *, is_email_verified AS isEmailVerified, verification_otp AS verificationOtp, verification_otp_expires_at AS verificationOtpExpiresAt FROM users WHERE email = ?`,
          [normalizedEmail]
        );

        const user = rows[0];
        if (!user) {
          return { success: false, message: "User not found." };
        }

        if (user.isEmailVerified) {
          return { success: false, message: "Email is already verified." };
        }

        if (!user.verificationOtp || user.verificationOtp !== otp) {
          return { success: false, message: "Invalid OTP." };
        }

        const now = new Date();
        if (new Date(user.verificationOtpExpiresAt) < now) {
          await query(
            "UPDATE users SET verification_otp = NULL, verification_otp_expires_at = NULL WHERE id = ?",
            [user.id]
          );
          return { success: false, message: "OTP has expired. Please register again." };
        }

        await query(
          "UPDATE users SET is_email_verified = true, verification_otp = NULL, verification_otp_expires_at = NULL WHERE id = ?",
          [user.id]
        );

        return {
          success: true,
          message: "Email verified successfully. You can now login.",
        };
      } catch (error) {
        console.error("Verify OTP error:", error);
        return { success: false, message: "Verification failed. Please try again." };
      }
    },

    login: async (_, { email, password }) => {
      try {
        if (!email || !password) {
          throw new Error("Email and password are required.");
        }

        const normalizedEmail = email.toLowerCase();

        const [rows] = await query(
          "SELECT *, is_email_verified AS isEmailVerified FROM users WHERE email = ?",
          [normalizedEmail]
        );

        const user = rows[0];
        if (!user) {
          throw new Error("Invalid email or password.");
        }

        if (!user.isEmailVerified) {
          throw new Error("Please verify your email before logging in.");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Invalid email or password.");
        }

        const token = generateToken(user);

        return {
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        };
      } catch (error) {
        throw error;
      }
    },

    forgotPassword: async (_, { email }) => {
      try {
        if (!email) {
          return { success: false, message: "Email is required." };
        }

        const normalizedEmail = email.toLowerCase();

        const [rows] = await query(
          "SELECT *, is_email_verified AS isEmailVerified, reset_otp AS resetOtp, reset_otp_expires_at AS resetOtpExpiresAt FROM users WHERE email = ?",
          [normalizedEmail]
        );

        const user = rows[0];
        if (!user) {
          return { success: false, message: "No account found with this email." };
        }

        if (!user.isEmailVerified) {
          return { success: false, message: "Please verify your email before resetting the password." };
        }

        const otp = generateOtp();

        await query(
          `UPDATE users SET reset_otp = ?, reset_otp_expires_at = DATE_ADD(NOW(), INTERVAL 10 MINUTE) WHERE id = ?`,
          [otp, user.id]
        );

        console.log(`Password reset OTP for ${normalizedEmail}: ${otp}`);

        return {
          success: true,
          message: "OTP sent successfully. Please verify it to reset your password.",
        };
      } catch (error) {
        console.error("Forgot password error:", error);
        return { success: false, message: "Failed to send OTP. Please try again." };
      }
    },

    verifyOtp: async (_, { email, otp }) => {
      try {
        if (!email || !otp) {
          return { success: false, message: "Email and OTP are required." };
        }

        const normalizedEmail = email.toLowerCase();

        const [rows] = await query(
          "SELECT *, reset_otp AS resetOtp, reset_otp_expires_at AS resetOtpExpiresAt FROM users WHERE email = ?",
          [normalizedEmail]
        );

        const user = rows[0];
        if (!user || !user.resetOtp) {
          return { success: false, message: "No OTP found for this email." };
        }

        if (user.resetOtp !== otp) {
          return { success: false, message: "Invalid OTP." };
        }

        const now = new Date();
        if (new Date(user.resetOtpExpiresAt) < now) {
          await query(
            "UPDATE users SET reset_otp = NULL, reset_otp_expires_at = NULL WHERE id = ?",
            [user.id]
          );
          return { success: false, message: "OTP has expired. Please request a new one." };
        }

        return {
          success: true,
          message: "OTP verified successfully.",
        };
      } catch (error) {
        console.error("Verify OTP error:", error);
        return { success: false, message: "OTP verification failed." };
      }
    },

    resetPassword: async (_, { email, otp, newPassword }) => {
      try {
        if (!email || !otp || !newPassword) {
          return { success: false, message: "Email, OTP, and new password are required." };
        }

        if (newPassword.length < 6) {
          return { success: false, message: "Password must be at least 6 characters long." };
        }

        const normalizedEmail = email.toLowerCase();

        const [rows] = await query(
          "SELECT *, reset_otp AS resetOtp, reset_otp_expires_at AS resetOtpExpiresAt FROM users WHERE email = ?",
          [normalizedEmail]
        );

        const user = rows[0];
        if (!user || !user.resetOtp) {
          return { success: false, message: "No OTP found for this email." };
        }

        if (user.resetOtp !== otp) {
          return { success: false, message: "Invalid OTP." };
        }

        const now = new Date();
        if (new Date(user.resetOtpExpiresAt) < now) {
          await query(
            "UPDATE users SET reset_otp = NULL, reset_otp_expires_at = NULL WHERE id = ?",
            [user.id]
          );
          return { success: false, message: "OTP has expired. Please request a new one." };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await query(
          `UPDATE users SET password = ?, reset_otp = NULL, reset_otp_expires_at = NULL WHERE id = ?`,
          [hashedPassword, user.id]
        );

        return {
          success: true,
          message: "Password reset successfully. Please login again.",
        };
      } catch (error) {
        console.error("Reset password error:", error);
        return { success: false, message: "Password reset failed." };
      }
    },
  },
};

module.exports = resolvers;