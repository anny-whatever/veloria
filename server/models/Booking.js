// server/models/Booking.js
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  // Personal Information
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  phone: {
    type: String,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },

  // Meeting Details
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  time: {
    type: String,
    required: [true, "Time is required"],
    trim: true,
  },
  timezone: {
    type: String,
    required: [true, "Timezone is required"],
    trim: true,
  },
  callType: {
    type: String,
    required: [true, "Call type is required"],
    enum: ["video", "phone"],
  },

  // Project Information
  projectType: {
    type: String,
    required: [true, "Project type is required"],
    trim: true,
  },
  additionalInfo: {
    type: String,
    trim: true,
  },

  // Status tracking
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled", "rescheduled"],
    default: "scheduled",
  },
  meetingLink: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
