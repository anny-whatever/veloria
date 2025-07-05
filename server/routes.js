const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const database = require("./database");
const emailService = require("./emailService");
const config = require("./config");
const basicAuth = require("express-basic-auth");

// Rate limiting middleware
const createRateLimit = (windowMs, max) =>
  rateLimit({
    windowMs,
    max,
    message: {
      error: "Too many requests from this IP, please try again later.",
      retryAfter: Math.ceil(windowMs / 1000),
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

// Form submission rate limit (stricter)
const formSubmissionLimit = createRateLimit(
  config.rateLimit.windowMs,
  Math.floor(config.rateLimit.max / 10) // 10 submissions per window
);

// General API rate limit
const generalLimit = createRateLimit(
  config.rateLimit.windowMs,
  config.rateLimit.max
);

// Input validation middleware
const validateInput = (requiredFields) => {
  return (req, res, next) => {
    const errors = [];

    // Check required fields
    requiredFields.forEach((field) => {
      if (!req.body[field] || req.body[field].trim() === "") {
        errors.push(`${field} is required`);
      }
    });

    // Email validation
    if (req.body.email && !isValidEmail(req.body.email)) {
      errors.push("Invalid email format");
    }

    // Phone validation (if provided)
    if (
      req.body.phone &&
      req.body.phone.trim() !== "" &&
      !isValidPhone(req.body.phone)
    ) {
      errors.push("Invalid phone number format");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    next();
  };
};

// Helper functions
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
};

const getClientInfo = (req) => {
  return {
    ip_address: req.ip || req.connection.remoteAddress,
    user_agent: req.get("User-Agent") || "",
  };
};

// Sanitize input
const sanitizeInput = (data) => {
  const sanitized = {};
  for (const key in data) {
    if (typeof data[key] === "string") {
      sanitized[key] = data[key].trim().substring(0, 1000); // Limit length
    } else {
      sanitized[key] = data[key];
    }
  }
  return sanitized;
};

// Contact form endpoint
router.post(
  "/contact",
  formSubmissionLimit,
  validateInput(["name", "email", "message"]),
  async (req, res) => {
    try {
      const clientInfo = getClientInfo(req);
      const sanitizedData = sanitizeInput(req.body);

      const submissionData = {
        ...sanitizedData,
        ...clientInfo,
      };

      // Save to database
      const result = await database.insertContactSubmission(submissionData);

      // Send emails
      const [notificationResult, confirmationResult] = await Promise.all([
        emailService.sendContactNotification(submissionData),
        emailService.sendConfirmationEmail(
          submissionData.email,
          submissionData.name,
          "contact"
        ),
      ]);

      console.log("Contact form submission processed:", {
        id: result.id,
        email_sent: notificationResult.success,
        confirmation_sent: confirmationResult.success,
      });

      // Form submission is successful even if emails fail
      // (data is saved to database)
      const message = notificationResult.success
        ? "Your message has been sent successfully!"
        : "Your message has been received and saved! (Email notifications are currently unavailable)";

      res.status(201).json({
        success: true,
        message: message,
        id: result.id,
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({
        success: false,
        error:
          "An error occurred while processing your request. Please try again later.",
      });
    }
  }
);

// Book call form endpoint
router.post(
  "/book-call",
  formSubmissionLimit,
  validateInput(["name", "email"]),
  async (req, res) => {
    try {
      const clientInfo = getClientInfo(req);
      const sanitizedData = sanitizeInput(req.body);

      const submissionData = {
        ...sanitizedData,
        ...clientInfo,
      };

      // Save to database
      const result = await database.insertBookCallSubmission(submissionData);

      // Send emails
      const [notificationResult, confirmationResult] = await Promise.all([
        emailService.sendBookCallNotification(submissionData),
        emailService.sendConfirmationEmail(
          submissionData.email,
          submissionData.name,
          "bookCall"
        ),
      ]);

      console.log("Book call submission processed:", {
        id: result.id,
        email_sent: notificationResult.success,
        confirmation_sent: confirmationResult.success,
      });

      const message = notificationResult.success
        ? "Your call request has been submitted successfully!"
        : "Your call request has been received and saved! (Email notifications are currently unavailable)";

      res.status(201).json({
        success: true,
        message: message,
        id: result.id,
      });
    } catch (error) {
      console.error("Error processing book call form:", error);
      res.status(500).json({
        success: false,
        error:
          "An error occurred while processing your request. Please try again later.",
      });
    }
  }
);

// Get started form endpoint
router.post(
  "/get-started",
  formSubmissionLimit,
  validateInput(["name", "email"]),
  async (req, res) => {
    try {
      const clientInfo = getClientInfo(req);
      const sanitizedData = sanitizeInput(req.body);

      const submissionData = {
        ...sanitizedData,
        ...clientInfo,
      };

      // Save to database
      const result = await database.insertGetStartedSubmission(submissionData);

      // Send emails
      const [notificationResult, confirmationResult] = await Promise.all([
        emailService.sendGetStartedNotification(submissionData),
        emailService.sendConfirmationEmail(
          submissionData.email,
          submissionData.name,
          "getStarted"
        ),
      ]);

      console.log("Get started submission processed:", {
        id: result.id,
        email_sent: notificationResult.success,
        confirmation_sent: confirmationResult.success,
      });

      const message = notificationResult.success
        ? "Your request has been submitted successfully!"
        : "Your request has been received and saved! (Email notifications are currently unavailable)";

      res.status(201).json({
        success: true,
        message: message,
        id: result.id,
      });
    } catch (error) {
      console.error("Error processing get started form:", error);
      res.status(500).json({
        success: false,
        error:
          "An error occurred while processing your request. Please try again later.",
      });
    }
  }
);

// Health check endpoint
router.get("/health", generalLimit, (req, res) => {
  res.json({
    success: true,
    status: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Admin authentication middleware
router.use(
  "/admin",
  basicAuth({
    users: { [config.admin.username]: config.admin.password },
    challenge: true,
  })
);

// Admin endpoints (basic - would need proper authentication in production)
router.get("/admin/submissions/:type?", generalLimit, async (req, res) => {
  try {
    const type = req.params.type;
    const validTypes = [
      "contact_submissions",
      "book_call_submissions",
      "get_started_submissions",
    ];

    if (type && !validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        error: "Invalid submission type",
      });
    }

    let results = {};

    if (type) {
      results[type] = await database.getAllSubmissions(type);
    } else {
      // Get all types
      for (const tableName of validTypes) {
        results[tableName] = await database.getAllSubmissions(tableName);
      }
    }

    res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while fetching submissions",
    });
  }
});

module.exports = router;
