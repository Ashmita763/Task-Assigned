-- CHANGED: Add columns required by registration and OTP verification.
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS is_email_verified BOOLEAN NOT NULL DEFAULT false AFTER experience,
  ADD COLUMN IF NOT EXISTS verification_otp VARCHAR(10) NULL AFTER is_email_verified,
  ADD COLUMN IF NOT EXISTS verification_otp_expires_at DATETIME NULL AFTER verification_otp;