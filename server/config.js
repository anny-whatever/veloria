require("dotenv").config();

const config = {
  // Server Configuration
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || "development",

  // Database Configuration
  dbPath: process.env.DB_PATH || "./database.sqlite",

  // Zoho Email Configuration
  email: {
    smtp: {
      host: process.env.SMTP_HOST || "smtp.zoho.in",
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === "true" || false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_AUTH_USER || "you@yourdomain.com",
        pass: process.env.SMTP_AUTH_PASS || "your_password",
      },
    },
    from: {
      email: process.env.FROM_EMAIL || "you@yourdomain.com",
      name: process.env.FROM_NAME || "Veloria Team",
    },
    to: process.env.TO_EMAIL || "you@yourdomain.com",
  },

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100, // limit each IP to 100 requests per windowMs
  },

  // Admin Authentication
  admin: {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "password",
  },
};

module.exports = config;
