// server/models/Project.js
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  // Service Selection
  serviceType: {
    type: String,
    required: [true, "Service type is required"],
    enum: ["ecommerce", "blog", "portfolio", "landing", "custom"],
  },

  // Project Details
  projectName: {
    type: String,
    required: [true, "Project name is required"],
    trim: true,
  },
  projectDescription: {
    type: String,
    required: [true, "Project description is required"],
    trim: true,
  },
  projectGoals: {
    type: [String],
    required: [true, "At least one project goal is required"],
  },

  // Budget and Timeline
  budget: {
    type: String,
    required: [true, "Budget range is required"],
    trim: true,
  },
  timeline: {
    type: String,
    required: [true, "Timeline is required"],
    enum: ["urgent", "standard", "relaxed", "not-sure"],
  },

  // Company Information
  companyName: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
  },
  companyWebsite: {
    type: String,
    trim: true,
  },
  industry: {
    type: String,
    required: [true, "Industry is required"],
    trim: true,
  },
  targetAudience: {
    type: String,
    required: [true, "Target audience description is required"],
    trim: true,
  },

  // Contact Information
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

  // Status
  status: {
    type: String,
    enum: ["new", "contacted", "in-progress", "quoted", "accepted", "declined"],
    default: "new",
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

module.exports = mongoose.model("Project", ProjectSchema);
