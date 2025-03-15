// server/models/Project.js - Enhanced model
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

  // Project value and payment tracking
  projectValue: {
    type: Number,
    default: 0,
  },
  paymentSchedule: [
    {
      name: String, // e.g., "Initial deposit", "Milestone 1", "Final payment"
      amount: Number,
      dueDate: Date,
      status: {
        type: String,
        enum: ["pending", "paid", "overdue"],
        default: "pending",
      },
      paidDate: Date,
      notes: String,
    },
  ],

  receivedPayments: {
    type: Number,
    default: 0,
  },

  // Referral tracking
  referredBy: {
    name: String,
    email: String,
    phone: String,
    commissionPercentage: Number,
    commissionAmount: Number,
    commissionPaid: {
      type: Boolean,
      default: false,
    },
    commissionPaidDate: Date,
    notes: String,
  },

  timeline: {
    type: String,
    required: [true, "Timeline is required"],
    enum: ["urgent", "standard", "relaxed", "not-sure"],
  },

  // Project deadline tracking
  startDate: Date,
  deadline: Date,

  // Project workflow stages
  workflowStage: {
    type: String,
    enum: [
      "discussion",
      "design",
      "content_collection",
      "development",
      "revisions",
      "deployment",
      "knowledge_sharing",
      "completed",
    ],
    default: "discussion",
  },

  // Design decisions
  designChoices: {
    colorPalette: [String],
    fonts: [String],
    designNotes: String,
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "needs_revision"],
      default: "pending",
    },
  },

  // Content collection tracking
  contentStatus: {
    images: {
      type: String,
      enum: ["not_started", "in_progress", "completed"],
      default: "not_started",
    },
    text: {
      type: String,
      enum: ["not_started", "in_progress", "completed"],
      default: "not_started",
    },
    notes: String,
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

  // Hosting and domain information
  hosting: {
    provider: String,
    account: String,
    renewalDate: Date,
    cost: Number,
    loginInfo: String,
    notes: String,
  },

  domain: {
    name: String,
    registrar: String,
    renewalDate: Date,
    cost: Number,
    loginInfo: String,
    notes: String,
  },

  // Project milestones and timeline
  milestones: [
    {
      name: String,
      description: String,
      dueDate: Date,
      completedDate: Date,
      status: {
        type: String,
        enum: ["pending", "in_progress", "completed", "delayed"],
        default: "pending",
      },
    },
  ],

  // Additional services required (e.g., copywriting, photography)
  additionalServices: [
    {
      name: String,
      provider: String,
      cost: Number,
      status: String,
      notes: String,
    },
  ],

  notes: {
    type: String,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the timestamp when document is updated
ProjectSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Project", ProjectSchema);
