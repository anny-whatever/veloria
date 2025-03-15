// server/routes/financeRoutes.js
const express = require("express");
const router = express.Router();
const { getFinanceOverview } = require("../controllers/financeController");
const { protect, admin } = require("../middleware/authMiddleware");

// Admin routes
router.get("/admin/overview", protect, admin, getFinanceOverview);

module.exports = router;
