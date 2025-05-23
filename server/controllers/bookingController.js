// server/controllers/bookingController.js - With admin booking creation
const Booking = require("../models/Booking");
const asyncHandler = require("express-async-handler");
const { sendNotification, sendConfirmation } = require("../utils/emailService");

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    company,
    date,
    time,
    timezone,
    callType,
    projectType,
    additionalInfo,
  } = req.body;

  // Validate required fields
  if (
    !name ||
    !email ||
    !date ||
    !time ||
    !timezone ||
    !callType ||
    !projectType
  ) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Create booking in database
  const booking = await Booking.create({
    name,
    email,
    phone,
    company,
    date: new Date(date),
    time,
    timezone,
    callType,
    projectType,
    additionalInfo,
  });

  // Generate meeting details - this would be integrated with your calendar/meeting system
  const meetingDetails = {
    link: callType === "video" ? "https://zoom.us/j/example" : null,
    phone: callType === "phone" ? "+1234567890" : null,
    datetime: `${new Date(date).toDateString()} at ${time} (${timezone})`,
  };

  // Send email notifications
  try {
    // Send notification to admin
    await sendNotification({
      type: "new_booking",
      data: {
        name,
        email,
        phone,
        date: new Date(date).toDateString(),
        time,
        timezone,
        callType,
        projectType,
      },
    });

    // Send confirmation to user
    await sendConfirmation({
      type: "booking_confirmed",
      recipient: email,
      data: {
        name,
        date: new Date(date).toDateString(),
        time,
        timezone,
        callType,
        meetingDetails,
      },
    });

    console.log("Booking notification emails sent successfully");
  } catch (error) {
    console.error("Failed to send booking notification emails:", error);
    // Continue with the response even if email sending fails
  }

  res.status(201).json({
    success: true,
    message: "Your discovery call has been scheduled!",
    booking: {
      date: new Date(date).toDateString(),
      time,
      callType,
      meetingDetails,
    },
  });
});

// @desc    Create a booking manually (by admin)
// @route   POST /api/bookings/admin
// @access  Private/Admin
const createBookingByAdmin = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    company,
    date,
    time,
    timezone,
    callType,
    projectType,
    additionalInfo,
    status,
    notes,
    meetingLink,
  } = req.body;

  // Validate required fields
  if (!name || !email || !date || !time || !callType || !projectType) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Create booking in database with admin-provided fields
  const booking = await Booking.create({
    name,
    email,
    phone,
    company,
    date: new Date(date),
    time,
    timezone: timezone || "GMT+0530 (India Standard Time)",
    callType,
    projectType,
    additionalInfo,
    status: status || "scheduled",
    notes,
    meetingLink,
    createdAt: new Date(),
  });

  // Optionally send email notification to client
  if (req.body.sendNotification) {
    try {
      // Generate meeting details
      const meetingDetails = {
        link:
          meetingLink ||
          (callType === "video" ? "https://zoom.us/j/example" : null),
        phone: callType === "phone" ? phone : null,
        datetime: `${new Date(date).toDateString()} at ${time}`,
      };

      // Send confirmation to user
      await sendConfirmation({
        type: "booking_confirmed",
        recipient: email,
        data: {
          name,
          date: new Date(date).toDateString(),
          time,
          timezone: timezone || "GMT+0530 (India Standard Time)",
          callType,
          meetingDetails,
        },
      });

      console.log("Booking confirmation email sent to client");
    } catch (error) {
      console.error("Failed to send booking confirmation email:", error);
      // Continue anyway
    }
  }

  res.status(201).json({
    success: true,
    message: "Booking created successfully by admin",
    _id: booking._id,
  });
});

// @desc    Get all bookings
// @route   GET /api/bookings/admin
// @access  Private/Admin
const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({}).sort({ date: 1 });
  res.status(200).json(bookings);
});

// @desc    Get booking by ID
// @route   GET /api/bookings/admin/:id
// @access  Private/Admin
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  res.status(200).json(booking);
});

// @desc    Update booking status
// @route   PATCH /api/bookings/admin/:id
// @access  Private/Admin
const updateBooking = asyncHandler(async (req, res) => {
  const { status, notes, meetingLink } = req.body;

  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  if (status) booking.status = status;
  if (notes) booking.notes = notes;
  if (meetingLink) booking.meetingLink = meetingLink;

  const updatedBooking = await booking.save();

  res.status(200).json({
    success: true,
    data: updatedBooking,
  });
});

// @desc    Delete booking
// @route   DELETE /api/bookings/admin/:id
// @access  Private/Admin
const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  await booking.deleteOne();

  res.status(200).json({
    success: true,
    message: "Booking deleted successfully",
  });
});

// @desc    Cancel a booking
// @route   PATCH /api/bookings/cancel/:id
// @access  Public (with token)
const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  // Verify the email matches for security
  if (booking.email !== email) {
    res.status(401);
    throw new Error("Not authorized to cancel this booking");
  }

  booking.status = "cancelled";
  await booking.save();

  // Send cancellation emails
  try {
    // Notify admin
    await sendNotification({
      type: "booking_cancelled",
      data: {
        name: booking.name,
        email: booking.email,
        date: new Date(booking.date).toDateString(),
        time: booking.time,
      },
    });

    // Confirm to user
    await sendConfirmation({
      type: "booking_cancellation",
      recipient: booking.email,
      data: {
        name: booking.name,
        date: new Date(booking.date).toDateString(),
        time: booking.time,
      },
    });
  } catch (error) {
    console.error("Failed to send cancellation emails:", error);
  }

  res.status(200).json({
    success: true,
    message: "Your booking has been cancelled successfully.",
  });
});

// @desc    Get bookings for calendar view
// @route   GET /api/bookings/admin/calendar
// @access  Private/Admin
const getBookingsCalendar = asyncHandler(async (req, res) => {
  try {
    const { start, end } = req.query;

    // Validate date parameters
    if (!start || !end) {
      return res.status(400).json({
        success: false,
        message: "Start and end dates are required",
      });
    }

    // Create date filter
    let dateFilter = {};
    try {
      dateFilter = {
        $gte: new Date(start),
        $lte: new Date(end),
      };
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use YYYY-MM-DD format.",
      });
    }

    // Find bookings within date range
    const bookings = await Booking.find({
      date: dateFilter,
    });

    // Format for calendar
    const events = bookings.map((booking) => {
      // Calculate end time (adding 1 hour to start time as default)
      const startDate = new Date(booking.date);

      // Safely parse time
      let hours = 12,
        minutes = 0;
      if (
        booking.time &&
        typeof booking.time === "string" &&
        booking.time.includes(":")
      ) {
        const [hoursStr, minutesStr] = booking.time.split(":").map(Number);
        hours = !isNaN(hoursStr) ? hoursStr : 12;
        minutes = !isNaN(minutesStr) ? minutesStr : 0;
      }

      startDate.setHours(hours, minutes, 0);

      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + 1);

      // Determine color based on status
      let color;
      switch (booking.status) {
        case "scheduled":
          color = "#3498db"; // Blue
          break;
        case "completed":
          color = "#2ecc71"; // Green
          break;
        case "cancelled":
          color = "#e74c3c"; // Red
          break;
        case "rescheduled":
          color = "#f39c12"; // Orange
          break;
        default:
          color = "#95a5a6"; // Gray
      }

      return {
        id: booking._id,
        title: `${booking.callType === "video" ? "📹" : "📞"} ${
          booking.name
        }: ${booking.projectType || "Discovery Call"}`,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        allDay: false,
        type: "booking",
        color,
        extendedProps: {
          email: booking.email,
          phone: booking.phone,
          company: booking.company,
          projectType: booking.projectType,
          callType: booking.callType,
          status: booking.status,
        },
      };
    });

    res.status(200).json(events);
  } catch (error) {
    console.error("Error in getBookingsCalendar:", error);
    res.status(500).json({
      success: false,
      message: "Server error when fetching booking calendar data",
      error: error.message,
    });
  }
});

// @desc    Get today's bookings
// @route   GET /api/bookings/admin/today
// @access  Private/Admin
const getTodaysBookings = asyncHandler(async (req, res) => {
  // Get today's date range
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Find bookings for today
  const bookings = await Booking.find({
    date: {
      $gte: today,
      $lt: tomorrow,
    },
    status: { $nin: ["cancelled"] },
  }).sort({ time: 1 });

  res.status(200).json(bookings);
});

module.exports = {
  createBooking,
  createBookingByAdmin,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  cancelBooking,
  getBookingsCalendar,
  getTodaysBookings,
};
