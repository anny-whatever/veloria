const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const config = require("./config");
const routes = require("./routes");
const path = require("path");
const basicAuth = require("express-basic-auth");

// Initialize Express app
const app = express();

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  })
);

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // In production, replace with your actual domain
      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:4173",
        "https://veloria.in", // Replace with your actual domain
      ];

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Body parsing middleware
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// Trust proxy for accurate IP addresses
app.set("trust proxy", 1);

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip;

  console.log(`[${timestamp}] ${method} ${url} from ${ip}`);
  next();
});

// API routes
app.use("/api", routes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Veloria Server API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      contact: "POST /api/contact",
      bookCall: "POST /api/book-call",
      getStarted: "POST /api/get-started",
      admin: "GET /api/admin/submissions/:type?",
    },
    documentation: {
      contact: {
        method: "POST",
        url: "/api/contact",
        required: ["name", "email", "message"],
        optional: ["phone", "company", "subject"],
      },
      bookCall: {
        method: "POST",
        url: "/api/book-call",
        required: ["name", "email"],
        optional: [
          "phone",
          "company",
          "preferred_date",
          "preferred_time",
          "message",
        ],
      },
      getStarted: {
        method: "POST",
        url: "/api/get-started",
        required: ["name", "email"],
        optional: [
          "phone",
          "company",
          "service_type",
          "budget_range",
          "project_description",
          "timeline",
        ],
      },
    },
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Global error handler:", error);

  // CORS error
  if (error.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      error: "CORS: Origin not allowed",
    });
  }

  // JSON parsing error
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      error: "Invalid JSON format",
    });
  }

  // Payload too large
  if (error.type === "entity.too.large") {
    return res.status(413).json({
      success: false,
      error: "Payload too large",
    });
  }

  // Generic error
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\nReceived ${signal}, shutting down gracefully...`);

  server.close(() => {
    console.log("HTTP server closed");

    // Close database connection
    const database = require("./database");
    database.close();

    console.log("Database connection closed");
    process.exit(0);
  });

  // Force close after 10 seconds
  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);
};

// Handle process termination
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  gracefulShutdown("uncaughtException");
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  gracefulShutdown("unhandledRejection");
});

// Start server
const PORT = config.port;
const server = app.listen(PORT, () => {
  console.log(`
🚀 Veloria Server Started Successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📡 Server running on port: ${PORT}
🌐 Environment: ${config.nodeEnv}
📧 Email configured: ${config.email.smtp.host}:${config.email.smtp.port}
🗄️  Database: ${config.dbPath}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

API Endpoints:
• GET  /                     - API documentation
• GET  /api/health           - Health check
• POST /api/contact          - Contact form
• POST /api/book-call        - Book call form
• POST /api/get-started      - Get started form
• GET  /api/admin/submissions - View submissions (admin)

Ready to accept requests! 🎉
  `);
});

module.exports = app;
