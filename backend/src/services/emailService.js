const nodemailer = require("nodemailer");

const createTransporter = () => {
  const requiredSettings = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"];
  const missingSettings = requiredSettings.filter((setting) => !process.env[setting]);

  if (missingSettings.length > 0) {
    throw new Error(`Missing email configuration: ${missingSettings.join(", ")}`);
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST.trim(),
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER.trim(),
      pass: process.env.SMTP_PASS.replace(/\s/g, ""),
    },
  });
};

const sendRegistrationOtp = async (email, otp) => {
  const transporter = createTransporter();
  const from = (process.env.MAIL_FROM || process.env.SMTP_USER).trim();

  await transporter.sendMail({
    from,
    to: email,
    subject: "Your verification code",
    text: `Your verification code is ${otp}. It expires in 10 minutes.`,
    html: `<p>Your verification code is <strong>${otp}</strong>.</p><p>It expires in 10 minutes.</p>`,
  });
};

module.exports = { sendRegistrationOtp };
