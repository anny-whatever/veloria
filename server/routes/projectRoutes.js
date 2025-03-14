// server/routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const {
  submitProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public routes
router.post("/", submitProject);

// Admin routes
router.get("/admin", protect, admin, getProjects);
router.get("/admin/:id", protect, admin, getProjectById);
router.patch("/admin/:id", protect, admin, updateProject);
router.delete("/admin/:id", protect, admin, deleteProject);

module.exports = router;
