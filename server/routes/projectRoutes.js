// server/routes/projectRoutes.js - Enhanced routes
const express = require("express");
const router = express.Router();
const {
  submitProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  updateWorkflowStage,
  addPayment,
  updatePaymentStatus,
  addMilestone,
  updateMilestoneStatus,
  addReferralInfo,
  getUpcomingDeadlines,
  getProjectStats,
  getCalendarEvents,
} = require("../controllers/projectController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public routes
router.post("/", submitProject);

// Admin routes - standard CRUD
router.get("/admin", protect, admin, getProjects);
router.get("/admin/:id", protect, admin, getProjectById);
router.patch("/admin/:id", protect, admin, updateProject);
router.delete("/admin/:id", protect, admin, deleteProject);

// Admin routes - workflow management
router.patch("/admin/:id/workflow", protect, admin, updateWorkflowStage);

// Admin routes - payment management
router.post("/admin/:id/payments", protect, admin, addPayment);
router.patch(
  "/admin/:id/payments/:paymentId",
  protect,
  admin,
  updatePaymentStatus
);

// Admin routes - milestone management
router.post("/admin/:id/milestones", protect, admin, addMilestone);
router.patch(
  "/admin/:id/milestones/:milestoneId",
  protect,
  admin,
  updateMilestoneStatus
);

// Admin routes - referral management
router.patch("/admin/:id/referral", protect, admin, addReferralInfo);

// Admin routes - analytics and dashboards
router.get("/admin/deadlines", protect, admin, getUpcomingDeadlines);
router.get("/admin/stats", protect, admin, getProjectStats);
router.get("/admin/calendar", protect, admin, getCalendarEvents);

module.exports = router;
