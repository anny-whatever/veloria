// server/routes/bookingRoutes.js - Updated routes
const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  cancelBooking,
  // New calendar-related functions
  getBookingsCalendar,
  getTodaysBookings,
} = require("../controllers/bookingController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public routes
router.post("/", createBooking);
router.patch("/cancel/:id", cancelBooking);

// Admin routes
router.get("/admin", protect, admin, getBookings);
router.get("/admin/:id", protect, admin, getBookingById);
router.patch("/admin/:id", protect, admin, updateBooking);
router.delete("/admin/:id", protect, admin, deleteBooking);

// Admin calendar routes
router.get("/admin/calendar", protect, admin, getBookingsCalendar);
router.get("/admin/today", protect, admin, getTodaysBookings);

module.exports = router;
