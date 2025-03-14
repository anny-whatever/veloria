// server/routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const {
  submitContact,
  getContacts,
  updateContact,
} = require("../controllers/contactController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public routes
router.post("/", submitContact);

// Admin routes - make sure these functions exist and are exported correctly
router.get("/admin", protect, admin, getContacts);
router.patch("/admin/:id", protect, admin, updateContact);

module.exports = router;
