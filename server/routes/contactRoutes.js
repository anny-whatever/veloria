// server/routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const {
  submitContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public routes
router.post("/", submitContact);

// Admin routes
router.get("/admin", protect, admin, getContacts);
router.get("/admin/:id", protect, admin, getContactById);
router.patch("/admin/:id", protect, admin, updateContact);
router.delete("/admin/:id", protect, admin, deleteContact);

module.exports = router;
