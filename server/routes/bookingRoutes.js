// server/routes/bookingRoutes.js - Updated routes with correct order
const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  cancelBooking,
  getBookingsCalendar,
  getTodaysBookings,
} = require("../controllers/bookingController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public routes
router.post("/", createBooking);
router.patch("/cancel/:id", cancelBooking);

// Admin calendar routes - these need to come BEFORE the :id route to avoid conflicts
router.get("/admin/calendar", protect, admin, getBookingsCalendar);
router.get("/admin/today", protect, admin, getTodaysBookings);

// Admin routes with :id parameter - these must come after the specific routes
router.get("/admin", protect, admin, getBookings);
router.get("/admin/:id", protect, admin, getBookingById);
router.patch("/admin/:id", protect, admin, updateBooking);
router.delete("/admin/:id", protect, admin, deleteBooking);

module.exports = router;
